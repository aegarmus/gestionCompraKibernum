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

// Calcular subtotal, IVA, total

const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0
    }).format(price)
}


const calculateSubTotal = () => {
    return cart.reduce((accum, item) => {
        const productFound = products.find(product => product.id === item.productID)
        return accum + (productFound.price * item.quantity )
    }, 0)
}

const calculateIVA = (subtotal) => {
    return subtotal * IVA
}

const calculateTotal = (subtotal, ivaSubtotal) => subtotal + ivaSubtotal


const updateCartTotals = () => {
    const subTotal = calculateSubTotal()
    const ivaSubTotal = calculateIVA(subTotal);
    const total = calculateTotal(subTotal, ivaSubTotal)

    document.querySelector("#subtotalOut").textContent = formatPrice(subTotal);
    document.querySelector("#ivaOut").textContent =   formatPrice(ivaSubTotal);
    document.querySelector('#totalOut').textContent = formatPrice(total)
}


// CRUD Form 

const createProduct = (name, category, price, stock) => {
    const product = {
        id: crypto.randomUUID(),
        name,
        category, 
        price: parseInt(price), 
        stock: parseInt(stock)
    }

    products.push(product)
}

let editProductID = null

const updateProduct = (id, name, category, price, stock) => {
    const productIndex = products.findIndex(product => product.id === id) // El número de la posición del objeto dentro del arreglo // Si no lo pilla devuelve -1

    if(productIndex !== -1) {
        products[productIndex] = {
            id,
            name,
            category,
            price,
            stock
        }
    }
}

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
}

const descQuantity = (productID) => {
    const product = cart.find(item => item.productID === productID)

    product.quantity -= 1
    if(product.quantity <= 0) {
        const indexProduct = cart.findIndex(item => item.productID === productID)
        cart.splice(indexProduct, 1)
    }
    
}

const incQuantity = (productID) => {
    const product = products.find((item) => item.id === productID);
    const cartProduct = cart.find(item => item.productID === productID)

    if(cartProduct.quantity < product.stock) {
        cartProduct.quantity += 1
    } else {
        alert("No hay más existencias disponibles");
    }
}

const deleteProduct = (id) => {
    const cartIndex = cart.findIndex(item => item.productID === id)
    if (cartIndex !== -1) {
        cart.splice(cartIndex, 1)
    }
}

/*
---------------------------
Referencias del DOM
--------------------------- 
*/

const productsTbody = document.querySelector('#productsTBody')
const cartList = document.querySelector('#cartList')

const formTitle = document.querySelector('#formTitle')
const productForm = document.querySelector("#productForm");
const nameInput = document.querySelector('#nameInput')
const categoryInput = document.querySelector('#categoryInput')
const priceInput = document.querySelector('#priceInput')
const stockInput = document.querySelector('#stockInput');
const btnSubmit = document.querySelector("#submitBtn");
const cancelEditBtn = document.querySelector('#cancelEditBtn')




/* 
--------------------------------
Componentes
--------------------------------
*/
const createTableProducts = () => { 
    const cardsArray = products.map(
      (product) => `    
        <tr>
            <td>
                <p class="fw-semibold">${product.name}</p>
                <p class="text-muted small">ID: ${product.id.slice(0, 8)}</p>
            </td>
            <td>${product.category}</td>
            <td class="text-end">${formatPrice(product.price)}</td>
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
                        <div class="text-muted small">${productCart.category} - ${formatPrice(productCart.price)}</div>
                        <div class="text-muted small">${formatPrice(productCart.price * item.quantity)}</div>
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


const renderProducts = () => {
    const tableProducts = createTableProducts()
    renderHTMLstring(tableProducts, productsTbody)
}

renderProducts()


const loadProductForm = (productID) => {
    const product = products.find(product => product.id === productID)

    if(product) {
        nameInput.value = product.name
        categoryInput.value = product.category
        priceInput.value = product.price
        stockInput.value = product.stock
        editProductID = productID
        formTitle.textContent = `Editando: ${product.name}`
        btnSubmit.textContent = 'Actualizar Producto'
        cancelEditBtn.disabled = false
    }
}

const clearForm = () => {
    productForm.reset()
    editProductID = null
    formTitle.textContent = 'Crear Producto'
    btnSubmit.textContent = 'Guardar'
    cancelEditBtn.disabled = true
}

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
        updateCartTotals();
        return;
    }

    if(action === 'edit') {
        loadProductForm(id)
    }
})

cartList.addEventListener('click', (event) => {
    const button = event.target.closest("button[data-action]")

    const action = button.dataset.action;
    const id = button.dataset.id;

    if(action === 'descQuantity') {
        descQuantity(id)
        renderHTMLstring(createCartHTML(), cartList);
        updateCartTotals()
        return;
    }

    if(action === 'incQuantity') {
        incQuantity(id)
        renderHTMLstring(createCartHTML(), cartList)
        updateCartTotals()
        return
    }

    if(action === "removeCartItem") {
        deleteProduct(id)
        renderHTMLstring(createCartHTML(), cartList)
        updateCartTotals()
        return
    }
})

productForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const name = nameInput.value.trim()
    const category = categoryInput.value.trim()
    const price = priceInput.value
    const stock = stockInput.value

    if (!name || !category || !price || !stock) {
        alert('Por favor, completa el formulario con todos sus campos')
        return;
    }

    if(editProductID) {
        updateProduct(editProductID, name, category, price, stock)
        alert(`${name} editado con éxito`)
    } else {
        createProduct(name, category, price, stock)
        alert('Producto Creado con éxito')

    }

    renderProducts()
    clearForm()

})

cancelEditBtn.addEventListener('click', () => {
    const confirmCancel = confirm('Seguro que quieres cancelar la edición?')

    if(confirmCancel) {
        clearForm()
    }
})