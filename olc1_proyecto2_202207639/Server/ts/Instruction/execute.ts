import {Instruction} from "../Abstract/Instruction";
import {Environment} from "../Symbol/Environment";
import {dataType, Result} from "../Abstract/Result";
import {FunctionValue} from "./FunctionValue";
import {tError} from "../tConsole";
import {Error_} from "../Error";

export class execute extends Instruction {

    public Function: FunctionValue;

    constructor(Function: FunctionValue, line: number, column: number){
        super(line, column);
        this.Function = Function;
    }

    public interpreter(environment: Environment): Result {
        if (environment.getFunction(this.Function.id) == null){
            throw tError.push(new Error_(tError.length, "Semantico",
                `La función ${this.Function.id} no existe D:`, this.line, this.column ))

        } else{
            const result = this.Function.interpreter(environment);
            if (result != null){
                return {value: result.value, type: result.type}
            } else{
                return {value: null, type: dataType.NULL};
            }
        }
    }
}