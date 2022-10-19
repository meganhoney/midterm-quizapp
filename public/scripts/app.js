$(document).ready(function() {

  const displayUser = function() {

    $.ajax("/api/users", {
      method: "GET"
    })
    .then((response) => {
      const username = `
      <a class="nav-item nav-link" href="#">
      ${response.user[0].name}
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

  const loadAllQuizzes = function() {
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

  loadAllQuizzes();

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

});
