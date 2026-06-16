// Reusable embossed navigation — the single source of truth for the nav
// markup across every static project page. All styling lives in
// css/project.css under `.embossed-nav`; the mobile hamburger is built by
// js/project.js (which clones .nav-links after this injects it).
function createNavigation() {
    // Omit the link that points at the page we're already on (e.g. no
    // "Murals" link while viewing murals.html).
    var path = window.location.pathname;
    var onMurals = /(^|\/)murals\.html$/.test(path);
    var muralsLink = onMurals
        ? ''
        : '<span class="link murals-link"><a href="murals.html">Murals</a></span>';

    return `
        <nav class="top-nav">
            <div class="nav-links">
                <span class="link brand-link">
                    <a href="/">
                        <img src="img/p.svg" alt="Parul" />
                        <span class="brand-link-name">Parul</span>
                    </a>
                </span>
                <span class="link work-link"><a href="/#work">Work</a></span>
                ${muralsLink}
                <span class="link email-link"><a href="mailto:p.sharma9793@gmail.com?Subject=Let's work together" target="_top">Email</a></span>
                <span class="link resume"><a href="parul_resume.pdf" target="_blank">Resume</a></span>
            </div>
        </nav>

        <div class="work-header">
            <button onclick="window.location.href='/'" class="back-to-top">
                <img alt="profile" src="img/p.svg" width="60px" class="profile-logo" />
            </button>
            <span class="murals-brand">Parul</span>
        </div>
    `;
}

// Inject the nav and flag the page so the `.embossed-nav` styles apply.
function injectNavigation() {
    document.body.classList.add('embossed-nav');
    document.body.insertAdjacentHTML('afterbegin', createNavigation());
}

// Runs before js/project.js (loaded at body end) so the hamburger has a
// .nav-links to clone.
document.addEventListener('DOMContentLoaded', injectNavigation);
