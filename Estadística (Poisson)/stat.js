// ======Definición de funciones de uso general=====

  // Función potencia 'x' elevado a la 'y'
  function pot(x,y) {
    return Math.pow(x,y)
  }
  
  // Función factorial de un número n
  function fac(n) {
     if (n == 0) {
       return 1;
     } else {
     return n*fac(n-1)
     }
   }

   // Función combinatoria
   function comb(n, k) {
     return fac(n)/(fac(k)*fac(n-k));
   }

   // Función exponencial
   function exp(x) {
     return Math.exp(x);
   }

   
   //=================Distribución Normal=================

    // Función que calcula el enésimo término de la serie de Taylor de 
    // la función acumulada de probabilidad
  function nTerm(x, n) {
     return pot(-1,n)*pot(x,2*n+1)/((2*n+1)*pot(2,n)*fac(n))
   }
  
   // Función que calcula la p acumulada sumando los términos de la serie de Taylor
  function p(z, mu = 0, sigma = 1) {
     z = (z - mu)/sigma;
     let pac = 0;
     for (let i = 0; i < 50; i++) {
       pac += nTerm(z,i);
     }
     return (pac/Math.sqrt(2*Math.PI) + 0.5).toFixed(5)
   }
  
  // Función que, dado un valor de p, devuelve el valor de z
  
  function zValue(prob) {
     let z = -5;
     
      if (prob == 0) {return "z es menos infinito"}
      else {
        if (prob == 1) {return "z es más infinito"}
        else {
          while (p(z) < prob) {
            z += 0.01;
          }
         return z.toFixed(2)}
      }
     
  }

//========================= Distribución binomial =================================

  //Esta función calcula la probabilidad  P(x = X)
  function bin (k, n, p) {
    return comb(n,k)*pot(p,k)*pot(1-p, n-k);
  }

  //Esta función calcula la probabilidad acumulada P(x < X)
  function binAcc(k, n, p) {
    let ac = 0;
    for (let i = 0; i < k; i++) {
      ac += bin(i,n,p);
    }
    return ac;
  }

//===========================Distribución exponencial==================================

  // Esta función calcula la probabilidad acumulada P(x < X) para un parámetro lambda
  function expo(x, lam) {
    return 1 - exp(-lam*x);
  }

//===========================Distribución Poisson=====================================
  
  //Esta función calcula la probabilidad de un número específico de eventos P(k = K)
  //utilizando como parámetros la tasa de ocurrencia r y el intervalo de tiempo t
  function poisson(k, r, t) {
    return pot(r*t, k)*exp(-r*t)/fac(k);
  }

  //Esta función calcula la probabilidad acumulada de Poisson P(k <= K)
  function poissAcc(k, r, t) {
    let ac = 0;
    for (let i = 0; i < k+1; i++) {
      ac += poisson(i,r,t);
    }
    return ac;

  }

//==========================Distribución Hipergeométrica================================
  
  //Esta función calcula la probabilidad de k éxitos en una extracción de tamaño n de una población
  //de tamaño nt donde hay kt éxitos
  function hypergeom(k, n, nt, kt) {
    return comb(kt, k)*comb(nt - kt, n - k)/comb(nt, n);
  }

  document.querySelector('#result-form').addEventListener('submit', (e) => {
    
    e.preventDefault();
    document.querySelector('#puntual').value = "";
    document.querySelector('#p-menor').value = "";
    document.querySelector('#p-mayor').value = "";


    const nPob = document.querySelector('#n').value;
    const prob = document.querySelector('#p').value;
    const exitos = document.querySelector('#x').value;
    let resultPuntual = bin(exitos, nPob, prob).toFixed(5);
    let resultAcum = binAcc(exitos, nPob, prob).toFixed(5);
    document.querySelector('#puntual').value = resultPuntual;
    document.querySelector('#p-menor').value = resultAcum;
    document.querySelector('#p-mayor').value = (1-resultPuntual-resultAcum).toFixed(5);

  })
