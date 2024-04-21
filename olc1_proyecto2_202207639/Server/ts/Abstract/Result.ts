export type Result = {
    value: any,
    type: dataType,
}

export enum dataType {
    NUMBER,
    DOUBLE,
    BOOL,
    CHAR,
    STRING,
    NULL,
    ID,
}

export enum ArithmeticOp {
    UMINUS,
    SUM,
    RES,
    MUL,
    DIV,
    MOD,
    POW,
}

export enum RelationalOp {
    EQ,
    NEQ,
    GT,
    LT,
    GEQ,
    LEQ,
}

export enum LogicalOp {
    AND,
    OR,
    NOT,
}

export function getDataTypeName(value: dataType): string {
    return dataType[value];
}

export function getArithmeticOpName(value: ArithmeticOp): string {
    return ArithmeticOp[value];
}

export function getRelationalOpName(value: RelationalOp): string {
    return RelationalOp[value];
}

export function getLogicalOpName(value: LogicalOp): string {
    return LogicalOp[value];
}
