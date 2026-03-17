// Registrace GSAP pluginu
gsap.registerPlugin(ScrollTrigger);

// --- 1. FUNKCE PRO ROZBALOVÁNÍ KARET (Akordeon) ---
function toggleCard(element) {
    const allCards = document.querySelectorAll('.card');

    // Pokud už je karta aktivní, zavřeme ji
    if (element.classList.contains('active')) {
        element.classList.remove('active');
    } else {
        // Zavřeme všechny ostatní a otevřeme tu kliknutou
        allCards.forEach(card => card.classList.remove('active'));
        element.classList.add('active');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const layer = document.querySelector(".transition-layer");
    const navLinks = document.querySelectorAll(".nav-item");

    // --- 2. ÚVODNÍ SWIPE (Při načtení stránky) ---
    if (layer) {
        // Vynutíme, aby pruh byl vidět a byl uprostřed
        gsap.set(layer, { 
            display: "block", 
            visibility: "visible", 
            left: "0%" 
        });

        // Pošleme ho doprava pryč
        gsap.to(layer, {
            left: "120%",
            duration: 0.8,
            ease: "power2.inOut",
            delay: 0.1,
            onComplete: () => {
                // Po dojezdu ho úplně vypneme, aby neblokoval klikání
                gsap.set(layer, { display: "none" });
            }
        });
    }

    // --- 3. PŘECHODY MEZI STRÁNKAMI ---
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            
            // Animujeme jen odkazy na jiné stránky (.html) a ignorujeme kotvy (#)
            if (href && href.includes(".html") && !href.startsWith("#") && !link.hasAttribute('target')) {
                e.preventDefault();
                
                // Zapneme pruh a připravíme ho vlevo
                gsap.set(layer, { display: "block", visibility: "visible", left: "-120%" });

                gsap.to(layer, {
                    left: "0%",
                    duration: 0.6,
                    ease: "power2.inOut",
                    onComplete: () => {
                        window.location.href = href;
                    }
                });
            }
        });
    });

    // --- 4. OSTATNÍ ANIMACE (Hero, Logo) ---
    gsap.from(".reveal", { y: 50, opacity: 0, duration: 1.2, ease: "power4.out", delay: 0.5 });
    gsap.from(".fade", { opacity: 0, y: 20, duration: 0.8, delay: 1 });

    const logo = document.querySelector(".logo");
    if (logo) {
        logo.addEventListener("mouseenter", () => gsap.to(".logo span", { color: "#fff", duration: 0.3 }));
        logo.addEventListener("mouseleave", () => gsap.to(".logo span", { color: "#FF5F1F", duration: 0.3 }));
    }

    // --- 5. ANIMACE KRUHŮ PŘI SCROLLU ---
    // Kruh 1 se posouvá dolů a doprava
    if(document.querySelector(".blob-1")) {
        gsap.to(".blob-1", {
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5
            },
            y: 400,
            x: 200
        });
    }

    // Kruh 2 se posouvá nahoru a doleva
    if(document.querySelector(".blob-2")) {
        gsap.to(".blob-2", {
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 2
            },
            y: -500,
            x: -150
        });
    }

    // Kruh 3 (bílý) jemně pluje středem
    if(document.querySelector(".blob-3")) {
        gsap.to(".blob-3", {
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            },
            y: 300
        });
    }
});