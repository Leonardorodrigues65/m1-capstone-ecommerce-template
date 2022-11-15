let itensNoCarrinho = 0; 
let totalCarrinho = 0; 

function separaItens(list) {
  let acessorios = [];
  let calcados = [];
  let camisetas = [];

  for (let i = 0; i < list.length; i++) {
    if (list[i].tag == "Acessórios") {
      acessorios.push(list[i]);
    }
  }
  for (let i = 0; i < list.length; i++) {
    if (list[i].tag == "Camisetas") {
      camisetas.push(list[i]);
    }
  }
  for (let i = 0; i < list.length; i++) {
    if (list[i].tag == "Calçados") {
      calcados.push(list[i]);
    }
  }
  renderizaCards(acessorios, camisetas, calcados); 
  navegacao(acessorios, camisetas, calcados);
}
separaItens(data);

function renderizaCards(acessorios, camisetas, calcados) { 

  let sectionAcessories = document.querySelector(".listaVitrine");
  sectionAcessories.innerHTML = "";

  let sectionCamisetas = document.querySelector(".listaVitrine");
  sectionCamisetas.innerHTML = "";

  let sectionCalcados = document.querySelector(".listaVitrine");
  sectionCalcados.innerHTML = "";

  
  for (let i = 0; i < acessorios.length; i++) {

    let li = criaCard(acessorios[i]);

    sectionAcessories.appendChild(li);
  }
  for (let i = 0; i < camisetas.length; i++) {

    let li = criaCard(camisetas[i]);

    sectionCamisetas.appendChild(li);
  }
  for (let i = 0; i < calcados.length; i++) {
    
    let li = criaCard(calcados[i]);

    sectionCalcados.appendChild(li);
  }
}

function criaCard(listaProdutos) { 

  const li = document.createElement("li");

  const img = document.createElement("img");

  const pCategoria = document.createElement("p");

  const pNome = document.createElement("p");

  const pSobre = document.createElement("p");

  const pValor = document.createElement("p");

  const a = document.createElement("a");

  img.src = listaProdutos.img;

  img.alt = listaProdutos.nameItem;

  pCategoria.innerText = listaProdutos.tag;
  pNome.innerText = listaProdutos.nameItem;
  pSobre.innerText = listaProdutos.description;
  pValor.innerText = `R$${listaProdutos.value},00`;
  a.innerText = listaProdutos.addCart;
  a.id = listaProdutos.id;

  li.classList.add("liVitrine");
  img.classList.add("imagem");
  pCategoria.classList.add("tag");
  pNome.classList.add("name");
  pSobre.classList.add("description");
  pValor.classList.add("value");
  a.classList.add("botao");

  a.addEventListener("click", function (event) { 
    let elemento = event.target;
    let idElemento = elemento.id; 
    let idBotao = parseInt(idElemento); 

    somarCarrinho(idBotao);
    let product = procuraItem(idBotao); 

    if (product) {
      
      adicionaCarrinho(product);
    }
  });

  li.append(img, pCategoria, pNome, pSobre, pValor, a);

  return li;
}

function procuraItem(idBotao) { 

  for (let j = 0; j < data.length; j++) {

    let produto = data[j];

    if (produto.id === idBotao) { 
      return produto; 
    }
  }
}

function adicionaCarrinho(product) { 

  itensNoCarrinho++; 
  templateCarrinho(); 
  document.querySelector(".itensNoCarrinho").innerHTML = `${itensNoCarrinho}`;

  
  let listaCarrinho = document.querySelector(".listaCarrinho"); 
  const newLi = document.createElement("li");
  const img = document.createElement("img");
  const div = document.createElement("div");
  const pNome = document.createElement("p");
  const pValor = document.createElement("p");
  const a = document.createElement("a");

  a.addEventListener("click", function (event) { 
    console.log(event); 
    let li = event.path[3]; 
    li.remove();
    decrementarCarrinho(li.idBotao); 

    itensNoCarrinho--; r
    templateCarrinho(); 
    document.querySelector(".itensNoCarrinho").innerHTML = `${itensNoCarrinho}`; 
  });

  newLi.id = product.id;
  img.src = product.img;
  pNome.innerHTML = `<strong>${product.nameItem}</strong>`;
  pValor.innerText = `R$${product.value},00`;

  a.innerHTML = `<em>remover produto</em>`; 

  newLi.classList.add("carrinhoCompras");
  img.classList.add("imgCarrinho");
  pNome.classList.add("itemNomeCarrinho");
  pValor.classList.add("itemValorCarrinho");
  a.classList.add("btnRemover");

  newLi.append(img, div);
  div.append(pNome, pValor, a);

  listaCarrinho.appendChild(newLi); 
}

function somarCarrinho(idBotao) { 

  for (let i = 0; i < data.length; i++) {

    if (data[i].id == idBotao) { 
      totalCarrinho += data[i].value;
    }
  }
  document.querySelector(
    ".totalComprasCarrinho"
  ).innerHTML = `R$${totalCarrinho}`;
}

function decrementarCarrinho(idBotao) { 

  for (let i = 0; i < data.length; i++) {

    if (data[i].id == idBotao) { 
      totalCarrinho -= data[i].value;
    }
  }

  document.querySelector( ".totalComprasCarrinho").innerHTML = `R$ ${totalCarrinho}`;

}

function templateCarrinho() {

  let liVazia = document.querySelector(".carrinhoVazio");

  let contador = document.querySelector(".contador");

  let contaValor = document.querySelector(".contaValor");
  liVazia.innerHTML = ""; 

  

  if (itensNoCarrinho <= 0) {
  
    contador.classList.add("hidden"); 
    contaValor.classList.add("hidden"); 
    const h2 = document.createElement("h2");
    const p = document.createElement("p");

    liVazia.classList.add("liVazia")

    h2.innerText = "Carrinho vazio";
    p.innerText = "Adicione itens";

    liVazia.append(h2, p);

  } else {
    
    liVazia.classList.remove("liVazia")
    contador.classList.remove("hidden"); 
    contaValor.classList.remove("hidden");

  } 

}


function navegacao(acessorios, camisetas, calcados) {
  
  let navega = document.querySelectorAll(".navegacao");

  for (let i = 0; i < navega.length; i++) {

    let nav = navega[i];
    nav.addEventListener("click", function (event) {
    event.preventDefault();

    if (event.target == navega[1]) {
      renderizaCards(acessorios, [], []);
    }
    if (event.target == navega[2]) {
      renderizaCards([], calcados, []);
    }
    if (event.target == navega[3]) {
      renderizaCards([], [], camisetas);
    }
    if (event.target == navega[0]) {
      renderizaCards(acessorios, calcados, camisetas);
    }

    });
  }
}

const button = document.querySelector(".btnPesquisar");
const input = document.querySelector(".inputPesquisa");


function pesquisarNome() { 

  if(input.value == ""){

    

  }else {
  let listPesquisa = [];

  for (let i = 0; i < data.length; i++) { 

    let nomeProduto = data[i];
    let produto = nomeProduto.nameItem.toLowerCase();
    let nomePesquisado = input.value.toLowerCase()

    if (produto.includes(nomePesquisado)) {  
      listPesquisa.push(nomeProduto);
    }
  }
  renderizaCards(listPesquisa); 
}

}
button.addEventListener("click", pesquisarNome);

















