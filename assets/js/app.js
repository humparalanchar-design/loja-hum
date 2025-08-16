// App.js - lógica principal

// Exemplo: salvar configuração de WhatsApp
async function salvarWhatsApp(numero) {
  await db.collection("settings").doc("loja").set({ whatsapp: numero }, { merge: true });
  alert("Número do WhatsApp atualizado!");
}

// Exemplo: aprovar pedido e abrir WhatsApp
async function aprovarPedido(pedidoId) {
  const pedidoRef = db.collection("orders").doc(pedidoId);
  const pedido = await pedidoRef.get();
  if (!pedido.exists) {
    alert("Pedido não encontrado!");
    return;
  }
  const dados = pedido.data();
  const numeroWhats = (await db.collection("settings").doc("loja").get()).data().whatsapp;
  const msg = `Novo pedido aprovado!\nCliente: ${dados.cliente}\nTotal: R$ ${dados.total}\nProdutos: ${dados.produtos.map(p=>p.nome+' (x'+p.qtd+')').join(', ')}`;
  window.open(`https://wa.me/${numeroWhats}?text=${encodeURIComponent(msg)}`, '_blank');
}
