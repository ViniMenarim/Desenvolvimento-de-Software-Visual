🚀 Como Rodar o Projeto
Este projeto é dividido em duas partes: API (Servidor) e Frontend (Interface). Você precisará rodar ambos simultaneamente em terminais separados.

Configurando e Rodando a API (Backend)
Abra um terminal e navegue até a pasta da API:

cd Ecommerce/API
Restaure os pacotes do .NET:

dotnet restore
(Opcional) Se o banco de dados Ecommerce.db não existir, crie-o executando as migrações:

dotnet ef database update
Inicie o servidor:

dotnet watch run
Nota: O servidor iniciará (geralmente em http://localhost:5011 ou porta similar configurada no launchSettings.json).

Configurando e Rodando o Frontend
Abra outro terminal e navegue até a pasta do Frontend:

cd Ecommerce/Frontend
Instale as dependências do Node:

npm install
Inicie a aplicação React:

npm start
O navegador deve abrir automaticamente em http://localhost:3000.

⚙️ Configuração
Banco de Dados
O projeto utiliza SQLite. A string de conexão fica localizada no arquivo API/appsettings.json. O arquivo do banco (Ecommerce.db) será criado na raiz da pasta API.

Endereços da API (CORS)
O Frontend se comunica com o Backend através da URL definida nos arquivos .tsx (atualmente http://localhost:5011).

Se a porta da sua API mudar, vá nos arquivos Frontend/src/Components/Pages/Produtos/ e atualize a URL no axios.

🛠️ Guia de Desenvolvimento: Como fazer alterações
Se você deseja adicionar uma nova funcionalidade ou alterar algo existente, siga este fluxo de trabalho recomendado:

Alterando o Banco de Dados (Backend)
Se você precisa adicionar um novo campo (ex: Categoria em Produto):

Vá em API/Models/Produto.cs e adicione a propriedade:

public string? Categoria { get; set; }
Crie uma nova migração para atualizar o banco:

dotnet ef migrations add AdicionarCategoriaProduto
Aplique a migração:

dotnet ef database update
Atualizando a Lógica (Backend)
Vá em Program.cs.

Nos endpoints (app.MapPost, app.MapPatch), certifique-se de que o novo campo está sendo tratado ou atualizado conforme necessário.

Atualizando a Interface (Frontend)
Modelo: Atualize o arquivo de tipagem em Frontend/src/Models/Produto.ts para incluir o novo campo.

Cadastro: Em CadastrarProduto.tsx:

Crie um novo estado: const [categoria, setCategoria] = useState("");

Adicione um <input> no formulário.

Inclua o campo no objeto enviado ao axios.

Listagem: Em ListarProdutos.tsx:

Adicione uma nova coluna <th>Categoria</th> no cabeçalho da tabela.

Adicione uma nova célula <td>{produto.categoria}</td> no corpo da tabela.

📂 Estrutura de Pastas
Ecommerce/

API/ (Backend .NET)

Models/ (Classes que representam as tabelas do banco)

Migrations/ (Histórico de alterações do banco de dados)

Program.cs (Arquivo principal com rotas e configurações)

Frontend/ (Aplicação React)

src/

Components/Pages/ (Telas do sistema)

Models/ (Tipagem TypeScript espelhando o C#)

App.tsx (Configuração de rotas)

🆘 Solução de Problemas Comuns
Erro de CORS: Se o navegador bloquear a requisição, verifique se a API está rodando e se a URL no axios (Frontend) é exatamente a mesma que aparece no terminal da API.

Porta Ocupada: Se a porta 5011 ou 3000 estiver em uso, os terminais avisarão. Você pode alterar as portas nos arquivos de configuração (launchSettings.json na API ou package.json no React).