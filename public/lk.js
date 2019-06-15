document.addEventListener('DOMContentLoaded', () => {
    const rentButton = document.getElementById('rentButton');

    rentButton.addEventListener('click', async e => {
        let wl = window.location.href.match('([^\/]+$)')
        console.log(wl[0])
        await fetch('/rentFlat', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({wl: wl[0]})
        });
    });

})
