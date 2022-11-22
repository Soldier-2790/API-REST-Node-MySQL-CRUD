/*
Creas el proyecto desde la terminal con el comando npm init -y
Añades un paquete con npm install [nombre del paquete]
Corremos el servidor desde la terminal con node server.js
Para ahorrarnos el reset del servidor, instalaremos un paquete llamado nodemon el cual lo pondremos como dependencia de desarrollo: npm i nodemon --save-dev
Luego nos vamos a la configuración en package.json y añadir un scripts: "start": "nodemon server.js"
Lo ejecutamos con npm run start
Para utilizar una base de datos MySQL usaremos la dependencia mysql express-myconnection: npm i mysql express-myconnection
*/
const express = require('express')
//Paquete de Node para crear servidores
const mysql = require('mysql')
//Trae los métodos para obtener datos
const myconn = require('express-myconnection')
//Trae métodos para conexión
const routes = require('./routes')
const app = express()//Inicializamos la app
app.set('port', process.env.PORT || 9000)//Ponemos que el puerto será el 9000
const dbOptions = {
  host: 'localhost',
  port: 3306,
  user: 'InterPro10mo',
  password: 'FarmGuardianApp',
  database: 'library'
}
//Middlewares
app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json())
//Routes
app.get('/', (req, res) => {//Enviamos una página simple con get
  res.send('Bienvenido la API');
  console.log('Accediendo a la rais de la api')
})
app.use('/api', routes)
app.listen(app.get('port'), () => {//Hacemos que el servidor escuche
  console.log(`Servidor corriendo en el puerto ${app.get('port')}`)
})
