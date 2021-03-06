$(document).ready(function () {
  
  // initialize semantic dropdowns
  $('.ui.dropdown').dropdown();
  
  $("#transfer_success_msg").hide();
  $("#transfer_error_msg").hide();
  
  $('#from_account').dropdown('set selected', '800000');
  $('#to_account').dropdown('set selected', '800001');
  
});

var messageDelay = 5000;
var verifyResponse = {};
var script_to_run;


function setVerifyResponse(response) {
  console.log('setVerifyResponse');
  verifyResponse = response;
  
  $("#popup-stepup-iframe").modal("hide");
}

function hideMessages() {
  console.log('hideMessages');
  
  $("#transfer_success_msg").fadeOut();
  $("#transfer_error_msg").fadeOut();
}


function showStepUp(functioncall) {
  console.log("showStepUp");
  console.log(functioncall);
  
  verifyResponse = {};
  
  script_to_run = functioncall;
  console.log(functioncall);
  
  let stepupUrl = $('#stepupUrl').val();
  console.log(stepupUrl);
  
  $('#iframe_stepup').attr('src', stepupUrl); 
  $("#popup-stepup-iframe").modal({ onDeny: functioncall, onHide: functioncall }).modal('show');
}

// function onHide() { 
//   console.log('onHide');
//   denyTransfer();
//   return true;
// }


// function onDeny() { 
//   console.log('onDeny');
//   denyTransfer();
//   return true;
// }

// function completedmfa(test_token) {
//   console.log("completedmfa");
//   console.log(test_token);
  
//   script_to_run(test_token);
//   $("#popup-stepup-iframe").modal("hide");

// }



function validateTransfer() {
  console.log('validateTransfer');
  
  let amount = $('#amount').val();
  console.log(amount);
  
  if (amount < 1000) {
    doTransfer();
  } else {
    console.log('do step up mfa');
    
    showStepUp(runmyscript);
  }
      
}

function doTransfer() {
  console.log('doTransfer');

  let amount = $('#amount').val();
  let msg = "$"+ amount + " transfered to: " + $("#to_account").dropdown('get text');
  $("#transfer_success_msg").fadeIn();
  $("#transfer_success_msg").text(msg);
  
  setTimeout('hideMessages()', messageDelay);
}

function denyTransfer() {
  let msg = 'Unable to validate Step up MFA';
  $("#transfer_error_msg").fadeIn();
  $("#transfer_error_msg").text(msg);

  setTimeout('hideMessages()', messageDelay);
}

function runmyscript() {
  console.log('runmyscript');
  console.log(verifyResponse);
  
  if (verifyResponse.active)
  {
    doTransfer();
  }
  else
  {
    denyTransfer();
  }
  
}