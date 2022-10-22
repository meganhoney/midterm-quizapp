// generate html markup to add additional question(s)
const generateAdditionalQuestion = function(id){
  const $newQuestion = `
  <div class="d-flex mb-3">
    <label for="question-${id}" class="form-label">Question ${id}</label>
    <select class="form-select ml-2 create-question" id="question-${id}">
      <option selected>Question Type</option>
      <option value="1">Multiple Choice</option>
      <option value="2">Fill in the blank</option>
    </select>
  </div>
  <div id="question-input-${id}" class="mb-3 question-input"></div>
  `;
  return $newQuestion;
}

// generate html markup for multiple choice question creation
const generateMultipleChoiceInput = function(id) {
  const $multipleChoice = `
  <div class="d-flex mb-3">
    <label for="quiz-question-text" class="form-label">Question:</label>
    <input type="text" class="form-control ml-2 question-text" id="q${id}-text" placeholder="Please type your question">
  </div>
  <div class="input-group mb-3>
    <fieldset>
      <legend class="d-flex">Options:</legend>
      <div class="ml-2">
        <input type="text" class="form-control option-text-${id} option">
      </div>
      <div class="ml-2">
        <input type="text" class="form-control option-text-${id} option">
      </div>
      <div class="ml-2">
        <input type="text" class="form-control option-text-${id} option">
      </div>
      <div class="ml-2">
        <input type="text" class="form-control option-text-${id}" >
      </div>
    </fieldset>
    </div>
    <div class="d-flex mb-3 mt-3">
        <label for="q${id}-answer" class="form-label">Answer:</label>
        <input type="text" class="form-control ml-2" id="q${id}-answer" name="answers${id - 1}" placeholder="Type the correct answer">
    </div>
  `
  return $multipleChoice;
};
// generate html markup for fill in the blank question creation
const generateFillInTheBlankInput = function(id) {
  const $fillInTheBlank = `
  <div class="d-flex mb-4">
          <label for="q${id}-text" class="form-label">Question:</label>
          <input type="text" class="form-control ml-2 question-text" id="q${id}-text" placeholder="Type question text here then use button to insert blank space">
          <button type="button" class="btn btn-sm btn-outline-dark text-nowrap insert-blank">Insert blank space</button>
        </div>
        <div class="d-flex mb-4">
          <label for="q${id}-answer" class="form-label">Answer:</label>
          <input type="text" class="form-control ml-2" id="q${id}-answer" name="answers${id-1}" placeholder="Type the word that fills in the blank">
      </div>
  `;

  return $fillInTheBlank;
};

const getAllOptions = function(id){
//create array with all options
  let options = [];
  $(`.option-text-${id}`).each(function () {
    options.push($(this).val());
  });

  return options;
};

const quizCreatedSuccess = function(id) {
  let quizSuccessMessage = `
  <div class="success-message p-3 d-flex flex-column align-items-center">
  <h2>Quiz Created Successfully!</h2>
  <div class="input-group share d-flex">
    <input type="text" class="form-control" value='http://localhost:8080/${id}' id="shareNewQuiz">
      <div class="input-group-append">
        <button type="button" class="btn btn-outline-secondary share-button" id="shareQuizUrl">Share</button>
      </div>
    </div>
  </div>
  `;
  return quizSuccessMessage;
};

const shareNewQuiz = function(id) {
  $("#shareQuizUrl").click(() => {
    const $temp = $("#shareNewQuiz");
    $temp.select();
    document.execCommand("copy");
    alert(`Copied URL: http://localhost:8080/${id}
    `);
  });
}

