// =============================================
// DARK MODE — Script partilhado (theme.js)
// =============================================
// Incluir em todas as páginas ANTES de outros scripts.
// Requer um <button class="dark-mode-toggle" id="btn-dark-mode">🌙</button> no HTML.
// Usa localStorage('theme_site') como chave unificada.

function _isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
}

function toggleDarkMode() {
    var isDark = _isDark();
    var newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    var btn = document.getElementById('btn-dark-mode');
    if (btn) btn.textContent = isDark ? '🌙' : '☀️';
    localStorage.setItem('theme_site', newTheme);
    // Notificar a página para redesenhar gráficos, tabelas, etc.
    document.dispatchEvent(new Event('themeChanged'));
}

// Inicialização imediata (corre antes do DOM estar pronto para evitar flash)
(function() {
    var saved = localStorage.getItem('theme_site');
    var theme;
    if (saved) {
        theme = saved;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme = 'dark';
    } else {
        theme = 'light';
    }
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    // Sincronizar ícone quando o DOM estiver pronto
    document.addEventListener('DOMContentLoaded', function() {
        var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        var btn = document.getElementById('btn-dark-mode');
        if (btn) btn.textContent = isDark ? '☀️' : '🌙';
    });
})();

// Reagir a mudanças do SO (se o utilizador não tiver escolhido manualmente)
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme_site')) {
            var newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            var btn = document.getElementById('btn-dark-mode');
            if (btn) btn.textContent = e.matches ? '☀️' : '🌙';
            document.dispatchEvent(new Event('themeChanged'));
        }
    });
}
