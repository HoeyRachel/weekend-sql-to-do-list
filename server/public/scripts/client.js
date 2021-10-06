$( document ).ready( onReady );

function onReady(){
    console.log ('in onReady');
    taskReader();
}

function taskReader(){
    console.log ('in taskReader');
    //Ajax call to get tasks
    $.ajax({
        method: 'GET',
        url: '/newTasks'
    }).then (function(response){
        console.log ('back from server succesfully:', response);
        // let el = $(tasksOut);
        // el.empty();

    }).catch( function( err ){
        // got an error
        alert( 'task entry error' );
        console.log( 'error:', err );
})
}