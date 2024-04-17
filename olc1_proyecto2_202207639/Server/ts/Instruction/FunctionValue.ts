import {Expression} from "../Abstract/Expression";
import {dataType, Result} from "../Abstract/Result";
import {Environment} from "../Symbol/Environment";
import {Instruction} from "../Abstract/Instruction";
import {Block} from "./Block";


export class FunctionValue extends Instruction {

    public id: string;
    public parameters: Array<Expression>

    constructor(id: string, parameters: Array<Expression>, line: number, column: number) {
        super(line, column);
        this.id = id;
        this.parameters = parameters;
    }

    public interpreter(environment: Environment): Result {
        const func = environment.getFunction(this.id);
        if (func != null){
            const newEnv = new Environment(environment.getGlobal());
            if (func.parameters.length != this.parameters.length) {
                throw new Error("Error: Number of parameters is not correct");
            }
            for (let i = 0; i < this.parameters.length; i++) {
                const parameter = func.parameters[i];
                const values = this.parameters[i].interpreter(environment);
                let dominantType: dataType;
                switch (parameter.type) {
                    case "int":
                        dominantType = dataType.NUMBER
                        break;
                    case "double":
                        dominantType = dataType.DOUBLE
                        break;
                    case "bool":
                        dominantType = dataType.BOOL
                        break;
                    case "char":
                        dominantType = dataType.CHAR
                        break;
                    case "std::string":
                        dominantType = dataType.STRING
                        break;
                    default:
                        throw Error("Error: Type not valid")
                }
                if (parameter.vector){
                    if (values.type == dataType.ID){
                        const vector = newEnv.getVectors(values.value);
                        if (vector != null){
                            if (vector.type != dominantType) {
                                throw new Error("Error: Type of parameter is not correct");
                            } else {
                                if (parameter.simple && vector.values[0].length == 1){
                                    newEnv.saveVectors(parameter.id, vector.type, vector.values.length, 1, this.line, this.column);
                                    newEnv.getVectors(parameter.id)?.setVector(vector.values)
                                } else if (!parameter.simple) {
                                    newEnv.saveVectors(parameter.id, vector.type, vector.values.length, vector.values[0].length, this.line, this.column);
                                    newEnv.getVectors(parameter.id)?.setVector(vector.values)
                                } else {
                                    throw new Error("Error: Type of parameter is not correct");
                                }
                            }
                        } else{
                            throw new Error("Error: Vector not found");
                        }
                    } else{
                        throw new Error("Error: Type of parameter is not correct");
                    }
                } else{
                    if (dominantType != values.type) {
                        throw new Error("Error: Type of parameter is not correct");
                    } else {
                        newEnv.save(parameter.id, values.value, values.type, this.line, this.column);
                    }
                }
            }
            const block:Block = func.block;
            const element = block.interpreter(newEnv);
            if (element != null || element != undefined) {
                if (element.type == 'return' && func.type == element.typeValue) {
                    return {value: element.value, type: func.type};
                } else {
                    throw Error(`Error: Type [${element.value}] is not valid for [Function] code`);
                }
            }
        }
        return {value: null, type: dataType.NULL};
    }
}