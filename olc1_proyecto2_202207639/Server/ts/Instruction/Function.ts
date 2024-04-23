import {Instruction} from "../Abstract/Instruction";
import {Environment} from "../Symbol/Environment";
import {dataType} from "../Abstract/Result";
import {Block} from "./Block";
import {tError} from "../tConsole";
import {Error_} from "../Error";
import Counter from "../Symbol/Counter";

export class Function extends Instruction{

    public stype: string;
    public type: dataType;
    public id: string;
    public parameters: {type:string, id:string, vector:boolean, simple:boolean}[];
    public block: Block;

    constructor(stype: string, id: string, parameters: {type:string, id:string,vector:boolean, simple:boolean}[], block: Block, line: number, column: number){
        super(line, column);
        this.type = dataType.NULL;
        this.id = id;
        this.parameters = parameters;
        this.block = block;
        this.stype = stype;
    }

    public interpreter(environment: Environment): any {
        let dominantType: dataType;
        switch (this.stype) {
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
            case "void":
                dominantType = dataType.NULL
                break;
            default:
                throw tError.push(new Error_(tError.length, "Semantico",
                    `Tipo ${this.type}, no permitivo para la declaración de funciones`, this.line, this.column ))
        }
        this.type = dominantType;
        environment.saveFunction(this.id, this);
    }

    /*
    * type id (parameters) block
    */
    public getAst(last: string): string{
        let result = ""
        let counter = Counter.getInstance()
        let functionNode = `n${counter.get()}`
        let typeNode = `n${counter.get()}`
        let idNode = `n${counter.get()}`
        let lParenNode = `n${counter.get()}`
        result += `${functionNode}[label="Declaración Function"];\n`
        result += `${typeNode}[label="${this.stype}"];\n`
        result += `${idNode}[label="${this.id}"];\n`
        result += `${lParenNode}[label="("];\n`
        result += `${last} -> ${functionNode};\n`
        result += `${functionNode} -> ${typeNode};\n`
        result += `${functionNode} -> ${idNode};\n`
        result += `${functionNode} -> ${lParenNode};\n`

        if (this.parameters.length != 0){
            for (let i = 0; i < this.parameters.length; i++){
                let first = `n${counter.get()}`;
                result += `${first}[label="param"];\n`;
                result += `${functionNode} -> ${first};\n`;
                let typeNode = `n${counter.get()}`;
                let idNode = `n${counter.get()}`;
                result += `${typeNode}[label="${this.parameters[i].type}"];\n`
                if ( this.parameters[i].vector){
                    if (this.parameters[i].simple){
                        result += `${idNode}[label="${this.parameters[i].id}[]"];\n`
                    } else{
                        result += `${idNode}[label="${this.parameters[i].id}[][]"];\n`
                    }
                } else{
                    result += `${idNode}[label="${this.parameters[i].id}"];\n`
                }
                result += `${first} -> ${typeNode};\n`
                result += `${first} -> ${idNode};\n`
                if (i < this.parameters.length - 1){
                    let comma = `n${counter.get()}`;
                    result += `${comma}[label=","];\n`;
                    result += `${functionNode} -> ${comma};\n`;
                }
            }
        }
        let rParenNode = `n${counter.get()}`
        result += `${rParenNode}[label=")"];\n`
        result += `${functionNode} -> ${rParenNode};\n`
        let blockNode = `n${counter.get()}`
        result += `${blockNode}[label="Block"];\n`
        result += `${functionNode} -> ${blockNode};\n`
        result += this.block.getAst(blockNode)
        return result
    }


}