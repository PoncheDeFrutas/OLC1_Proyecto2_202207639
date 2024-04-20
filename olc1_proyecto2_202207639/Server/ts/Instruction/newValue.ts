import {Instruction} from '../Abstract/Instruction';
import {Expression} from '../Abstract/Expression';
import {Environment} from '../Symbol/Environment';
import {dataType} from '../Abstract/Result';
import {tError} from "../tConsole";
import {Error_} from "../Error";

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
                throw tError.push(new Error_(tError.length, "Semantico",
                    `La variable ${this.id} no existe`, this.line, this.column))
            } else {
                if (this.value != null) {
                    const value = this.value.interpreter(environment);
                    if (value.type != dataType.ID){
                        throw tError.push(new Error_(tError.length, "Semantico",
                            `Tipo ${value.type} no es asignable a ${dataType.ID}`, this.line, this.column))
                    } else {
                        const vector2 = environment.getVectors(value.value);
                        if (vector2 == null) {
                            throw tError.push(new Error_(tError.length, "Semantico",
                                `Vector ${value.value} no existe`, this.line, this.column))
                        } else {
                            if (vector.values.length != vector2.values.length || vector.values[0].length != vector2.values[0].length) {
                                throw tError.push(new Error_(tError.length, "Semantico",
                                    `Vector ${vector2.id} no tiene las mismas dimensiones que ${vector.id}`, this.line, this.column))
                            } else{
                                environment.getVectors(this.id)?.setVector(vector2.values);
                            }
                        }
                    }
                } else {
                    throw tError.push(new Error_(tError.length, "Semantico",
                        `El valor de asignación no puede ser nulo`, this.line, this.column))
                }
            }
        } else{
            if (this.value != null) {
                const value = this.value.interpreter(environment);
                if (val.type != value.type) {
                    throw tError.push(new Error_(tError.length, "Semantico",
                        `Tipo ${value.type} no es asignable a ${val.type}`, this.line, this.column))
                }
                environment.editVariable(this.id, value.value, value.type, val.line, val.column);
            } else {
                throw tError.push(new Error_(tError.length, "Semantico",
                    `El valor de asignación no puede ser nulo`, this.line, this.column))
            }
        }
        return null
    }
}