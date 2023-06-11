let produtos = []; // Variável para armazenar os produtos

// Função para buscar itens
function buscarItens(termo) {
  const produtosFiltrados = produtos.filter(produto =>
    produto.title.toLowerCase().includes(termo.toLowerCase())
  );

  let str = '';

  produtosFiltrados.forEach(produto => {
    str += `
    <div class="card">
      <div class="card-content">
        <img src="${produto.image}" alt="${produto.title}" />
        <h3>${produto.title}</h3>
        <p>Preço: R$${produto.price},00</p>
        <button class="buy-button" data-id="${produto.id}">Comprar</button>
      </div>
    </div>`;
  });

  document.getElementById("produtos").innerHTML = str;

  // Adicionar evento de clique aos botões "Comprar"
  const buyButtons = document.querySelectorAll('.buy-button');
  buyButtons.forEach(button => {
    button.addEventListener('click', function () {
      const productId = this.getAttribute('data-id');
      console.log('ID do produto: ', productId);
      // Redirecionar para a página de detalhes com o ID do produto
      window.location.href = `detalhes.html?id=${productId}`;
    });
  });
}

// Função para lidar com o envio do formulário de pesquisa
document.querySelector('#caixaPesquisa').addEventListener('submit', function (e) {
  e.preventDefault();
  const searchTerm = document.querySelector('#InputPesquisa').value;
  console.log('Pesquisar por:', searchTerm);
  buscarItens(searchTerm);
});

// Função para buscar produtos ao carregar a página
async function fetchProdutos() {
  try {
    const response = await fetch('https://diwserver.vps.webdock.cloud/products');
    const data = await response.json();
    produtos = data.products; // Armazenar os produtos na variável
    buscarItens(''); // Exibir todos os produtos no início
  } catch (error) {
    console.log("Erro na requisição: " + error);
  }
}

fetchProdutos();
