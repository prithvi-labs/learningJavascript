document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').onsubmit = function() {
        const from = document.querySelector('#from').value.toUpperCase();
        fetch(`https://api.frankfurter.dev/v2/rates?base=${from}`)
        .then(response => response.json())
        .then(data => {
        
        const to = document.querySelector('#to').value.toUpperCase();

        const item = data.find(item => item.quote === `${to}`);
        const rate = item?.rate;

        if (rate !== undefined) {
            document.querySelector('#result').innerHTML = `1 ${from} is equal to ${rate.toFixed(3)} ${to}.`;
        } else {
            document.querySelector('#result').innerHTML = 'Invalid Currency.';
        }
        })
        .catch(error => {
            console.log('Error:', error);
        });
    
        return false;
    }
});
