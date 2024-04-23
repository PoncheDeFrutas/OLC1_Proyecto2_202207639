import { Expression } from "../Abstract/Expression";
import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { Case } from "./Case";
import { Default } from "./Default";
import {tError} from "../tConsole";
import {Error_} from "../Error";
import Counter from "../Symbol/Counter";

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

    public interpreter(environment: Environment): any {
        if (this.Cases == null && this.Default == null){
            throw tError.push(new Error_(tError.length, "Semantico",
                `No hay Cases o Default en [Switch]`, this.line, this.column))
        }

        let value = false;
        let aDefault = true;
        const condition = this.condition.interpreter(environment);
        const newEnv = new Environment(environment);
        if (this.Cases != null){
            for (const Case of this.Cases) {
                const element = Case.condition.interpreter(newEnv);
                if (element.value == condition.value && element.type == condition.type && !value){
                    const result =  Case.interpreter(newEnv);
                    if (result != null || result != undefined){
                        if (result.type == 'break') {
                            aDefault = false;
                            break;
                        } else if (result.typeValue == 'return') {
                            return result
                        } else{
                            throw tError.push(new Error_(tError.length, "Semantico",
                                `Tipo ${condition.type} no es valido para retorno [Case]`, this.line, this.column ))
                        }
                    }
                    value = true;
                } else if(value){
                    const result = Case.interpreter(newEnv);
                    if (result != null || result != undefined){
                        if (result.type == 'break') {
                            aDefault = false;
                            value = false;
                            break;
                        } else if (result.typeValue == 'return') {
                            return result
                        } else{
                            throw tError.push(new Error_(tError.length, "Semantico",
                                `Tipo ${condition.type} no es valido para retorno [Case]`, this.line, this.column ))
                        }
                    }
                }
            }
            if (this.Default != null && value){
                aDefault = false;
                const result = this.Default.interpreter(newEnv);
                if (result != null || result != undefined){
                    if (result.type == 'break') {
                        return;
                    } else if (result.typeValue == 'return') {
                        return result
                    } else{
                        throw tError.push(new Error_(tError.length, "Semantico",
                            `Tipo ${condition.type} no es valido para retorno [Default]`, this.line, this.column ))
                    }
                }
            }
        }
        if (this.Default != null && aDefault){
            const result = this.Default.interpreter(newEnv);
            if (result != null || result != undefined){
                if (result.type == 'break') {
                    return;
                } else if (result.typeValue == 'return') {
                    return result
                } else{
                    throw tError.push(new Error_(tError.length, "Semantico",
                        `Tipo ${condition.type} no es valido para retorno [Default]`, this.line, this.column ))
                }
            }
        }
    }
    /*
    * switch ( exp ) { case list, default }
    */

    public getAst(last: string): string{
        let result = ""
        let counter = Counter.getInstance()
        let switchNodeT = `n${counter.get()}`
        let switchNode = `n${counter.get()}`
        let lParenNode = `n${counter.get()}`
        let expNode = `n${counter.get()}`
        let rParenNode = `n${counter.get()}`
        let lBraceNode = `n${counter.get()}`
        let casesNode = `n${counter.get()}`
        let defaultNode = `n${counter.get()}`
        let rBraceNode = `n${counter.get()}`
        result += `${switchNodeT}[label="I_Switch"];\n`
        result += `${switchNode}[label="switch"];\n`
        result += `${lParenNode}[label="("];\n`
        result += `${expNode}[label="exp"];\n`
        result += `${rParenNode}[label=")"];\n`
        result += `${lBraceNode}[label="{" ];\n`
        result += `${casesNode}[label="Cases"];\n`
        result += `${defaultNode}[label="Default"];\n`
        result += `${rBraceNode}[label="}"];\n`
        result += `${last} -> ${switchNodeT};\n`
        result += `${switchNodeT} -> ${switchNode};\n`
        result += `${switchNodeT} -> ${lParenNode};\n`
        result += `${switchNodeT} -> ${expNode};\n`
        result += this.condition.getAst(expNode)
        result += `${switchNodeT} -> ${rParenNode};\n`
        result += `${switchNodeT} -> ${lBraceNode};\n`
        result += `${switchNodeT} -> ${casesNode};\n`
        if (this.Cases != null){
            for (const Case of this.Cases) {
                result += Case.getAst(casesNode)
            }
        }
        result += `${switchNodeT} -> ${defaultNode};\n`
        if (this.Default != null){
            result += this.Default.getAst(defaultNode)
        }
        result += `${switchNodeT} -> ${rBraceNode};\n`
        return result
    }
}