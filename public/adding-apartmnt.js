document.addEventListener('DOMContentLoaded', () => {
    const addApart = document.getElementById('addApart');

    addApart.addEventListener('submit', async e => {
        e.preventDefault();


        const inpAddress = document.getElementById('address').value;
        const inpFloor = document.getElementById('floor').value;
        const inpPrice = document.getElementById('price').value;

        let otvet = {
            address: inpAddress,
            floor: inpFloor,
            price: Number(inpPrice)
        };


        let res = await fetch('/addApartment', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(otvet)
        });
        let response = res.text();
    });
});
