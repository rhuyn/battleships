import { Injectable } from '@angular/core';
import { MemoryService } from './memory.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { SPACES, colours, GAMESTATUS } from '../resources/data';
import { GameStatusService } from './game-status.service';
import { isDefaultChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';

@Injectable()
export class GamePlayService {

  private colourSubject = new Subject<any>();
  public colourObs: Observable<any>;

  private miniColourSubject = new Subject<any>();
  public miniColourObs: Observable<any>;

  constructor(private memoryService: MemoryService, private gameStatusService: GameStatusService) { 
    this.colourObs= this.colourSubject.asObservable();
    this.miniColourObs = this.miniColourSubject.asObservable();
  }

  public setPlayerOneFields():void{
    let arr:string[] = this.memoryService.getPositionTwo();
    //For main display
    for(var i = 0; i < arr.length; i++){
      this.messageColours(i, arr[i]);
    }
    //for mini display
    let miniArr: string[] = this.memoryService.getPositionOne();
    for(var i = 0; i < miniArr.length; i++){
      this.miniMessageColours(i, miniArr[i]);
    }
  }
  public setPlayerTwoFields(): void{
    //for main display
    let arr:string[] = this.memoryService.getPositionOne();
    for(var i = 0; i < arr.length; i++){
      this.messageColours(i, arr[i]);
    }
    //for mini display
    let miniArr: string[] = this.memoryService.getPositionTwo();
    for(var i = 0; i < miniArr.length; i++){
      this.miniMessageColours(i, miniArr[i]);
    }
  }

  //Tells the tiles what colour to be
  private messageColours(index: number, tile: string):void{
    if(tile === "e" || tile === "l" || tile === "b" || tile ==="o" || tile === "t"){
      let obj:colours = { colour : "blue",
                  loc : SPACES[index]};
      this.colourSubject.next(obj);
    } else if(tile === "m"){
      let obj:colours = { colour : "black",
                  loc : SPACES[index]};
      this.colourSubject.next(obj);
    } else if(tile === "h"){
      let obj:colours = { colour : "red",
                  loc : SPACES[index]};
      this.colourSubject.next(obj);
    }
  }

  //Tells the mini display tiles what colour to be
  private miniMessageColours(index: number, tile: string):void{
    if(tile === "e"){
      let obj:colours = { colour : "blue",
                  loc : SPACES[index]};
      this.miniColourSubject.next(obj);
    } else if(tile === "m"){
      let obj:colours = { colour : "black",
                  loc : SPACES[index]};
      this.miniColourSubject.next(obj);
    } else if(tile === "h"){
      let obj:colours = { colour : "red",
                  loc : SPACES[index]};
      this.miniColourSubject.next(obj);
    } else if(tile === "l" || tile === "b" || tile ==="o" || tile === "t"){
      let obj:colours = { colour : "grey",
      loc : SPACES[index]};
      this.miniColourSubject.next(obj);
    }
  }

  //fires when a spot is clicked
  public shootLocation(loc:string):void{
    console.log(this.memoryService.getPositionOne());
    console.log(this.memoryService.getPositionTwo());
    let index:number = SPACES.indexOf(loc);
    if(this.gameStatusService.getStatus() === GAMESTATUS.PLAYERONETURN){
      let arr:string[] = this.memoryService.getPositionTwo();
      if(arr[index] === "e"){
        this.memoryService.changePositionTwo(index, "m");
        alert("Miss!");
      } else {
        alert(this.calculateShotOne(index));
      }
      this.memoryService.incrementShotOne();
      if(!this.checkWinStatus()){
        this.gameStatusService.changeGameStatus(GAMESTATUS.PLAYERTWOTURN);
      }

    } else if(this.gameStatusService.getStatus() === GAMESTATUS.PLAYERTWOTURN){
      let arr:string[] = this.memoryService.getPositionOne();
      if(arr[index] === "e"){
        this.memoryService.changePositionOne(index, "m");
        alert("Miss!");
      } else {
        alert(this.calculateShotTwo(index));
      }
      this.memoryService.incrementShotTwo();
      if(!this.checkWinStatus()){
        this.gameStatusService.changeGameStatus(GAMESTATUS.PLAYERONETURN);
      } 
    }
  }

  //Calculates shot for player one
  public calculateShotOne(index: number):string{
    let arr:string[] = this.memoryService.getPositionTwo();
    if(arr[index] === "l"){
      this.memoryService.changePositionTwo(index, "h");
      this.memoryService.getLArrTwo().splice(this.memoryService.getLArrTwo().indexOf(SPACES[index]), 1);
      console.log(this.memoryService.getLArrTwo());
      if(this.memoryService.getLArrTwo().length === 0){
        return "L-Shape Ship was Sunk!";
      } else{
        return "Hit!";
      }
    } else if(arr[index] === "b"){
      this.memoryService.changePositionTwo(index, "h");
      this.memoryService.getBArrTwo().splice(this.memoryService.getBArrTwo().indexOf(SPACES[index]), 1);
      if(this.memoryService.getBArrTwo().length === 0){
        return "Box-Shape Ship was Sunk!";
      } else{
        return "Hit!";
      }
    } else if(arr[index] === "o"){
      this.memoryService.changePositionTwo(index, "h");
      this.memoryService.getOneArrTwo().splice(this.memoryService.getOneArrTwo().indexOf(SPACES[index]),1);
      if(this.memoryService.getOneArrTwo().length === 0){
        return "Line-Shape-1 Ship was Sunk!";
      } else{
        return "Hit!";
      }
    } else if(arr[index] === "t"){
      this.memoryService.changePositionTwo(index, "h");
      this.memoryService.getTwoArrTwo().splice(this.memoryService.getTwoArrTwo().indexOf(SPACES[index]),1);
      if(this.memoryService.getTwoArrTwo().length === 0){
        return "Line-Shape-2 Ship was Sunk!";
      } else{
        return "Hit!";
      }
    }
  }

  //Calculates shot for player two
  public calculateShotTwo(index:number):string{
    let arr:string[] = this.memoryService.getPositionOne();
    if(arr[index] === "l"){
      this.memoryService.changePositionOne(index, "h");
      this.memoryService.getLArrOne().splice(this.memoryService.getLArrOne().indexOf(SPACES[index]), 1);
      if(this.memoryService.getLArrOne().length === 0){
        return "L-Shape Ship was Sunk!";
      } else{
        return "Hit!"
      }
    } else if(arr[index] === "b"){
      this.memoryService.changePositionOne(index, "h");
      this.memoryService.getBArrOne().splice(this.memoryService.getBArrOne().indexOf(SPACES[index]), 1);
      if(this.memoryService.getBArrOne().length === 0){
        return "Box-Shape Ship was Sunk!";
      } else{
        return "Hit!"
      }
    } else if(arr[index] === "o"){
      this.memoryService.changePositionOne(index, "h");
      this.memoryService.getOneArrOne().splice(this.memoryService.getOneArrOne().indexOf(SPACES[index]),1);
      if(this.memoryService.getOneArrOne().length === 0){
        return "Line-Shape-1 Ship was Sunk!";
      } else{
        return "Hit!"
      }
    } else if(arr[index] === "t"){
      this.memoryService.changePositionOne(index, "h");
      this.memoryService.getTwoArrOne().splice(this.memoryService.getTwoArrOne().indexOf(SPACES[index]),1);
      if(this.memoryService.getTwoArrOne().length === 0){
        return "Line-Shape-2 Ship was Sunk!";
      } else{
        return "Hit!"
      }
    }
  }
  public checkWinStatus(): boolean{
    if(this.gameStatusService.getStatus() === GAMESTATUS.PLAYERONETURN){
      if(this.memoryService.getLArrTwo().length === 0 && this.memoryService.getBArrTwo().length === 0 && this.memoryService.getOneArrTwo().length === 0 && this.memoryService.getTwoArrTwo().length === 0){
        this.gameStatusService.changeGameStatus(GAMESTATUS.ENDGAME);
        return true;
      }
    } else if(this.gameStatusService.getStatus() === GAMESTATUS.PLAYERTWOTURN){
      if(this.memoryService.getLArrOne().length === 0 && this.memoryService.getBArrOne().length === 0 && this.memoryService.getOneArrOne().length === 0 && this.memoryService.getTwoArrOne().length === 0){
        this.gameStatusService.changeGameStatus(GAMESTATUS.ENDGAME);
        return true;
      }
    }
    return false;
  }
}
