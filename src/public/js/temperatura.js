
const socket = io();

const temperatureDisplay = document.getElementById('temperature');
const valorminimo = document.getElementById('minimo');
const valormaximo = document.getElementById('maximo');
console.log(valorminimo.value, valormaximo.value);
socket.on('data', (data) => {
  console.log("TCL: data", data);
  temperature.innerHTML = `${data} C`;

  

  if(data > valorminimo.value){
    fetch('/ajaxdemo', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({cliente: 1, modulo: 1, min: valorminimo.value, max: valormaximo.value}),
  })
  .then(function(response) {
      console.log('response =', response);
      return response.json();
  })
  .then(function(data) {
      console.log('data = ', data);
  })
  .catch(function(err) {
      console.error(err);
  });
    
  }

});

socket.emit('minandmax', {
      valorminimo: valorminimo.value,
      valormaximo: valormaximo.value
});

// document.addEventListener("DOMContentLoaded", function(){
//   var form = document.getElementById('form');
//   form.addEventListener("submit", function(e){
//     e.preventDefault();
//     var mytext = document.getElementById('mytext').value;
//     fetch('/ajaxdemo', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         body: {cliente: 1, modulo: 1, min: valorminimo.value, max: valormaximo.value},
//     })
//     .then(function(response) {
//         console.log('response =', response);
//         return response.json();
//     })
//     .then(function(data) {
//         console.log('data = ', data);
//     })
//     .catch(function(err) {
//         console.error(err);
//     });
//   })
// })

