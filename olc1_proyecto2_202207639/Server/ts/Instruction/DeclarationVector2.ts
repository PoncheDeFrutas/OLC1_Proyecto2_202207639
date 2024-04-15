import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import { dataType } from "../Abstract/Result";

export class DeclarationVector2 extends Instruction{

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

        if (this.simple){
            if(!(this.values[0] instanceof Array)){
                const maxColumns = this.values.length;
                const maxRows = 1;
                environment.saveVectors(this.id, dominantType, maxColumns, maxRows, this.line, this.column);
                environment.getVectors(this.id)?.defaultValues("VectorV", dominantType, defaultVal, this.line, this.column);
                for (let i = 0; i < this.values.length; i++){
                    const exp = <Expression>this.values[i]
                    const value = exp.interpreter(environment);
                    if (value.type == dominantType){
                        environment.getVectors(this.id)?.setValue(i, 0, "VectorV", dominantType, value.value, this.line, this.column);
                    } else{
                        throw Error("Error: Value type not valid")
                    }
                }
            } else{
                throw Error("Error: Type not valid")
            }
        } else{
            if (this.values[0] instanceof Array){
                const maxRows = this.values.length;
                const maxColumns = Math.max(...this.values.map(fila => fila instanceof Array ? fila.length : 0));
                environment.saveVectors(this.id, dominantType, maxRows, maxColumns, this.line, this.column);
                environment.getVectors(this.id)?.defaultValues("VectorV", dominantType, defaultVal, this.line, this.column);
                for (let i = 0; i < this.values.length; i++){
                    const row = <Expression[]>this.values[i];
                    for (let j = 0; j < row.length; j++){
                        const exp = row[j];
                        const value = exp.interpreter(environment);
                        if (value.type == dominantType){
                            environment.getVectors(this.id)?.setValue(i, j, "VectorV", dominantType, value.value, this.line, this.column);
                        } else{
                            throw Error("Error: Value type not valid")
                        }
                    }
                }
            }
        }
    }
}