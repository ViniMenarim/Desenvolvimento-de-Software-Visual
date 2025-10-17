import { error } from "console";
import { useEffect } from "react";

function ListarProdutos() {
  useEffect(() => {
    console.log("Componente carregado");
    buscarProdutos();
  }, []);

  async function buscarProdutos() {
    try {
      const resposta = await fetch("http://localhost:5011/api/produto/listar");

      if (resposta.ok) {
        throw new Error("Erro na requisição" + resposta.statusText);

        const dados = await resposta.json();
        console.table(dados);
      }
    } catch (error) {}
    console.log("Erro na requisição" + error);
  }

  return (
    <div id="listar_produtos">
      <h1>Listar Produtos</h1>
    </div>
  );
}

export default ListarProdutos;
