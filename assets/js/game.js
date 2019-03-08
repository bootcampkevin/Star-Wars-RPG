$(document).ready(function () {
  //TA Q's
  //
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
      this.characterDiv = '<button class="player-card options float-left m-1 ' + this.nature + '" id="' + this.name[1] + '" data-fighter-nature="' + this.nature + '" style="width: 120px;">' +
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
  let snoke = new Fighter(['Snoke', 'snoke'], 120, 20, 55, 'evil');
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

//TODO!!!!!! Check for MY defeat.
    if (eObj.healthPoints > 0) {
      $("#enemy-header").text('Enemy Attack: ' + eObj.counterAttackPower);
      $("#enemy-dialog").text(eObj.name[0] + ' Counter Attacked you for ' + eObj.counterAttackPower + '!');
      fObj.counterAttacked(eObj);

      $("#health-" + fObj.name[1]).text(fObj.healthPoints);
      console.log("#health-" + fObj.name[1] + '  ' + fObj.healthPoints);
    }
    else {//DEFEATED ENEMY
      //TODO prompt for choose another fighter, also stats.
      promptDefeat();
      $('#warriors-stage').animate({
        opacity: "1",
      }, "slow");

      //Remove defeated!
      $('#enemy-stage').empty();
      $('#warriors-stage').children().addClass('enemy');
    }


  }
  function promptDefeat() {
    console.log("DEFEAT!!");
    $("#game-info").addClass('d-block');
    $("#game-card-body").text('You Defeat!');
    $("#game-card-header").text('Defeat!');
    
    $('#attack-div').removeClass('d-block');
    $('#attack-div').addClass('d-none');
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

  var fighterID;
  var enemyID;
  var fighterObj;
  var enemyObj;

  $('body').on("click", '.options', function () {
    //Choose your fighter -- only do this once a game.  

    //Change the colors of the player-cards to match their nature.    
    $(this).addClass('fighter');
    //remove the player from the player-card class.    
    $(this).removeClass('options');

    $(".evil").css("background-color", "red");
    $(".good").css("background-color", "green");

    //while fighter isn't chosen yet, go thru the array to choose move players around the DOM
    //TODO Use the DOM and stop using for loops
    for (let i in fighters) {
      if ($(this).attr('id') != (fighters[i].name[1])) {
        var otherPlayer = '#' + fighters[i].name[1];
        if ($(this).attr('data-fighter-nature') == fighters[i].nature) {
          var otherNature = '#' + fighters[i].name[1];
          //remove fighters that are on your same side for the rest of the game    
          $(otherNature).removeClass('options');
          $(otherNature).remove();
        }
        else {
          $(otherPlayer).addClass('enemy');
          $(otherPlayer).removeClass('options');
          //move the enemy fighters to the warriors-stage
          $(otherPlayer).appendTo("#warriors-stage");
        }
      }
      else {
        // reached if id is the fighter picked.        
        fighterID = fighters[i].name[1];
        fighterObj = fighterLookup(fighterID);
      }

    }//for loop for all fighters...

    $('#fighters-text').text("You have chosen " + fighterObj.name[0] + " to fight your Battles!");
  });//YOUR FIGHTER HAS BEEN CHOSEN; CODE WILL NOT BE USED AGAIN.

  $('#btn-attack').on("click", function () {
    //TODO add function to check for wins?´ 
    console.log('button: ' + $(this).parent().children());
    playerBattle(fighterObj, enemyObj);
    // }
  });

  $('body').on("click", '.enemy', function () {
    //Choose your enemy fighter
    enemyID = $(this).attr('id');
    enemyObj = fighterLookup(enemyID);

    $(this).removeClass('enemy');

    $(this).siblings().removeClass('enemy');
    $(this).appendTo('#enemy-stage');

    //Show the Attack Button now.
    $('#attack-div').removeClass('d-none');
    $('#attack-div').addClass('d-block');
    //Show the fight dialog box;
    $('#dialog-box').removeClass('d-none');
    $('#dialog-box').addClass('d-block');


    $('#warriors-stage').animate({
      opacity: "0.4",
    }, "slow");

  });//YOUR ENEMY HAS BEEN CHOSEN; CODE WILL BE USED AGAIN TO PICK ANOTHER FIGHTER.


  // $("#clear").on("click", function() {
  //   $('#display').empty();
  // });


  // if (checkRemaining()){
  //   audioLose.play();
  //   $('#myModalLose').modal({show: true, backdrop: 'static', keyboard: false});
  //   dirty = false;  
  // }





  // });







});//document ready