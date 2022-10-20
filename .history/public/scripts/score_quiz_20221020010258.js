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
    <li>Last Date Attempt: ${result.created_at}</li>
    </ul>
    `;

    const shareText = `
    <!-- The text field -->
    <input type="text" value=${} id="myInput">

    <!-- The button used to copy the text -->
    <button onclick="myFunction()">Copy text</button>
    `;
    $sectionDetails.append(text);
  }
});
