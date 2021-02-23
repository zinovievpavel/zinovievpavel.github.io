/*
To do:
    - Создавать таблицу с данными
    - Добавлять по одной строке
    - Убирать строки из таблицы
    - Сортировка данных в таблице

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

const modelElem = document.querySelector('.model-input');
const priceElem = document.querySelector('.price-input');
const benefitElem = document.querySelector('.benefit-input');
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
    let benefitPrice = String(price - benefit);
    let lmp = String(getLmpPayment(price));

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
    if (modelElem.value == "") {
        alert('Вы не заполнили поле ' + 'Model');
        return false;
    }
    else if (priceElem.value == "") {
        alert('Вы не заполнили поле ' + 'Price');
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