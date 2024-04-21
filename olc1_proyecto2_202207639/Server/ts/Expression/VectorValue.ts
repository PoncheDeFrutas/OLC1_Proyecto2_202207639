import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import {dataType, Result} from "../Abstract/Result";
import {tError} from "../tConsole";
import {Error_} from "../Error";
import Counter from "../Symbol/Counter";

export class VectorValue extends Expression{

    public id: string;
    public x: Expression;
    public y: Expression | null;

    constructor(id: string, x: Expression, y: Expression | null, line: number, column: number){
        super(line, column);
        this.id = id;
        this.x = x;
        this.y = y;
    }

    public interpreter(environment: Environment): Result {
        const vector = environment.getVectors(this.id);
        const x = this.x.interpreter(environment);
        if (x.type != dataType.NUMBER){
            throw tError.push(new Error_(tError.length, "Semantico",
                `Tipo ${x.type} no valido para obtener valor de vector`, this.line, this.column ))
        }
        let y;
        if (this.y != null){
            y = this.y.interpreter(environment).value;
        } else{
            y = 0;
        }
        if (vector == null) {
            throw tError.push(new Error_(tError.length, "Semantico",
                `Vector ${this.id} no existe`, this.line, this.column ))
        }
        return {value: vector.getValue(x.value,y).value, type: vector.type};
    }

    /*
    * ID [exp]( | [exp])
    * */
    public getAst(last: string): string{
        let result = ""
        let counter = Counter.getInstance()
        let vectorValueNodeT = `n${counter.get()}`
        let idNode = `n${counter.get()}`
        let lBracketNode = `n${counter.get()}`
        let expNode = `n${counter.get()}`
        let rBracketNode = `n${counter.get()}`
        result += `${vectorValueNodeT}[label="VectorValue"];\n`
        result += `${idNode}[label="${this.id}"];\n`
        result += `${lBracketNode}[label="["];\n`
        result += `${expNode}[label="Expresion"];\n`
        result += `${rBracketNode}[label="]"];\n`
        result += `${last} -> ${vectorValueNodeT};\n`
        result += `${vectorValueNodeT} -> ${idNode};\n`
        result += `${vectorValueNodeT} -> ${lBracketNode};\n`
        result += `${vectorValueNodeT} -> ${expNode};\n`
        result += this.x.getAst(expNode)
        result += `${vectorValueNodeT} -> ${rBracketNode};\n`
        if (this.y != null){
            let lbracketNode = `n${counter.get()}`
            let expNode = `n${counter.get()}`
            let rbracketNode = `n${counter.get()}`
            result += `${lbracketNode}[label="["];\n`
            result += `${expNode}[label="Expresion"];\n`
            result += `${rbracketNode}[label="]"];\n`
            result += `${vectorValueNodeT} -> ${lbracketNode};\n`
            result += `${vectorValueNodeT} -> ${expNode};\n`
            result += this.y.getAst(expNode)
            result += `${vectorValueNodeT} -> ${rbracketNode};\n`
        }
        return result
    }
}