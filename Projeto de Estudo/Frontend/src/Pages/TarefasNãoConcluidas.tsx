import { useEffect, useState } from "react";
import { type Tarefa } from "../../Models/Tarefa";

function TarefaNaoConcluidas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {
    // Chama o endpoint que retorna "Não iniciada" ou "Em andamento"
    fetch("http://localhost:5105/api/tarefa/naoconcluidas")
      .then((res) => res.json())
      .then((dados) => setTarefas(dados));
  }, []);

  return (
    <div>
      <h1>Tarefas Não Concluídas</h1>
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

export default TarefaNaoConcluidas;
