import { Component, OnInit } from '@angular/core';
import { SPACES } from '../../resources/data';

@Component({
  selector: 'mini-display',
  templateUrl: './mini-display.component.html',
  styleUrls: ['./mini-display.component.css']
})
export class MiniDisplayComponent implements OnInit {
  private spaces: string[] = SPACES;
  constructor() { }

  ngOnInit() {
  }

}
