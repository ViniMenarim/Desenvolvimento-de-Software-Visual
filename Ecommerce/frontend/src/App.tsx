import React from "react";
import "./Components/App.css";
import ListarProdutos from "./Components/ListarProdutos";
import CadastrarProduto from "./Components/CadastrarProduto";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";

function App() {
  return (
    <div id="app">
      {/* BrowserRouter habilita a navegação sem recarregar a página inteira (SPA) */}
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              {/* <Link> é usado no lugar de <a> para navegação interna rápida */}
              <Link to="/">Listar Produtos</Link>
            </li>
            <li>
              <Link to="/produto/cadastrar"> Cadastrar Produtos </Link>
            </li>
          </ul>
        </nav>

        {/* Routes define qual componente aparece baseado na URL do navegador */}
        <Routes>
          {/* Se a URL for "/", mostra a lista */}
          <Route path="/" element={<ListarProdutos />} />
          {/* Se a URL for "/produto/cadastrar", mostra o formulário */}
          <Route path="/produto/cadastrar" element={<CadastrarProduto />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
