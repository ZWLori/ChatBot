
function get_attrs() {
    agent_gender = $("#agent-gender").val();
    if (sessionStorage.getItem("study") == 1)
        conv_script = $("#conv-script").val();
    else
        conv_script = "N";
    console.log(agent_gender);
    console.log(conv_script);

    // store the info
    sessionStorage.setItem("agentGender", agent_gender);
    sessionStorage.setItem("convScript", conv_script);

    store_user_input();
}

function store_user_input() {

    try {
        $.post('/upload.php', {
            'stage': 'orientation',
            'id': user_id,
            'name': $("#user_name").val(),
            'gender': $('#user_gender').find(':selected').text(),
            'marital_status': $('#marital_status').find(':selected').text(),
            'child_num': $('#child_num').find(':selected').text(),
            'annual_income': $('#annual_income').val(),
            'expectation': $('#user_exp').val()

        })

        document.location.href = './stage1.html';
    }
    catch(err) {
        document.location.href = './stage1.html';
    }


}

function selection1()
{
    $("#selectStudy").css("display", "none");
    $("#selection-container").css("display", "block");
    $("#cs").css("display", "block");
    sessionStorage.setItem("study", 1);

}

function selection2()
{
    $("#selectStudy").css("display", "none");
    $("#selection-container").css("display", "block");
    
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