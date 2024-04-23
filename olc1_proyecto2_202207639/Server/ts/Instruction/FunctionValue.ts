import {Expression} from "../Abstract/Expression";
import {dataType, Result} from "../Abstract/Result";
import {Environment} from "../Symbol/Environment";
import {Instruction} from "../Abstract/Instruction";
import {Block} from "./Block";
import {tError} from "../tConsole";
import {Error_} from "../Error";
import Counter from "../Symbol/Counter";


export class FunctionValue extends Instruction {

    public id: string;
    public parameters: Array<Expression>
    public enable: boolean;

    constructor(id: string, parameters: Array<Expression>, enable:boolean,line: number, column: number) {
        super(line, column);
        this.id = id;
        this.parameters = parameters;
        this.enable = enable;
    }

    public interpreter(environment: Environment): any {
        const func = environment.getFunction(this.id);
        if (func != null){
            const newEnv = new Environment(environment.getGlobal());
            if (func.parameters.length != this.parameters.length) {
                throw tError.push(new Error_(tError.length, "Semantico",
                    `Numero de parametros incorrectos para la función ${func.id}`, this.line, this.column ))
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
                        throw tError.push(new Error_(tError.length, "Semantico",
                            `Tipo ${parameter.type}, no permitivo para la declaración de Funciones`, this.line, this.column ))
                }
                if (parameter.vector){
                    if (values.type == dataType.ID){
                        const vector = newEnv.getVectors(values.value);
                        if (vector != null){
                            if (vector.type != dominantType) {
                                throw tError.push(new Error_(tError.length, "Semantico",
                                    `Tipo ${vector.type} de parametro no corresponde al que se asigna`, this.line, this.column ))
                            } else {
                                if (parameter.simple && vector.values[0].length == 1){
                                    newEnv.saveVectors(parameter.id, vector.type, vector.values.length, 1, this.line, this.column);
                                    newEnv.getVectors(parameter.id)?.setVector(vector.values)
                                } else if (!parameter.simple) {
                                    newEnv.saveVectors(parameter.id, vector.type, vector.values.length, vector.values[0].length, this.line, this.column);
                                    newEnv.getVectors(parameter.id)?.setVector(vector.values)
                                } else {
                                    throw tError.push(new Error_(tError.length, "Semantico",
                                        `Tipo ${vector.type} de parametro no corresponde al que se asigna`, this.line, this.column ))
                                }
                            }
                        } else{
                            throw tError.push(new Error_(tError.length, "Semantico",
                                `Vector ${values.value} no ha sido encontrado`, this.line, this.column ))
                        }
                    } else{
                        throw tError.push(new Error_(tError.length, "Semantico",
                            `Tipo de parametro no valido `, this.line, this.column ))
                    }
                } else{
                    if (dominantType != values.type) {
                        throw tError.push(new Error_(tError.length, "Semantico",
                            `Tipo de parametro no valido `, this.line, this.column ))
                    } else {
                        newEnv.save(parameter.id, values.value, values.type, this.line, this.column);
                    }
                }
            }
            const block:Block = func.block;
            const element = block.interpreter(newEnv);
            if ((element != null || element != undefined) && this.enable) {
                if (element.typeValue == 'return' && func.type == element.type) {
                    return {value: element.value, type: func.type};
                } if (element.type == 'break') {
                    return { value: null, type: dataType.NULL };
                } else if (element.type == 'continue') {
                    return { value: null, type: dataType.NULL };
                } else if (func.type == element.type && element.value == null){
                    return { value: null, type: dataType.NULL };
                } else {
                    throw tError.push(new Error_(tError.length, "Semantico",
                        `Tipo de retorno ${element.type} no es valido para la función definida `, this.line, this.column ))
                }
            } else{
                if (func.type == dataType.NULL){
                    return null;
                } else{
                    throw tError.push(new Error_(tError.length, "Semantico",
                        `Tipo de retorno ${element.type} no es valido para la función definida `, this.line, this.column ))
                }
            }
        } else {
            throw tError.push(new Error_(tError.length, "Semantico",
                `La función ${this.id} no existe`, this.line, this.column ))

        }
    }

    /*
    * function_id ( params )
    */
    public getAst(last: string): string{
        let result = "";
        let counter = Counter.getInstance();
        let functionNode = `n${counter.get()}`;
        let lParenNode = `n${counter.get()}`;
        result += `${functionNode}[label="${this.id}"];\n`;
        result += `${lParenNode}[label="("];\n`;
        result += `${last} -> ${functionNode};\n`;
        result += `${last} -> ${lParenNode};\n`;

        if (this.parameters.length != 0){
            let first = `n${counter.get()}`;
            result += `${first}[label="param"];\n`;
            result += `${last} -> ${first};\n`;
            result += this.parameters[0].getAst(first);
            for (let i = 1; i < this.parameters.length; i++){
                if (i < this.parameters.length){
                    let comma = `n${counter.get()}`;
                    result += `${comma}[label=","];\n`;
                    result += `${last} -> ${comma};\n`;
                }
                let param = `n${counter.get()}`;
                result += `${param}[label="param"];\n`;
                result += `${last} -> ${param};\n`;
                result += this.parameters[i].getAst(param);
            }
        }

        let rParenNode = `n${counter.get()}`;
        result += `${rParenNode}[label=")"];\n`;
        result += `${last} -> ${rParenNode};\n`;
        return result;
    }
}