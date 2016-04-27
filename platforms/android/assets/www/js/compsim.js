//VARIABLES
canvas=document.getElementById("gamebox");
context=canvas.getContext("2d");
context.fillStyle="#F58C5E";
context.fillRect(0, 0, 1905, 985);
canvas.addEventListener("touchstart", getPosition, false);
canvas.addEventListener("touchmove", getTouchMove, false);

var canvasswitch = true;
var assignment = 0;
var title, description, design, coding, testing, documentation;
var xmlDoc;
var slider_x = 1300;
var slider_max = 1560;
var slider_min = 1040;
var game;
var debug;
var sliding = false;
var touches = [];

//IMAGES
var menu_img=new Image(); //Menu background
menu_img.src="img/menu.png";
var slider_img=new Image();
slider_img.src="img/slider.png"

//BOOLEAN VARIABLES TO CONTROL ASPECTS OF GAME
var gameover=true;
var menuview=true;
var gameplay = false;

//Handle touch input
function getPosition(event)
{
  var touch_x = event.targetTouches[0].pageX;
  var touch_y = event.targetTouches[0].pageY;


  //touch_x -= canvas.offsetLeft;
  //touch_y -= canvas.offsetTop;

  //slider_bound = slider_x + 20;
  //If in menu, check clicked buttons
  if(menuview==true){
    if(touch_x>1274 && touch_x<1674 && touch_y>500 && touch_y<600){
      //game = setInterval(draw_everything, 50);
      start();

    }
  }
  else if(gameplay==true){
    if(touch_x>1000 && touch_x<1600 && touch_y>500 && touch_y<600){
      if(assignment==7){
        clearInterval(game);
        menu();
      }
      else{
        start();
      }
    }
  }

}

function getTouchMove(event){
  //var touch_x = event.targetTouches[0].pageX;
  //var touch_y = event.targetTouches[0].pageY;
  event.preventDefault();
  touches = event.touches;
  var touch_to_get = touches.length - 1;
  var touch_x = event.targetTouches[touch_to_get].pageX;
  var touch_y = event.targetTouches[touch_to_get].pageY;

  var input_x = touch_x - 40;
  var input_x2 = touch_x + 10;
  var slider_upper_bound = slider_x + 40;
  var slider_lower_bound = slider_x - 40;
  if(gameplay==true){
    if(touch_x>= slider_lower_bound && touch_x<=slider_upper_bound && touch_y>=700 && touch_y<=850 && touch_x>=slider_min && touch_x<=slider_max){
        //slider_x = input_x;
        slider_x = touch_x;
    }
  }
}


//GAME MENU
function menu(){
  gameover = false;
  menuview=true;
  gameplay=false;
  assignment=0;

  //make sure canvas is clear - if returning to menu
  canvas.width=canvas.width;

  //Background
  context.fillStyle="#F58C5E";
  context.fillRect(0, 0, 1905, 985);
  context.drawImage(menu_img,100,0);

  //start button
  var button_x=1274;
  var button_y=500;
  context.fillStyle="#97DBF0";
  context.fillRect(button_x, button_y, 400, 100);
  context.fillStyle="#2F2F30";
  var button_text="Start Game";
  context.font="bold 70px Arial";
  context.fillText(button_text, 1294, 585);

}

function start(){
  //clearInterval(game);

  assignment = assignment + 1;
  if(assignment == 8){
    menu();
  }
  //Change game mode
  gameover = false;
  menuview=false;
  gameplay=true;

  //canvas.width=canvas.width;

  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "xml/assignments.xml", false);
  xhttp.send("");

  var x, y;
  xmlDoc = xhttp.responseXML;

  if(xhttp.readyState == 4){
    x = xmlDoc.getElementsByTagName("assignment");
    var node_to_get = assignment - 1;
    y = x[node_to_get];

    if(y.childNodes[1].firstChild.nodeValue != 3){
      title = y.childNodes[3].firstChild.nodeValue;
      description = y.childNodes[5].firstChild.nodeValue;
      design = y.childNodes[7].firstChild.nodeValue;
      coding = y.childNodes[9].firstChild.nodeValue;
      testing = y.childNodes[11].firstChild.nodeValue;
      documentation = y.childNodes[13].firstChild.nodeValue;
    }
    else{
      title = y.childNodes[3].firstChild.nodeValue;
      description = y.childNodes[5].firstChild.nodeValue;
    }
  }
  //draw_everything();
  game = setInterval(draw_everything, 15);
}

function draw_everything(){
  canvas.width=canvas.width;

  //background
  context.fillStyle="#FCAEC7";
  context.fillRect(0, 0, 1905, 985);

  //slider
  context.fillStyle="#97DBF0";
  context.fillRect(1000, 772, 600, 6);
  context.drawImage(slider_img, (slider_x - 40),700);

  var slider_text;
  context.fillStyle="#2F2F30";
  context.font="bold 30px Arial";
  var slider_percent = ((slider_x - slider_min)/520)*100;

  slider_text="Slider Input: "+parseInt(slider_percent)+"%";
  context.fillText(slider_text, 1000, 900);


  //button
  var button_x=1000;
  var button_y=500;
  context.fillStyle="#97DBF0";
  context.fillRect(button_x, button_y, 600, 100);

  if(assignment==7){
    var button_text="Return to Menu";
  }
  else{
    var button_text="Next Assignment";
  }
  context.fillStyle="#2F2F30";
  context.font="bold 70px Arial";
  context.fillText(button_text, 1020, 585);

  //assignment info
  context.font="bold 30px Arial";
  var fill_text="assignment num: "+assignment;
  context.fillText(fill_text, 200, 330);

  fill_text="Title: "+title;
  context.fillText(fill_text, 200, 400);

  fill_text="Description: "+description;
  context.fillText(fill_text, 200, 470);

  if(assignment != 3){
    fill_text="Design Level: "+design;
    context.fillText(fill_text, 200, 540);

    fill_text="Coding Level: "+coding;
    context.fillText(fill_text, 200, 610);

    fill_text="Testing Level: "+testing;
    context.fillText(fill_text, 200, 680);

    fill_text="Documentation Level: "+documentation;
    context.fillText(fill_text, 200, 750);
  }


}

function draw_sliders(){
  context.fillStyle="#97DBF0";
  context.fillRect(1000, 725, 600, 5);
  context.drawImage(slider_img, (slider_x - 40),700);
}
