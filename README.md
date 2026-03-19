# Estratégias Utilizadas no Projeto

# Bibliotecas:

A estratégia foi identificar os requisitos do projeto e selecionar bibliotecas específicas para cada responsabilidade, mantendo o sistema simples, desacoplado e seguindo boas práticas como injeção de dependência e separação de responsabilidades.

` dotnet add package Microsoft.EntityFrameworkCore `
` dotnet add package Microsoft.EntityFrameworkCore.Sqlite `
` dotnet add package Microsoft.EntityFrameworkCore.Design `
` dotnet add package Microsoft.EntityFrameworkCore.Tools `
` dotnet add package Swashbuckle.AspNetCore `

# Pasta Models

A estratégia foi modelar a entidade Produto como representação do domínio da aplicação, utilizando Entity Framework para mapear automaticamente para o banco de dados e Data Annotations para validar os dados. Isso garante organização, reutilização e facilidade de manutenção.