document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            login();
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();
            register();
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    listUsers(); // Carrega a lista de usuários quando a página é carregada
});

// Função para registrar um usuário
function register() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const dateOfBirth = document.getElementById('dateOfBirth').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, dateOfBirth, password })
    })
    .then(response => response.json())
    .then(data => {
        Swal.fire({
            title: 'Sucesso!',
            text: 'Registro completado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = 'login.html'; // Redireciona para a página de login após o registro
            }
        });
    })
    .catch((error) => {
        Swal.fire('Erro!', 'Não foi possível registrar. Tente novamente.');
    });
}

// Função para logar um usuário
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log("Enviando dados de login:", email, password); 

    fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        console.log("Resposta recebida"); 
        if (!response.ok) {
            throw new Error('Falha no login'); 
        }
        return response.json();
    })
    .then(data => {
        console.log("Dados recebidos:", data); 
        Swal.fire('Sucesso!', 'Login bem-sucedido!');
        window.location.href = '/dashboard.html'; 
    })
    .catch((error) => {
        console.error("Erro durante o login:", error);
        Swal.fire('Erro!', 'Login falhou. Verifique suas credenciais e tente novamente.');
    });
}

// Função para listar usuários
function listUsers() {
    fetch('http://localhost:3000/api/users', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(users => {
        const userTableBody = document.getElementById('userTable').getElementsByTagName('tbody')[0];
        userTableBody.innerHTML = users.map(user => 
            `<tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.dateOfBirth.slice(0, 10)}</td>
                <td><button class="delete-user" onclick="deleteUser(${user.id})">Delete</button></td>
            </tr>`
        ).join('');
    })
    .catch(error => console.error('Error:', error));
}

// Função para deletar um usuário
function deleteUser(userId) {
    fetch(`http://localhost:3000/api/users/${userId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(() => {
        Swal.fire('Usuário deletado com sucesso!');
        listUsers(); // Atualizar a tabela após deletar
    })
    .catch(error => console.error('Error:', error));
}

// Função para sair
function logout() {
    window.location.href = '/index.html';
}

document.addEventListener('DOMContentLoaded', function () {
    listUsers();  // Carrega a lista de usuários ao carregar a página
});
