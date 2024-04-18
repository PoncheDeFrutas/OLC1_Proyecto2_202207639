import {Environment} from "../Symbol/Environment";
import {Expression} from "../Abstract/Expression";
import {dataType, Result} from "../Abstract/Result";

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
                throw Error("Error: Type not valid")
        }
    }
}