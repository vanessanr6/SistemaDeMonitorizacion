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
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// global variables
app.use((req,res,next) => {
  // app.locals.success = req.flash('success')
  // app.locals.message = req.flash('message')
  // app.locals.user = req.user 
  next()
})


//routes
app.use(require('./routes'))
app.use( require('./routes/authentication'))
app.use( '/monitoreo',require('./routes/monitoreo'))

//public
app.use(express.static(path.join(__dirname, 'public')))

//starting server
server.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'))
})

io.on('connection', (socket) => {
  console.log('new socket connected');
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


port.on('data', (data)=> {
 console.log(data.toString())
 
  io.emit('data', `> ${data}`)
  })



{/* <script src="socket.io/socket-io.js"></script>
<script> const socket = io()</script> 
socket.on('data', (data) => {
log(data)
}*/}