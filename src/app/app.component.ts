import { Component, HostListener } from '@angular/core';
import { GameStatusService } from './services/game-status.service';
import { GAMESTATUS } from './resources/data';
import { Subscription } from 'rxjs/Subscription';
import { BattleshipPlacementService } from './services/battleship-placement.service';
import { MemoryService } from './services/memory.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent){
    if(event.key === " "){
      if(this.gameStatusService.getStatus() === GAMESTATUS.PLAYERONESETUP || this.gameStatusService.getStatus() === GAMESTATUS.PLAYERTWOSETUP){
        this.battleshipPlacementService.rotateShape();
        this.battleshipPlacementService.reCalculatePositions();
      }
    }
  }
  @HostListener('window:beforeunload', ['$event']) onbeforeunload(event){
    if(this.gameStatusService.getStatus() === GAMESTATUS.PLAYERONETURN || this.gameStatusService.getStatus() === GAMESTATUS.PLAYERTWOTURN){
      console.log("HERE");
      this.memoryService.saveData();
      localStorage.setItem("status", this.gameStatusService.getStatus().toString());
    } else{
      localStorage.clear();
    }
  }
  private subscription: Subscription;

  constructor(private gameStatusService: GameStatusService, private battleshipPlacementService: BattleshipPlacementService, private memoryService: MemoryService) {
    this.memoryService.resetPositions();

  }

  ngOnInit() {
    let status:number = parseInt(localStorage.getItem("status"));
    console.log(status);
    if(status === GAMESTATUS.PLAYERONETURN || status === GAMESTATUS.PLAYERTWOTURN){
      console.log("here");
      this.memoryService.loadData();
      this.gameStatusService.changeGameStatus(status);
    } else{
      this.gameStatusService.changeGameStatus(GAMESTATUS.STARTGAME);
    }
  }
}
