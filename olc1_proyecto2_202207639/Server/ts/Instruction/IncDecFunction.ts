import { env } from "process";
import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import {dataType, Result} from "../Abstract/Result";
import {tError} from "../tConsole";
import {Error_} from "../Error";

export class IncDecFunction extends Instruction {

        private id: string;
        private IncDec: boolean;

        constructor(id: string, IncDec: boolean, line: number, column: number) {
            super(line, column);
            this.id = id;
            this.IncDec = IncDec;
        }

        public interpreter(environment: Environment): Result {
            const value = environment.getVariable(this.id);

            if (value == null) {
                throw tError.push(new Error_(tError.length, "Semantico",
                    `La variable ${this.id} no existe`, this.line, this.column))
            }

            if (value.type == dataType.NUMBER || value.type == dataType.DOUBLE) {
                if (this.IncDec) {
                    environment.editVariable(this.id, value.value + 1, value.type, <number>environment.getVariable(this.id)?.line, <number>environment.getVariable(this.id)?.column );
                    return {value: value.value + 1, type: value.type}
                } else {
                    environment.editVariable(this.id, value.value - 1, value.type, <number>environment.getVariable(this.id)?.line, <number>environment.getVariable(this.id)?.column);
                    return {value: value.value - 1, type: value.type}
                }
            } else{
                throw tError.push(new Error_(tError.length, "Semantico",
                    `La variable ${this.id} no es asignable a incremento o decremento`, this.line, this.column))
            }
        }
}