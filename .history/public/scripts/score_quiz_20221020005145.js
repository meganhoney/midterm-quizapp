$(document).ready(function () {

  const loadResult = function () {
    let getId = document.location.href.split("/");
    let id = getId.pop();
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
    const text = `
    <h1>
    ${result.title}
    </h1>
    <ul>
    <li>Name: </li>
    </ul>
    `;
    $sectionDetails.append(text);
  }
});
