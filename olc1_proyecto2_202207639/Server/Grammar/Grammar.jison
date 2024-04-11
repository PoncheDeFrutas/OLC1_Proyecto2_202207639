/*-----------------------------------------------IMPORTS AND JS CODE--------------------------------------------------*/
%{
    const { Arithmetic } = require('../js/Expression/Arithmetic');
    const { Relational } = require('../js/Expression/Relational');
    const { Logical } = require('../js/Expression/Logical');
    const { Ternary } = require('../js/Expression/Ternary');
    const { Primitive } = require('../js/Expression/Primitive');
    const { Casting } = require('../js/Expression/Casting');
    const { ArithmeticOp, RelationalOp, LogicalOp, Result, dataType } = require('../js/Expression/Result');
    const { Cout } = require('../js/Instruction/Cout');
    const { Block } = require('../js/Instruction/Block');
    const { Declaration } = require('../js/Instruction/Declaration');
    const { IdValue } = require('../js/Instruction/IdValue');
    const { FN_IF } = require('../js/Instruction/Control/IF');
    const {IncDecFunction} = require('../js/Instruction/IncDecFunction');
    const { AST } = require('../js/AST');
%}
/*------------------------------------------------LEXICAL ANALYZER----------------------------------------------------*/
%lex
%options case-insensitive


%%

/*Whitespaces and Comments*/
\s+
\/\*([^*]|\*+[^*/])*\*+\/   /*Ignore Comments*/
"/""/".*[\n]                /*Ignore Comments*/
[ \t\r\n]+                  /*Ignore Whitespaces*/

[0-9]+("."[0-9]+)\b         {return 'DOUBLE';}
[0-9]+\b                    {return 'NUMBER';}

/*Reserved Words*/

/*Function Cout*/
"cout"  {return 'COUT';}
"<<"    {return 'INSERTION';}
"endl"  {return 'ENDL';}

/*Function IF*/
"if"    {return 'IF';}
"else"  {return 'ELSE';}

/*Incremental and Decremental*/
"++"    {return 'INC';}
"--"    {return 'DEC';}

/*Arithmetic Operators*/
"+"     {return 'SUM';}
"-"     {return 'RES';}
"*"     {return 'MUL';}
"/"     {return 'DIV';}
"pow"   {return 'POW';}
"%"     {return 'MOD';}

/*Relational Operators*/
"=="    {return 'EQ';}
"!="    {return 'NEQ';}
"<="    {return 'LEQ';}
">="    {return 'GEQ';}
"<"     {return 'LT';}
">"     {return 'GT';}

/*Logical Operators*/
"||"    {return 'OR';}
"&&"    {return 'AND';}
"!"     {return 'NOT';}

/*Punctuation*/
","     {return 'COMMA';}
"("     {return 'LPAREN';}
")"     {return 'RPAREN';}
"{"     {return 'LBRACE';}
"}"     {return 'RBRACE';}
"["     {return 'LBRACKET';}
"]"     {return 'RBRACKET';}
"="     {return 'ASSIGN';}
";"     {return 'SEMICOLON';}
"?"     {return 'TERNARY';}
":"     {return 'COLON';}


/*Data Types*/
\'([^\']|[\t]|[\n]|[\r]|[ ])\'              {yytext = yytext.substr(1,yyleng-2);return 'CHAR';}
\"([^\"]|[\t]|[\n]|[\r])*\"                 {yytext = yytext.substr(1,yyleng-2);return 'STRING';}
"false"|"true"                              {return 'BOOL';}
"int"|"double"|"bool"|"char"|"std::string"  {return 'TYPE';}
([a-zA-Z_][a-zA-Z0-9_]*)\b                  {return 'ID';}


/*End of File*/
<<EOF>> return 'EOF'

/*Error*/
. {console.error("Error: Caracter inesperado: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column);}

/lex

/*Precedence------------*/
%right 'TYPE'
%right 'TERNARY'
%left 'OR'
%left 'AND'
%right 'NOT'
%left 'EQ', 'NEQ', 'LT', 'LEQ', 'GT', 'GEQ'
%left 'SUM', 'RES'
%left 'MOD', 'DIV', 'MUL'
%nonassoc 'POW'
%right UMINUS


/*-----------------------------------------------SINTACTIC ANALYZER---------------------------------------------------*/
%start program

%%

program
    : statements EOF                                        { return new AST($1); }
    ;

statements
    : statements statement                                  { $1.push($2); $$ = $1; }
    | statement                                             { $$ = [$1]; }
    ;

statement
    : fn_count                                              { $$ = $1; }
    | fn_if                                                 { $$ = $1; }
    | var_declaration                                       { $$ = $1; }
    | increment_decrement                                   { $$ = $1; }
    ;

var_declaration
    : TYPE var_list end_declaration                         { $$ = new Declaration($1, $2, $3, @1.first_line, @1.first_column);}
    ;

var_list
    : var_list COMMA ID                                     { $1.push($3); $$ = $1; }
    | ID                                                    { $$ = [$1]; }
    ;

end_declaration
    : SEMICOLON                                             { $$ = null; }
    | ASSIGN expression SEMICOLON                           { $$ = $2; }
    ;

increment_decrement
    : ID INC SEMICOLON                                      { $$ = new IncDecFunction($1, true, @2.first_line, @2.first_column); }
    | ID DEC SEMICOLON                                      { $$ = new IncDecFunction($1, false, @2.first_line, @2.first_column); }
    ;


fn_count
    : COUT INSERTION expression end_count                   { $$ = new Cout($3, $4, @1.first_line, @1.first_column);}
    ;

end_count
    : SEMICOLON                                             { $$ = false; }
    | INSERTION ENDL SEMICOLON                              { $$ = true; }
    ;

expression
    : operations                    { $$ = $1; }
    | relational                    { $$ = $1; }
    | logical                       { $$ = $1; }
    | ternary                       { $$ = $1; }
    | casting                       { $$ = $1; }
    | data_type                     { $$ = $1; }
    | LPAREN expression RPAREN      { $$ = $2; }
    ;

operations
    : RES expression %prec UMINUS   { $$ = new Arithmetic($2, $2, ArithmeticOp.UMINUS, @1.first_line, @1.first_column); }
    | expression SUM expression     { $$ = new Arithmetic($1, $3, ArithmeticOp.SUM, @2.first_line, @2.first_column); }
    | expression RES expression     { $$ = new Arithmetic($1, $3, ArithmeticOp.RES, @2.first_line, @2.first_column); }
    | expression MUL expression     { $$ = new Arithmetic($1, $3, ArithmeticOp.MUL, @2.first_line, @2.first_column); }
    | expression DIV expression     { $$ = new Arithmetic($1, $3, ArithmeticOp.DIV, @2.first_line, @2.first_column); }
    | expression MOD expression     { $$ = new Arithmetic($1, $3, ArithmeticOp.MOD, @2.first_line, @2.first_column); }
    | POW LPAREN expression COMMA expression RPAREN     { $$ = new Arithmetic($3, $5, ArithmeticOp.POW, @1.first_line, @1.first_column); }
    ;

relational
    : expression EQ expression      { $$ = new Relational($1, $3, RelationalOp.EQ, @2.first_line, @2.first_column); }
    | expression NEQ expression     { $$ = new Relational($1, $3, RelationalOp.NEQ, @2.first_line, @2.first_column); }
    | expression LT expression      { $$ = new Relational($1, $3, RelationalOp.LT, @2.first_line, @2.first_column); }
    | expression LEQ expression     { $$ = new Relational($1, $3, RelationalOp.LEQ, @2.first_line, @2.first_column); }
    | expression GT expression      { $$ = new Relational($1, $3, RelationalOp.GT, @2.first_line, @2.first_column); }
    | expression GEQ expression     { $$ = new Relational($1, $3, RelationalOp.GEQ, @2.first_line, @2.first_column); }
    ;

logical
    : expression AND expression     { $$ = new Logical($1, $3, LogicalOp.AND, @2.first_line, @2.first_column); }
    | expression OR expression      { $$ = new Logical($1, $3, LogicalOp.OR, @2.first_line, @2.first_column); }
    | NOT expression                { $$ = new Logical($2, $2, LogicalOp.NOT, @1.first_line, @1.first_column); }
    ;

ternary
    : expression TERNARY expression COLON expression    { $$ = new Ternary($1, $3, $5, @2.first_line, @2.first_column); }
    ;

casting
    : LPAREN TYPE RPAREN expression {$$ = new Casting($2, $4, @1.first_line, @1.first_column);}
    ;

data_type
    : ID                            { $$ = new IdValue($1 ,@1.first_line, @1.first_column); }
    | NUMBER                        { $$ = new Primitive($1, dataType.NUMBER ,@1.first_line, @1.first_column); }
    | DOUBLE                        { $$ = new Primitive($1, dataType.DOUBLE ,@1.first_line, @1.first_column); }
    | BOOL                          { $$ = new Primitive($1, dataType.BOOL ,@1.first_line, @1.first_column); }
    | CHAR                          { $$ = new Primitive($1, dataType.CHAR ,@1.first_line, @1.first_column); }
    | STRING                        { $$ = new Primitive($1, dataType.STRING ,@1.first_line, @1.first_column); }
    ;

fn_if
    : IF LPAREN expression RPAREN block fn_else            { $$ = new FN_IF($3, $5, $6, @1.first_line, @1.first_column); }
    ;

fn_else
    : ELSE block                                            { $$ = $2; }
    | ELSE fn_if                                            { $$ = $2; }
    |                                                       { $$ = null; }
    ;

block
    : LBRACE statements RBRACE      { $$ = new Block($2, @1.first_line, @1.first_column); }
    | LBRACE RBRACE                 { $$ = new Block([], @1.first_line, @1.first_column); }
    ;