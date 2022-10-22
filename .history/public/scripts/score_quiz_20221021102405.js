$(document).ready(function () {

  let getId = document.location.href.split("/");
  let id = getId.pop();

  const loadResult = function () {

    $.ajax(`/api/attempted/${id}`, {
      method: "GET"
    })
      .then((response) => {
        displayResult(response);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  loadResult();

  const displayResult = (result) => {
    const theDate = new Date(result.created_at);
    const dateString = theDate.toGMTString();
    const $sectionDetails = $('.details');
    const $sectionShare = $('.share');
    const text = `
    <h1>
    ${result.title}
    </h1>
    <ul>
    <li>Name: ${result.name}</li>
    <li>Correct Answers: ${result.correct_answers}</li>
    <li>Total Questions: ${result.total_questions}</li>
    <li>Score: ${result.score}%</li>
    <li>Last Date Attempt: ${date}</li>
    </ul>
    `;

    $sectionDetails.append(text);

    const shareText = `


    <div class="input-group">
      <input type="text" class="form-control" value='http://localhost:8080/attempted/${id}' id="myInput">
      <div class="input-group-append">
        <button type="button" class="btn btn-outline-secondary" id="share_button">Share</button>
      </div>
    </div>
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
