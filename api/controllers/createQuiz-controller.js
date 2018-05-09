var mongoose = require('mongoose');
var Quiz = mongoose.model('Quizes');
var nodemailer = require('nodemailer');
var mailer = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'hchaundkar@gmail.com',
            pass: 'nikunj23'
        }
    });

//Creating quiz

module.exports.createQuiz = function(req, res){
  console.log('Create Quiz Controller: createQuiz()');
  var sendto= req.body.sentto;
  var quizName= req.body.quizName;
    var qstn1= req.body.qstn1;
    var ans1_1= req.body.ans1_1;
    var ans1_2=req.body.ans1_2;
    var corr1=req.body.corr1;
    var qstn2= req.body.qstn2;
    var ans2_1= req.body.ans2_1;
    var ans2_2=req.body.ans2_2;
    var corr2=req.body.corr2;
    var qstn3= req.body.qstn3;
    var ans3_1= req.body.ans3_1;
    var ans3_2=req.body.ans3_2;
    var corr3=req.body.corr3;
    var qstn4= req.body.qstn4;
    var ans4_1= req.body.ans4_1;
    var ans4_2=req.body.ans4_2;
    var corr4=req.body.corr1;
    var qstn5= req.body.qstn5;
    var ans5_1= req.body.ans5_1;
    var ans5_2=req.body.ans5_2;
    var corr5=req.body.corr5;

  Quiz.create({
    quizName: quizName,
    qstn1: qstn1,
    ans1_1: ans1_1,
    ans1_2:ans1_2,
    corr1:corr1,
    qstn2: qstn2,
    ans2_1: ans2_1,
    ans2_2:ans2_2,
    corr2:corr2,
    qstn3: qstn3,
    ans3_1: ans3_1,
    ans3_2:ans3_2,
    corr3:corr3,
    qstn4: qstn4,
    ans4_1: ans4_1,
    ans4_2:ans4_2,
    corr4:corr1,
    qstn5: qstn5,
    ans5_1: ans5_1,
    ans5_2:ans5_2,
    corr5: corr5
}, function(err,quiz ) {
    if(err){
      console.log(err);
      res.status(400).json(err);
    } else {
      console.log('Quiz created', quiz);
      var quizlink= 'http://localhost:3000/#!/fetchQuiz';
      console.log("Sending quiz", quizlink);
      var text= "QuizName" + quizName;
       var mailDetails = {
         from: 'hchaundkar@gmail.com',
         to: sendto,
         subject: 'Quiz Link',
         html: '<b>Hello</b> <p> You have been challenged for the below quiz.<br> To take the quiz click on below link and provide the Quiz Name as: '+quizName+'</p><br><a href="'+quizlink+'" >quizlink</a>'
     };
     mailer.sendMail(mailDetails, function(error, response){
    if(error){
        console.log(error);
        res.status(400).json(error);
    }else{

        res.status(201).json(response);
    };
});

    }
  });

};

// Fetching Quiz
module.exports.getQuiz = function(req, res){
  console.log('Fetching Quiz', req.query.quizName);
  Quiz.find({
    quizName: req.query.quizName,
  }, function(err,quiz ) {
    if(err){
      console.log(err);
      res.status(400).json(err);
    } else {
      console.log('Quiz Fetched', quiz);
      res.status(201).json(quiz);
    }
  });
};


//Sending Email
module.exports.sendScore = function(req, res){
  console.log('Sending Score', req.body.score);
  var sendscoreto= req.body.sendscoreto;
  var quizName= req.body.quizName;
  console.log("Sendto",sendscoreto)
  var mailDetails = {
    from: 'hchaundkar@gmail.com',
    to: sendscoreto,
    subject: 'Quiz Score',
    html: '<p>Thank you for taking the quiz!!!</p><br><b>Your Score  for Quiz '+quizName+' is: '+req.body.score+'</b> '
};

mailer.sendMail(mailDetails, function(error, response){
if(error){
   console.log(error);
   res.status(400).json(error);
}else{
   res.status(201).json(response);
};
});

};
