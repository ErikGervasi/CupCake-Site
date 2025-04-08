const inputs = document.querySelectorAll('input[type="number"]');
const listaPedido = document.getElementById("listaPedido");
const totalPedido = document.getElementById("totalPedido");
const resumoModal = document.getElementById("resumoModal");

inputs.forEach(input => input.addEventListener("input", atualizarResumo));

function calcularPrecoUnitario(qtdTotal) {
  if (qtdTotal >= 100) return 4.50;
  if (qtdTotal >= 50) return 5.00;
  if (qtdTotal >= 21) return 5.50;
  return 6.00;
}

function atualizarResumo() {
  let total = 0;
  let resumo = "";
  let pedido = [];

  inputs.forEach(input => {
    const quantidade = parseInt(input.value) || 0;
    const nome = input.previousElementSibling.previousElementSibling.innerText;
    if (quantidade > 0) {
      pedido.push({ nome, quantidade });
      total += quantidade;
    }
  });

  const precoUnitario = calcularPrecoUnitario(total);
  let precoTotal = total * precoUnitario;

  pedido.forEach(item => {
    resumo += `<p>${item.quantidade}x ${item.nome}</p>`;
  });

  listaPedido.innerHTML = resumo;
  totalPedido.innerText = `Total (${total} unidades): R$ ${precoTotal.toFixed(2).replace('.', ',')}`;
}

function mostrarModal() {
  let total = 0;
  let pedido = [];
  let html = "";

  inputs.forEach(input => {
    const quantidade = parseInt(input.value) || 0;
    const nome = input.previousElementSibling.previousElementSibling.innerText;
    if (quantidade > 0) {
      pedido.push({ nome, quantidade });
      total += quantidade;
    }
  });

  if (total === 0) {
    alert("Escolha ao menos um sabor!");
    return;
  }

  const precoUnitario = calcularPrecoUnitario(total);
  const precoTotal = total * precoUnitario;

  pedido.forEach(item => {
    html += `<p>${item.quantidade}x ${item.nome}</p>`;
  });

  html += `<p style='margin-top:1rem; font-weight:bold;'>Total: R$ ${precoTotal.toFixed(2).replace('.', ',')}</p>`;

  resumoModal.innerHTML = html;
  document.getElementById("modalResumo").style.display = "flex";
}

function enviarWhatsApp() {
  let mensagem = "Olá! Gostaria de fazer o seguinte pedido:%0A";
  let total = 0;

  inputs.forEach(input => {
    const quantidade = parseInt(input.value) || 0;
    const nome = input.previousElementSibling.previousElementSibling.innerText;
    if (quantidade > 0) {
      mensagem += `${quantidade}x ${nome}%0A`;
      total += quantidade;
    }
  });

  const precoUnitario = calcularPrecoUnitario(total);
  const precoTotal = total * precoUnitario;
  mensagem += `%0ATotal (${total} unidades): R$ ${precoTotal.toFixed(2).replace('.', ',')}`;

  const numeroTelefone = '5547999767706'; 
  const url = `https://wa.me/${numeroTelefone}?text=${mensagem}`;
  window.open(url, '_blank');
  document.getElementById("modalResumo").style.display = "none";
}