export class Error_{
    constructor(public id:number, public type:string, public message:string ,public line:number, public column:number) {
    }

    public toString(): string {
        return `Error: ${this.type} ${this.message} en la linea ${this.line} y columna ${this.column}`
    }
}