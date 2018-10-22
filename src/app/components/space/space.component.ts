import { Component, OnInit, Input } from '@angular/core';
import { GameStatusService } from '../../services/game-status.service';
import { GAMESTATUS, colours } from '../../resources/data';
import { BattleshipPlacementService } from '../../services/battleship-placement.service';
import { Subscription } from 'rxjs/Subscription';
import { GamePlayService } from '../../services/game-play.service';

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
  private resetSubscription: Subscription;
  private gameStatusSubscription: Subscription;
  private gamePlaySubscription: Subscription;
  private resetGameSubscription: Subscription;
  
  constructor(private gameStatusService: GameStatusService, private battleshipPlacementService: BattleshipPlacementService, private gamePlayService: GamePlayService) {
    this.backgroundColour = "blue";
    this.unhoverSubscription = this.battleshipPlacementService.unhoverObs.subscribe(()=>{
      if(this.backgroundColour !== "green"){
        this.backgroundColour = "blue";
      }
    });
    this.hoverSubscription = this.battleshipPlacementService.hoverObs.subscribe((location:string) => {
      if(location === this.title){
        if(this.backgroundColour !== "green"){
          this.backgroundColour = "red";
        }
      }
    });
    this.setSubscription = this.battleshipPlacementService.setObs.subscribe((position:string) =>{
      if(position === this.title){
        this.backgroundColour = "green";
      }
    });
    this.resetSubscription = this.battleshipPlacementService.resetObs.subscribe(()=>{
      this.backgroundColour = "blue";
    });
    this.gameStatusSubscription = this.gameStatusService.statusObs.subscribe((status:number)=>{
      if(status === GAMESTATUS.PLAYERONETURN || status === GAMESTATUS.PLAYERTWOTURN){
        this.backgroundColour = "blue";
      }
    });
    this.gamePlaySubscription = this.gamePlayService.colourObs.subscribe((obj:colours) =>{
      if(this.title === obj.loc){
        this.backgroundColour = obj.colour;
      }
    });
    this.resetGameSubscription = this.gameStatusService.resetGameObs.subscribe(()=>{
      this.backgroundColour = "blue";
    });
  }

  ngOnInit() {
  }

  private shootSpace():void{
    if(this.gameStatusService.getStatus() === GAMESTATUS.PLAYERONESETUP || this.gameStatusService.getStatus() === GAMESTATUS.PLAYERTWOSETUP){
      this.battleshipPlacementService.setCurrentLocation();
    } else if(this.gameStatusService.getStatus() === GAMESTATUS.PLAYERONETURN || this.gameStatusService.getStatus() === GAMESTATUS.PLAYERTWOTURN){
      if(this.backgroundColour === "black" || this.backgroundColour === "red"){
        alert("Please click on a available spot!");
      } else{
        this.gamePlayService.shootLocation(this.title);
      }
    }
  }
  private checkSpace():void{
    if(this.gameStatusService.getStatus() === GAMESTATUS.PLAYERONESETUP || this.gameStatusService.getStatus() === GAMESTATUS.PLAYERTWOSETUP){
      this.battleshipPlacementService.positionHovered(this.title);
    } else if(this.gameStatusService.getStatus() === GAMESTATUS.PLAYERONETURN || this.gameStatusService.getStatus() === GAMESTATUS.PLAYERTWOTURN){
      if(this.backgroundColour === "blue"){
        this.backgroundColour = "green";
      }
    }
  }
  private unhoverSpace():void{
    if(this.gameStatusService.getStatus() === GAMESTATUS.PLAYERONESETUP || this.gameStatusService.getStatus() === GAMESTATUS.PLAYERTWOSETUP){
      this.battleshipPlacementService.positionUnhover();
    }else if(this.gameStatusService.getStatus() === GAMESTATUS.PLAYERONETURN || this.gameStatusService.getStatus() === GAMESTATUS.PLAYERTWOTURN){
      if(this.backgroundColour === "green"){
        this.backgroundColour = "blue";
      }
    }
  }
}
