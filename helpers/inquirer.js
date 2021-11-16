const inquirer = require('inquirer');
require('colors');



//=================================================
        // menu de opciones
//=================================================
const menuOpt =[
    {
        type: 'list',
        name: 'opciones',
        choices: [
            {
                value: 1,
                name: `${'1'.green}  Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2'.green}  Historial`
            },        
            {
                value: 0    ,
                name:`${'0'.green}  Salir`
            },
        ]
    }
];
//=================================================
        // formato de seleccion
//=================================================
const menuInquirer = async()=>{
    // console.clear();
    console.log('========================='.green);
    console.log('  Selecione una opcion');
    console.log('=========================\n'.green);

    const {opciones} =await inquirer.prompt(menuOpt)
    return opciones;
};
//=================================================
        // menu de pausar y verificar
//=================================================
const pausa = async()=>{
    const menuPausa =[
        {
            type: 'input',
            name:'enter',
            message: `Selecione ${'ENTER'.green} para continuar`
        }
    ]

    // console.log()
    const pausa =await inquirer.prompt(menuPausa)
        return pausa;
};
//=================================================
        // leer las opciones
//=================================================

const leerInput = async( message)=>{
    const question =[
        {
            type: 'input',
            name:'desc',
            message,
            validate(value){
                if (value.length === 0) {
                    return 'Por favor ingrese valor '
                }
                return true;
            }
        }
    ];
        const { desc } = await inquirer.prompt(question);
        return desc;
};

const listarLugares = async( lugares =[])=>{
    const choices = lugares.map( (lugar, i )=>{
        const idx = `${i+1}`.green;
        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    });
    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    })
    const preguntas =[
        {
            type:'list',
            name:'id',
            message:'Mostrar lugares',
            choices

        }
    ]
    const {id} =await inquirer.prompt(preguntas)
    return id
}

const confirmar = async (message)=>{
   
    const question =[
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const {ok} =await inquirer.prompt(question)
    return ok;

}

const mostrarListadoChecks = async( tareas =[])=>{
   
    const choices = tareas.map( (tarea, i )=>{
        const idx = `${i+1}.`.green;
        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`,
            checked: (tarea.complementadoEn)? true : false
        }
    });
   
    const pregunta =[
        {
            type:'checkbox',
            name:'ids',
            message:'Selecciones',
            choices

        }
    ]
    const {ids} =await inquirer.prompt(pregunta)
    return ids
}


module.exports={
    menuInquirer,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoChecks
}