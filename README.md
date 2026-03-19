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

# Pasta Data

A estratégia usada na pasta Data, utiliza o `AppDbContext` como a ponte de comunicação entre o código e o banco SQLite. Foquei na ntegridade dos produtos, aplicando regras de precisão decimal para valores monetários e utilizando Migrations para versionar a 
estrutura do banco.

# Pasta Controllers

A estratégia para o Controllers foi implementar o padrão RESTful, centralizando a lógica de manipulação da entidade Produto em uma classe dedicada para garantir a separação de responsabilidades. Utilizei Injeção de Dependência para acessar o `AppDbContext`, permitindo que cada método `(GET, POST, PUT, DELETE)` interaja diretamente com o banco de dados de forma assíncrona.

# Atualização do arquivo Program.cs

A estratégia para a atualização do Program.cs foi configurar o pipeline de execução da aplicação para atuar como um servidor de API completo e desacoplado. Utilizei a Injeção de Dependência para conectar o `AppDbContext` ao sistema, habilitei o suporte a Controllers para organizar as rotas de forma escalável e apliquei uma política de CORS para garantir que o frontend em React consiga consumir os dados sem bloqueios de segurança. Além disso, integrei o Swagger para fornecer uma documentação viva e interativa, facilitando os testes das regras de negócio e validações antes da integração final.

