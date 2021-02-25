/*
To do:
    - Создавать таблицу с данными
    - Добавлять по одной строке
    - Убирать строки из таблицы
    - Сортировка данных в таблице

    - Нормальные алерты при отправки пустых инпутов

Обновление:
    1. Проверяем локальное хранилище
        1.1. Если даты нет - выводим сообщение, что даты нет
        1.2. Если дата есть - выводим таблицу с датой
    2. При отправке формы, создаем объект с датой из инпутов
    3. Добавляем объект в массив
    4. Сохраняем массив в локальное хранилище
    5. Обновляем таблицу данными из локального хранилища

Кнопка Clear:
    1. Стираем данные из локального хранилища
    2. Обновляем таблицу данными из локального хранилища
*/

const modelElem = document.getElementById('model-input');
const priceElem = document.getElementById('price-input');
const benefitElem = document.getElementById('benefit-input');
const calcBtnElem = document.getElementById('calc-btn');
const clearLocalDataBtnElem = document.getElementById('clear-local-data-btn');

const modalBtnElem = document.querySelector('.modal-btn');
const popupOverlayElem = document.querySelector('.popup-overlay');
const popupCloseElem = document.querySelector('.btn-close');
const noDataElem = document.querySelector('.no-data');

let cars = [];

// Создание объекта модели
function CarData(model, price, benefit) {
    let halfPrice = String(half(price));
    let lmp = String(getLmpPayment(price));
    // let lmp = String(getPayment(price, halfPrice));

    if (benefit === "") {
        benefit = "–"
        benefitPrice = price;
    }
    else {
        benefitPrice = String(price - benefit);
    }

    this.model = model;
    this.price = price;
    this.benefit = benefit;
    this.halfPrice = halfPrice;
    this.benefitPrice = benefitPrice;
    this.lmp = lmp;
}

// Получаем половину числа
function half(number) {return number / 2;}

// Получаем платеж по LMP + округление
function getLmpPayment(number) {
    let firstPayment = 0.5; // Первоначальный взнос
    let creditRate = 0.125; // Кредитная ставка
    let creditYears = 12; // Срок кредитования
    let lmp = number * firstPayment * creditRate / creditYears; // Формула расчета LMP
    return Math.ceil(lmp); // Откругляем в большую сторону и возвращаем
}

// Получаем платеж из API кредитного калькулятора
function getPayment(price, firstPayment) {
    let creditProgram = 18; // Кредитная программа Комфорт
    let creditTerm = 60; // Срок кредита, месяцы
    let requestPayment = new XMLHttpRequest();
    let restPayment = price - firstPayment; // Остаточный платеж
    requestPayment.open('GET', 'https://banknew.toyota.ru/v2/credit' + '?p=' + creditProgram + '&pr=' + price + '&s=' + firstPayment + '&q=' + creditTerm + '&r=' + restPayment + '&qd=0&g=0&e=0&cl=off&ti=0&tn=0&td=&dc=2&k=0&kp=0&kt=0&ku=1&i1=0&i2=0&as=0&ai=0&we=0&ts=0&gi=0&ii=0&ma=0&rdc=0');
    requestPayment.onload = function() {
        let allProgramData = JSON.parse(requestPayment.responseText);
        let monthlyPayment = allProgramData.credit.monthly_payment;
        return Math.ceil(monthlyPayment);
    };
    requestPayment.send();
}

// Сохраняем машины в local storage
function saveCars() {
    let newCars = [];
    newCars = JSON.stringify(cars);
    localStorage.setItem('carsLocal', newCars);
}

// Загружаем машины из local storage
function loadCars() {
    let getLocal = localStorage.getItem('carsLocal');
    if (!getLocal) {cars = [];}
    else {cars = JSON.parse(getLocal);}
}

// Функция проверки инпутов и оповещения
function checkRequired() {
    let fieldRequerdElem = document.querySelectorAll('.field-alert');
    if (modelElem.value == "") {
        alert('Вы не заполнили поле ' + 'Model');
        // fieldRequerdElem.classList.toggle('d-none');
        return false;
    }
    else if (priceElem.value == "") {
        alert('Вы не заполнили поле ' + 'Price');
        // fieldRequerdElem.classList.toggle('d-none');
        return false;
    }
    else {
        return true;
    }
}

function parseDataToTable() {

    // const tBodyElem = document.querySelector('.tbody');
    // const newRow = document.createElement('tr');
    // const newCell = document.createElement('td');

    // if (cars) {
    //     for (let i = 0; i < cars.length; i++) {
            

    //     }
    // }


    // let tBodyElem = document.querySelector('.tbody');
    // let newRow = tBodyElem.insertRow(tBodyElem.length);

    // for (let i = 0; i < cars.length; i++) {
    //     cell = newRow.insertCell(i);
    //     cell.innerHTML = cars[i].model;
    // }   

    // cell1 = newRow.insertCell(0);
    // cell1.innerHTML = cars[0].model;
    // cell2 = newRow.insertCell(1);
    // cell2.innerHTML = cars[0].price;

    // for (let i = 0; i < cars.length; i++) {
    //     cell(i) = newRow.insertCell(i);
    //     cell(i).innerHTML = data.model;
    // }
}

calcBtnElem.addEventListener('click', (ev) => {
    ev.preventDefault(); // Отменяем стандартное поведение кнопки
    
    // Проверка на заполненность инпутов
    if (checkRequired()) {
        loadCars(); // Загружаем из local storage
        let model = modelElem.value.trim();
        let price = priceElem.value.trim();
        let benefit = benefitElem.value.trim();
        let car = new CarData(model, price, benefit); // Создаем объект
        cars.push(car); // Добавляем Объект в массив
        saveCars(); // Сохраняем в local storage
        parseDataToTable(); // Парсим в табличку
        document.querySelector('form').reset(); // Чистим форму после
    }
});

clearLocalDataBtnElem.addEventListener('click', () => {
    localStorage.setItem('carsLocal', []); // Очищаем carsLocal в local storage
    popupOverlayElem.classList.toggle('d-none'); // Вырубаем поп-ап
});

modalBtnElem.addEventListener('click', () => {
    popupOverlayElem.classList.toggle('d-none');
}); // Открытие поп-апа по кнопке

popupCloseElem.addEventListener('click', () => {
    popupOverlayElem.classList.toggle('d-none');
}); // Открытие поп-апа по кнопке


// ==== masking

let inputsMask = document.querySelectorAll('input[type="tel"]');
let im = new Inputmask("+7 (999) 999 99 99");

im.mask(inputsMask);

// ====