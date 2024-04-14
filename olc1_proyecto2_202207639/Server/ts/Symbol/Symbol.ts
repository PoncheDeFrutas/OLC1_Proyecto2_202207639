import { dataType } from "../Abstract/Result";

export class Symbol{
    public id: string;
    public value: any;
    public type: dataType;
    public line: number;
    public column: number;

    constructor(id: string, type: dataType, value: any, line: number, column: number) {
        this.id = id;
        this.type = type;
        this.value = value;
        this.line = line;
        this.column = column;
    }
}