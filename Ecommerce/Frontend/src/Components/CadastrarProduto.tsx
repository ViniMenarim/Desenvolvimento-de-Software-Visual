import { useState } from "react";
import Produto from "../Models/Produto";
import axios from "axios";

function CadastrarProduto() {
  // --- ESTADOS (STATE) ---
  // Variáveis que armazenam o que o usuário digita.
  // Se precisar adicionar um campo novo (ex: 'Categoria'), crie um state novo aqui.
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState(0);
  const [preco, setPreco] = useState(0);

  // Função disparada ao clicar no botão "Cadastrar" ou dar Enter no form
  function enviarProduto(event: any) {
    // Evita que a página recarregue (comportamento padrão do HTML)
    event.preventDefault();
    submeterProdutoAPI();
  }

  // Função assíncrona que faz a chamada real para o Backend
  async function submeterProdutoAPI() {
    try {
      // Monta o objeto conforme a interface 'Produto' espera
      const produto: Produto = {
        nome,
        descricao,
        preco,
        quantidade,
      };

      // Envia os dados via POST para a sua API
      const resposta = await axios.post(
        "http://localhost:5011/api/produto/cadastrar",
        produto
      );

      console.log(await resposta.data);
      // DICA: Aqui seria um bom lugar para limpar os campos ou mostrar um alerta de "Sucesso"
    } catch (error: any) {
      // Tratamento de erro específico (ex: Produto duplicado - Status 409)
      if (error.status === 409) {
        console.log("Esse produto já foi cadastrado!");
        alert("Erro: Produto já existe."); // Sugestão de melhoria
      }
    }
  }

  return (
    <div>
      <h1>Cadastrar Produto</h1>
      <form onSubmit={enviarProduto}>
        {/* Cada div abaixo representa um campo do formulário */}
        <div>
          <label>Nome:</label>
          {/* onChange captura cada tecla digitada e atualiza o Estado 'nome' */}
          <input onChange={(e: any) => setNome(e.target.value)} type="text" />
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
