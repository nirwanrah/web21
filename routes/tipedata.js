var express = require('express');
var router = express.Router();

module.exports = (db) => {
  // home, get data list
  router.get('/', function (req, res, next) { //localhost:3000/tipedata/test
    db.query('SELECT * FROM tipedata', (err, response) => {
      if (err) return res.status(500).json(err)
      res.json(response.rows)
    })
  })

  

  // add data
  router.post('/', function (req, res, next) { 
    console.log(req.body)//pake "" kalo string 
    db.query('INSERT INTO tipedata(string, integer, float, date, boolean) values($1,$2,$3,$4,$5)', 
      [req.body.string, Number(req.body.integer), Number(req.body.float), req.body.date, req.body.boolean], (err, response) => {
        if (err) {
          console.log(err)
          return res.status(500).json(err)
        }
        res.json(response.rows)
      })
  })

  //delete data
  router.delete('/:id', function (req, res, next) { //localhost:3000/murid/test
    db.query('DELETE FROM tipedata WHERE id=$1', [Number(req.params.id)], (err, response) => {
        if (err) {
          console.log(err)
          return res.status(500).json(err)
        }
        res.json(response.rows)
      })
  })

  //edit data
  router.get('/:id', function (req, res, next) { 
    db.query('SELECT * FROM tipedata WHERE id = $1', [Number(req.params.id)], (err, response) => {
      if (err) return res.status(500).json(err)
      if (response.rows.length == 0) return res.status(200).json({error : true, message : 'data tidak ditemukan'})
      res.json(response.rows[0])
    })
  })
  router.put('/:id', function (req, res, next) { 
    db.query('UPDATE tipedata SET string=$1, integer=$2, float=$3, date=$4, boolean=$5 WHERE id=$6',
      [req.body.string, Number(req.body.integer), Number(req.body.float), req.body.date,
      req.body.boolean, Number(req.params.id)], (err, response) => {
        if (err) {
          console.log(err)
          return res.status(500).json(err)
        }
        res.json(response.rows)
      })
  })

  return router
}
// sudo kill -9 `sudo lsof -t -i:3000`