import { Instruction } from "../Abstract/Instruction";
import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import { dataType } from "../Abstract/Result";

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

        public interpreter(environment: Environment, tConsole: string[]): null {
            const vector = environment.getVectors(this.id);
            const value = this.value.interpreter(environment);
            if (vector == null) {
                throw new Error(`Vector ${this.id} doesn't exist`);
            }

            if (vector.type != value.type){
                throw new Error(`Type Error: ${value.type} is not assignable to ${vector.type}`)
            }

            const x = this.x.interpreter(environment);

            if (this.y != null){
                const y = this.y.interpreter(environment);
                if (x.type != dataType.NUMBER || y.type != dataType.NUMBER){
                    throw new Error(`Type Error: ${x.type} is not assignable to NUMBER`)
                }
                environment.getVectors(this.id)?.setValue(x.value, y.value, "VectorV", vector.type, value.value, this.line, this.column)
            } else {
                if (x.type != dataType.NUMBER){
                    throw new Error(`Type Error: ${x.type} is not assignable to NUMBER`)
                }
                environment.getVectors(this.id)?.setValue(x.value, 0, "VectorV", vector.type, value.value, this.line, this.column)
            }
            return null
        }
}