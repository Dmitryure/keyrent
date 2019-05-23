document.addEventListener('DOMContentLoaded', () => {
    const formaRegister = document.getElementById('reg-form');



    formaRegister.addEventListener('submit', async e => {
        e.preventDefault();

        const inputName = document.getElementById('inputName').value;
        const inputSurname = document.getElementById('inputSurname').value;
        const inputEmail = document.getElementById('inputEmail').value;
        const inputPassword = document.getElementById('inputPassword').value;
        const type = document.getElementById('type').value;

        await fetch('/reg', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: inputName,
                surname: inputSurname,
                email: inputEmail,
                type: type,
                password: inputPassword
            })
        });
    });


});