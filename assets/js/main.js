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
        price: 129990,
        stock: 12,
    },
    {
        id: crypto.randomUUID(),
        name: "Parlante Bluetooth Mini",
        category: "Audio",
        price: 24990,
        stock: 7,
    },
    {
        id: crypto.randomUUID(),
        name: "Controlador DJ Entry",
        category: "DJ",
        price: 169990,
        stock: 5,
    },
    {
        id: crypto.randomUUID(),
        name: "Micrófono Dinámico Pro",
        category: "Accesorio",
        price: 45990,
        stock: 9,
    },
    {
        id: crypto.randomUUID(),
        name: "Cable TRS 5m",
        category: "Accesorio",
        price: 7990,
        stock: 30,
    },  
];


/*
---------------------------
Referencias del DOM
--------------------------- 
*/

const productsTbody = document.querySelector('#productsTBody')

/*
------------------------------
Render in DOM
------------------------------
*/

const createCardProducts = () => { 
    const cardsArray = products.map(
      (product) => `    
        <tr>
            <td>
                <p class="fw-semibold">${product.name}</p>
                <p class="text-muted small">ID: ${product.id.slice(0, 8)}</p>
            </td>
            <td>${product.category}</td>
            <td class="text-end">${product.price}</td>
            <td class="text-end">${product.stock}</td>
            <td class="text-end">
                <div class="btn-group btn-group-sm" role="group">
                    <button class="btn btn-outline-success" data-action="addToCart" data-id="${product.id}">+ Carrito</button>
                    <button class="btn btn-outline-primary" data-action="edit" data-id="${product.id}">Editar</button>
                    <button class="btn btn-outline-danger" data-action="delete" data-id="${product.id}">Eliminar</button>
                </div>
            </td>
        </tr>
        `,
    );

    return(cardsArray.join(''))
}

const renderHTMLstring = (htmlString, container) => {
    container.innerHTML = htmlString
}

const cardProducts = createCardProducts()

console.log(cardProducts)

renderHTMLstring(cardProducts, productsTbody)
