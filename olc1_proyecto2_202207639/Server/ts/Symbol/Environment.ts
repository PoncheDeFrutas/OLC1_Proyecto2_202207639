import { env } from 'process';
import { Symbol } from './Symbol';
import { dataType } from '../Abstract/Result';
import { Function } from "../Instruction/Function";

export class Environment{
    private variables: Map<string, Symbol>;
    public functions: Map<string, Function>

    constructor(public previous: Environment | null){
        this.variables = new Map();
        this.functions = new Map();
    }

    public save(id: string, value: any, type: dataType){
        let env: Environment | null = this;
        if(env.variables.has(id)){
            env.variables.set(id, new Symbol(id, type, value));
            return;
        }
        this.variables.set(id, new Symbol(id, type, value));
    }

    public editVariable(id: string, value: any, type: dataType){
        let env: Environment | null = this;
        while(env != null){
            if(env.variables.has(id)){
                env.variables.set(id, new Symbol(id, type, value));
                return;
            }
            env = env.previous;
        }
        throw Error("Variable don't exist")
    }

    public saveFunction(id: string, func: Function){
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