$(document).ready(function() {

  $(".create-question").change(function() {
    const id = this.id.split("-").pop();
    const val = this.value
    console.log(val);
      if(val === "1") {
        const $input = $(`#question-input-${id}`);
        $("<p>TEST</p>").appendTo($input);
      }
  })
});
