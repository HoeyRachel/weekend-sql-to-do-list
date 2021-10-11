$( document ).ready( onReady );

function onReady(){
    console.log ('in onReady');
    $('#addTaskButton').on('click', taskAdder);
    $( '#tasksOut' ).on( 'click', '.deleteTaskButton', deleteTask );
    $( '#tasksOut' ).on( 'click', '.completeTaskButton', completeTask );
    taskReader();
}

function completeTask(){
    console.log( 'in completeTask:', $( this ).data( 'id' ) );
    $.ajax({
        method: 'PUT',
        url: '/tasks?id=' + $( this ).data( 'id' ),
    }).then( function( response ){
        console.log( 'back from update:', response );
        colorChanger();
        taskReader();
        
    }).catch( function( err ){
        console.log( err );
        alert( 'completion error' );
    })
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
            let appendString = `<li> ${response[i].name} 
                            ${response[i].task}`
                             if( !response[i].complete ){
                                appendString += ` <button class="completeTaskButton" data-id="${ response[i].id }">Complete</button>`;
                            }
                            appendString += `<button class="deleteTaskButton" data-id="${ response[i].id }">Delete</button>
                            </li>`;
                            el.append( appendString );
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

function deleteTask(){
    console.log( 'in deleteTask:', $( this ).data( 'id' ) );
    $.ajax({
        method: 'DELETE',
        url: '/tasks?id=' + $( this ).data( 'id' ),
    }).then( function( response ){
        console.log( 'back from delete:', response );
        taskReader();
    }).catch( function( err ){
        console.log( err );
        alert( 'error deleting task' );
    })
}

function colorChanger(){
    $(this).parent().css('background-color', 'blue');
}