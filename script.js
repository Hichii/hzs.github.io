// =============================================
// SCRIPT.JS
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Web de Big Data HZS cargada');

    // =========================================
    // 1. NAVEGACIÓN - Menú
    // =========================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });
    }

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-menu a').forEach(function(link) {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (navToggle) navToggle.textContent = '☰';
        });
    });

    // =========================================
    // 2. BARRA DE PROGRESO DE SCROLL
    // =========================================
    const progressBar = document.getElementById('progressBar');

    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        if (progressBar) {
            progressBar.style.width = Math.min(progress, 100) + '%';
        }
    });

    // =========================================
    // 3. ACORDEONES
    // =========================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(function(header) {
        header.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const accordion = this.closest('.accordion');
            
            if (!accordion) return;
            
            const isActive = accordion.classList.contains('active');            
            accordion.classList.toggle('active');
        });
    });

    // =========================================
    // 4. SISTEMA DE MODALES
    // =========================================
    function abrirModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) {
            console.error('❌ Modal no encontrado:', modalId);
            return;
        }
        
        // Cerrar otros modales
        document.querySelectorAll('.modal').forEach(function(m) {
            m.style.display = 'none';
        });
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        console.log('✅ Modal abierto:', modalId);
    }

    function cerrarModal(modal) {
        if (!modal) return;
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Evento: clic en botones "Ver más"
    document.addEventListener('click', function(e) {
        const boton = e.target.closest('.btn-more');
        if (boton) {
            const modalId = boton.getAttribute('data-modal');
            if (modalId) {
                e.preventDefault();
                abrirModal(modalId);
            }
            return;
        }
        
        // Cerrar con X
        const cerrarBtn = e.target.closest('.modal-close');
        if (cerrarBtn) {
            const modal = cerrarBtn.closest('.modal');
            if (modal) {
                e.preventDefault();
                cerrarModal(modal);
            }
            return;
        }
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            cerrarModal(e.target);
        }
    });

    // Cerrar con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal[style*="display: flex"], .modal[style*="display: block"]')
                .forEach(function(modal) {
                    cerrarModal(modal);
                });
        }
    });

    // =========================================
    // 5. BOTÓN VOLVER ARRIBA
    // =========================================
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // =========================================
    // 6. AÑO AUTOMÁTICO EN FOOTER
    // =========================================
    const footerCopy = document.querySelector('.footer-copy');
    if (footerCopy) {
        const year = new Date().getFullYear();
        footerCopy.textContent = footerCopy.textContent.replace('2026', year);
    }

    // =========================================
    // 7. DETECTAR SECCIÓN ACTIVA EN MENÚ
    // =========================================
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(function(link) {
            link.style.borderBottomColor = 'transparent';
            link.style.color = 'rgba(255,255,255,0.7)';
            if (link.getAttribute('href') === '#' + current) {
                link.style.borderBottomColor = 'var(--secondary-color)';
                link.style.color = '#ffffff';
            }
        });
    });

    console.log('✅ Todas las funcionalidades activadas');
});

// Buscador de habilidades
const skillSearch = document.getElementById('skillSearch');
const skillItems = document.querySelectorAll('.skill-item');

if (skillSearch) {
    skillSearch.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        const resultsContainer = document.getElementById('skillResults');
        
        if (query.length === 0) {
            resultsContainer.innerHTML = '';
            skillItems.forEach(item => item.style.display = 'inline-block');
            return;
        }
        
        let found = 0;
        skillItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(query)) {
                item.style.display = 'inline-block';
                item.style.background = '#64ffda';
                found++;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Mostrar resultados
        resultsContainer.innerHTML = found > 0 
            ? `<span class="result-count">✅ Encontradas ${found} coincidencias</span>`
            : `<span class="result-count">❌ No se encontraron habilidades para "${query}"</span>`;
    });
}



// ============================================
// COPIAR EMAIL AL PORTAPAPELES
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const emailBtn = document.getElementById('copyEmail');
    const email = 'hichamcr@live.com';
    
    if (emailBtn) {
        emailBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Copiar al portapapeles
            navigator.clipboard.writeText(email).then(function() {
                // Añadir clase de "copiado"
                emailBtn.classList.add('copied');
                
                // Cambiar el texto temporalmente
                const textSpan = emailBtn.querySelector('.btn-text');
                const originalText = textSpan.textContent;
                textSpan.textContent = '¡Copiado!';
                
                // Restaurar después de 2 segundos
                setTimeout(function() {
                    emailBtn.classList.remove('copied');
                    textSpan.textContent = originalText;
                }, 2000);
                
            }).catch(function(err) {
                // Fallback: seleccionar el texto y mostrar alerta
                alert('Email: ' + email + ' (cópialo manualmente)');
            });
        });
    }
});


