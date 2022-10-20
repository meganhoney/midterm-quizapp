$(document).ready(function() {

  const loadResult = function() {
    let getId = document.location.href.split("/");
    let id = getId.pop();    let getId = document.location.href.split("/");
    let id = getId.pop();
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

  loadResult();
});
