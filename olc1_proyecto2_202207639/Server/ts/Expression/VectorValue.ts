import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import {dataType, Result} from "../Abstract/Result";
import {tError} from "../tConsole";
import {Error_} from "../Error";

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
}