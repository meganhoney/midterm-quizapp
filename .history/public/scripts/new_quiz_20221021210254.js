$(document).ready(function() {
// create form submission object
  const formData = {
    user_id: 1,
  };

  $("#add-question").click(function() {
    // count number of inputs currently on page
    let $id = $(".question-input").length;
    let $optArr = $id - 1;
    // add options from previous question to formData
    if(getAllOptions($id).length) {
      formData["options"+$optArr] = getAllOptions($id);
    }
    // max 20 questions
    if($id <= 20) {
      $("#add-question").prev().append(generateAdditionalQuestion($id+1));
      createQuestionInputs();
    }
  });

  const createQuestionInputs = function() {
    $(".create-question").change(function() {
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
    event.preventDefault();
    // get options for last question
    const numOfQuestions = $(".question-input").length;
    formData["options"+(numOfQuestions - 1)] = getAllOptions(numOfQuestions);
    // Add title and topic to form object
    formData.title = $("#quiz-title").val();
    formData.topic = $("#quiz-topic").val();
    // add public/private
    if($("#quiz-private").checked) {
      formData.public = false;
    } else {
      formData.public = true;
    };

    // get all create-question values and add to array, then add to formData object
    let questions_typeArray = [];
    $(".create-question").each(function(){
      if($(this).val() === "1"){
        questions_typeArray.push('Multiple Choice')
      } else if($(this).val() === "2") {
        questions_typeArray.push('Fill in the blank');
      }
    });
    formData.questions_type = questions_typeArray;

    // get all question-text values, add to array, add to formData
    let questionsArray = [];
    $(".question-text").each(function() {
      questionsArray.push($(this).val());
    });
    formData.questions = questionsArray;

    // get all answers
    const fillInTheBlankAnswers = $(this).serializeArray();
    for(obj of fillInTheBlankAnswers) {
      formData[obj.name] = [obj.value];
    }

    console.log(formData);

    // check form has title, topic, at least one question and one answer
    if(formData.title) {
      console.log('success');
      $("main").html("<p>Done</p>");
      $.ajax({
        type: "POST",
        url: "/api/quizzes/",
        data: formData,
      })
      .then((response) => {
        console.log(response)
        $("main").html("<p>Quiz Completed</p>");
      })
      .catch((err) => {
        console.log('Err: ', err);
      })
    } else {
      alert('Please fill out all fields');
    }

    });

});
