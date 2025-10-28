// Menu hamburguer
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
menuBtn.addEventListener("click", () => mobileMenu.classList.toggle("hidden"));

// Elementos
const bannerBG = document.querySelector("#bannerBG");
const banner = document.querySelector("#banner");
const nomeCliente = document.querySelector("#ncliente");
const produto = document.querySelector("#produto");
const quantidade = document.querySelector("#quantidade");
const precoUnitario = document.querySelector("#precoUnitario");
const descontoR = document.querySelector("#descontoR");

const cliente = document.querySelector("#cliente");
const produtoR = document.querySelector("#produtoR");
const quantidadeR = document.querySelector("#quantidadeR");
const subtotalR = document.querySelector("#subtotalR");
const descontox = document.querySelector("#descontox");
const totalR = document.querySelector("#totalR");

const totalPedidosSpan = document.getElementById("totalPedidos");
const totalArrecadadoSpan = document.getElementById("totalArrecadado");
const pedidosTable = document.getElementById("pedidosTable");
const totalFinalBtn = document.getElementById("totalFinal");
const finalizarP = document.getElementById("finalizarP");

let pedidos = [];
let ultimoPedido = {};

// Botão Calcular Total
totalFinalBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const nome = nomeCliente.value.trim();
  const prod = produto.value.trim();
  const qtd = Number(quantidade.value);
  const preco = Number(precoUnitario.value);
  const desc = Number(descontoR.value);

  if (!nome || !prod || !qtd || !preco) {
    alert("Preencha todos os campos antes de calcular!");
    return;
  }

  const subtotal = qtd * preco;
  const valorDesconto = (subtotal * desc) / 100;
  const total = subtotal - valorDesconto;

  ultimoPedido = { nome, produto: prod, quantidade: qtd, desconto: desc, total };

  cliente.textContent = nome;
  produtoR.textContent = prod;
  quantidadeR.textContent = qtd;
  subtotalR.textContent = `R$ ${subtotal.toFixed(2)}`;
  descontox.textContent = `R$ ${valorDesconto.toFixed(2)}`;
  totalR.textContent = `R$ ${total.toFixed(2)}`;

  banner.textContent = "Pedido calculado com sucesso!";
  bannerBG.style.backgroundColor = "green";
  banner.style.color = "white";

  setTimeout(() => {
    banner.textContent = "";
    bannerBG.style.backgroundColor = "rgba(253, 186, 116, 0.7)";
  }, 4000);
});

// Botão Finalizar Pedido
finalizarP.addEventListener("click", () => {
  if (!ultimoPedido.nome) {
    alert("Calcule o pedido antes de finalizar!");
    return;
  }

  pedidos.push(ultimoPedido);
  renderizarTabela();
  limparCampos();
});

// Renderizar tabela
function renderizarTabela() {
  pedidosTable.innerHTML = "";

  pedidos.forEach((p, i) => {
    pedidosTable.innerHTML += `
      <tr class="hover:bg-amber-100 transition-all duration-200">
        <td class="p-3 border border-amber-700">${p.nome}</td>
        <td class="p-3 border border-amber-700">${p.produto}</td>
        <td class="p-3 border border-amber-700 text-center">${p.quantidade}</td>
        <td class="p-3 border border-amber-700 text-center">${p.desconto}%</td>
        <td class="p-3 border border-amber-700 text-center font-semibold text-green-700">R$ ${p.total.toFixed(2)}</td>
        <td class="p-3 border border-amber-700 text-center">
          <button onclick="excluirPedido(${i})" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow-md">Excluir</button>
        </td>
      </tr>
    `;
  });

  atualizarTotais();
}

// Excluir pedido
function excluirPedido(index) {
  pedidos.splice(index, 1);
  renderizarTabela();
}

// Atualizar totais
function atualizarTotais() {
  totalPedidosSpan.textContent = pedidos.length;
  const totalArrecadado = pedidos.reduce((soma, p) => soma + p.total, 0);
  totalArrecadadoSpan.textContent = totalArrecadado.toFixed(2);
}

// Limpar formulário
function limparCampos() {
  nomeCliente.value = "";
  produto.value = "";
  quantidade.value = "";
  precoUnitario.value = "";
  descontoR.value = "";
  cliente.textContent = "";
  produtoR.textContent = "";
  quantidadeR.textContent = "";
  subtotalR.textContent = "";
  descontox.textContent = "";
  totalR.textContent = "";
}







