
const socket = io();

const temperatureDisplay = document.getElementById('temperature')

socket.on('data', (data) => {
  console.log("TCL: data", data)
  temperature.innerHTML = `${data} C`
})