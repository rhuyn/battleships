import { Injectable } from '@angular/core';
import { SPACES } from '../resources/data';

@Injectable()
export class MemoryService {

  private positions:string[] = [];
  private lSet: boolean = false;
  private bSet: boolean = false;
  private oneSet: boolean = false;
  private twoSet: boolean = false;
  private lArr: string[] = [];
  private bArr: string[] = [];
  private oneArr: string[] = [];
  private twoArr: string[] = [];



  constructor() { }

  public resetPositions(){
    this.positions = ["e","e","e","e","e","e","e","e",
                      "e","e","e","e","e","e","e","e",
                      "e","e","e","e","e","e","e","e",
                      "e","e","e","e","e","e","e","e",
                      "e","e","e","e","e","e","e","e",
                      "e","e","e","e","e","e","e","e",
                      "e","e","e","e","e","e","e","e",
                      "e","e","e","e","e","e","e","e"];
  }
  public setPositions(arr:string[], shape:string):boolean{
    for(var x = 0; x < arr.length; x++){   
      if(this.positions[SPACES.indexOf(arr[x])] !== "e"){
        return true;
      }
    }
    arr.forEach((x)=>{
      if(shape === "L-Shape"){
        this.positions[SPACES.indexOf(x)] = "l"; 
      } else if(shape === "Box-Shape"){
        this.positions[SPACES.indexOf(x)] = "b";
      } else if(shape === "Line-Shape-1"){
        this.positions[SPACES.indexOf(x)] = "o";
      } else if(shape === "Line-Shape-2"){
        this.positions[SPACES.indexOf(x)] = "t";
      }
    })
    if(shape === "L-Shape"){
      this.lSet = true;
      this.lArr = arr;
    } else if(shape === "Box-Shape"){
      this.bSet = true;
      this.bArr = arr;
    } else if(shape === "Line-Shape-1"){
      this.oneSet = true;
      this.oneArr = arr;
    } else if(shape === "Line-Shape-2"){
      this.twoSet = true;
      this.twoArr = arr;
    }
    return false;
  }
}
