'use strict';
const minimumPrice = 100;

const services = [
    50,
    100,
    75
];

function getFormData() {
    const hours =
        document.querySelector("#hoursInput").value;
    console.log(
        "¿hours es propiedad de window?",
        Object.prototype.hasOwnProperty.call(window, "hours")
    );

    console.log(
        "¿hours es propiedad de globalThis?",
        Object.prototype.hasOwnProperty.call(globalThis, "hours")
    );

    console.log(
        "scope:",
        typeof hours,
        hours
    );

    const price =
        document.querySelector("#price").value;

    const discount =
        document.querySelector("#discount").value;

    const clientType =
        document.querySelector("#clientType").value;

    return {
        hours: hours,
        price: price,
        discount: discount,
        clientType: clientType
    };
}

function calculateTax(clientType = "standard") {
    let tax;
    clientType === "premium" ? tax = 10 : tax = 21;
    return tax;
}

function calculateBudget() {
    const formData =
        getFormData();

    const hours =
        parseFloat(formData.hours);
    
    if (Number.isNaN(hours)) {
        throw new Error("Las horas tienen que ser validos");
    }
    if (hours <0){
        throw new Error("Las horas no deberan que ser negativos");
    }

    const price =
        parseFloat(formData.price);

    if (Number.isNaN(price)) {
        throw new Error("El precio tienen que ser valido");
    }
    if (price <0){
        throw new Error("El precio no deberan que ser negativo");
    }


    let discount =
        parseInt(formData.discount);

    // if (!discount) {
    //     discount = 10;
    // }

    if (Number.isNaN(discount)) {
        discount = 10;
    }

    if (formData.clientType === "premium") {
        discount = 20;
    }

    const subtotal =
        hours * price;

    var tax =
        calculateTax(formData.clientType);

    const isLargeProject = hours > 10 || price > 50;
    if (isLargeProject && formData.clientType === "standard") {
        tax = 10;
    }

    const discountAmount =
        subtotal *
        discount /
        100;

    const subtotalWithDiscount =
        subtotal -
        discountAmount;

    const taxAmount =
        subtotalWithDiscount *
        tax /
        100;

    let total =
        subtotalWithDiscount +
        taxAmount;

    if (total < minimumPrice) {
        total = minimumPrice;
    }

    return {
        hours: hours,
        price: price,
        discount: discount,
        subtotal: subtotal,
        discountAmount: discountAmount,
        tax: tax,
        taxAmount: taxAmount,
        total: total
    };
}

function processBudget() {
    try {
        const result =
            calculateBudget();

        renderBudget(result);
    } catch (error) {
        renderError(error);
    }
}

function renderBudget(result) {
    const subtotalElement =
        document.querySelector("#subtotal");

    const discountAmountElement =
        document.querySelector("#discountAmount");

    const taxAmountElement =
        document.querySelector("#taxAmount");

    const totalElement =
        document.querySelector("#total");

    if (subtotalElement) {
        subtotalElement.textContent =
            result.subtotal.toFixed(2);
    }

    if (discountAmountElement) {
        discountAmountElement.textContent =
            result.discountAmount.toFixed(2);
    }

    if (taxAmountElement) {
        taxAmountElement.textContent =
            result.taxAmount.toFixed(2);
    }

    if (totalElement) {
        totalElement.textContent =
            result.total.toFixed(2);
    }
}

function renderError(error) {
    const errorElement =
        document.querySelector("#error");

    if (errorElement) {
        errorElement.textContent =
            error.message;
    }

    console.error(error);
}

function listServices() {
    let contador = 0;
    for (
        let elemento of services
    ) {
        console.log(
            "Servei " +
            contador +
            ": " +
            elemento +
            " €"
        );
        contador++;
    }

    // for (
    //     let index = 0;
    //     index < services.length;
    //     index++
    // ) {
    //     console.log(
    //         "Servei " +
    //         (index + 1) +
    //         ": " +
    //         services[index] +
    //         " €"
    //     );
    // }
}

function calculateServicesTotal() {
    let total = 0;
    for(
        let elemento of services
    ){
        total += elemento;
    }
    return total;

//     let total = 0;

//     for (
//         let index = 0;
//         index < services.length;
//         index++
//     ) {
//         total += services[index];
//     }

//     return total;
}

function testTaxScope() {
    if (true) {
        let tax = 21;
    }

    console.log(
        "Impost de prova:",
        tax
    );
}

const calculateButton =
    document.querySelector(
        "#calculateButton"
    );

if (calculateButton) {
    calculateButton.addEventListener(
        "click",
        processBudget
    );
}

console.log(
    "Total serveis:",
    calculateServicesTotal()
);




// Exercici 1.1: Mode Estricte i Contaminació de l'Àmbit Global

// 1.+ 2.Practica
// Si estoy en modo no estricto , no me sale error aun que la variable no esta declarado.
// Provando en la consola de navegador con F12, pero si pongo modo estricto me sale error de Uncaught ReferenceError: hours is not defined.

// 3.Buscar otro aciones prohibido de Modo Estricto
// Variables no declaradas (usa let const, var para declarar), uso de 'with', eliminar variables con delete (usar delete globalThis.lavariable para elimnar)
// uso de parametros repetidos " function sum (a , a ,b)" (no repetirlo "function sum(a ,b ,c)",
// Ni usar el nombre eval o arguments como un nombre de variable o parametro ,
// Lo mismo como antes no usar estos nombre para variables o fuciones o parametros (implements, interface, let, package, private, protected, public, static, yield.) 

// 4.Solucion
// Lo tengo que declarar la variable con let o const y ya no sale el error


// Exercici 1.2: Migració d'Àmbit d'Execució (var → let / const) i Hoisting

// 1.Practica sustituir por const
// Usando var para las variables tiene errores porque estan accesible desde fuera del bloce
// Sustituir los elementos HTML, arrays de configuracion y valores limites por const
// 2.Practica sustituir por let
// Sustituir los elementos que quieren reasignacion logica por let.
// 3.Practica let tax error
// Cambiar var tax = 21 por let tax = 21 y en consola sale el error :  Uncaught ReferenceError: tax is not defined

// Exercici 2.1: El Perill dels Valors Falsy i l'Operador ??
// Problema de descuento por el valor falsy , si el apartdo descuento ponemos 0 tambien hace un descuneto de 10% , el descuento de 10% solo deberia que pasar cuando 
// lo dejamos vacio el descueto.

// 1. Buscar sobre los valores falsy en Javascipt(false, 0,-0, 0n, "", null, undefined, NaN).
// false (Tipo:Booleano), 0(Tipo:Numero, 0), -0(Tipo:Number, 0 negativo), 0n(Tipo:BigInt, 0 de tipo BigInt), 
// ""(Tipo:String), null(Tipo: Null), undefined(Tipo: undefined), Nan(Tipo:Number, no es un numero)
//2. Diferencia entre || y ??
// || evalua el primer valor(izquierda) pero si es falsy, evelua el segundo valor(derecha).
// ?? evalua primer valor (izquierda) pero si es exacto null o undefined, evalua el segundo(derecha).

// 3. refactoriza el apartado de descuento que seguie funcionando
// Ya esta cambiado la declaracion de la variable var por const en 1.2. solo se falta cambiar la condicion del if.
// en vez de poner (!discount) usamos Number.isNaN(discount), que si no es un numero pasa a este condicion.

// Exercici 2.2: Sanejament i Parseig Segur contra Contaminació NaN
// Si el input de horas y servicios lo dejamos vacio o ponemos letras sale NaN

// 1. Puse condicions que si no es un numero o es vacio sale el error con Throw new error.
// 2. En los impuestos (tax) para evitar valores undefined porque hay una condicion que si clientTyoe es premium es 10% de impuestos
// sino es 21% pues lo hago que pordefecto el valor es Estandard, paraque sino esta pasado nada (undefined), va aplicar Estandard


// Exercici 3.1: Coerció Implícita de Tipus i Igualtat Estricta

// 1. Igualdad y Desigualdad vs Estrictes
// El uso de Igual feble (==) da un poco de error en los valores. Por eso replacar por Igual estricte(===).
// Por ejemplo: null y undefined para == es true pero para === es false. Que debera que ser exacto para ser true.
// los mismo por desigualdad feble y (!=) desigualdad (!==).

// 2. Refactoriza Calculate Tax usando opredador condicional ternari(? :)
// Para refactorizar el codigo es mas simple y facil en vez de usar if else. 

// Exercici 3.2: Corrupció de Condicionals per Precedència Lògica

// 1. + 2. Error de short circuit usando el operador || en calculateBudget()
// En la condicon es como  A>B || A<B && A<C hay 3 condiciones pero sistema podra confundir por 2 (A>B) || (A<B && A<C) 
// Hacemos uso de un Bool: bool = A>B || A<B y luego un if si bool es true && A<C.

// 3. Ahora a comprova 12 horas y 20€/hora con VIP el total es 261.36.

//Exercici 4.1: Modernització de Bucles i Disseny Declaratiu
// 1. + 2. Error de Bucle For en listServices() i calculateServicesTotal()
// El bucle for lo que esta en el codigo es manual asi el mismo controla index, cuando empieza cuando para y cuando avanza.
// El problema es son cosas manuales y pueden tener errores. Poreso  se cambia por un bucle avanzado (for .. of).


// Exercici 4.2: Anàlisi de Compatibilitat de Navegadors (Browser Compatibility)
// Nuevas caractaristicas como globalThis y operador ?? pueden tener errores si se usan en navegadores antigps.
// Tras comprovando en caniuse.com en 6 navegadores por version empiezo a suportar desde:
// Operador ?? (Nullish coalescing): Chrome desde 80, Edge desde 80, Safari desde 13.1, Firefox desde 72, Opera desde 67, Interent Explorer Nunca.
// Operador ?? (Nullish coalescing): Chrome desde 80, Edge desde 80, Safari desde 13.1, Firefox desde 72, Opera desde 67, Interent Explorer Nunca.

// 4 Herramientas transpildores que se utilizan en indutria para ser compatible con navegadores antiguos 
// Babel:  Convierte nuevas caractaristicas o opreadores com (??) en codigo compatible con navegador antiguo
// TypeScript: Tiene la misma funcion que Babel.
// SWC: Convierte en Rust, y es mucho mas rapido que Babel esta usado por Next.js.
// Google Closure Compiler: transpila y optimiza el codigo y esta usado por Google.
