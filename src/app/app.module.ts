import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BattlefieldComponent } from './components/battlefield/battlefield.component';
import { SpaceComponent } from './components/space/space.component';
import { FooterDetailsComponent } from './components/footer-details/footer-details.component';
import { OverlayComponent } from './components/overlay/overlay.component'; 
import { GameStatusService } from './services/game-status.service';
import { BattleshipPlacementService } from './services/battleship-placement.service';
import { MemoryService } from './services/memory.service';
import { GamePlayService } from './services/game-play.service';
import { MiniDisplayComponent } from './components/mini-display/mini-display.component';
import { MiniDisplaySpacesComponent } from './components/mini-display-spaces/mini-display-spaces.component';

@NgModule({
  declarations: [
    AppComponent,
    BattlefieldComponent,
    SpaceComponent,
    FooterDetailsComponent,
    OverlayComponent,
    MiniDisplayComponent,
    MiniDisplaySpacesComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [GameStatusService, BattleshipPlacementService, MemoryService, GamePlayService],
  bootstrap: [AppComponent]
})
export class AppModule { }
