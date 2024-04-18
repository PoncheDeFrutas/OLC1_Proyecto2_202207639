import {Environment} from "../Symbol/Environment";
import {Expression} from "../Abstract/Expression";
import {dataType, Result} from "../Abstract/Result";

export class Length extends Expression{

    private exp: Expression;

    constructor(exp:Expression, line:number, column:number) {
        super(line, column);
        this.exp = exp
    }

    public interpreter(environment: Environment): Result {
        const result = this.exp.interpreter(environment);
        if (result.type == dataType.ID){
            const vector = environment.getVectors(result.value)
            return {value:vector?.values.length, type:dataType.NUMBER }
        } else if(result.type == dataType.STRING){
            return {value: result.value.length, type:dataType.NUMBER }
        } else{
            throw Error("Error: Type mismatch")
        }
    }
}