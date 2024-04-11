/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var Grammar = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,10],$V1=[1,11],$V2=[1,8],$V3=[1,9],$V4=[5,11,15,21,60,65],$V5=[1,36],$V6=[1,29],$V7=[1,30],$V8=[1,31],$V9=[1,32],$Va=[1,33],$Vb=[1,34],$Vc=[1,35],$Vd=[1,37],$Ve=[1,38],$Vf=[1,39],$Vg=[1,40],$Vh=[1,41],$Vi=[14,16,17],$Vj=[1,51],$Vk=[1,50],$Vl=[1,52],$Vm=[1,53],$Vn=[1,54],$Vo=[1,55],$Vp=[1,56],$Vq=[1,57],$Vr=[1,58],$Vs=[1,59],$Vt=[1,60],$Vu=[1,61],$Vv=[1,62],$Vw=[1,63],$Vx=[14,16,22,34,35,36,37,38,39,41,42,43,44,45,46,47,48,50,51],$Vy=[14,16,22,34,47,48,50,51],$Vz=[1,99],$VA=[14,16,22,34,35,36,41,42,43,44,45,46,47,48,50,51],$VB=[14,16,22,34,41,42,43,44,45,46,47,48,50,51],$VC=[14,16,22,34,51],$VD=[5,11,15,21,60,63,65];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"program":3,"statements":4,"EOF":5,"statement":6,"fn_count":7,"fn_if":8,"var_declaration":9,"increment_decrement":10,"TYPE":11,"var_list":12,"end_declaration":13,"COMMA":14,"ID":15,"SEMICOLON":16,"ASSIGN":17,"expression":18,"INC":19,"DEC":20,"COUT":21,"INSERTION":22,"end_count":23,"ENDL":24,"operations":25,"relational":26,"logical":27,"ternary":28,"casting":29,"toLowUp":30,"round":31,"data_type":32,"LPAREN":33,"RPAREN":34,"RES":35,"SUM":36,"MUL":37,"DIV":38,"MOD":39,"POW":40,"EQ":41,"NEQ":42,"LT":43,"LEQ":44,"GT":45,"GEQ":46,"AND":47,"OR":48,"NOT":49,"TERNARY":50,"COLON":51,"TOLOWER":52,"TOUPPER":53,"ROUND":54,"NUMBER":55,"DOUBLE":56,"BOOL":57,"CHAR":58,"STRING":59,"IF":60,"block":61,"fn_else":62,"ELSE":63,"LBRACE":64,"RBRACE":65,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",11:"TYPE",14:"COMMA",15:"ID",16:"SEMICOLON",17:"ASSIGN",19:"INC",20:"DEC",21:"COUT",22:"INSERTION",24:"ENDL",33:"LPAREN",34:"RPAREN",35:"RES",36:"SUM",37:"MUL",38:"DIV",39:"MOD",40:"POW",41:"EQ",42:"NEQ",43:"LT",44:"LEQ",45:"GT",46:"GEQ",47:"AND",48:"OR",49:"NOT",50:"TERNARY",51:"COLON",52:"TOLOWER",53:"TOUPPER",54:"ROUND",55:"NUMBER",56:"DOUBLE",57:"BOOL",58:"CHAR",59:"STRING",60:"IF",63:"ELSE",64:"LBRACE",65:"RBRACE"},
productions_: [0,[3,2],[4,2],[4,1],[6,1],[6,1],[6,1],[6,1],[9,3],[12,3],[12,1],[13,1],[13,3],[10,3],[10,3],[7,4],[23,1],[23,3],[18,1],[18,1],[18,1],[18,1],[18,1],[18,1],[18,1],[18,1],[18,3],[25,2],[25,3],[25,3],[25,3],[25,3],[25,3],[25,6],[26,3],[26,3],[26,3],[26,3],[26,3],[26,3],[27,3],[27,3],[27,2],[28,5],[29,4],[30,4],[30,4],[31,4],[32,1],[32,1],[32,1],[32,1],[32,1],[32,1],[8,6],[62,2],[62,2],[62,0],[61,3],[61,2]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 return new AST($$[$0-1]); 
break;
case 2:
 $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
break;
case 3: case 10:
 this.$ = [$$[$0]]; 
break;
case 4: case 5: case 6: case 7: case 18: case 19: case 20: case 21: case 22: case 23: case 24: case 25: case 55: case 56:
 this.$ = $$[$0]; 
break;
case 8:
 this.$ = new Declaration($$[$0-2], $$[$0-1], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column);
break;
case 9:
 $$[$0-2].push($$[$0]); this.$ = $$[$0-2]; 
break;
case 11: case 57:
 this.$ = null; 
break;
case 12: case 26:
 this.$ = $$[$0-1]; 
break;
case 13:
 this.$ = new IncDecFunction($$[$0-2], true, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 14:
 this.$ = new IncDecFunction($$[$0-2], false, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 15:
 this.$ = new Cout($$[$0-1], $$[$0], _$[$0-3].first_line, _$[$0-3].first_column);
break;
case 16:
 this.$ = false; 
break;
case 17:
 this.$ = true; 
break;
case 27:
 this.$ = new Arithmetic($$[$0], $$[$0], ArithmeticOp.UMINUS, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 28:
 this.$ = new Arithmetic($$[$0-2], $$[$0], ArithmeticOp.SUM, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 29:
 this.$ = new Arithmetic($$[$0-2], $$[$0], ArithmeticOp.RES, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 30:
 this.$ = new Arithmetic($$[$0-2], $$[$0], ArithmeticOp.MUL, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 31:
 this.$ = new Arithmetic($$[$0-2], $$[$0], ArithmeticOp.DIV, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 32:
 this.$ = new Arithmetic($$[$0-2], $$[$0], ArithmeticOp.MOD, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 33:
 this.$ = new Arithmetic($$[$0-3], $$[$0-1], ArithmeticOp.POW, _$[$0-5].first_line, _$[$0-5].first_column); 
break;
case 34:
 this.$ = new Relational($$[$0-2], $$[$0], RelationalOp.EQ, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 35:
 this.$ = new Relational($$[$0-2], $$[$0], RelationalOp.NEQ, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 36:
 this.$ = new Relational($$[$0-2], $$[$0], RelationalOp.LT, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 37:
 this.$ = new Relational($$[$0-2], $$[$0], RelationalOp.LEQ, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 38:
 this.$ = new Relational($$[$0-2], $$[$0], RelationalOp.GT, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 39:
 this.$ = new Relational($$[$0-2], $$[$0], RelationalOp.GEQ, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 40:
 this.$ = new Logical($$[$0-2], $$[$0], LogicalOp.AND, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 41:
 this.$ = new Logical($$[$0-2], $$[$0], LogicalOp.OR, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 42:
 this.$ = new Logical($$[$0], $$[$0], LogicalOp.NOT, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 43:
 this.$ = new Ternary($$[$0-4], $$[$0-2], $$[$0], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 44:
this.$ = new Casting($$[$0-2], $$[$0], _$[$0-3].first_line, _$[$0-3].first_column);
break;
case 45:
this.$ = new toLowUp($$[$0-1], true, _$[$0-3].first_line, _$[$0-3].first_column);
break;
case 46:
this.$ = new toLowUp($$[$0-1], false, _$[$0-3].first_line, _$[$0-3].first_column);
break;
case 47:
this.$ = new Round($$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column);
break;
case 48:
 this.$ = new IdValue($$[$0] ,_$[$0].first_line, _$[$0].first_column); 
break;
case 49:
 this.$ = new Primitive($$[$0], dataType.NUMBER ,_$[$0].first_line, _$[$0].first_column); 
break;
case 50:
 this.$ = new Primitive($$[$0], dataType.DOUBLE ,_$[$0].first_line, _$[$0].first_column); 
break;
case 51:
 this.$ = new Primitive($$[$0], dataType.BOOL ,_$[$0].first_line, _$[$0].first_column); 
break;
case 52:
 this.$ = new Primitive($$[$0], dataType.CHAR ,_$[$0].first_line, _$[$0].first_column); 
break;
case 53:
 this.$ = new Primitive($$[$0], dataType.STRING ,_$[$0].first_line, _$[$0].first_column); 
break;
case 54:
 this.$ = new FN_IF($$[$0-3], $$[$0-1], $$[$0], _$[$0-5].first_line, _$[$0-5].first_column); 
break;
case 58:
 this.$ = new Block($$[$0-1], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 59:
 this.$ = new Block([], _$[$0-1].first_line, _$[$0-1].first_column); 
break;
}
},
table: [{3:1,4:2,6:3,7:4,8:5,9:6,10:7,11:$V0,15:$V1,21:$V2,60:$V3},{1:[3]},{5:[1,12],6:13,7:4,8:5,9:6,10:7,11:$V0,15:$V1,21:$V2,60:$V3},o($V4,[2,3]),o($V4,[2,4]),o($V4,[2,5]),o($V4,[2,6]),o($V4,[2,7]),{22:[1,14]},{33:[1,15]},{12:16,15:[1,17]},{19:[1,18],20:[1,19]},{1:[2,1]},o($V4,[2,2]),{15:$V5,18:20,25:21,26:22,27:23,28:24,29:25,30:26,31:27,32:28,33:$V6,35:$V7,40:$V8,49:$V9,52:$Va,53:$Vb,54:$Vc,55:$Vd,56:$Ve,57:$Vf,58:$Vg,59:$Vh},{15:$V5,18:42,25:21,26:22,27:23,28:24,29:25,30:26,31:27,32:28,33:$V6,35:$V7,40:$V8,49:$V9,52:$Va,53:$Vb,54:$Vc,55:$Vd,56:$Ve,57:$Vf,58:$Vg,59:$Vh},{13:43,14:[1,44],16:[1,45],17:[1,46]},o($Vi,[2,10]),{16:[1,47]},{16:[1,48]},{16:[1,64],22:[1,65],23:49,35:$Vj,36:$Vk,37:$Vl,38:$Vm,39:$Vn,41:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt,47:$Vu,48:$Vv,50:$Vw},o($Vx,[2,18]),o($Vx,[2,19]),o($Vx,[2,20]),o($Vx,[2,21]),o($Vx,[2,22]),o($Vx,[2,23]),o($Vx,[2,24]),o($Vx,[2,25]),{11:[1,67],15:$V5,18:66,25:21,26:22,27:23,28:24,29:25,30:26,31:27,32:28,33:$V6,35:$V7,40:$V8,49:$V9,52:$Va,53:$Vb,54:$Vc,55:$Vd,56:$Ve,57:$Vf,58:$Vg,59:$Vh},{15:$V5,18:68,25:21,26:22,27:23,28:24,29:25,30:26,31:27,32:28,33:$V6,35:$V7,40:$V8,49:$V9,52:$Va,53:$Vb,54:$Vc,55:$Vd,56:$Ve,57:$Vf,58:$Vg,59:$Vh},{33:[1,69]},{15:$V5,18:70,25:21,26:22,27:23,28:24,29:25,30:26,31:27,32:28,33:$V6,35:$V7,40:$V8,49:$V9,52:$Va,53:$Vb,54:$Vc,55:$Vd,56:$Ve,57:$Vf,58:$Vg,59:$Vh},{33:[1,71]},{33:[1,72]},{33:[1,73]},o($Vx,[2,48]),o($Vx,[2,49]),o($Vx,[2,50]),o($Vx,[2,51]),o($Vx,[2,52]),o($Vx,[2,53]),{34:[1,74],35:$Vj,36:$Vk,37:$Vl,38:$Vm,39:$Vn,41:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt,47:$Vu,48:$Vv,50:$Vw},o($V4,[2,8]),{15:[1,75]},o($V4,[2,11]),{15:$V5,18:76,25:21,26:22,27:23,28:24,29:25,30:26,31:27,32:28,33:$V6,35:$V7,40:$V8,49:$V9,52:$Va,53:$Vb,54:$Vc,55:$Vd,56:$Ve,57:$Vf,58:$Vg,59:$Vh},o($V4,[2,13]),o($V4,[2,14]),o($V4,[2,15]),{15:$V5,18:77,25:21,26:22,27:23,28:24,29:25,30:26,31:27,32:28,33:$V6,35:$V7,40:$V8,49:$V9,52:$Va,53:$Vb,54:$Vc,55:$Vd,56:$Ve,57:$Vf,58:$Vg,59:$Vh},{15:$V5,18:78,25:21,26:22,27:23,28:24,29:25,30:26,31:27,32:28,33:$V6,35:$V7,40:$V8,49:$V9,52:$Va,53:$Vb,54:$Vc,55:$Vd,56:$Ve,57:$Vf,58:$Vg,59:$Vh},{15:$V5,18:79,25:21,26:22,27:23,28:24,29:25,30:26,31:27,32:28,33:$V6,35:$V7,40:$V8,49:$V9,52:$Va,53:$Vb,54:$Vc,55:$Vd,56:$Ve,57:$Vf,58:$Vg,59:$Vh},{15:$V5,18:80,25:21,26:22,27:23,28:24,29:25,30:26,31:27,32:28,33:$V6,35:$V7,40:$V8,49:$V9,52:$Va,53:$Vb,54:$Vc,55:$Vd,56:$Ve,57:$Vf,58:$Vg,59:$Vh},{15:$V5,18:81,25:21,26:22,27:23,28:24,29:25,30:26,31:27,32:28,33:$V6,35:$V7,40:$V8,49:$V9,52:$Va,53:$Vb,54:$Vc,55:$Vd,56:$Ve,57:$Vf,58:$Vg,59:$Vh},{15:$V5,18:82,25:21,26:22,27:23,28:24,29:25,30:26,31:27,32:28,33:$V6,35:$V7,40:$V8,49:$V9,52:$Va,53:$Vb,54:$Vc,55:$Vd,56:$Ve,57:$Vf,58:$Vg,59:$Vh},{15:$V5,18:83,25:21,26:22,27:23,28:24,29:25,30:26,31:27,32:28,33:$V6,35:$V7,40:$V8,49:$V9,52:$Va,53:$Vb,54:$Vc,55:$Vd,56:$Ve,57:$Vf,58:$Vg,59:$Vh},{15:$V5,18:84,25:21,26:22,27:23,28:24,29:25,30:26,31:27,32:28,33:$V6,35:$V7,40:$V8,49:$V9,52:$Va,53:$Vb,54:$Vc,55:$Vd,56:$Ve,57:$Vf,58:$Vg,59:$Vh},{15:$V5,18:85,25:21,26:22,27:23,28:24,29:25,30:26,31:27,32:28,33:$V6,35:$V7,40:$V8,49:$V9,52:$Va,53:$Vb,54:$Vc,55:$Vd,56:$Ve,57:$Vf,58:$Vg,59:$Vh},{15:$V5,18:86,25:21,26:22,27:23,28:24,29:25,30:26,31:27,32:28,33:$V6,35:$V7,40:$V8,49:$V9,52:$Va,53:$Vb,54:$Vc,55:$Vd,56:$Ve,57:$Vf,58:$Vg,59:$Vh},{15:$V5,18:87,25:21,26:22,27:23,28:24,29:25,30:26,31:27,32:28,33:$V6,35:$V7,40:$V8,49:$V9,52:$Va,53:$Vb,54:$Vc,55:$Vd,56:$Ve,57:$Vf,58:$Vg,59:$Vh},{15:$V5,18:88,25:21,26:22,27:23,28:24,29:25,30:26,31:27,32:28,33:$V6,35:$V7,40:$V8,49:$V9,52:$Va,53:$Vb,54:$Vc,55:$Vd,56:$Ve,57:$Vf,58:$Vg,59:$Vh},{15:$V5,18:89,25:21,26:22,27:23,28:24,29:25,30:26,31:27,32:28,33:$V6,35:$V7,40:$V8,49:$V9,52:$Va,53:$Vb,54:$Vc,55:$Vd,56:$Ve,57:$Vf,58:$Vg,59:$Vh},{15:$V5,18:90,25:21,26:22,27:23,28:24,29:25,30:26,31:27,32:28,33:$V6,35:$V7,40:$V8,49:$V9,52:$Va,53:$Vb,54:$Vc,55:$Vd,56:$Ve,57:$Vf,58:$Vg,59:$Vh},o($V4,[2,16]),{24:[1,91]},{34:[1,92],35:$Vj,36:$Vk,37:$Vl,38:$Vm,39:$Vn,41:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt,47:$Vu,48:$Vv,50:$Vw},{34:[1,93]},o($Vx,[2,27]),{15:$V5,18:94,25:21,26:22,27:23,28:24,29:25,30:26,31:27,32:28,33:$V6,35:$V7,40:$V8,49:$V9,52:$Va,53:$Vb,54:$Vc,55:$Vd,56:$Ve,57:$Vf,58:$Vg,59:$Vh},o($Vy,[2,42],{35:$Vj,36:$Vk,37:$Vl,38:$Vm,39:$Vn,41:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt}),{15:$V5,18:95,25:21,26:22,27:23,28:24,29:25,30:26,31:27,32:28,33:$V6,35:$V7,40:$V8,49:$V9,52:$Va,53:$Vb,54:$Vc,55:$Vd,56:$Ve,57:$Vf,58:$Vg,59:$Vh},{15:$V5,18:96,25:21,26:22,27:23,28:24,29:25,30:26,31:27,32:28,33:$V6,35:$V7,40:$V8,49:$V9,52:$Va,53:$Vb,54:$Vc,55:$Vd,56:$Ve,57:$Vf,58:$Vg,59:$Vh},{15:$V5,18:97,25:21,26:22,27:23,28:24,29:25,30:26,31:27,32:28,33:$V6,35:$V7,40:$V8,49:$V9,52:$Va,53:$Vb,54:$Vc,55:$Vd,56:$Ve,57:$Vf,58:$Vg,59:$Vh},{61:98,64:$Vz},o($Vi,[2,9]),{16:[1,100],35:$Vj,36:$Vk,37:$Vl,38:$Vm,39:$Vn,41:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt,47:$Vu,48:$Vv,50:$Vw},o($VA,[2,28],{37:$Vl,38:$Vm,39:$Vn}),o($VA,[2,29],{37:$Vl,38:$Vm,39:$Vn}),o($Vx,[2,30]),o($Vx,[2,31]),o($Vx,[2,32]),o($VB,[2,34],{35:$Vj,36:$Vk,37:$Vl,38:$Vm,39:$Vn}),o($VB,[2,35],{35:$Vj,36:$Vk,37:$Vl,38:$Vm,39:$Vn}),o($VB,[2,36],{35:$Vj,36:$Vk,37:$Vl,38:$Vm,39:$Vn}),o($VB,[2,37],{35:$Vj,36:$Vk,37:$Vl,38:$Vm,39:$Vn}),o($VB,[2,38],{35:$Vj,36:$Vk,37:$Vl,38:$Vm,39:$Vn}),o($VB,[2,39],{35:$Vj,36:$Vk,37:$Vl,38:$Vm,39:$Vn}),o($Vy,[2,40],{35:$Vj,36:$Vk,37:$Vl,38:$Vm,39:$Vn,41:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt}),o([14,16,22,34,48,50,51],[2,41],{35:$Vj,36:$Vk,37:$Vl,38:$Vm,39:$Vn,41:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt,47:$Vu}),{35:$Vj,36:$Vk,37:$Vl,38:$Vm,39:$Vn,41:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt,47:$Vu,48:$Vv,50:$Vw,51:[1,101]},{16:[1,102]},o($Vx,[2,26]),{15:$V5,18:103,25:21,26:22,27:23,28:24,29:25,30:26,31:27,32:28,33:$V6,35:$V7,40:$V8,49:$V9,52:$Va,53:$Vb,54:$Vc,55:$Vd,56:$Ve,57:$Vf,58:$Vg,59:$Vh},{14:[1,104],35:$Vj,36:$Vk,37:$Vl,38:$Vm,39:$Vn,41:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt,47:$Vu,48:$Vv,50:$Vw},{34:[1,105],35:$Vj,36:$Vk,37:$Vl,38:$Vm,39:$Vn,41:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt,47:$Vu,48:$Vv,50:$Vw},{34:[1,106],35:$Vj,36:$Vk,37:$Vl,38:$Vm,39:$Vn,41:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt,47:$Vu,48:$Vv,50:$Vw},{34:[1,107],35:$Vj,36:$Vk,37:$Vl,38:$Vm,39:$Vn,41:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt,47:$Vu,48:$Vv,50:$Vw},o($V4,[2,57],{62:108,63:[1,109]}),{4:110,6:3,7:4,8:5,9:6,10:7,11:$V0,15:$V1,21:$V2,60:$V3,65:[1,111]},o($V4,[2,12]),{15:$V5,18:112,25:21,26:22,27:23,28:24,29:25,30:26,31:27,32:28,33:$V6,35:$V7,40:$V8,49:$V9,52:$Va,53:$Vb,54:$Vc,55:$Vd,56:$Ve,57:$Vf,58:$Vg,59:$Vh},o($V4,[2,17]),o($VC,[2,44],{35:$Vj,36:$Vk,37:$Vl,38:$Vm,39:$Vn,41:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt,47:$Vu,48:$Vv,50:$Vw}),{15:$V5,18:113,25:21,26:22,27:23,28:24,29:25,30:26,31:27,32:28,33:$V6,35:$V7,40:$V8,49:$V9,52:$Va,53:$Vb,54:$Vc,55:$Vd,56:$Ve,57:$Vf,58:$Vg,59:$Vh},o($Vx,[2,45]),o($Vx,[2,46]),o($Vx,[2,47]),o($V4,[2,54]),{8:115,60:$V3,61:114,64:$Vz},{6:13,7:4,8:5,9:6,10:7,11:$V0,15:$V1,21:$V2,60:$V3,65:[1,116]},o($VD,[2,59]),o($VC,[2,43],{35:$Vj,36:$Vk,37:$Vl,38:$Vm,39:$Vn,41:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt,47:$Vu,48:$Vv,50:$Vw}),{34:[1,117],35:$Vj,36:$Vk,37:$Vl,38:$Vm,39:$Vn,41:$Vo,42:$Vp,43:$Vq,44:$Vr,45:$Vs,46:$Vt,47:$Vu,48:$Vv,50:$Vw},o($V4,[2,55]),o($V4,[2,56]),o($VD,[2,58]),o($Vx,[2,33])],
defaultActions: {12:[2,1]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

    const { Arithmetic } = require('../js/Expression/Arithmetic');
    const { Relational } = require('../js/Expression/Relational');
    const { Logical } = require('../js/Expression/Logical');
    const { Ternary } = require('../js/Expression/Ternary');
    const { Primitive } = require('../js/Expression/Primitive');
    const { Casting } = require('../js/Expression/Casting');
    const { toLowUp } = require('../js/Expression/toLowUp');
    const { Round } = require('../js/Expression/Round');
    const { ArithmeticOp, RelationalOp, LogicalOp, Result, dataType } = require('../js/Expression/Result');
    const { Cout } = require('../js/Instruction/Cout');
    const { Block } = require('../js/Instruction/Block');
    const { Declaration } = require('../js/Instruction/Declaration');
    const { IdValue } = require('../js/Instruction/IdValue');
    const { FN_IF } = require('../js/Instruction/Control/IF');
    const {IncDecFunction} = require('../js/Instruction/IncDecFunction');
    const { AST } = require('../js/AST');
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/*Ignore Comments*/
break;
case 1:/*Ignore Comments*/
break;
case 2:/*Ignore Whitespaces*/
break;
case 3:return 56;
break;
case 4:return 55;
break;
case 5:return 21;
break;
case 6:return 22;
break;
case 7:return 24;
break;
case 8:return 60;
break;
case 9:return 63;
break;
case 10:return 52;
break;
case 11:return 53;
break;
case 12:return 54;
break;
case 13:return 19;
break;
case 14:return 20;
break;
case 15:return 36;
break;
case 16:return 35;
break;
case 17:return 37;
break;
case 18:return 38;
break;
case 19:return 40;
break;
case 20:return 39;
break;
case 21:return 41;
break;
case 22:return 42;
break;
case 23:return 44;
break;
case 24:return 46;
break;
case 25:return 43;
break;
case 26:return 45;
break;
case 27:return 48;
break;
case 28:return 47;
break;
case 29:return 49;
break;
case 30:return 14;
break;
case 31:return 33;
break;
case 32:return 34;
break;
case 33:return 64;
break;
case 34:return 65;
break;
case 35:return 'LBRACKET';
break;
case 36:return 'RBRACKET';
break;
case 37:return 17;
break;
case 38:return 16;
break;
case 39:return 50;
break;
case 40:return 51;
break;
case 41:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2);return 58;
break;
case 42:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2);return 59;
break;
case 43:return 57;
break;
case 44:return 11;
break;
case 45:return 15;
break;
case 46:return 5
break;
case 47:console.error("Error: Caracter inesperado: " + yy_.yytext + " Linea: " + yy_.yylloc.first_line + " Columna: " + yy_.yylloc.first_column);
break;
}
},
rules: [/^(?:\s+\/\*([^*]|\*+[^*/])*\*+\/)/i,/^(?:\/\/.*[\n])/i,/^(?:[ \t\r\n]+)/i,/^(?:[0-9]+(\.[0-9]+)\b)/i,/^(?:[0-9]+\b)/i,/^(?:cout\b)/i,/^(?:<<)/i,/^(?:endl\b)/i,/^(?:if\b)/i,/^(?:else\b)/i,/^(?:tolower\b)/i,/^(?:toupper\b)/i,/^(?:round\b)/i,/^(?:\+\+)/i,/^(?:--)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:\/)/i,/^(?:pow\b)/i,/^(?:%)/i,/^(?:==)/i,/^(?:!=)/i,/^(?:<=)/i,/^(?:>=)/i,/^(?:<)/i,/^(?:>)/i,/^(?:\|\|)/i,/^(?:&&)/i,/^(?:!)/i,/^(?:,)/i,/^(?:\()/i,/^(?:\))/i,/^(?:\{)/i,/^(?:\})/i,/^(?:\[)/i,/^(?:\])/i,/^(?:=)/i,/^(?:;)/i,/^(?:\?)/i,/^(?::)/i,/^(?:'([^\']|[\t]|[\n]|[\r]|[ ])')/i,/^(?:"([^\"]|[\t]|[\n]|[\r])*")/i,/^(?:false|true\b)/i,/^(?:int|double|bool|char|std::string\b)/i,/^(?:([a-zA-Z_][a-zA-Z0-9_]*)\b)/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = Grammar;
exports.Parser = Grammar.Parser;
exports.parse = function () { return Grammar.parse.apply(Grammar, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}