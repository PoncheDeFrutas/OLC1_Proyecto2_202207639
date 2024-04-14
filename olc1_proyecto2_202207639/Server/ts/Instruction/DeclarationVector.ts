import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import { dataType } from "../Abstract/Result";

export class DeclarationVector extends Instruction{

    private type: string;
    private id: string;
    private confirmType: string;
    private size: Expression;

    

}