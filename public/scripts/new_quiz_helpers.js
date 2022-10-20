// generate html markup for multiple choice question creation
const generateMultipleChoiceInput = function(id) {
  const $multipleChoice = `
  <label for="quiz-question-text" class="form-label">Question:</label>
  <input type="text" class="form-control mb-2" id="q${id}-text" placeholder="Please type your question">
  <div class="d=flex">
    <div class="input-group mb-3">
      <fieldset class="d-flex">
        <legend>Answers:</legend>
          <input type="text" class="form-control" aria-label="Text input with checkbox">
          <div class="input-group-text">
            <input class="form-check-input" type="checkbox" value="q${id}-option-1" id="q${id}-correct-1" aria-label="Checkbox to indicate correct answer">
            <label for="q${id}-correct-1">is correct</label>
          </div>
          <input type="text" class="form-control" aria-label="Text input with checkbox">
          <div class="input-group-text">
            <input class="form-check-input" type="checkbox" value="q${id}-option-2" id="q${id}-correct-2" aria-label="Checkbox to indicate correct answer">
            <label for="q${id}-correct-2">is correct</label>
          </div>
          <input type="text" class="form-control" aria-label="Text input with checkbox">
          <div class="input-group-text">
            <input class="form-check-input" type="checkbox" value="q${id}-option-3" id="q${id}-correct-3" aria-label="Checkbox to indicate correct answer">
            <label for="q${id}-correct-3">is correct</label>
          </div>
          <input type="text" class="form-control" aria-label="Text input with checkbox">
          <div class="input-group-text">
            <input class="form-check-input" type="checkbox" value="q${id}-option-4" id="q${id}-correct-4" aria-label="Checkbox to indicate correct answer">
            <label for="q${id}-correct-4">is correct</label>
          </div>
    </fieldset>
    </div>
  </div>
  `
  return $multipleChoice;
};

const generateFillInTheBlankInput = function(id) {
  const $fillInTheBlank = `
  <div class="d-flex mb-3">
          <label for="qID-text" class="form-label">Question:</label>
          <input type="text" class="form-control ml-2" id="q${id}-text" placeholder="Type question text here then use button to insert blank space">
          <button type="button" class="btn btn-sm btn-outline-dark text-nowrap insert-blank">Insert blank space</button>
        </div>
        <div class="d-flex mb-3">
          <label for="q${id}-answer" class="form-label">Answer:</label>
          <input type="text" class="form-control ml-2" id="QUESTIONB" placeholder="Type the word that fills in the blank">
      </div>
  `;

  return $fillInTheBlank;
}
