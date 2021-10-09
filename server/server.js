//requires
const express = require ('express');
const app = express ();

const bodyParser = require ('body-parser');
const pool = require( './modules/pool' );

const port = 5000;



app.use( express.static( 'server/public' ) );

// NEEDED for POSTS to work
app.use( bodyParser.urlencoded( { extended: true }))

app.listen( port, ()=>{
    console.log( 'server up on', port );
})

app.get ('/tasks', (req,res)=>{
    const queryString =`SELECT*FROM list`;
    pool.query (queryString).then ((results)=>{
        res.send (results.rows);
    }).catch ((err)=>{
        console.log (err);
        res.sendStatus (500);
    })
    
  })

  app.post ('/tasks', (req,res)=>{
      console.log ('/list POST:', req.body);
    let queryString = `INSERT INTO list (name, task, complete) VALUES ($1, $2, $3)`;
    let values = [req.body.name, req.body.task, req.body.complete];
    pool.query(queryString, values).then ((results)=>{
        res.sendStatus(201);
      }).catch((err)=>{
        console.log(err);
        res.sendStatus(500);
      })
})