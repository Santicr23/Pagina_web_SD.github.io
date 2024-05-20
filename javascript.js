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
            alert(data); //Muestra la respuesta del servidor
            fetchUsers(); //Vuelve a cargar los usuarios después de agregar uno nuevo
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
                
                // Agregar el botón de eliminar a la fila
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Eliminar';
                deleteButton.dataset.name = user.name; // Asignar el nombre del usuario como atributo de datos
                deleteButton.classList.add('delete-btn'); // Agregar una clase al botón para identificarlo
                
                const td = document.createElement('td');
                td.appendChild(deleteButton);
                userRow.appendChild(td);
    
                userList.appendChild(userRow);
            });
        });
    }
    
    fetchUsers();

    //botón de eliminar
    userList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            var nameToDelete = event.target.dataset.name;
            if (confirm("¿Estás seguro de que quieres eliminar al usuario " + nameToDelete + "?")) {
                fetch('delete.php', {
                    method: 'POST',
                    body: JSON.stringify({ name: nameToDelete }), //Enviar el nombre del usuario a eliminar
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.text())
                .then(message => {
                    alert(message); //Mostrar el mensaje de respuesta
                    fetchUsers(); //Actualizar la tabla después de eliminar el usuario
                })
                .catch(error => console.error('Error:', error));
            }
        }
    });
});
