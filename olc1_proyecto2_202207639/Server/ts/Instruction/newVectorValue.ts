import { Instruction } from "../Abstract/Instruction";
import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import { dataType } from "../Abstract/Result";
import {tError} from "../tConsole";
import {Error_} from "../Error";

export class newVectorValue extends Instruction{

        private id: string;
        private x: Expression;
        private y: Expression | null;
        private value: Expression;

        constructor(id: string, x: Expression, y: Expression | null, value: Expression, line: number, column: number){
            super(line, column);
            this.id = id;
            this.x = x;
            this.y = y;
            this.value = value;
        }

        public interpreter(environment: Environment): null {
            const vector = environment.getVectors(this.id);
            const value = this.value.interpreter(environment);
            if (vector == null) {
                throw tError.push(new Error_(tError.length, "Semantico",
                    `Vector ${this.id} no existe`, this.line, this.column))
            }

            if (vector.type != value.type){
                throw tError.push(new Error_(tError.length, "Semantico",
                    `Tipo: ${value.type} no es asignable a  ${vector.type}`, this.line, this.column))
            }

            const x = this.x.interpreter(environment);

            if (this.y != null){
                const y = this.y.interpreter(environment);
                if (x.type != dataType.NUMBER || y.type != dataType.NUMBER){
                    throw tError.push(new Error_(tError.length, "Semantico",
                        `Tipo ${x.type} no es asignable a Number`, this.line, this.column))
                }
                environment.getVectors(this.id)?.setValue(x.value, y.value, "VectorV", vector.type, value.value, this.line, this.column)
            } else {
                if (x.type != dataType.NUMBER){
                    throw tError.push(new Error_(tError.length, "Semantico",
                        `Tipo ${x.type} no es asignable a Number`, this.line, this.column))
                }
                environment.getVectors(this.id)?.setValue(x.value, 0, "VectorV", vector.type, value.value, this.line, this.column)
            }
            return null
        }
}