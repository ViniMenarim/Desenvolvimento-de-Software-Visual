using System;

namespace API.Models;

public class Categoria
{
    // Chave Primária (PK). Por ser int, o EF Core entende que deve gerar 
    // IDs sequenciais automáticos (1, 2, 3...)
    public int CategoriaId { get; set; }

    // Inicializamos com string.Empty para evitar avisos de valor nulo (null safety)
    public string Nome { get; set; } = string.Empty;

    // Define a data atual automaticamente assim que o objeto é criado na memória
    public DateTime CriadoEm { get; set; } = DateTime.Now;
}