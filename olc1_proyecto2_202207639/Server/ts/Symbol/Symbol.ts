import { dataType } from "../Abstract/Result";

export class Symbol{
    public id: string;
    public value: any;
    public type: dataType;

    constructor(id: string, type: dataType, value: any) {
        this.id = id;
        this.type = type;
        this.value = value;
    }
}