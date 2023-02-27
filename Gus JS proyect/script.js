/*------------------------------------------- Funcionalidades del programa ---------------------------------------------*/
const renderOptionsListFormat = (options) =>{
    let result = ""
    for(let i = 0; i < options.length; i++){
        result += "\n" + (i + 1) + ") " + options[i] 
    }
    return result
}
const listAviableDecisions = () =>{
    const aviableDecisions = ["calculadora basica", "calcular iva", "calcular cuotas", "esc"]
    return renderOptionsListFormat(aviableDecisions)
}

const isValidQuery = (query) => query !== null && query !== ""  

const query = () => "Elije una operacion \nOperaciones disponibles: " + listAviableDecisions()

const errorQuery = () => "La opcion seleccionada es invalida\nRecuerda poner el numero de la decision\nDecisiones disponibles:" + listAviableDecisions()


/* ------------------------------------------- Funcionalidades de la calculadora -------------------------------------*/
const calc = (op, a, b) =>{
    switch(op){
        case "+":
            return {ok: true , result: Number(a) + Number(b)}
        case "-":
            return {ok: true , result: a - b}
        case "*":
        case "x":
        case ".":
            return {ok: true , result: a * b}
        case "/":
            return {ok: true, result: a / b}
        default:
            return {ok: false, result: "Error: la operacion seleccionada es invalida"}
    }
}

const onSelectCalc = () =>{
    const op = prompt("Elije una operacion mediante su simbolo: \nEjemplo 'x'")
    const a = prompt("Elije un numero")
    const b = prompt("Elije un numero")
    if(!isNaN(a) || !isNaN(b) ){
        if(isValidQuery(op)){
            const calcResult = calc(op,a,b)
            if(calcResult.ok){
                const result = "El resultado de " + a + " " + op + " " +  b +  " es: " + calcResult.result
                alert(result)
            }else{
                alert(calcResult.result)
            }
        }else{
            alert("Errores: La operacion seleccionada es invalida")
        }
    }   
    else{
        alert("Error: Uno de los numeros seleccionados no es un numero")
    }
}

/*------------------------------------- Funcionalidades de la calculadora del iva ----------------------------------- */

const onSelectIva = () =>{
    const value = prompt("Ingrese el monto del producto")
    if(value !== null && !isNaN(value)){
        const iva = value*21/100
        const result = "El precio del producto con iva incluido: $"+(Number(value) + iva)+ "\nEl precio del iva es: $" + iva
        alert(result)
    }else{
        alert("Error: el valor ingresado no es numerico o presiono el boton de cancelar")
    }
}
/*------------------------------------- Funcionalidades de la calculadora de cuotas --------------------------------- */
const onSelectCuotas = () =>{
    const price = prompt("Ingrese un precio")
    const feeUnits = prompt("Ingrese la cantidad de cuotas a pagar")
    const feeInterest = prompt("Ingrese un valor de interes o escriba 'no' si no tiene valor")

    if(!isNaN(feeUnits) && !isNaN(price) && (!isNaN(feeInterest) || feeInterest === "no") ){
        let result 
        if(feeInterest !== "no"){
            let finalFee = ( Number(price) + (price * feeInterest / 100)) / feeUnits
            result = "Para el valor $" +  price + " a " + feeUnits + " cuotas y un interes mensual del %" + feeInterest + " el precio de la cuota mensual seria $ " + finalFee
        }
        else if (feeInterest === "no"){
            finalFee = price / feeUnits
            result = "Para el valor $" +  price + " a " + feeUnits + " cuotas el precio de la cuota mensual seria $ " + finalFee  
        }
        alert(result)
    }else{
        alert("Error: Uno de los valores ingresados es invalido")
    }
}

/*--------------------------------------------------- Programa -------------------------------------------------------*/

let decision = prompt(query())
while( decision !== "4"){
    if(isValidQuery(decision) ){
        switch(decision){
            case "1":
                onSelectCalc()
                break
            case "2":
                onSelectIva()
                break
            case "3":
                onSelectCuotas()
                break
            default:
                alert("no seleccionaste una operacion valida")
        }
    }
    else{
        alert(errorQuery())
    }
    decision = prompt(query())
}
alert("El programa ha finalizado")