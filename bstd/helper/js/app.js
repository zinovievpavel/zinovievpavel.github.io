/*
To do:
    - DONE: Добавить id к объекту
    - DONE: Парсить табличку при загрузке страницы, до нажатия кнопки
    - Разделить функцию парсинга таблички на две: create и update

    - DONE: Создавать таблицу с данными
    - DONE: Добавлять по одной строке
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
const dicsElem = document.querySelector('.disc');
const tableContElem = document.querySelector('.table-container');

const modalBtnElem = document.querySelector('.modal-btn');
const popupOverlayElem = document.querySelector('.popup-overlay');
const popupCloseElem = document.querySelector('.btn-close');
const noDataElem = document.querySelector('.no-data');

const dataTableHeaders = ['Model', 'Price', 'Half price', 'Benefit', 'Price w/ benefit', 'Payment&nbsp;*'];

let cars = [];
let carId = 0;

checkLocal();
createDataTable();

// Функция создания таблицы из массива объектов
function createDataTable() {
    let dataTable = document.getElementById('data-table');
    let tBody = document.getElementById('tbody');
    tbody.innerHTML = "";

    for (let i = 0; i < cars.length; i++) {
        let row = document.createElement("tr");
        for (let key in cars[i]) {

            let cell = document.createElement("td");
            let createAttr = document.createAttribute('data-label');

            cell.setAttributeNode(createAttr);

            cell.innerHTML = cars[i][key];

            // Вот это надо как то оптимизировать
            if (key === 'carId') {key = 'Id';} 
            else if (key === 'model') {key = 'Model';} 
            else if (key === 'price') {key = 'Price';} 
            else if (key === 'halfPrice') {key = 'Half price';} 
            else if (key === 'benefit') {key = 'Benefit';} 
            else if (key === 'benefitPrice') {key = 'Price w/ benefit';} 
            else if (key === 'lmp') {key = 'Payment *';}

            createAttr.value = key;
            // console.log('Вот он ' + key + ' и это ' + typeof(key));
            row.appendChild(cell);
        }
        tBody.appendChild(row);
    }
    // toNormal('benefit');
}

// Создание объекта модели
function CarData(model, price, benefit) {
    carId++;
    let halfPrice = String(half(price));
    let lmp = String(getLmpPayment(price));
    // let lmp = String(getPayment(price, halfPrice));

    if (benefit === "") {
        benefit = "–";
        benefitPrice = "–";
    } else {
        benefitPrice = String(price - benefit);
    }

    // Порядок создания значений важен для таблицы на фронте!
    this.carId = carId;
    this.model = model;
    this.price = price;
    this.halfPrice = halfPrice;
    this.benefit = benefit;
    this.benefitPrice = benefitPrice;
    this.lmp = lmp;
}

// Получаем половину числа
function half(number) {
    return number / 2;
}

// Получаем платеж по LMP + округление
function getLmpPayment(number) {
    let firstPayment = 0.5; // Первоначальный взнос
    let creditRate = 0.125; // Кредитная ставка
    let creditYears = 12; // Срок кредитования
    let lmp = number * firstPayment * creditRate / creditYears; // Формула расчета LMP
    return Math.ceil(lmp); // Откругляем в большую сторону и возвращаем
};

// Получаем платеж из API кредитного калькулятора
function getPayment(price, firstPayment) {
    let creditProgram = 18; // Кредитная программа Комфорт
    let creditTerm = 60; // Срок кредита, месяцы
    let requestPayment = new XMLHttpRequest();
    let restPayment = price - firstPayment; // Остаточный платеж
    requestPayment.open('GET', 'https://banknew.toyota.ru/v2/credit' + '?p=' + creditProgram + '&pr=' + price + '&s=' + firstPayment + '&q=' + creditTerm + '&r=' + restPayment + '&qd=0&g=0&e=0&cl=off&ti=0&tn=0&td=&dc=2&k=0&kp=0&kt=0&ku=1&i1=0&i2=0&as=0&ai=0&we=0&ts=0&gi=0&ii=0&ma=0&rdc=0');
    requestPayment.onload = function () {
        let allProgramData = JSON.parse(requestPayment.responseText);
        let monthlyPayment = allProgramData.credit.monthly_payment;
        return Math.ceil(monthlyPayment);
    };
    requestPayment.send();
};

// Сохраняем машины в local storage
function saveCars() {
    let newCars = [];
    newCars = JSON.stringify(cars);
    localStorage.setItem('carsLocal', newCars);
}

// Загружаем машины из local storage


// Функция проверки инпутов и оповещения
function checkRequired() {
    let fieldRequerdElem = document.querySelectorAll('.field-alert');

    if (modelElem.value == "" && priceElem.value == "") {
        alert('Вы не заполнили поле ' + 'Model' + ' и ' + 'Price');
        // for (let i = 0; i < fieldRequerdElem.length; i++) {
        //     fieldRequerdElem[i].classList.toggle('d-none');
        //     return false;
        // }
    } else if (modelElem.value == "") {
        alert('Вы не заполнили поле ' + 'Model');
        // for (let i = 0; i < fieldRequerdElem.length; i++) {
        //     fieldRequerdElem[i].classList.toggle('d-none');
        //     return false;
        // }
    } else if (priceElem.value == "") {
        alert('Вы не заполнили поле ' + 'Price');
        // for (let i = 0; i < fieldRequerdElem.length; i++) {
        //     fieldRequerdElem[i].classList.toggle('d-none');
        //     return false;
        // }
    } else {
        return true;
    }
}
calcBtnElem.addEventListener('click', (ev) => {
    ev.preventDefault(); // Отменяем стандартное поведение кнопки

    // Проверка на заполненность инпутов
    if (checkRequired()) {
        checkLocal(); // Загружаем из local storage
        let model = modelElem.value.trim();
        let price = priceElem.value.trim();
        let benefit = benefitElem.value.trim();
        let car = new CarData(model, price, benefit); // Создаем объект
        cars.push(car); // Добавляем Объект в массив
        createDataTable();
        saveCars(); // Сохраняем в local storage
        checkLocal();
        document.querySelector('form').reset(); // Чистим форму после
    }
});

clearLocalDataBtnElem.addEventListener('click', () => {
    localStorage.setItem('carsLocal', []); // Очищаем carsLocal в local storage
    tableContElem.classList.add('d-none');
    dicsElem.classList.add('d-none');
    noDataElem.classList.remove('d-none');
    popupOverlayElem.classList.toggle('d-none'); // Вырубаем поп-ап
});

modalBtnElem.addEventListener('click', () => {
    popupOverlayElem.classList.toggle('d-none');
}); // Открытие поп-апа по кнопке

popupCloseElem.addEventListener('click', () => {
    popupOverlayElem.classList.toggle('d-none');
}); // Открытие поп-апа по кнопке


// ==== masking

// Не работает с input type number?!?!
let inputsMask = document.querySelectorAll('input[type="tel"]');
let im = new Inputmask("+7 (999) 999 99 99");

im.mask(inputsMask);

// ====

function checkLocal() {
    let localData = localStorage.getItem('carsLocal');
    if (localData) {
        parseLocal(localData);
        tableContElem.classList.remove('d-none');
        dicsElem.classList.remove('d-none');
        noDataElem.classList.add('d-none');
    } else {
        cars = [];
        carId = 0;
        tableContElem.classList.add('d-none');
        dicsElem.classList.add('d-none');
        noDataElem.classList.remove('d-none');
    }
}

function parseLocal(data) {
    cars = JSON.parse(data);
    carId = cars[cars.length - 1].carId; // Что бы не прерывалось присваевание id для объектов
}