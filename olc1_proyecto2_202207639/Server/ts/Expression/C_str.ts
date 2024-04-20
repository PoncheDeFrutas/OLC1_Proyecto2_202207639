import {Environment} from "../Symbol/Environment";
import {Expression} from "../Abstract/Expression";
import {dataType, Result} from "../Abstract/Result";
import {Primitive} from "./Primitive";
import {tError} from "../tConsole";
import {Error_} from "../Error";

export class C_str extends Expression{

    private exp: Expression;

    constructor(exp:Expression, line:number, column:number) {
        super(line, column);
        this.exp = exp
    }

    public interpreter(environment: Environment): Result {
        const result = this.exp.interpreter(environment);
        if (result.type != dataType.STRING){
            throw tError.push(new Error_(tError.length, "Semantico",
                `Tipo ${result.type} Invalido en Operación C_str`, this.line, this.column ))
        }
        const array:Expression[] = [];
        const word  = <string>result.value
        for (let i = 0; i < word.length; i++){
            array.push(new Primitive(result.value[i], dataType.CHAR, this.line, this.column))
        }

        return {value: array, type:dataType.CHAR};
    }
}