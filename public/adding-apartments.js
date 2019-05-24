document.addEventListener('DOMContentLoaded', () => {
    const addApart = document.getElementById('add-app-form');

    addApart.addEventListener('submit', async e => {
        e.preventDefault();


        const inpAddress = document.getElementById('inputAddress').value;
        const inpFloor = document.getElementById('inputFloor').value;
        const inpPrice = document.getElementById('inputPrice').value;

        let otvet = {
            address: inpAddress,
            floor: inpFloor,
            price: Number(inpPrice)
        };

        await fetch('/addApartment', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(otvet)
        });
        // let response = res.text();
    });
});
