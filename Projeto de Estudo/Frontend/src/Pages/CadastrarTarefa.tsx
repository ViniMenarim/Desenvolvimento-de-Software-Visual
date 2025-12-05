import { useState } from "react";
import { type Tarefa } from "../../Models/Tarefa";
import { useNavigate } from "react-router-dom";

function TarefaCadastrar() {
  const navigate = useNavigate(); // Hook para redirecionar o usuário após cadastro
  // States para capturar o que o usuário digita nos inputs
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  function cadastrar(e: any) {
    e.preventDefault(); // Evita que a página recarregue ao enviar o formulário

    const tarefa: Tarefa = {
      titulo: titulo,
      descricao: descricao,
      status: "Não iniciada", // Envia o padrão, embora o backend também garanta isso
    };

    // Envia os dados para a API (POST)
    fetch("http://localhost:5105/api/tarefa/cadastrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tarefa),
    }).then((resposta) => {
      if (resposta.ok) {
        navigate("/pages/tarefa/listar"); // Volta para a listagem se der certo
      }
    });
  }

  return (
    <div>
      <h1>Cadastrar Tarefa</h1>
      <form onSubmit={cadastrar}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <input type="text" onChange={(e) => setDescricao(e.target.value)} />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default TarefaCadastrar;
