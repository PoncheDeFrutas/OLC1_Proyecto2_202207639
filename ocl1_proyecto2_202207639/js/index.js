const parser = require('../Grammar/Grammar')

function main(){
    try{
        const test_text = `
        int numero;
        int var1, var2, var3;
        std::string cadena = "hola";
        char var4 = 'a';
        bool flag = true;
        double a, b, c = 5.5+10;
        `
        const result = parser.parse(test_text)
        console.log(result)
        console.log("Success")
    } catch (e){
        console.error(e)
    }
}

main()