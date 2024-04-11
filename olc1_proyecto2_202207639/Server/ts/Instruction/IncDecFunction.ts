import { env } from "process";
import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { dataType } from "../Abstract/Result";

export class IncDecFunction extends Instruction {

        private id: string;
        private IncDec: boolean;

        constructor(id: string, IncDec: boolean, line: number, column: number) {
            super(line, column);
            this.id = id;
            this.IncDec = IncDec;
        }

        public interpreter(environment: Environment, tConsole: string[]): null {
            const value = environment.getVariable(this.id);

            if (value == null) {
                throw new Error(`Variable ${this.id} doesn't exist`);
            }

            if (value.type == dataType.NUMBER || value.type == dataType.DOUBLE) {
                if (this.IncDec) {
                    environment.editVariable(this.id, value.value + 1, value.type);
                } else {
                    environment.editVariable(this.id, value.value - 1, value.type);
                }
            } else{
                throw new Error(`Type Error: ${value.type} is not assignable to number`)
            }
            return null;
        }
}