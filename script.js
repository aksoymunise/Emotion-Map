/* globals firebase */

// Get a reference to the database service
var shareddatabase = firebase.database();

var allfeelings = [];

var allfeelingimages = [
  "https://cdn.glitch.com/d514bf9a-69df-4e74-bbe8-1a83911fde49%2F3.png?v=1604978114655:",
  "https://cdn.glitch.com/4c4322da-d1eb-44af-bccc-74ec3fff9354%2F01.png?v=1608087631331",
  "https://cdn.glitch.com/4c4322da-d1eb-44af-bccc-74ec3fff9354%2F02.png?v=1608087634959",
  "https://cdn.glitch.com/4c4322da-d1eb-44af-bccc-74ec3fff9354%2F03.png?v=1608087637126",
  "https://cdn.glitch.com/4c4322da-d1eb-44af-bccc-74ec3fff9354%2F04.png?v=1608087639615",
  "https://cdn.glitch.com/4c4322da-d1eb-44af-bccc-74ec3fff9354%2F05.png?v=1608087645714",
  "https://cdn.glitch.com/4c4322da-d1eb-44af-bccc-74ec3fff9354%2F06.png?v=1608087647975",
  "https://cdn.glitch.com/4c4322da-d1eb-44af-bccc-74ec3fff9354%2F07.png?v=1608087649952",
  "https://cdn.glitch.com/4c4322da-d1eb-44af-bccc-74ec3fff9354%2F08.png?v=1608087651544",
  "https://cdn.glitch.com/4c4322da-d1eb-44af-bccc-74ec3fff9354%2F09.png?v=1608087653671",
  "https://cdn.glitch.com/4c4322da-d1eb-44af-bccc-74ec3fff9354%2F10.png?v=1608087655596"
];

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
    };

    if (!Array.isArray(allfeelings)) {
      allfeelings = [];
    }
    allfeelings.push(thisfeeling);

    shareddatabase.ref("mvkc-log-test").set(allfeelings);
  });
  

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

    $("#log").html("");
    $("#mouseboxes").html("");

    for (let i = 0; i < allfeelings.length; i++) {
      $("#log").append(
        "<div>name: " +
          allfeelings[i].name +
          ", feeling: " +
          allfeelings[i].feeling +
          ", date:" +
          allfeelings[i].date +
          ", </div>"
      );
      $("#log").append(
        "<div>mouseX: " +
          allfeelings[i].mouseX +
          ", mouseY: " +
          allfeelings[i].mouseY +
          ", </div>"
      );

      $("#log").append("<img src=" + allfeelings[i].feeling + " />");

      // generate box on mouse
      var box = $("<div class=mousebox></div>");
      box.text(allfeelings[i].name + "");
      box.css("top", allfeelings[i].mouseY + "px");
      box.css("left", allfeelings[i].mouseX + "px");
  
      var randomColor =
        "rgb(" +
        Math.random() * 255 +
        "," +
        Math.random() * 255 +
        "," +
        Math.random() * 255 +
        ")";

      // generate image and put inside of mouse
      var boximg = $("<img class=boximage>");
      boximg.attr("src", allfeelingimages[allfeelings[i].feeling]);
      
      box.append(boximg);

      // box.css("background-color", randomColor)

      box.css("background-color", allfeelings[i].feeling);
      $("#mouseboxes").append(box);
    }
  });

  $("#clear").click(function() {
    shareddatabase.ref("mvkc-log-test").set([]);
    $("#log").html("");
  });
  
  $("#updateImage").click(function() {
    alert("update image!")
    
    var imageurl = $("#ImageInput").val();
    
    // change background using the imageurl
    
    $("#rotating_img").attr("src", imageurl);
    
    
    shareddatabase.ref("emoji-deskcrits-background").set({
      name: $("#ImageInput").val()
    });                       
                            
                            
  
    
    
  });
  
  

   
  shareddatabase.ref("emoji-deskcrits-background").on("value", function(snapshot) {
    var data = snapshot.val();
    var imageurl = data.name;
    $("#rotating_img").attr("src", imageurl);

  });
                          
                          
});







$("#rotating_img").mousemove(function(event) {
  var perc = event.clientX / $(this).height();

  console.log("clientX = " + event.clientX);

  var speed = perc * 4 + "s";

  $("#rotating_img").css("animation-duration", speed);
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
