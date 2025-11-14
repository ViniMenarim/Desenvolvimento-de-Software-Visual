using System;
using Microsoft.EntityFrameworkCore;

namespace API.Models;

// Herda de DbContext, que é a classe base do Entity Framework para gerenciar BDs
public class AppDataContext : DbContext
{
    // REPRESENTAÇÃO DAS TABELAS
    // Cada DbSet vira uma tabela no banco de dados.
    // Se você criar uma classe nova (ex: Usuario), precisa adicionar um DbSet<Usuario> aqui.
    public DbSet<Produto> Produtos { get; set; }
    public DbSet<Categoria> Categorias { get; set; }

    // CONFIGURAÇÃO DA CONEXÃO
    // Define qual banco de dados será usado.
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // Define que usaremos SQLite e o nome do arquivo será 'Ecommerce.db'
        // Se quiser trocar para MySQL ou SQLServer, é aqui que você altera.
        optionsBuilder.UseSqlite("Data Source=Ecommerce.db");
    }
}