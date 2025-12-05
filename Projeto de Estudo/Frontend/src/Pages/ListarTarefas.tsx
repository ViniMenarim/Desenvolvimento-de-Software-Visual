import { useEffect, useState } from "react";
import { type Tarefa } from "../../Models/Tarefa";

function TarefaListar() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  // Busca TODAS as tarefas ao carregar o componente
  useEffect(() => {
    fetch("http://localhost:5105/api/tarefa/listar")
      .then((resposta) => resposta.json())
      .then((dados) => setTarefas(dados));
  }, []);

  return (
    <div>
      <h1>Listar Tarefas</h1>
      <table border={1} style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Percorre a lista de tarefas e cria uma linha na tabela para cada uma */}
          {tarefas.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.titulo}</td>
              <td>{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TarefaListar;
