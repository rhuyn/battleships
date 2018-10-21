import { Component, OnInit, Input } from '@angular/core';
import { GameStatusService } from '../../services/game-status.service';
import { GAMESTATUS } from '../../resources/data';
import { BattleshipPlacementService } from '../../services/battleship-placement.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.css']
})
export class SpaceComponent implements OnInit {
  @Input() title: string;
  private backgroundColour: string = "blue";
  private hoverSubscription: Subscription;
  private unhoverSubscription: Subscription;
  private setSubscription: Subscription;
  constructor(private gameStatusService: GameStatusService, private battleshipPlacementService: BattleshipPlacementService) {
    this.backgroundColour = "blue";
    this.unhoverSubscription = this.battleshipPlacementService.unhoverObs.subscribe(()=>{
      if(this.backgroundColour !== "green"){
        this.backgroundColour = "blue";
      }
    });
    this.hoverSubscription = this.battleshipPlacementService.hoverObs.subscribe(location => {
      if(location === this.title){
        if(this.backgroundColour !== "green"){
          this.backgroundColour = "red";
        }
      }
    });
    this.setSubscription = this.battleshipPlacementService.setObs.subscribe(position =>{
      if(position === this.title){
        this.backgroundColour = "green";
      }
    })
  }

  ngOnInit() {
  }

  private shootSpace():void{
    this.battleshipPlacementService.setCurrentLocation();
  }
  private checkSpace():void{
    if(this.gameStatusService.getStatus() === GAMESTATUS.PLAYERONESETUP || this.gameStatusService.getStatus() === GAMESTATUS.PLAYERTWOSETUP){
      this.battleshipPlacementService.positionHovered(this.title);
    }
  }
  private unhoverSpace():void{
    if(this.gameStatusService.getStatus() === GAMESTATUS.PLAYERONESETUP || this.gameStatusService.getStatus() === GAMESTATUS.PLAYERTWOSETUP){
      this.battleshipPlacementService.positionUnhover();
    }
  }
}
