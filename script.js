/**
 * ======================
 * FUNCIONALIDADE DE MODO ESCURO
 * ======================
 */

const body = document.body;
const modeToggle = document.querySelector('.mode-toggle');

// Carrega preferência do usuário do localStorage
function carregarPreferenciaModoEscuro() {
    if (localStorage.getItem('dark-mode') === 'true') {
        body.classList.add('dark-mode');
    }
}

// Alterna modo escuro e salva preferência
function alternarModoEscuro() {
    body.classList.toggle('dark-mode');
    localStorage.setItem('dark-mode', body.classList.contains('dark-mode'));
}

// Inicializa funcionalidade de modo escuro
function inicializarModoEscuro() {
    carregarPreferenciaModoEscuro();
    modeToggle.addEventListener('click', alternarModoEscuro);
}

/**
 * ======================
 * FUNCIONALIDADE DE CUPONS
 * ======================
 */

// Copia código do cupom com efeito de confete
function copiarCupom(codigo, botao) {
    navigator.clipboard.writeText(codigo).then(() => {
        // Calcula posição do botão para origem do confete
        const rect = botao.getBoundingClientRect();
        const origemConfete = {
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight
        };

        // Dispara efeito de confete
        confetti({
            particleCount: 80,
            spread: 70,
            origin: origemConfete
        });

        // Mostra feedback para o usuário
        const textoBotao = botao.querySelector('span');
        const textoOriginal = textoBotao.textContent;
        
        textoBotao.textContent = 'Copiado!';
        botao.disabled = true;

        // Reinicia botão após timeout
        setTimeout(() => {
            textoBotao.textContent = textoOriginal;
            botao.disabled = false;
        }, 1200);
    });
}

/**
 * ======================
 * FUNCIONALIDADE DE FILTRO
 * ======================
 */

// Filtra cartões de cupom baseado no filtro selecionado
function filtrarCupons(filtro) {
    document.querySelectorAll('.coupon-card').forEach(cartao => {
        if (filtro === 'all' || cartao.getAttribute('data-status') === filtro) {
            cartao.style.display = '';
        } else {
            cartao.style.display = 'none';
        }
    });
}

// Inicializa botões de filtro
function inicializarBotoesFiltro() {
    document.querySelectorAll('.filter-buttons .btn').forEach(botao => {
        botao.addEventListener('click', function() {
            // Atualiza estado ativo
            document.querySelectorAll('.filter-buttons .btn').forEach(b => {
                b.classList.remove('active');
            });
            this.classList.add('active');

            // Aplica filtro
            const filtro = this.getAttribute('data-filter');
            filtrarCupons(filtro);
        });
    });
}

/**
 * ======================
 * INICIALIZAÇÃO
 * ======================
 */

document.addEventListener('DOMContentLoaded', () => {
    inicializarModoEscuro();
    inicializarBotoesFiltro();
});