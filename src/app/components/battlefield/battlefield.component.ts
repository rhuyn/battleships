import { Component, OnInit } from '@angular/core';
import { SPACES } from '../../resources/data';

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.css']
})
export class BattlefieldComponent implements OnInit {
  private spaces: string[] = SPACES;
  constructor() { }

  ngOnInit() {
  }


}
