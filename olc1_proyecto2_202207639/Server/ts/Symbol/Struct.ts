import { Symbol } from "./Symbol";

export class Struct {
    public attributes: Map<string, Symbol>;

    constructor(){
        this.attributes = new Map();
    }

    public getAttribute(id: string){
        return this.attributes.get(id);
    }

    public addAttribute(symbol: Symbol){
        this.attributes.set(symbol.id, symbol);
    }
}