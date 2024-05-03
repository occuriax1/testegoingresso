Sistema de Gerenciamento de Usuários
Este projeto é um sistema de gerenciamento de usuários que permite o registro, login, listagem e exclusão de usuários. Ele inclui uma interface de usuário simples e integração com a API externa Hunter para verificar e enriquecer os dados dos usuários.

Funcionalidades
Cadastro de Usuários: Permite aos usuários se registrarem no sistema.
Login de Usuários: Autenticação de usuários registrados.
Listagem de Usuários: Exibe todos os usuários cadastrados e permite a exclusão individual de cada um.
Exclusão de Usuários: Permite a remoção de usuários do sistema.
Verificação de E-mail: Utiliza a API Hunter.io para validar e enriquecer os dados de e-mail dos usuários durante o registro.
Tecnologias Utilizadas
Node.js: Plataforma de servidor.
Express: Framework para aplicativo web do Node.js.
Sequelize: ORM para Node.js.
SQLite: Banco de dados para desenvolvimento local.
SweetAlert2: Biblioteca para alertas customizados no frontend.
Fetch API: Para requisições HTTP entre o frontend e o backend.
Axios: Cliente HTTP baseado em promessas para o navegador e node.js.
Pré-requisitos
Antes de iniciar, você precisará ter instalado em sua máquina as seguintes ferramentas:

Node.js
NPM (Normalmente vem com a instalação do Node.js)
Instalação
1.Clone o repositório
2.Navegue até o diretório do projeto
3.Instale as dependências
    npm install
    npm install axios
    npm install bcrypt
    npm install  pg pg-hstore
    npm install sequelize
    npm install express
    npm init   

Configuração do Banco de Dados
O projeto utiliza SQLite para o desenvolvimento. As configurações do banco de dados podem ser encontradas e modificadas no arquivo config/database.js.

Importante: A configuração atual reinicia o banco de dados a cada inicialização do servidor (sequelize.sync({ force: true })). Isso significa que todos os dados são apagados quando o servidor é reiniciado.

Executando o Servidor
Execute o seguinte comando para iniciar o servidor:

npm start


O servidor estará disponível em http://localhost:3000.

API Endpoints
POST /api/users/register: Registra um novo usuário.
POST /api/users/login: Realiza login de um usuário.
GET /api/users: Lista todos os usuários.
DELETE /api/users/:id: Exclui um usuário específico.
