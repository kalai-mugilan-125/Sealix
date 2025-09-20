package main

import (
    "encoding/json"
    "fmt"
    "github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type SmartContract struct {
    contractapi.Contract
}

type DocumentHash struct {
    DocID     string `json:"docId"`
    Hash      string `json:"hash"`
    Timestamp string `json:"timestamp"`
    IssuedBy  string `json:"issuedBy"`
}

func (s *SmartContract) StoreHash(ctx contractapi.TransactionContextInterface, docId string, hash string, issuedBy string) error {
    docHash := DocumentHash{
        DocID:     docId,
        Hash:      hash,
        Timestamp: ctx.GetStub().GetTxTimestamp().String(),
        IssuedBy:  issuedBy,
    }
    
    hashAsBytes, err := json.Marshal(docHash)
    if err != nil {
        return fmt.Errorf("failed to marshal document hash: %v", err)
    }
    
    return ctx.GetStub().PutState(docId, hashAsBytes)
}

func (s *SmartContract) ValidateHash(ctx contractapi.TransactionContextInterface, docId string, hash string) (bool, error) {
    hashAsBytes, err := ctx.GetStub().GetState(docId)
    if err != nil {
        return false, fmt.Errorf("failed to read document hash: %v", err)
    }
    
    if hashAsBytes == nil {
        return false, fmt.Errorf("document hash not found for ID: %s", docId)
    }
    
    var docHash DocumentHash
    err = json.Unmarshal(hashAsBytes, &docHash)
    if err != nil {
        return false, fmt.Errorf("failed to unmarshal document hash: %v", err)
    }
    
    return docHash.Hash == hash, nil
}

func main() {
    chaincode, err := contractapi.NewChaincode(&SmartContract{})
    if err != nil {
        fmt.Printf("Error creating chaincode: %s", err.Error())
        return
    }
    
    if err := chaincode.Start(); err != nil {
        fmt.Printf("Error starting chaincode: %s", err.Error())
    }
}