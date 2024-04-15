import { Expression } from "../Abstract/Expression";
import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { Case } from "./Case";
import { Default } from "./Default";

export class Switch extends Instruction{
    condition: Expression
    Cases: Case[] | null
    Default: Default | null

    constructor(condition: Expression, Cases: Case[] | null , Default: Default | null, line: number, column: number) {
        super(line, column);
        this.condition = condition;
        this.Cases = Cases;
        this.Default = Default;
    }

    public interpreter(environment: Environment, tConsole: string[]): any {
        if (this.Cases == null && this.Default == null){
            throw Error("Error: No [Cases] or [Default] code")
        }

        let value = false;
        const condition = this.condition.interpreter(environment);
        const newEnv = new Environment(environment);
        if (this.Cases != null){
            for (const Case of this.Cases) {
                const element = Case.condition.interpreter(newEnv);
                if (element.value == condition.value && element.type == condition.type){
                    const result =  Case.interpreter(newEnv, tConsole);
                    if (result != null || result != undefined){
                        if (result.type == 'break') {
                            break;
                        }  else{
                            throw Error(`Error: Type [${result.type}] is not valid for [Case] code`);
                        }
                    }
                    value = true;
                } else {
                    if (value){
                        const result = Case.interpreter(newEnv, tConsole);
                        if (result != null || result != undefined){
                            if (result.type == 'break') {
                                value = false;
                                break;
                            } else{
                                throw Error(`Error: Type [${result.type}] is not valid for [Case] code`);
                            }
                        }
                    }
                }
            }
            if(this.Default != null && value){
                const result = this.Default.interpreter(newEnv, tConsole);
                if (result != null || result != undefined){
                    throw Error(`Error: Type [${result.type}] is not valid for [Default] code`);
                }
            }
        } else if (this.Default != null){
            const result = this.Default.interpreter(newEnv, tConsole);
            if (result != null || result != undefined){
                throw Error(`Error: Type [${result.type}] is not valid for [Default] code`);
            }
        }
    }
}