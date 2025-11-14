import { useEffect, useState } from "react";
import Produto from "../Models/Produto";
import axios from "axios";

function ListarProdutos() {
  // Estado que armazena a LISTA (array) de produtos vinda da API
  const [produtos, setProdutos] = useState<Produto[]>([]);

  // --- CICLO DE VIDA (useEffect) ---
  // O array vazio [] no final indica que isso roda apenas UMA vez,
  // assim que o componente aparece na tela (mount).
  useEffect(() => {
    console.log("O componente foi carregado!");
    buscarProdutosAPI();
  }, []);

  // Busca os dados no backend (GET)
  async function buscarProdutosAPI() {
    try {
      const resposta = await axios.get(
        "http://localhost:5011/api/produto/listar"
      );
      // Atualiza o estado 'produtos', o que força a tabela a ser redesenhada com os dados novos
      setProdutos(resposta.data);
    } catch (error) {
      console.log("Erro na requisição: " + error);
    }
  }

  // Deleta um item e atualiza a lista visualmente
  async function deletarProduto(id: string) {
    try {
      const resposta = await axios.delete(
        `http://localhost:5011/api/produto/remover/${id}`
      );

      // DICA: Após deletar, chamamos buscarProdutosAPI() novamente
      // para garantir que a lista na tela esteja sincronizada com o banco.
      buscarProdutosAPI();
    } catch (error) {
      console.log("Erro ao deletar o produto: " + error);
    }
  }

  return (
    <div id="listar_produtos">
      <h1>Listar Produtos</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Preço</th>
            <th>Criado Em</th>
            <th>Deletar</th>
          </tr>
        </thead>
        <tbody>
          {/* .map funciona como um "foreach", criando uma linha <tr> para cada produto */}
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.id}</td>
              <td>{produto.nome}</td>
              <td>{produto.descricao}</td>
              <td>{produto.quantidade}</td>
              <td>{produto.preco}</td>
              <td>{produto.criadoEm}</td>
              <td>
                {/* O botão chama a função passando o ID específico desta linha */}
                <button onClick={() => deletarProduto(produto.id!)}>
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarProdutos;