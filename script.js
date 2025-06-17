// Toggle timeline photo visibility
function toggleImage(id) {
  const imgDiv = document.getElementById(id);
  const button = imgDiv.previousElementSibling;

  const isHidden = imgDiv.style.display === "none" || imgDiv.style.display === "";

  imgDiv.style.display = isHidden ? "block" : "none";
  button.textContent = isHidden ? "Hide Photo" : "Show Photo";
}

document.querySelectorAll("video").forEach(video => {
  video.muted = true;

  // Prevent unmuting
  video.addEventListener("volumechange", () => {
    if (!video.muted) {
      video.muted = true;
    }
  });
});


const qnaPairs = [
  { question: "Favorite Memory?", answer: "Having fun with friends all night 😄" },
  { question: "Hangout Room?", answer: "412 (aka Headquarters) 🏠" },
  { question: "Best Thing to Do?", answer: "Sleeping 😴" },
  { question: "Favorite Mess Food?", answer: "Chole Bhature 🍽️" },
  { question: "Most Used Phrase?", answer: `"Dekha Jayega" 😅` },
  { question: "Craziest Day?", answer: "Elephanta Caves with no internet, 6 peoples and just 20 rupees cash 🚴‍♂️🍜" },
  { question: "Secret Talent?", answer: "Speed-napping during lectures 😴⏱️" },
  { question: "Favorite Campus Spot?", answer: "Powai Lake during sunset 🌅" },
  { question: "Favorite Canteen?", answer: "H5 Canteen 🍽️" }

];

let currentQnA = null;

document.getElementById("show-question").addEventListener("click", () => {
  const random = qnaPairs[Math.floor(Math.random() * qnaPairs.length)];
  currentQnA = random;
  
  const questionBox = document.getElementById("question-box");
  const answerBox = document.getElementById("answer-box");

  questionBox.textContent = random.question;
  answerBox.classList.add("hidden");
});

document.getElementById("show-answer").addEventListener("click", () => {
  const answerBox = document.getElementById("answer-box");

  if (currentQnA) {
    answerBox.textContent = currentQnA.answer;
    answerBox.classList.remove("hidden");
  } else {
    answerBox.textContent = "Please click 'Show Question' first!";
    answerBox.classList.remove("hidden");
  }
});

