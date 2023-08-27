// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Lottery {
    // Queremos usar essa variável onde terá o endereço do dono do contrato
    address public manager;
    // Uma array onde os endereços dos jogadores vão entrar na loteria
    address payable[] public players;

    constructor() {
        // usamos o construtor para setar o endereço na variável managager de quem implantar o contrato na rede
        // o msg.render é um propriedade onde armazena o endereço de quem implantou um contrato ou realizou uma transação.
        manager = msg.sender;
    }

    // função para que o jogador envie um quantidade minima para participar da loteria
    // como é função de transferencia de valores precisamos usar o "payable" 
    // usamos o push com a variavel global, onde quando o jogador enviar um valor ele estara no array
    function enter() public payable {
        //require é usado para validação, podemos passar alguma expressão booleana.
        // nesse require a condição é que o valor transferido tem que ser maior que 0.1 ether
        require(msg.value > .01 ether);

        players.push(payable(msg.sender));
    }

    // Criando uma função pseudoaleatório
    // função vai ser private já que so quero que o criador do contrato chame a função
    function random() private view returns (uint) {
        // Chamando o algoritmo keccak256 para retornar um valor hexadecimal, o sha3 é uma função global
        /* block é uma variavel global que pode ser chamado a qualquer momento e .difficulty é pegar
           a dificuldade da validação de um bloco*/
        // block.timestamp é uma variavel global onde podemos pegar o horario atual

        // usamos abi.encodePack para codificar um conjunto de valores, e passamos para o keccak
        // logo após convertemos para um valor uint

        return uint(keccak256(abi.encodePacked(block.prevrandao, block.timestamp, players)));
    }

    // criando a função para escolher um vencedor
    // com o random() podemos acessar um indice através do length de um array dos endereços dos players
    function pickWinner() public restricted {

        uint index = random() % players.length;

        // transferindo o valor do contrato para o endereço do vencedor
        players[index].transfer(address(this).balance);

        // Para sempre que finalizar um sorteio inicializará outro
        // o (0) significa que o array inicializará com nenhum elementos.
        players = new address payable[](0);

    }

    /* um modifier é um pedaço de código que pode ser reutilizado em várias funções em Solidity. 
    Ele é usado para modificar o comportamento de uma função, adicionando funcionalidades adicionais ou 
    verificando se certas condições são atendidas antes de executar o restante do código da função*/
    modifier restricted() {
        // criando uma condição onde somente o manager pode escolher o vencedor (chamar a função)
        require(msg.sender == manager);

        // _ é uma palavra reservada que significa que o restante do código da função será executado
        _;
    }

    // Função para retornar todos os players
    function returnPlayers() public view returns (address payable[] memory) {
        return players;
    }

}