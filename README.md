# 📦 Catálogo de Produtos

Sistema fullstack para gerenciamento de produtos, desenvolvido com **.NET (C#)** no backend e **React (Vite)** no frontend. A aplicação permite cadastrar, listar, editar e excluir produtos, com interface moderna e comunicação via API REST.

---

# 📸 Preview

**Visao geral do catálogo**

![image alt](https://github.com/vitor190/Catalogo-de-produtos/blob/58887f69350c9fe6dd5f96d593bfb06501236a63/preview/visao%20geral.PNG)

**Design de criar produto**

![image alt](https://github.com/vitor190/Catalogo-de-produtos/blob/58887f69350c9fe6dd5f96d593bfb06501236a63/preview/criar%20produto.PNG)

**Design de editar produto**

![image alt](https://github.com/vitor190/Catalogo-de-produtos/blob/58887f69350c9fe6dd5f96d593bfb06501236a63/preview/editar%20produto.PNG)

**Design de excluir produto**

![image alt](https://github.com/vitor190/Catalogo-de-produtos/blob/58887f69350c9fe6dd5f96d593bfb06501236a63/preview/excluir%20produto.PNG)

**buscar produto por nome**

![image alt](https://github.com/vitor190/Catalogo-de-produtos/blob/58887f69350c9fe6dd5f96d593bfb06501236a63/preview/buscar%20pelo%20nome.PNG)

**buscar produto por categoria**

![image alt](https://github.com/vitor190/Catalogo-de-produtos/blob/58887f69350c9fe6dd5f96d593bfb06501236a63/preview/buscar%20por%20categoria.PNG)

**buscar produto por Disponiblidade**

![image alt](https://github.com/vitor190/Catalogo-de-produtos/blob/58887f69350c9fe6dd5f96d593bfb06501236a63/preview/buscar%20por%20disponibilidade%201.PNG)

![image alt](https://github.com/vitor190/Catalogo-de-produtos/blob/58887f69350c9fe6dd5f96d593bfb06501236a63/preview/buscar%20por%20disponibilidade%202.PNG)

**Design de ativo e inativo**

![image alt](https://github.com/vitor190/Catalogo-de-produtos/blob/58887f69350c9fe6dd5f96d593bfb06501236a63/preview/ativo.PNG)

![image alt](https://github.com/vitor190/Catalogo-de-produtos/blob/58887f69350c9fe6dd5f96d593bfb06501236a63/preview/inativo.PNG)

**Odenar produto**

![image alt](https://github.com/vitor190/Catalogo-de-produtos/blob/58887f69350c9fe6dd5f96d593bfb06501236a63/preview/ordenar.PNG)

**Quantidade e valor total de produtos no catálogo**

![image alt](https://github.com/vitor190/Catalogo-de-produtos/blob/58887f69350c9fe6dd5f96d593bfb06501236a63/preview/quantidade.PNG)

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
### 📁 Pasta Models

Modelagem da entidade Produto como representação do domínio da aplicação.

**Estratégias aplicadas:**

- Mapeamento automático com Entity Framework
- Validações com Data Annotations

**Benefícios:**

- Organização
- Reutilização
- Facilidade de manutenção

### 📁 Pasta Data

- Uso do AppDbContext como ponte entre aplicação e banco de dados.

**Estratégias:**

- Precisão decimal para valores monetários
- Uso de Migrations para versionamento do banco

### 📁 Pasta Controllers

- Implementação do padrão RESTful, com um controller dedicado para Produto.

**Operações:**

- GET
- POST
- PUT
- DELETE

**Estratégias:**

- Separação de responsabilidades
- Uso de métodos assíncronos
- Injeção de Dependência do DbContext

### ⚙️ Program.cs

**Configuração do pipeline da aplicação:**

- Injeção de Dependência
- Ativação dos Controllers
- Configuração de CORS
- Integração com Swagger

**Resultado:**

- API desacoplada
- Documentação interativa
- Pronta para integração com frontend

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

---

## 🎨 Frontend

### 📁 Criação do Projeto

```bash
npm create vite@latest frontend -- --template react
npm install
npm install axios lucide-react
```

### 🎨 Tailwind CSS

**Estratégia:**

- Uso da versão mais recente
- Integração via plugin do Vite

**Desafio:**

- Mudanças na configuração (remoção do init)

### 📁 Pasta services

- Implementação do padrão Service Layer.

- Arquivo: api.js

baseURL: http://localhost:5250/api

**Vantagem:**

- Centralização das chamadas HTTP
- Fácil manutenção

### 📁 Pasta components

**Baseada em:**

- Modularização
- Reutilização
- Componentes principais:
- ProductCard
- ProductForm
- ConfirmModal

### 🔗 Integração Backend + Frontend

**Estratégia:**

- Comunicação via HTTP (Axios)
- Backend configurado com CORS

**Problema resolvido:**

- Bloqueio entre portas diferentes (5173 ↔ 5250)

### 📄 App.jsx

**Função: Cérebro da aplicação**

**Estratégias:**

- useEffect para carregar produtos
- Gerenciamento central de estado
- Distribuição de funções para componentes filhos

**Desafios:**

- Sincronização de dados
- Reutilização de formulário (CRUD completo)

**Técnicas usadas:**

`.length` para contagem

`.reduce()` para agregações

### 📄 ProductForm.jsx

**Estratégia:**

- Formulário dinâmico (Create / Edit)

**Regras:**

- Se existe produtoInicial → PUT
- Senão → POST

**Funcionalidades:**

- Preview de imagem
- Controle de estado completo
- Checkbox de ativação

### 📄 ProductCard.jsx

**Componente inteligente e independente.**

**Funcionalidades:**

- Exibição de dados
- Lógica visual (estoque, status)
- nterações do usuário

**Estratégias:**

- Categorias visuais por quantidade

- Uso de Tailwind para design consistente
Padronização de imagens com:

**object-cover**
**h-40**

**Destaque:**

- Opacidade para produtos inativos (opacity-70)

---

# ⚡ Funcionalidades:

✅ Cadastro de produtos

✅ Listagem dinâmica

✅ Edição de produtos

✅ Exclusão com confirmação

✅ Controle de ativo/inativo

✅ Contador de produtos

✅ Interface responsiva

# ⚙️ Desafios Enfrentados:

- Integração entre frontend e backend
- Configuração de CORS
- Mudanças no Tailwind
- Reutilização de formulário (CRUD completo)
- Tratamento de imagens externas
- Sincronização de estado no React

# 💻 Autor

**Desenvolvido por:** Vitor Cesar G. Lima

Estudante de Ciência da Computação, com foco em desenvolvimento backend e construção de sistemas completos.




