import React, { useState, useEffect } from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

function App() {
  // o state é um objeto que contém dados que serão renderizados na tela
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [winner, setWinner] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    async function fetchData() {
      // chamando os metodos do contrato
      const manager = await lottery.methods.manager().call();
      const players = await lottery.methods.returnPlayers().call();
      // pegando o total de valor do contrato
      const balance = await web3.eth.getBalance(lottery.options.address);
      const winner = await lottery.methods.winner().call();

      setManager(manager);
      setPlayers(players);
      setBalance(balance);
      setWinner(winner);
    }

    fetchData();
  }, []);

  // Usa-se arrow function para não precisar fazer o bind do this
  // bind é usado para que o this seja o mesmo dentro da função
  async function handleSubmit(event) {
    // previne o comportamento padrão do submit
    event.preventDefault();

    // precisamos recuperar uma lista de contas para especificar quem está enviando a transação
    const accounts = await web3.eth.getAccounts();

    // Check if the value is greater than 0.11
    if (Number(value) <= 0.11) {
      setMessage("The value must be greater than 0.11 ether");
      return;
    }

    // definindo uma mensagem de espera
    setMessage("Waiting on transaction success...");
    await lottery.methods
      .enter()
      .send({
        from: accounts[0],
        value: web3.utils.toWei(value, "ether"),
      })
      // se a transação for bem sucedida a mensagem será alterada
      .then(() => { 
        setMessage("You have been entered");
      })
      // se a transação for mal sucedida a mensagem será alterada
      .catch((error) => {
        if (
          error.message.includes(
            "MetaMask Tx Signature: User denied transaction signature."
          )
        ) {
          setMessage("Transaction rejected by user");
        }
      });
  }

  // função para verificar se o valor digitado é um número
  function handleValueChange(event) {
    const value = event.target.value;
    if (!isNaN(value)) {
      setValue(value);
    }
  }

  async function handleClick() {
    const accounts = await web3.eth.getAccounts();

    setMessage("Waiting on transaction success..");

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });

    setMessage("A winner has been picked");
  }

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>
        This contract is managed by {manager}. There are currently{" "}
        {players.length} people entered, competing to win{" "}
        {web3.utils.fromWei(balance, "ether")} ether!
      </p>

      <hr />

      <form onSubmit={handleSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input value={value} onChange={handleValueChange} />
        </div>
        <button> Enter </button>
      </form>

      <hr />

      <h4>Ready to pick a Winner?</h4>
      <button onClick={handleClick}>Pick a Winner</button>

      <p>The winner is {winner}</p>

      <hr />
      <h1>{message}</h1>
    </div>
  );
}

export default App;
