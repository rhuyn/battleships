import { Component, OnInit } from '@angular/core';
import { GAMESTATUS } from '../../resources/data';
import { Subscription } from 'rxjs/Subscription';
import { GameStatusService } from '../../services/game-status.service';
import { GamePlayService } from '../../services/game-play.service';
import { MemoryService } from '../../services/memory.service';
import { BattleshipPlacementService } from '../../services/battleship-placement.service';


@Component({
  selector: 'overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})

//I think a overlay can be considered a lobby?
export class OverlayComponent implements OnInit {
  private overlayText: string;
  private buttonText: string;
  private playerOneShotText: string;
  private playerTwoShotText: string;
  private playerOneShipsDown: string;
  private playerTwoShipsDown: string;
  private subscription: Subscription;
  private status: number;
  private showOverlay: boolean;
  private showDetails: boolean;
  constructor(private gameStatusService: GameStatusService, private gamePlayService: GamePlayService, private memoryService: MemoryService, private battleshipPlacementService: BattleshipPlacementService) {
    this.subscription = this.gameStatusService.statusObs.subscribe(gameStatus =>{
      if(gameStatus === GAMESTATUS.STARTGAME){
        this.showOverlay = true;
        this.showDetails = false;
        this.overlayText = "<p>Welcome to Battleship!</p><p>Player One Places Battleships First</p>"
        this.buttonText = "START";
        this.status = gameStatus;
      } else if(gameStatus === GAMESTATUS.PLAYERTWOSETUP){
        this.showOverlay = true;
        this.showDetails = false;
        this.overlayText = "<p>Player Two's Turn to Setup!</p>";
        this.buttonText = "START";
        this.status = gameStatus;
      } else if(gameStatus === GAMESTATUS.PLAYERONETURN){
        this.showOverlay = true;
        this.showDetails = false;
        this.overlayText = "<p>Player One's Turn!</p>";
        this.buttonText = "START";
        this.status = gameStatus;
      } else if(gameStatus === GAMESTATUS.PLAYERTWOTURN){
        this.showOverlay = true;
        this.showDetails = false;
        this.overlayText = "<p>Player Two's Turn!</p>";
        this.buttonText = "START";
        this.status = gameStatus;
      } else if(gameStatus === GAMESTATUS.ENDGAME){
        this.showOverlay = true;
        this.playerOneShotText = this.memoryService.getShotsByOne();
        this.playerOneShipsDown = this.memoryService.getSunkShipsOne();
        this.playerTwoShotText = this.memoryService.getShotsByTwo();
        this.playerTwoShipsDown = this.memoryService.getSunkShipsTwo();
        if(this.status === GAMESTATUS.PLAYERONETURN){
          this.overlayText = "<p><b>PLAYER ONE WINS</b><p>";
          this.buttonText= "RESTART";
        } else if(this.status === GAMESTATUS.PLAYERTWOTURN){
          this.overlayText = "<p><b>PLAYER TWO WINS</b><p>";
          this.buttonText= "RESTART";
        }
        this.status = gameStatus;
        this.showDetails = true;
      }
    });
  }

  ngOnInit() {

  }

  private fireButton(): void{
    if(this.status === GAMESTATUS.STARTGAME){
      this.gameStatusService.changeGameStatus(GAMESTATUS.PLAYERONESETUP);
      this.showOverlay = false;
    } else if (this.status === GAMESTATUS.PLAYERTWOSETUP){
      this.showOverlay = false;
    } else if (this.status === GAMESTATUS.PLAYERONETURN){
      this.showOverlay = false;
      console.log("here");
      this.gamePlayService.setPlayerOneFields();
    } else if (this.status === GAMESTATUS.PLAYERTWOTURN){
      this.showOverlay = false;
      this.gamePlayService.setPlayerTwoFields();
    } else if(this.status === GAMESTATUS.ENDGAME){
      this.memoryService.resetPositions();
      this.battleshipPlacementService.resetBattleShipPlacements();
      this.gameStatusService.resetGame();
    }
  }
}
