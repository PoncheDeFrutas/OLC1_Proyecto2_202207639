import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import { dataType } from "../Abstract/Result";
import {tError} from "../tConsole";
import {Error_} from "../Error";

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
}