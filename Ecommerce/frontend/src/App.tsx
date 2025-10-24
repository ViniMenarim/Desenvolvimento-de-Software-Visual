import React from "react";
import ListarProdutos from "./Components/Pages/Produtos/ListarProdutos";
import CadastrarProdutos from "./Components/Pages/Produtos/CadastrarProduto";

function App() {
  return (
    <div id="listar_produtos">
      <ListarProdutos></ListarProdutos>
      <CadastrarProdutos></CadastrarProdutos>
    </div>
  );
}

export default App;
