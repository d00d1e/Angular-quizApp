import { Component, Input } from '@angular/core';
import { Question } from '../quiz.model';
import { Answers } from '../quiz.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  @Input() answers: Answers;
  @Input() question: Question;      

 
}
