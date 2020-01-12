const socket = io();

var ctx = document.getElementById('myChart').getContext('2d');

var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["Serial"],
        datasets: [{
            label: 'Monitoreo de temperatura',
            fill: false,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgb(18, 107, 148)',
            ],
            borderWidth: 2,
            data: [],
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 100
                }
            }]
        }
    }
});

let counter = 0 ;
socket.on('dataHumedad', function (dataSerial) {
  chart.data.labels.push(counter);
  chart.data.datasets.forEach(dataset => {
    dataset.data.push(dataSerial);
  });
  counter++;
  chart.update();
});

setTimeout( () => {
    location.reload();
  }, 30000);
  