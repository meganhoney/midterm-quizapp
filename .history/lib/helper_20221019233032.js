const validateAnswers = (quiz, answers) => {
  let correctAnswers = 0;
  const resultObj = {};

  for (const each of quiz.questions) {
    //console.log("answers", each.answers);
    //check if multiple answers or just one
    if (each.answers.length === 1) {
      //actual vs guess answer
      // console.log(each.answers[0].answer, " vs ", answers[each.id]);
      if (each.answers[0].answer.toUpperCase().trim() === answers[each.id].toUpperCase().trim()) {
        correctAnswers++;
      }
    } else if (each.answers.length === answers[each.id].length) {
      let correct = true

      for (const actual of each.answers) {
        const guessAnswers = answers[each.id];
        correct = guessAnswers.some(element => {
          //console.log(actual.answer.toUpperCase().trim(), " vs ", element.toUpperCase().trim());
          return element.toUpperCase().trim() === actual.answer.toUpperCase().trim();
        })
        if (!correct) {
          break;
        }
      }

      if (correct) {
        correctAnswers++;
      }
    }
    // console.log('correct answer', correctAnswers);
  }
  resultObj.correctAnswers = correctAnswers;
  resultObj.totalQuestions = quiz.questions.length;
  resultObj.score = Math.round(correctAnswers / quiz.questions.length * 100);
  return resultObj;
}

m