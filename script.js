// Toggle dark mode et animation rotation bouton
const toggleBtn = document.getElementById('toggle-theme');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  if(document.body.classList.contains('dark-mode')){
    toggleBtn.textContent = '☀️ Mode Clair';
  } else {
    toggleBtn.textContent = '🌙 Mode Sombre';
  }

  toggleBtn.classList.add('rotate');

  setTimeout(() => {
    toggleBtn.classList.remove('rotate');
  }, 600);
});

// Fade-in au scroll
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if(!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('appear');
      appearOnScroll.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// Envoi du formulaire avec fetch vers Formspree
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = new FormData(contactForm);

    try {
      const response = await fetch("https://formspree.io/f/mgvynjlo", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        alert("✅ Votre message a bien été envoyé !");
        contactForm.reset(); // Vide le formulaire
      } else {
        alert("❌ Une erreur est survenue lors de l'envoi.");
      }
    } catch (error) {
      alert("❌ Une erreur réseau est survenue.");
      console.error(error);
    }
  });
}
