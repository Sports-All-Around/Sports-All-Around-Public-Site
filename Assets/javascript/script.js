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
/*
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://odds.p.rapidapi.com/v4/sports?all=true",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "9e34c8fe8emsh1d50cc56bf1e2a3p177c2cjsna07b45eca78b",
		"X-RapidAPI-Host": "odds.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});

const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://flashlive-sports.p.rapidapi.com/v1/search/multi-search?query=mess&locale=en_INT",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "9e34c8fe8emsh1d50cc56bf1e2a3p177c2cjsna07b45eca78b",
		"X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});



*/

//Related to the modal input and saving to local storage
var addToFavorites = $('#addToFavorites')

function populateFavorites (event){
    event.preventDefault();
    var formFavorites = $('#favorites').val();

    if (!formFavorites) {
        console.log('no favorites inputted');
        return;
    };
    //set favortie to local storage
    localStorage.setItem("savedFavorites", JSON.stringify(formFavorites));

    
   var selection = $('#selectFavorites');
   var selectionArray = JSON.parse(localStorage.getItem('savedFavorites'))||[];
   if (selectionArray === 0){
    var sF = document.createElement('option');
    sF.textContent = "No Favorites"
   } else {
    console.log(selectionArray);
    selection.append('<option>' + selectionArray + '</option>');
   }
}

addToFavorites.on('click', populateFavorites);

populateFavorites();