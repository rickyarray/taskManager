let isImportant = false;
let isVisable = true;

function saveTask(){
    
    console.log("Saving task");
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


    
function init(){
    console.log("task manager");

    //load data

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
