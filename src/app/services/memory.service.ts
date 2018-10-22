import { Injectable } from '@angular/core';
import { SPACES } from '../resources/data';

@Injectable()
export class MemoryService {

  private positionsOne:string[] = [];
  private lSetOne: boolean = false;
  private bSetOne: boolean = false;
  private oneSetOne: boolean = false;
  private twoSetOne: boolean = false;
  private lArrOne: string[] = [];
  private bArrOne: string[] = [];
  private oneArrOne: string[] = [];
  private twoArrOne: string[] = [];
  private shotsByOne: number = 0;

  private positionsTwo:string[] = [];
  private lSetTwo: boolean = false;
  private bSetTwo: boolean = false;
  private oneSetTwo: boolean = false;
  private twoSetTwo: boolean = false;
  private lArrTwo: string[] = [];
  private bArrTwo: string[] = [];
  private oneArrTwo: string[] = [];
  private twoArrTwo: string[] = [];
  private shotsByTwo: number = 0;

  constructor() { }

  public saveData():void{
    localStorage.setItem("positionOne", JSON.stringify(this.positionsOne));
    localStorage.setItem("lArrOne", JSON.stringify(this.lArrOne));
    localStorage.setItem("bArrOne", JSON.stringify(this.bArrOne));
    localStorage.setItem("oneArrOne", JSON.stringify(this.oneArrOne));
    localStorage.setItem("twoArrOne", JSON.stringify(this.twoArrOne));
    localStorage.setItem("shotsByOne", this.shotsByOne.toString());
    this.lSetOne = true;
    this.bSetOne = true;
    this.oneSetOne = true;
    this.twoSetOne = true;
    localStorage.setItem("positionTwo", JSON.stringify(this.positionsTwo));
    localStorage.setItem("lArrTwo", JSON.stringify(this.lArrTwo));
    localStorage.setItem("bArrTwo", JSON.stringify(this.bArrTwo));
    localStorage.setItem("oneArrTwo", JSON.stringify(this.oneArrTwo));
    localStorage.setItem("twoArrTwo", JSON.stringify(this.twoArrTwo));
    localStorage.setItem("shotsByTwo", this.shotsByTwo.toString());
    this.lSetTwo = true;
    this.bSetTwo = true;
    this.oneSetTwo = true;
    this.twoSetTwo = true;
  }

  public loadData():void{
    this.positionsOne = JSON.parse(localStorage.getItem("positionOne"));
    this.lArrOne = JSON.parse(localStorage.getItem("lArrOne"));
    this.bArrOne = JSON.parse(localStorage.getItem("bArrOne"));
    this.oneArrOne = JSON.parse(localStorage.getItem("oneArrOne"));
    this.twoArrOne = JSON.parse(localStorage.getItem("twoArrOne"));
    this.shotsByOne = parseInt(localStorage.getItem("shotsByOne"));

    this.positionsTwo = JSON.parse(localStorage.getItem("positionTwo"));
    this.lArrTwo = JSON.parse(localStorage.getItem("lArrTwo"));
    this.bArrTwo = JSON.parse(localStorage.getItem("bArrTwo"));
    this.oneArrTwo = JSON.parse(localStorage.getItem("oneArrTwo"));
    this.twoArrTwo = JSON.parse(localStorage.getItem("twoArrTwo"));
    this.shotsByTwo = parseInt(localStorage.getItem("shotsByTwo"));


  }

  public resetPositions():void{
    this.positionsOne = ["e","e","e","e","e","e","e","e",
                      "e","e","e","e","e","e","e","e",
                      "e","e","e","e","e","e","e","e",
                      "e","e","e","e","e","e","e","e",
                      "e","e","e","e","e","e","e","e",
                      "e","e","e","e","e","e","e","e",
                      "e","e","e","e","e","e","e","e",
                      "e","e","e","e","e","e","e","e"];
    this.positionsTwo = ["e","e","e","e","e","e","e","e",
                        "e","e","e","e","e","e","e","e",
                        "e","e","e","e","e","e","e","e",
                        "e","e","e","e","e","e","e","e",
                        "e","e","e","e","e","e","e","e",
                        "e","e","e","e","e","e","e","e",
                        "e","e","e","e","e","e","e","e",
                        "e","e","e","e","e","e","e","e"];
    this.lSetOne = false;
    this.bSetOne = false;
    this.oneSetOne = false;
    this.twoSetOne = false;
    this.lArrOne = [];
    this.bArrOne = [];
    this.oneArrOne = [];
    this.twoArrOne = [];
    this.shotsByOne = 0;
    this.lSetTwo = false;
    this.bSetTwo = false;
    this.oneSetTwo = false;
    this.twoSetTwo = false;
    this.lArrTwo = [];
    this.bArrTwo = [];
    this.oneArrTwo = [];
    this.twoArrTwo = [];
    this.shotsByTwo = 0;
  }

  public incrementShotOne():void{
    this.shotsByOne++;
  }
  public incrementShotTwo():void{
    this.shotsByTwo++;
  }

  public setPositionsOne(arr:string[], shape:string):boolean{
    for(var x = 0; x < arr.length; x++){   
      if(this.positionsOne[SPACES.indexOf(arr[x])] !== "e"){
        return true;
      }
    }
    arr.forEach((x)=>{
      if(shape === "L-Shape"){
        this.positionsOne[SPACES.indexOf(x)] = "l"; 
      } else if(shape === "Box-Shape"){
        this.positionsOne[SPACES.indexOf(x)] = "b";
      } else if(shape === "Line-Shape-1"){
        this.positionsOne[SPACES.indexOf(x)] = "o";
      } else if(shape === "Line-Shape-2"){
        this.positionsOne[SPACES.indexOf(x)] = "t";
      }
    })
    if(shape === "L-Shape"){
      this.lSetOne = true;
      this.lArrOne = arr;
    } else if(shape === "Box-Shape"){
      this.bSetOne = true;
      this.bArrOne = arr;
    } else if(shape === "Line-Shape-1"){
      this.oneSetOne = true;
      this.oneArrOne = arr;
    } else if(shape === "Line-Shape-2"){
      this.twoSetOne = true;
      this.twoArrOne = arr;
    }
    return false;
  }

  //Checks if all shapes are set or not
  public getSetShapesOne():boolean{
    if(this.lSetOne === true && this.bSetOne === true && this.oneSetOne === true && this.twoSetOne === true){
      return true;
    } else {
      return false;
    }
  }

  public setPositionsTwo(arr:string[], shape:string):boolean{
    for(var x = 0; x < arr.length; x++){   
      if(this.positionsTwo[SPACES.indexOf(arr[x])] !== "e"){
        return true;
      }
    }
    arr.forEach((x)=>{
      if(shape === "L-Shape"){
        this.positionsTwo[SPACES.indexOf(x)] = "l"; 
      } else if(shape === "Box-Shape"){
        this.positionsTwo[SPACES.indexOf(x)] = "b";
      } else if(shape === "Line-Shape-1"){
        this.positionsTwo[SPACES.indexOf(x)] = "o";
      } else if(shape === "Line-Shape-2"){
        this.positionsTwo[SPACES.indexOf(x)] = "t";
      }
    })
    if(shape === "L-Shape"){
      this.lSetTwo = true;
      this.lArrTwo = arr;
    } else if(shape === "Box-Shape"){
      this.bSetTwo = true;
      this.bArrTwo = arr;
    } else if(shape === "Line-Shape-1"){
      this.oneSetTwo = true;
      this.oneArrTwo = arr;
    } else if(shape === "Line-Shape-2"){
      this.twoSetTwo = true;
      this.twoArrTwo = arr;
    }
    return false;
  }
  //Checks if all shapes are set or not
  public getSetShapesTwo():boolean{
    if(this.lSetTwo === true && this.bSetTwo === true && this.oneSetTwo === true && this.twoSetTwo === true){
      return true;
    } else {
      return false;
    }
  }

  public getSunkShipsOne():string{
    let str: string = ""
    if(this.lArrOne.length === 0){
      str += "L-Ship ";
    }
    if(this.bArrOne.length === 0){
      str += "Box-Ship ";
    }
    if(this.oneArrOne.length === 0){
      str += "Line-Ship-One ";
    }
    if(this.twoArrOne.length === 0){
      str += "Line-Ship-Two";
    }
    return str;
  }

  
  public getSunkShipsTwo():string{
    let str: string = ""
    if(this.lArrTwo.length === 0){
      str += "L-Ship ";
    }
    if(this.bArrTwo.length === 0){
      str += "Box-Ship ";
    }
    if(this.oneArrTwo.length === 0){
      str += "Line-Ship-One ";
    }
    if(this.twoArrTwo.length === 0){
      str += "Line-Ship-Two";
    }
    return str;
  }

  public changePositionOne(index: number, str: string): void{
    this.positionsOne[index] = str;
  }

  public changePositionTwo(index: number, str: string): void{
    this.positionsTwo[index] = str;
  }

  public getShotsByOne(): string{
    return this.shotsByOne.toString();
  }
  public getShotsByTwo(): string{
    return this.shotsByTwo.toString();
  }
  public getPositionOne():string[]{
    return this.positionsOne;
  }
  
  public getPositionTwo():string[]{
    return this.positionsTwo;
  }

  public getLArrOne(): string[]{
    return this.lArrOne;
  }
  public getLArrTwo(): string[]{
    return this.lArrTwo;
  }
  public getBArrOne(): string[]{
    return this.bArrOne;
  }
  public getBArrTwo(): string[]{
    return this.bArrTwo;
  }
  public getOneArrOne(): string[]{
    return this.oneArrOne;
  }
  public getOneArrTwo(): string[]{
    return this.oneArrTwo;
  }
  public getTwoArrOne(): string[]{
    return this.twoArrOne;
  }
  public getTwoArrTwo(): string[]{
    return this.twoArrTwo;
  }

  public setLArrOne(arr:string[]): void{
    this.lArrOne = arr;
  }
  public setLArrTwo(arr:string[]): void{
    this.lArrTwo = arr;
  }
  public setBArrOne(arr:string[]): void{
    this.bArrOne = arr;
  }
  public setBArrTwo(arr:string[]): void{
    this.bArrTwo = arr;
  }
  public setOneArrOne(arr:string[]): void{
    this.oneArrOne = arr;
  }
  public setOneArrTwo(arr:string[]): void{
    this.oneArrTwo = arr;
  }
  public setTwoArrOne(arr:string[]): void{
    this.twoArrOne = arr;
  }
  public setTwoArrTwo(arr:string[]): void{
    this.twoArrTwo = arr;
  }
}
