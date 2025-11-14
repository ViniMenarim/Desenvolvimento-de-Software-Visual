using API.Models;
using Microsoft.AspNetCore.Mvc;

Console.Clear();
var builder = WebApplication.CreateBuilder(args);

// --- CONFIGURAÇÃO DE SERVIÇOS ---

// Adiciona o contexto do banco de dados (o "guarda" que gerencia as tabelas)
// Se mudar o banco, é aqui no AppDataContext que a configuração principal reside.
builder.Services.AddDbContext<AppDataContext>();

// Configuração do CORS (Cross-Origin Resource Sharing)
// Essencial para permitir que seu Frontend (React) que roda em uma porta diferente
// consiga acessar este Backend. Sem isso, o navegador bloqueia as requisições.
builder.Services.AddCors(options =>
    options.AddPolicy("Acesso Total",
        configs => configs
            .AllowAnyOrigin()  // Aceita requisições de qualquer URL
            .AllowAnyHeader()  // Aceita qualquer cabeçalho HTTP
            .AllowAnyMethod()) // Aceita GET, POST, PUT, DELETE, etc.
);

var app = builder.Build();

// --- DEFINIÇÃO DAS ROTAS (ENDPOINTS) ---

// Rota raiz simples para testar se a API está rodando
app.MapGet("/", () => "API de Produtos");

// Rota: LISTAR PRODUTOS
// Método GET. Recebe o contexto do banco via injeção de dependência ([FromServices])
app.MapGet("/api/produto/listar", ([FromServices] AppDataContext ctx) =>
{
    // Verifica se existe algum produto na tabela
    if (ctx.Produtos.Any())
    {
        // Retorna status 200 (OK) com a lista de produtos
        return Results.Ok(ctx.Produtos.ToList());
    }
    // Retorna status 400 (BadRequest) se a lista estiver vazia
    return Results.BadRequest("Lista vazia");
});

// Rota: CADASTRAR PRODUTO
// Método POST. Recebe o objeto Produto no corpo da requisição ([FromBody])
app.MapPost("/api/produto/cadastrar", ([FromBody] Produto produto,
    [FromServices] AppDataContext ctx) =>
{
    // Validação: Busca se já existe um produto com o mesmo nome
    Produto? resultado =
        ctx.Produtos.FirstOrDefault(x => x.Nome == produto.Nome);

    if (resultado is not null)
    {
        // Retorna 409 (Conflict) se já existir
        return Results.Conflict("Produto já existente!");
    }

    // Adiciona o novo produto na memória do Entity Framework
    ctx.Produtos.Add(produto);
    // COMITA as alterações no banco de dados (Indispensável para salvar)
    ctx.SaveChanges();

    // Retorna 201 (Created) e o objeto criado
    return Results.Created("", produto);
});

// Rota: BUSCAR POR ID
// Método GET com parâmetro na URL ({id})
app.MapGet("/api/produto/buscar/{id}", ([FromRoute] string id,
    [FromServices] AppDataContext ctx) =>
{
    // Tenta encontrar o produto pela chave primária (ID)
    Produto? resultado = ctx.Produtos.Find(id);
    if (resultado is null)
    {
        return Results.NotFound("Produto não encontrado");
    }
    return Results.Ok(resultado);
});

// Rota: REMOVER PRODUTO
// Método DELETE. Remove o item do banco baseado no ID.
app.MapDelete("/api/produto/remover/{id}", ([FromRoute] string id,
    [FromServices] AppDataContext ctx) =>
{
    Produto? resultado = ctx.Produtos.Find(id);
    if (resultado is null)
    {
        return Results.NotFound("Produto não encontrado");
    }
    
    // Remove da memória e salva a alteração no banco
    ctx.Produtos.Remove(resultado);
    ctx.SaveChanges();
    return Results.Ok(resultado);
});

// Rota: ALTERAR PRODUTO
// Método PATCH (usado para alterações parciais).
app.MapPatch("/api/produto/alterar/{id}", ([FromRoute] string id,
    [FromBody] Produto produtoAlterado,
    [FromServices] AppDataContext ctx) =>
{
    Produto? resultado = ctx.Produtos.Find(id);
    if (resultado is null)
    {
        return Results.NotFound("Produto não encontrado");
    }

    // Atualiza apenas os campos permitidos com os dados vindos do Front
    resultado.Nome = produtoAlterado.Nome;
    resultado.Quantidade = produtoAlterado.Quantidade;
    resultado.Preco = produtoAlterado.Preco;

    // Marca o objeto como modificado e salva
    ctx.Produtos.Update(resultado);
    ctx.SaveChanges();
    return Results.Ok(resultado);
});

// Aplica a política de CORS configurada lá em cima
app.UseCors("Acesso Total");

app.Run();