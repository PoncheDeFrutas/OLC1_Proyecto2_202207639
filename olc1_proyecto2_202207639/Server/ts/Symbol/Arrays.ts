import { Symbol } from "./Symbol";
import {dataType} from "../Abstract/Result";

export class Arrays{
    public values : Symbol[];
    public type: dataType;

    constructor(type: dataType){
        this.values = [];
        this.type = type;
    }

    public getValue(index: number){
        return this.values[index];
    }

    public setValue(index: number, value: Symbol){
        this.values[index] = value;
    }

}