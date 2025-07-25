// Navigation

const navItems = document.querySelectorAll('.nav-item');
const dot = document.getElementById('dot');
const sections = Array.from(navItems).map(link => {
  const target = document.querySelector(link.getAttribute('href'));
  return { link, target };
});

function moveDotToLink(link) {
  const offset = link.offsetLeft + link.offsetWidth / 2 - dot.offsetWidth / 2;
  dot.style.left = `${offset}px`;
}

function onScroll() {
  const scrollY = window.scrollY + window.innerHeight / 2;

  let current = sections[0];

  for (let section of sections) {
    const rect = section.target.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    if (scrollY >= top) {
      current = section;
    }
  }

  moveDotToLink(current.link);
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
  moveDotToLink(navItems[0]); // start at Home
  onScroll(); // set based on current scroll
});

window.addEventListener('scroll', onScroll);

// Typewriter effect

const text = 'Software Developer';
const el = document.getElementById('typewriter');
let i = 0;
let isDeleting = false;

function type() {
  if (!isDeleting) {
    el.textContent = text.substring(0, i + 1);
    i++;
    if (i === text.length) {
      isDeleting = true;
      setTimeout(type, 1500); 
      return;
    }
  } else {
    el.textContent = text.substring(0, i - 1);
    i--;
    if (i === 0) {
      isDeleting = false;
    }
  }

  setTimeout(type, isDeleting ? 50 : 100);
}

type();


// Tailwind config

tailwind.config = {
      theme: {
          extend: {
              colors: {
                  'deep-blue': '#0a0a23',
              },
              animation: {
                  'glow': 'glow 2s ease-in-out infinite alternate',
              },
              keyframes: {
                  glow: {
                      '0%': { 'box-shadow': '0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 15px #ffffff' },
                      '100%': { 'box-shadow': '0 0 10px #ffffff, 0 0 20px #ffffff, 0 0 30px #ffffff' }
                  }
              }
          }
      }
  }




  // Draggable moon
  const moon = document.getElementById('moon');
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  moon.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - moon.offsetLeft;
      offsetY = e.clientY - moon.offsetTop;
      moon.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', (e) => {
      if (isDragging) {
          moon.style.left = `${e.clientX - offsetX}px`;
          moon.style.top = `${e.clientY - offsetY}px`;
      }
  });

  document.addEventListener('mouseup', () => {
      isDragging = false;
      moon.style.cursor = 'grab';
  });

 // contact form 

  const form = document.getElementById('contactForm');
  const popup = document.getElementById('thankYouPopup');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      await fetch('https://formsubmit.co/ajax/cedrickbarzaga92@gmail.com', {
        method: 'POST',
        body: formData
      });

      // Show the popup and reset the form
      popup.classList.remove('hidden');
      form.reset();

    } catch (error) {
      alert("There was an error sending your message.");
      console.error(error);
    }
  });

  function closePopup() {
    popup.classList.add('hidden');
  }
