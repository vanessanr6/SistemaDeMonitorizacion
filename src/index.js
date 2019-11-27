const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')
const { database } = require('./keys')
const passport = require('passport')
const http = require('http')
const socket = require('socket.io')
const SerialPort = require('serialport')
// initializations
const app = express()
const server = http.createServer(app)
const io = socket.listen(server)
const pool = require('./database');
//settings
app.set('port', process.env.PORT || 4000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: 'hbs',
  helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');

//middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// global variables
app.use((req, res, next) => {
  // app.locals.success = req.flash('success')
  // app.locals.message = req.flash('message')
  // app.locals.user = req.user 
  next()
})


//routes
app.use(require('./routes'))
app.use(require('./routes/authentication'))
app.use('/monitoreo', require('./routes/monitoreo'))

//public
app.use(express.static(path.join(__dirname, 'public')))

//starting server
server.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'))
})

io.on('connection', (socket) => {
  console.log('new socket connected');

  socket.on('minandmax', (datos)=>{
    console.log(datos.valorminimo + 'dato');
   
  });
})

//llamar datos del arduino
const Readline = require('@serialport/parser-readline')

const port = new SerialPort('COM4', {
  baudRate: 9600
})
const parser = new Readline()


parser.on('open', () => {
  console.log('Connection is opened');
})

port.on('open', function onOpen() {
  console.log("arduino conectado");
});

port.pipe(parser) 


 port.on('data', async function (data) {
    
    str = data.toString(); //Convert to string
    str = str.replace(/\r?\n|\r|/g, ""); //remove '\r' from this String
    str = JSON.stringify(str); // Convert to JSON  
    var expresionRegular =  /\s*\W\s*/;
var arrayDatos = str.split(expresionRegular);//se crea el array semparando al encontrar cualquier simbolo que no sea letra o numero
// console.log(arrayDatos)
   str2= JSON.stringify(Object.assign({},arrayDatos));//convierte un json en un array que se puede utilizar en el comando parse
    str3 = JSON.parse(str2); //Then parse it
   
  //  console.log(str3);   
  var temperatura=str3[3];
  var distancia = str3[7]
  io.emit('dataTemperatura',temperatura)

  const rango = await pool.query('SELECT cliente_modulo.minimo,cliente_modulo.maximo FROM `cliente_modulo`');
    
  if(rango[0].minimo>temperatura||rango[0].maximo<temperatura)
  {
    port.write("r");  
    console.log('temperatura fuera del rango')
    await pool.query("INSERT INTO `reportes`( `cliente_id`, `modulo_ID`, `evento`) VALUES (1,1,'temperatura fuera del rango')");
  }
  
  if (distancia<50) {
    port.write("a");  
    console.log('demasiado cerca')
  } else
  {
    port.write("v");
  }
  
  })

 
