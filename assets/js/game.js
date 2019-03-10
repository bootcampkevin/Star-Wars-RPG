$(document).ready(function () {
  //TA Q's
  //
  //
  //
  //
  var audioFighter = new Audio('./assets/sounds/fighter.mp3');
  var audioEnemy = new Audio('./assets/sounds/enemy.mp3');
  var audioHit;
  var soundToggle = true;
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
      this.maxHP = hp;
      this.origAP = ap;

      // this.characterDiv = '<button class="player-card float-left m-1" data-fighter-nature="'+this.name[1]+'" style="width: 120px;">'+
      this.characterDiv = '<button class="player-card options float-left m-1 ' + this.nature + '" id="' + this.name[1] + '" data-fighter-nature="' + this.nature + '" style="width: 120px;">' +
        '<div class="name text-center">' + this.name[0] + '</div>' +
        '<img class="img-thumbnail" src="./assets/images/players/star-wars_' + this.nature + '_' + this.name[1] + '.png">' +
        '<div class="health text-center" id="health-' + this.name[1] + '">' + this.healthPoints + '</div>' + '</button>'

    }
    reset() {
      this.healthPoints = this.maxHP;
      this.attackPower = this.origAP;

    };
    greeting() {
      console.log(`Fighter: I'm ${this.name[0]}`);
    };

    attack(eO) {

      eO.healthPoints -= this.attackPower;

      // console.log('MY OLD AttackPower: ' + this.attackPower);
      this.attackPower = Math.floor(this.attackPower * 1.25);
      // console.log('MY NEW AttackPower: ' + this.attackPower);

    }
    counterAttacked(eO) {
      this.healthPoints -= eO.counterAttackPower;
      // console.log('My health after counter: ' + this.healthPoints);
    }

  }//class Fighter

  //constructor([name, tag], hp, ap, cap, nature)
  let kylo = new Fighter(['Kylo Ren', 'kylo'], 100, 25, 15, 'evil');
  let maul = new Fighter(['Darth Maul', 'maul'], 110, 20, 15, 'evil');
  // let palpatine = new Fighter(['Sheev Palpatine','palpatine'], 10, 20, 15, 'evil');
  let snoke = new Fighter(['Snoke', 'snoke'], 120, 20, 55, 'evil');
  let finn = new Fighter(['Finn', 'finn'], 130, 20, 15, 'good');
  let rey = new Fighter(['Rey', 'rey'], 140, 20, 15, 'good');
  let skywalker = new Fighter(['Skywalker', 'skywalker'], 150, 20, 15, 'good');
  // let yoda = new Fighter(['Yoda','yoda'], 10, 20, 15, 'good');
  var wins = 0;
  var losses = 0;
  var gamesWon = 0;
  // const fighters =[kylo, maul, palpatine, snoke, finn, rey, skywalker, yoda];
  const fighters = [kylo, maul, snoke, finn, rey, skywalker];

  function fighterLookup(id) {

    return fighters.find(rebel => rebel.name[1] === id);
  }
  //fights and updates the DOM
  function playerBattle(fObj, eObj) {
    
    //Generate a random sound to hit from 6 available sounds. 
    if(soundToggle==true){
      var randomSoundNum = Math.floor(Math.random()*6);
      audioHit = new Audio('./assets/sounds/'+randomSoundNum+'.mp3');    
      audioHit.play();
    }
    //Attack logic
    fObj.attack(eObj);
    $("#fighter-header").text('You attacked ' + eObj.name[0] + ' for ' + fObj.attackPower + ' damage!');
    // $("#fighter-dialog").text('Your Health:');
    //update enemy health on the DOM
    var eHP = ((eObj.healthPoints / eObj.maxHP)*100).toFixed(0);   
    $("#enemy-health").css({width: +eHP+'%'});    
    $("#health-" + eObj.name[1]).text(eObj.healthPoints);
    // console.log("#health-" + eObj.name[1] + '  ' + eObj.healthPoints);

    if (eObj.healthPoints > 0) {
      
      fObj.counterAttacked(eObj);
      $("#enemy-header").text(eObj.name[0] + ' counter attacked you for ' + eObj.counterAttackPower + ' damage!');
      // $("#enemy-dialog").text('Enemy Health:');
      
      //after counter attack, check if I have been defeated. 
      if (fObj.healthPoints <= 0) {
        selfDefeat();
      }
      //update fighter's hp on the DOM
      var fHP = ((fObj.healthPoints / fObj.maxHP)*100).toFixed(0);
      
      $("#fighter-health").css({width: +fHP+'%'});  
      $("#health-" + fObj.name[1]).text(fObj.healthPoints);
      // console.log("#health-" + fObj.name[1] + '  ' + fObj.healthPoints);
    }
    else {//DEFEATED ENEMY
      //TODO prompt for choose another fighter, also stats.
      enemyDefeat();
      $('#warriors-stage').animate({
        opacity: "1",
      }, "slow");

      //Remove defeated!
      $('#fighter-card-2').clone().prependTo('#enemies-defeated');
      $('#fighter-card-2').empty();
      $('#warriors-stage').children().addClass('enemy');

      $('#enemy-bar').removeClass('d-block');
      $('#enemy-bar').addClass('d-none');
      $('#dialog-box2').removeClass('d-block');
      $('#dialog-box2').addClass('d-none');
    }



  }
  function enemyDefeat() {
    // console.log("DEFEAT!!");
    wins++;
    $("#game-info").addClass('d-block');
    if ($('#warriors-stage').find('button').length == 0) {
      gamesWon++;
      $("#game-card-body").text('You Defeated ' + enemyObj.name[0] + '!'+' Please Play Again!');
    }
    else{
      $("#game-card-body").text('You Defeated ' + enemyObj.name[0] + '!'+' Please select another enemy to Battle.');
      }
    $("#game-card-header").text('You have Defeated Opponents '+wins+' Times and have Won '+gamesWon+' Battle Games!');

    $('#attack-div').removeClass('d-block');
    $('#attack-div').addClass('d-none');
    //check for no more enemies

    if ($('#warriors-stage').find('button').length == 0) {

      $("#play-again").removeClass('d-none');
      $("#play-again").addClass('d-block');
    }

  }

  function selfDefeat() {
    // console.log('I have been defeated');
    losses++;
    $("#game-info").removeClass('d-none');
    $("#game-info").addClass('d-block');

    $("#game-card-header").text('You have been defeated by '+enemyObj.name[0]+'!');
    $("#game-card-body").text('You have lost ' +losses+ ' times! Please play again.');

    $('#attack-div').removeClass('d-block');
    $('#attack-div').addClass('d-none');
    
    $("#play-again").removeClass('d-none');
    $("#play-again").addClass('d-block');
  }

  $('#play-again').on('click', function () {
    resetGame();
    // console.log('play again');
  });

  var charDiv;
  for (let i in fighters) {
    charDiv = $(fighters[i].characterDiv);
    charDiv.appendTo("#fighter-stage");
  }

  // kylo.greeting();
  // maul.greeting();
  // snoke.greeting();
  // finn.greeting();
  // rey.greeting();
  // skywalker.greeting();

  function resetGame() {
    kylo.reset();
    maul.reset();
    snoke.reset();
    finn.reset();
    rey.reset();
    skywalker.reset();

    resetDivs();
    var charDiv;
    for (let i in fighters) {
      charDiv = $(fighters[i].characterDiv);
      charDiv.appendTo("#fighter-stage");
    }
  }

  function resetDivs() {

    $('#fighters-text').text("Click on the character you wish use:");
    $('#game-info').removeClass('d-block');
    $('#game-info').addClass('d-none');
    $('#dialog-box1').removeClass('d-block');
    $('#dialog-box1').addClass('d-none');
    $('#dialog-box2').removeClass('d-block');
    $('#dialog-box2').addClass('d-none');
    $("#play-again").removeClass('d-block');
    $("#play-again").addClass('d-none');    
    
    $("#warriors-stage").css({opacity: "1"});
    $("#fighter-stage").empty();
    $("#warriors-stage").empty();
    $("#enemies-defeated").empty();
    $("#fighter-card-1").empty();
    $("#fighter-card-2").empty();

    $("#attack-div").removeClass('d-block');
    $("#attack-div").addClass('d-none');
    $("#play-again").removeClass('d-block');
    $("#play-again").addClass('d-none');
    
    $("#fighter-bar").removeClass('d-block');
    $("#fighter-bar").addClass('d-none');
    $("#enemy-bar").removeClass('d-block');
    $("#enemy-bar").addClass('d-none');

  }

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
    $(this).appendTo('#fighter-card-1');
    if(soundToggle==true){audioFighter.play();}
    $("#fighter-health").css({width: '100%'});   
    //Show the health bar;
    $('#fighter-bar').removeClass('d-none');
    $('#fighter-bar').addClass('d-block');
    $('#your-character-header').text('Pick your enemy opponents wisely...');
    
       
    //while fighter isn't chosen yet, go thru the array to choose move players around the DOM
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

  $('#attack-div').on("click", function () {
     
    //Show the fight dialog box;
    $('#dialog-box1').removeClass('d-none');
    $('#dialog-box1').addClass('d-block');
    $('#dialog-box2').removeClass('d-none');
    $('#dialog-box2').addClass('d-block');
    
    playerBattle(fighterObj, enemyObj);   

  });

  $('body').on("click", '.enemy', function () {
    //Choose your enemy fighter
    enemyID = $(this).attr('id');
    enemyObj = fighterLookup(enemyID);

    $(this).removeClass('enemy');

    $(this).siblings().removeClass('enemy');
    
    $(this).appendTo('#fighter-card-2');
    if(soundToggle==true){audioEnemy.play();} 
    //Show the progress bar;
    $('#enemy-bar').removeClass('d-none');
    $('#enemy-bar').addClass('d-block');
    
    //Show the Attack Button now.
    $('#attack-div').removeClass('d-none');
    $('#attack-div').addClass('d-block');

    //update enemy health to be 100% on the DOM for new picks    
    $("#enemy-health").css({width: '100%'});    

    $('#your-character-header').text('\xa0');
    $('#warriors-stage').animate({
      opacity: "0.4",
    }, "slow");

  });//YOUR ENEMY HAS BEEN CHOSEN; CODE WILL BE USED AGAIN TO PICK ANOTHER FIGHTER.

  $('#btn-reset').on("click", function () {
    wins = 0;
    losses = 0;
    gamesWon = 0;
    resetGame();

  });
  $('#btn-sfx').on("click", function () {
    if (soundToggle == true) {

      soundToggle = false;
    }
    else {

      soundToggle = true;
    }
    console.log(soundToggle);
  });

});//document ready