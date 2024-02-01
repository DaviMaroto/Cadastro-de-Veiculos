const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const cMarca = document.querySelector('#m-marca')
const cModelo = document.querySelector('#m-modelo')
const cValor = document.querySelector('#m-valor')
const btnSalvar = document.querySelector('#btnSalvar')
let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    cMarca.value = itens[index].marca
    cModelo.value = itens[index].modelo
    cValor.value = itens[index].valor
    id = index
  } else {
    cMarca.value = ''
    cModelo.value = ''
    cValor.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.marca}</td>
    <td>${item.modelo}</td>
    <td>R$ ${item.valor}</td>
    <td class="action">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="action">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (cMarca.value == '' || cModelo.value == '' || cValor.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].marca = cMarca.value
    itens[id].modelo = cModelo.value
    itens[id].valor = cValor.value
  } else {
    itens.push({'marca': cMarca.value, 'modelo': cModelo.value, 'valor': cValor.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()