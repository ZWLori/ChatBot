
function get_attrs() {
    agent_gender = $("#agent-gender").val();
    conv_script = $("#conv-script").val();

    // store the info
    sessionStorage.setItem("agentGender", agent_gender);
    sessionStorage.setItem("convScript", conv_script);

    if (!online_version) {
        convStyle = document.getElementById("convStyle");
        convStyle = convStyle.options[convStyle.selectedIndex].value;
        sessionStorage.setItem("convStyle", convStyle);
    }
    else{
        sessionStorage.setItem("convStyle", convStyle);
    }

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
    document.location.href = './stage1.html';

}