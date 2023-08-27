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

    // Instanciando o contrato Lottery.
    // o accounts[0] é a conta que vai fazer o deploy do contrato.
    // o evm.bytecode.object é o bytecode do contrato.
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

    // criando um teste para verificar se o jogador é adicionado a lista de jogadores.
    it("Allow one account to enter", async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            // convertendo o valor para wei.
            value: web3.utils.toWei('0.02', 'ether')
        });

        // retornando uma lista de jogadores para variavel players.
        const players = await lottery.methods.returnPlayers().call({
            from: accounts[0]
        })

        assert.equal(accounts[0], players[0]);
        // 1 é o numero de jogadores que esperamos ter na lista.
        assert.equal(1, players.length)

    });

    // criando um teste para verificar se varios jogadores são adicionados a lista de jogadores.
    it("Allow multiple account to enter", async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            // convertendo o valor para wei.
            value: web3.utils.toWei('0.02', 'ether')
        });

        await lottery.methods.enter().send({
            from: accounts[1],
            // convertendo o valor para wei.
            value: web3.utils.toWei('0.02', 'ether')
        });

        await lottery.methods.enter().send({
            from: accounts[2],
            // convertendo o valor para wei.
            value: web3.utils.toWei('0.02', 'ether')
        });

        // retornando uma lista de jogadores para variavel players.
        const players = await lottery.methods.returnPlayers().call({
            from: accounts[0]
        })

        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        // 1 é o numero de jogadores que esperamos ter na lista.
        assert.equal(3, players.length)

    });

    it('requires a minimal amount of ether to enter', async () => {
        try {
            await lottery.methods.enter().send({
                from: accounts[0],
                value: web3.utils.toWei('0', 'ether')

            });
            // se o codigo chegar aqui, o teste falhou.
            assert(false);
        }
        catch (err) {
            // err é um objeto que contem a mensagem de erro.
            assert(err);
        }

        // se nosso try catch funcionar significa que o teste passou, porém se o assert(false) fro executado, significa que o teste falhou.
    });

    it('only manager can call pickWinner', async () => {
        try {
            await lottery.methods.pickWinner().send({
                from: accounts[1]
            });
            assert(false);
        }
        catch (err) {
            assert(err);
        }
    })

    it('sends money to the winner and resets the players array', async () => {
        // Entrando na loteria.
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('2', 'ether')
        });

        // Pegando o saldo inicial da conta do jogador.
        const initialBalance = await web3.eth.getBalance(accounts[0]);

        // Escolhendo o vencedor.
        await lottery.methods.pickWinner().send({
            from: accounts[0]
        });

        // Pegando o saldo final da conta do jogador.
        const finalBalance = await web3.eth.getBalance(accounts[0]);

        // o difference é o valor que o jogador ganhou.
        const difference = finalBalance - initialBalance;

        // fazemos a comparação para verificar se o jogador ganhou mais de 1.9 ether.
        assert(difference > web3.utils.toWei('1.9', 'ether'));

        // Verificando se o saldo da conta do contrato é igual a 0.
        // lottery.options.address é o endereço do contrato.
        const lotteryBalance = await web3.eth.getBalance(lottery.options.address);
        assert.equal(lotteryBalance, 0);

        // Verificando se a lista de jogadores está vazia.
        const players = await lottery.methods.returnPlayers().call({
            from: accounts[0]
        })

        assert.equal(players.length, 0);

})

})

