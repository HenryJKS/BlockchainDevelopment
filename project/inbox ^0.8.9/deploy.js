// Importando o HDWalletProvider.
// HDWalletProvider é um provedor que nos permite se conectar a uma rede ethereum.
const HDWalletProvider = require('@truffle/hdwallet-provider');

// Importando o Web3.
const { Web3 }  = require('web3');

// Importando o bytecode e a interface do contrato Inbox.sol.
const {abi, evm} = require('./compile');

// provider é um objeto que nos permite se conectar a uma rede ethereum.
// Especificar qual conta queremos usar para implantar o contrato.
    provider = new HDWalletProvider(
    // primeiro argumento: palavras Mnemonic da conta.
    'between inform top steel awkward below dress mother spare banana iron law',

    // segundo argumento: link para a rede ethereum.
    'https://sepolia.infura.io/v3/ea477898b8754b17829cb4ba95b8cbed'
);

// Instanciando o Web3 com o provider.
const web3 = new Web3(provider);

// Criando uma função assíncrona para implantar o contrato.
// O async/await é uma forma de escrever código assíncrono de forma síncrona.
const deploy = async() => {
    // Obtendo uma lista de todas as contas.
    // await é usado para esperar que a promessa seja resolvida.
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from acconunt', accounts[0]);

    const result = await new web3.eth.Contract(abi)
        // o método deploy é usado para implantar o contrato.
        .deploy({ data: evm.bytecode.object, arguments: ['Hi There'] })
        // o método send é usado para enviar uma transação que modifica o contrato.
        .send({ gas : '1000000', from : accounts[0]});

    // Imprimindo o endereço do contrato implantado.
    console.log('Contract deployed to:', result.options.address)

    // Encerrando o provider.
    provider.engine.stop();
};

deploy();