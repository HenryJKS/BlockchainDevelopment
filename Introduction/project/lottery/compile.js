/* Em const path criamos um caminho especifico para o arquivo Lottery.sol */
const path = require('path');

/* Em const fs criamos uma variavel para ler o arquivo Lottery.sol */
const fs = require('fs');

/* Em const solc criamos uma variavel para compilar o arquivo Lottery.sol */
const solc = require('solc');

/* criando um caminho para o Lottery.sol, __dirname é usado para ir na raiz do projeto
no segundo parametro é a pasta onde está o projeto e em seguida o nome do proprio projeto */
const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');

/* lendo o arquivo Lottery.sol e passando o encoding para utf8 */
/* o encoding é usado para que o arquivo seja lido corretamente */
const source = fs.readFileSync(lotteryPath, 'utf8');

// o input é o que será compilado e o output é o que será retornado
const input = {
    language: 'Solidity',
    sources: {
        'Lottery.sol': {
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
/* o contrato Lottery é o que queremos compilar (Interface(ABI) e o Bytecode(Código compilado) )*/
/* o 1 é o numero de contratos que queremos compilar */
module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Lottery.sol'].Lottery;
