//VARIABLES
canvas=document.getElementById("gamebox");
context=canvas.getContext("2d");
context.fillStyle="#F58C5E";
context.fillRect(0, 0, 1905, 985);
canvas.addEventListener("touchstart", getPosition, false);
var canvasswitch = true;

//IMAGES
var menu_img=new Image(); //Menu background
menu_img.src="img/menu.png";

//BOOLEAN VARIABLES TO CONTROL ASPECTS OF GAME
var gameover=true;
var menuview=true;
var gameplay = false;


//Handle touch input
function getPosition(event)
{
  var touch_x = event.targetTouches[0].pageX;
  var touch_y = event.targetTouches[0].pageY;

  touch_x -= canvas.offsetLeft;
  touch_y -= canvas.offsetTop;

  //If in menu, check clicked buttons
  if(menuview==true){
    if(touch_x>1274 && touch_x<1674 && touch_y>500 && touch_y<600){
      start();
    }
  }
  else if(gameplay==true){
    menu();
  }
}

//GAME MENU
function menu(){
  gameover = false;
  menuview=true;
  gameplay=false;
  //play menu music
  /*if(mutemusic==false){

    menu_song.play();
  }
  else{
    menu_song.pause();
  }*/

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
  //Change game mode
  gameover = false;
  menuview=false;
  gameplay=true;
  canvas.width=canvas.width;

  context.fillStyle="#FCAEC7";
  context.fillRect(0, 0, 1905, 985);
  context.fillStyle="#2F2F30";
  var button_text="COMING SOON";
  context.font="bold 70px Arial";
  context.fillText(button_text, 900, 450);

}
