// Especifica a versão do Solidity  
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Definindo a estrutura de um contrato
// a palavra "contract" é um como uma palavra-chave

/* 
    Tipos de Funções:
    Public: Significa que essa função pode ser chamado por qualquer pessoa.

    Private: Significa que essa função só pode ser chamado pelo nosso código de contrato. Usamos esse tipo quando criarmos uma função auxiliar somente para um código.

    View/Constant: Significa que uma função View/Constant que apenas lê, mas não altera as varíaveis denifidas no contrato.

    Pure: É um tipo parecido com a View/Constant, porém é uma função onde não pode modificar e nem acessar as variaveis do contrato.

    Payable: É um tipo de função onde podemos chamar para efetuar um pagamento para o contrato, 
    onde um usuario interno ou externo pode chamar.
*/

contract Inbox {
    // Declarando uma variavel de instancia
    // a varíavel é public e pode ser acessível para todo mundo
    // Quando criamos uma variavel do tipo public ele automaticamente já cria um função de retorno implicito
    string public message;

    //Criando primeira função
    // Essa função possui o mesmo nome do contrato, considerando como uma função construtora
    // a função construtora são chamados automaticamente uma vez quando o contrato é criado pela primeira vez

    constructor(string memory initialMessage) {
        message = initialMessage;
    }

    //Criando segunda função
    function setMessage(string memory newMessage) public {
        message = newMessage;
    }

    //Criando terceira função
    // Essa função não é necessário já que quando criamos uma variavel publica ele ja cria uma função de retorno.
    function getMessage() public view returns (string memory) {
        return message;
    }
}