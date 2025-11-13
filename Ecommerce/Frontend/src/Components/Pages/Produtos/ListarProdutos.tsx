import { useEffect, useState } from "react";
import Produto from "../../../Models/Produto";
import axios from "axios";

function ListarProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    console.log("O componente foi carregado!");
    buscarProdutosAPI();
  }, []);

  async function buscarProdutosAPI() {
    try {
      const resposta = await axios.get(
        "http://localhost:5011/api/produto/listar"
      );
      setProdutos(resposta.data);
    } catch (error) {
      console.log("Erro na requisição: " + error);
    }
  }

  async function deletarProduto(id: string) {
    try {
      const resposta = await axios.delete(
        `http://localhost:5011/api/produto/remover/${id}`
      );

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
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.id}</td>
              <td>{produto.nome}</td>
              <td>{produto.descricao}</td>
              <td>{produto.quantidade}</td>
              <td>{produto.preco}</td>
              <td>{produto.criadoEm}</td>
              <td>
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
