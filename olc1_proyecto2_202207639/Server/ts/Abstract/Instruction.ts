import { Environment } from "../Symbol/Environment";

export abstract class Instruction {
    public line: number;
    public column: number;

    protected constructor(line: number, column: number) {
        this.line = line;
        this.column = column;
    }

    public abstract interpreter(environment: Environment, tConsole:string[]): any;
}