$(document).ready(function() {

  $(".create-question").change(function() {
    const id = this.id.split("-").pop();
    const $val = $(this).val();
    const $input = $(`#question-input-${id}`);

    if($val === "1") {
      $(generateMultipleChoiceInput(id)).appendTo($input);
    } else if($val === "2") {
      $(generateFillBlankInput).appendTo($input);
    } else if($val === "Question Type") {
      $input.empty();
    }
  })
});
