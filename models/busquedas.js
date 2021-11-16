const fs = require('fs');
const axios = require('axios');
const { retry } = require('rxjs');

class Busquedas{

    historial= [];
    dbPath= './db/database.json'
    constructor(){
        // TODO: leer base de datos existente
        this.leerDB();
    };
    get historialCapitalizado(){
        return this.historial.map(lugar =>{

            let palabras = lugar.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));
            return palabras.join(''); 
        })
    };
    get paramsMaxbox(){
        return{
            'limit': 5,
           'language' :'es', 
            'access_token':process.env.MAPBOX_KEY
        }
    };
    get paramsWather(){
        return{
            appid: process.env.OPENWEATHER_,
            units:'metric',
            lang:'es'
                
        }
    };
    
    async cuidad(sitio = ''){
        try {
            
            //Peticion http
         const instacia= axios.create({
             baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${sitio}.json`,
             params: this.paramsMaxbox
         });
         const resp = await instacia.get();
             return resp.data.features.map( sitio => ({
                 id: sitio.id,
                 nombre: sitio.place_name,
                 lng: sitio.center[0],
                 lat: sitio.center[1],
                
             }));

        } catch (error) {
            return[];
        }



        // return[];// un arreglo de la cuidades
    }
    
    async climaLugar(lat, lon){
        try {
                //Peticion http
         const instacia2= axios.create({
            baseURL: `https://api.openweathermap.org/data/2.5/weather`,
            params: {...this.paramsWather, lat, lon}
        });

        const resp = await instacia2.get();
            const {weather, main}= resp.data;


            return{
                desc: weather[0].description,
                min:main.temp_min,
                max:main.temp_max,
                temp:main.temp
            }

        } catch (error) {
            console.log(error);
        }
    }
    agregarHitorial(lugar=''){
        //duplicado
        this.historial.unshift(lugar);

        //grabar DB
        this.guardaDB()
    }

    guardaDB(){
        const payload={
          historial:  this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }
    leerDB(){
        if(!fs.existsSync(this.dbPath)) return;

        
       const info= fs.readFileSync(this.dbPath,{encoding: 'utf8'})

        const data = JSON.parse(info);
        this.historial= data.historial;
    }

}

module.exports= Busquedas;