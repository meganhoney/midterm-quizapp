$(document).ready(function () {

  /*
  Ajax request to display name of logged in user in nav
  */
  const displayUser = function () {

    $.ajax("/api/users/user", {
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

  /*
  Ajax request and functions to display all quizzes that are public
  */
  const loadAllQuizzes = function () {
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

  const createQuizRow = function (quiz) {
    const theDate = new Date(quiz.created_at);
    const dateString = theDate.toGMTString();
    let $quiz = `
      <tr>
        <td>${quiz.id}</td>
        <td class="quiz-title"><a href="/${quiz.id}">${quiz.title}</a></td>
        <td>${quiz.topic}</td>
        <td>${dateString}</td>
        <td><a href="http://localhost:8080/${quiz.id}" class="btn share-button" id="share${quiz.id}" role="button">Share</a></td>
      </tr>
    `;

    return $quiz;
  };


  const displayAllQuizzes = function (quizzes) {

    const $quiz = $("#quiz-tbody");
    for (let key of Object.keys(quizzes)) {
      $(createQuizRow(quizzes[key])).appendTo($quiz);


      const id = `${quizzes[key].id}`;
      const $shareButton = $('#share' + id);
      $shareButton.click((event) => {
        event.preventDefault();
        let hrefValue = $shareButton.attr('href');//get the href property of the current clicked element
        // Copy the text inside the text field
        navigator.clipboard.writeText(hrefValue);
        alert("Link copied: " + hrefValue);
      });

    }


  };

  /*
  Ajax request and functions to display all quizzes created by the logged in user
  */
  const loadMyQuizzes = function () {
    $.ajax("/api/users/my_quizzes", {
      method: "GET"
    })
      .then((response) => {
        displayMyQuizzes(response);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  loadMyQuizzes();

  const createMyQuizRow = function (quiz) {
    let $myQuiz = `
      <tr>
        <td>${quiz.id}</td>
        <td><a href="/${quiz.id}">${quiz.title}</a></td>
        <td>${quiz.topic}</td>
        <td><a href='/my_quizzes/${quiz.id}'>${quiz.number_of_attempts}</a></td>
      </tr>
    `;
    return $myQuiz;
  };

  const displayMyQuizzes = function (myQuizzes) {
    const $quiz = $("#my-quiz-table");
    for (let key of Object.keys(myQuizzes)) {
      $(createMyQuizRow(myQuizzes[key])).appendTo($quiz);
    }
  };


  /*
  Ajax request and functions to display all results of logged in user
  */
  const loadMyResults = function () {
    $.ajax("/api/attempted/", {
      method: "GET"
    })
      .then((response) => {
        displayMyResults(response);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  loadMyResults();

  const createMyResultRow = function (result) {
    const theDate = new Date(result.created_at);
    const dateString = theDate.toGMTString();
    let $result = `
      <tr>
        <td><a href="/${quiz_id}">${result.quiz}</a></td>
        <td>${dateString}</td>
        <td><a href="/attempted/${result.id}">${result.score}%</a></td>
      </tr>
    `;
    return $result;
  };

  const displayMyResults = function (myResults) {
    const $results = $("#my-results-table");
    for (let key of Object.keys(myResults)) {
      $(createMyResultRow(myResults[key])).appendTo($results);
    }
  };
});
