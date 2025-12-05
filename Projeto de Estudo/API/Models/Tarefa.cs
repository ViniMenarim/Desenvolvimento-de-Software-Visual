public class Tarefa
{
    // Chave primária do banco de dados
    public int Id { get; set; }
    public string? Titulo { get; set; }
    public string? Descricao { get; set; }

    // Define o status padrão como "Não iniciada" automaticamente ao criar o objeto,
    // garantindo a regra de negócio da Funcionalidade 5.
    public string? Status { get; set; } = "Não iniciada";
}