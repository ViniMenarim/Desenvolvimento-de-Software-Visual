using System;
using System.Collections.Generic;
using Project.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

List<Produto> produtos = new List<Produto>
{
    new Produto { Nome = "Teclado", Quantidade = 10, Preco = 150.00 },
    new Produto { Nome = "Mouse", Quantidade = 25, Preco = 80.00 },
    new Produto { Nome = "Monitor", Quantidade = 5, Preco = 1200.00 },
    new Produto { Nome = "Headset", Quantidade = 15, Preco = 300.00 },
    new Produto { Nome = "Webcam", Quantidade = 8, Preco = 250.00 }
};

app.MapGet("/api/produto/listar", () =>
{
    return produtos;
});

app.MapPost("/api/produto/cadastrar", (Produto produto) =>
{
    produtos.Add(produto);
});

app.Run();
