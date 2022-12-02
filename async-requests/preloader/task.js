// class ExchangeRates {
//     constructor (container) {
//         this.container = container;

//         this.xhr = new XMLHttpRequest();

//         this.registerEvents();
//         this.xhr.open('GET', 'https://netology-slow-rest.herokuapp.com');
//         this.xhr.send();

//         console.log(this.container);
//         console.log(this.xhr);
        
//     }

//     registerEvents() {
//         this.xhr.addEventListener('readystatechange', this.receivingData);
//     }

//     receivingData() {
//         console.log('receiving');
//         console.log(this.xhr.readyState);
//     }
// }

// new ExchangeRates(document.querySelector('.card'));

const xhr = new XMLHttpRequest();

xhr.addEventListener('changereadystate', () => {
    console.log(xhr.readyState);
    console.log('ready');
});

xhr.open('GET', 'https://netology-slow-rest.herokuapp.com');

xhr.send();
