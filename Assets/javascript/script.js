 document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });
});

//For live betting line odds
const liveOddsSettings = {
	"async": true,
	"crossDomain": true,
	"url": "https://odds.p.rapidapi.com/v4/sports?all=true",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "9e34c8fe8emsh1d50cc56bf1e2a3p177c2cjsna07b45eca78b",
		"X-RapidAPI-Host": "odds.p.rapidapi.com"
	}
};

$.ajax(liveOddsSettings).done(function (response) {
	console.log(response);
});

//For live Scores
const liveScoresSettings = {
	"async": true,
	"crossDomain": true,
	"url": "https://flashlive-sports.p.rapidapi.com/v1/search/multi-search?query=mess&locale=en_INT",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "9e34c8fe8emsh1d50cc56bf1e2a3p177c2cjsna07b45eca78b",
		"X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com"
	}
};

$.ajax(liveScoresSettings).done(function (response) {
	console.log(response);
});





//Related to the modal input and saving to local storage
var addToFavorites = $('#addToFavorites')

function addFavorites (event){
    event.preventDefault();
    var formFavorites = $('#favorites').val();

    if (!formFavorites) {
        console.log('no favorites inputted');
        return;
    } else {
        let favoritesString = localStorage.getItem('savedFavorites');
        var favoritesArray = JSON.parse(favoritesString);
        if (favoritesArray === null){
            favoritesArray = []
        }
        favoritesArray.push(formFavorites);
    }
    //set favortie to local storage
    localStorage.setItem("savedFavorites", JSON.stringify(favoritesArray));
    populateFavorites();
    
   
}

addToFavorites.on('click', addFavorites);

populateFavorites();

function populateFavorites(event){
    var selection = $('#selectFavorites');
   var selectionArray = JSON.parse(localStorage.getItem('savedFavorites'))||[];
   if (selectionArray === 0){
    var sF = document.createElement('option');
    sF.textContent = "No Favorites"
   } else {
    console.log(selectionArray);
    selection.append('<option>' + selectionArray + '</option>');
   }
};
//button to close modal and submit to storage
var setDefault = $('#saveclose');


function setUserDefault (event) {
    event.preventDefault();

    //Selects checked defaults
    var checkedEl = $('input:checked')
    var selected = []

    //loops through each checked options to store in array
    $.each(checkedEl, function () {
        selected.push($(this).val());
        console.log(selected)
    })
}

setDefault.on('click', setUserDefault);



//for loops to populate scores and odds
function createScoresCards() {
    var container = $('#Hockey-Scores');
    for (var i =0; i < data.score.length; i++){
        var title = document.createElement(h3);
        title.textcontent = data.sport_title;
        document.$('#Hockey-Scores').appendchild(title);
        var awayTeam = document.createElement(p);
        awayTeam.textcontent = data.score[1].name + ": " + data.score[1].score;
        document.$('#Hockey-Scores').appendchild(awayTeam);
        var homeTeam = document.createElement(p);
        awayTeam.textcontent = data.score[0].name + ": " + data.score[0].score;
        document.$('#Hockey-Scores').appendchild(homeTeam);
        return

    }
}

createScoresCards();

function getApiResponses(sportId) {
    var scoreResponse;
    var oddsResponse;
    const scores = {
        "async": true,
        "crossDomain": true,
        "url": `https://odds.p.rapidapi.com/v4/sports/${sportId}/scores?daysFrom=2`,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "9e34c8fe8emsh1d50cc56bf1e2a3p177c2cjsna07b45eca78b",
            "X-RapidAPI-Host": "odds.p.rapidapi.com"
        }
    };

    const odds = {
        "async": true,
        "crossDomain": true,
        "url": `https://odds.p.rapidapi.com/v4/sports/${sportId}/odds?regions=us&oddsFormat=decimal&markets=h2h%2Cspreads&dateFormat=iso`,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "9e34c8fe8emsh1d50cc56bf1e2a3p177c2cjsna07b45eca78b",
            "X-RapidAPI-Host": "odds.p.rapidapi.com"
        }
    }
    $.ajax(scores).done(function (response) {
        scoreResponse = response;
    $.ajax(odds).done(function (response) {
        oddsResponse = response;
        console.log(oddsResponse);
        console.log(scoreResponse);
        
        for (var i = 0; i < scoreResponse.length; i++){
            var count = 0;
            for (var j = 0; j < oddsResponse.length; j++) {
                if (scoreResponse[i] === oddsResponse[j]) {
                    count ++
                }
            }
            return;
        }
        // for loop through scoreResponse
            // inner for loop over the oddsResponse
                // match scores and odds by using the id key / field
                // when I find a matching odds, then write to the dom and add a card for the game that includes scores and odds and game data
    });
    });        

}

getApiResponses('icehockey_nhl');
