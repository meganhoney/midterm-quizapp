$(document).ready(function () {

  const loadQuiz = function () {
    let getId = document.location.href.split("/");
    let id = getId.pop();
    $.ajax(`/api/quizzes/${id}`, {
      method: "GET"
    })
      .then((response) => {
        displayQuizTitle(response);
        displayQuizQuestions(response);
        displayQuizOptions(response);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  loadQuiz();

  // Create and display h2 for quiz (title)
  const createQuizTitle = function (quiz) {
    const $quizTitle = `
      <h2>${quiz.title}</h2>
    `;
    return $quizTitle;
  }

  const displayQuizTitle = function (quiz) {
    const $quizTitle = $("#quiz-title");
    $(createQuizTitle(quiz)).appendTo($quizTitle);
  }

  // Create and display questions for quiz
  const displayQuizQuestions = function (quiz) {
    const $quizQuestions = quiz.questions;
    for (let q of $quizQuestions) {
      let $quizQuestion = `
        <article id="question${q.id}" class="quiz-question">
        <p>${q.question}</p>
        </article>
      `;
      const $quizQuestionText = $("#quiz-questions");
      $($quizQuestion).appendTo($quizQuestionText);
    }
  }

  // Create and display options (possible answers) for quiz
  const displayQuizOptions = function (quiz) {
    const $quizQuestions = quiz.questions;
    for (let q of $quizQuestions) {
      if (q.question_type === 'Fill in the blank') {
        let $quizBlank = `
        <div class="form-group">
        <label for="blank-question${q.id}" class="form-label">Fill in the blank:</label>
        <input type="text" class="form-control fill-in-blank" id="blank-question${q.id}" name="${q.id}">
        </div>
        `;
        const $quizBlanks = $(`#question${q.id}`);
        $($quizBlank).appendTo($quizBlanks);
      }
      const options = q.options;
      for (let o of options) {

        if (q.question_type === 'Multiple Choice') {
          let $quizOption = `
            <div class="form-check">
              <input class="form-check-input" type="radio" id="option${o.id}" name="${q.id}" value="${o.option}">
              <label class="form-check-label" for="option${o.id}">
                ${o.option}
              </label>
            </div>
          `;
          const $quizOptions = $(`#question${q.id}`);
          $($quizOption).appendTo($quizOptions);
        }

      }
    }
    //send the quiz using hidden input
    let $hiddenInput = `
      <div class="form-group">
        <input type="hidden" name="quizObj" value="${quiz.id}"/>
      <div class="form-group">
        `;
        const $quizQuestionText = $("#quiz-questions");
    $($hiddenInput).appendTo($quizQuestionText);
  }

});
