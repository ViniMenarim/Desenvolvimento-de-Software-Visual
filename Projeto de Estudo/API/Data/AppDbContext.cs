using Microsoft.EntityFrameworkCore;

// Contexto do banco de dados: faz a ponte entre o código C# e o SQLite
public class AppDbContext : DbContext
{
    // Representa a tabela "Tarefas" no banco de dados
    public DbSet<Tarefa> Tarefas { get; set; }

    // Configura qual banco de dados será usado
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // Define o SQLite e o nome do arquivo do banco (deve conter seu nome)
        optionsBuilder.UseSqlite("Data Source=ViniciusMenarim.db");
    }
}