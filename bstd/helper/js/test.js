let rawData = localStorage.getItem('data');
let data = JSON.parse(rawData);
let array = [];

if (array) {
    array = data;
}
else {
    array = [];
}

let firstGuy = {
    name: 'Matt',
    age: 20,
    goodGuy: true,
};
let secondGuy = {
    name: 'Steve',
    age: 24,
    goodGuy: false,
};
let thirdGuy = {
    name: 'Lua',
    age: 16,
    goodGuy: true,
};

// array.push(secondGuy);

localStorage.setItem('data', JSON.stringify(array));


// =============================================================
const modelElem = document.querySelector('.model-input');
const priceElem = document.querySelector('.price-input');
const benefitElem = document.querySelector('.benefit-input');
const calcBtnElem = document.getElementById('calc-btn');

let cars = [];

let localCars;

const addCar = function(ev) {
    ev.preventDefault(); // Отменяем стандартное поведение кнопки

    let getLocal = localStorage.getItem('localCars');

    if (!getLocal) {
        cars = [];
    }
    else {
        cars = JSON.parse(getLocal);
    }

    let model = modelElem.value.trim();
    let price = priceElem.value.trim();
    let benefit = benefitElem.value.trim();

    let car = {
        model: model,
        price: price,
        benefit: benefit,
    }

    cars.push(car);

    localCars = JSON.stringify(cars);

    localStorage.setItem('localCars', localCars);

    document.querySelector('form').reset(); // Чистим форму после
}

calcBtnElem.addEventListener('click', addCar); // Слушаем кнопку и выполняем addCar