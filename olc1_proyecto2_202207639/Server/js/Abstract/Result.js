"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogicalOpName = exports.getRelationalOpName = exports.getArithmeticOpName = exports.getDataTypeName = exports.LogicalOp = exports.RelationalOp = exports.ArithmeticOp = exports.dataType = void 0;
var dataType;
(function (dataType) {
    dataType[dataType["NUMBER"] = 0] = "NUMBER";
    dataType[dataType["DOUBLE"] = 1] = "DOUBLE";
    dataType[dataType["BOOL"] = 2] = "BOOL";
    dataType[dataType["CHAR"] = 3] = "CHAR";
    dataType[dataType["STRING"] = 4] = "STRING";
    dataType[dataType["NULL"] = 5] = "NULL";
    dataType[dataType["ID"] = 6] = "ID";
})(dataType || (exports.dataType = dataType = {}));
var ArithmeticOp;
(function (ArithmeticOp) {
    ArithmeticOp[ArithmeticOp["UMINUS"] = 0] = "UMINUS";
    ArithmeticOp[ArithmeticOp["SUM"] = 1] = "SUM";
    ArithmeticOp[ArithmeticOp["RES"] = 2] = "RES";
    ArithmeticOp[ArithmeticOp["MUL"] = 3] = "MUL";
    ArithmeticOp[ArithmeticOp["DIV"] = 4] = "DIV";
    ArithmeticOp[ArithmeticOp["MOD"] = 5] = "MOD";
    ArithmeticOp[ArithmeticOp["POW"] = 6] = "POW";
})(ArithmeticOp || (exports.ArithmeticOp = ArithmeticOp = {}));
var RelationalOp;
(function (RelationalOp) {
    RelationalOp[RelationalOp["EQ"] = 0] = "EQ";
    RelationalOp[RelationalOp["NEQ"] = 1] = "NEQ";
    RelationalOp[RelationalOp["GT"] = 2] = "GT";
    RelationalOp[RelationalOp["LT"] = 3] = "LT";
    RelationalOp[RelationalOp["GEQ"] = 4] = "GEQ";
    RelationalOp[RelationalOp["LEQ"] = 5] = "LEQ";
})(RelationalOp || (exports.RelationalOp = RelationalOp = {}));
var LogicalOp;
(function (LogicalOp) {
    LogicalOp[LogicalOp["AND"] = 0] = "AND";
    LogicalOp[LogicalOp["OR"] = 1] = "OR";
    LogicalOp[LogicalOp["NOT"] = 2] = "NOT";
})(LogicalOp || (exports.LogicalOp = LogicalOp = {}));
function getDataTypeName(value) {
    return dataType[value];
}
exports.getDataTypeName = getDataTypeName;
function getArithmeticOpName(value) {
    return ArithmeticOp[value];
}
exports.getArithmeticOpName = getArithmeticOpName;
function getRelationalOpName(value) {
    return RelationalOp[value];
}
exports.getRelationalOpName = getRelationalOpName;
function getLogicalOpName(value) {
    return LogicalOp[value];
}
exports.getLogicalOpName = getLogicalOpName;
