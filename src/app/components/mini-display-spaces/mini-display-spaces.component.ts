import { Component, OnInit, Input } from '@angular/core';
import { MemoryService } from '../../services/memory.service';
import { Subscription } from 'rxjs/Subscription';
import { GamePlayService } from '../../services/game-play.service';
import { colours } from '../../resources/data';
import { GameStatusService } from '../../services/game-status.service';

@Component({
  selector: 'mini-display-spaces',
  templateUrl: './mini-display-spaces.component.html',
  styleUrls: ['./mini-display-spaces.component.css']
})
export class MiniDisplaySpacesComponent implements OnInit {
  @Input() title: string;
  private backgroundColour: string = "blue";
  private gamePlaySubscription: Subscription;
  private resetGameSubscription: Subscription;
  constructor(private memoryService:MemoryService, private gamePlayService:GamePlayService, private gameStatusService:GameStatusService) {
    this.gamePlaySubscription = this.gamePlayService.miniColourObs.subscribe((obj:colours) =>{
      if(this.title === obj.loc){
        console.log(obj.colour);
        this.backgroundColour = obj.colour;
      }
    });
    this.resetGameSubscription = this.gameStatusService.resetGameObs.subscribe(()=>{
      this.backgroundColour = "blue";
    });
  }

  ngOnInit() {
  }

}
