using API.Models;
using Microsoft.AspNetCore.Mvc;

Console.Clear();
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

List<Produto> produtos = new List<Produto>
{
    new Produto { Nome = "Notebook", Quantidade = 10, Preco = 3499.99 },
    new Produto { Nome = "Smartphone", Quantidade = 25, Preco = 2199.99 },
    new Produto { Nome = "Fone de Ouvido", Quantidade = 50, Preco = 199.90 },
    new Produto { Nome = "Monitor", Quantidade = 15, Preco = 899.99 },
    new Produto { Nome = "Teclado Mecânico", Quantidade = 20, Preco = 349.99 }
};

app.MapGet("/", () => "API de Produtos");

app.MapGet("/api/produto/listar", () =>
{
    if (produtos.Count > 0)
    {
        return Results.Ok(produtos);
    }
    return Results.BadRequest("Lista vazia");
});

app.MapPost("/api/produto/cadastrar", ([FromBody] Produto produto) =>
{
    foreach (Produto produtoCadastrado in produtos)
    {
        if (produtoCadastrado.Nome == produto.Nome)
        {
            return Results.Conflict("Produto já cadastrado!");
        }
    }
    produtos.Add(produto);
    return Results.Created("", produto);
});

app.MapGet("/api/produto/buscar/{nome}", ([FromRoute] string nome) =>
{
    Produto? resultado = produtos.FirstOrDefault(x => x.Nome == nome);
    if (resultado == null)
    {
        return Results.NotFound("Produto não encontrado");
    }
    return Results.Ok(resultado);
});

app.MapPut("/api/produto/atualizar/{nome}", ([FromRoute] string nome, [FromBody] Produto produtoAtualizado) =>
{
    int index = produtos.FindIndex(p => p.Nome == nome);

    if (index == -1)
    {
        return Results.NotFound("Produto não encontrado.");
    }

    if (produtoAtualizado.Nome != nome)
    {
        return Results.BadRequest("O nome do produto na URL deve ser o mesmo do objeto enviado.");
    }

    produtos[index] = produtoAtualizado;

    return Results.Ok(produtoAtualizado);
});

app.MapDelete("/api/produto/remover/{nome}", ([FromRoute] string nome) =>
{
    Produto? produtoParaRemover = produtos.FirstOrDefault(p => p.Nome == nome);

    if (produtoParaRemover == null)
    {
        return Results.NotFound("Produto não encontrado.");
    }

    produtos.Remove(produtoParaRemover);

    return Results.Ok("Produto removido com sucesso.");
});

app.Run();