const socket = io();

const temperatureDisplay = document.getElementById('temperature');
const valorminimo = document.getElementById('minimo');
const valormaximo = document.getElementById('maximo');
console.log(valorminimo.value, valormaximo.value);
socket.on('data', (data) => {
  console.log("TCL: data", data);
  temperature.innerHTML = `${data} C`;
})
window.onload = function(){
    socket.emit('minandmax', {
        valorminimo: valorminimo.value,
        valormaximo: valormaximo.value
    });
}