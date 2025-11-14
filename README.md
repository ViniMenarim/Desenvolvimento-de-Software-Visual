# 🛒 Projeto E-commerce Fullstack

Este é um sistema de gerenciamento de produtos desenvolvido para fins de estudo, utilizando uma arquitetura moderna separada em **Backend (API)** e **Frontend (SPA)**.

## 🛠️ Tecnologias Utilizadas

**Backend:**

- **C# .NET 6+** (Minimal APIs)
- **Entity Framework Core** (ORM)
- **SQLite** (Banco de Dados)
- **Swagger** (Opcional, para documentação)

**Frontend:**

- **React.js** (Biblioteca de interface)
- **TypeScript** (Tipagem estática)
- **Axios** (Requisições HTTP)
- **React Router Dom** (Navegação)

---

## 📋 Pré-requisitos

Certifique-se de ter instalado em sua máquina:

1.  **[.NET SDK](https://dotnet.microsoft.com/download)** (Versão 6.0 ou superior).
2.  **[Node.js](https://nodejs.org/)** (Versão 16 ou superior) e **npm**.
3.  **[VS Code](https://code.visualstudio.com/)** ou editor de sua preferência.

---

## 🚀 Instalação e Execução

O projeto roda em dois terminais separados: um para a API e outro para o React.

### Passo 1: Configurar o Backend (API)

1.  Abra o terminal na pasta da API:

    ```bash
    cd Ecommerce/API
    ```

2.  Instale as dependências e ferramentas do Entity Framework:

    ```bash
    dotnet restore
    dotnet tool install --global dotnet-ef
    ```

3.  Gere o banco de dados SQLite (`Ecommerce.db`):

    ```bash
    dotnet ef database update
    ```

4.  Inicie o servidor:
    ```bash
    dotnet watch run
    ```
    > 🟢 **Sucesso:** A API estará rodando em `http://localhost:5011` (ou porta definida em `launchSettings.json`).

### Passo 2: Configurar o Frontend (React)

1.  Abra um **novo terminal** na pasta do Frontend:

    ```bash
    cd Ecommerce/Frontend
    ```

2.  Instale as dependências do `package.json`:

    ```bash
    npm install
    ```

3.  Inicie a aplicação:
    ```bash
    npm start
    ```
    > 🔵 **Sucesso:** O navegador abrirá automaticamente em `http://localhost:3000`.

---

## 🔌 Endpoints da API

Aqui estão as rotas disponíveis no Backend (`Program.cs`):

| Método   | Rota                        | Descrição                                   |
| :------- | :-------------------------- | :------------------------------------------ |
| `GET`    | `/`                         | Teste de funcionamento da API.              |
| `GET`    | `/api/produto/listar`       | Retorna a lista de todos os produtos.       |
| `GET`    | `/api/produto/buscar/{id}`  | Busca um produto específico pelo ID (UUID). |
| `POST`   | `/api/produto/cadastrar`    | Cria um novo produto (JSON no corpo).       |
| `PATCH`  | `/api/produto/alterar/{id}` | Atualiza dados parciais de um produto.      |
| `DELETE` | `/api/produto/remover/{id}` | Remove um produto do banco.                 |

---

## 💻 Guia de Desenvolvimento

Como adicionar novas funcionalidades ao projeto:

### 1. Modificando o Banco de Dados

Se você alterar qualquer modelo na pasta `API/Models/`:

1.  Edite a classe (ex: `Produto.cs`).
2.  Crie uma migração:
    ```bash
    dotnet ef migrations add NomeDaMudanca
    ```
3.  Atualize o banco:
    ```bash
    dotnet ef database update
    ```

## 🐛 Solução de Problemas

- **Erro de CORS:** Verifique se a URL no arquivo `Frontend/.../ListarProdutos.tsx` e `CadastrarProduto.tsx` é exatamente a mesma onde a API está rodando (ex: `http://localhost:5011`).
- **Banco de dados não encontrado:** Certifique-se de ter rodado `dotnet ef database update` dentro da pasta `API`.
- **Erro de Porta:** Se a porta 5011 ou 3000 estiver ocupada, altere no `launchSettings.json` (API) ou `package.json` (Frontend).
