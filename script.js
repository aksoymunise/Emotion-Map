/* globals firebase */

// Get a reference to the database service
var shareddatabase = firebase.database();


var allfeelings = [];


$(document).ready(function() {
  
  
  // try the below with #rotating_img
  
  // and instead of storing "feeling", try storing "imgurl" like:
  // imgurl: $("#rotating_img").attr("src")
  
  
  $("#submit").click(function() {
  
    var thisfeeling = {
      name: $("#nameInput").val(),
      feeling: $("#feelingInput").val(),
      date: Date()
    }
    
    if(!Array.isArray(allfeelings)) {
      allfeelings = [];
    }
    allfeelings.push(thisfeeling)
    
    shareddatabase.ref("mvkc-log-test").set(allfeelings);
  
    
    
  })


  // when the database changes, change the website  
  shareddatabase.ref("mvkc-log-test").on("value", function(snapshot) {
    
    allfeelings = snapshot.val();
    
    $("#log").html("")

    for(let i = 0; i < allfeelings.length; i++) {
      $("#log").append("<div>name: " + allfeelings[i].name + ", feeling: " + allfeelings[i].feeling + ", date:" + allfeelings[i].date + ", </div>")  
      $("#log").append("<img src=" + allfeelings[i].feeling + " />");
    }
    
    
    
  });
  
  
    
  $("#clear").click(function() {
  
    
    shareddatabase.ref("mvkc-log-test").set([]);
    $("#log").html("")
  
    
  })
  

  
});
