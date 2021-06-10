import { Component, Input} from '@angular/core';
import { checkResult } from '../models/article';

@Component({
  selector: 'app-check-result',
  templateUrl: './check-result.component.html',
  styleUrls: ['./check-result.component.scss']
})
export class CheckResultComponent {
  @Input() checkResult!:checkResult;
  
  constructor() { }

  
}
