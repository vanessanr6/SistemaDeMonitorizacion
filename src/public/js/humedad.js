const socket = io();
var i = 0;
var myVar;
const temperatureDisplay = document.getElementById('humedad');
const valorminimo = document.getElementById('minimo');
const valormaximo = document.getElementById('maximo');

function myFunction() {
  myVar = setInterval(alertFunc, 60000);
}

function alertFunc() {
  i = 0;
}

console.log(valorminimo.value, valormaximo.value);
socket.on('dataHumedad', (data) => {
  humedad.innerHTML = `${data} %`;
  if(i != 1){
    if(data<valorminimo.value){
      location.href ="http://127.0.0.1:4000/f";
    /*  Swal.fire({
        icon: 'error',
        title: 'Advertencia',
        text: 'Temperatura muy baja',
        timer: 2000
      })*/
      i = 1;
      
      myFunction();
    }
  }

  if(i != 1){
    if(data<valorminimo.value){
      location.href ="http://127.0.0.1:4000/f";
    /*  Swal.fire({
        icon: 'error',
        title: 'Advertencia',
        text: 'Temperatura muy baja',
        timer: 2000
      })*/
      i = 1;
      
      myFunction();
    }
  }
  

  // fetch('/ajaxdemo', {
  //   method: 'POST',
  //   headers: {
  //       'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({"cliente_id": 1, "modulo_id": 1, "minimo": 10, "maximo": 11}),
  // })
  // .then(function(response) {
  //   console.log('response =', response);
  //   return response.json();
  // })
  // .then(function(data) {
  //   console.log('data = ', data);
  // })
  // .catch(function(err) {
  //   console.error(err);
  // });

});

socket.emit('minandmax', {
      valorminimo: valorminimo.value,
      valormaximo: valormaximo.value,
      modulo: 2
});