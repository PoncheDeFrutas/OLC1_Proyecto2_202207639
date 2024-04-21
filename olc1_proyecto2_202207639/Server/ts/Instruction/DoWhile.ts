import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import { dataType } from "../Abstract/Result";
import {tError} from "../tConsole";
import {Error_} from "../Error";
import Counter from "../Symbol/Counter";

export class DoWhile extends Instruction {

    constructor(private condition: Expression, private code: Instruction, line: number, column: number) {
        super(line, column);
    }

    public interpreter(env: Environment): any {
        let condition = this.condition.interpreter(env);
        if (condition.type != dataType.BOOL) {
            throw tError.push(new Error_(tError.length, "Semantico",
                `Tipo ${condition.type} no es valido para condicon [Do While]`, this.line, this.column ))

        }

        do {
            const element = this.code.interpreter(env);
            if (element != null || element != undefined) {
                if (element.type == 'break') {
                    break;
                } else if (element.type == 'continue') {
                    continue;
                } else if (element.typeValue == 'return') {
                    return element;
                } else {
                    throw tError.push(new Error_(tError.length, "Semantico",
                        `Tipo ${element.type} no es valido para returno [Do While]`, this.line, this.column ))

                }
            }
            condition = this.condition.interpreter(env);
            if (condition.type != dataType.BOOL) {
                throw tError.push(new Error_(tError.length, "Semantico",
                    `Tipo ${condition.type} no es valido para condion [Do While]`, this.line, this.column ))
            }
        } while (condition.value);
    }

    /*
    * DO block WHILE ( expression ) ;
    * */
    public getAst(last: string): string{
        let result = ""
        let counter = Counter.getInstance()
        let doNodeT = `n${counter.get()}`
        let doNode = `n${counter.get()}`
        let blockNode = `n${counter.get()}`
        let whileNode = `n${counter.get()}`
        let lParenNode = `n${counter.get()}`
        let expressionNode = `n${counter.get()}`
        let rParenNode = `n${counter.get()}`
        let semicolonNode = `n${counter.get()}`
        result += `${doNodeT}[label="I_DoWhile"];\n`
        result += `${doNode}[label="do"];\n`
        result += `${blockNode}[label="block"];\n`
        result += `${whileNode}[label="while"];\n`
        result += `${lParenNode}[label="("];\n`
        result += `${expressionNode}[label="expression"];\n`
        result += `${rParenNode}[label=")"];\n`
        result += `${semicolonNode}[label=";"];\n`
        result += `${last} -> ${doNodeT};\n`
        result += `${doNodeT} -> ${doNode};\n`
        result += `${doNodeT} -> ${blockNode};\n`
        result += this.code.getAst(blockNode)
        result += `${doNodeT} -> ${whileNode};\n`
        result += `${doNodeT} -> ${lParenNode};\n`
        result += `${doNodeT} -> ${expressionNode};\n`
        result += this.condition.getAst(expressionNode)
        result += `${doNodeT} -> ${rParenNode};\n`
        result += `${doNodeT} -> ${semicolonNode};\n`
        return result
    }
}