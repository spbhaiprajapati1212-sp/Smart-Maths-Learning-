
/* =====================================
   SMART MATHS LEARNING
   Hindi + English Language System
===================================== */

// LANGUAGE
let currentLanguage =
  localStorage.getItem("mathLanguage") || "hi";

let operation = "+";
let num1 = 5;
let num2 = 3;
let correctAnswer = 8;
let answered = false;

// STUDENT SCORE
let stats = JSON.parse(
  localStorage.getItem("mathStats")
) || {
  total: 0,
  correct: 0,
  wrong: 0
};

// LANGUAGE DICTIONARY
const translations = {

  hi: {
    pageTitle: "Smart Maths Learning - गणित सीखें",
    tagline: "खेल-खेल में गणित सीखें!",
    welcomeTitle: "नमस्ते बच्चों! 👋",
    welcomeText: "आइए आज गणित को आसान और मजेदार बनाते हैं।",

    languageHeading: "🌐 भाषा चुनें / Choose Language",
    languageDescription: "अपनी पसंद की भाषा चुनिए।",

    totalLabel: "कुल सवाल",
    correctLabel: "सही जवाब",
    wrongLabel: "गलत जवाब",

    tableHeading: "📖 पहाड़े सीखें (1 से 20)",
    tableDescription: "अपना पहाड़ा चुनिए और पढ़िए।",
    tableSpeakBtn: "🔊 पहाड़ा सुनें",

    practiceHeading: "➕ गणित का अभ्यास",
    practiceDescription: "अपना गणित का विषय चुनिए।",

    addition: "➕ जोड़",
    subtraction: "➖ घटाना",
    multiplication: "✖️ गुणा",
    division: "➗ भाग",

    questionLabel: "आपका सवाल है:",
    answerPlaceholder: "अपना जवाब लिखें",
    checkBtn: "उत्तर चेक करें",
    speakQuestionBtn: "🔊 सवाल सुनें",
    nextBtn: "अगला सवाल ➜",

    startMessage: "चलिए शुरू करते हैं! 😊",
    enterAnswer: "पहले अपना उत्तर लिखिए!",
    invalidAnswer: "कृपया सही संख्या लिखिए।",
    correctMessage: "🎉 बहुत बढ़िया! आपका जवाब बिल्कुल सही है। Good Job!",
    wrongMessage: "❌ आपका जवाब गलत है। सही उत्तर",
    tryAgain: "कोई बात नहीं! फिर से कोशिश कीजिए।",
    nextMessage: "अगले सवाल के लिए बटन दबाइए।",
    readyMessage: "अपना उत्तर लिखिए। शुभकामनाएँ! 😊",

    teacherHeading: "🤖 आपका AI Maths Teacher",
    teacherName: "मैथ्स टीचर",
    teacherWelcome: "नमस्ते बच्चे! मैं तुम्हें गणित सिखाने में मदद करूंगा।",
    teacherCorrect: "शानदार! आपका जवाब बिल्कुल सही है। ऐसे ही मेहनत करते रहिए!",
    teacherWrong: "कोई बात नहीं! सही उत्तर है। आप अगली बार जरूर सही करेंगे।",
    teacherSpeakBtn: "🔊 टीचर की बात सुनें",

    quizHeading: "🏆 अपना Maths Quiz खेलें",
    quizDescription: "सवालों के सही जवाब देकर अपना स्कोर बढ़ाइए।",
    quizStartBtn: "क्विज शुरू करें 🎮",

    footerText: "© 2026 Smart Maths Learning",
    footerSubText: "बच्चों के लिए बनाया गया ❤️",

    tableName: "का पहाड़ा",
    multiplyWord: "गुणा",
    equalsWord: "बराबर",
    speakQuestion: "बताइए",
    howMuch: "कितना होता है?",
    wrongVoice: "कोई बात नहीं। आपका जवाब सही नहीं है। सही उत्तर है",
    correctVoice: "बहुत बढ़िया! आपका जवाब बिल्कुल सही है। गुड जॉब! वेरी गुड!",
    retryVoice: "दोबारा कोशिश कीजिए।",
    selectLanguage: "हिंदी भाषा चुनी गई है।"
  },

  en: {
    pageTitle: "Smart Maths Learning - Learn Mathematics",
    tagline: "Learn Mathematics with Fun!",
    welcomeTitle: "Hello Children! 👋",
    welcomeText: "Let's make Mathematics easy and enjoyable.",

    languageHeading: "🌐 Choose Your Language",
    languageDescription: "Select your preferred language.",

    totalLabel: "Total Questions",
    correctLabel: "Correct Answers",
    wrongLabel: "Wrong Answers",

    tableHeading: "📖 Learn Tables (1 to 20)",
    tableDescription: "Select a multiplication table and learn.",
    tableSpeakBtn: "🔊 Listen to Table",

    practiceHeading: "➕ Maths Practice",
    practiceDescription: "Choose your mathematics topic.",

    addition: "➕ Addition",
    subtraction: "➖ Subtraction",
    multiplication: "✖️ Multiplication",
    division: "➗ Division",

    questionLabel: "Your Question:",
    answerPlaceholder: "Enter your answer",
    checkBtn: "Check Answer",
    speakQuestionBtn: "🔊 Listen to Question",
    nextBtn: "Next Question ➜",

    startMessage: "Let's get started! 😊",
    enterAnswer: "Please enter your answer first!",
    invalidAnswer: "Please enter a valid number.",
    correctMessage: "🎉 Excellent! Your answer is absolutely correct. Good Job!",
    wrongMessage: "❌ Your answer is incorrect. The correct answer is",
    tryAgain: "No problem! Please try again.",
    nextMessage: "Press the button for the next question.",
    readyMessage: "Enter your answer. Good Luck! 😊",

    teacherHeading: "🤖 Your AI Maths Teacher",
    teacherName: "Maths Teacher",
    teacherWelcome: "Hello student! I am here to help you learn Mathematics.",
    teacherCorrect: "Excellent! Your answer is absolutely correct. Keep working hard!",
    teacherWrong: "No problem! The correct answer is shown. You can do better next time.",
    teacherSpeakBtn: "🔊 Listen to Teacher",

    quizHeading: "🏆 Play Your Maths Quiz",
    quizDescription: "Answer questions correctly and increase your score.",
    quizStartBtn: "Start Quiz 🎮",

    footerText: "© 2026 Smart Maths Learning",
    footerSubText: "Made for Young Learners ❤️",

    tableName: "Multiplication Table of",
    multiplyWord: "times",
    equalsWord: "equals",
    speakQuestion: "Tell me",
    howMuch: "How much is it?",
    wrongVoice: "No problem. Your answer is incorrect. The correct answer is",
    correctVoice: "Excellent! Your answer is absolutely correct. Good Job! Very Good!",
    retryVoice: "Please try again.",
    selectLanguage: "English language selected."
  }

};


// SAFE TEXT UPDATE
function setText(id, value) {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = value;
  }
}


// CHANGE WEBSITE LANGUAGE
function changeLanguage() {

  currentLanguage =
    document.getElementById("languageSelect").value;

  localStorage.setItem("mathLanguage", currentLanguage);

  updateLanguage();

  showTable();

  const message =
    currentLanguage === "hi"
      ? "हिंदी भाषा चुनी गई है।"
      : "English language selected.";

  speak(message);

}


// UPDATE ALL WEBSITE TEXT
function updateLanguage() {

  const t = translations[currentLanguage];

  document.documentElement.lang = currentLanguage;
  document.title = t.pageTitle;

  setText("welcomeTitle", t.welcomeTitle);
  setText("welcomeText", t.welcomeText);

  setText("languageHeading", t.languageHeading);
  setText("languageDescription", t.languageDescription);

  setText("totalLabel", t.totalLabel);
  setText("correctLabel", t.correctLabel);
  setText("wrongLabel", t.wrongLabel);

  setText("tableHeading", t.tableHeading);
  setText("tableDescription", t.tableDescription);
  setText("tableSpeakBtn", t.tableSpeakBtn);

  setText("practiceHeading", t.practiceHeading);
  setText("practiceDescription", t.practiceDescription);

  setText("questionLabel", t.questionLabel);
  setText("checkBtn", t.checkBtn);
  setText("speakQuestionBtn", t.speakQuestionBtn);
  setText("nextBtn", t.nextBtn);

  setText("teacherHeading", t.teacherHeading);
  setText("teacherName", t.teacherName);
  setText("teacherSpeakBtn", t.teacherSpeakBtn);

  setText("quizHeading", t.quizHeading);
  setText("quizDescription", t.quizDescription);
  setText("quizStartBtn", t.quizStartBtn);

  setText("footerText", t.footerText);
  setText("footerSubText", t.footerSubText);

  // Operation Buttons
  document.querySelectorAll(".op-btn").forEach(button => {

    const op = button.dataset.op;

    if (op === "+") button.textContent = t.addition;
    if (op === "-") button.textContent = t.subtraction;
    if (op === "*") button.textContent = t.multiplication;
    if (op === "/") button.textContent = t.division;

  });

  // Input Placeholder
  document.getElementById("answer").placeholder =
    t.answerPlaceholder;

  // Welcome Message
  setText("teacherMessage", t.teacherWelcome);

  // Feedback
  setText("feedback", t.startMessage);

  // Table Selection
  const tableSelect = document.getElementById("tableSelect");

  tableSelect.querySelectorAll("option").forEach((option, index) => {
    const number = index + 1;

    option.textContent =
      currentLanguage === "hi"
        ? `पहाड़ा ${number}`
        : `Table ${number}`;
  });

}


// VOICE SYSTEM
function speak(text) {

  if (!("speechSynthesis" in window)) {
    return;
  }

  window.speechSynthesis.cancel();

  const message = new SpeechSynthesisUtterance(text);

  message.lang =
    currentLanguage === "hi" ? "hi-IN" : "en-US";

  message.rate = 0.85;
  message.pitch = 1;

  window.speechSynthesis.speak(message);

}


// CREATE TABLE OPTIONS
const tableSelect = document.getElementById("tableSelect");

for (let i = 1; i <= 20; i++) {

  const option = document.createElement("option");

  option.value = i;

  option.textContent =
    currentLanguage === "hi"
      ? `पहाड़ा ${i}`
      : `Table ${i}`;

  tableSelect.appendChild(option);

}


// SHOW MULTIPLICATION TABLE
function showTable() {

  const number = Number(tableSelect.value);
  let html = "";

  for (let i = 1; i <= 10; i++) {

    html +=
      `${number} × ${i} = ${number * i}<br>`;

  }

  document.getElementById("tableResult").innerHTML = html;

}


// READ MULTIPLICATION TABLE
function readTable() {

  const number = Number(tableSelect.value);
  let text = "";

  if (currentLanguage === "hi") {

    text = `${number} का पहाड़ा। `;

    for (let i = 1; i <= 10; i++) {
      text += `${number} गुणा ${i} बराबर ${number * i}। `;
    }

  } else {

    text = `Multiplication table of ${number}. `;

    for (let i = 1; i <= 10; i++) {
      text += `${number} times ${i} equals ${number * i}. `;
    }

  }

  speak(text);

}


// CHOOSE OPERATION
function chooseOperation(op, button) {

  operation = op;

  document.querySelectorAll(".op-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  button.classList.add("active");

  newQuestion();

}


// GENERATE QUESTION
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

    correctAnswer = Math.floor(Math.random() * 12) + 1;

    num2 = Math.floor(Math.random() * 10) + 1;

    num1 = correctAnswer * num2;

  }

  const symbol =
    operation === "*" ? "×" :
    operation === "/" ? "÷" :
    operation;

  setText("question", `${num1} ${symbol} ${num2} = ?`);

  document.getElementById("answer").value = "";

  const feedback = document.getElementById("feedback");

  feedback.textContent = translations[currentLanguage].readyMessage;

  feedback.className = "feedback";

}


// CHECK ANSWER
function checkAnswer() {

  const input = document.getElementById("answer");

  const feedback = document.getElementById("feedback");

  const teacher = document.getElementById("teacherMessage");

  const t = translations[currentLanguage];

  if (answered) {

    feedback.textContent = t.nextMessage;

    return;

  }

  if (input.value.trim() === "") {

    feedback.textContent = t.enterAnswer;

    speak(t.enterAnswer);

    return;

  }

  const userAnswer = Number(input.value);

  if (!Number.isFinite(userAnswer)) {

    feedback.textContent = t.invalidAnswer;

    return;

  }

  answered = true;

  stats.total++;

  if (userAnswer === correctAnswer) {

    stats.correct++;

    feedback.textContent = t.correctMessage;

    feedback.className = "feedback good";

    teacher.textContent = t.teacherCorrect;

    speak(t.correctVoice);

  } else {

    stats.wrong++;

    feedback.textContent =
      `${t.wrongMessage} ${correctAnswer}.`;

    feedback.className = "feedback bad";

    teacher.textContent =
      currentLanguage === "hi"
        ? `कोई बात नहीं! सही उत्तर ${correctAnswer} है। अगली बार फिर कोशिश करें।`
        : `No problem! The correct answer is ${correctAnswer}. Try again next time.`;

    speak(`${t.wrongVoice} ${correctAnswer}. ${t.retryVoice}`);

  }

  updateStats();

}


// UPDATE SCORE
function updateStats() {

  setText("total", stats.total);
  setText("correct", stats.correct);
  setText("wrong", stats.wrong);

  localStorage.setItem(
    "mathStats",
    JSON.stringify(stats)
  );

}


// SPEAK QUESTION
function speakQuestion() {

  let symbol;

  if (currentLanguage === "hi") {

    symbol =
      operation === "+" ? "जोड़" :
      operation === "-" ? "घटाना" :
      operation === "*" ? "गुणा" : "भाग";

    speak(
      `बताइए ${num1} ${symbol} ${num2} कितना होता है?`
    );

  } else {

    symbol =
      operation === "+" ? "plus" :
      operation === "-" ? "minus" :
      operation === "*" ? "times" : "divided by";

    speak(
      `What is ${num1} ${symbol} ${num2}?`
    );

  }

}


// TEACHER VOICE
function speakTeacher() {

  speak(
    document.getElementById("teacherMessage").textContent
  );

}


// ENTER KEY SUPPORT
document.getElementById("answer").addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Enter") {
      checkAnswer();
    }

  }
);


// TABLE SELECTION EVENT
tableSelect.addEventListener("change", showTable);


// INITIALIZE WEBSITE
document.getElementById("languageSelect").value =
  currentLanguage;

updateLanguage();

showTable();

updateStats();

newQuestion();
