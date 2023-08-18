// Tests para Lottery.sol.
// Importando o modulo assert.
// Assert é usado para fazer uma comparação entre dois valores.
const assert = require('assert');

// Ganashe é uma rede local que simula uma rede ethereum.
// Provider é um objeto que nos permite se conectar a uma rede ethereum.
const ganache = require('ganache');

// Web3 é uma biblioteca que nos permite interagir com o ethereum.
// Sempre que fizermos o uso da Web3, estaremos importando uma função construtora.
// Web3 é uma função construtora. Por isso, a primeira letra é maiuscula.
/* Existe uma diferença as versões Web3 0.x.x e Web3 1.x.x. Resumidamente, a versão 0.x.x não tem suporte de promises e callbacks, já a versão Web3 1.x.x possui esses suportes*/
const { Web3 } = require('web3');

// Criando uma instancia do Web3.
// Todas funções chamado pelo web3, são retornadas como promises.
// Usamos a Web3 para implantar um contrato ou interagir com um contrato existente.
// Para criar um contrato, precisamos de uma interface e um bytecode.
// Para interagir com um contrato, precisamos de uma interface e um endereço.
const web3 = new Web3(ganache.provider());

// Importando o bytecode e a interface do contrato Lottery.sol.
// abi é a interface do contrato.
// evm é o bytecode do contrato.
const { abi, evm } = require('../compile');


let accounts;
let lottery;

// usamos async para indicar que a função é assincrona.
// usamos await para indicar que a função deve esperar o retorno da promise.
beforeEach(async () => {
    // Pegando uma lista de todas as contas.
    accounts = await web3.eth.getAccounts();

    // usando uma das conta para deploy do contrato.
    // o metodo deploy é usado para deployar o contrato.
    // o metodo send é usado para enviar uma transação.
    // o Lottery é uma instancia do contrato.
    // o Contrato é uma função construtora e nos permite interagir com o contrato ou criar e implantar novos contratos.
    lottery = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object })
        .send({ from: accounts[0], gas: '1000000' });
});

// describe é usado para agrupar testes.
describe("Lottery Contract", () => {
    it("Deploy a contract", () => {
        // ok é usado para verificar se o valor é verdadeiro.
        assert.ok(lottery.options.address);
    })
})