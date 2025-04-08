const sabores = document.querySelectorAll('.sabor');
const listaPedido = document.getElementById("listaPedido");
const totalPedido = document.getElementById("totalPedido");
const resumoModal = document.getElementById("resumoModal");

sabores.forEach(sabor => {
  const input = sabor.querySelector('input');
  input.addEventListener('input', atualizarResumo);
});

function obterPrecoUnitario(qtd, precos) {
  if (qtd >= 100) return precos[3];
  if (qtd >= 50) return precos[2];
  if (qtd >= 21) return precos[1];
  return precos[0];
}

function atualizarResumo() {
  let totalGeral = 0;
  let totalValor = 0;
  let resumo = "";

  sabores.forEach(sabor => {
    const nome = sabor.dataset.sabor;
    const precos = JSON.parse(sabor.dataset.precos);
    const input = sabor.querySelector('input');
    const quantidade = parseInt(input.value) || 0;

    if (quantidade > 0) {
      const precoUnit = obterPrecoUnitario(quantidade, precos);
      const subtotal = precoUnit * quantidade;

      resumo += `<p>${quantidade}x ${nome} - R$ ${subtotal.toFixed(2).replace('.', ',')}</p>`;
      totalGeral += quantidade;
      totalValor += subtotal;
    }
  });

  listaPedido.innerHTML = resumo;
  totalPedido.innerText = `Total (${totalGeral} unidades): R$ ${totalValor.toFixed(2).replace('.', ',')}`;
}

function mostrarModal() {
  if (totalPedido.innerText === 'Total: R$ 0,00') {
    alert("Escolha ao menos um sabor!");
    return;
  }

  resumoModal.innerHTML = listaPedido.innerHTML + `<p style="margin-top:1rem; font-weight:bold;">${totalPedido.innerText}</p>`;
  document.getElementById("modalResumo").style.display = "flex";
}

function enviarWhatsApp() {
  let mensagem = "Olá! Gostaria de fazer o seguinte pedido:%0A";
  let total = 0;
  let valorTotal = 0;

  sabores.forEach(sabor => {
    const nome = sabor.dataset.sabor;
    const precos = JSON.parse(sabor.dataset.precos);
    const input = sabor.querySelector('input');
    const quantidade = parseInt(input.value) || 0;

    if (quantidade > 0) {
      const preco = obterPrecoUnitario(quantidade, precos);
      const subtotal = preco * quantidade;
      mensagem += `${quantidade}x ${nome} - R$ ${subtotal.toFixed(2).replace('.', ',')}%0A`;
      total += quantidade;
      valorTotal += subtotal;
    }
  });

  mensagem += `%0ATotal (${total} unidades): R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
  const url = `https://wa.me/5547999767706?text=${mensagem}`;
  window.open(url, '_blank');
  document.getElementById("modalResumo").style.display = "none";
}
