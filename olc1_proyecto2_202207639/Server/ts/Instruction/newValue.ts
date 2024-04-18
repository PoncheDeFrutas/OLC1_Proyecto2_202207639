import {Instruction} from '../Abstract/Instruction';
import {Expression} from '../Abstract/Expression';
import {Environment} from '../Symbol/Environment';
import {dataType} from '../Abstract/Result';

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
            const vector = environment.getVectors(this.id);
            if (vector == null) {
                throw new Error(`Variable ${this.id} doesn't exist`)
            } else {
                if (this.value != null) {
                    const value = this.value.interpreter(environment);
                    if (value.type != dataType.ID){
                        throw new Error(`Type Error: ${value.type} is not assignable to ${dataType.ID}`)
                    } else {
                        const vector2 = environment.getVectors(value.value);
                        if (vector2 == null) {
                            throw new Error(`Vector ${value.value} doesn't exist`)
                        } else {
                            if (vector.values.length != vector2.values.length || vector.values[0].length != vector2.values[0].length) {
                                throw new Error("Error: The vectors have different dimensions")
                            } else{
                                environment.getVectors(this.id)?.setVector(vector2.values);
                            }
                        }
                    }
                } else {
                    throw new Error("Error: Value can't be null");
                }
            }
        } else{
            if (this.value != null) {
                const value = this.value.interpreter(environment);
                if (val.type != value.type) {
                    throw new Error(`Type Error: ${value.type} is not assignable to ${val.type}`)
                }
                environment.editVariable(this.id, value.value, value.type, val.line, val.column);
            } else {
                throw new Error("Error: Value can't be null");
            }
        }
        return null
    }
}