
function get_attrs() {
    if (sessionStorage.getItem("study") == 1){
        agent_gender = $("#agent-gender").val();
        conv_script = "N"; 
    }
    else if (sessionStorage.getItem("study") == 2){
        agent_gender = $("#agent-gender").val();    
        conv_script = $("#conv-script").val();    
    }
    else {
        // used for pilot study
        agent_gender = "N";
        randNum = Math.floor(Math.random() * 3);
        switch(randNum){
            case 0: conv_script = "N"; break;
            case 1: conv_script = "M"; break;
            case 2: conv_script = "W"; break;
        }
    }

    // store the info
    sessionStorage.setItem("agentGender", agent_gender);
    sessionStorage.setItem("convScript", conv_script);

}

function selection1()
{
    $("#selectStudy").css("display", "none");
    $("#selection-container").css("display", "block");
    sessionStorage.setItem("study", 1);

}

function selection2()
{
    $("#selectStudy").css("display", "none");
    $("#selection-container").css("display", "block");
    $("#cs").css("display", "block");
    sessionStorage.setItem("study", 2);

}

function selection3(){
    sessionStorage.setItem("study", 3);
    goNext();
}

function goBack()
{
    $("#selectStudy").css("display","block");
    $("#selection-container").css("display", "none");

}

function goNext() {
    get_attrs();

    document.location.href = './index.html';

}