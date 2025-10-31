import { useState } from "react";
import Produto from "../../../Models/Produto";
import { error } from "console";

function CadastrarProduto() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState(0);
  const [preco, setPreco] = useState(0);

  function enviarProduto(event: any) {
    event.preventDefault();
    submeterProduto();
  }

  async function submeterProduto() {
    try {
      const produto: Produto = {
        nome: nome,
        descricao: descricao,
        preco: preco,
        quantidade: quantidade,
      };

      const resposta = await fetch(
        "http://localhost:5011/api/produto/cadastrar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(produto),
        }
      );
      if (!resposta.ok) {
        throw new Error("Erro no cadastro:" + resposta.statusText);
      }
    } catch (error) {
      console.log("Erro na requisição: " + error);
    }
  }

  return (
    <div>
      <h1>Cadastrar Produto</h1>
      <form onSubmit={enviarProduto}>
        <div>
          <label>Nome:</label>
          <input type="text" onChange={(e: any) => setNome(e.target.value)} />
        </div>
        <div>
          <label>Descrição:</label>
          <input
            type="text"
            onChange={(e: any) => setDescricao(e.target.value)}
          />
        </div>
        <div>
          <label>Quantidade:</label>
          <input
            type="text"
            onChange={(e: any) => setQuantidade(e.target.value)}
          />
        </div>
        <div>
          <label>Preço:</label>
          <input type="text" onChange={(e: any) => setPreco(e.target.value)} />
        </div>
        <div>
          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  );
}

export default CadastrarProduto;
