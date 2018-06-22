// False: lab experiment; True: online version
var online_version = false;
var container = $("#chatContainer");
var chosen_options = [];
var roboName = "";

$(window).on('load', function(){
    get_attrs();
});


//Create html chat box
function create_chat_box(side, content) {
    box = document.createElement("div");
    text = document.createElement("div");
    text.innerHTML = content;
    // box.className = "box";
    if (side == "left") { //robot side
        box.className = "msg-row msg-left";
        text.className = "msg msg-bounce-in-left";

    } else {
        box.className = "msg-row msg-right";
        text.className = "msg msg-bounce-in-right";

    }
    container.append(box);
    return {
        "box":
        box,
        "text":
        text
    }
}

function add_text(box, text) {
    box.appendChild(text);
}


function create_wait_animation(box) {
    var wait_dots = document.createElement("div");
    wait_dots.className = "msg wait-dots";

    var dots = [];
    for (var i = 0; i < 3; i++) {
        dots[i] = document.createElement("div");
        dots[i].className = "dot";
        wait_dots.appendChild(dots[i]);
    }
    box.appendChild(wait_dots);
}


function remove_wait_animation(box) {

    $(".wait-dots").remove();
}

//Create html element for options
function create_options(content_list) {
    html_str = "<div class='msg-row msg-right'>";
    for (c in content_list) {
        html_str += "<button class='btn btn-primary option' onclick=chose_opt(this)>" + content_list[c] + "</button>";
    }
    container.append(html_str + "</div>");
}

// Response after user chosing an option
function chose_opt(ele) {
    if (ele.innerText == "I'm ready to proceed!") {
      //  document.location.href = 'stage2.html';
        // store the chosen options
        return
    }
    $("#options").remove();
    chosen_options.push(ele.innerText);
    right_chat_box= create_chat_box("right", ele.innerText);
    add_text(right_chat_box.box, right_chat_box.text);

    res = robo_response(ele.innerText);
    left_chat_box= create_chat_box("left", res);
    create_wait_animation(left_chat_box.box);
    simulate_delay(left_chat_box).then(()=>
        user_options(res));
}

async function simulate_delay(box) {
    await timeout(1000);
   remove_wait_animation(box.box);
   add_text(box.box, box.text);
}

function timeout (ms) {
    return new Promise(res => setTimeout(res,ms));
}

// Logic flow
function robo_response(ans) {
    // ans = ans.toLowerCase()
    console.log(ans);
    switch (ans) {
        case "I’m feeling good":
        case "I’m doing okay":
            res = "May I get to know a little more about you?";
            break;
        case "Finish":
            res = "Thank you very much! Now I’ll work out a wealth management plan for you!"
            store_user_input();
            break;
        default:
            res = "Finish?";
            break;
    }
    return res;
}

function user_options(res) {
    // res = res.toLowerCase();
    switch (res) {
        case "May I get to know a little more about you?":
            html_text = "My name is <input id='user_name' type='text'>, ";
            html_text += "I’m <select id='user_gender'><option value='male'>male</option><option value='female'>female</option></select>.";
            html_text += "I’m <select id='marital_status'><option value='married'>married</option><option value='single'>single</option></select>, "
            html_text += "and have <select id='child_num'><option value='0'>0</option><option value='1'>1</option><option value='2'>2</option><option value='more'>More</option></select> children. ";
            html_text += "My annual income is about <input id='annual_income' type='text'>, ";
            html_text += "and my expectation for you is <input id='user_exp' type='text'> (annualized return: 5, 10, 15%)."
            box=create_chat_box("right", html_text);
            add_text(box.box, box.text);
            create_options(["Finish"]);
            break;
        default:
            opt = ["I'm ready to proceed!"];
            create_options(opt);
            break;
    }
    return;
}

function get_attrs() {

    var convStyle = sessionStorage.getItem("convStyle");
    // change the avatar based on requirements
    if (convStyle == 'dominant')
        $("#robo-image").attr("src", "images/avatar/(YH)RoboAdvisor_dominant.gif");
    else if (convStyle == 'submissive')
        $("#robo-image").attr("src", "images/avatar/(YH)RoboAdvisor_submissive.gif");

    response_box = create_chat_box("left", "Hi, my name is " + roboName + " and I help people manage their portfolio. How are you doing today?");
    create_wait_animation(response_box.box);
    simulate_delay(response_box).then(()=>
    create_options(["I’m feeling good", "I’m doing okay"]));
}



function beginTask() 
   {
	document.location.href = 'stage0.html';
	}


function selection1()
{
    var studyDiv = document.getElementById("selectStudy");
    var uaDiv1 = document.getElementById("selectUA1");

    studyDiv.style.display = "none";
    uaDiv1.style.display = "block";

}

function selection2()
{
    var studyDiv = document.getElementById("selectStudy");
    var uaDiv2 = document.getElementById("selectUA2");

    studyDiv.style.display = "none";
    uaDiv2.style.display = "block";

}

function goBack()
{
    var studyDiv = document.getElementById("selectStudy");
    var uaDiv1 = document.getElementById("selectUA1");
    var uaDiv2 = document.getElementById("selectUA2");

    studyDiv.style.display = "block";
    uaDiv1.style.display = "none";
    uaDiv2.style.display = "none";

}

function goNext() {
    document.location.href = './stage1.html';

}