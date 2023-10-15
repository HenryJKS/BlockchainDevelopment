// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Retorna {
    //Declarando uma variável tipo Array
    uint[] public myArray;
    string[] public arrayString;

    constructor() {
        //Como array não tem um tamanho definido então podemos usar o push e pop
        myArray.push(5);
        myArray.push(10);
        arrayString.push("Teste");
        arrayString.push("Teste2");
    }

    // Retornando o tamanho do Array
    function retornaLength() public view returns(uint) {
        return myArray.length;
    }

    // Retornando o valor de um index
    function retornaIndex() public view returns(uint) {
        return myArray[0];
    }

    // Retornando todos os valores do Array
    function retornaArray() public view returns(uint[] memory) {
        return myArray;
    }

}