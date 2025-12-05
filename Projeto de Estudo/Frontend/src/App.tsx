import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
// Importação dos componentes das páginas
import TarefaListar from "./Pages/ListarTarefas";
import TarefaCadastrar from "./Pages/CadastrarTarefa";
import TarefaAlterar from "./Pages/AlterarTarefa";
import TarefaConcluidas from "./Pages/TarefasConcluidas";
import TarefaNaoConcluidas from "./Pages/TarefasNãoConcluidas";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      {/* BrowserRouter habilita o roteamento sem recarregar a página (SPA) */}
      <BrowserRouter>
        <nav style={{ marginBottom: "20px" }}>
          {/* Menu de navegação usando <Link> ao invés de <a> para performance */}
          <ul style={{ display: "flex", gap: "15px", listStyle: "none" }}>
            <li>
              <Link to="/pages/tarefa/listar">Listar Todas</Link>
            </li>
            <li>
              <Link to="/pages/tarefa/cadastrar">Cadastrar</Link>
            </li>
            <li>
              <Link to="/pages/tarefa/alterar">Alterar Status</Link>
            </li>
            <li>
              <Link to="/pages/tarefa/naoconcluidas">Não Concluídas</Link>
            </li>
            <li>
              <Link to="/pages/tarefa/concluidas">Concluídas</Link>
            </li>
          </ul>
        </nav>

        {/* Define qual componente aparece dependendo da URL no navegador */}
        <Routes>
          <Route path="/pages/tarefa/listar" element={<TarefaListar />} />
          <Route path="/pages/tarefa/cadastrar" element={<TarefaCadastrar />} />
          <Route path="/pages/tarefa/alterar" element={<TarefaAlterar />} />
          <Route
            path="/pages/tarefa/naoconcluidas"
            element={<TarefaNaoConcluidas />}
          />
          <Route
            path="/pages/tarefa/concluidas"
            element={<TarefaConcluidas />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
