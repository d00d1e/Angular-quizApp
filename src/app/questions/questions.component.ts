import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { QuestionsService } from '../questions.service';
import { Quiz, Answers, Choice, Question } from '../quiz.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  quiz: Quiz;
  answers: Answers;
  questions: Question[];
  currentQuestionIndex: number;
  showResults = false;

  //inject both the active route and questions service
  constructor(private route: ActivatedRoute, private questionsService: QuestionsService) {}
    
  ngOnInit() {
    //read from dynamic route and load proper quiz data
    this.questionsService.getQuestions(this.route.snapshot.params.quizId).subscribe(questions => {
      //initialize everything
      this.questions = questions;
      this.answers = new Answers();
      this.currentQuestionIndex = 0;
    });
  }
    
  //called each time user selects a choice
  updateChoice(choice: Choice) {
    this.answers.values[this.currentQuestionIndex] = choice;
  }

  //called each time user clicks "Next" button
  nextOrViewResults() {
    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.showResults = true;
      return;
    }
    this.currentQuestionIndex++;
  }

  reset() {
    this.quiz = undefined;
    this.questions = undefined;
    this.answers = undefined;
    this.currentQuestionIndex = undefined;
  }
}