# 📦 Catálogo de Produtos

Sistema fullstack para gerenciamento de produtos, desenvolvido com **.NET (C#)** no backend e **React (Vite)** no frontend. A aplicação permite cadastrar, listar, editar e excluir produtos, com interface moderna e comunicação via API REST.

---

# 📸 Preview

**Visao geral do catálogo**

**Design de criar produto**

**Design de editar produto**

**Design de excluir produto**

**buscar produto por nome**

**buscar produto por categoria**

**buscar produto por Disponiblidade**

**Design de ativo e inativo**

**Odenar produto**

**Quantidade e valor total de produtos no catálogo**

---

# 🚀 Tecnologias Utilizadas

## Backend -> CatalogoProdutosAPI
- .NET
- Entity Framework Core
- SQLite
- Swagger (Swashbuckle)
- Injeção de Dependência
- API RESTful

## Frontend
- React (Vite)
- Axios
- Tailwind CSS
- Lucide React (ícones)

---

# 🧠 Estratégias Utilizadas

## Backend

### Bibliotecas

A estratégia foi identificar os requisitos do projeto e selecionar bibliotecas específicas para cada responsabilidade, mantendo o sistema:

- Simples  
- Desacoplado  
- Escalável  

Seguindo boas práticas como:
- Injeção de Dependência  
- Separação de Responsabilidades  

```bash
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Swashbuckle.AspNetCore
```
### Pasta Models

Modelagem da entidade Produto como representação do domínio da aplicação.

Estratégias aplicadas:

Mapeamento automático com Entity Framework
Validações com Data Annotations

Benefícios:

Organização
Reutilização
Facilidade de manutenção

### Pasta Data

Uso do AppDbContext como ponte entre aplicação e banco de dados.

Estratégias:

Precisão decimal para valores monetários
Uso de Migrations para versionamento do banco

### Pasta Controllers

Implementação do padrão RESTful, com um controller dedicado para Produto.

Operações:

GET
POST
PUT
DELETE

Estratégias:

Separação de responsabilidades
Uso de métodos assíncronos
Injeção de Dependência do DbContext

### Program.cs

Configuração do pipeline da aplicação:

Injeção de Dependência
Ativação dos Controllers
Configuração de CORS
Integração com Swagger

Resultado:

API desacoplada
Documentação interativa
Pronta para integração com frontend

### Migrações

```bash
dotnet ef migrations add AdicionandoCamposProdutos
dotnet ef database update
```

### Executando o Backend

```bash
dotnet run
```
Acesse:

API: http://localhost:5250
Swagger: http://localhost:5250/swagger/index.html





