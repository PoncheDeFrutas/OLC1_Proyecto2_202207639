import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";

export class Function extends Instruction{

    constructor(private id:string, private statement:Instruction, public parameters: Array<string>, line: number, column: number){
        super(line, column);
    }

    public interpreter(environment: Environment, tConsole: string[]){
        environment.saveFunction(this.id, this);
        return null;
    }
}