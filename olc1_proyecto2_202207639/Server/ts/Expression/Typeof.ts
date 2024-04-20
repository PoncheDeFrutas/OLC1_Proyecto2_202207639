import {Environment} from "../Symbol/Environment";
import {Expression} from "../Abstract/Expression";
import {dataType, Result} from "../Abstract/Result";
import {tError} from "../tConsole";
import {Error_} from "../Error";

export class Typeof extends Expression{

    private exp:Expression;

    constructor(exp:Expression, line:number, column:number) {
        super(line, column);
        this.exp = exp
    }

    public interpreter(environment: Environment): Result {
        const result = this.exp.interpreter(environment);
        let temporalType:dataType = dataType.NULL;
        if (result.type == dataType.ID){
            temporalType = <dataType>environment.getVectors(result.value)?.type
        } else{
            temporalType = result.type
        }

        switch (temporalType) {
            case dataType.NUMBER:
                return {value: "int", type:temporalType}
            case dataType.DOUBLE:
                return {value: "double", type:temporalType}
            case dataType.BOOL:
                return {value: "bool", type:temporalType}
            case dataType.CHAR:
                return {value: "char", type:temporalType}
            case dataType.STRING:
                return {value: "string", type:temporalType}
            default:
                throw tError.push(new Error_(tError.length, "Semantico",
                    `Tipo ${temporalType} no valido para operación typeof`, this.line, this.column ))
        }
    }
}