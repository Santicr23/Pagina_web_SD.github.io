document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userForm');
    const userList = document.getElementById('userTable');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        fetch('insert.php', {
            method: 'POST',
            body: JSON.stringify({ name: name, email: email })
        })
        .then(response => response.text())
        .then(data => {
            alert(data); // Muestra la respuesta del servidor
            fetchUsers(); // Vuelve a cargar los usuarios después de agregar uno nuevo
            form.reset();
        });
    });

    function fetchUsers() {
        fetch('select.php')
        .then(response => response.json())
        .then(data => {
            userList.innerHTML = '';
            data.forEach(user => {
                const userRow = document.createElement('tr');
                userRow.innerHTML = `<td>${user.name}</td><td>${user.email}</td>`;
                userList.appendChild(userRow);
            });
        });
    }

    fetchUsers();
});
