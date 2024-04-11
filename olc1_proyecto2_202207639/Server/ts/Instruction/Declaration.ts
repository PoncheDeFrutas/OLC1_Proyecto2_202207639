import {Instruction} from "../Abstract/Instruction";
import {Environment} from "../Symbol/Environment";
import {Expression} from "../Abstract/Expression";
import {dataType} from "../Abstract/Result";

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

    public interpreter(environment: Environment, tConsole: string[]): null {
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
                throw Error("Error: Type not valid")
        }

        if (this.value != null){
            const val = this.value.interpreter(environment);
            if (dominantType != val.type) {
                throw new Error(`Type Error: ${val.type} is not assignable to ${dominantType}`)
            }
            this.id.forEach(id => {
                environment.save(id, val.value, val.type);
            });
        } else{
            this.id.forEach(id => {
                environment.save(id, defaultVal, dominantType);
            });
        }
        return null
    }
}

