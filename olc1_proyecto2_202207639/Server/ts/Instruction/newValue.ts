import { Instruction } from '../Abstract/Instruction';
import { Expression } from '../Abstract/Expression';
import { Environment } from '../Symbol/Environment';
import { dataType } from '../Abstract/Result';

export class newValue extends Instruction {

    private id: string;
    private value: Expression | null;

    constructor(id: string, value: Expression | null, line: number, column: number) {
        super(line, column);
        this.id = id;
        this.value = value;
    }

    public interpreter(environment: Environment): null {
        const val = environment.getVariable(this.id);
        if (val == null) {
            throw new Error(`Variable ${this.id} doesn't exist`);
        }

        if (this.value != null) {
            const value = this.value.interpreter(environment);
            if (val.type != value.type) {
                throw new Error(`Type Error: ${value.type} is not assignable to ${val.type}`)
            }
            environment.editVariable(this.id, value.value, value.type, val.line, val.column);
        } else {
            throw new Error("Error: Value can't be null");
        }
        return null
    }
}