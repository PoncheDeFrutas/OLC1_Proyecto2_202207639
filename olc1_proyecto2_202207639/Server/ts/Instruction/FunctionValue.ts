import { Expression } from "../Abstract/Expression";
import { dataType, Result } from "../Abstract/Result";
import { Environment } from "../Symbol/Environment";
import { Instruction } from "../Abstract/Instruction";
import { Block } from "./Block";


export class FunctionValue extends Instruction {

    public id: string;
    public parameters: Array<Expression>

    constructor(id: string, parameters: Array<Expression>, line: number, column: number) {
        super(line, column);
        this.id = id;
        this.parameters = parameters;
    }

    public interpreter(environment: Environment, tConsole: string[]): Result {
        const func = environment.getFunction(this.id);
        const newEnv = new Environment(environment.getGlobal());
        if (func != null) {
            if (func.parameters.length == this.parameters.length) {
                for (let i = 0; i < this.parameters.length; i++) {
                    func.parameters[i].interpreter(newEnv, tConsole);
                    const result = this.parameters[i].interpreter(newEnv);
                    const element = Array.from(newEnv.variables)[i];
                    if (element[1].type == result.type) {
                        newEnv.editVariable(element[0], result.value, result.type, this.line, this.column);
                    } else {
                        throw new Error("The type of the parameter is incorrect");
                    }
                }
                const block:Block = func.block;
                const element = block.interpreter(newEnv, tConsole);
                console.log(tConsole)
                if (element != null || element != undefined) {
                    if (element.type == 'return' && func.type == element.typeValue) {
                        return {value: element.value, type: func.type};
                    } else {
                        throw Error(`Error: Type [${element.type}] is not valid for [Function] code`);
                    }
                }
            } else {
                throw new Error("The number of parameters is incorrect");
            }
        }
        return {value: null, type: dataType.NULL};
    }
}