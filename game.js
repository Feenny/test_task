let blocked = false;
let ended = false;
let count_paws = 4;
let fields = document.getElementsByClassName("task4_game_field");
var i;
var paw_num;
(paw_win_count = document.getElementById("paw_win_count").nodeValue),
  (cat_win_count = document.getElementById("cat_win_count").nodeValue);
btnNewGame = document.querySelectorAll(".task4_start");
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function newGame() {
  document.getElementById("cat_win_count").previousElementSibling.classList.remove("winner");
  document.getElementById("paw_win_count").previousElementSibling.classList.remove("winner");
  count_paws = 4;
  blocked = false;
  ended = false;
  for (i = 0; i < fields.length; i++) {
    fields[i].innerHTML = "";
    fields[i].classList.remove("paw", "cat");
  }
}

function endGame(field1, field2, field3) {
  field1.firstElementChild.classList.toggle("winner");
  field2.firstElementChild.classList.toggle("winner");
  field3.firstElementChild.classList.toggle("winner");

  ended = true;
  blocked = true;
  if (field1.classList.contains("cat")) {
    document.getElementById("cat_win_count").textContent++;
    document.getElementById("cat_win_count").previousElementSibling.classList.toggle("winner");
  } else {
    document.getElementById("paw_win_count").textContent++;
    document.getElementById("paw_win_count").previousElementSibling.classList.toggle("winner");
  }
  
}

function checkOneClass(target1, target2, target3, target_class) {
  if (
    target1.classList.contains(target_class) &&
    target2.classList.contains(target_class) &&
    target3.classList.contains(target_class)
  ) {
    return true;
  } else {
    return false;
  }
}

function win(target_class) {
  for (let i = 0; i < 3; i++) {
    if (checkOneClass(fields[i], fields[i + 3], fields[i + 6], target_class)) {
      endGame(fields[i], fields[i + 3], fields[i + 6]);
    }
  }
  for (let i = 0; i <= 6; i += 3) {
    if (checkOneClass(fields[i], fields[i + 1], fields[i + 2], target_class)) {
      console.log(i);
      endGame(fields[i], fields[i + 1], fields[i + 2]);
    }
  }
  if (checkOneClass(fields[0], fields[4], fields[8], target_class)) {
    endGame(fields[0], fields[4], fields[8]);
  }

  if (checkOneClass(fields[2], fields[4], fields[6], target_class)) {
    endGame(fields[2], fields[4], fields[6]);
  }
}

let botPaw = function () {
  paw_num = getRandomInt(0, 8);
  if (fields[paw_num].hasChildNodes()) {
    botPaw();
  } else {
    setTimeout(paintPaw, 300, fields[paw_num]);
    setTimeout(() => {
      blocked = false;
    }, 300);
  }
};

let paintPaw = function (target) {
  target.classList.toggle("paw");

  target.innerHTML =
    '<img class="paw" src="images/paw.svg" width="100%" height="100%">';
};

let paintCat = function (target) {
  target.classList.toggle("cat");

  target.innerHTML =
    '<img class="cat" src="images/cat3.svg" width="100%" height="100%">';
};
for(i=0; i<btnNewGame.length; i++){
btnNewGame[i].addEventListener("click", newGame);}

for (i = 0; i < fields.length; i++) {
  fields[i].addEventListener("click", function () {
    if (blocked) {
      return;
    }
    if (!this.hasChildNodes()) {
      paintCat(this);
      win("cat");
      if (ended) return;
    } else {
      return;
    }

    if (count_paws > 0) {
      blocked = true;
      botPaw();
      setTimeout(win, 300, "paw");
      count_paws--;
    }
  });
}
