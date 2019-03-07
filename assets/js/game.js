//TA Q's
//119 pas the object
//
//
//

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

    // this.characterDiv = '<button class="player-card float-left m-1" data-fighter-nature="'+this.name[1]+'" style="width: 120px;">'+
    this.characterDiv = '<button class="player-card float-left m-1" id="' + this.name[1] + '" data-fighter-nature="' + this.nature + '" style="width: 120px;">' +
      '<div class="name text-center">' + this.name[0] + '</div>' +
      '<img class="img-thumbnail" src="./assets/images/players/star-wars_' + this.nature + '_' + this.name[1] + '.png">' +
      '<div class="health text-center" id="health-' + this.name[1] + '">' + this.healthPoints + '</div>' + '</button>'

  }

  greeting() {
    console.log(`Fighter: I'm ${this.name[0]}`);
  };

  attack(eO) {

    eO.healthPoints -= this.attackPower;

    console.log('MY OLD AttackPower: ' + this.attackPower);
    this.attackPower = Math.floor(this.attackPower * 1.25);
    console.log('MY NEW AttackPower: ' + this.attackPower);

  }
  counterAttacked(eO) {
    this.healthPoints -= eO.counterAttackPower;
    console.log('My health after counter: ' + this.healthPoints);
  }

}

//constructor([name, tag], hp, ap, cap, nature)
let kylo = new Fighter(['Kylo Ren', 'kylo'], 100, 20, 15, 'evil');
let maul = new Fighter(['Darth Maul', 'maul'], 110, 20, 15, 'evil');
// let palpatine = new Fighter(['Sheev Palpatine','palpatine'], 10, 20, 15, 'evil');
let snoke = new Fighter(['Snoke', 'snoke'], 120, 20, 15, 'evil');
let finn = new Fighter(['Finn', 'finn'], 130, 20, 15, 'good');
let rey = new Fighter(['Rey', 'rey'], 140, 20, 15, 'good');
let skywalker = new Fighter(['Skywalker', 'skywalker'], 150, 20, 15, 'good');
// let yoda = new Fighter(['Yoda','yoda'], 10, 20, 15, 'good');

// const fighters =[kylo, maul, palpatine, snoke, finn, rey, skywalker, yoda];
const fighters = [kylo, maul, snoke, finn, rey, skywalker];



function fighterLookup(id) {
  return fighters.find(rebel => rebel.name[1] === id);
}

//fights and updates the DOM
//TODO figure out how to check for wins.
function playerBattle(fObj, eObj) {


  fObj.attack(eObj);
  $("#fighter-header").text('Your Attack: ' + fObj.attackPower);
  $("#fighter-dialog").text('You Attacked ' + eObj.name[0] + '!');

  $("#health-" + eObj.name[1]).text(eObj.healthPoints);
  console.log("#health-" + eObj.name[1] + '  ' + eObj.healthPoints);


  if (eObj.healthPoints > 0) {
    $("#enemy-header").text('Enemy Attack: ' + eObj.counterAttackPower);
    $("#enemy-dialog").text(eObj.name[0] + ' Counter Attacked you for ' + eObj.counterAttackPower + '!');
    fObj.counterAttacked(eObj);

    $("#health-" + fObj.name[1]).text(fObj.healthPoints);
    console.log("#health-" + fObj.name[1] + '  ' + fObj.healthPoints);
  }

}


//FUNCTION Calls

var charDiv;
for (let i in fighters) {
  charDiv = $(fighters[i].characterDiv);
  charDiv.appendTo("#fighter-stage");
}

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
var fighterObj;
var enemyObj;

$(".player-card").on("click", function () {

  if (isFighterPicked == false) { //choose character -- only do this once a game  

    //$(this) is the clicked player-card div
    //$(this).parent() is the fighter-stage
    $(this).parent().children().each(function () {
      // var playerNature = ($(this).attr('data-fighter-nature'))
      if (($(this).attr('data-fighter-nature')) == "good") {
        // console.log( ($(this).attr('data-fighter-nature')) );
        $(this).css("background-color", "green");
      }
      else if (($(this).attr('data-fighter-nature')) == "evil") {
        $(this).css("background-color", "red");
      }
      else {
        $(this).css("background-color", "gray");
      }
    });

    // console.log('fighter name: ' + $(this).attr('data-fighter-nature'));

    //while fighter isn't chosen yet, go thru the array to choose move players around the DOM
    for (let i in fighters) {

      if ($(this).attr('id') != (fighters[i].name[1])) {
        // console.log("CLICKED " + $(this).attr('id') + i);
        var otherPlayer = '#' + fighters[i].name[1];
        // console.log(fighters[i].nature);
        if ($(this).attr('data-fighter-nature') == fighters[i].nature) {
          var otherNature = '#' + fighters[i].name[1];
          $(otherNature).remove();
          // console.log("remove " + otherNature);
        }
        else {
          $(otherPlayer).appendTo("#character-stage");
        }
      }
      else {
        // reached if id is the fighter picked.
        //need to set the playerID

        //TODO pass the obj, not the id string
        fighterID = fighters[i].name[1];
        fighterObj = fighterLookup(fighterID);
        // console.log($(this));

      }

    }//for loop for all fighters...

    $('#fighters-text').text("Your Fighter");
    isFighterPicked = true;

  }//if fighter not picked yet.

  else {//Choose you enemy fighter
    if (!isEnemyPicked) {
      enemyID = $(this).attr('id');
      enemyObj = fighterLookup(enemyID);
      if ((isEnemyPicked == false) && (enemyID != fighterID)) { //choose your enemy -- do this more than once a game  
        isEnemyPicked = true;//set to true flag switched to stop choosing players on clicks.
        // console.log('enemyID: ' + enemyID);
        // console.log('fighterID: ' + fighterID);

        // TODO change this to use objects, not strings. 
        var sendFighter;
        for (let i in fighters) {
          if (enemyID == fighters[i].name[1]) {
            sendFighter = '#' + fighters[i].name[1];
          }
          //TODO find a way tot do tranversal and not use a for loop to match name.
        }
        // console.log("send fighter  :" + sendFighter);

        $(sendFighter).appendTo('#enemy-stage');
        // $('#attack-btn').css("d-block");
        $('#attack-div').removeClass('d-none');
        $('#attack-div').addClass('d-block');
        $('#dialog-box').removeClass('d-none');
        $('#dialog-box').addClass('d-block');

        //TODO turn opacity down on background fighters, look into muted?  
        var backgroundFighters = $('#character-stage');
        backgroundFighters.animate({
          opacity: "0.6",
        }, "slow");


      }



    }
  }
});

$('#btn-attack').on("click", function () {
  //TODO add function to check for wins?´ 
  playerBattle(fighterObj, enemyObj);

});


//set to false flag switched to start choosing players on clicks.
// TODO set this after a defeat to allow another chosen player. 
// isEnemyPicked = false;


// $("#clear").on("click", function() {
//   $('#display').empty();
// });


// if (checkRemaining()){
//   audioLose.play();
//   $('#myModalLose').modal({show: true, backdrop: 'static', keyboard: false});
//   dirty = false;  
// }





// });