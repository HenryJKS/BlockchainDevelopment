// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;
pragma experimental ABIEncoderV2;

import "./SimpleStorage.sol";

// Herança
contract StorageFactory is SimpleStorage{


    // Criando Array
    SimpleStorage[] public simpleStorageArray;

    // Função para criar um contrato simples
    function createSimpleStorageContract() public {
        // Instanciando a Classe
        SimpleStorage simple = new SimpleStorage();
        simpleStorageArray.push(simple);
    }

    // Função para adicionar um numero para o endereco
    function sfStore(uint256 _simpleStorageIndex, uint256 _simpleStorageNumber) public {
        //Address
        //ABI
        return SimpleStorage(address(simpleStorageArray[_simpleStorageIndex])).store(_simpleStorageNumber);
    }

    // Função para retornar o numero atrave´s do index
    function sfGet(uint256 _simplesStorageIndex) public view returns (uint256) {
        return SimpleStorage(address(simpleStorageArray[_simplesStorageIndex])).retrieve();
    }




}