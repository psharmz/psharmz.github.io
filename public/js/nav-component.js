// Shared pill navigation — the single source of truth for the nav on every
// static page (and the markup the React home page mirrors in src/App.js).
// Styling lives in css/pill-nav.css, which this file links itself so pages only
// need the one <script> tag.
function createNavigation() {
    var path = window.location.pathname.replace(/\/index\.html$/, '/');
    var active = '';
    if (/(^|\/)murals\.html$/.test(path)) active = 'murals';
    else if (path === '/' || path === '') active = 'about';
    else active = 'work'; // portfolio, portfolio-home and every case study live under Work

    var link = function (key, href, label, extra) {
        var cur = active === key ? ' aria-current="page"' : '';
        return '<a href="' + href + '"' + cur + (extra || '') + '>' + label + '</a>';
    };

    return '' +
        '<nav class="pill-nav" aria-label="Primary">' +
            '<a class="pill-nav__home" href="/" aria-label="Parul Sharma — home">' +
                '<img class="pill-nav__avatar" src="/img/parul-avatar.jpg" alt="" width="32" height="32" />' +
            '</a>' +
            link('cv', '/#cv', 'CV') +
            link('work', '/portfolio.html', 'Work') + // the password screen
            link('murals', '/murals.html', 'Murals') +
            link('about', '/#words', 'About') +
            link('', 'https://www.linkedin.com/in/psharmz/', 'LinkedIn', ' target="_blank" rel="noopener noreferrer"') +
        '</nav>';
}

function injectNavigation() {
    if (!document.querySelector('link[href$="pill-nav.css"]')) {
        var css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = '/css/pill-nav.css';
        document.head.appendChild(css);
    }
    var an = document.createElement('script');
    an.src = '/js/analytics.js';
    an.async = true;
    document.head.appendChild(an);
    document.body.classList.add('has-pill-nav');
    document.body.insertAdjacentHTML('afterbegin', createNavigation());
}

document.addEventListener('DOMContentLoaded', injectNavigation);
