import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import { dataType } from "../Abstract/Result";

export class DoWhile extends Instruction {

    constructor(private condition: Expression, private code: Instruction, line: number, column: number) {
        super(line, column);
    }

    public interpreter(env: Environment,  tConsole: string[]): any {
        let condition = this.condition.interpreter(env);
        if (condition.type != dataType.BOOL) {
            throw Error(`Error: Type [${condition.type}] is not valid for [While] condition`);
        }

        do {
            condition = this.condition.interpreter(env);
            if (condition.type != dataType.BOOL) {
                throw Error(`Error: Type [${condition.type}] is not valid for [Do While] condition`);
            }
            const element = this.code.interpreter(env, tConsole);
            if (element != null || element != undefined) {
                if (element.type == 'break') {
                    break;
                } else if (element.type == 'continue') {
                    continue;
                } else {
                    throw Error(`Error: Type [${element.type}] is not valid for [Do While] code`);
                }
            }
        } while (condition.value);
    }
}