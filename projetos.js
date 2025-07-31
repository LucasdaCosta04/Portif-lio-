const projetos = [
  { titulo: 'App de Empréstimos', descricao: 'Java: controle de ferramentas com histórico.' },
  { titulo: 'Protótipo Mobilidade Urbana', descricao: 'Figma: UX/UI para cidade inteligente.' },
  { titulo: 'Site de Nutrição', descricao: 'JavaScript: calculadora IMC e ingestão.' },
  { titulo: 'Jogos 2D', descricao: 'Godot: primeiros jogos e lógicas simples.' },
  { titulo: 'Redes Cisco', descricao: 'Packet Tracer: simulações e roteamentos.' }
];

const carousel = document.getElementById('carousel');

projetos.forEach(p => {
  const item = document.createElement('div');
  item.className = 'carousel-item';
  item.innerHTML = `<h3>${p.titulo}</h3><p>${p.descricao}</p>`;
  carousel.appendChild(item);
});
