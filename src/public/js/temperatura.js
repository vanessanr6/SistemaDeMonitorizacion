const socket = io();

const temperatureDisplay = document.getElementById('temperature');
const valorminimo = document.getElementById('minimo');
const valormaximo = document.getElementById('maximo');
console.log(valorminimo.value, valormaximo.value);
socket.on('dataTemperatura', (data) => {
  console.log("TCL: data", data);
  temperature.innerHTML = `${data} C`;

  if(data>valormaximo.value){
    Swal.fire({
      icon: 'error',
      title: 'Advertencia',
      text: 'Temperatura muy alta',
      timer: 2000,
      footer: '<a href="/monitoreo/grafica">Modificar Limites de intervalo</a>'
    })
  }
  if(data<valorminimo.value){
    Swal.fire({
      icon: 'error',
      title: 'Advertencia',
      text: 'Temperaura muy baja',
    })
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
      valormaximo: valormaximo.value
});