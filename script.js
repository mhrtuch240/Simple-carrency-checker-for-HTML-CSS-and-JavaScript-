document.addEventListener('DOMContentLoaded', () => {
    const amount = document.getElementById('amount');
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const result = document.getElementById('result');
    const convertButton = document.getElementById('convert');

    const apiURL = 'https://api.exchangerate-api.com/v4/latest/USD';

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                option1.value = currency;
                option1.textContent = currency;
                fromCurrency.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = currency;
                option2.textContent = currency;
                toCurrency.appendChild(option2);
            });
        });

    convertButton.addEventListener('click', () => {
        const fromValue = fromCurrency.value;
        const toValue = toCurrency.value;
        const amountValue = amount.value;

        if (fromValue && toValue && amountValue) {
            fetch(`${apiURL}`)
                .then(response => response.json())
                .then(data => {
                    const rate = data.rates[toValue] / data.rates[fromValue];
                    const convertedAmount = (amountValue * rate).toFixed(2);
                    result.textContent = `${amountValue} ${fromValue} = ${convertedAmount} ${toValue}`;
                });
        } else {
            result.textContent = 'Please fill in all fields.';
        }
    });
});
