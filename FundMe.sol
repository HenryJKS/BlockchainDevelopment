// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 < 0.9.0;
pragma experimental ABIEncoderV2;

// Importando o Aggregator
import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";
// Importando SafeMath
import "@chainlink/contracts/src/v0.6/vendor/SafeMathChainlink.sol";

/*  mapping(address => uint256) public addressToAmountFunded; define um mapping público chamado addressToAmountFunded. 
    Um mapping é uma estrutura de dados que associa valores do tipo uint256 a chaves do tipo address. 
    Neste caso, o mapping armazena a quantidade de fundos enviados por cada endereço. 
    A função fund() é uma função pública que pode ser chamada por qualquer pessoa para enviar fundos para o contrato. 
    A palavra-chave payable indica que a função pode receber Ether. 
    Quando a função é chamada, o valor enviado pelo remetente é adicionado ao valor armazenado no mapping para o endereço do remetente. 
    Isso é feito através da linha de código addressToAmountFunded[msg.sender] += msg.value;, onde msg.sender é o endereço do remetente e msg.value é a quantidade de Ether enviada.
*/

/* ABI: No contexto do Ethereum, uma ABI é uma representação em JSON da interface de um contrato inteligente. 
    Ela define as funções e eventos do contrato e como eles podem ser chamados. 
    A ABI é usada por aplicativos externos para interagir com o contrato inteligente na blockchain Ethereum 
*/

/* require: verifica se a condição específica é verdadeira, se for o codigo continua executando senão 
a transação é revertida e lança um erro */

contract FundMe {
    using SafeMathChainlink for uint256;

    mapping(address => uint256) public addressToAmountFunded;
    address[] public funders;
    address public owner;

    constructor() public {
        owner = msg.sender;
    }

    // Função que pode ser usado para pagamentos
    function fund() public payable {
        // $50
        uint256 minimumUSD = 50 * 10 ** 18;
        require(getConversionRate(msg.value) >= minimumUSD, "You need to spend more ETH");
        addressToAmountFunded[msg.sender] += msg.value;
        // what the ETH => USD conversion rate
        funders.push(msg.sender);
    }

    function getVersion() public view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        return priceFeed.version();
    }

    // Usamos ',,,,' para as variaveis que não vamos usar
    function getPrice() public view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        (,int256 answer,,,) = priceFeed.latestRoundData();
         return uint256(answer * 10000000000);
         //188414716422 = 1.884,14716422
    }
    
    //1000000000
    function getConversionRate(uint256 ethAmount) public view returns (uint256) {
        uint256 ethPrice = getPrice();
        uint256 ethAmountInUSD = (ethPrice * ethAmount) / 1000000000000000000;
        return ethAmountInUSD;
        // 0.000001884147164220
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Não é Dono");
        _;
    }

    function withdraw() payable onlyOwner public {
        msg.sender.transfer(address(this).balance);

        for (uint256 funderIndex = 0; funderIndex < funders.length; funderIndex++) {
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }

        funders = new address[](0);
    }

}