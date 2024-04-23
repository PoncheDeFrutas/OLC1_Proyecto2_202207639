import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import { dataType } from "../Abstract/Result";
import {tError} from "../tConsole";
import {Error_} from "../Error";
import Counter from "../Symbol/Counter";

export class Declaration extends Instruction {

    private type: string;
    private id: string[];
    private value: Expression | null;

    constructor(type:string, id: string[], value: Expression | null, line: number, column: number) {
        super(line, column);
        this.id = id;
        this.type = type;
        this.value = value;
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
                    `Tipo ${this.type}, no permitivo para la declaración de variables`, this.line, this.column ))
        }

        if (this.value != null){
            const val = this.value.interpreter(environment);
            if (dominantType != val.type) {
                throw tError.push(new Error_(tError.length, "Semantico",
                    `Tipo ${val.type} no asignable a ${dominantType}`, this.line, this.column ))
            }
            this.id.forEach(id => {
                environment.save(id, val.value, val.type, this.line, this.column);
            });
        } else{
            this.id.forEach(id => {
                environment.save(id, defaultVal, dominantType, this.line, this.column);
            });
        }
    }

    /*
     * TYPE ID[] ( | = EXPRESSION) ;
     */
    public getAst(last: string): string{
        let result = ""
        let counter = Counter.getInstance()
        let declarationNode = `n${counter.get()}`
        let typeNode = `n${counter.get()}`
        result += `${declarationNode}[label="Declaración"];\n`
        result += `${typeNode}[label="${this.type}"];\n`
        result += `${last} -> ${declarationNode};\n`
        result += `${declarationNode} -> ${typeNode};\n`
        for (let i = 0; i < this.id.length; i++){
            let idNode = `n${counter.get()}`
            result += `${idNode}[label="${this.id[i]}"];\n`
            result += `${declarationNode} -> ${idNode};\n`
            if (i < this.id.length - 1){
                let comaNode = `n${counter.get()}`
                result += `${comaNode}[label=","];\n`
                result += `${declarationNode} -> ${comaNode};\n`
            }
        }
        if (this.value != null){
            let equalNode = `n${counter.get()}`
            let expNode = `n${counter.get()}`
            result += `${equalNode}[label="="];\n`
            result += `${expNode}[label="Expresion"];\n`
            result += `${declarationNode} -> ${equalNode};\n`
            result += `${declarationNode} -> ${expNode};\n`
            result += this.value.getAst(expNode);
        }
        let semicolonNode = `n${counter.get()}`
        result += `${semicolonNode}[label=";"];\n`
        result += `${declarationNode} -> ${semicolonNode};\n`
        return result;

    }
}

