
let operation = "+";
let num1 = 5;
let num2 = 3;
let correctAnswer = 8;
let answered = false;

let stats = JSON.parse(localStorage.getItem("mathStats")) || {
  total: 0,
  correct: 0,
  wrong: 0
};

// पहाड़े 1 से 20 तक
const tableSelect = document.getElementById("tableSelect");

for (let i = 1; i <= 20; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = "पहाड़ा " + i;
  tableSelect.appendChild(option);
}

tableSelect.addEventListener("change", showTable);

function showTable() {
  const number = Number(tableSelect.value);
  let html = "";

  for (let i = 1; i <= 10; i++) {
    html += `${number} × ${i} = ${number * i}<br>`;
  }

  document.getElementById("tableResult").innerHTML = html;
}

showTable();

// पहाड़ा बोलकर सुनाना
function readTable() {
  const number = Number(tableSelect.value);
  let text = `चलिए ${number} का पहाड़ा पढ़ते हैं। `;

  for (let i = 1; i <= 10; i++) {
    text += `${number} गुणा ${i} बराबर ${number * i}। `;
  }

  speak(text, "hi-IN");
}

// आवाज की सुविधा
function speak(text, lang = "hi-IN") {
  if (!("speechSynthesis" in window)) {
    alert("आपके ब्राउज़र में आवाज की सुविधा उपलब्ध नहीं है।");
    return;
  }

  window.speechSynthesis.cancel();

  const message = new SpeechSynthesisUtterance(text);
  message.lang = lang;
  message.rate = 0.85;
  message.pitch = 1;

  window.speechSynthesis.speak(message);
}

// गणित का विषय चुनना
function chooseOperation(op, button) {
  operation = op;

  document.querySelectorAll(".op-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  button.classList.add("active");
  newQuestion();
}

// नया सवाल बनाना
function newQuestion() {
  answered = false;

  num1 = Math.floor(Math.random() * 20) + 1;
  num2 = Math.floor(Math.random() * 20) + 1;

  if (operation === "+") {
    correctAnswer = num1 + num2;
  }

  if (operation === "-") {
    if (num1 < num2) {
      [num1, num2] = [num2, num1];
    }
    correctAnswer = num1 - num2;
  }

  if (operation === "*") {
    correctAnswer = num1 * num2;
  }

  if (operation === "/") {
    // हमेशा पूरे अंक में भाग आने वाला सवाल
    correctAnswer = Math.floor(Math.random() * 12) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
    num1 = correctAnswer * num2;
  }

  let symbol = operation === "*" ? "×" :
               operation === "/" ? "÷" : operation;

  document.getElementById("question").textContent =
    `${num1} ${symbol} ${num2} = ?`;

  document.getElementById("answer").value = "";

  const feedback = document.getElementById("feedback");
  feedback.textContent = "अपना उत्तर लिखिए। शुभकामनाएँ! 😊";
  feedback.className = "feedback";
  
  document.getElementById("answer").focus();
}

// उत्तर चेक करना
function checkAnswer() {
  const input = document.getElementById("answer");
  const feedback = document.getElementById("feedback");
  const teacher = document.getElementById("teacherMessage");

  if (answered) {
    feedback.textContent = "अगले सवाल के लिए बटन दबाइए।";
    return;
  }

  if (input.value.trim() === "") {
    feedback.textContent = "पहले अपना उत्तर लिखिए!";
    speak("पहले अपना उत्तर लिखिए।");
    return;
  }

  const userAnswer = Number(input.value);

  if (!Number.isFinite(userAnswer)) {
    feedback.textContent = "कृपया सही संख्या लिखिए।";
    return;
  }

  answered = true;
  stats.total++;

  if (userAnswer === correctAnswer) {
    stats.correct++;

    feedback.textContent =
      "🎉 बहुत बढ़िया! आपका जवाब बिल्कुल सही है। Good Job! Very Good!";

    feedback.className = "feedback good";

    teacher.textContent =
      "शानदार! आपका जवाब बिल्कुल सही है। ऐसे ही मेहनत करते रहिए!";

    speak("बहुत बढ़िया! आपका जवाब बिल्कुल सही है। गुड जॉब! वेरी गुड!");
  } else {
    stats.wrong++;

    feedback.textContent =
      `❌ आपका जवाब गलत है। सही उत्तर ${correctAnswer} है। फिर से कोशिश करें!`;

    feedback.className = "feedback bad";

    teacher.textContent =
      `कोई बात नहीं! सही उत्तर ${correctAnswer} है। आप अगली बार जरूर सही करेंगे।`;

    speak(
      `कोई बात नहीं। आपका जवाब सही नहीं है। सही उत्तर ${correctAnswer} है। दोबारा कोशिश कीजिए।`
    );
  }

  updateStats();
}

// स्कोर अपडेट करना
function updateStats() {
  document.getElementById("total").textContent = stats.total;
  document.getElementById("correct").textContent = stats.correct;
  document.getElementById("wrong").textContent = stats.wrong;

  localStorage.setItem("mathStats", JSON.stringify(stats));
}

// सवाल सुनना
function speakQuestion() {
  const symbol = operation === "*" ? "गुणा" :
                 operation === "/" ? "भाग" :
                 operation === "+" ? "जोड़" : "घटाना";

  speak(`बताइए ${num1} ${symbol} ${num2} कितना होता है?`);
}

// टीचर की बात सुनना
function speakTeacher() {
  speak(document.getElementById("teacherMessage").textContent);
}

// Enter दबाने पर भी उत्तर चेक हो
document.getElementById("answer").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    checkAnswer();
  }
});

// पहली बार स्कोर दिखाना
updateStats();

// पहला सवाल
newQuestion();
