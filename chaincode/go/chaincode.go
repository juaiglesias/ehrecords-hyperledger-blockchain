/*
 * SPDX-License-Identifier: Apache-2.0
 */

package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"strconv"
	"time"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
)

type Record struct {
	Information string    `json:"information"`
	Date        time.Time `json:"date"`
	DoctorId    string    `json:"doctorId"`
}

type Patient struct {
	FirstName string   `json:"firstName"`
	LastName  string   `json:"lastName"`
	Age       uint8    `json:"age"`
	Address   string   `json:"address"`
	Records   []Record `json:"records"`
}

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
	var result []byte
	var err error
	if fcn == "GetAllPatients" {
		result, err = cc.GetAllPatients(stub)
	} else if fcn == "GetPatient" {
		result, err = cc.GetPatient(stub, params)
	} else if fcn == "CreatePatient" {
		result, err = cc.CreatePatient(stub, params)
	} else if fcn == "AddRecordToPatient" {
		result, err = cc.AddRecordToPatient(stub, params)
	}
	if err != nil {
		return shim.Error(err.Error())
	}

	return shim.Success(result)
}

func (cc *Chaincode) CreatePatient(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	if len(args) != 5 {
		return nil, fmt.Errorf("Failed to create Patient: The number of arguments is incorrect")
	}

	//Create new Patient
	var ageConverted, err = strconv.ParseUint(args[3], 10, 8)
	if err != nil {
		return nil, fmt.Errorf("Failed to create Patient: Age is not a valid number")
	}

	var newPatient = Patient{FirstName: args[1], LastName: args[2], Age: uint8(ageConverted), Address: args[4], Records: []Record{}}

	newPatientAsBytes, err := json.Marshal(newPatient)
	if err != nil {
		return nil, fmt.Errorf("Failed to create Patient")
	}

	stub.PutState(args[0], newPatientAsBytes)
	return newPatientAsBytes, nil
}

func (cc *Chaincode) AddRecordToPatient(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	if len(args) != 4 {
		return nil, fmt.Errorf("Failed to add Record: The number of arguments is incorrect")
	}

	//Parse to Time the date
	myDate, err := time.Parse("2006-01-02 15:04", args[2])
	if err != nil {
		return nil, fmt.Errorf("Failed to add Record: Date is not valid")
	}

	//Create the record
	var newRecord = Record{Information: args[1], Date: myDate, DoctorId: args[3]}

	existingPatientAsBytes, err := stub.GetState(args[0])
	if err != nil {
		return nil, fmt.Errorf("Failed to add Record: Could not get the patient")
	}

	existingPatient := Patient{}
	json.Unmarshal(existingPatientAsBytes, &existingPatient)
	existingPatient.Records = append(existingPatient.Records, newRecord)

	existingPatientAsBytes, err = json.Marshal(existingPatient)

	if err != nil {
		return nil, fmt.Errorf("Failed to add Record")
	}

	stub.PutState(args[0], existingPatientAsBytes)
	return existingPatientAsBytes, nil
}

func (cc *Chaincode) GetPatient(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	if len(args) != 1 {
		return nil, fmt.Errorf("Failed to get Patient: The number of arguments is incorrect")
	}

	patientAsBytes, err := stub.GetState(args[0])

	if err != nil {
		return nil, fmt.Errorf("Failed to get Patient %s", args[0])
	}

	if patientAsBytes == nil {
		return nil, fmt.Errorf("Failed to get Patient %s: It doet not exists", args[0])
	}

	return patientAsBytes, nil
}

func (cc *Chaincode) GetAllPatients(stub shim.ChaincodeStubInterface) ([]byte, error) {
	iterator, err := stub.GetStateByRange("", "")
	if err != nil {
		return nil, fmt.Errorf("Failed to get all Patients")
	}

	defer iterator.Close()

	var buffer bytes.Buffer
	first := true
	buffer.WriteString("[")

	for iterator.HasNext() {
		next, err := iterator.Next()
		if err != nil {
			return nil, fmt.Errorf("Failed to get all Patients")
		}

		if first == false {
			buffer.WriteString(", ")
		} else {
			first = false
		}

		buffer.WriteString("{ 'Key': ")
		buffer.WriteString(next.Key)
		buffer.WriteString(", 'Value': ")
		buffer.Write(next.Value)
		buffer.WriteString("}")
	}

	buffer.WriteString("]")

	return buffer.Bytes(), nil
}
