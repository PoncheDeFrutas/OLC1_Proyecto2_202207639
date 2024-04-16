import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import { dataType } from "../Abstract/Result";

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

    public interpreter(environment: Environment, tConsole: string[]): any {

        if (this.confirmType != this.type){
            throw new Error(`Type Error: ${this.confirmType} is not assignable to ${this.type}`)
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
                throw Error("Error: Type not valid")
        }

        const valRows = this.row.interpreter(environment);

        if (this.columns != null){
            const valColumns = this.columns.interpreter(environment);
            if (dataType.NUMBER != valRows.type || dataType.NUMBER != valColumns.type) {
                throw new Error(`Type Error: ${valRows.type} is not assignable to ${dataType.NUMBER}`)
            }
            environment.saveVectors(this.id, dominantType, valRows.value, valColumns.value, this.line, this.column);
        } else{
            if (dataType.NUMBER != valRows.type) {
                throw new Error(`Type Error: ${valRows.type} is not assignable to ${dataType.NUMBER}`)
            }
            environment.saveVectors(this.id, dominantType, valRows.value, 1, this.line, this.column);
        }
        environment.getVectors(this.id)?.defaultValues("VectorV", dominantType, defaultVal, this.line, this.column);
    }
}