import { useEffect, useState } from "react";
import { type Tarefa } from "../../Models/Tarefa";

function TarefaAlterar() {
  // State para armazenar a lista de tarefas vinda da API
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  // useEffect: Executa ao carregar a página para buscar os dados
  useEffect(() => {
    carregarTarefas();
  }, []);

  function carregarTarefas() {
    fetch("http://localhost:5105/api/tarefa/listar")
      .then((res) => res.json())
      .then((dados) => setTarefas(dados));
  }

  // Função chamada ao clicar no botão de alterar status
  function alterarStatus(id: number) {
    // Chama a rota PATCH do backend passando o ID
    fetch(`http://localhost:5105/api/tarefa/alterar/${id}`, {
      method: "PATCH",
    }).then(() => {
      carregarTarefas(); // Recarrega a lista para mostrar o novo status na tela
    });
  }

  return (
    <div>
      <h1>Alterar Status da Tarefa</h1>
      <table border={1} style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Status Atual</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {tarefas.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.titulo}</td>
              <td>{t.status}</td>
              <td>
                {/* Só mostra o botão se a tarefa NÃO estiver concluída */}
                {t.status !== "Concluída" && (
                  <button onClick={() => alterarStatus(t.id!)}>
                    Avançar Status (+)
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TarefaAlterar;
