let automotores = domHtml("automotores")
let openUser = domHtml("open-user")
let arregloServidor = []
let ids
let sameData
let posicion
let httpCart="https://localhost:3000/cart.json"
let httpCars="https://localhost:3000/automotores.json"
function domHtml(valor){
    return document.getElementById(valor)
}
class ReqResSer{
    apertura;
    lochttp;
    constructor(apertura, lochttp){
        this.apertura=apertura;
        this.lochttp=lochttp;
    }
    reqRes(body){
        /* const xhr = new XMLHttpRequest();
        xhr.open(this.apertura, this.lochttp);
        if(this.apertura=="GET"){
            xhr.send();
            xhr.responseType = "json";
        }else{
            xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        }
        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                if(this.apertura=="GET" && body==0){
                    const data = xhr.response;
                    sameData = data;
                    console.log(data);
                }else if(this.apertura=="GET" && body==1){
                    const data = xhr.response;
                    console.log(data)
                    this.getAutomotores(data)
                }else{
                    var data = JSON.parse(xhr.responseText);
                    console.log(data);
                }
            } else {
                console.log(`Error: ${xhr.status}`);
            }
        };
        if(body!=0 && body!=1){
            xhr.send(body);
        } Descomentar si se usa Servidor*/
    }
    getCargar(tipo, ubicacion, body){
        this.setAp(tipo)
        this.setHttp(ubicacion)
        this.reqRes(body)
    }
    getAutomotores(data){
        arregloServidor = data
        for (let i = 0; i < data.length; i++) {
            let cargaAuto = new Automotor
            cargaAuto.setCargarAutomotores(data[i].id,data[i].nombre, data[i].modelo, data[i].anio, data[i].precio)
        }
    }
    setAp(valor){
        this.apertura=valor
    }
    setHttp(valor){
        this.lochttp=valor
    }
    setAddCart(idCar, idCant){
        let cant = domHtml(idCant)
        let cantidad = parseInt(cant.value)
        let repetido=false
        ids=sameData.length
        if(ids!=0){
            for(let i = 0; i<ids;i++){
                if(idCar==sameData[i].id){
                    let posicion=i
                    let contador = parseInt(sameData[i].count) + cantidad
                    repetido=true
                    const body = JSON.stringify({
                        position: posicion,
                        id: idCar,
                        count: contador,
                        nombre: arregloServidor[idCar-1].nombre,
                        modelo: arregloServidor[idCar-1].modelo,
                        anio: arregloServidor[idCar-1].anio,
                        precio: arregloServidor[idCar-1].precio,
                    });
                    pilaCart.getCargar("PATCH", httpCart, body)
                }
            }
        }
        if(repetido==false){
            ids=ids+1
            let i = idCar-1;
            const body = JSON.stringify({
                id:idCar,
                count:cantidad,
                nombre:arregloServidor[i].nombre,
                modelo:arregloServidor[i].modelo,
                anio:arregloServidor[i].anio,
                precio:arregloServidor[i].precio
            });
            pilaCart.getCargar("POST", httpCart, body)
            cant.value = 1
        }
        repetido=false
    }
}
let pilaCart = new ReqResSer 
let pilaCars = new ReqResSer
class Automotor {
    nombre;
    modelo;
    age;
    price;
    constructor(id,nombre, modelo, age, price) {
        this.id=id;
        this.nombre = nombre;
        this.modelo = modelo;
        this.age = age;
        this.price = price;
    }
    setCargarAutomotores(num,name,model,time,sell) {
        this.id=num
        this.nombre=name
        this.modelo=model
        this.age=time
        this.price=sell
        let arregloCar=[]
        let arregloModelo = ["Modelo", this.modelo]
        let arregloAnio = ["Año", this.age]
        let arregloPrice = ["Precio", this.price]
        arregloCar.push(arregloModelo,arregloAnio,arregloPrice)
        this.getCarInner(arregloCar)
    }
    getCarInner(arr){
        let escHtml=""
        arr.forEach(car => {
        escHtml +=`
            <div class="form">
                  <label for="${car[1]}">${car[0]}</label>
                  <output id="${car[1]}" type="text" class="show-automotor">${car[1]}</output>
            </div>
        `
        });
        automotores.innerHTML +=`
            <fieldset class="lista-automotores">
            <legend>${this.nombre}</legend>
            ${escHtml}
            <button class="mas-menos" onClick="menos(${this.id})">-</button>
            <output id="${this.id}-cant" type="text" class="show-automotor">1</output>
            <button class="mas-menos" onClick="mas(${this.id})">+</button>
            <button class="add-cart" onClick="addCart(${this.id}, ${this.id}+'-cant')">Add to Cart</button>
            </fieldset>
        `
    }
}
function iniciar(){
    pilaCart.getCargar("GET",httpCart, 0)
    pilaCars.getCargar("GET",httpCars, 1)
    openUser.style.display="none"
}
function addCart(idCar, idCant){
    pilaCart.setAddCart(idCar,idCant)
    reload()
}
function menos(coche){
    let cantidad = domHtml(coche+"-cant")
    if(cantidad.value>1){
        cantidad.innerHTML = cantidad.value - 1
    }
}
function mas(coche){
    let cantidad = domHtml(coche+"-cant")
    let valor = parseInt(cantidad.value)
    cantidad.innerHTML = valor +1
}
function reload(){
    setInterval("location.reload()",200)
}
function user(){
    if(openUser.style.display=="none"){
        openUser.style.display="flex"
    }else{
        openUser.style.display="none"
    }
}







//Desde Aca *******************************************************
const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector(
	'.container-cart-products'
);

btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
});

const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// Lista de todos los contenedores de productos
const productsList = document.querySelector('.container-items');

// Variable de arreglos de Productos
let allProducts = [];

const valorTotal = document.querySelector('.total-pagar');

const countProducts = document.querySelector('#contador-productos');

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');


// Agregar los productos al carrito
productsList.addEventListener('click', e => {
	if (e.target.classList.contains('btn-add-cart')) {
		const product = e.target.parentElement; //seleccionamos los elementos padre
		// Objeto que contiene el titulo del producto anadido y su precio
		const infoProduct = {
			quantity: 1,
			title: product.querySelector('h2').textContent,
			price: product.querySelector('p').textContent,
		};
		// Ver si el producto ya esta en el carrito
		const exits = allProducts.some(
			product => product.title === infoProduct.title
		);

		if (exits) {
			const products = allProducts.map(product => {
				if (product.title === infoProduct.title) {
					product.quantity++;
					return product;
				} else {
					return product;
				}
			});
			allProducts = [...products];
		} else {
			allProducts = [...allProducts, infoProduct];
		}

		showHTML();
	}
});

rowProduct.addEventListener('click', e => {
	if (e.target.classList.contains('icon-close')) {
		const product = e.target.parentElement;
		const title = product.querySelector('p').textContent;

		allProducts = allProducts.filter(
			product => product.title !== title
		);

		console.log(allProducts);

		showHTML();
	}
});
// Funcion para mostrar  HTML
const showHTML = () => {
	if (!allProducts.length) {
		cartEmpty.classList.remove('hidden');
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} else {
		cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
	}

	// Limpiar HTML
	rowProduct.innerHTML = '';

	let total = 0;
	let totalOfProducts = 0;

	allProducts.forEach(product => {
		const containerProduct = document.createElement('div');
		containerProduct.classList.add('cart-product');

		containerProduct.innerHTML = `
						<div class="info-cart-product">
								<span class="cantidad-producto-carrito">${product.quantity}</span>
								<p class="titulo-producto-carrito">${product.title}</p>
								<span class="precio-producto-carrito">${product.price}</span>
						</div>

				`;

		rowProduct.append(containerProduct);

		total =
			total + parseInt(product.quantity * product.price.slice(1));
		totalOfProducts = totalOfProducts + product.quantity;
	});

	valorTotal.innerText = `$${total}`;
	countProducts.innerText = totalOfProducts;
};
//Hasta aca borrar si se usa Servidor *******************************************************
window.addEventListener("load", iniciar)

