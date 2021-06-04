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
const helpers = require('./lib/helpers')
var temperatura;
var distancia;
var humedad;
// initializations
const app = express()
const server = http.createServer(app)
const io = socket.listen(server)
const pool = require('./database');

require('./lib/passport')
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
app.use(session({
  secret: 'monitorizacion',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));
app.use(flash())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())



// global variables
app.use(async (req, res, next) => {
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');
  app.locals.user = req.user
 
  next();
});


//routes
app.use(require('./routes'))
app.use(require('./routes/authentication'))
app.use(require('./routes/administracion'))
app.use('/monitoreo', require('./routes/monitoreo'))

//public
app.use(express.static(path.join(__dirname, 'public')))

//starting server
server.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'))
})


//llamar datos del arduino
const Readline = require('@serialport/parser-readline')

const port = new SerialPort('COM6', {
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
  console.log(str3);   
  temperatura=str3[3];
  distancia = str3[7];
  humedad = str3[2];
/////
 })
 io.on('connection', (socket) => {
  console.log('new socket connected');

  
  console.log('User Conncetion');
 
  socket.on('Temperatura', function(temp){
    console.log("Temperatura");  
    temp['Temperatura']=  temperatura;
    console.log(temp);   
    io.emit('Temperatura', temp);
  });
  
  socket.on('Humedad', function(hume){
    console.log("Humedad");  
    hume['Humedad']=  humedad;
    console.log(hume);   
    io.emit('Temperatura', hume);
  });
  
  socket.on('Distancia', function(dis){
    console.log("Distancia");  
    dis['Distancia']=  distancia;
    console.log(dis);   
    io.emit('Distancia', dis);
  });
   io.emit('dataTemperatura',temperatura)
  io.emit('dataDistancia',distancia)
   io.emit('dataHumedad',humedad) 
   
    
   
  app.get('/:action', function (req, res) {
      
    var action = req.params.action || req.param('action');
     
     if(action == 'v'){
         port.write("v");
         res.redirect('/');
     } 
     if(action == 'f') {
         port.write("f");
         res.render('Humedad/advertencia');
     }
     if(action == 'a'){
       port.write("a");
       res.render('Distancia/advertencia');
   } 
   if(action == 'r') {
       port.write("r");
       res.render('monitoreo/advertencia');
       
   }     
    
  
 });
 
   
  })

