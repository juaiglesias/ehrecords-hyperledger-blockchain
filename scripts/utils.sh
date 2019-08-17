#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#

# This is a collection of bash functions used by different scripts

# Edited by Juan Iglesias
CHAINCODE_NAME=ehrecords

ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/ehrecords.com/orderers/orderer.ehrecords.com/msp/tlscacerts/tlsca.ehrecords.com-cert.pem
PEER0_HOSPITAL1_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/hospital1.ehrecords.com/peers/peer0.hospital1.ehrecords.com/tls/ca.crt
PEER0_HOSPITAL2_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/hospital2.ehrecords.com/peers/peer0.hospital2.ehrecords.com/tls/ca.crt
#PEER0_ORG3_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.ehrecords.com/peers/peer0.org3.ehrecords.com/tls/ca.crt

# verify the result of the end-to-end test
verifyResult() {
  if [ $1 -ne 0 ]; then
    echo "!!!!!!!!!!!!!!! "$2" !!!!!!!!!!!!!!!!"
    echo "========= ERROR !!! FAILED to execute End-2-End Scenario ==========="
    echo
    exit 1
  fi
}

# Set OrdererOrg.Admin globals
setOrdererGlobals() {
  CORE_PEER_LOCALMSPID="OrdererMSP"
  CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/ehrecords.com/orderers/orderer.ehrecords.com/msp/tlscacerts/tlsca.ehrecords.com-cert.pem
  CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/ehrecords.com/users/Admin@ehrecords.com/msp
}

setGlobals() {
  PEER=$1
  HOSP=$2
  if [ $HOSP -eq 1 ]; then
    CORE_PEER_LOCALMSPID="Hospital1MSP"
    CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_HOSPITAL1_CA
    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/hospital1.ehrecords.com/users/Admin@hospital1.ehrecords.com/msp
    if [ $PEER -eq 0 ]; then
      CORE_PEER_ADDRESS=peer0.hospital1.ehrecords.com:7051
    else
      CORE_PEER_ADDRESS=peer1.hospital1.ehrecords.com:8051
    fi
  elif [ $HOSP -eq 2 ]; then
    CORE_PEER_LOCALMSPID="Hospital2MSP"
    CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_HOSPITAL2_CA
    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/hospital2.ehrecords.com/users/Admin@hospital2.ehrecords.com/msp
    if [ $PEER -eq 0 ]; then
      CORE_PEER_ADDRESS=peer0.hospital2.ehrecords.com:9051
    else
      CORE_PEER_ADDRESS=peer1.hospital2.ehrecords.com:10051
    fi

  #elif [ $ORG -eq 3 ]; then
  #  CORE_PEER_LOCALMSPID="Org3MSP"
  #  CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG3_CA
  #  CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.ehrecords.com/users/Admin@org3.ehrecords.com/msp
  #  if [ $PEER -eq 0 ]; then
  #    CORE_PEER_ADDRESS=peer0.org3.ehrecords.com:11051
  #  else
  #    CORE_PEER_ADDRESS=peer1.org3.ehrecords.com:12051
  #  fi
  else
    echo "================== ERROR !!! ORG Unknown =================="
  fi

  if [ "$VERBOSE" == "true" ]; then
    env | grep CORE
  fi
}

updateAnchorPeers() {
  PEER=$1
  HOSP=$2
  setGlobals $PEER $HOSP

  if [ -z "$CORE_PEER_TLS_ENABLED" -o "$CORE_PEER_TLS_ENABLED" = "false" ]; then
    set -x
    peer channel update -o orderer.ehrecords.com:7050 -c $CHANNEL_NAME -f ./channel-artifacts/${CORE_PEER_LOCALMSPID}anchors.tx >&log.txt
    res=$?
    set +x
  else
    set -x
    peer channel update -o orderer.ehrecords.com:7050 -c $CHANNEL_NAME -f ./channel-artifacts/${CORE_PEER_LOCALMSPID}anchors.tx --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA >&log.txt
    res=$?
    set +x
  fi
  cat log.txt
  verifyResult $res "Anchor peer update failed"
  echo "===================== Anchor peers updated for org '$CORE_PEER_LOCALMSPID' on channel '$CHANNEL_NAME' ===================== "
  sleep $DELAY
  echo
}

## Sometimes Join takes time hence RETRY at least 5 times
joinChannelWithRetry() {
  PEER=$1
  HOSP=$2
  setGlobals $PEER $HOSP

  set -x
  peer channel join -b $CHANNEL_NAME.block >&log.txt
  res=$?
  set +x
  cat log.txt
  if [ $res -ne 0 -a $COUNTER -lt $MAX_RETRY ]; then
    COUNTER=$(expr $COUNTER + 1)
    echo "peer${PEER}.hospital${HOSP} failed to join the channel, Retry after $DELAY seconds"
    sleep $DELAY
    joinChannelWithRetry $PEER $HOSP
  else
    COUNTER=1
  fi
  verifyResult $res "After $MAX_RETRY attempts, peer${PEER}.hospital${HOSP} has failed to join channel '$CHANNEL_NAME' "
}

installChaincode() {
  PEER=$1
  HOSP=$2
  setGlobals $PEER $HOSP
  VERSION=${3:-1.0}
  set -x
  peer chaincode install -n $CHAINCODE_NAME -v ${VERSION} -l ${LANGUAGE} -p ${CC_SRC_PATH} >&log.txt
  res=$?
  set +x
  cat log.txt
  verifyResult $res "Chaincode installation on peer${PEER}.hospital${HOSP} has failed"
  echo "===================== Chaincode is installed on peer${PEER}.hospital${HOSP} ===================== "
  echo
}

instantiateChaincode() {
  PEER=$1
  HOSP=$2
  setGlobals $PEER $HOSP
  VERSION=${3:-1.0}

  # while 'peer chaincode' command can get the orderer endpoint from the peer
  # (if join was successful), let's supply it directly as we know it using
  # the "-o" option
  if [ -z "$CORE_PEER_TLS_ENABLED" -o "$CORE_PEER_TLS_ENABLED" = "false" ]; then
    set -x
    peer chaincode instantiate -o orderer.ehrecords.com:7050 -C $CHANNEL_NAME -n $CHAINCODE_NAME -l ${LANGUAGE} -v ${VERSION} -c '{"Args":[]}' -P "AND ('Hospital1MSP.peer','Hospital2MSP.peer')" >&log.txt
    res=$?
    set +x
  else
    set -x
    peer chaincode instantiate -o orderer.ehrecords.com:7050 --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n $CHAINCODE_NAME -l ${LANGUAGE} -v 1.0 -c '{"Args":[]}' -P "AND ('Hospital1MSP.peer','Hospital2MSP.peer')" >&log.txt
    res=$?
    set +x
  fi
  cat log.txt
  verifyResult $res "Chaincode instantiation on peer${PEER}.hospital${HOSP} on channel '$CHANNEL_NAME' failed"
  echo "===================== Chaincode is instantiated on peer${PEER}.hospital${HOSP} on channel '$CHANNEL_NAME' ===================== "
  echo
}

upgradeChaincode() {
  PEER=$1
  HOSP=$2
  setGlobals $PEER $HOSP

  set -x
  peer chaincode upgrade -o orderer.ehrecords.com:7050 --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n $CHAINCODE_NAME -v 2.0 -c '{"Args":[]}' -P "AND ('Hospital1MSP.peer','Hospital2MSP.peer')"
  res=$?
  set +x
  cat log.txt
  verifyResult $res "Chaincode upgrade on peer${PEER}.hospital${HOSP} has failed"
  echo "===================== Chaincode is upgraded on peer${PEER}.hospital${HOSP} on channel '$CHANNEL_NAME' ===================== "
  echo
}

chaincodeQuery() {
  PEER=$1
  HOSP=$2
  setGlobals $PEER $HOSP
  #EXPECTED_RESULT=$3
  echo "===================== Querying on peer${PEER}.hospital${HOSP} on channel '$CHANNEL_NAME'... ===================== "
  local rc=1
  local starttime=$(date +%s)

  # continue to poll
  # we either get a successful response, or reach TIMEOUT
  while
    test "$(($(date +%s) - starttime))" -lt "$TIMEOUT" -a $rc -ne 0
  do
    sleep $DELAY
    echo "Attempting to Query peer${PEER}.hospital${HOSP} ...$(($(date +%s) - starttime)) secs"
    set -x
    peer chaincode query -C $CHANNEL_NAME -n $CHAINCODE_NAME -c '{"Args":["GetAllPatients"]}' >&log.txt
    res=$?
    set +x
    #test $res -eq 0 && VALUE=$(cat log.txt | awk '/Query Result/ {print $NF}')
    #test "$VALUE" = "$EXPECTED_RESULT" && let rc=0
    # removed the string "Query Result" from peer chaincode query command
    # result. as a result, have to support both options until the change
    # is merged.
    #test $rc -ne 0 && VALUE=$(cat log.txt | egrep '^[0-9]+$')
    #test "$VALUE" = "$EXPECTED_RESULT" && let rc=0
  done
  echo
  cat log.txt
  #if test $rc -eq 0; then
  #  echo "===================== Query successful on peer${PEER}.hospital${HOSP} on channel '$CHANNEL_NAME' ===================== "
  #else
  #  echo "!!!!!!!!!!!!!!! Query result on peer${PEER}.hospital${HOSP} is INVALID !!!!!!!!!!!!!!!!"
  #  echo "================== ERROR !!! FAILED to execute End-2-End Scenario =================="
  #  echo
  #  exit 1
  #fi
}

# fetchChannelConfig <channel_id> <output_json>
# Writes the current channel config for a given channel to a JSON file
fetchChannelConfig() {
  CHANNEL=$1
  OUTPUT=$2

  setOrdererGlobals

  echo "Fetching the most recent configuration block for the channel"
  if [ -z "$CORE_PEER_TLS_ENABLED" -o "$CORE_PEER_TLS_ENABLED" = "false" ]; then
    set -x
    peer channel fetch config config_block.pb -o orderer.ehrecords.com:7050 -c $CHANNEL --cafile $ORDERER_CA
    set +x
  else
    set -x
    peer channel fetch config config_block.pb -o orderer.ehrecords.com:7050 -c $CHANNEL --tls --cafile $ORDERER_CA
    set +x
  fi

  echo "Decoding config block to JSON and isolating config to ${OUTPUT}"
  set -x
  configtxlator proto_decode --input config_block.pb --type common.Block | jq .data.data[0].payload.data.config >"${OUTPUT}"
  set +x
}

# signConfigtxAsPeerOrg <org> <configtx.pb>
# Set the peerOrg admin of an org and signing the config update
signConfigtxAsPeerOrg() {
  PEERORG=$1
  TX=$2
  setGlobals 0 $PEERORG
  set -x
  peer channel signconfigtx -f "${TX}"
  set +x
}

# createConfigUpdate <channel_id> <original_config.json> <modified_config.json> <output.pb>
# Takes an original and modified config, and produces the config update tx
# which transitions between the two
createConfigUpdate() {
  CHANNEL=$1
  ORIGINAL=$2
  MODIFIED=$3
  OUTPUT=$4

  set -x
  configtxlator proto_encode --input "${ORIGINAL}" --type common.Config >original_config.pb
  configtxlator proto_encode --input "${MODIFIED}" --type common.Config >modified_config.pb
  configtxlator compute_update --channel_id "${CHANNEL}" --original original_config.pb --updated modified_config.pb >config_update.pb
  configtxlator proto_decode --input config_update.pb --type common.ConfigUpdate >config_update.json
  echo '{"payload":{"header":{"channel_header":{"channel_id":"'$CHANNEL'", "type":2}},"data":{"config_update":'$(cat config_update.json)'}}}' | jq . >config_update_in_envelope.json
  configtxlator proto_encode --input config_update_in_envelope.json --type common.Envelope >"${OUTPUT}"
  set +x
}

# parsePeerConnectionParameters $@
# Helper function that takes the parameters from a chaincode operation
# (e.g. invoke, query, instantiate) and checks for an even number of
# peers and associated org, then sets $PEER_CONN_PARMS and $PEERS
parsePeerConnectionParameters() {
  # check for uneven number of peer and org parameters
  if [ $(($# % 2)) -ne 0 ]; then
    exit 1
  fi

  PEER_CONN_PARMS=""
  PEERS=""
  while [ "$#" -gt 0 ]; do
    setGlobals $1 $2
    PEER="peer$1.hospital$2"
    PEERS="$PEERS $PEER"
    PEER_CONN_PARMS="$PEER_CONN_PARMS --peerAddresses $CORE_PEER_ADDRESS"
    if [ -z "$CORE_PEER_TLS_ENABLED" -o "$CORE_PEER_TLS_ENABLED" = "true" ]; then
      TLSINFO=$(eval echo "--tlsRootCertFiles \$PEER$1_HOSPITAL$2_CA")
      PEER_CONN_PARMS="$PEER_CONN_PARMS $TLSINFO"
    fi
    # shift by two to get the next pair of peer/org parameters
    shift
    shift
  done
  # remove leading space for output
  PEERS="$(echo -e "$PEERS" | sed -e 's/^[[:space:]]*//')"
}

# chaincodeInvoke <peer> <org> ...
# Accepts as many peer/org pairs as desired and requests endorsement from each
chaincodeInvoke() {
  parsePeerConnectionParameters $@
  res=$?
  verifyResult $res "Invoke transaction failed on channel '$CHANNEL_NAME' due to uneven number of peer and org parameters "

  # while 'peer chaincode' command can get the orderer endpoint from the
  # peer (if join was successful), let's supply it directly as we know
  # it using the "-o" option
  if [ -z "$CORE_PEER_TLS_ENABLED" -o "$CORE_PEER_TLS_ENABLED" = "false" ]; then
    set -x
    peer chaincode invoke -o orderer.ehrecords.com:7050 -C $CHANNEL_NAME -n $CHAINCODE_NAME $PEER_CONN_PARMS -c '{"Args":["CreatePatient","Juan","Carlos","15","15"]}' >&log.txt
    res=$?
    set +x
  else
    set -x
    peer chaincode invoke -o orderer.ehrecords.com:7050 --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n $CHAINCODE_NAME $PEER_CONN_PARMS -c '{"Args":["CreatePatient","Juan","Carlos","15","15"]}' >&log.txt
    res=$?
    set +x
  fi
  cat log.txt
  #verifyResult $res "Invoke execution on $PEERS failed "
  #echo "===================== Invoke transaction successful on $PEERS on channel '$CHANNEL_NAME' ===================== "
  echo "Invoke finished"
}
