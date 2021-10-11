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
    let queryString = `INSERT INTO list (name, task ) VALUES ($1, $2)`;
    let values = [req.body.name, req.body.task];
    pool.query(queryString, values).then ((results)=>{
        res.sendStatus(201);
      }).catch((err)=>{
        console.log(err);
        res.sendStatus(500);
      })
})
app.delete( '/tasks', (req, res )=>{    
  let queryString = `DELETE FROM "list" where id=${ req.query.id };`
  pool.query( queryString ).then( ( results )=>{
      res.sendStatus( 200 );
  }).catch( (err)=>{
      console.log( err );
      res.sendStatus( 500 );
  })
})

app.put( '/tasks', (req, res)=>{
  console.log( '/tasks PUT:', req.query );
  let queryString = `UPDATE "list" SET complete=true WHERE id=${ req.query.id };`
  pool.query( queryString ).then( ( results )=>{
      res.sendStatus( 200 );
  }).catch( (err)=>{
      console.log( err );
      res.sendStatus( 500 );
  })
})