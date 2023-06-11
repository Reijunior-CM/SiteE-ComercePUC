// Obter o ID do produto da URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Exibir as informações do produto com base no ID
async function exibirDetalhesProduto() {
  try {
    const response = await fetch(`https://diwserver.vps.webdock.cloud/products/${productId}`);
    const produto = await response.json();

    const produtoDiv = document.getElementById("produto");
    produtoDiv.innerHTML = `
      <h3>${produto.title}</h3>
      <img src="${produto.image}" alt="${produto.title}" />
      
    `;

    const informacoesDiv = document.getElementById("informacoes");
    informacoesDiv.innerHTML = `
      <h3>Informações do Produto</h3>
      <p>Marca: ${produto.brandName}</p>
      <p>Gênero: ${produto.gender}</p>
      <p>Tipo de artigo: ${produto.articleType}</p>
      <p>Categoria: ${produto.category}</p>
      <p>Avaliação: ${produto.rating.rate} (${produto.rating.count} avaliações)</p>
     
      <h1>Preço: R$${produto.price},00</h1>
      <button id="btnAdicionarCarrinho">Adicionar ao Carrinho</button>
    `;
  } catch (error) {
    console.log("Erro na requisição: " + error);
  }
}

exibirDetalhesProduto();
