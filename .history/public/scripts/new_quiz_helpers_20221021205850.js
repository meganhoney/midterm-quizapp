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
  <div class="d-flex mb-3">
          <label for="q${id}-text" class="form-label">Question:</label>
          <input type="text" class="form-control ml-2 question-text" id="q${id}-text" placeholder="Type question text here then use button to insert blank space">
          <button type="button" class="btn btn-sm btn-outline-dark text-nowrap insert-blank">Insert blank space</button>
        </div>
        <div class="d-flex mb-3">
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

// const getQuizURL = function () {
//   $.ajax(`/api/quizzes/`, {
//     method: "GET"
//   })
//     .then((response) => {

//     })
//     .catch((err) => {
//       console.log("Error: ", err);
//     })
//   };
