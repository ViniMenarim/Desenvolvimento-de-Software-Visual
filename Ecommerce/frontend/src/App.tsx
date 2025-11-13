import React from "react";
import ListarProdutos from "./Components/Pages/Produtos/ListarProdutos";
import CadastrarProduto from "./Components/Pages/Produtos/CadastrarProduto";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
              <Link to="/produto/cadastrar"> Cadastrar Produtos </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<ListarProdutos />} />
          <Route path="/produto/cadastrar" element={<CadastrarProduto />} />
        </Routes>
        <footer>Rodapé da aplicação</footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
