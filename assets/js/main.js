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

const cart = []

/*
----------------------------------------
utils
----------------------------------------
*/


// carrito utils

const addtoCart = (productID) => {
    const foundProduct = products.find(product => product.id === productID)

    if(foundProduct.stock === 0) { //Guard Condition
        alert('Producto agotado')
        return;
    }

    const productInCart = cart.find(product => product.productID === productID)

    if(!productInCart) {
        if(foundProduct.stock > 0) cart.push({productID, quantity: 1})
    } else {                                        // productInCart.quantity = productInCart.quantity + 1
        if(productInCart.quantity < foundProduct.stock) productInCart.quantity += 1 //return implicito por erstar en una linea -> ventaja de ES6
        if(productInCart.quantity === foundProduct.stock) alert('Product Agotado')
    }

    console.log(cart)
}


/*
---------------------------
Referencias del DOM
--------------------------- 
*/

const productsTbody = document.querySelector('#productsTBody')
const cartList = document.querySelector('#cartList')


/* 
--------------------------------
Componentes
--------------------------------
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


const createCartHTML = () => {
    const cartLi = cart.map(item => {
        const productCart = products.find(product => product.id === item.productID)

        //TODO calcular precio total

        const htmlStringCart = `
            <li class="list-group-item">
                <div class="d-flex justify-content-between align-items-start">
                    <div class="me-2">
                        <div class="fw-semibold">${productCart.name}</div>
                        <div class="text-muted small">${productCart.category} - ${productCart.price}</div>
                        <div class="text-muted small">${productCart.price * item.quantity}</div>
                    </div>
                    
                    <div class="d-flex flex-column align-items-end gap-1">
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-outline-secondary" data-action="descQuantity" data-id="${productCart.id}">-</button>
                            <button class="btn btn-outline-secondary" disabled>${item.quantity}</button>
                            <button class="btn btn-outline-secondary" data-action="incQuantity" data-id="${productCart.id}">+</button>
                        </div>
                        <button class="btn btn-sm btn-outline-danger" data-action="removeCartItem" data-id="${productCart.id}">Quitar</button>
                    </div>
                </div>
            </li>
        `;

        return htmlStringCart
    })

    return cartLi.join('')
}

/*
------------------------------
Render in DOM
------------------------------
*/

const renderHTMLstring = (htmlString, container) => {
    container.innerHTML = htmlString
}

const cardProducts = createCardProducts()


renderHTMLstring(cardProducts, productsTbody)



/*
-----------------------------------------------
listeners
-----------------------------------------------
*/

productsTbody.addEventListener('click', (event) => {
    const button = event.target.closest("button[data-action]")

    const action = button.dataset.action
    const id = button.dataset.id
    

    if(action === 'addToCart') {
        addtoCart(id)
        renderHTMLstring(createCartHTML(), cartList)
        return;
    }
})