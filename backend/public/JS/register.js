

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.style.display = 'none';

    
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    
    if (password !== confirmPassword) {
        errorMessage.textContent = 'Las contraseñas no coinciden';
        errorMessage.style.display = 'block';
        return;
    }

    
    const formData = {
        id_gmail: document.getElementById('email').value,
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        id_rol: parseInt(document.getElementById('rol').value),
        password: password
    };

    try {
        
        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

       
        if (response.ok) {
            //alert('Registro exitoso');
            window.location.href = '/login.html';
        } else {
            errorMessage.textContent = data.message;
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        
        console.error('Error:', error);
        errorMessage.textContent = 'Error de conexión';
        errorMessage.style.display = 'block';
    }
});