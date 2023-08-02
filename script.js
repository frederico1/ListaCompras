document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('item-form')
  const itemList = document.getElementById('itens')
  const totalElement = document.getElementById('total')
  let total = 0

  // Função para atualizar a lista na página e no localStorage
  function updateList() {
    itemList.innerHTML = ''
    const items = JSON.parse(localStorage.getItem('compras')) || []
    total = 0

    items.forEach((item, index) => {
      const { descricao, preco, quantidade } = item
      const subtotal = preco * quantidade
      total += subtotal

      const listItem = document.createElement('li')
      listItem.innerHTML = `${descricao} - R$ ${preco.toFixed(
        2
      )} x ${quantidade} = R$ ${subtotal.toFixed(2)}`
      listItem.setAttribute('data-index', index) // Adiciona um atributo para identificar o item
      itemList.appendChild(listItem)
      listItem.addEventListener('click', removeItem)
    })

    totalElement.textContent = `Total: R$ ${total.toFixed(2)}`
  }

  // Função para remover um item da lista
  function removeItem(event) {
    const index = event.currentTarget.getAttribute('data-index')
    const items = JSON.parse(localStorage.getItem('compras')) || []

    if (index !== null && items.length > index) {
      const removedItem = items.splice(index, 1)
      total -= removedItem[0].preco * removedItem[0].quantidade
      localStorage.setItem('compras', JSON.stringify(items))
      updateList()
    }
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault()

    const descricao = document.getElementById('descricao').value
    const preco = parseFloat(document.getElementById('preco').value)
    const quantidade = parseFloat(document.getElementById('quantidade').value)

    if (descricao && preco && quantidade) {
      const item = { descricao, preco, quantidade }
      const items = JSON.parse(localStorage.getItem('compras')) || []
      items.push(item)
      localStorage.setItem('compras', JSON.stringify(items))

      updateList()

      // Limpar os campos do formulário
      document.getElementById('descricao').value = ''
      document.getElementById('preco').value = ''
      document.getElementById('quantidade').value = ''
    }
  })

  document.getElementById('quantidade').addEventListener('input', function () {
    const preco = parseFloat(document.getElementById('preco').value)
    const quantidade = parseFloat(document.getElementById('quantidade').value)

    if (preco && quantidade) {
      const subtotal = preco * quantidade
      document.getElementById(
        'subtotal'
      ).textContent = `= R$ ${subtotal.toFixed(2)}`
    } else {
      document.getElementById('subtotal').textContent = ''
    }
  })

  // Carregar a lista do localStorage ao carregar a página
  updateList()
})
