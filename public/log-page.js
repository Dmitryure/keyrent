document.addEventListener('DOMContentLoaded', () => {
    const logIn = document.getElementById('logo-form');

    logIn.addEventListener('submit', async (e) => {
        e.preventDefault();

        const mailInput = document.getElementById('InputEmail').value;
        const logPass = document.getElementById('logPass').value;
        
        let otvet = { email: mailInput, password: logPass }
        console.log(otvet)
        let res = await fetch('/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(otvet)
        });
        let response = res.text();
        window.location = '/showflat'
    });
});






