$(".taskName").text(sessionStorage.getItem("taskName"));

switch (sessionStorage.getItem("agentGender")){
    case 'N': $("#agentName").text("Zan"); break;
    case 'M': $("#agentName").text('Michael');break;
    case 'W': $("#agentName").text('Michelle');break;
}
