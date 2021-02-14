/*
To do:
- Создавать таблицу с данными
- Добавлять по одной строке
- Убирать по строчно
- Сортировка данных

*/

const modelElem = document.querySelector('.model-input');
const priceElem = document.querySelector('.price-input');
const benefitElem = document.querySelector('.benefit-input');
const calcBtnElem = document.getElementById('calc-btn');
const clearLocalDataBtnElem = document.getElementById('clear-local-data-btn');
let cars = [];

const addCar = function(ev) {
    ev.preventDefault(); // Отменяем стандартыную отпраку по клику

    let model = modelElem.value;
    let price = priceElem.value;
    let benefit = benefitElem.value;
    let halfPrice = String(half(price));
    let benefitPrice = String(price - benefit);
    let lmp = String(getLmpPayment(price));

    let car = {
        model: model,
        price: price,
        halfPrice: halfPrice,
        benefit: benefit,
        benefitPrice: benefitPrice,
        lmp: lmp,
    } // Создаем новый объект
    cars.push(car); // Добавляем Объект в массив
    writeLocalData(cars); // Пишем в local storage
    document.querySelector('form').reset(); // Чистим форму после
}

// Получаем половину числа
function half(number) {
    return number / 2;
}

// Получаем платеж по LMP + округление
function getLmpPayment(number) {
    let lmp = number * 0.5 * 0.125 / 12; // Формула расчет LMP
    return Math.ceil(lmp);
}

// Пишем в local storage
function writeLocalData(arr) {
    localStorage.setItem('cars_data', JSON.stringify(arr));
};

// Читаем из local storage
function readLocalData() {
    if (localStorage.getItem('cars_data')) {
        сars = localStorage.getItem('cars_data');
    } // Проверка на пустой local storage
};

// Чистим экран и результаты игры
let dataWipe = function clearLocalData() {
    cars_data = 0;
    writeLocalData(cars_data);
};

calcBtnElem.addEventListener('click', addCar); // Слушаем кнопку и выполняем addCar
clearLocalDataBtnElem.addEventListener('click', dataWipe); // Слушаем кнопку и стираем всю дату



// function createTable() {
//     let thead = document.createElement('thead');
//     return thead;
// }

function addRow() {
    let template = '
        <tr>
            <td>cars[0]</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    '
}