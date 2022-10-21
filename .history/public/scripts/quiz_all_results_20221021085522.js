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

    `;

    $sectionDetails.append(text);

    const shareText = `
    <!-- The text field -->
    <input type="text" value='http://localhost:8080/my_quizzes/${id}' id="myInput">

    <!-- The button used to copy the text -->
    <button id="share_button">Share URL</button>
    `;

    $sectionShare.append(shareText);

    $("#share_button").click(() => {
      const $temp = $("#myInput");
      $temp.select();
      document.execCommand("copy");
      alert(`Copied URL: http://localhost:8080/attempted/${id}
      `);
    });

  }

});
