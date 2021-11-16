require('dotenv').config()

const { leerInput, menuInquirer, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");



const main =async ()=>{

    const busquedas = new Busquedas();
  
    let opt;

    do {
       opt = await menuInquirer();
       
       switch (opt) {
        
            case 1:
                    //Mostar mensaje
                    const sitio = await leerInput('Ciudad: ');
                    //Buscar los lugares
                    const lugares= await busquedas.cuidad(sitio);
                    //selescionar el lugar
                    const id = await listarLugares(lugares)
                    if(id === '0') continue
                //    console.log({id})
                   const lugaresSelect = lugares.find(l => l.id === id );
                    busquedas.agregarHitorial(lugaresSelect.nombre)

                    //clima
                    const clima = await busquedas.climaLugar(lugaresSelect.lat, lugaresSelect.lng);
                    // console.log(clima)

                    //mostrar resultados
                    console.clear();
                    console.log('\nInformacionde la ciudad\n'.green);
                    console.log(`Cuidad:,${lugaresSelect.nombre.yellow}`);
                    console.log('Lat:',  lugaresSelect.lat);
                    console.log('Log:',lugaresSelect.lng);
                    console.log('Temperatura:', clima.temp );
                    console.log('Minima:', clima.min );
                    console.log('Maxima:',  clima.max);
                    console.log('descipcion:',  clima.desc.yellow);
               break;
                case 2:
                    busquedas.historialCapitalizado.forEach((lugar, i) =>{
                        const idx=` ${i+1}.`.green
                        console.log(`${idx} ${lugar}`);
                    })
                break;
          
       }

       if(opt !== 0)await pausa();

    } while (opt !== 0);
}


main();