/*=========Definición de constantes de uso general=========*/

const g = 9.81;           // Valor de la aceleración gravitatoria en m/s2
const pat = 101325;       // Valor de la presión atmosférica en pascales
const pi = 3.14159265359; //Valor aproximado del número pi

/*=========Definición de funciones de uso general=========*/

// Función que calcula el logaritmo base 10 de x
function log(x) {
    return Math.log10(x);
}

// Función que calcula x elevado a la y para x positivo e y real
function pot(x,y) {
    return Math.exp(y*Math.log(x));
}
// Función que calcula la velocidad en tubería
function velocidad(caudal, diametro) {
    return 4*caudal/(pi*diametro*diametro);
}

// Función que calcula el número de Reynolds
function reynolds(dia, vel, dens, vis) {
    return dia*vel*dens/vis;
}

// Función que calcula el factor de fricción de Fanning
function fanning(rey, rug, dia) {
    let er = rug/dia;
    let rf = 1/(-1.8*log(6.9/rey + pot(er/3.7, 1.11)));
    return pot(rf, 2); 
}

// Función que calcula la pérdida de fricción en tramos rectos
function alturaTr(fan, lon, di, ve) {
    return fan*lon*pot(ve, 2)/(2*di*g);
}

// Función que calcula la pérdida de fricción en accesorios
function alturaAcc(cantArr, kArr, ve) {
    let k = 0;
    for (let i = 0; i < cantArr.length; i++) {
        k += cantArr[i]*kArr[i];
    }
    return k*pot(ve, 2)/(2*g);
}




// Función que toma los datos y devuelve los resultados
function calcular() {
    
    // Toma de datos crudos (sin convertir unidades) ingresados por el usuario
    let ro = document.getElementById("density").value; 
    let mu = document.getElementById("viscosity").value;  
    let q = document.getElementById("flow").value;
    let pVap = document.getElementById("presure-vap").value;  
    let l = document.getElementById("length").value;
    let d = document.getElementById("diameter").value;
    let e = document.getElementById("rugosity").value;
    let eff = document.getElementById("efficiency").value;
    let v1 = document.getElementById("velocity-in").value;
    let v2 = document.getElementById("velocity-out").value;
    let p1 = document.getElementById("presure-in").value;
    let p2 = document.getElementById("presure-out").value;
    let z1 = document.getElementById("height-in").value;
    let z2 = document.getElementById("height-out").value;


    // Toma de los factores de conversión según la unidad ingresada
    let roConv = document.getElementById("density-convert").value;
    let muConv = document.getElementById("viscosity-convert").value;
    let qConv = document.getElementById("flow-convert").value;
    let pVapConv = document.getElementById("presure-vap-convert").value;
    let lConv = document.getElementById("length-convert").value;
    let dConv = document.getElementById("diameter-convert").value;
    let eConv = document.getElementById("rugosity-convert").value;
    let v1Conv = document.getElementById("velocity-in-convert").value;
    let v2Conv = document.getElementById("velocity-out-convert").value;
    let p1Conv = document.getElementById("presure-in-convert").value;
    let p2Conv = document.getElementById("presure-out-convert").value;
    let z1Conv = document.getElementById("height-in-convert").value;
    let z2Conv = document.getElementById("height-out-convert").value;

    // Conversión de datos ingresados al Sistema Internacional de Unidades
    ro = ro*roConv;
    mu = mu*muConv;
    q = q*qConv/60000;
    pVap = pVap/pVapConv*pat;
    l = l*lConv;
    d = d*dConv;
    e = e*eConv;
    v1 = v1*v1Conv;
    v2 = v2*v2Conv;
    p1 = p1/p1Conv*pat;
    p2 = p2/p2Conv*pat;
    z1 = z1*z1Conv;
    z2 = z2*z2Conv;
    
    // Toma de datos de accesorios
    let vectorCantidad = [0,0,0,0,0,0];
    let vectork = [0,0,0,0,0,0];

    // Se almacena las cantidades de accesorios en un vector
    vectorCantidad[0] = document.getElementById("cantidad-accesorios1").value;
    vectorCantidad[1] = document.getElementById("cantidad-accesorios2").value;
    vectorCantidad[2] = document.getElementById("cantidad-accesorios3").value;
    vectorCantidad[3] = document.getElementById("cantidad-accesorios4").value
    vectorCantidad[4] = document.getElementById("cantidad-accesorios5").value;
    vectorCantidad[5] = document.getElementById("cantidad-accesorios6").value;

    // Se almacena las k de accesorios en otro vector
    vectork[0] = document.getElementById("k-accesorios1").value;
    vectork[1] = document.getElementById("k-accesorios2").value;
    vectork[2] = document.getElementById("k-accesorios3").value;
    vectork[3] = document.getElementById("k-accesorios4").value;
    vectork[4] = document.getElementById("k-accesorios5").value;
    vectork[5] = document.getElementById("k-accesorios6").value;

    // Cálculo de los resultados

    // Velocidad en tubería
    let v = velocidad(q, d);

    // Número de Reynolds
    let re = reynolds(d, v, ro, mu);

    // Factor de Fanning
    let f = fanning(re, e, d);

    // Pérdida en tramos rectos
    let hftr = alturaTr(f, l, d, v);

    // Pérdida en accesorios
    let hfAcc = alturaAcc(vectorCantidad, vectork, v);

    // Altura de la bomba
    let hbomba = z2 - z1 + (v2*v2 - v1*v1)/(2*g) + (p2 - p1)/(ro*g) + hftr + hfAcc;

    // Potencia entregada al fluido
    let pot = q*ro*g*hbomba/1000;

    // Potencia total (bHP)
    let bhp = pot/(0.745*(eff/100));

    // Muestra de los resultados
    document.querySelector("#velocidad").value = v.toFixed(2)
    document.querySelector("#reynolds").value = re.toFixed();
    document.querySelector("#fanning").value = f.toFixed(5);
    document.querySelector("#hftr").value = hftr.toFixed(2);
    document.querySelector("#hfacc").value = hfAcc.toFixed(2);
    document.querySelector("#hbomba").value = hbomba.toFixed(2);
    document.querySelector("#pot").value = pot.toFixed(3);
    document.querySelector("#bhp").value = bhp.toFixed(2);




   


    
    
}
