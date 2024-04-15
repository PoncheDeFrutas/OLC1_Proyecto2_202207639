import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import { dataType } from "../Abstract/Result";

export class DeclarationVector extends Instruction{

    public type: string;
    public id: string;
    public values: Expression[] | Expression[][];
    public simple: boolean;

    constructor(type: string, id: string, values: Expression[] | Expression[][], simple: boolean, line: number, column: number){
        super(line, column);
        this.type = type;
        this.id = id;
        this.values = values;
        this.simple = simple;
    }



    public interpreter(environment: Environment, tConsole: string[]): any {
        let dominantType:dataType;
        switch (this.type) {
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
        if (this.simple){
            if(this.values[0] instanceof Array){
            } else{

            }
        } else{

        }
    }
}