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
        <td><a href="/${quiz.id}">${quiz.title}</a></td>
        <td>${quiz.topic}</td>
        <td>${dateString}</td>
        <td><a href="http://localhost:8080/${quiz.id}" class="btn share-button" id="share${quiz.id}" role="button">Share</a></td>
      </tr>
    `;

    const id = "${quiz.id}";
    const $shareButton= $("#share"+`${quiz.id}`);
    $shareButton.click((event) => {;
      event.preventDefault();
      let hrefValue = $shareButton.attr('href');//get the href property of the current clicked element
      console.log('hrefValue : ' + hrefValue);
    });

    return $quiz;
  };



  const displayAllQuizzes = function (quizzes) {



    const $quiz = $("#quiz-tbody");
    for (let key of Object.keys(quizzes)) {
      console.log(quizzes[key]);
      $(createQuizRow(quizzes[key])).appendTo($quiz);
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
    $.ajax("/api/users/my_results", {
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
        <td>${result.quiz}</td>
        <td>${dateString}</td>
        <td><a href="/attempted/${result.quiz_id}">${result.score}%</a></td>
      </tr>
    `;
    return $result;
  };

  const displayMyResults = function (myQuizzes) {
    const $results = $("#my-results-table");
    for (let key of Object.keys(myQuizzes)) {
      $(createMyResultRow(myQuizzes[key])).appendTo($results);
    }
  };
});
