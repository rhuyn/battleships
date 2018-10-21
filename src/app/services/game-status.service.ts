import { Injectable } from '@angular/core';
import { GAMESTATUS } from '../resources/data';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GameStatusService {

  private gameStatus: number;
  private statusSubject = new Subject<any>();
  public statusObs: Observable<any>;

  constructor() { 
    this.statusObs = this.statusSubject.asObservable();
  }

  public changeGameStatus(status:number) : void{
    this.gameStatus=status;
    this.statusSubject.next(status);
  }

  public getStatus():number{
    return this.gameStatus;
  }
}
