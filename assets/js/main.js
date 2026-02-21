console.log('Estamos conectados')

/* 

Crear un sistema que simule la compra venta, creación, edición y eliminación de productos,
tanto en la gestión de administración como simulación de cliente empleando un falso CRUD
Se requiere incoprporar calculo total, de gastos e incluir el IVA

C -> Create
R -> Read
U -> Update
D -> Delete

*/


/*
----------------------------------
config
----------------------------------
*/

const IVA = 0.19

/*
-----------------------------------
Datos semilla hardcodeados
-----------------------------------
*/

const products = [
    {
        id: crypto.randomUUID(),
        name: "Audifonos Studio X",
        category: "Audio",
        precio: 129990,
        stock: 12,
    },
    {
        id: crypto.randomUUID(),
        name: "Parlante Bluetooth Mini",
        category: "Audio",
        precio: 24990,
        stock: 7,
    },
    {
        id: crypto.randomUUID(),
        name: "Controlador DJ Entry",
        category: "DJ",
        precio: 169990,
        stock: 5,
    },
    {
        id: crypto.randomUUID(),
        name: "Micrófono Dinámico Pro",
        category: "Accesorio",
        precio: 45990,
        stock: 9,
    },
    {
        id: crypto.randomUUID(),
        name: "Cable TRS 5m",
        category: "Accesorio",
        precio: 7990,
        stock: 30,
    },

];


/*
---------------------------
Referencias del DOM
--------------------------- 
*/
