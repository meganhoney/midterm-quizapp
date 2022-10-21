$(document).ready(function () {

  let getId = document.location.href.split("/");
  let id = getId.pop();

  const loadResult = function () {

    $.ajax(`/api/my_quizzes/${id}`, {
      method: "GET"
    })
      .then((response) => {
        displayResult(response[0]);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  loadResult();

  const displayResult = (quizResults) => {
    console.log(quizResults)
    const $sectionDetails = $('.details');
    const $sectionShare = $('.share');
    const text = `
    <h1>
    ${quizResults.title}
    </h1>
    <ul class='ul-details'>
    <li>Creator: ${quizResults.name}</li>
    <li>Topic: ${quizResults.topic}</li>
    <li>Total Attempts: ${quizResults.number_of_attempts}</li>
    <li>Date Created: ${quizResults.created_at}</li>
    </ul>

    <div class="table-responsive-xl">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Correct Answers</th>
            <th scope="col">Total Questions</th>
            <th scope="col">Score</th>
            <th scope="col">Attemp</th>
          </tr>
        </thead>
        <tbody id="result-id">
        </tbody>
      </table>
    </div>

    <!-- The text field -->
    <input type="text" value='http://localhost:8080/my_quizzes/${id}' id="myInput">

    <!-- The button used to copy the text -->
    <button id="share_button">Share URL</button>

    `;

    $sectionDetails.append(text);
    createRows(quizResults.results);

  }

  const createRows = (results) => {
    $rows = $('#result-id');
    let counter = 1;
    let html = "";
    for (const each of results) {
      html += `
      <tr>
        <th scope="row">${counter}</th>
        <td>${each.name}</td>
        <td>${each.correct_answers}</td>
        <td>${each.total_questions}</td>
        <td>${each.score}</td>
        <td>${each.created_at}</td>
      </tr>

      `;
      counter++;
    }
    $rows.append(html);


    $("#share_button").click(() => {
      const $temp = $("#myInput");
      $temp.select();
      document.execCommand("copy");
      alert(`Copied URL: http://localhost:8080/attempted/${id}
      `);
    });
  }

});
