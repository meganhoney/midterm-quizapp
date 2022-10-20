$(document).ready(function() {

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
