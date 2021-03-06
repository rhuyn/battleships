import { Component, OnInit } from '@angular/core';
import { GameStatusService } from '../../services/game-status.service';
import { Subscription } from 'rxjs/Subscription';
import { GAMESTATUS } from '../../resources/data';
import { BattleshipPlacementService } from '../../services/battleship-placement.service';

@Component({
  selector: 'footer-details',
  templateUrl: './footer-details.component.html',
  styleUrls: ['./footer-details.component.css']
})
export class FooterDetailsComponent implements OnInit {
  private title: string;
  private subscription: Subscription;
  private shapeSubscription: Subscription;
  private resetSubscripton: Subscription;
  private showButtons:boolean;
  private lBtnSwitch:boolean;
  private bBtnSwitch:boolean;
  private oneBtnSwitch:boolean;
  private twoBtnSwitch:boolean;
  private currentStatus:string;
  constructor(private gameStatusService: GameStatusService, private battleshipPlacementService: BattleshipPlacementService) { 
    this.showButtons=false;
    this.lBtnSwitch = false;
    this.bBtnSwitch = false;
    this.oneBtnSwitch = false;
    this.twoBtnSwitch = false;
    this.subscription = this.gameStatusService.statusObs.subscribe(status =>{
      if(status === GAMESTATUS.PLAYERONESETUP){
        this.title = "<p><b>Player One Set Up!</b></p><p>Choose a ship, hover over a spot to see highlight of where the ship will be placed. Hit space to rotate.</p>"
        this.showButtons=true;
      } else if(status === GAMESTATUS.PLAYERTWOSETUP){
        this.title = "<p><b>Player Two Set Up!</b></p><p>Choose a ship, hover over a spot to see highlight of where the ship will be placed. Hit space to rotate.</p>"
        this.showButtons=true;
      } else if(status === GAMESTATUS.PLAYERONETURN){
        this.currentStatus = "Player One's Turn!";
        this.showButtons=false;
      } else if(status === GAMESTATUS.PLAYERTWOTURN){
        this.currentStatus = "Player Two's Turn!";
        this.showButtons=false;
      } else if(status === GAMESTATUS.ENDGAME){
        this.currentStatus = "Game Over!";
        this.showButtons=false;
      }
    });
    this.shapeSubscription = this.battleshipPlacementService.shapeObs.subscribe(shape => {
      if(shape === "L-Shape"){
        this.lBtnSwitch = true;
      } else if (shape === "Box-Shape"){
        this.bBtnSwitch = true;
      } else if(shape === "Line-Shape-1"){
        this.oneBtnSwitch = true;
      } else if(shape === "Line-Shape-2"){
        this.twoBtnSwitch = true;
      }
    });
    this.resetSubscripton = this.battleshipPlacementService.resetObs.subscribe(()=>{
      this.lBtnSwitch = false;
      this.bBtnSwitch = false;
      this.oneBtnSwitch = false;
      this.twoBtnSwitch = false;
    });
  }

  ngOnInit() {
  }

  private shapePressed(e:Event): void{
    this.battleshipPlacementService.shapePressed(e.target.innerHTML);
  }
}
