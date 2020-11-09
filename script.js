/* globals firebase */

// Get a reference to the database service
var shareddatabase = firebase.database();


var allfeelings = [];

var allfeelingimages = ["https://cdn.glitch.com/bfd388e2-4a35-4af7-9787-692d8f0c6d72%2Fgradient1.jpg?v=1604886485186",
                       "https://cdn.glitch.com/bfd388e2-4a35-4af7-9787-692d8f0c6d72%2Fgradient2.jpeg?v=1604886485186",
                       "https://cdn.glitch.com/bfd388e2-4a35-4af7-9787-692d8f0c6d72%2Ffield3.jpg?v=1604886486237"]


$(document).ready(function() {
  
  
  // try the below with #rotating_img
  
  // and instead of storing "feeling", try storing "imgurl" like:
  // imgurl: $("#rotating_img").attr("src")
  
  
  $(document).click(function(event) {
    // when we click on the document
  
    //alert("clicked at " + event.pageX + 'px' + "And " + event.pageY + 'px');
    
    var thisfeeling = {
      name: $("#nameInput").val(),
      feeling: $("#feelingInput").val(),
      date: Date(),
      mouseX: event.pageX,
      mouseY: event.pageY
    }
    
    
    
    if(!Array.isArray(allfeelings)) {
      allfeelings = [];
    }
    allfeelings.push(thisfeeling)
    
    shareddatabase.ref("mvkc-log-test").set(allfeelings);
    
    
  })
  /*
  addEventListener('click', createBox);

function createBox(event) {
  var box = document.createElement('div');
  box.className = 'box';
  box.style.left = event.pageX + 'px';
  box.style.top = event.pageY + 'px';
  document.body.appendChild(box);
}
*/

  // when the database changes, change the website  
  shareddatabase.ref("mvkc-log-test").on("value", function(snapshot) {
    
    allfeelings = snapshot.val();
    
    $("#log").html("")
    $("#mouseboxes").html("")

    for(let i = 0; i < allfeelings.length; i++) {
      $("#log").append("<div>name: " + allfeelings[i].name + ", feeling: " + allfeelings[i].feeling + ", date:" + allfeelings[i].date + ", </div>")  
        $("#log").append("<div>mouseX: " + allfeelings[i].mouseX + ", mouseY: " + allfeelings[i].mouseY + ", </div>")  

      $("#log").append("<img src=" + allfeelings[i].feeling + " />");
      
      
      // generate box on mouse
      var box = $("<div class=mousebox></div>");
      box.text(allfeelings[i].name + " is feeling " + allfeelings[i].feeling )
      box.css("top", allfeelings[i].mouseY + "px")
      box.css("left", allfeelings[i].mouseX + "px")
      var randomColor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")"
      
      // generate image and put inside of mouse
      var boximg = $("<img class=boximage>");
      boximg.attr("src", allfeelingimages[allfeelings[i].feeling])
      
      box.append(boximg)
      
      box.css("background-color", allfeelings[i].feeling)
      $("#mouseboxes").append(box);
    }
    
    
    
  });
  
  
    
  $("#clear").click(function() {
  
    
    shareddatabase.ref("mvkc-log-test").set([]);
    $("#log").html("")
  
    
  })
  

  
});

$("#rotating_img").mousemove(function(event) {

    var perc = event.clientX / $(this).height();
    
    console.log("clientX = " + event.clientX)
    
    
    var speed = (perc * 4) + "s"
    
    
    $( "#rotating_img" ).css( "animation-duration", speed);


  });
  
  

  $(document).mousemove(function(event) {

    //let's define "percY" as the percentage of the mouse's Y position relative to the screen 
    // if percY is 0, mouse is on top of screen; if percY is 1, mouse is on the bottom.
    var percY = event.clientY / $(this).height();
    var percX = event.clientX / $(this).width();
    
    
    console.log(percY);
    
    if(percY > 0.75) {
      $("#rotating_img").attr("src", "https://cdn.glitch.com/6b18477b-4556-494b-82d5-5e09a958dae3%2F7b4c683c-8556-4377-88f7-27a32769dc4f_DamienHirst.png?v=1603798212796");
    }
    
     if(percY < 0.75 && percY > 0.5) {
      $("#rotating_img").attr("src", "https://cdn.glitch.com/6b18477b-4556-494b-82d5-5e09a958dae3%2F7b4c683c-8556-4377-88f7-27a32769dc4f_DHS674_771_0.jpg?v=1603798212980");
    }
    
     if(percY < 0.5 && percY > 0.25) {
      $("#rotating_img").attr("src", "https://cdn.glitch.com/7b4c683c-8556-4377-88f7-27a32769dc4f%2Fimage%201.jpg?v=1603725193856");
    }
    
    if(percY < 0.25) {
      $("#rotating_img").attr("src", "https://cdn.glitch.com/6b18477b-4556-494b-82d5-5e09a958dae3%2F7b4c683c-8556-4377-88f7-27a32769dc4f_DHS4777_771_0.jpg?v=1603798212278");
    }
    

    });



/*

what we want:
we click on the wheel, we get a box, it records the box to the database
when the databse changes, it redraws the box


1. we click on the wheel: we record some data to the database, 
including the location of the click

2. when the database changes, we make boxes from it
(the location of the lcick)

*/