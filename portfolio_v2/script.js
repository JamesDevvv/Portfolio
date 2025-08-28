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

const texts = ['Software Developer', 'Software Engineer', 'Automation Specialist'];
const el = document.getElementById('typewriter');

let i = 0; 
let j = 0; 
let isDeleting = false;

function type() {
  const currentText = texts[i];

  if (!isDeleting) {
    el.textContent = currentText.substring(0, j + 1);
    j++;

    if (j === currentText.length) {
      isDeleting = true;
      setTimeout(type, 1500); 
      return;
    }
  } else {
    el.textContent = currentText.substring(0, j - 1);
    j--;

    if (j === 0) {
      isDeleting = false;
      i = (i + 1) % texts.length; 
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


  // portfolio modal

  const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('carousel-image');

let currentImages = [];
let currentIndex = 0;

const imageData = {
  project1: {
    title: 'Project Resolve',
    images: [
      'Project-Resolve/screencapture-localhost-5173-2025-08-01-01_41_50.png',
      'Project-Resolve/screencapture-localhost-5173-lce-dashboard-2025-08-01-01_42_45.png',
      'Project-Resolve/screencapture-localhost-5174-2025-08-01-01_43_07.png',
      'Project-Resolve/screencapture-localhost-5174-lgu-chat-2025-08-01-01_44_20.png',
      'Project-Resolve/screencapture-localhost-5174-lgu-dashboard-2025-08-01-01_43_44.png',
      'Project-Resolve/screencapture-localhost-5174-lgu-settings-2025-08-01-01_45_10.png',
    ]
  },
  project2: {
    title: 'Makaturismo',
    images: [
      'Makaturismo/screencapture-localhost-5173-2025-08-06-02_00_13.png',
    ]
  },

  project3:{
      title: 'AIS',
      images: [
        'AIS/screencapture-localhost-3000-2025-08-12-03_27_44.png',
        'AIS/screencapture-localhost-3000-MainMenu-2025-08-12-04_12_58.png'
      ]
  },
  project4: {
    title: 'Square to Hubspot',
    images: [
      'API-Integ/square2hubspot.png'
    ]
  },
  project5: {
    title: 'WooCommerce to Hubspot',
    images: [
      'API-Integ/woocommerce2hubspot.png'
    ]
  },
  projectGeo:{
    
    title : 'Geolocation App',
    images : [
    
      'Geo/screencapture-localhost-5177-home-2025-08-29-01_24_37.png',
      'Geo/screencapture-localhost-5177-login-2025-08-29-01_22_12.png'
  ]}
};

function openModal(projectId) {
  const data = imageData[projectId];
  if (!data) return;

  modalTitle.textContent = data.title;
  currentImages = data.images;
  currentIndex = 0;

  updateCarouselImage();
  modal.classList.remove('hidden');
}

function updateCarouselImage() {
  if (currentImages.length === 0) return;
  modalImage.src = currentImages[currentIndex];
}

function nextImage() {
  if (currentImages.length === 0) return;
  currentIndex = (currentIndex + 1) % currentImages.length;
  updateCarouselImage();
}

function prevImage() {
  if (currentImages.length === 0) return;
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  updateCarouselImage();
}

function closeModal() {
  modal.classList.add('hidden');
  modalImage.src = ''; // clear on close
}
