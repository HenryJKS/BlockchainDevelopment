/* Em const path criamos um caminho especifico para o arquivo Inbox.sol */
const path = require('path');

/* Em const fs criamos uma variavel para ler o arquivo Inbox.sol */
const fs = require('fs');

/* Em const solc criamos uma variavel para compilar o arquivo Inbox.sol */
const solc = require('solc');

/* criando um caminho para o inbox.sol, __dirname é usado para ir na raiz do projeto
no segundo parametro é a pasta onde está o projeto e em seguida o nome do proprio projeto */
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');

/* lendo o arquivo inbox.sol e passando o encoding para utf8 */
/* o encoding é usado para que o arquivo seja lido corretamente */
const source = fs.readFileSync(inboxPath, 'utf8');

// o input é o que será compilado e o output é o que será retornado
const input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};


/* exportando o modulo para ser usado em outro arquivo */
/* modulo é um objeto que contem uma coleção de variaveis e funções */
/* o contrato Inbox é o que queremos compilar (Interface(ABI) e o Bytecode(Código compilado) )*/
/* o 1 é o numero de contratos que queremos compilar */
module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Inbox.sol'].Inbox;
