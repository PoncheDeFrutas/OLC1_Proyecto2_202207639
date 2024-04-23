import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import { dataType } from "../Abstract/Result";
import {tError} from "../tConsole";
import {Error_} from "../Error";
import Counter from "../Symbol/Counter";

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


    /*
    * while ( exp ) block
    * */
    public getAst(last: string): string{
        let result = ""
        let counter = Counter.getInstance()
        let whileNodeT = `n${counter.get()}`
        let whileNode = `n${counter.get()}`
        let lParenNode = `n${counter.get()}`
        let expressionNode = `n${counter.get()}`
        let rParenNode = `n${counter.get()}`
        let blockNode = `n${counter.get()}`
        result += `${whileNodeT}[label="I_While"];\n`
        result += `${whileNode}[label="While"];\n`
        result += `${lParenNode}[label="("];\n`
        result += `${expressionNode}[label="Expression"];\n`
        result += `${rParenNode}[label=")"];\n`
        result += `${blockNode}[label="Block"];\n`
        result += `${last} -> ${whileNodeT};\n`
        result += `${whileNodeT} -> ${whileNode};\n`
        result += `${whileNode} -> ${lParenNode};\n`
        result += `${whileNode} -> ${expressionNode};\n`
        result += this.condition.getAst(expressionNode);
        result += `${whileNode} -> ${rParenNode};\n`
        result += `${whileNode} -> ${blockNode};\n`
        result += this.code.getAst(blockNode);
        return result

    }
}