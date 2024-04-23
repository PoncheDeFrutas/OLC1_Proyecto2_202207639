import { Symbol } from "./Symbol";
import { dataType } from "../Abstract/Result";

export class Arrays{
    public id: string;
    public values : Symbol[][];
    public type: dataType;
    public line: number;
    public column: number;

    constructor(id:string, type: dataType, rows:number, columns:number, line: number, column: number){
        this.id = id;
        this.type = type;
        this.line = line;
        this.column = column;
        this.values = new Array(rows);
        for (let i = 0; i < rows; i++) {
            this.values[i] = new Array(columns);
        }
    }

    public getValue(x: number, y:number){
        if (x < 0 || x >= this.values.length || y < 0 || y >= this.values[0].length){
            throw Error("Index out of bounds");
        }
        return this.values[x][y];
    }

    public setValue(x: number, y:number,id: string, type: dataType, value: any, line: number, column: number){
        if (x < 0 || x >= this.values.length || y < 0 || y >= this.values[0].length){
            throw Error("Index out of bounds");
        }
        this.values[x][y] = new Symbol(id, type, value, line, column);
    }

    public defaultValues(id: string, type: dataType, value: any, line: number, column: number){
        for (let i = 0; i < this.values.length; i++) {
            for (let j = 0; j < this.values[i].length; j++) {
                this.values[i][j] = new Symbol(id, type, value, line, column);
            }
        }
    }

    public setVector(vector: Symbol[][]){
        this.values = vector;
    }
}