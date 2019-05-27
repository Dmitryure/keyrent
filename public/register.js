document.addEventListener('DOMContentLoaded', () => {
    const formaRegister = document.getElementById('reg-form');



    formaRegister.addEventListener('submit', async e => {
        e.preventDefault();

        const inputName = document.getElementById('inputName').value;
        const inputSurname = document.getElementById('inputSurname').value;
        const inputEmail = document.getElementById('inputEmail').value;
        const inputPassword = document.getElementById('inputPassword').value;
        const type = document.getElementById('type').value;

        let isOwner = 0
        if(type === 'Арендодатель'){
            isOwner = 1
        }
        await fetch('/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: inputName,
                surname: inputSurname,
                email: inputEmail,
                type: isOwner,
                password: inputPassword
            })
        });

        window.location ='/showflat'
    });


});