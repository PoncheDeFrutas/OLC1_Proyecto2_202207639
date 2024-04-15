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