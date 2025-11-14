namespace API.Models;

public class Produto
{
    // CONSTRUTOR
    // Executa toda vez que você faz um "new Produto()"
    public Produto()
    {
        // Gera um hash único universal (ex: "a1b2-c3d4...") para o ID.
        // Útil se você planeja sincronizar dados entre bancos diferentes.
        Id = Guid.NewGuid().ToString();

        // Grava o momento exato da criação
        CriadoEm = DateTime.Now;
    }

    // Propriedades do Produto
    public string Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
    public int Quantidade { get; set; }
    public double Preco { get; set; }
    public DateTime CriadoEm { get; set; }
}