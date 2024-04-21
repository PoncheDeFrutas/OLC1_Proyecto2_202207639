import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import { dataType } from "../Abstract/Result";
import {tError} from "../tConsole";
import {Error_} from "../Error";
import Counter from "../Symbol/Counter";

export class DeclarationVector extends Instruction{

    public type: string;
    public id: string;
    public confirmType: string;
    public row: Expression;
    public columns: Expression | null;
    public simple: boolean;

    constructor(type: string, id: string, confirmType: string, row: Expression, columns: Expression | null, simple: boolean, line: number, column: number){
        super(line, column);
        this.type = type;
        this.id = id;
        this.confirmType = confirmType;
        this.row = row;
        this.columns = columns;
        this.simple = simple;
    }

    public interpreter(environment: Environment): any {

        if (this.confirmType != this.type){
            throw tError.push(new Error_(tError.length, "Semantico",
                `Tipo ${this.confirmType} no coincide con ${this.type}`, this.line, this.column ))
        }

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

        const valRows = this.row.interpreter(environment);

        if (this.columns != null){
            const valColumns = this.columns.interpreter(environment);
            if (dataType.NUMBER != valRows.type || dataType.NUMBER != valColumns.type) {
                throw tError.push(new Error_(tError.length, "Semantico",
                    `El tipo de una dimensional no es compatible con los vectores`, this.line, this.column ))
            }
            environment.saveVectors(this.id, dominantType, valRows.value, valColumns.value, this.line, this.column);
        } else{
            if (dataType.NUMBER != valRows.type) {
                throw tError.push(new Error_(tError.length, "Semantico",
                    `El tipo de una dimensional no es compatible con los vectores`, this.line, this.column ))
            }
            environment.saveVectors(this.id, dominantType, valRows.value, 1, this.line, this.column);
        }
        environment.getVectors(this.id)?.defaultValues("VectorV", dominantType, defaultVal, this.line, this.column);
    }

    /*
    *  type id([] | [][]) = new type [exp] | new type [exp][exp];
    * */
    public getAst(last: string): string{
        let result = ""
        let counter = Counter.getInstance()
        let declarationNode = `n${counter.get()}`
        let typeNode = `n${counter.get()}`
        result += `${declarationNode}[label="Declaración Vector"];\n`
        result += `${typeNode}[label="${this.type}"];\n`
        result += `${last} -> ${declarationNode};\n`
        result += `${declarationNode} -> ${typeNode};\n`
        if (this.simple){
            let idNode = `n${counter.get()}`
            result += `${idNode}[label="${this.id}[]"];\n`
            result += `${declarationNode} -> ${idNode};\n`
        } else{
            let idNode = `n${counter.get()}`
            result += `${idNode}[label="${this.id}[][]"];\n`
            result += `${declarationNode} -> ${idNode};\n`
        }
        let assignNode = `n${counter.get()}`
        result += `${assignNode}[label="="];\n`
        result += `${declarationNode} -> ${assignNode};\n`
        let newNode = `n${counter.get()}`
        result += `${newNode}[label="new"];\n`
        result += `${declarationNode} -> ${newNode};\n`
        let typeNode2 = `n${counter.get()}`
        result += `${typeNode2}[label="${this.confirmType}"];\n`
        result += `${declarationNode} -> ${typeNode2};\n`
        let lbraceNode = `n${counter.get()}`
        result += `${lbraceNode}[label="["];\n`
        result += `${declarationNode} -> ${lbraceNode};\n`
        let expNode = `n${counter.get()}`
        result += `${expNode}[label="Expresion"];\n`
        result += `${declarationNode} -> ${expNode};\n`
        result += this.row.getAst(expNode);
        let rbraceNode = `n${counter.get()}`
        result += `${rbraceNode}[label="]"];\n`
        result += `${declarationNode} -> ${rbraceNode};\n`

        if (this.columns != null){
            let lbraceNode2 = `n${counter.get()}`
            result += `${lbraceNode2}[label="["];\n`
            result += `${declarationNode} -> ${lbraceNode2};\n`
            let expNode2 = `n${counter.get()}`
            result += `${expNode2}[label="Expresion"];\n`
            result += `${declarationNode} -> ${expNode2};\n`
            result += this.columns.getAst(expNode2);
            let rbraceNode2 = `n${counter.get()}`
            result += `${rbraceNode2}[label="]"];\n`
            result += `${declarationNode} -> ${rbraceNode2};\n`
        }
        let semicolonNode = `n${counter.get()}`
        result += `${semicolonNode}[label=";"];\n`
        result += `${declarationNode} -> ${semicolonNode};\n`
        return result;
    }
}