const autoMotoresCart = document.getElementById("list-cart")
const total = document.getElementById("total")
const httpCart = "https://localhost:3000/cart.json"
precio=0;
class Express{//Borrar si se Usa Servidor
    data;//Borrar si se Usa Servidor
    constructor(){//Borrar si se Usa Servidor
        this.data=[];//Borrar si se Usa Servidor
    }//Borrar si se Usa Servidor
    setData(){//Borrar si se Usa Servidor
        let toyo = new Automotor(1,1,"Toyota","Corolla","2020","13000")//Borrar si se Usa Servidor
        let fiat = new Automotor(2,1,"Fiat","Uno","2016","5000")//Borrar si se Usa Servidor
        let bmw = new Automotor(3,1,"Bmw","M4","2018","20000")//Borrar si se Usa Servidor
        let jeep = new Automotor(4,1,"Jeep","Compas","2016","13000")//Borrar si se Usa Servidor
        let peugeot = new Automotor(5,1,"Peugeot","208","2019","7000")//Borrar si se Usa Servidor
        this.data.push(toyo,fiat,bmw,jeep,peugeot)//Borrar si se Usa Servidor
    }//Borrar si se Usa Servidor
}//Borrar si se Usa Servidor
let pilaExpress = new Express()
class ReqResSer{
    apertura;
    lochttp;
    data;
    dataUp;
    constructor(apertura, lochttp, data){
        this.apertura=apertura;
        this.lochttp=lochttp;
        this.data=data;
        this.dataUp=[];
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
                    this.data = xhr.response;
                    this.cargarAutomotores(this.data)
                    this.cargarPrecio()
                }else{
                    var date = JSON.parse(xhr.responseText);
                    console.log(date);
                }
            } else {
                console.log(`Error: ${xhr.status}`);
            }
        };
        if(body!=0 && body!=1){
            xhr.send(body);
        } Descomentar para usar Servidor*/
        if(this.apertura == "GET" && body == 0){//Borrar si se Usa Servidor
            pilaExpress.setData()//Borrar si se Usa Servidor
            this.data = pilaExpress.data;//Borrar si se Usa Servidor
            this.cargarAutomotores(this.data)//Borrar si se Usa Servidor
            this.cargarPrecio()//Borrar si se Usa Servidor
        }else if(this.apertura=="DELETE"){//Borrar si se Usa Servidor
            let match//Borrar si se Usa Servidor
            this.dataUp=[]//Borrar si se Usa Servidor
            for (let index = 0; index < this.data.length; index++) {//Borrar si se Usa Servidor
                if(this.data[index].id == body.at(19)){//Borrar si se Usa Servidor
                    match=true//Borrar si se Usa Servidor
                    let cantidad = document.getElementById(this.data[index].modelo+"-cant");//Borrar si se Usa Servidor
                    for (let i = 0; i < cantidad.value; i++) {//Borrar si se Usa Servidor
                        precio = precio - this.data[index].precio//Borrar si se Usa Servidor
                    }//Borrar si se Usa Servidor
                    total.innerHTML=precio//Borrar si se Usa Servidor
                }else if(match==true){//Borrar si se Usa Servidor
                    this.dataUp.push(this.data[index])//Borrar si se Usa Servidor
                }else{//Borrar si se Usa Servidor
                    this.dataUp.push(this.data[index])//Borrar si se Usa Servidor
                }//Borrar si se Usa Servidor
            }//Borrar si se Usa Servidor
            this.data = this.dataUp;//Borrar si se Usa Servidor
            console.log(this.dataUp)//Borrar si se Usa Servidor
            this.limpiarAutomotores()//Borrar si se Usa Servidor
            this.cargarAutomotores(this.dataUp)//Borrar si se Usa Servidor
        }
    }
    getCargar(precio, ubicacion, body){
        this.getAp(precio)
        this.getHttp(ubicacion)
        this.reqRes(body)
    }
    getAp(valor){
        this.apertura=valor
    }
    getHttp(valor){
        this.lochttp=valor
    }
    setBodyPatch(pos, num, cant, money){
        const body = JSON.stringify({
            position: pos,
            id: num,
            count: cant.value,
            nombre: this.data[pos].nombre,
            modelo: this.data[pos].modelo,
            anio: this.data[pos].anio,
            precio: money
        });
        return body;
    }
    bodyDelt(estado, num){
        const body = JSON.stringify({
            count: estado,
            id:num
        });
        return body;
    }
    cargarAutomotores(array){
        for (let i = 0; i < array.length; i++) {
            let cargaAuto = new Automotor(array[i].id,array[i].count,array[i].nombre, array[i].modelo, array[i].anio, array[i].precio);
            cargaAuto.getCar()
        }
    }
    limpiarAutomotores(){//Borrar si se Usa Servidor
        autoMotoresCart.innerHTML=""//Borrar si se Usa Servidor
    }//Borrar si se Usa Servidor
    cargarPrecio(){
        for (let index = 0; index < this.data.length; index++) {
            let contador=0
            while(contador < this.data[index].count){
                let valor = parseInt(this.data[index].precio)
                precio = precio + valor
                contador++
            }
        }
        total.innerHTML=precio
    }
    carAffected(car, pos, price){
        let i
        for(let index = 0;index < this.data.length; index++){
            if(this.data[index].modelo == car && this.data[index].id == pos && this.data[index].precio == price){
                i=index;
                return i;
            }
        }
    }
    changeCantyPrice(valor, coche, i){
        let cantidad = document.getElementById(coche+"-cant");
        let enteroCant = parseInt(cantidad.value);
        let enteroPrice = parseInt(this.data[i].precio);
        let cant;
        let price;
        if(valor == "menos"){
            if(cantidad.value!=1){
                cant = enteroCant-1;
                price = precio - enteroPrice;
            }else{
                cant = 1;
                price = precio;
            }
        }else{
            cant = enteroCant+1;
            price = precio + enteroPrice;
        }
        precio=price;
        total.innerHTML = precio;
        cantidad.innerHTML = cant;
        return cantidad;
    }
    pasosMasMenos(coche,num,money,valor){
        let i = this.carAffected(coche,num,money)
        let cantidad = this.changeCantyPrice(valor, coche, i)
        let body = this.setBodyPatch(i, num, cantidad, money)
        this.getCargar("PATCH", httpCart,body)/* 
        intervalo() Descomentar si se usa Servidor */
    }
}
let pilaCart = new ReqResSer();
class Automotor {
    id;
    count;
    nombre;
    modelo;
    anio;
    precio;
    cantDes;
    retHtml;
    cantDes;
    nameDes;
    constructor(id,count,nombre, modelo, anio, precio) {
        this.id=id;
        this.count=count;
        this.nombre = nombre;
        this.modelo = modelo;
        this.anio = anio;
        this.precio = precio;
        this.retHtml="";
        this.cantDes=[];
        this.nameDes=[];
    }
    getCar(){
        this.cantDes.push(this.modelo,this.anio,this.precio);
        this.nameDes.push("Modelo", "Año", "Precio");
        let i=-1
        this.cantDes.forEach(desc => {
            i=i+1
            this.retHtml +=`
            <div class="form">
              <label for="${desc}">${this.nameDes[i]}</label>
              <output id="${desc}" type="text" class="show-automotor">${desc}</output>
            </div>`
        });
        autoMotoresCart.innerHTML += `
        <fieldset class="lista-automotores">
            <legend>${this.nombre}</legend>
            ${this.retHtml}
            <div class="form">
                 <label for="${this.nombre}-cant">Unidades</label>
                <button class="mas-menos" onClick="menos('${this.modelo}', ${this.id},  ${this.precio})">-</button>
                <output id="${this.modelo}-cant" type="text" class="show-automotor">${this.count}</output>
                <button class="mas-menos" onClick="mas('${this.modelo}', ${this.id}, ${this.precio})">+</button>
                <button class="mas-menos" onClick="eliminar(${this.id})" id="borrar">Delete</button>
            </div>
        </fieldset>
        `
    }
}
function iniciar(){
    pilaCart.getCargar("GET", httpCart, 0)
}
function menos(coche, num, money){
    pilaCart.pasosMasMenos(coche,num,money,"menos")
}
function mas(coche, num,money){
    pilaCart.pasosMasMenos(coche,num,money,"mas")
}
function eliminar(num){
    let body = pilaCart.bodyDelt(true,num)
    pilaCart.getCargar("DELETE", httpCart, body) /* 
    intervalo() Descomentar si se usa Servidor*/
}/* 
function intervalo(){
    setInterval("location.reload()", 100)
} Descomentar si se usa Servidor*/
window.addEventListener("load", iniciar)