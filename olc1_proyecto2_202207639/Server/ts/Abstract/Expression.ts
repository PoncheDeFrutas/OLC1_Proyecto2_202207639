import { Result } from "./Result";
import { Environment } from "../Symbol/Environment";

export abstract class Expression {
    public line: number;
    public column: number;

    protected constructor(line: number, column: number) {
        this.line = line;
        this.column = column;
    }

    public abstract interpreter(environment: Environment): Result;
}