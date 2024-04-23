import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import { dataType } from "../Abstract/Result";
import {tError} from "../tConsole";
import {Error_} from "../Error";
import Counter from "../Symbol/Counter";

export class DeclarationVector2 extends Instruction{

    public type: string;
    public id: string;
    public values: Expression | Expression[] | Expression[][];
    public simple: boolean;

    constructor(type: string, id: string, values: Expression | Expression[] | Expression[][], simple: boolean, line: number, column: number){
        super(line, column);
        this.type = type;
        this.id = id;
        this.values = values;
        this.simple = simple;
    }

    public interpreter(environment: Environment): any {
        let dominantType: dataType;
        let defaultVal: any;

        switch (this.type) {
            case "int":
                dominantType = dataType.NUMBER
                defaultVal = Number(0);
                break;
            case "double":
                dominantType = dataType.DOUBLE
                defaultVal = Number(0.0);
                break;
            case "bool":
                dominantType = dataType.BOOL
                defaultVal = true;
                break;
            case "char":
                dominantType = dataType.CHAR
                defaultVal = '0';
                break;
            case "std::string":
                dominantType = dataType.STRING
                defaultVal = "";
                break;
            default:
                throw tError.push(new Error_(tError.length, "Semantico",
                    `Tipo ${this.type}, no permitivo para la declaración de vectores`, this.line, this.column ))
        }
        if (this.simple && !(this.values instanceof Expression)){
            if(!(this.values[0] instanceof Array)){
                const maxColumns = 1;
                const maxRows = this.values.length;
                environment.saveVectors(this.id, dominantType, maxRows, maxColumns, this.line, this.column);
                environment.getVectors(this.id)?.defaultValues("VectorV", dominantType, defaultVal, this.line, this.column);
                for (let i = 0; i < this.values.length; i++){
                    const exp = <Expression>this.values[i]
                    const value = exp.interpreter(environment);
                    if (value.type == dominantType){
                        environment.getVectors(this.id)?.setValue(i, 0, "VectorV", dominantType, value.value, this.line, this.column);
                    } else{
                        throw tError.push(new Error_(tError.length, "Semantico",
                            `Tipo ${value.type} de la expresion no coincide con el del vector`, this.line, this.column ))
                    }
                }
            } else{
                throw tError.push(new Error_(tError.length, "Semantico",
                    `El vector que se intena asignar no es valido`, this.line, this.column ))
            }
        } else if(!(this.values instanceof Expression)){
            if (this.values[0] instanceof Array){
                const maxRows = this.values.length;
                const maxColumns = Math.max(...this.values.map(columns => columns instanceof Array ? columns.length : 0));
                environment.saveVectors(this.id, dominantType, maxRows, maxColumns, this.line, this.column);
                environment.getVectors(this.id)?.defaultValues("VectorV", dominantType, defaultVal, this.line, this.column);
                for (let i = 0; i < this.values.length; i++){
                    const columns = <Expression[]>this.values[i];
                    for (let j = 0; j < columns.length; j++){
                        const exp = columns[j];
                        const value = exp.interpreter(environment);
                        if (value.type == dominantType){
                            environment.getVectors(this.id)?.setValue(i, j, "VectorV", dominantType, value.value, this.line, this.column);
                        } else{
                            throw tError.push(new Error_(tError.length, "Semantico",
                                `Tipo ${value.type} de la expresion no coincide con el del vector`, this.line, this.column ))
                        }
                    }
                }
            }
        } else {
            const exp = this.values.interpreter(environment)
            const tmp = exp.value;
            environment.saveVectors(this.id, dominantType, tmp.length, 1, this.line, this.column);
            for (let i = 0; i < tmp.length; i++){
                const value = tmp[i].interpreter(environment);
                if (value.type == dominantType){
                    environment.getVectors(this.id)?.setValue(i, 0, "VectorV", dominantType, value.value, this.line, this.column);
                } else{
                    throw tError.push(new Error_(tError.length, "Semantico",
                        `Tipo ${value.type} de la expresion no coincide con el del vector`, this.line, this.column ))
                }
            }
        }
    }

    /*
    * tipe id ([]|[][]) = EXPRESSION | EXPRESSION[] | EXPRESSION[][];
    * */
    public getAst(last: string): string{
        let result = ""
        let counter = Counter.getInstance()
        let declarationNode = `n${counter.get()}`
        let typeNode = `n${counter.get()}`
        let idNode = `n${counter.get()}`
        result += `${declarationNode}[label="Declaración Vector"];\n`
        result += `${typeNode}[label="${this.type}"];\n`
        if (this.simple){
            result += `${idNode}[label="${this.id}[]"];\n`
        } else{
            result += `${idNode}[label="${this.id}[][]"];\n`
        }
        result += `${last} -> ${declarationNode};\n`
        result += `${declarationNode} -> ${typeNode};\n`
        result += `${declarationNode} -> ${idNode};\n`
        let equalNode = `n${counter.get()}`
        result += `${equalNode}[label="="];\n`
        result += `${declarationNode} -> ${equalNode};\n`
        let expNodeL = `n${counter.get()}`
        result += `${expNodeL}[label="Expresion List"];\n`
        result += `${declarationNode} -> ${expNodeL};\n`
        if (this.values instanceof Expression){
            result += this.values.getAst(expNodeL);
        } else{
            let lbraceNode = `n${counter.get()}`
            result += `${lbraceNode}[label="["];\n`
            result += `${expNodeL} -> ${lbraceNode};\n`
            if(!(this.values[0] instanceof Array)){
                for (let i = 0; i < this.values.length; i++){
                    let expNode = `n${counter.get()}`
                    result += `${expNode}[label="Expresion"];\n`
                    result += `${expNodeL} -> ${expNode};\n`
                    const exp = <Expression>this.values[i]
                    result += exp.getAst(expNode);
                    if (i < this.values.length - 1){
                        let comaNode = `n${counter.get()}`
                        result += `${comaNode}[label=","];\n`
                        result += `${expNodeL} -> ${comaNode};\n`
                    }
                }
            } else{
                for (let i = 0; i < this.values.length; i++) {
                    const column = <Expression[]>this.values[i]
                    let lbraceNode = `n${counter.get()}`
                    result += `${lbraceNode}[label="["];\n`
                    result += `${expNodeL} -> ${lbraceNode};\n`
                    for (let j = 0; j < column.length; j++){
                        let expNode = `n${counter.get()}`
                        result += `${expNode}[label="Expresion"];\n`
                        result += `${expNodeL} -> ${expNode};\n`
                        const exp = <Expression>column[j]
                        result += exp.getAst(expNode);
                        if (j < column.length - 1){
                            let comaNode = `n${counter.get()}`
                            result += `${comaNode}[label=","];\n`
                            result += `${expNodeL} -> ${comaNode};\n`
                        } else{
                            let rbraceNode = `n${counter.get()}`
                            result += `${rbraceNode}[label="]"];\n`
                            result += `${expNodeL} -> ${rbraceNode};\n`
                        }
                    }
                }
            }
            let rbraceNode = `n${counter.get()}`
            result += `${rbraceNode}[label="]"];\n`
            result += `${expNodeL} -> ${rbraceNode};\n`
        }
        let semicolonNode = `n${counter.get()}`
        result += `${semicolonNode}[label=";"];\n`
        result += `${declarationNode} -> ${semicolonNode};\n`
        return result;
    }
}