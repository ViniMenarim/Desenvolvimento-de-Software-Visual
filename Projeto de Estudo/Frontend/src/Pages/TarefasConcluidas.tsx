import { useEffect, useState } from "react";
import { type Tarefa } from "../../Models/Tarefa";

function TarefaConcluidas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {
    // Chama o endpoint específico que retorna APENAS as concluídas
    fetch("http://localhost:5105/api/tarefa/concluidas")
      .then((res) => res.json())
      .then((dados) => setTarefas(dados));
  }, []);

  return (
    <div>
      <h1>Tarefas Concluídas</h1>
      <ul>
        {tarefas.map((t) => (
          <li key={t.id}>
            {t.id} - {t.titulo} (<strong>{t.status}</strong>)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TarefaConcluidas;
