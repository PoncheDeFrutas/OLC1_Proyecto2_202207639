import { Instruction } from "../Abstract/Instruction";
import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import { dataType } from "../Abstract/Result";
import {tError} from "../tConsole";
import {Error_} from "../Error";
import Counter from "../Symbol/Counter";

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

    /*
    * ID ([exp]|[exp][exp]) = exp;
    * */
    public getAst(last: string): string{
        let result = ""
        let counter = Counter.getInstance()
        let newVectorValueNodeT = `n${counter.get()}`
        let idNode = `n${counter.get()}`
        let rbracketNode = `n${counter.get()}`
        let exp1Node = `n${counter.get()}`
        let lbracketNode = `n${counter.get()}`
        result += `${newVectorValueNodeT}[label="I_newVectorValue"];\n`
        result += `${idNode}[label="${this.id}"];\n`
        result += `${lbracketNode}[label="["];\n`
        result += `${exp1Node}[label="Expresion"];\n`
        result += `${rbracketNode}[label="]"];\n`
        result += `${last} -> ${newVectorValueNodeT};\n`
        result += `${newVectorValueNodeT} -> ${idNode};\n`
        result += `${newVectorValueNodeT} -> ${lbracketNode};\n`
        result += `${newVectorValueNodeT} -> ${exp1Node};\n`
        result += this.x.getAst(exp1Node);
        result += `${newVectorValueNodeT} -> ${rbracketNode};\n`
        if (this.y != null){
            let exp2Node = `n${counter.get()}`
            let lbracketNode2 = `n${counter.get()}`
            let rbracketNode2 = `n${counter.get()}`
            result += `${lbracketNode2}[label="["];\n`
            result += `${exp2Node}[label="Expresion"];\n`
            result += `${rbracketNode2}[label="]"];\n`
            result += `${newVectorValueNodeT} -> ${lbracketNode2};\n`
            result += `${newVectorValueNodeT} -> ${exp2Node};\n`
            result += this.y.getAst(exp2Node);
            result += `${newVectorValueNodeT} -> ${rbracketNode2};\n`
        }
        let equalNode = `n${counter.get()}`
        let expNode = `n${counter.get()}`
        let semicolonNode = `n${counter.get()}`
        result += `${equalNode}[label="="];\n`
        result += `${expNode}[label="Expresion"];\n`
        result += `${semicolonNode}[label=";"];\n`
        result += `${newVectorValueNodeT} -> ${equalNode};\n`
        result += `${newVectorValueNodeT} -> ${expNode};\n`
        result += this.value.getAst(expNode);
        result += `${newVectorValueNodeT} -> ${semicolonNode};\n`
        return result
    }
}