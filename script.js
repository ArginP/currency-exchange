const exchangeForm = document.querySelector('.currency-exchange-wrapper > form');
const exchangeInput = document.querySelector('#currency');
const exchangeText = document.querySelector('.exchange-text-wrapper');

let exchangeData;

// --- Получение курса валют с сервера ---
const getExchangeRate = () => {
    fetch('https://open.er-api.com/v6/latest/RUB') // обращение к API
        .then(response => response.json()) // переведет ответ в JSON
        .then(data => {
            if (data.result === "success") { // если API отрабатывает как надо, и возвращает JSON с курсами, то
                localStorage.setItem('exchangeRate', JSON.stringify(data)); // запишет ответ в виде строки localStorage
                console.log(data); // выведет его в консоль
            }
            else if (data.result === "error") { // если API возвращает ошибку
                localStorage.setItem('exchangeRateError', JSON.stringify(data)); // запишет ответ в localStorage
                console.log(data); // выведет его в консоль
            }
        })
        .catch(error => {
            console.log(error); // иные ошибки
    })
};

// --- Получение курса валют из localStorage
const updateExchangeRate = () => {
    exchangeData = JSON.parse(localStorage.getItem('exchangeRate'));
    if (exchangeData) {
        return exchangeData;
    } else {
        console.log('Нет данных курса валют.');
    }
}

// --- Кнопка перевода курса ---
exchangeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    updateExchangeRate();

    const currency = exchangeInput.value.toUpperCase();
    const rate = exchangeData['rates'][currency];

    if (rate) {
        console.log(rate)
        exchangeText.innerHTML = `<p>Курс ${currency} по отношению к RUB составляет ${rate.toFixed(3)}.</p>`;
        exchangeInput.value = '';
    } else {
        console.log('Введите код валюты')
        exchangeText.innerHTML = `<p>Введите код валюты.</p>`;
    }
});
