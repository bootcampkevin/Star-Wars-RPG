//Global Variables, then Objects, then Calls:

//var audioWin = new Audio('./assets/sounds/cannon.mp3');



if (checkRemaining()){
  //No more guesses left if true.
  audioLose.play();
  $('#myModalLose').modal({show: true, backdrop: 'static', keyboard: false});
  dirty = false;  
}
