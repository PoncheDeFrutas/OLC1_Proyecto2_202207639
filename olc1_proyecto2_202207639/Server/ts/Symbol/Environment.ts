import { env } from 'process';
import { Symbol } from './Symbol';
import { dataType } from '../Abstract/Result';
import { Function } from "../Instruction/Function";
import {Arrays} from "./Arrays";

export class Environment{
    private variables: Map<string, Symbol>;
    private vectors : Map<string, Arrays>
    public functions: Map<string, Function>

    constructor(public previous: Environment | null){
        this.variables = new Map();
        this.functions = new Map();
        this.vectors = new Map();
    }

    public save(id: string, value: any, type: dataType, line:number, column: number){
        let env: Environment | null = this;
        if(env.variables.has(id)){
            throw Error("Variable already exist")
        }
        this.variables.set(id, new Symbol(id, type, value, line, column));
    }

    public saveVectors(id:string, type: dataType, rows:number, columns:number, line: number, column: number){
        let env: Environment | null = this;
        if(env.vectors.has(id)){
            throw Error("Vector already exist")
        }
        this.vectors.set(id, new Arrays(id, type, rows, columns, line, column));
    }

    public getVectors(id: string): Arrays | null | undefined {
        let env: Environment | null = this;
        while(env != null){
            if(env.vectors.has(id)){
                return env.vectors.get(id);
            }
            env = env.previous;
        }
        return null;
    }

    public editVariable(id: string, value: any, type: dataType, line:number, column: number){
        let env: Environment | null = this;
        while(env != null){
            if(env.variables.has(id)){
                env.variables.set(id, new Symbol(id, type, value, line, column));
                return;
            }
            env = env.previous;
        }
        throw Error("Variable don't exist")
    }

    public saveFunction(id: string, func: Function){
        // TODO arreglar esta madre
        this.functions.set(id, func);
    }



    public getVariable(id: string): Symbol | null | undefined {
        let env: Environment | null = this;
        while(env != null){
            if(env.variables.has(id)){
                return env.variables.get(id);
            }
            env = env.previous;
        }
        return null;
    }

    public getFunction(id: string): Function | undefined {
        let env: Environment | null = this;
        while(env != null){
            if(env.functions.has(id)){
                return env.functions.get(id);
            }
            env = env.previous;
        }
        return undefined;
    }

    public getGlobal(): Environment{
        let env: Environment | null = this;
        while(env?.previous != null){
            env = env.previous;
        }
        return env;
    }

}