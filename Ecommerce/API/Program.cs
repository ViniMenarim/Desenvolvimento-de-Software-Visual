using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

Console.Clear();
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDataContext>();

builder.Services.AddCors(options => options.AddPolicy("Acesso Total", configs => configs.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();

app.MapGet("/", () => "API de Produtos");

app.MapGet("/api/produto/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Produtos.Any())
    {
        return Results.Ok(ctx.Produtos.ToList());
    }
    return Results.BadRequest("Lista vazia");
});

app.MapPost("/api/produto/cadastrar", ([FromBody] Produto produto,
    [FromServices] AppDataContext ctx) =>
{
    Produto? resultado =
        ctx.Produtos.FirstOrDefault(x => x.Nome == produto.Nome);
    if (resultado is not null)
    {
        return Results.Conflict("Produto já existente!");
    }
    ctx.Produtos.Add(produto);
    ctx.SaveChanges();
    return Results.Created("", produto);
});

app.MapGet("/api/produto/buscar/{id}", ([FromRoute] string id,
    [FromServices] AppDataContext ctx) =>
{
    Produto? resultado = ctx.Produtos.Find(id);
    if (resultado is null)
    {
        return Results.NotFound("Produto não encontrado");
    }
    return Results.Ok(resultado);
});

app.MapDelete("/api/produto/remover/{id}", ([FromRoute] string id,
    [FromServices] AppDataContext ctx) =>
{
    Produto? resultado = ctx.Produtos.Find(id);
    if (resultado is null)
    {
        return Results.NotFound("Produto não encontrado");
    }
    ctx.Produtos.Remove(resultado);
    ctx.SaveChanges();
    return Results.Ok(resultado);
});

app.MapPatch("/api/produto/alterar/{id}", ([FromRoute] string id,
    [FromBody] Produto produtoAlterado,
    [FromServices] AppDataContext ctx) =>
{
    Produto? resultado = ctx.Produtos.Find(id);
    if (resultado is null)
    {
        return Results.NotFound("Produto não encontrado");
    }
    resultado.Nome = produtoAlterado.Nome;
    resultado.Quantidade = produtoAlterado.Quantidade;
    resultado.Preco = produtoAlterado.Preco;
    ctx.Produtos.Update(resultado);
    ctx.SaveChanges();
    return Results.Ok(resultado);
});

app.UseCors("Acesso Total");

app.Run();




