import { Expression } from "../Abstract/Expression";
import { Environment} from "../Symbol/Environment";
import { Result} from "../Abstract/Result";

export class IdValue extends Expression{

    constructor(private id: string, line: number, column: number) {
        super(line, column);
    }

    public interpreter(environment: Environment): Result {
        const value = environment.getVariable(this.id);
        if (value == null) {
            throw new Error(`Variable ${this.id} doesn't exist`);
        }
        return {value: value.value, type: value.type};
    }
}