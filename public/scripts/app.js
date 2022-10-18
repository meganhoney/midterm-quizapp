$(document).ready(function() {
  console.log('data');

  const loadQuizzes = function() {
    $.ajax("/api/quizzes", {
      method: "GET"
    })
      .then((response) => {
        displayQuizzes(response);
      });
  };

  loadQuizzes();

  const createQuizRow = function(quiz) {
    // html markup
    let $quiz = `
      <tr>
        <td>${quiz.id}</td>
        <td><a href="#">${quiz.title}</a></td>
        <td>${quiz.topic}</td>
      </tr>
    `;
    return $quiz;
  };

  const displayQuizzes = function(quizzes) {

    const $quiz = $("#quiz-table");
    for (let key of Object.keys(quizzes)) {
      $(createQuizRow(quizzes[key])).appendTo($quiz);
    }
  };
});
