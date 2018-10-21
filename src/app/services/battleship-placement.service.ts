import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { SPACES } from '../resources/data';
import { MemoryService } from './memory.service';

@Injectable()
export class BattleshipPlacementService {
  //Notifies when something is hovered
  private hoverSubject = new Subject<any>();
  public hoverObs: Observable<any>;
  //Notifies when something is unhovered
  private unhoverSubject = new Subject<any>();
  public unhoverObs: Observable<any>;
  //Notifies which shape was selected when position was selected 
  private shapeSubject = new Subject<any>();
  public shapeObs: Observable<any>;
  //Notifies when position is selected
  private setSubject = new Subject<any>();
  public setObs: Observable<any>;
  private selectedShape: string;
  private rotation: number;
  private hoverElement: string;
  private positionArray: string[];

  constructor(private memoryService: MemoryService) {
    this.hoverObs = this.hoverSubject.asObservable();
    this.unhoverObs = this.unhoverSubject.asObservable();
    this.shapeObs = this.shapeSubject.asObservable();
    this.setObs = this.setSubject.asObservable();
    this.rotation = 0; //Used to calculate rotations of the shape
    this.selectedShape = "";
  }

  //Sets selected shape
  public shapePressed(shape: string):void{
    this.selectedShape = shape;
  }

  public rotateShape():void{
    this.rotation === 3 ? this.rotation = 0 : this.rotation++; 
  }

  public reCalculatePositions():void {
    this.positionUnhover();
    this.positionHovered(this.hoverElement);
  }

  public positionHovered(location:string):void{
    //calculate locations to notify to turn red
    this.hoverElement = location;
    let index:number = SPACES.indexOf(location);
    let arr:string[] = [];
    arr.push(location); //Adds hovered item into array

    if(this.selectedShape === "L-Shape"){
      arr = this.calculateL(index, arr);
    } else if(this.selectedShape === "Box-Shape"){
      arr = this.calculateBox(index, arr);
    } else if(this.selectedShape === "Line-Shape-1"){
      arr = this.calculateLine(index, arr);
    } else if(this.selectedShape === "Line-Shape-2"){
      arr = this.calculateLine(index, arr);
    }

    //Sends out all the positions to be highlighted
    if(this.selectedShape !== ""){
      this.positionArray = arr;
      console.log(this.positionArray);
      arr.forEach((e)=>{
        this.hoverSubject.next(e);
      })
    }
  }

  //Used to notify to unhover blocks
  public positionUnhover():void{
    this.unhoverSubject.next(null);
  }

  public setCurrentLocation():void{
    if(this.positionArray.length > 0){
      //if False, ask for reselect
      if(this.memoryService.setPositions(this.positionArray, this.selectedShape)){
        alert("Please select a spot where there isn't another ship!");
      } else{
        this.shapeSubject.next(this.selectedShape);
        this.positionArray.forEach((x)=>{
          this.setSubject.next(x);
        });
        //Resets
        this.selectedShape = "";
        this.positionArray = [];
      }
    }
  }

  //Calculates which block to highlight for L Shape
  private calculateL(index: number, arr: string[]):string[]{
    let check = true;
    if(this.rotation === 0 ){
      index+8 <= 63 ? arr.push(SPACES[index+8]) : check = false; 
      index+16 <= 63 ? arr.push(SPACES[index+16]) : check = false; 
      index+17 <= 63 && (index+17)%8 !== 0 ? arr.push(SPACES[index+17]) : check = false; 
    } else if(this.rotation === 1){
      if((index%8) < 2 ){
        check = false;
      } else {
        index-1 >= 0 ? arr.push(SPACES[index-1]) : check = false;
        index-2 >= 0 ? arr.push(SPACES[index-2]) : check = false; 
        index+6 <= 63 ? arr.push(SPACES[index+6]) : check = false; 
      }
    } else if(this.rotation === 2){
      if((index%8) === 0){
        check = false;
      } else{
        index-8 >= 0 ? arr.push(SPACES[index-8]) : check = false;
        index-16 >= 0 ? arr.push(SPACES[index-16]) : check = false;
        index-17 >= 0 ? arr.push(SPACES[index-17]) : check = false;
      }
    } else if(this.rotation === 3){
      if((index%8) > 5){
        check = false;
      } else{
        index+1 <= 63 ? arr.push(SPACES[index+1]) : check = false;
        index+2 <= 63 ? arr.push(SPACES[index+2]) : check = false;
        index-6 >= 0 ? arr.push(SPACES[index-6]) : check = false;
      }
    }
    if(check){
      return arr;
    } else{
      return [];
    }
  }

  //Calculates which block to highlight for Box Shape, there is no rotation
  private calculateBox(index: number, arr: string[] ):string[]{
    let check = true;
    index+1 <= 63 && (index+1)%8 !== 0? arr.push(SPACES[index+1]) : check = false;
    index+8 <= 63 ? arr.push(SPACES[index+8]) : check = false;
    index+9 <= 63 && (index+9)%8 !== 0? arr.push(SPACES[index+9]) : check = false;
    if(check){
      return arr;
    } else{
      return [];
    }
  }

  //Calculate which block to highlght for Line Shape
  private calculateLine(index: number, arr: string[] ):string[]{
    let check = true;
    if(this.rotation === 0 || this.rotation === 2){
      index+8 <= 63 ? arr.push(SPACES[index+8]) : check = false;
      index+16 <= 63 ? arr.push(SPACES[index+16]) : check = false;
      index+24 <= 63 ? arr.push(SPACES[index+24]) : check = false;
    } else{
      if((index%8) > 4){
        check = false;
      } else{
        index+1 <= 63 ? arr.push(SPACES[index+1]) : check = false;
        index+2 <= 63 ? arr.push(SPACES[index+2]) : check = false;
        index+3 <= 63 ? arr.push(SPACES[index+3]) : check = false;
      }
    }
    if(check){
      return arr;
    } else{
      return [];
    }
  }
}
