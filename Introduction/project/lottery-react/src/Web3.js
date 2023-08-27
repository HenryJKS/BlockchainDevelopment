import Web3 from "web3";

// Solicitando acesso a conta do usuário
window.ethereum.request({ method: "eth_requestAccounts" });

// Criando uma instancia do Web3
const web3 = new Web3(window.ethereum);

export default web3;
