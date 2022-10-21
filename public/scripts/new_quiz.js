$(document).ready(function() {
  $("#add-question").click(function() {
    // count number of inputs currently on page
    let $id = $(".question-input").length + 1;
    // max 20 questions
    if($id <= 20) {
      $("#add-question").prev().append(generateAdditionalQuestion($id));
      createQuestionInputs();
    }

  });

  const createQuestionInputs = function() {
    $(".create-question").change(function() {
      console.log($(this));
    const $id = this.id.split("-").pop();
    const $val = $(this).val();
    const $input = $(`#question-input-${$id}`);
    if($val === "1") {
      $input.empty();
      $(generateMultipleChoiceInput($id)).appendTo($input);
    } else if($val === "2") {
      $input.empty();
      $(generateFillInTheBlankInput($id)).appendTo($input);
      // insert blank into fill in the blank question input
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
  };

  createQuestionInputs();

  $("#new-quiz-form").submit(function(event){
    const formData = {
      user_id: 2,
      title: $("#quiz-title").val(),
      topic: $("#quiz-topic").val(),
      public: $("#quiz-public").val()
    };
    console.log(formData);
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/api/quizzes",
      data: formData,
    }).done(function (data) {
      console.log(data);
    });

    event.preventDefault();
  });
});
