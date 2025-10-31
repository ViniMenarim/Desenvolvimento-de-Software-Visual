import React from "react";
import ListarProdutos from "./Components/Pages/Produtos/ListarProdutos";
import CadastrarProdutos from "./Components/Pages/Produtos/CadastrarProduto";
import { BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Listar Produtos</Link>
            </li>
            <li>
              <Link to="produto/cadastrar">Cadastrar Produtos</Link>
            </li>
          </ul>
        </nav>
      </BrowserRouter>
    </div>
  );
}

export default App;
