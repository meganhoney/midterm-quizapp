$(document).ready(function() {

  const displayUser = function() {
    // should use cookies somewhere instead of this
    $.ajax("/api/users", {
      method: "GET"
    })
    .then((response) => {
      const username = `
      <a class="nav-item nav-link" href="#">
      ${response.users[0].name}
      </a>
      `;
      const $user = $("#user");
      $(username).prependTo($user);
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
  }

  displayUser();

  const loadQuizzes = function() {
    $.ajax("/api/quizzes", {
      method: "GET"
    })
    .then((response) => {
      displayAllQuizzes(response);
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
  };

  loadQuizzes();

  const createQuizRow = function(quiz) {
    // html markup for row in quiz table
    let $quiz = `
      <tr>
        <td>${quiz.id}</td>
        <td><a href="/${quiz.id}">${quiz.title}</a></td>
        <td>${quiz.topic}</td>
      </tr>
    `;
    return $quiz;
  };

  const displayAllQuizzes = function(quizzes) {
    const $quiz = $("#quiz-table");
    for (let key of Object.keys(quizzes)) {
      $(createQuizRow(quizzes[key])).appendTo($quiz);
    }
  };

  const loadQuiz = function() {
    $.ajax("/api/quizzes/1", {
      method: "GET"
    })
    .then((response) => {
      displayQuizTitle(response);
      displayQuizOptions(response);
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
  };

  loadQuiz();

  // Create and display h2 for quiz
  const createQuizTitle = function(quiz) {
    const $quizTitle = `
      <h2>${quiz.title}</h2>
    `;
    return $quizTitle;
  }

  const displayQuizTitle = function(quiz) {
    const $quizTitle = $("#quiz-title");
    $(createQuizTitle(quiz)).appendTo($quizTitle);
  }

  // Create and display questions for quiz
  const createQuizOptions = function(quiz) {
    const $multipleChoice = `
    <div class="form-check">
      <input class="form-check-input" type="radio" name="question1" id="question1">
      <label class="form-check-label" for="question1">
        ${quiz.questions[0].options[0].option}
      </label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="question2" id="question2">
      <label class="form-check-label" for="question2">
      ${quiz.questions[0].options[1].option}
      </label>
    </div>
    <div class="form-check">
    <input class="form-check-input" type="radio" name="question2" id="question2">
    <label class="form-check-label" for="question2">
    ${quiz.questions[0].options[2].option}
    </label>
    </div>
    <div class="form-check">
    <input class="form-check-input" type="radio" name="question2" id="question2">
    <label class="form-check-label" for="question2">
    ${quiz.questions[0].options[3].option}
    </label>
    </div>
    `;

    return $multipleChoice;
  }

  const displayQuizOptions = function(quiz) {
    const $quizQuestion = $("#quiz-questions");
    $(createQuizOptions(quiz)).prependTo($quizQuestion);
  }
});
