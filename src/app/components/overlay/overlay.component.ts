import { Component, OnInit } from '@angular/core';
import { GAMESTATUS } from '../../resources/data';
import { Subscription } from 'rxjs/Subscription';
import { GameStatusService } from '../../services/game-status.service';


@Component({
  selector: 'overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit {
  private overlayText: string;
  private buttonText: string;
  private subscription: Subscription;
  private status: number;
  private showOverlay: boolean;
  constructor(private gameStatusService: GameStatusService) {
    this.subscription = this.gameStatusService.statusObs.subscribe(gameStatus =>{
      if(gameStatus === GAMESTATUS.STARTGAME){
        this.showOverlay = true;
        this.overlayText = "<p>Welcome to Battleship!</p><p>Player One Places Battleships First</p>"
        this.buttonText = "START";
        this.status = gameStatus;
      }
    });
  }

  ngOnInit() {

  }

  private fireButton(): void{
    if(this.status === GAMESTATUS.STARTGAME){
      this.gameStatusService.changeGameStatus(GAMESTATUS.PLAYERONESETUP);
      this.showOverlay = false;
    }

  }
}
