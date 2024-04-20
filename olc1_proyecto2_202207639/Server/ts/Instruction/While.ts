import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import { dataType } from "../Abstract/Result";
import {tError} from "../tConsole";
import {Error_} from "../Error";

export class While extends Instruction {

    constructor(private condition: Expression, private code: Instruction, line: number, column: number) {
        super(line, column);
    }

    public interpreter(env: Environment): any {

        let condition = this.condition.interpreter(env);
        if (condition.type != dataType.BOOL) {
            throw tError.push(new Error_(tError.length, "Semantico",
                `Tipo ${condition.type}  no es valido para la condición [While]`, this.line, this.column ))
        }

        while (condition.value) {
            condition = this.condition.interpreter(env);
            if (condition.type != dataType.BOOL) {
                throw tError.push(new Error_(tError.length, "Semantico",
                    `Tipo ${condition.type}  no es valido para la condición [While]`, this.line, this.column ))
            }
            const element = this.code.interpreter(env);
            if (element != null || element != undefined) {
                if (element.type == 'break') {
                    break;
                } else if (element.type == 'continue') {
                    continue;
                } else if (element.typeValue == 'return') {
                    return element;
                } else{
                    throw tError.push(new Error_(tError.length, "Semantico",
                        `Tipo ${condition.type} no es valido para retorno [While]`, this.line, this.column ))
                }
            }
        }
    }
}