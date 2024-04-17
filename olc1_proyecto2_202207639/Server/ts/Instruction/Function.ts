import {Instruction} from "../Abstract/Instruction";
import {Environment} from "../Symbol/Environment";
import {dataType} from "../Abstract/Result";
import {Block} from "./Block";

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
                throw Error("Error: Type not valid")
        }
        this.type = dominantType;
        environment.saveFunction(this.id, this);
    }
}