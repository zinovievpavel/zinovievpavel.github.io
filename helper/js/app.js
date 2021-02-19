/*
To do:
- Создавать таблицу с данными
- Добавлять по одной строке
- Убирать по строчно
- Сортировка данных в таблице
*/

const modelElem = document.querySelector('.model-input');
const priceElem = document.querySelector('.price-input');
const benefitElem = document.querySelector('.benefit-input');
const calcBtnElem = document.getElementById('calc-btn');
const clearLocalDataBtnElem = document.getElementById('clear-local-data-btn');
const modalBtnElem = document.querySelector('.modal-btn');
const popupOverlayElem = document.querySelector('.popup-overlay');
const popupCloseElem = document.querySelector('.popup-close');
let cars = [];

const addCar = function(ev) {
    ev.preventDefault(); // Отменяем стандартное поведение кнопки

    // readLocalData();

    let model = modelElem.value.trim();
    let price = priceElem.value.trim();
    let benefit = benefitElem.value.trim();

    let car = new CarData(model, price, benefit);

    // let modelObj = new Object();
    // modelObj = {
    //     price: price,
    //     halfPrice: halfPrice,
    //     benefit: benefit,
    //     benefitPrice: benefitPrice,
    //     lmp: lmp,
    // }; // Создаем новый объект

    cars.push(car); // Добавляем Объект в массив
    // writeLocalData(cars); // Пишем в local storage
    document.querySelector('form').reset(); // Чистим форму после
    console.log(cars);
}

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
function half(number) {
    return number / 2;
}

// Получаем платеж по LMP + округление
function getLmpPayment(number) {
    let firstPayment = 0.5; // Первоначальный взнос
    let creditRate = 0.125; // Кридитная ставка
    let creditYears = 12; // Срок кредитования
    let lmp = number * firstPayment * creditRate / creditYears; // Формула расчет LMP
    return Math.ceil(lmp); // Откругляем в большую сторону и возвращаем
}

// Пишем carsData в local storage
function writeLocalData(arr) {
    localStorage.setItem('сarsData', JSON.stringify(arr));
};

// Читаем из local storage
function readLocalData() {
    if (localStorage.getItem('сarsData')) {
        сars = JSON.parse(localStorage.getItem('сarsData'));
    } // Проверка на пустой local storage
};

// function readLocalData() {
//     if (localStorage.getItem('сarsData') === null) {
//         localStorage.setItem('сarsData', 0);
//     }
//     сars = JSON.parse(localStorage.getItem('сarsData'));
// };

// Чистим дату
let dataWipe = function clearLocalData() {
    сarsData = [];
    writeLocalData(сarsData);
};

calcBtnElem.addEventListener('click', addCar); // Слушаем кнопку и выполняем addCar
clearLocalDataBtnElem.addEventListener('click', dataWipe); // Слушаем кнопку и стираем всю дату
modalBtnElem.addEventListener('click', function() {
    popupOverlayElem.classList.toggle('opacity-0');
    popupOverlayElem.classList.toggle('visibility-hidden');
}); // Открытие поп-апа по кнопке
popupCloseElem.addEventListener('click', function() {
    popupOverlayElem.classList.toggle('opacity-0');
    popupOverlayElem.classList.toggle('visibility-hidden');
}); // Открытие поп-апа по кнопке

