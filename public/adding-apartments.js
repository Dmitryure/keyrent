document.addEventListener('DOMContentLoaded', () => {
    const addApart = document.getElementById('add-app-form');

    addApart.addEventListener('submit', async e => {
        e.preventDefault();


        const inpAddress = document.getElementById('inputAddress').value;
        const inpFloor = document.getElementById('inputFloor').value;
        const inpPrice = document.getElementById('inputPrice').value;
        const inpFoto = document.getElementById('inputFoto').value;
        const desc = document.getElementById('desc').value;



        await fetch('/addApartment', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                address: inpAddress,
                floor: inpFloor,
                image: inpFoto,
                price: Number(inpPrice),
                desc: desc
            })
        });

        window.location = '/';
    });
});
