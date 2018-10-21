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
  private subscription: Subscription;

  constructor(private gameStatusService: GameStatusService, private battleshipPlacementService: BattleshipPlacementService, private memoryService: MemoryService) {
    this.memoryService.resetPositions();
  }

  ngOnInit() {
    this.gameStatusService.changeGameStatus(GAMESTATUS.STARTGAME);
  }
}
