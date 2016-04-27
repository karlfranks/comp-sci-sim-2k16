//VARIABLES
canvas=document.getElementById("gamebox");
context=canvas.getContext("2d");
context.fillStyle="#F58C5E";
context.fillRect(0, 0, 1905, 985);
canvas.addEventListener("touchstart", getPosition, false);
canvas.addEventListener("touchmove", getTouchMove, false);

//var canvasswitch = true;
var assignment = 0;
var title, description, design, coding, testing, documentation;
var xmlDoc;
var game;
var debug;
var touches = [];

//SLIDER VARIABLES
var design_slider_x = 1300;
var coding_slider_x = 1300;
var testing_slider_x = 1300;
var documentation_slider_x = 1300;
var slider_max = 1560;
var slider_min = 1040;
var design_slider_percent;
var coding_slider_percent;
var testing_slider_percent;
var documentation_slider_percent;

//IMAGES
var menu_img=new Image(); //Menu background
menu_img.src="img/menu.png";
var slider_img=new Image();
slider_img.src="img/slider.png"

//BOOLEAN VARIABLES TO CONTROL ASPECTS OF GAME
//var gameover = true;
//var menuview = true;
//var gameplay = false;
var gameover;
var menuview;
var gameplay;


//Handle touch input
function getPosition(event){
  var touch_x = event.targetTouches[0].pageX;
  var touch_y = event.targetTouches[0].pageY;

  //If in menu, check clicked buttons
  if(menuview == true && gameplay == false){
    if(touch_x>1274 && touch_x<1674 && touch_y>500 && touch_y<600){

      assignments_screen();

    }
  }
  else if(gameplay == true && menuview == false){
    if(touch_x>50 && touch_x<650 && touch_y>850 && touch_y<950){
      if(assignment>=7){
        clearInterval(game);
        menu();
      }
      else{
        assignments_screen();
      }
    }
  }

}

function getTouchMove(event){
  event.preventDefault();
  touches = event.touches;
  var touch_to_get = touches.length - 1;
  var touch_x = event.targetTouches[touch_to_get].pageX;
  var touch_y = event.targetTouches[touch_to_get].pageY;

  //var slider_upper_bound = slider_x + 40;
  //var slider_lower_bound = slider_x - 40;

  var design_ub = design_slider_x + 40;
  var design_lb = design_slider_x - 40;
  var coding_ub = coding_slider_x + 40;
  var coding_lb = coding_slider_x - 40;
  var testing_ub = testing_slider_x + 40;
  var testing_lb = testing_slider_x - 40;
  var documentation_ub = documentation_slider_x + 40;
  var documentation_lb = documentation_slider_x - 40;

  if(gameplay == true){
    if(touch_x>=design_lb && touch_x<=design_ub && touch_y>=80 && touch_y<=230 && touch_x>=slider_min && touch_x<=slider_max){
        design_slider_x = touch_x;
    }
    else if(touch_x>=coding_lb && touch_x<=coding_ub && touch_y>=280 && touch_y<=430 && touch_x>=slider_min && touch_x<=slider_max){
        coding_slider_x = touch_x;
    }
    else if(touch_x>=testing_lb && touch_x<=testing_ub && touch_y>=480 && touch_y<=630 && touch_x>=slider_min && touch_x<=slider_max){
        testing_slider_x = touch_x;
    }
    else if(touch_x>=documentation_lb && touch_x<=documentation_ub && touch_y>=680 && touch_y<=830 && touch_x>=slider_min && touch_x<=slider_max){
        documentation_slider_x = touch_x;
    }
  }
}


//GAME MENU
function menu(){
  clearInterval(game);
  //console.log(game);
  gameover = true;
  menuview = true;
  gameplay = false;

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

function assignments_screen(){

  assignment = assignment + 1;
  if(assignment == 8){
    menu();
  }

  //Change game mode
  gameover = false;
  menuview = false;
  gameplay = true;

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

  clearInterval(game);
  game = setInterval(draw_assignments_screen, 30);
}

function draw_assignments_screen(){
  canvas.width=canvas.width;

  //background
  context.fillStyle="#FCAEC7";
  context.fillRect(0, 0, 1905, 985);

  //sliders
  context.fillStyle="#2F2F30";
  context.font="bold 30px Arial";
  var fill_text="ATTRIBUTES";
  context.fillText(fill_text, 1200, 30);

  var slider_text;

  //Design Slider
  context.fillStyle="#97DBF0";
  context.fillRect(1000, 152, 600, 6);
  context.drawImage(slider_img, (design_slider_x - 40),80);
  context.fillStyle="#2F2F30";
  context.font="bold 30px Arial";
  design_slider_percent = ((design_slider_x - slider_min)/520)*100;
  slider_text="Design: "+parseInt(design_slider_percent)+"%";
  context.fillText(slider_text, 1230, 70);

  //Coding Slider
  context.fillStyle="#97DBF0";
  context.fillRect(1000, 352, 600, 6);
  context.drawImage(slider_img, (coding_slider_x - 40),280);
  context.fillStyle="#2F2F30";
  context.font="bold 30px Arial";
  coding_slider_percent = ((coding_slider_x - slider_min)/520)*100;
  slider_text="Coding: "+parseInt(coding_slider_percent)+"%";
  context.fillText(slider_text, 1230, 270);

  //Testing Slider
  context.fillStyle="#97DBF0";
  context.fillRect(1000, 552, 600, 6);
  context.drawImage(slider_img, (testing_slider_x - 40),480);
  context.fillStyle="#2F2F30";
  context.font="bold 30px Arial";
  testing_slider_percent = ((testing_slider_x - slider_min)/520)*100;
  slider_text="Testing: "+parseInt(testing_slider_percent)+"%";
  context.fillText(slider_text, 1230, 470);

  //Documentation Slider
  context.fillStyle="#97DBF0";
  context.fillRect(1000, 752, 600, 6);
  context.drawImage(slider_img, (documentation_slider_x - 40),680);
  context.fillStyle="#2F2F30";
  context.font="bold 30px Arial";
  documentation_slider_percent = ((documentation_slider_x - slider_min)/520)*100;
  slider_text="Documantation: "+parseInt(documentation_slider_percent)+"%";
  context.fillText(slider_text, 1230, 670);


  //button
  var button_x=50;
  var button_y=850;
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
  context.fillText(button_text, 70, 935);

  //assignment info
  context.font="bold 30px Arial";
  //var fill_text="assignment num: "+assignment;
  //context.fillText(fill_text, 200, 330);
  fill_text="YOUR ASSIGNMENT";
  context.fillText(fill_text, 100, 130);

  fill_text="Title: "+title;
  context.fillText(fill_text, 100, 200);

  fill_text="Description: "+description;
  context.fillText(fill_text, 100, 270);

  // if(assignment != 3){
  //   fill_text="Design Level: "+design;
  //   context.fillText(fill_text, 200, 540);
  //
  //   fill_text="Coding Level: "+coding;
  //   context.fillText(fill_text, 200, 610);
  //
  //   fill_text="Testing Level: "+testing;
  //   context.fillText(fill_text, 200, 680);
  //
  //   fill_text="Documentation Level: "+documentation;
  //   context.fillText(fill_text, 200, 750);
  // }

}

function draw_sliders(){
  context.fillStyle="#97DBF0";
  context.fillRect(1000, 725, 600, 5);
  context.drawImage(slider_img, (slider_x - 40),700);
}
