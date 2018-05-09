angular.module('examtimechatapplication').controller('CreateQuizController', CreateQuizController);

function CreateQuizController($http){
  var vm = this;

  vm.addQuestion = function(){
    var quiz={
      sentto:vm.sentto,
      quizName: vm.quizName,
       qstn1: vm.qstn1,
       ans1_1: vm.ans1_1,
       ans1_2:vm.ans1_2,
       corr1:vm.corr1,
       qstn2: vm.qstn2,
       ans2_1: vm.ans2_1,
       ans2_2:vm.ans2_2,
       corr2:vm.corr2,
       qstn3: vm.qstn3,
       ans3_1: vm.ans3_1,
       ans3_2:vm.ans3_2,
       corr3:vm.corr3,
       qstn4: vm.qstn4,
       ans4_1: vm.ans4_1,
       ans4_2:vm.ans4_2,
       corr4:vm.corr4,
       qstn5: vm.qstn5,
       ans5_1: vm.ans5_1,
       ans5_2:vm.ans5_2,
       corr5:vm.corr5
    }
    $http.post('/api/createQuiz/createQuiz', quiz).then(function(result){
      console.log(result);
      vm.message = 'Quiz created.';
      vm.error = '';
    }).catch(function(error){
      console.log(error);
    })
    console.log("In Quiz Controller", quizName);
    }


vm.fetchQuiz= function(){
  //var quizName=vm.quizName;
  var quizName= vm.quizName;
  console.log("Quiz name in fetch", quizName);
  $http.get('/api/fetchQuiz/getQuiz', {params:{quizName: quizName}}).then(function(result){
    console.log(result.data[0].quizName);
    //vm.message = 'Quiz Fetched.';
    //vm.error = '';
    vm.quizName= result.data[0].quizName;
  vm.qstn1= result.data[0].qstn1;
  vm.ans1_1= result.data[0].ans1_1;
  vm.ans1_2=result.data[0].ans1_2;
  vm.corr1=result.data[0].corr1;
  vm.qstn2= result.data[0].qstn2;
  vm.ans2_1= result.data[0].ans2_1;
  vm.ans2_2=result.data[0].ans2_2;
  vm.corr2=result.data[0].corr2;
  vm.qstn3= result.data[0].qstn3;
  vm.ans3_1= result.data[0].ans3_1;
  vm.ans3_2=result.data[0].ans3_2;
  vm.corr3=result.data[0].corr3;
  vm.qstn4= result.data[0].qstn4;
  vm.ans4_1= result.data[0].ans4_1;
  vm.ans4_2=result.data[0].ans4_2;
  vm.corr4=result.data[0].corr1;
  vm.qstn5= result.data[0].qstn5;
  vm.ans5_1= result.data[0].ans5_1;
  vm.ans5_2=result.data[0].ans5_2;
  vm.corr5=result.data[0].corr5;
  vm.message='true';
  }).catch(function(error){
    console.log(error);
  })

}


vm.submitQuiz = function(){
  var sendscoreto=vm.sendscoreto;
  var quizName= vm.quizName;
  var qstn1_ans= vm.qstn1_ans;
  var qstn2_ans= vm.qstn2_ans;
  var qstn3_ans= vm.qstn3_ans;
  var qstn4_ans= vm.qstn4_ans;
  var qstn5_ans= vm.qstn5_ans;


  $http.get('/api/fetchQuiz/getQuiz', {params:{quizName: quizName}}).then(function(result){
    var score =0;

    console.log(result);

    var corr1=result.data[0].corr1;
    var corr2=result.data[0].corr2;
    var corr3=result.data[0].corr3;
    var corr4=result.data[0].corr4;
    var corr5=result.data[0].corr5;
    if(qstn1_ans=== corr1){
      score++;
    }if(qstn2_ans=== corr2){
      score++;
    }if(qstn3_ans=== corr3){
      score++;
    }if(qstn4_ans=== corr4){
      score++;
    }if(qstn5_ans=== corr5){
      score++;
    }
    var updateScore={
      score: score,
      sendscoreto:sendscoreto,
      quizName: quizName
    };
    $http.post('/api/createQuiz/sendScore', updateScore).then(function(result){
    }).catch(function(error){
      console.log(error);
    })

  vm.quizmessage = 'Quiz Submitted and the score is sent to the email address provided.';
  vm.message="Success";
    vm.error = '';
  }).catch(function(error){
    console.log(error);
  })
  console.log("In Quiz Controller", quizName);
  }

};
