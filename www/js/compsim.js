//VARIABLES
canvas=document.getElementById("gamebox");
context=canvas.getContext("2d");
context.fillStyle="#F58C5E";
context.fillRect(0, 0, 1905, 985);
canvas.addEventListener("touchstart", getPosition, false);
canvas.addEventListener("touchmove", getTouchMove, false);

//var canvasswitch = true;
var assignment = 0;
var title, design, coding, testing, documentation;
var description_1, description_2, description_3, description_4, description_5;
var xmlDoc;


var touches = [];
var scores = [];
var assignment_names = [];
var music = true;
var sounds = true;
var pause = false;


var design_points = 0;
var coding_points = 0;
var testing_points = 0;
var documentation_points = 0;

var design_score;
var coding_score;
var testing_score;
var documentation_score;
var grade;
var total_score;

//TIMERS
var timer;
var game_timer; //interval for game timer
var game;
var assignment_menu_animation; //interval for assignment input animation
var game_animation; //interval for game animation
var design_timer;
var coding_timer;
var testing_timer;
var documentation_timer;
var player_timer = 0;
var menu_timer;

//SLIDER VARIABLES
var design_slider_x = 1200;
var coding_slider_x = 1200;
var testing_slider_x = 1200;
var documentation_slider_x = 1200;
var slider_max = 1720;
var slider_min = 1200;
var design_slider_percent;
var coding_slider_percent;
var testing_slider_percent;
var documentation_slider_percent;
var points_left = 250;
var blink = true;

//IMAGES
var menu_img=new Image(); //Menu background
menu_img.src="img/menu.png";
var slider_img=new Image();
slider_img.src="img/slider.png";
var music_on=new Image();
music_on.src="img/music.png";
var music_off=new Image();
music_off.src="img/music_off.png";
var sound_on=new Image();
sound_on.src="img/sound_on.png";
var sound_off=new Image();
sound_off.src="img/sound_off.png";
var pause_img=new Image();
pause_img.src="img/pause.png";
var play_img=new Image();
play_img.src="img/play.png";
var exit_img=new Image();
exit_img.src="img/exit.png";
var frame_1=new Image();
frame_1.src="img/frame1.gif";
var frame_2=new Image();
frame_2.src="img/frame2.gif";
var frame_3=new Image();
frame_3.src="img/frame3.gif";

//BOOLEAN VARIABLES TO CONTROL ASPECTS OF GAME
var gameover;
var menuview;
var gameplay;
var assignment_menu;
var score_screen;
var game_complete_screen;
var game_over_screen;
var confirm_exit = false;


//Handle touch input
function getPosition(event){
  var touch_x = event.targetTouches[0].pageX;
  var touch_y = event.targetTouches[0].pageY;

  //If in menu, check clicked buttons
  if(menuview == true){
    if(touch_x>600 && touch_x<1300 && touch_y>500 && touch_y<620){
      clearInterval(menu_timer);
      assignments_screen();
    }
  }
  else if(assignment_menu == true){
    if(touch_x>1100 && touch_x<1700 && touch_y>850 && touch_y<950){
      clearInterval(assignment_menu_animation);
      assignment_run();
    }
    else if(touch_x>50 && touch_x<650 && touch_y>850 && touch_y<950){
      clearInterval(assignment_menu_animation);
      menu();
    }
  }
  else if(gameplay == true){
    if(touch_x>1550 && touch_x<1600 && touch_y>900 && touch_y<950){
      confirm_exit = true;
      clearInterval(game_animation);
      // clearInterval(game_timer);
      // clearInterval(design_timer);
      // clearInterval(coding_timer);
      // clearInterval(testing_timer);
      // clearInterval(documentation_timer);
      //menu();
    }
    else if(touch_x>1630 && touch_x<1680 && touch_y>900 && touch_y<950){
      if(pause==true){
        game_timer = setInterval(assignment_timer, 100);

        var random = (Math.floor((Math.random() * 4) + 1))*5000;
        design_timer = setInterval(design_points_timer, random);

        random = (Math.floor((Math.random() * 4) + 1))*500;
        coding_timer = setInterval(coding_points_timer, random);

        random = (Math.floor((Math.random() * 4) + 1))*500;
        testing_timer = setInterval(testing_points_timer, random);

        random = (Math.floor((Math.random() * 4) + 1))*500;
        documentation_timer = setInterval(documentation_points_timer, random);

        pause = false;
      }
      else{
        clearInterval(game_timer);
        clearInterval(design_timer);
        clearInterval(coding_timer);
        clearInterval(testing_timer);
        clearInterval(documentation_timer);
        pause = true;
      }
    }
    else if(touch_x>1710 && touch_x<1760 && touch_y>900 && touch_y<950){
      if(music==true){
        music = false;
      }
      else{
        music = true;
      }
    }
    else if(touch_x>1780 && touch_x<1830 && touch_y>900 && touch_y<950){
      if(sounds==true){
        sounds = false;
      }
      else{
        sounds = true;
      }
    }

  }
  else if(score_screen==true){
    //assignments_screen();
    if(touch_x>600 && touch_x<1300 && touch_y>500 && touch_y<620){
      assignments_screen();
    }
  }
  else if(game_complete_screen==true){
    menu();
  }
  else if(game_over_screen==true){
    menu();
  }

}



function getTouchMove(event){
  event.preventDefault();
  touches = event.touches;
  var touch_to_get = touches.length - 1;

  var touch_x = event.targetTouches[touch_to_get].pageX;
  var touch_y = event.targetTouches[touch_to_get].pageY;

  var design_ub = design_slider_x + 40;
  var design_lb = design_slider_x - 40;
  var coding_ub = coding_slider_x + 40;
  var coding_lb = coding_slider_x - 40;
  var testing_ub = testing_slider_x + 40;
  var testing_lb = testing_slider_x - 40;
  var documentation_ub = documentation_slider_x + 40;
  var documentation_lb = documentation_slider_x - 40;

  var valid_slide;

  if(assignment_menu == true){
    if(touch_x>=design_lb && touch_x<=design_ub && touch_y>=80 && touch_y<=230 && touch_x>=slider_min && touch_x<=slider_max){
        var temp = design_slider_x;
        design_slider_x = touch_x;
        valid_slide = checkValidSlide();
        if(valid_slide==false){
          design_slider_x = temp;
        }
    }
    else if(touch_x>=coding_lb && touch_x<=coding_ub && touch_y>=280 && touch_y<=430 && touch_x>=slider_min && touch_x<=slider_max){
        var temp = coding_slider_x;
        coding_slider_x = touch_x;
        valid_slide = checkValidSlide();
        if(valid_slide==false){
          coding_slider_x = temp;
        }
    }
    else if(touch_x>=testing_lb && touch_x<=testing_ub && touch_y>=480 && touch_y<=630 && touch_x>=slider_min && touch_x<=slider_max){
        var temp = testing_slider_x;
        testing_slider_x = touch_x;
        valid_slide = checkValidSlide();
        if(valid_slide==false){
          testing_slider_x = temp;
        }
    }
    else if(touch_x>=documentation_lb && touch_x<=documentation_ub && touch_y>=680 && touch_y<=830 && touch_x>=slider_min && touch_x<=slider_max){
        var temp = documentation_slider_x;
        documentation_slider_x = touch_x;
        valid_slide = checkValidSlide();
        if(valid_slide==false){
          documentation_slider_x = temp;
        }
    }
  }
}

function checkValidSlide(){
  var max = 250;
  design_slider_percent = ((design_slider_x - slider_min)/520)*100;
  coding_slider_percent = ((coding_slider_x - slider_min)/520)*100;
  testing_slider_percent = ((testing_slider_x - slider_min)/520)*100;
  documentation_slider_percent = ((documentation_slider_x - slider_min)/520)*100;

  var total = parseInt(design_slider_percent) + parseInt(coding_slider_percent) + parseInt(testing_slider_percent) + parseInt(documentation_slider_percent);

  if(total <= max){
    points_left = max - total;
    return true;

  }
  else{
    return false;
  }
}

//GAME MENU
function menu(){
  //gameover = true;
  menuview = true;
  gameplay = false;
  assignment_menu = false;
  score_screen = false;
  game_complete_screen = false;
  game_over_screen = false;

  assignment=0;

  //make sure canvas is clear - if returning to menu
  canvas.width=canvas.width;

  //Background
  context.fillStyle="#404040";
  context.fillRect(0, 0, 1905, 985);
  //context.drawImage(menu_img,100,0);

  context.fillStyle="#0EE81C";
  var menu_text=":/COMP SCI SIMULATOR 2016";
  context.font="bold italic 120px Arial";
  context.fillText(menu_text, 150, 200);

  if(blink==true){
    context.fillStyle="#0EE81C";
    context.fillRect(1710, 90, 50, 110);
    blink=false;
  }
  else{
    blink = true;
  }

  //start button
  var button_x=600;
  var button_y=500;
  context.fillStyle="#346938";
  context.fillRect(button_x, button_y, 700, 120);
  context.fillStyle="#0EE81C";
  var button_text="START GAME";
  context.font="bold 100px Arial";
  context.fillText(button_text, 640, 600);

  clearInterval(menu_timer);
  menu_timer = setInterval(menu, 500);
}

//ASSIGNMENT SCREEN
function assignments_screen(){

  assignment = assignment + 1;
  if(assignment == 8){
    menu();
  }

  //Change game mode
  //gameover = false;
  menuview = false;
  gameplay = false;
  assignment_menu = true;
  score_screen = false;

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
      description_1 = y.childNodes[5].firstChild.nodeValue;
      description_2 = y.childNodes[7].firstChild.nodeValue;
      description_3 = y.childNodes[9].firstChild.nodeValue;
      description_4 = y.childNodes[11].firstChild.nodeValue;
      description_5 = y.childNodes[13].firstChild.nodeValue;

      design = y.childNodes[15].firstChild.nodeValue;
      coding = y.childNodes[17].firstChild.nodeValue;
      testing = y.childNodes[19].firstChild.nodeValue;
      documentation = y.childNodes[21].firstChild.nodeValue;
    }
    else{
      title = y.childNodes[3].firstChild.nodeValue;
      description_1 = y.childNodes[5].firstChild.nodeValue;
      description_2 = y.childNodes[7].firstChild.nodeValue;
      description_3 = y.childNodes[9].firstChild.nodeValue;
      description_4 = y.childNodes[11].firstChild.nodeValue;
      description_5 = y.childNodes[13].firstChild.nodeValue;
    }
  }

  assignment_names[(assignment - 1)] = title;

  // design_slider_percent = 0;
  // coding_slider_percent = 0;
  // testing_slider_percent = 0;
  // documentation_slider_percent = 0;

  design_slider_x = 1200;
  coding_slider_x = 1200;
  testing_slider_x = 1200;
  documentation_slider_x = 1200;

  clearInterval(assignment_menu_animation);
  assignment_menu_animation = setInterval(draw_assignments_screen, 30);
}


//ASSIGNMENT RUNNING
function assignment_run(){
  timer = 300;

  //Change game mode
  //gameover = false;
  menuview = false;
  gameplay = true;
  assignment_menu = false;
  pause = false;

  design_points = 0;
  coding_points = 0;
  testing_points = 0;
  documentation_points = 0;

  clearInterval(game_animation);
  game_animation = setInterval(draw_game_screen, 30);

  clearInterval(game_timer);
  game_timer = setInterval(assignment_timer, 100);

  clearInterval(design_timer);
  var random = (Math.floor((Math.random() * 4) + 1))*500;
  design_timer = setInterval(design_points_timer, random);

  clearInterval(coding_timer);
  random = (Math.floor((Math.random() * 4) + 1))*500;
  coding_timer = setInterval(coding_points_timer, random);

  clearInterval(testing_timer);
  random = (Math.floor((Math.random() * 4) + 1))*500;
  testing_timer = setInterval(testing_points_timer, random);

  clearInterval(documentation_timer);
  random = (Math.floor((Math.random() * 4) + 1))*500;
  documentation_timer = setInterval(documentation_points_timer, random);
}

function assignment_timer(){
  timer = timer - 1;

  if(timer==0){
    clearInterval(game_animation);
    clearInterval(game_timer);
    clearInterval(design_timer);
    clearInterval(coding_timer);
    clearInterval(testing_timer);
    clearInterval(documentation_timer);
    calculate_score();


    if(assignment==2){
      var first = scores[0];
      var second = scores[1];

      if(first<40 && second<40){
        gameover = true;
      }
    }
    else if(assignment==5){
      var first = scores[2];
      var second = scores[3];
      var third = scores[4];

      if(first<40 && second<40 && third<40){
        gameover = true;
      }
    }
    else if(assignment==7){
      var scores_length = scores.length - 1;
      var temp_array = [];
      for (i = 2; i < scores_length; i++) {
          var j = temp_array.length;
          temp_array[j] = scores[i];
      }

      if(temp_array.length > 2){
        gameover=true;
      }

    }

    if(assignment==7 && gameover==false){
      //display game complete
      game_complete();
    }
    else if(gameover==true){
      game_over();
    }
    else{
      display_scores();
    }
  }

  if(player_timer == 3){
    player_timer = 0;
  }
  player_timer = player_timer + 1;

}

function design_points_timer(){
  var random = Math.floor((Math.random() * 100) + 1);

  var design_percent = (design_slider_percent / 250) * 100;

  if (design_percent >= random){
    design_points = design_points + 1;
  }

  clearInterval(design_timer);
  var random = (Math.floor((Math.random() * 4) + 1))*500;
  design_timer = setInterval(design_points_timer, random);
}

function coding_points_timer(){
  var random = Math.floor((Math.random() * 100) + 1);

  var coding_percent = (coding_slider_percent / 250) * 100;

  if (coding_percent >= random){
    coding_points = coding_points + 1;
  }

  clearInterval(coding_timer);
  var random = (Math.floor((Math.random() * 4) + 1))*500;
  coding_timer = setInterval(coding_points_timer, random);
}

function testing_points_timer(){
  var random = Math.floor((Math.random() * 100) + 1);

  var testing_percent = (testing_slider_percent / 250) * 100;

  if (testing_percent >= random){
    testing_points = testing_points + 1;
  }

  clearInterval(testing_timer);
  var random = (Math.floor((Math.random() * 4) + 1))*500;
  testing_timer = setInterval(testing_points_timer, random);
}

function documentation_points_timer(){
  var random = Math.floor((Math.random() * 100) + 1);

  var documentation_percent = (documentation_slider_percent / 250) * 100;

  if (documentation_percent >= random){
    documentation_points = documentation_points + 1;
  }

  clearInterval(documentation_timer);
  var random = (Math.floor((Math.random() * 4) + 1))*500;
  documentation_timer = setInterval(documentation_points_timer, random);
}

function display_scores(){
  //gameover = false;
  // menuview = false;
  // gameplay = false;
  // assignment_menu = false;
  // pause = false;
  score_screen = true;

  context.globalAlpha=0.5;
  context.fillStyle="#575959";
  context.fillRect(0, 0, 1905, 985);
  context.globalAlpha=1;
  context.fillStyle="#E2FFCF";
  context.fillRect(400, 200, 1105, 585);

  context.fillStyle="#2F2F30";
  context.font="bold 70px Arial";

  fill_text="Score: "+total_score;
  context.fillText(fill_text, 800, 380);
  fill_text="Grade: "+grade;
  context.fillText(fill_text, 800, 460);

  context.fillStyle="#97DBF0";
  context.fillRect(600, 500, 700, 120);
  //context.fillStyle="#0EE81C";
  context.fillStyle="#2F2F30";
  var button_text="NEXT ASSIGNMENT";
  context.font="bold 70px Arial";
  context.fillText(button_text, 640, 600);

}

function game_over(){
  //gameover = false;
  //menuview = false;
  gameplay = false;
  //assignment_menu = false;
  //pause = false;
  //score_screen = false;
  game_over_screen = true;

  canvas.width=canvas.width;
  //background
  context.fillStyle="#FF6B7F";
  context.fillRect(0, 0, 1905, 985);

  context.fillStyle="#2F2F30";
  context.font="bold 100px Arial";
  fill_text="GAME OVER";
  context.fillText(fill_text, 200, 200);
}

function game_complete(){
  //gameover = false;
  //menuview = false;
  gameplay = false;
  //assignment_menu = false;
  //pause = false;
  //score_screen = false;
  game_complete_screen = true;

  canvas.width=canvas.width;
  //background
  context.fillStyle="#E2FFCF";
  context.fillRect(0, 0, 1905, 985);

  context.fillStyle="#2F2F30";
  context.font="bold 100px Arial";
  fill_text="GAME COMPLETE";
  context.fillText(fill_text, 200, 200);
}

function calculate_score(){
  var difference;
  var total_points = design_points + coding_points + testing_points + documentation_points;


  //calculate design score
  if(design>=parseInt(((design_points/total_points)*100))){
    difference = design - parseInt(((design_points/total_points)*100));
  }
  else{
    difference = parseInt(((design_points/total_points)*100)) - design;
  }

  if(difference==0){
    design_score = 25;
  }
  else if(difference>1 && difference<6){
    design_score = 23;
  }
  else if(difference>5 && difference<11){
    design_score = 15;
  }
  else if(difference>10 && difference<21){
    design_score = 13;
  }
  else if(difference>20 && difference<41){
    design_score = 11;
  }
  else if(difference>40 && difference<61){
    design_score = 8;
  }
  else{
    design_score = 5;
  }

  if(design_points<4){
    design_score = parseInt(design_score*0.6);
  }
  else if(design_points<10 && design_points>3){
    design_score = parseInt(design_score*0.9);
  }

  if(design_points==0){
    design_score = 0;
  }

  //calcuate coding score
  if(coding>=parseInt(((coding_points/total_points)*100))){
    difference = coding - parseInt(((coding_points/total_points)*100));
  }
  else{
    difference = parseInt(((coding_points/total_points)*100)) - coding;
  }

  if(difference==0){
    coding_score = 25;
  }
  else if(difference>1 && difference<6){
    coding_score = 23;
  }
  else if(difference>5 && difference<11){
    coding_score = 15;
  }
  else if(difference>10 && difference<21){
    coding_score = 13;
  }
  else if(difference>20 && difference<41){
    coding_score = 11;
  }
  else if(difference>40 && difference<61){
    coding_score = 8;
  }
  else{
    coding_score = 5;
  }

  if(coding_points<4){
    coding_score = parseInt(coding_score*0.6);
  }
  else if(coding_points<10 && coding_points>3){
    coding_score = parseInt(coding_score*0.9);
  }

  if(coding_points==0){
    coding_score = 0;
  }

  //calculate testing score
  if(testing>=parseInt(((testing_points/total_points)*100))){
    difference = testing - parseInt(((testing_points/total_points)*100));
  }
  else{
    difference = parseInt(((testing_points/total_points)*100)) - testing;
  }

  if(difference==0){
    testing_score = 25;
  }
  else if(difference>1 && difference<6){
    testing_score = 23;
  }
  else if(difference>5 && difference<11){
    testing_score = 15;
  }
  else if(difference>10 && difference<21){
    testing_score = 13;
  }
  else if(difference>20 && difference<41){
    testing_score = 11;
  }
  else if(difference>40 && difference<61){
    testing_score = 8;
  }
  else{
    testing_score = 5;
  }

  if(testing_points<4){
    testing_score = parseInt(testing_score*0.6);
  }
  else if(testing_points<10 && testing_points>3){
    testing_score = parseInt(testing_score*0.9);
  }

  if(testing_points==0){
    testing_score = 0;
  }


  //calculate documentation score
  if(documentation>=parseInt(((documentation_points/total_points)*100))){
    difference = documentation - parseInt(((documentation_points/total_points)*100));
  }
  else{
    difference = parseInt(((documentation_points/total_points)*100)) - documentation;
  }

  if(difference==0){
    documentation_score = 25;
  }
  else if(difference>1 && difference<6){
    documentation_score = 23;
  }
  else if(difference>5 && difference<11){
    documentation_score = 13;
  }
  else if(difference>10 && difference<21){
    documentation_score = 13;
  }
  else if(difference>20 && difference<41){
    documentation_score = 11;
  }
  else if(difference>40 && difference<61){
    documentation_score = 8;
  }
  else{
    documentation_score = 5;
  }

  if(documentation_points<4){
    documentation_score = parseInt(documentation_score*0.6);
  }
  else if(documentation_points<10 && documentation_points>3){
    documentation_score = parseInt(documentation_score*0.9);
  }

  if(documentation_points==0){
    documentation_score = 0;
  }

  //calculate total score
  total_score = design_score + coding_score + testing_score + documentation_score;

  if(total_score>=70){
    grade ="1";
  }
  else if(total_score>=60){
    grade = "2:1";
  }
  else if(total_score>=50){
    grade = "2:2";
  }
  else if(total_score>=40){
    grade = "3";
  }
  else{
    grade = "Fail";
  }

  scores[assignment - 1] = total_score;

}

function draw_game_screen(){
  canvas.width=canvas.width;
  //background
  context.fillStyle="#FFF5D9";
  context.fillRect(0, 0, 1905, 985);

  if(timer>0){
    context.fillStyle="#22F03A";
    context.fillRect(0, 0, (timer*6.35), 50);
    context.fillStyle="#2F2F30";
    context.font="bold 40px Arial";
    fill_text="TIME REMAINING";
    context.fillText(fill_text, 50, 40);
  }

  if(player_timer==1){
    context.drawImage(frame_1, 800, 500);
  }
  else if(player_timer==2){
    context.drawImage(frame_2, 800, 500);
  }
  else if(player_timer==3){
    context.drawImage(frame_3, 800, 500);
  }

  //assignment info
  context.fillStyle="#57CBD4";
  context.fillRect(90, 670, 600, 210);
  context.fillStyle="#2F2F30";
  context.font="bold italic 20px Arial";
  fill_text="ASSIGNMENT DETAILS:";
  context.fillText(fill_text, 100, 700);
  context.font="20px Arial";
  if(assignment==1 || assignment==2){
    fill_text="Year One";
  }
  else if(assignment==3 || assignment==4 || assignment==5){
    fill_text=="Year Two";
  }
  else{
    fill_text="Year Three";
  }
  context.fillText(fill_text, 100, 720);
  fill_text=title;
  context.fillText(fill_text, 100, 740);
  fill_text=description_1;
  context.fillText(fill_text, 100, 760);
  fill_text=description_2;
  context.fillText(fill_text, 100, 780);
  fill_text=description_3;
  context.fillText(fill_text, 100, 800);
  fill_text=description_4;
  context.fillText(fill_text, 100, 820);
  fill_text=description_5;
  context.fillText(fill_text, 100, 840);

  //buttons
  context.fillStyle="#2F2F30";
  context.font="bold 18px Arial";

  context.drawImage(exit_img, 1550, 900);
  fill_text="EXIT";
  context.fillText(fill_text, 1555, 970);

  if(pause==true){
    context.drawImage(play_img, 1630, 900);
    fill_text="PLAY";
    context.fillText(fill_text, 1630, 970);
  }
  else{
    context.drawImage(pause_img, 1630, 900);
    fill_text="PAUSE";
    context.fillText(fill_text, 1630, 970);
  }

  if(music==true){
    context.drawImage(music_on, 1710, 900);
  }
  else{
    context.drawImage(music_off, 1710, 900);
  }
  fill_text="MUSIC";
  context.fillText(fill_text, 1710, 970);

  if(sounds==true){
    context.drawImage(sound_on, 1780, 900);
  }
  else{
    context.drawImage(sound_off, 1780, 900);
  }
  fill_text="SOUNDS";
  context.fillText(fill_text, 1780, 970);

  //ATTRIBUTES SCORES
  var centerX = 550;
  var centerY = 200;
  var radius = 50;

  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  context.fillStyle = "#B630DB";
  context.fill();
  context.lineWidth = 5;
  context.strokeStyle = "#9000B8";
  context.stroke();
  context.closePath();
  context.fillStyle="#FFFFFF";
  context.font="bold 30px Arial";
  fill_text=design_points;
  context.fillText(fill_text, 540, 215);

  centerX = 780;
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  context.fillStyle = "#B630DB";
  context.fill();
  context.lineWidth = 5;
  context.strokeStyle = "#9000B8";
  context.stroke();
  context.closePath();
  context.fillStyle="#FFFFFF";
  fill_text=coding_points;
  context.fillText(fill_text, 770, 215);

  centerX = 1030;
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  context.fillStyle = "#B630DB";
  context.fill();
  context.lineWidth = 5;
  context.strokeStyle = "#9000B8";
  context.stroke();
  context.closePath();
  context.fillStyle="#FFFFFF";
  fill_text=testing_points;
  context.fillText(fill_text, 1020, 215);

  centerX = 1260;
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  context.fillStyle = "#B630DB";
  context.fill();
  context.lineWidth = 5;
  context.strokeStyle = "#9000B8";
  context.stroke();
  context.closePath();
  context.fillStyle="#FFFFFF";
  fill_text=documentation_points;
  context.fillText(fill_text, 1250, 215);

  context.font="bold 25px Arial";
  context.fillStyle="#2F2F30";
  fill_text="DESIGN";
  context.fillText(fill_text, 505, 300);
  fill_text="CODING";
  context.fillText(fill_text, 735, 300);
  fill_text="TESTING";
  context.fillText(fill_text, 985, 300);
  fill_text="DOCUMENTATION";
  context.fillText(fill_text, 1160, 300);

  if(confirm_exit==true){
    context.fillStyle="#FFE08A";
    context.fillRect(1600, 850, 200, 50);
    button_text = "Confirm Exit?"
    context.fillStyle="#2F2F30";
    context.font="bold 20px Arial";
    context.fillText(button_text, 1605, 895);
  }

}

function draw_assignments_screen(){
  canvas.width=canvas.width;

  //background
  context.fillStyle="#FFF5D9";
  context.fillRect(0, 0, 1905, 985);

  //SLIDERS
  context.fillStyle="#2F2F30";
  context.font="bold 30px Arial";
  var fill_text="ATTRIBUTES            Points left to assign: " +points_left;
  context.fillText(fill_text, 1160, 30);

  var slider_text;

  //Design Slider
  context.fillStyle="#292929";
  context.fillRect(1160, 152, 600, 6);
  context.drawImage(slider_img, (design_slider_x - 40),80);
  context.fillStyle="#2F2F30";
  context.font="bold 30px Arial";
  design_slider_percent = ((design_slider_x - slider_min)/520)*100;
  slider_text="Design: "+parseInt(design_slider_percent);
  context.fillText(slider_text, 1160, 70);

  //Coding Slider
  context.fillStyle="#292929";
  context.fillRect(1160, 352, 600, 6);
  context.drawImage(slider_img, (coding_slider_x - 40),280);
  context.fillStyle="#2F2F30";
  context.font="bold 30px Arial";
  coding_slider_percent = ((coding_slider_x - slider_min)/520)*100;
  slider_text="Coding: "+parseInt(coding_slider_percent);
  context.fillText(slider_text, 1160, 270);

  //Testing Slider
  context.fillStyle="#292929";
  context.fillRect(1160, 552, 600, 6);
  context.drawImage(slider_img, (testing_slider_x - 40),480);
  context.fillStyle="#2F2F30";
  context.font="bold 30px Arial";
  testing_slider_percent = ((testing_slider_x - slider_min)/520)*100;
  slider_text="Testing: "+parseInt(testing_slider_percent);
  context.fillText(slider_text, 1160, 470);

  //Documentation Slider
  context.fillStyle="#292929";
  context.fillRect(1160, 752, 600, 6);
  context.drawImage(slider_img, (documentation_slider_x - 40),680);
  context.fillStyle="#2F2F30";
  context.font="bold 30px Arial";
  documentation_slider_percent = ((documentation_slider_x - slider_min)/520)*100;
  slider_text="Documentation: "+parseInt(documentation_slider_percent);
  context.fillText(slider_text, 1160, 670);

  //Menu button
  context.fillStyle="#F58C5E";
  context.fillRect(50, 850, 600, 100);
  var button_text="Return to Menu";
  context.fillStyle="#2F2F30";
  context.font="bold 70px Arial";
  context.fillText(button_text, 100, 935);

  //assignment info
  context.fillStyle="#E6BD4C";
  context.fillRect(40, 70, 1100, 280);

  context.fillStyle="#2F2F30";
  context.font="bold italic 40px Arial";
  fill_text="YOUR ASSIGNMENT";
  context.fillText(fill_text, 50, 120);

  context.font="25px Arial";
  if(assignment==1){
    fill_text="Welcome to your first year. Pass at least one assignment to proceed to Year Two.";
  }
  else if(assignment==2){
    fill_text="Year One";
  }
  else if(assignment==3){
    fill_text="Welcome to Year Two. From now on out, you can only fail 2 assignments before it's Game Over.";
  }
  else if(assignment==4 || assignment==5){
    fill_text=="Year Two";
  }
  else{
    fill_text="Year Three";
  }
  context.fillText(fill_text, 50, 160);
  fill_text=title;
  context.fillText(fill_text, 50, 190);
  fill_text=description_1;
  context.fillText(fill_text, 50, 220);
  fill_text=description_2;
  context.fillText(fill_text, 50, 250);
  fill_text=description_3;
  context.fillText(fill_text, 50, 280);
  fill_text=description_4;
  context.fillText(fill_text, 50, 310);
  fill_text=description_5;
  context.fillText(fill_text, 50, 340);

  //Start Assignment button
  context.fillStyle="#97DBF0";
  context.fillRect(1160, 850, 600, 100);
  button_text = "Start Assignment"
  context.fillStyle="#2F2F30";
  context.font="bold 70px Arial";
  context.fillText(button_text, 1170, 935);

  context.fillStyle="#2F2F30";
  context.font="bold 45px Arial";
  fill_text="Select how you will balance your time and effort ->";
  context.fillText(fill_text, 75, 600);


}
