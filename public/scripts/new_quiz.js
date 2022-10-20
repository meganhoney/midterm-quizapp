$(document).ready(function() {

  $(".create-question").change(function() {
    const id = this.id.split("-").pop();
    const $val = $(this).val();
    const $input = $(`#question-input-${id}`);
    if($val === "1") {
      $input.empty();
      $(generateMultipleChoiceInput(id)).appendTo($input);
    } else if($val === "2") {
      $input.empty();
      $(generateFillInTheBlankInput(id)).appendTo($input);
      $(".insert-blank").click(function() {
        const $id = $(this).prev().attr("id");
        const $textToEdit = ($(this).prev().val());
        const $blank = "_____ ";
        const $cursorPosition = document.getElementById(`${$id}`).selectionStart;
        $(`#${$id}`).val($textToEdit.slice(0, $cursorPosition)+$blank+$textToEdit.slice($cursorPosition));
      });
    } else if($val === "Question Type") {
      $input.empty();
    }
  });


});
