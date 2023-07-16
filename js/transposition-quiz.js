let score = 0;
let counter = 0;
let highScore = 0;
let startTime = Date.now();
let modalOpen = false;
const notes = [
  "C",
  ["C#", "Db"],
  "D",
  ["D#", "Eb"],
  "E",
  "F",
  ["F#", "Gb"],
  "G",
  ["G#", "Ab"],
  "A",
  ["A#", "Bb"],
  "B",
];
const questionElement = document.getElementById("question");
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("highScore");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");

function generateQuestion() {
  const randomNoteIndex = Math.floor(Math.random() * notes.length);
  const randomTransposition = Math.floor(Math.random() * 11) - 5; // -5 to 5
  const transposedNoteIndex =
    (randomNoteIndex + randomTransposition + notes.length) % notes.length;
  const randomNote = Array.isArray(notes[randomNoteIndex])
    ? notes[randomNoteIndex][0]
    : notes[randomNoteIndex];
  const transposedNote = Array.isArray(notes[transposedNoteIndex])
    ? notes[transposedNoteIndex]
    : [notes[transposedNoteIndex]];
  return {
    note: randomNote,
    transposition: randomTransposition,
    answer: transposedNote,
  };
}

function displayQuestion() {
  if (counter < 10) {
    const question = generateQuestion();
    questionElement.innerText = `${question.note} ${
      question.transposition < 0 ? "" : "+"
    }${question.transposition}`;
    questionElement.answer = question.answer;
    counter += 1;
    startTime = Date.now();
  } else {
    endGame();
  }
}

function checkAnswer() {
  if (modalOpen) return; // prevent form submission if modal is open
  const userAnswer = document
    .getElementById("answer")
    .value.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
      return g1.toUpperCase() + g2.toLowerCase();
    });
  const timeTaken = (Date.now() - startTime) / 1000; // convert to seconds
  if (questionElement.answer.includes(userAnswer)) {
    if (timeTaken < 1) {
      score += 10;
    } else if (timeTaken > 30) {
      score += 0;
    } else {
      score += Math.floor(10 - (timeTaken - 1) / 3); // linear scoring between 1s and 30s
    }
  } else {
    showModal(
      "Incorrect! The correct answer was " + questionElement.answer.join(" or ")
    );
    score -= 10;
    return; // exit the function early to not display new question
  }
  scoreElement.innerText = "Score: " + score;
  document.getElementById("answer").value = "";
  displayQuestion();
}

function endGame() {
  if (score > highScore) {
    highScore = score;
    highScoreElement.innerText = "High Score: " + highScore;
  }
  showModal("Quiz Completed! Final Score: " + score);
}

function resetGame() {
  score = 0;
  counter = 0;
  scoreElement.innerText = "Score: " + score;
  displayQuestion();
}

function showModal(message) {
  modal.style.display = "block";
  modalMessage.innerText = message;
  modalOpen = true;
}

function closeModal() {
  modal.style.display = "none";
  modalOpen = false;
  resetGame();
}

displayQuestion();
