import { useState } from "react";
import Produto from "../../../Models/Produto";

function CadastrarProduto() {
  const [nome, setNome] = useState("");

  function enviarProduto(event: any) {
    event.preventDefault();
  }

  async function submeterProduto() {
    const produto: Produto = {
      nome: nome,
      descricao: "Incrível",
      preco: 999.99,
      quantidade: 10,
    };

    const resposta = await fetch("http://localhost:5011/api/produto/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "aplication/json",
      },
      body: JSON.stringify(produto),
    });
  }

  function escreverNome(event: any) {
    setNome(event.target.value);
  }

  return (
    <div>
      <h1>Cadastrar Produto</h1>
      <form onSubmit={enviarProduto}>
        <div>
          <label>Nome:</label>
          <input onChange={escreverNome} type="text" />
        </div>
        <div>
          <label>Descrição:</label>
          <input onChange={escreverNome} type="text" />
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
}

export default CadastrarProduto;
