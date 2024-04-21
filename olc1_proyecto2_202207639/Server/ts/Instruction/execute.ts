import {Instruction} from "../Abstract/Instruction";
import {Environment} from "../Symbol/Environment";
import {dataType, Result} from "../Abstract/Result";
import {FunctionValue} from "./FunctionValue";
import {tError} from "../tConsole";
import {Error_} from "../Error";
import Counter from "../Symbol/Counter";

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

    /*
    * execute functionValue ;
    */
    public getAst(last: string): string{
        let result = "";
        let counter = Counter.getInstance();
        let executeNodeT = `n${counter.get()}`;
        let executeNode = `n${counter.get()}`;
        let functionNode = `n${counter.get()}`;
        result += `${executeNodeT}[label="I_execute"];\n`;
        result += `${executeNode}[label="execute"];\n`;
        result += `${functionNode}[label="functionValue"];\n`;
        result += `${last} -> ${executeNodeT};\n`;
        result += `${executeNodeT} -> ${executeNode};\n`;
        result += `${executeNodeT} -> ${functionNode};\n`;
        result += this.Function.getAst(functionNode);
        let semicolonNode = `n${counter.get()}`;
        result += `${semicolonNode}[label=";"];\n`;
        result += `${executeNodeT} -> ${semicolonNode};\n`;
        return result;
    }
}