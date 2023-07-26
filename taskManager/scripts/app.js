let isImportant = false;
let isVisable = true;

function saveTask(){
    //get values
    const title = $("#txtTitle").val();
    const description = $("#txtDescription").val();
    const color = $("#selColor").val();
    const date = $("#selDate").val();
    const status = $("#selStatus").val();
    const budget =$("#txtBudget").val();


    //build object
    let taskSave = new Task(isImportant,title,description,color,date,status,budget);
    console.log(taskSave);


    //save to server
    $.ajax({
        type: "POST",
        url: "http://fsdiapi.azurewebsites.net/api/tasks/",
        data:JSON.stringify(taskSave),
        contentType: "application/json",
        success: function(response) {
            console.log(response);
        //display the task & then clear form
            displayTask(taskSave);
        },
        error: function(error){
            console.log(error);
            alert("something went wrong");
        }
    });


    clearForm();
}

function clearForm(){
    $("#txtTitle").val('')
    $("#txtDescription").val('')
    $("#selDate").val('')
    $("#selStatus").val('')
    $("#txtBudget").val('');


}

function displayTask(task){
    let syntax = `<div class='task' style='border-color:${task.color}'>

    <div class='info'>
    <h5>${task.title}</h5>
    <p>${task.description}</p>
    </div>

    <label class='status'>${task.status}</label>
    
    <div class='date-budget'>
    <label>${task.startDate}</label>
    <label>${task.budget}</label>
    </div>`;

    $(".pending-tasks").append(syntax);
}


function toggleImportant(){

    const nonImportantIcon = "fa-solid fa-dumpster-fire";
    const importantIcon = "fa-solid fa-bath important-icon";


    if(isImportant) {
        $("#iImportant").remove(importantIcon).addClass(nonImportantIcon);
        importantIcon = false;
    }
    else {
        $("#iImportant").removeClass(nonImportantIcon).addClass(importantIcon);
        isImportant = true;

    }

    console.log("Working!");
}


function toggleVisibility(){
    if(isVisable) {
        $("#form").fadeOut();// fadeOut
        isVisable
    }
    else {
        $("#form").show();
        isVisable = true; //fade in
    }
}


function testRequest() 
{
    $.ajax({
        type: "GET",
        url: "http://fsdiapi.azurewebsites.net/",
        success: function(response) {
            console.log(response);
        },
        error: function(error){
            console.log(error);
        }
    });
}

    
// Create a GET request function to "http://fsdiapi.azurewebsites.net/api/tasks"
function loadTask() {  
    $.ajax({
        type: "GET",
        url: "http://fsdiapi.azurewebsites.net/api/tasks",
        
        success: function(response){
            let data = JSON.parse(response);
            for(let i=0; i< data.length; i++) {
                let task = data[i];
                if(task.title == "Market"){
                    displayTask(task);
                }
            }
            console.log(response); // Console log the request from server
            console.log(data);
        },
        error: function(error) {
            console.log(error);
        }
    })
}  


//find the elements in the server that contains title=Market
//render only those elements in the taskManager Panel


function init(){
    console.log("task manager");

    //load data
    loadTask();


    //assign events
    $("#btnSave").click(saveTask)
    $("#iImportant").click(toggleImportant)
    $("#btnDetails").click(toggleVisibility);
}

window.onload = init;


/**
 * create button on html
 * catch the click event and call a function (toddleDetails)
 * create a global variable (isVisable)
 * on the fn toggle the visibility and update the state
 */
