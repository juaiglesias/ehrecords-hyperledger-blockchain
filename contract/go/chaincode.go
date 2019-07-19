/*
 * SPDX-License-Identifier: Apache-2.0
 */

package main

import (
	"fmt"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
)

// Chaincode is the definition of the chaincode structure.
type Chaincode struct {
}

// Init is called when the chaincode is instantiated by the blockchain network.
func (cc *Chaincode) Init(stub shim.ChaincodeStubInterface) sc.Response {
	fcn, params := stub.GetFunctionAndParameters()
	fmt.Println("Init()", fcn, params)
	return shim.Success(nil)
}

// Invoke is called as a result of an application request to run the chaincode.
func (cc *Chaincode) Invoke(stub shim.ChaincodeStubInterface) sc.Response {
	fcn, params := stub.GetFunctionAndParameters()
	var result string
	var err string
	if fcn == "createPatient" {
		result, err = createPatient(stub, params)
	}
	if err != nil {
		return shim.Error(err.Error())
	}

	return shim.Success(nil)
}

func createPatient(stub shim.ChaincodeStubInterface, args []string) (string, error) {
	if len(args) != 5 {
		return "", fmt.Errorf("Failed to create Patient: The number of arguments is incorrect")
	}

	value, err := stub.
}
