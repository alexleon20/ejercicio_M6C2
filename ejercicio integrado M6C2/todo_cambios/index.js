//importar las dependencias 
//instalar axios -> npm install --save axios
//axios solicitar la llamada
const fs = require('fs').promises
const child_process = require('child_process')
const axios = require('axios')

//console.log('Listos de partir')
/**
 * 1.validar las entredas de process.argv
 * 2. realizar consulta a la API
 * 3. crear archivo
 * 4. ejecutar con child_process
 */

async function init(){
    if (process.argv.length < 6 ) {
        console.log('faltan argumentos para ejecutar ');
        return
    }
    const nombre_archivo = process.argv[2]
    const extension = process.argv[3]
    const divisa = process.argv[4]
    const pesos = process.argv[5]

    if (
        divisa != 'dolar' && 
        divisa != 'utm' && 
        divisa != 'uf' &&
        divisa != 'bitcoin' &&
        divisa != 'euro' 
        ){
            console.log('divisa no valida')
            return;  
        }

        if (isNaN(pesos)) {
            console.log('cantidad no valida')
            return;
        }

        pesos = parseInt(pesos)
        if (pesos < 1000) {
        console.log('Cantidad insuficiente')
        return
        }

        const data = axios.get('https://mindicador.cl/api/')
        console.log(data);

        const fechaActual= Date.now();
        const horaConsulta= new Date(fechaActual);

        let resultado = (pesos / data[divisa].valor).toFixed(2);

        calcular_divisa = `A la fecha: ${horaConsulta}
            Fue realizada cotización con los siguientes datos:
            Cantidad de pesos a convertir: ${pesos} pesos
            Convertido a "${divisa}" da un total de:
            $ ${resultado} ${divisa}.-`;

            await fs.writeFile("cambios.txt", calculo_divisa, "utf-8");
            res.send("cambios.txt");
}

            child_process.exec("node index.js", function (err, result1) {
            console.log(result1);
            });
           
init()

child_process.exec("node index.txt", async function (err, result) {
    console.log(await fs.readFile("cambios.txt", "utf-8"));
  });