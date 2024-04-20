import {Environment} from "../Symbol/Environment";
import {Expression} from "../Abstract/Expression";
import {dataType, Result} from "../Abstract/Result";
import {tError} from "../tConsole";
import {Error_} from "../Error";

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
            throw tError.push(new Error_(tError.length, "Semantico",
                `Expresión no valida para comando length`, this.line, this.column ))
        }
    }
}