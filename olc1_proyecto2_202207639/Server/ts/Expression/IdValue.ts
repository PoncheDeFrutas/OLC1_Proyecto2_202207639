import {Expression} from "../Abstract/Expression";
import {Environment} from "../Symbol/Environment";
import {dataType, Result} from "../Abstract/Result";

export class IdValue extends Expression{

    constructor(private id: string, line: number, column: number) {
        super(line, column);
    }

    public interpreter(environment: Environment): Result {
        const value = environment.getVariable(this.id);
        if (value != null) {
            return {value: value.value, type: value.type};
        }
        const vector = environment.getVectors(this.id);
        if (vector != null) {
            return {value: vector.id, type: dataType.ID};
        }
        throw new Error("Variable " + this.id + " does not exist (Id Value)");
    }
}