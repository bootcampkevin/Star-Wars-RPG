//Global Variables, then Objects, then Function Calls, yo.
// $(document).ready(function() {

//GLOBALS
// const isFighterPicked = false;//can't change with let later?
//var audioWin = new Audio('./assets/sounds/cannon.mp3');


//OBJECTS
// Base class Fighter
class Fighter {
  constructor([name, tag], hp, ap, cap, nature) {
    this.name = [name, tag];
    this.healthPoints = hp;
    this.attackPower = ap;
    this.counterAttackPower = cap;
    this.nature = nature;
   
    // this.characterDiv = '<button class="player-card float-left m-1" data-fighter="'+this.name[1]+'" style="width: 120px;">'+
    this.characterDiv = '<button class="player-card float-left m-1" id="'+this.name[1]+'" data-fighter="'+this.nature+'" style="width: 120px;">'+
                        '<div class="name text-center">'+this.name[0]+'</div>'+
                        '<img class="img-thumbnail" src="./assets/images/players/star-wars_'+this.nature+'_'+this.name[1]+'.png">'+
                        '<div class="health text-center">'+this.healthPoints+'</div>'+'</button>'
       
  }

  greeting() {
    console.log(`Fighter: I'm ${this.name[0]}`);
  };

}

let kylo = new Fighter(['Kylo Ren','kylo'], 10, 20, 30, 'evil');
let maul = new Fighter(['Darth Maul','maul'], 10, 20, 30, 'evil');
// let palpatine = new Fighter(['Sheev Palpatine','palpatine'], 10, 20, 30, 'evil');
let snoke = new Fighter(['Snoke','snoke'], 10, 20, 30, 'evil');
let finn = new Fighter(['Finn','finn'], 10, 20, 30, 'good');
let rey = new Fighter(['Rey','rey'], 10, 20, 30, 'good');
let skywalker = new Fighter(['Skywalker','skywalker'], 10, 20, 30, 'good');
// let yoda = new Fighter(['Yoda','yoda'], 10, 20, 30, 'good');

// const fighters =[kylo, maul, palpatine, snoke, finn, rey, skywalker, yoda];
const fighters =[kylo, maul, snoke, finn, rey, skywalker];

  var charDiv;
  for (let i in fighters) {
    charDiv = $(fighters[i].characterDiv);
    charDiv.appendTo("#fighter-stage");
  }






//FUNCTION Calls

kylo.greeting();
maul.greeting();
snoke.greeting();
finn.greeting();
rey.greeting();
skywalker.greeting();

var isFighterPicked = false;
var isEnemyPicked = false;
var fighterID;
var enemyID;

$(".player-card").on("click", function () {

  if (isFighterPicked == false) { //choose character -- only do this once a game  
    fighterID = $(this).attr('id');//i decided to set this too late. TODO , i hacked at data-fighter to find id in code later. live and learn.
    for (let i in fighters) {
      var natureColor = '#'+fighters[i].name[1];
     if(fighters[i].nature == 'good'){
    //  console.log('good ' + fighters[i].name[1]);
     $(natureColor).css("background-color", "green");
     }
     else{
      // console.log('bad '+ fighters[i].name[1]); 
      $(natureColor).css("background-color", "red");
     }
      
      if ($(this).attr('id') != (fighters[i].name[1])){
        // console.log("CLICKED " + $(this).attr('id') + i);
        var otherPlayer = '#'+fighters[i].name[1];
        // console.log(fighters[i].nature);
        if($(this).attr('data-fighter') == fighters[i].nature){
          var otherNature = '#'+fighters[i].name[1];
          $(otherNature).remove();
          // console.log("remove "+otherNature);
        }
        else{
        $(otherPlayer).appendTo("#character-stage");
        $(this).attr("data-character", 'true');

        }


      }
      else{
        //do nothing. reached from id not equal to the name tags
        
      }
      
    }
    $('#fighters-text').text("Your Fighter");
    isFighterPicked = true;
  }//if fighter not picked yet.

  else{//Choose you enemy fighter
    //TODO check for a picked enemy, yo.
    enemyID = $(this).attr('id');
    if ((isEnemyPicked == false) && (enemyID != fighterID)) { //choose your enemy -- do this more than once a game  
      isEnemyPicked = true;//set to true flag switched to stop choosing players on clicks.

      // console.log("$(this).attr('id'):  boom   :" + enemyID);
      var sendFighter;
      for (let i in fighters) {
        if (enemyID == fighters[i].name[1]) {
          sendFighter = '#' + fighters[i].name[1];
        }
        //TODO truen opacity down on bg fighters.
      }

      // console.log("send fighter  :" + sendFighter);

      $(sendFighter).appendTo('#enemy-stage');
      // $('#attack-btn').css("d-block");
      $('#attack-div').removeClass('d-none');
      $('#attack-div').addClass('d-block'); 
     

    }



  }

});

$('#btn-attack').on("click", function () {

  isEnemyPicked = false;//set to false flag swtiched to start choosing players on clicks.
  console.log("Enemy is false now. ");
});

// $("#clear").on("click", function() {
//   $('#display').empty();
// });


// if (checkRemaining()){
//   audioLose.play();
//   $('#myModalLose').modal({show: true, backdrop: 'static', keyboard: false});
//   dirty = false;  
// }





// });