/**
 * Portafolio Virtual - Rubén Santiago Carreño Torres
 * Lógica de interacción en JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // === 1. EFECTO MÁQUINA DE ESCRIBIR (TYPEWRITER) ===
    const typewriterElement = document.querySelector('.typewriter-text');
    if (typewriterElement) {
        const words = JSON.parse(typewriterElement.getAttribute('data-words'));
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let currentText = '';

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                currentText = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                currentText = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            typewriterElement.textContent = currentText;

            let typeSpeed = 100;

            if (isDeleting) {
                typeSpeed /= 2; // Delete faster
            }

            // If word is complete
            if (!isDeleting && currentText === currentWord) {
                typeSpeed = 2000; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && currentText === '') {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pause before starting next word
            }

            setTimeout(type, typeSpeed);
        }

        // Start typing effect
        setTimeout(type, 1000);
    }

    // === 2. FILTRADO INTERACTIVO DE HABILIDADES (SKILLS) ===
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            skillCards.forEach(card => {
                if (card._filterTimeout) {
                    clearTimeout(card._filterTimeout);
                    card._filterTimeout = null;
                }
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    requestAnimationFrame(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    });
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.85)';
                    card._filterTimeout = setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });

    // === 3. FILTRADO INTERACTIVO DE PROYECTOS (PROJECTS) ===
    const projFilterButtons = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    projFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            projFilterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-proj-filter');

            projectCards.forEach(card => {
                if (card._filterTimeout) {
                    clearTimeout(card._filterTimeout);
                    card._filterTimeout = null;
                }
                const category = card.getAttribute('data-proj-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    requestAnimationFrame(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    });
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.85)';
                    card._filterTimeout = setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // === 4. MENÚ DE NAVEGACIÓN MÓVIL ===
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            mobileToggle.classList.toggle('active');
            
            // Animate hamburger to X
            const bars = mobileToggle.querySelectorAll('.bar');
            if (mobileToggle.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                mobileToggle.classList.remove('active');
                const bars = mobileToggle.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }

    // === 5. INDICADOR ACTIVO DE SCROLL (INTERSECTION OBSERVER) ===
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // === 6. SIMULACIÓN DE ENVÍO DE FORMULARIO DE CONTACTO ===
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit-btn');
    const feedback = document.getElementById('form-feedback');

    if (contactForm && submitBtn && feedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Disable submit button and show loading state
            submitBtn.disabled = true;
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.innerHTML = `<span>Enviando...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
            feedback.classList.add('hidden');

            // Simulate server network delay
            setTimeout(() => {
                // Success scenario (frontend only simulation)
                feedback.textContent = '¡Mensaje enviado con éxito! Rubén se pondrá en contacto pronto.';
                feedback.className = 'form-feedback success';
                
                // Clear form
                contactForm.reset();
                
                // Restore button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;

                // Hide message after 5 seconds
                setTimeout(() => {
                    feedback.classList.add('hidden');
                }, 5000);

            }, 1800); // 1.8 seconds delay
        });
    }
});
