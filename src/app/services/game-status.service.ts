import { Injectable } from '@angular/core';
import { GAMESTATUS } from '../resources/data';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { MemoryService } from './memory.service';
import { BattleshipPlacementService } from './battleship-placement.service';

@Injectable()
export class GameStatusService {

  private gameStatus: number;
  private statusSubject = new Subject<any>();
  public statusObs: Observable<any>;

  private resetGameSubject = new Subject<any>();
  public resetGameObs: Observable<any>;

  constructor(private memoryService: MemoryService) { 
    this.statusObs = this.statusSubject.asObservable();
    this.resetGameObs = this.resetGameSubject.asObservable();
  }

  public changeGameStatus(status:number) : void{
    this.gameStatus=status;
    this.statusSubject.next(status);
  }

  public getStatus():number{
    return this.gameStatus;
  }

  public resetGame(): void{
    this.resetGameSubject.next();
    this.changeGameStatus(GAMESTATUS.STARTGAME);
  }
}
