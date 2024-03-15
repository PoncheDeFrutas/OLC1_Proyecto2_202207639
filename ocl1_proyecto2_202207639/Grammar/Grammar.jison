/*---------------------------------------------------IMPORTS AND JS CODE-------------------------------------------------------*/
%{

%}
/*---------------------------------------------------LEXICAL    ANALYZER-------------------------------------------------------*/
%lex
%options case-insensitive


%%

\s+
"//".*                      /*Ignore Comments*/
\/\*([^*]|\*+[^*/])*\*+\/   /*Ignore Comments*/
[ \t\r\n]+                  /*Ignore Whitespaces*/

[0-9]+("."[0-9]+)\b         {console.log("DOUBLE: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'DOUBLE';}
[0-9]+\b                    {console.log("INT: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'INT';}

"++"    {console.log("INC: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'INC';}
"--"    {console.log("DEC: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'DEC';}
"+"     {console.log("SUM: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'SUM';}
"-"     {console.log("RES: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'RES';}
"*"     {console.log("MUL: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'MUL';}
"/"     {console.log("DIV: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'DIV';}
"pow"   {console.log("POW: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'POW';}
"%"     {console.log("MOD: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'MOD';}
"=="    {console.log("EQ: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'EQ';}
"!="    {console.log("NEQ: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'NEQ';}
"<="    {console.log("LEQ: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'LEQ';}
">="    {console.log("GEQ: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'GEQ';}
"<"     {console.log("LT: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'LT';}
">"     {console.log("GT: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'GT';}
"||"    {console.log("OR: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'OR';}
"&&"    {console.log("AND: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'AND';}
"!"     {console.log("NOT: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'NOT';}

","     {console.log("COMMA: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'COMMA';}
"("     {console.log("LPAREN: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'LPAREN';}
")"     {console.log("RPAREN: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'RPAREN';}
"{"     {console.log("LBRACE: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'LBRACE';}
"}"     {console.log("RBRACE: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'RBRACE';}
"["     {console.log("LBRACKET: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'LBRACKET';}
"]"     {console.log("RBRACKET: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'RBRACKET';}
"="     {console.log("ASSIGN: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'ASSIGN';}
";"     {console.log("SEMICOLON: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'SEMICOLON';}
"?"     {console.log("TERNARY: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'TERNARY';}
":"     {console.log("COLON: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'COLON';}


\'(.|[\t]|[\n]|[\r]|[ ])\'                  {console.log("CHAR: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'CHAR';}
\"(.|[\t]|[\n]|[\r])*\"                     {console.log("STRING: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'STRING';}
"false"|"true"                              {console.log("BOOL: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'BOOL';}
"int"|"double"|"bool"|"char"|"std::string"  {console.log("TIPO: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'TYPE';}
([a-zA-Z_][a-zA-Z0-9_]*)\b                  {console.log("ID: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column); return 'ID';}


<<EOF>> return 'EOF'

. {console.error("Error: Caracter inesperado: " + yytext + " Linea: " + yylloc.first_line + " Columna: " + yylloc.first_column);}

/lex

/*Precedence------------*/
%right RES
%nonassoc POW
%left MOD, DIV, MUL
%left SUM, RES
%left EQ, NEQ, LT, LEQ, GT, GEQ
%right NOT
%left AND
%left OR


/*---------------------------------------------------SINTACTIC  ANALYZER-------------------------------------------------------*/
%start program

%%

program
    : statments EOF
    ;

statments
    : statments statement
    | statement
    ;

statement
    : var_Declaration
    ;

var_Declaration
    : TYPE var_list end_declaration
    ;

var_list
    : var_list COMMA ID
    | ID
    ;

end_declaration
    : SEMICOLON
    | ASSIGN expression SEMICOLON
    ;

expression
    : expression SUM expression
    | expression RES expression
    | expression MUL expression
    | expression DIV expression
    | POW LPAREN expression COMMA expression RPAREN
    | expression MOD expression
    | expression EQ expression
    | expression NEQ expression
    | expression LT expression
    | expression LEQ expression
    | expression GT expression
    | expression GEQ expression
    | expression AND expression
    | expression OR expression
    | NOT expression
    | ID
    | INT
    | DOUBLE
    | BOOL
    | CHAR
    | STRING
    ;

