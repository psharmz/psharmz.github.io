// Reusable Navigation Component
function createNavigation() {
    return `
        <!-- Navigation Bar -->
        <nav class="top-nav">
            <div class="nav-links">
                <span class="link work-link">
                    <a href="/">
                        <img alt="work" src="img/work.jpg" width="140px" />
                    </a>
                </span>
                <span class="link email-link">
                    <a href="mailto:p.sharma9793@gmail.com?Subject=Let's work together" target="_top">  
                        <img alt="email" src="img/email.jpg" width="105px" /> 
                    </a>     
                </span>
                <span class="link resume">
                    <a href="parul_resume.pdf" target="_blank">
                        <img alt="resume" src="img/resume.jpg" width="150px" />
                    </a>
                </span>
            </div>
        </nav>

        <!-- Profile image in top left -->
        <div class="work-header">
            <button onclick="window.location.href='/'" class="back-to-top">
                <img alt="profile" src="img/p.svg" width="60px" class="profile-logo" />
            </button>
        </div>
    `;
}

function getNavigationCSS() {
    return `
        <style>
            .top-nav {
                position: fixed;
                top: 0;
                width: 100%;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                z-index: 1000;
                padding: 1rem 2rem;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }

            .nav-links {
                display: flex;
                justify-content: center;
                gap: 2rem;
                align-items: center;
            }

            .link {
                transition: all 0.3s ease;
            }

            .work-link:hover {
                transform: translateY(-5px) scale(1.3) rotate(-5deg);
            }

            .link.email-link {
                transition: transform 0.3s ease;
            }

            .email-link:hover {
                transform: translateY(-5px) scale(1.3) rotate(5deg);
            }

            .link.resume {
                transition: transform 0.3s ease;
            }

            .resume:hover {
                transform: translateY(-5px) scale(1.3) rotate(-3deg);
            }

            .work-header {
                position: fixed;
                top: 1rem;
                left: 1rem;
                z-index: 1001;
            }

            .back-to-top {
                background: none;
                border: none;
                cursor: pointer;
                transition: transform 0.3s ease;
                border-radius: 50%;
                padding: 0.5rem;
                background: rgba(255, 255, 255, 0.9);
                backdrop-filter: blur(10px);
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }

            .back-to-top:hover {
                transform: scale(1.1);
            }

            .profile-logo {
                border-radius: 50%;
                width: 60px !important;
                height: 60px;
                object-fit: cover;
            }

            .page-content {
            }

            /* Mobile Footer Navigation */
            @media (max-width: 768px) {
                .top-nav {
                    position: fixed;
                    top: auto;
                    bottom: 0;
                    padding: 1rem 5%;
                    box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
                }

                .nav-links {
                    gap: 0.5rem;
                    width: 100%;
                    justify-content: space-between;
                }

                .nav-links .link img {
                    max-width: 25vw;
                    height: auto;
                }

                .nav-links .work-link img {
                    max-width: 20vw;
                }

                .nav-links .email-link img {
                    max-width: 18vw;
                }

                .nav-links .resume img {
                    max-width: 22vw;
                }
            }
        </style>
    `;
}

// Function to inject navigation into a page
function injectNavigation() {
    // Add CSS to head
    document.head.insertAdjacentHTML('beforeend', getNavigationCSS());
    
    // Add navigation HTML to body (after opening body tag)
    document.body.insertAdjacentHTML('afterbegin', createNavigation());
}

// Auto-inject when script loads
document.addEventListener('DOMContentLoaded', injectNavigation);