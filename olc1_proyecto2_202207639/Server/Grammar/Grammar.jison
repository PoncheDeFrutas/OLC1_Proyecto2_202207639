/*-----------------------------------------------IMPORTS AND JS CODE--------------------------------------------------*/
%{
    const { Error_ } = require('../js/Error');
    const { tError } = require('../js/tConsole');
    const { Arithmetic } = require('../js/Expression/Arithmetic');
    const { Relational } = require('../js/Expression/Relational');
    const { Logical } = require('../js/Expression/Logical');
    const { Ternary } = require('../js/Expression/Ternary');
    const { Primitive } = require('../js/Expression/Primitive');
    const { Casting } = require('../js/Expression/Casting');
    const { toLowUp } = require('../js/Expression/toLowUp');
    const { Round } = require('../js/Expression/Round');
    const { ToString } = require('../js/Expression/ToString');
    const { Length } = require('../js/Expression/Length');
    const { Typeof } = require('../js/Expression/Typeof')
    const { VectorValue } = require('../js/Expression/VectorValue');
    const { C_str } = require('../js/Expression/C_str');
    const { ArithmeticOp, RelationalOp, LogicalOp, Result, dataType } = require('../js/Abstract/Result');
    const { Cout } = require('../js/Instruction/Cout');
    const { Block } = require('../js/Instruction/Block');
    const { execute } = require('../js/Instruction/execute');
    const { Declaration } = require('../js/Instruction/Declaration');
    const { DeclarationVector } = require('../js/Instruction/DeclarationVector');
    const { DeclarationVector2 } = require('../js/Instruction/DeclarationVector2');
    const { IdValue } = require('../js/Expression/IdValue');
    const { FN_IF } = require('../js/Instruction/Control/IF');
    const { While } = require('../js/Instruction/While');
    const { DoWhile } = require('../js/Instruction/DoWhile');
    const { Break } = require('../js/Instruction/Break');
    const { Continue } = require('../js/Instruction/Continue');
    const { Return } = require('../js/Instruction/Return');
    const { Switch } = require('../js/Instruction/Switch');
    const { Case } = require('../js/Instruction/Case');
    const { Default } = require('../js/Instruction/Default');
    const { For } = require('../js/Instruction/For');
    const { Function } = require('../js/Instruction/Function');
    const { FunctionValue } = require('../js/Instruction/FunctionValue');
    const { IncDecFunction } = require('../js/Instruction/IncDecFunction');
    const { newValue } = require('../js/Instruction/newValue');
    const { newVectorValue } = require('../js/Instruction/newVectorValue');
    const { AST } = require('../js/AST');

    let errores = [];
%}
/*------------------------------------------------LEXICAL ANALYZER----------------------------------------------------*/
%lex
%options flex case-insensitive

%%

/*Whitespaces and Comments*/
\s+
"//".* {/* Ignore single line comments */}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]  {/*Ignore Comments*/}
[ \t\r\n]+                  {/*Ignore Whitespaces*/}
\\t+ {/* Ignore tabs */}

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

/*To Low Up*/
"tolower" {return 'TOLOWER';}
"toupper" {return 'TOUPPER';}

/*Round */
"round"   {return 'ROUND';}

/*While*/
"do"      {return 'DO';}
"while"   {return 'WHILE';}

/*Transfer Sentences*/
"return" {return 'RETURN';}
"break"  {return 'BREAK';}
"continue" {return 'CONTINUE';}

/*ToString*/
"std::tostring" {return 'TOSTRING';}

/*Switch Case*/
"switch" {return 'SWITCH';}
"case"   {return 'CASE';}
"default" {return 'DEFAULT';}

/*for*/
"for"    {return 'FOR';}

/*Vector*/
"new"   {return 'NEW';}

/*Functions*/
"void" {return 'VOID';}

/*Length*/
"length" {return 'LENGTH'}

/*Typeof*/
"typeof" {return 'TYPEOF'}

/*C_str*/
"c_str" {return 'C_STR'}

/*Execute*/
"execute" {return 'EXECUTE'}


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
"."     {return 'DOT';}
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
. {errores.push(new Error_(tError.length, "Lexico", `Caracter no valido: ${yytext}`, yylineno, yytext.length));
    return;}

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
%right 'DOT'
/*-----------------------------------------------SINTACTIC ANALYZER---------------------------------------------------*/
%start program
%%

program
    : statements EOF                                        { return new AST($1, errores); }
    ;

statements
    : statements statement                                  { $1.push($2); $$ = $1; }
    | statement                                             { $$ = [$1]; }
    ;

statement
    : functions                                             { $$ = $1; }
    | var_cases                                             { $$ = $1; }
    | vectors                                               { $$ = $1; }
    | increment_decrement SEMICOLON                         { $$ = $1; }
    | transfer_sentence                                     { $$ = $1; }
    | general_functions                                     { $$ = $1; }
    | execute                                               { $$ = $1; }
    ;

execute
    : EXECUTE function_value SEMICOLON                      { $$ = new execute($2, @1.first_line, @1.first_column); }
    ;


functions
    : fn_count                                              { $$ = $1; }
    | fn_if                                                 { $$ = $1; }
    | fn_while                                              { $$ = $1; }
    | fn_DoWhile                                            { $$ = $1; }
    | fn_Switch                                             { $$ = $1; }
    | fn_for                                                { $$ = $1; }
    ;

var_cases
    : var_edition SEMICOLON                        { $$ = $1; }
    | var_declaration SEMICOLON                    { $$ = $1; }
    ;

fn_for
    : FOR LPAREN var_cases expression SEMICOLON actualization RPAREN block { $$ = new For($3, $4, $6, $8, @1.first_line, @1.first_column);}
    ;

actualization
    : var_edition                                           { $$ = $1; }
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
    :                                                       { $$ = null; }
    | ASSIGN expression                                     { $$ = $2; }
    ;

increment_decrement
    : ID INC                                      { $$ = new IncDecFunction($1, true, @2.first_line, @2.first_column); }
    | ID DEC                                      { $$ = new IncDecFunction($1, false, @2.first_line, @2.first_column); }
    ;

var_edition
    : ID ASSIGN expression                        { $$ = new newValue($1, $3, @2.first_line, @2.first_column); }
    ;

fn_while
    : WHILE LPAREN expression RPAREN block                  { $$ = new While($3, $5, @1.first_line, @1.first_column); }
    ;

fn_DoWhile
    : DO block WHILE LPAREN expression RPAREN SEMICOLON    { $$ = new DoWhile($5, $2, @1.first_line, @1.first_column); }
    ;

transfer_sentence
    : RETURN expression SEMICOLON                           { $$ = new Return($2, @1.first_line, @1.first_column); }
    | RETURN  SEMICOLON                                     { $$ = new Return(null, @1.first_line, @1.first_column); }
    | BREAK SEMICOLON                                       { $$ = new Break(@1.first_line, @1.first_column);}
    | CONTINUE SEMICOLON                                    { $$ = new Continue(@1.first_line, @1.first_column);}
    ;

fn_count
    : COUT INSERTION expression end_count                   { $$ = new Cout($3, $4, @1.first_line, @1.first_column);}
    ;

end_count
    : SEMICOLON                                             { $$ = false; }
    | INSERTION ENDL SEMICOLON                              { $$ = true; }
    ;

fn_Switch
    : SWITCH LPAREN expression RPAREN LBRACE case_l fn_default RBRACE   { $$ = new Switch($3, $6, $7, @1.first_line, @1.first_column); }
    ;

case_l
    : case_list                 { $$ = $1;}
    |                           { $$ = null;}
    ;

case_list
    : case_list cases           { $1.push($2); $$ = $1;}
    | cases                     { $$ = [$1];}
    ;

cases
    : CASE expression COLON statements { $$ = new Case($2, $4, @1.first_line, @1.first_column); }
    ;

fn_default
    : DEFAULT COLON statements          { $$ = new Default($3, @1.first_line, @1.first_column); }
    |                                   { $$ = null; }
    ;


expression
    : operations                    { $$ = $1; }
    | relational                    { $$ = $1; }
    | logical                       { $$ = $1; }
    | ternary                       { $$ = $1; }
    | casting                       { $$ = $1; }
    | toLowUp                       { $$ = $1; }
    | round                         { $$ = $1; }
    | ToString                      { $$ = $1; }
    | data_type                     { $$ = $1; }
    | function_value                { $$ = $1; }
    | length                        { $$ = $1; }
    | typeof                        { $$ = $1; }
    | LPAREN expression RPAREN      { $$ = $2; }
    ;

C_str
    : expression DOT C_STR LPAREN RPAREN { $$ = new C_str($1, @3.first_line, @3.first_column); }
    ;

typeof
    : TYPEOF LPAREN expression RPAREN { $$ = new Typeof($3, @1.first_line, @1.first_column) }
    ;

length
    : expression DOT LENGTH LPAREN RPAREN   { $$ = new Length($1, @3.first_line, @3.first_column); }
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
    : LPAREN TYPE RPAREN expression { $$ = new Casting($2, $4, @1.first_line, @1.first_column); }
    ;

toLowUp
    : TOLOWER LPAREN expression RPAREN { $$ = new toLowUp($3, true, @1.first_line, @1.first_column); }
    | TOUPPER LPAREN expression RPAREN { $$ = new toLowUp($3, false, @1.first_line, @1.first_column); }
    ;

round
    : ROUND LPAREN expression RPAREN   { $$ = new Round($3, @1.first_line, @1.first_column); }
    ;

ToString
    : TOSTRING LPAREN expression RPAREN { $$ = new ToString($3, @1.first_line, @1.first_column); }
    ;

data_type
    : ID                            { $$ = new IdValue($1 ,@1.first_line, @1.first_column); }
    | NUMBER                        { $$ = new Primitive($1, dataType.NUMBER ,@1.first_line, @1.first_column); }
    | DOUBLE                        { $$ = new Primitive($1, dataType.DOUBLE ,@1.first_line, @1.first_column); }
    | BOOL                          { $$ = new Primitive($1, dataType.BOOL ,@1.first_line, @1.first_column); }
    | CHAR                          { $$ = new Primitive($1, dataType.CHAR ,@1.first_line, @1.first_column); }
    | STRING                        { $$ = new Primitive($1, dataType.STRING ,@1.first_line, @1.first_column); }
    | ID LBRACKET expression RBRACKET { $$ = new VectorValue($1, $3, null,@1.first_line, @1.first_column); }
    | ID LBRACKET expression RBRACKET LBRACKET expression RBRACKET { $$ = new VectorValue($1, $3, $6,@1.first_line, @1.first_column); }
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

vectors
    : vectors_declaration SEMICOLON          { $$ = $1; }
    | vector_modification           { $$ = $1; }
    ;

vectors_declaration
    : TYPE ID LBRACKET RBRACKET ASSIGN NEW TYPE LBRACKET expression RBRACKET  { $$ = new DeclarationVector($1, $2, $7, $9, null, true, @1.first_line, @1.first_column); }
    | TYPE ID LBRACKET RBRACKET LBRACKET RBRACKET ASSIGN NEW TYPE LBRACKET expression RBRACKET LBRACKET expression RBRACKET  { $$ = new DeclarationVector($1, $2, $9, $11, $14, false, @1.first_line, @1.first_column); }
    | TYPE ID LBRACKET RBRACKET ASSIGN vector_assignation  { $$ = new DeclarationVector2($1, $2, $6, true, @1.first_line, @1.first_column); }
    | TYPE ID LBRACKET RBRACKET LBRACKET RBRACKET ASSIGN LBRACKET list_value_list RBRACKET  { $$ = new DeclarationVector2($1, $2, $9, false, @1.first_line, @1.first_column); }
    ;

vector_modification
    : ID LBRACKET expression RBRACKET ASSIGN expression SEMICOLON { $$ = new newVectorValue($1, $3, null, $6, @1.first_line, @1.first_column); }
    | ID LBRACKET expression RBRACKET LBRACKET expression RBRACKET ASSIGN expression SEMICOLON  { $$ = new newVectorValue($1, $3, $6, $9, @1.first_line, @1.first_column); }
    ;

vector_assignation
    : C_str                                            { $$ = $1; }
    | LBRACKET value_list RBRACKET                      { $$ = $2; }
    ;

list_value_list
    : list_value_list COMMA LBRACKET value_list RBRACKET { $1.push($4); $$ = $1; }
    | LBRACKET value_list RBRACKET                        { $$ = [$2]; }
    ;

value_list:
    | value_list COMMA expression       { $1.push($3); $$ = $1; }
    | expression                        { $$ = [$1]; }
    ;

general_functions
    : function_declaration      { $$ = $1 }
    | method_declaration        { $$ = $1 }
    | function_value2  SEMICOLON          { $$ = $1 }
    ;


function_declaration
    : TYPE ID LPAREN parameter_cases RPAREN block     { $$ = new Function($1, $2, $4, $6, @1.first_line, @1.first_column); }
    ;

method_declaration
    : VOID ID LPAREN parameter_cases RPAREN block     { $$ = new Function($1, $2, $4, $6, @1.first_line, @1.first_column); }
    ;

value_list2
    : /* empty */ { $$ = []; }
    | non_empty_value_list  { $$ = $1; }
    ;

non_empty_value_list
    : non_empty_value_list COMMA expression { $1.push($3); $$ = $1; }
    | expression { $$ = [$1]; }
    ;

function_value
    : ID LPAREN value_list2 RPAREN { $$ = new FunctionValue($1, $3, true,@1.first_line, @1.first_column); }
    ;

function_value2
    : ID LPAREN value_list2 RPAREN { $$ = new FunctionValue($1, $3, false,@1.first_line, @1.first_column); }
    ;

parameter_cases
    : parameter_list        { $$ = $1; }
    |                       { $$ = []; }
    ;


parameter_list
    : parameter_list COMMA parameter    { $1.push($3); $$ = $1; }
    | parameter                         { $$ = [$1]; }
    ;

parameter
    : TYPE ID                            { $$ = {type:$1, id:$2,vector:false, simple:false};}
    | TYPE ID LBRACKET RBRACKET          { $$ = {type:$1, id:$2,vector:true, simple:true};}
    | TYPE ID LBRACKET RBRACKET LBRACKET RBRACKET  { $$ = {type:$1, id:$2,vector:true, simple:false};}
    ;