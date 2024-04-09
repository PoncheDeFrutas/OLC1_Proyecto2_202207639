/*-----------------------------------------------IMPORTS AND JS CODE--------------------------------------------------*/
%{
    const { Arithmetic } = require('../js/Expression/Arithmetic');
    const { Primitive } = require('../js/Expression/Primitive');
    const { ArithmeticOp, Result, dataType } = require('../js/Expression/Result');
    const { Cout } = require('../js/Instruction/Cout');
    const { AST } = require('../js/AST');
%}
/*------------------------------------------------LEXICAL ANALYZER----------------------------------------------------*/
%lex
%options case-insensitive


%%

/*Whitespaces and Comments*/
\s+
\/\*([^*]|\*+[^*/])*\*+\/   /*Ignore Comments*/
"//".*[\n]                  /*Ignore Comments*/
[ \t\r\n]+                  /*Ignore Whitespaces*/

[0-9]+("."[0-9]+)\b         {return 'DOUBLE';}
[0-9]+\b                    {return 'NUMBER';}

/*Reserved Words*/

/*Function Cout*/
"cout"  {return 'COUT';}
"<<"    {return 'INSERTION';}
"endl"  {return 'ENDL';}


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
    | data_type                     { $$ = $1; }
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

data_type
    : ID                            { $$ = new Primitive($1, dataType.ID ,@1.first_line, @1.first_column); }
    | NUMBER                        { $$ = new Primitive($1, dataType.NUMBER ,@1.first_line, @1.first_column); }
    | DOUBLE                        { $$ = new Primitive($1, dataType.DOUBLE ,@1.first_line, @1.first_column); }
    | BOOL                          { $$ = new Primitive($1, dataType.BOOL ,@1.first_line, @1.first_column); }
    | CHAR                          { $$ = new Primitive($1, dataType.CHAR ,@1.first_line, @1.first_column); }
    | STRING                        { $$ = new Primitive($1, dataType.STRING ,@1.first_line, @1.first_column); }
    ;