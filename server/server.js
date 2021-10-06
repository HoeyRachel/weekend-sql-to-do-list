//requires
const express = require ('express');
const app = express ();

const bodyParser = require ('body-parser');
const port = 5000;

let taskList = [];
app.use( express.static( 'server/public' ) );
// NEEDED for POSTS to work
app.use( bodyParser.urlencoded( { extended: true }))

app.listen( port, ()=>{
    console.log( 'server up on', port );
})

app.get ('/newTasks', (req,res)=>{
    console.log ('/newTasks GET hit');
    res.send (taskList);
  })
