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

  const createQuizElement = function(quiz) {
    // html markup
    let $quiz = `
      <article>
      <table>
        <p>${quiz.title}</p>
      </article>
    `;
    return $quiz;
  };

  const displayQuizzes = function(quizzes) {

    const $quizzes = $("#quizzes").empty();
    console.log(quizzes);
    for (let key of Object.keys(quizzes)) {
      $(createQuizElement(quizzes[key])).appendTo($quizzes);
    }
  };
});
