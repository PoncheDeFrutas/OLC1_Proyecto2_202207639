import { env } from "process";
import { Environment } from "../Symbol/Environment";
import {Expression} from "../Abstract/Expression";
import {dataType, getRelationalOpName, RelationalOp, Result} from "../Abstract/Result";
import {tError} from "../tConsole";
import {Error_} from "../Error";
import Counter from "../Symbol/Counter";

export class Relational extends Expression {
    public left: Expression;
    public right: Expression;
    public op: RelationalOp;

    constructor(left: Expression, right: Expression, op: RelationalOp, line: number, column: number) {
        super(line, column);
        this.left = left;
        this.right = right;
        this.op = op;
    }

    public interpreter(environment: Environment): Result{
        const leftResult = this.left.interpreter(environment);
        const rightResult = this.right.interpreter(environment);

        if (leftResult.type == dataType.NULL || rightResult.type == dataType.NULL){
            throw tError.push(new Error_(tError.length, "Semantico",
                `Valor null no es valido en operacion relacional`, this.line, this.column ))
        }

        if (((leftResult.type == dataType.NUMBER || leftResult.type == dataType.DOUBLE || leftResult.type == dataType.CHAR) &&
            (rightResult.type == dataType.NUMBER || rightResult.type == dataType.DOUBLE || rightResult.type == dataType.CHAR))
            || (leftResult.type == dataType.BOOL && rightResult.type == dataType.BOOL)
            || (leftResult.type == dataType.STRING && rightResult.type == dataType.STRING)){
            switch (this.op){
                case RelationalOp.EQ:
                    return {value: leftResult.value == rightResult.value, type: dataType.BOOL};
                case RelationalOp.NEQ:
                    return {value: leftResult.value != rightResult.value, type: dataType.BOOL};
                case RelationalOp.GT:
                    return {value: leftResult.value > rightResult.value, type: dataType.BOOL};
                case RelationalOp.LT:
                    return {value: leftResult.value < rightResult.value, type: dataType.BOOL};
                case RelationalOp.GEQ:
                    return {value: leftResult.value >= rightResult.value, type: dataType.BOOL};
                case RelationalOp.LEQ:
                    return {value: leftResult.value <= rightResult.value, type: dataType.BOOL};
                default:
                    return {value: null, type: dataType.NULL};
            }
        }
        return {value: null, type: dataType.NULL};
    }

    /*
    * exp op exp
    * */
    public getAst(last: string): string{
        let result = ""
        let counter = Counter.getInstance()
        let relationalNodeT = `n${counter.get()}`
        let relationalNode = `n${counter.get()}`
        let exp1Node = `n${counter.get()}`
        let opNode = `n${counter.get()}`
        let exp2Node = `n${counter.get()}`
        result += `${relationalNodeT}[label="Relational"];\n`
        result += `${exp1Node}[label="Expresion"];\n`
        result += `${opNode}[label="${getRelationalOpName(this.op)}"];\n`
        result += `${exp2Node}[label="Expresion"];\n`
        result += `${last} -> ${relationalNodeT};\n`
        result += `${relationalNodeT} -> ${exp1Node};\n`
        result += this.left.getAst(exp1Node)
        result += `${relationalNodeT} -> ${opNode};\n`
        result += `${relationalNodeT} -> ${exp2Node};\n`
        result += this.right.getAst(exp2Node)
        return result
    }
}
