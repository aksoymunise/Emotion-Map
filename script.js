/* globals firebase */

// Get a reference to the database service
var shareddatabase = firebase.database();


var allfeelings = [];


$(document).ready(function() {
  
  
  
  $("#submit").click(function() {
  
    var thisfeeling = {
      name: $("#nameInput").val(),
      feeling: $("#feelingInput").val(),
      date: Date()
    }
    
    allfeelings.push(thisfeeling)
    
    shareddatabase.ref("mvkc-log-test").set(allfeelings);
  
    
    
  })


  // when the database changes, change the website  
  shareddatabase.ref("mvkc-log-test").on("value", function(snapshot) {
    
    allfeelings = snapshot.val();
    
    console.log(allfeelings);
    
  });
  
  

  
});
