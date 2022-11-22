const { json } = require('express')
const express = require('express')
const routes = express.Router()
/*
routes.get('/api', (req, res) => {
  res.send('Prueba de la API')
  console.log('Accediendo a la API')
})
*/
routes.get('/', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err)
    var query = 'SELECT * FROM books'
    conn.query(query, (err, rows) => {
      if (err) return res.send(err)
      console.log(rows)
      res.json(rows)
    })
  })
})
routes.post('/', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err)
    console.log(req.body)
    conn.query('INSERT INTO books set ?', [req.body], (err, rows) => {
      if (err) return res.send(err)
      res.send(`Libro añadido`)
    })
  })
})
routes.delete('/:id', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err)
    conn.query('DELETE From books WHERE id = ?', [req.params.id], (err, rows) => {
      if (err) return res.send(err)
      res.send('Libro eliminado')
    })
  })
})
routes.put('/:id', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err)
    conn.query('UPDATE books set ? WHERE id = ?', [req.body, req.params.id], (err, rows) => {
      if (err) return res.send(err)
      res.send('Libro actualizado')
    })
  })
})
module.exports = routes
