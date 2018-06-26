
function get_attrs() {
    agent_gender = $("#agent-gender").val();
    if (sessionStorage.getItem("study") == 2)
        conv_script = $("#conv-script").val();
    else
        conv_script = "N";

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

function goBack()
{
    $("#selectStudy").css("display","block");
    $("#selection-container").css("display", "none");

}

function goNext() {
    get_attrs()
    document.location.href = './stage1.html';
}