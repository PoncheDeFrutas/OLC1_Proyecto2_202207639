import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import { dataType } from "../Abstract/Result";

export class DoWhile extends Instruction {

    constructor(private condition: Expression, private code: Instruction, line: number, column: number) {
        super(line, column);
    }

    public interpreter(env: Environment): any {
        let condition = this.condition.interpreter(env);
        if (condition.type != dataType.BOOL) {
            throw Error(`Error: Type [${condition.type}] is not valid for [While] condition`);
        }

        do {
            const element = this.code.interpreter(env);
            if (element != null || element != undefined) {
                if (element.type == 'break') {
                    break;
                } else if (element.type == 'continue') {
                    continue;
                } else {
                    throw Error(`Error: Type [${element.type}] is not valid for [Do While] code`);
                }
            }
            condition = this.condition.interpreter(env);
            if (condition.type != dataType.BOOL) {
                throw Error(`Error: Type [${condition.type}] is not valid for [Do While] condition`);
            }
        } while (condition.value);
    }
}