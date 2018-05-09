var mongoose = require('mongoose');

var quizSchema = new mongoose.Schema({
  quizName: {
    type: String,
    required: true
  },
  qstn1: {
    type: String,
    required: true
  },
  ans1_1: {
    type: String,
    required: true
  },
  ans1_2: {
    type: String,
    required: true
  },
  corr1: {
    type: String,
    required: true
  },
  qstn2: {
    type: String,
    required: true
  },
  ans2_1: {
    type: String,
    required: true
  },
  ans2_2: {
    type: String,
    required: true
  },
  corr2: {
    type: String,
    required: true
  },
  qstn3: {
    type: String,
    required: true
  },
  ans3_1: {
    type: String,
    required: true
  },
  ans3_2: {
    type: String,
    required: true
  },
  corr3: {
    type: String,
    required: true
  },
  qstn4: {
    type: String,
    required: true
  },
  ans4_1: {
    type: String,
    required: true
  },
  ans4_2: {
    type: String,
    required: true
  },
  corr4: {
    type: String,
    required: true
  },
  qstn5: {
    type: String,
    required: true
  },
  ans5_1: {
    type: String,
    required: true
  },
  ans5_2: {
    type: String,
    required: true
  },
  corr5: {
    type: String,
    required: true
  }
});

mongoose.model('Quizes', quizSchema);
