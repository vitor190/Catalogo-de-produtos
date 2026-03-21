# Estratégias Utilizadas no Projeto

# BACKEND

# Bibliotecas:

A estratégia foi identificar os requisitos do projeto e selecionar bibliotecas específicas para cada responsabilidade, mantendo o sistema simples, desacoplado e seguindo boas práticas como injeção de dependência e separação de responsabilidades.

` dotnet add package Microsoft.EntityFrameworkCore `
` dotnet add package Microsoft.EntityFrameworkCore.Sqlite `
` dotnet add package Microsoft.EntityFrameworkCore.Design `
` dotnet add package Microsoft.EntityFrameworkCore.Tools `
` dotnet add package Swashbuckle.AspNetCore `

# Pasta Models:

A estratégia foi modelar a entidade Produto como representação do domínio da aplicação, utilizando Entity Framework para mapear automaticamente para o banco de dados e Data Annotations para validar os dados. Isso garante organização, reutilização e facilidade de manutenção.

# Pasta Data:

A estratégia usada na pasta Data, utiliza o `AppDbContext` como a ponte de comunicação entre o código e o banco SQLite. Foquei na ntegridade dos produtos, aplicando regras de precisão decimal para valores monetários e utilizando Migrations para versionar a 
estrutura do banco.

# Pasta Controllers:

A estratégia para o Controllers foi implementar o padrão RESTful, centralizando a lógica de manipulação da entidade Produto em uma classe dedicada para garantir a separação de responsabilidades. Utilizei Injeção de Dependência para acessar o `AppDbContext`, permitindo que cada método `(GET, POST, PUT, DELETE)` interaja diretamente com o banco de dados de forma assíncrona.

# Atualização do arquivo Program.cs:

A estratégia para a atualização do Program.cs foi configurar o pipeline de execução da aplicação para atuar como um servidor de API completo e desacoplado. Utilizei a Injeção de Dependência para conectar o `AppDbContext` ao sistema, habilitei o suporte a Controllers para organizar as rotas de forma escalável e apliquei uma política de CORS para garantir que o frontend em React consiga consumir os dados sem bloqueios de segurança. Além disso, integrei o Swagger para fornecer uma documentação viva e interativa, facilitando os testes das regras de negócio e validações antes da integração final.

# Rodando as Migrações:

Para aplicar as migrações e criar o arquivo `produtos.db`, execute estes dois comandos no terminal dentro da pasta `CatalogoProdutosAPI`

**Criar o arquivo de migração:**
` dotnet ef migrations add AdicionandoCamposProdutos `

**Atualizar o banco de dados real:**
` dotnet ef database update `

# Rodando o servidor:

` dotnet run ` ao iniciar este comando, o código é transformado em uma API ativa

` localhost: 5250 ` raiz da API

` localhost:5250/swagger/index.html ` este é o painel de controle visual da API, gerado pela biblioteca Swashbuckle que instalamos.

# FRONTEND

# Criação da pasta frontend

`npm create vite@latest frontend -- --template react` Cria a estrutura base do projeto usando o Vite.

`npm install` Baixa todas as bibliotecas padrão que o React precisa para funcionar

`npm install axios lucide-react` Instala um pacote de ícones modernos e leves.

# Criação da biblioteca Tailwind CSS

Utilizei o Vite com React para ter um ambiente rápido e moderno de desenvolvimento. Para estilização, usei Tailwind CSS na versão mais recente, integrando via plugin do Vite para simplificar a configuração. Durante o processo, enfrentei desafios relacionados a mudanças na versão do Tailwind, principalmente a remoção do comando init, o que exigiu adaptação para a nova abordagem baseada em plugins.

# Criação da pasta services 

A estratégia por trás da criação da pasta services é a implementação do padrão Service Layer no frontend. Em vez de espalhar chamadas de API por todos os componentes, centralizamos toda a comunicação com o backend .NET em um único local.

Ao criar o arquivo api.js dentro de services, defini uma instância única do Axios com a baseURL configurada `(ex: http://localhost:5250/api)`

**Vantagem:** Se a porta do seu servidor mudar de 5250 para 5032, você altera em apenas um lugar, e todo o sistema continua funcionando.

# Criação da pasta components

A estratégia para a criação da pasta components baseia-se no princípio da Modularização e Reutilização de Interface, fundamental para construir o sistema de catálogo de forma escalável e organizada.

O **ProductCard:** Um componente dedicado exclusivamente a renderizar as informações de um único produto, como nome, preço e badges de estoque.

# Conexao do Backend com Frontend

A estratégia para conectar o Backend em .NET com o Frontend em React baseou-se na criação de uma arquitetura desacoplada, onde as duas aplicações se comunicam de forma assíncrona através do protocolo HTTP.

A peça central da conexão é a biblioteca Axios, utilizada para criar um serviço cliente no React. Esse serviço foi configurado com uma baseURL apontando para o endereço do servidor `(localhost:5250)`, permitindo que o frontend dispare requisições para as rotas da ProdutosController que eu desenvolvi.

Como o navegador, por padrão, bloqueia requisições entre portas diferentes (Vite na 5173 e .NET na 5250), a estratégia incluiu a configuração de CORS no arquivo Program.cs do backend. Isso autorizou formalmente o seu frontend a ler e enviar dados para a API, desbloqueando o fluxo de informações.

# arquivo App.jsx

A estratégia utilizada no App.jsx até agora foi focada em transformar o componente principal no Cérebro da Aplicação, centralizando a lógica de estado e a orquestração dos subcomponentes para atender aos requisitos.

Implementei o useEffect para disparar chamadas à API .NET assim que o app é montado, garantindo que o catálogo seja populado automaticamente

O App.jsx atua como um distribuidor de funções, passando callbacks para os componentes filhos, o que permite que um clique em um card lá na ponta atualize a lista principal

Um dos primeiros obstáculos foi configurar o backend .NET para aceitar requisições do Vite (React), garantindo que a segurança do navegador não bloqueasse o fluxo de dados.

O maior desafio lógico foi fazer com que o mesmo formulário servisse para criar, Buscar, Editar etc. Exigindo uma lógica de limpeza de estado toda vez que o modal fosse fechado para não misturar os dados.

# arquivo FormularioProoduto.jsx

A estratégia para o FormularioProduto.jsx foi focada em transformar um simples conjunto de inputs em uma interface de controle rigorosa, garantindo que nenhum dado inválido chegue ao banco de dados .NET

A principal estratégia foi fazer o formulário descobrir sua função. Se ele recebe um produtoInicial, ele se comporta como edição (usando PUT); caso contrário, atua como cadastro (usando POST).

Um desafio técnico foi garantir que o preview da imagem fosse atualizado assim que o usuário colasse a URL, exigindo um tratamento cuidadoso do estado para não causar travamentos na interface.

A estratégia agora, foi usar a prop produtoInicial. Se ela existe, o formulário se comporta como Edição (PUT); se não, como Cadastro (POST). Isso economiza centenas de linhas de código e adicionei o controle de checkbox vinculado diretamente ao estado, permitindo que o usuário controle a visibilidade do produto no catálogo de forma simples.

# arquivo ProductCard.jsx

A estratégia utilizada no ProductCard.jsx foi focada em criar uma unidade de interface inteligente e independente, que não apenas exibe dados, mas também processa a lógica visual e as interações do usuário de forma isolada

Implementei uma função interna para mapear a quantidade de itens vinda do banco de dados em categorias visuais específicas.

Ajustar os tamanhos exatos exigidos (Títulos 18px e Preços 22px) usando as classes do Tailwind para garantir que o preço tivesse o devido destaque sem poluir o card.

Desafios que tive foi: Gerenciar Imagens Externas, com diferentes proporções de imagens vindas de URLs externas. A solução foi utilizar as classes object-cover e h-40 para manter um padrão visual uniforme no grid, independentemente da fonte da imagem. E também ajustar os tamanhos exatos exigidos usando as classes do Tailwind para garantir que o preço tivesse o devido destaque sem poluir o card.

A estratégia para a parte de ativo/inativo, agora usa o bg-white como base obrigatória e aplica uma Camada de Opacidade (opacity-70) apenas quando o produto está inativo. Isso cria um efeito de desabilitação sem quebrar o layout.

