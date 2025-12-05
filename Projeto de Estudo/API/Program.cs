using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Adiciona o contexto do banco de dados aos serviços da aplicação
builder.Services.AddDbContext<AppDbContext>();

// Configura o CORS: Permite que o Frontend (React) em uma porta acesse o Backend em outra porta
builder.Services.AddCors(options =>
{
    options.AddPolicy("AcessoTotal",
        policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();

// Aplica a política de CORS
app.UseCors("AcessoTotal");

// --- Funcionalidade: Listar Todas ---
app.MapGet("/api/tarefa/listar", async (AppDbContext db) =>
{
    // Retorna todas as tarefas do banco como uma lista JSON
    return await db.Tarefas.ToListAsync();
});

// --- Funcionalidade: Cadastrar ---
app.MapPost("/api/tarefa/cadastrar", async (AppDbContext db, [FromBody] Tarefa tarefa) =>
{
    // Força o status inicial, independente do que o usuário enviou
    tarefa.Status = "Não iniciada";

    db.Tarefas.Add(tarefa);
    await db.SaveChangesAsync(); // Salva no banco

    // Retorna status 201 (Created)
    return Results.Created($"/api/tarefa/{tarefa.Id}", tarefa);
});

// --- Funcionalidade: Alterar Status (Lógica de Negócio) ---
app.MapPatch("/api/tarefa/alterar/{id}", async (int id, AppDbContext db) =>
{
    // Busca a tarefa pelo ID
    var tarefa = await db.Tarefas.FindAsync(id);
    if (tarefa is null) return Results.NotFound();

    // Lógica de progressão: Não iniciada -> Em andamento -> Concluída
    if (tarefa.Status == "Não iniciada")
    {
        tarefa.Status = "Em andamento";
    }
    else if (tarefa.Status == "Em andamento")
    {
        tarefa.Status = "Concluída";
    }
    // Se já for "Concluída", não faz nada.

    await db.SaveChangesAsync(); // Salva a alteração
    return Results.Ok(tarefa);
});

// --- Funcionalidade: Listar Não Concluídas ---
app.MapGet("/api/tarefa/naoconcluidas", async (AppDbContext db) =>
{
    // Filtra tarefas onde status É "Não iniciada" OU "Em andamento"
    var tarefas = await db.Tarefas
        .Where(t => t.Status == "Não iniciada" || t.Status == "Em andamento")
        .ToListAsync();
    return Results.Ok(tarefas);
});

// --- Funcionalidade: Listar Concluídas ---
app.MapGet("/api/tarefa/concluidas", async (AppDbContext db) =>
{
    // Filtra apenas tarefas onde status É "Concluída"
    var tarefas = await db.Tarefas
        .Where(t => t.Status == "Concluída")
        .ToListAsync();
    return Results.Ok(tarefas);
});

app.Run(); // Inicia a API