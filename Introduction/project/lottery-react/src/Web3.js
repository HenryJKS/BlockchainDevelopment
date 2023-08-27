import Web3 from "web3";

// fazendo a requisição da conta do metamask
window.ethereum.request({ method: "eth_requestAccounts"});

// criando a instancia do web3
const web3 = new Web3(window.ethereum)

export default web3;