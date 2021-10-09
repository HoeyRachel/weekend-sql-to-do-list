$( document ).ready( onReady );

function onReady(){
    console.log ('in onReady');
    $('#addTaskButton').on('click', taskAdder);
    taskReader();
}

function taskReader(){
    console.log ('in taskReader');
    //Ajax call to get tasks
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then (function(response){
        console.log ('back from server succesfully:', response);
        let el = $(tasksOut);
        el.empty();
        for (let i=0; i<response.length; i++) {
            el.append (`<li> ${response[i].name} 
                            ${response[i].task}
                             ${response[i].complete}
                            </li>`)
        }

    }).catch( function( err ){
        // got an error
        alert( 'task entry error' );
        console.log( 'error:', err );
})
}

function taskAdder(){
    console.log ('in taskAdder');
    let taskToSend = {
        name: $('#nameIn'). val(),
        task: $('#taskIn'). val(),
        complete: $('#completeIn'). val(),
        
    }
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: taskToSend
    }).then (function (response){
        console.log ('back from POST:', response);
        taskReader();
    }).catch (function (err){
        alert ('problem adding task');
        console.log (err);
    })
}