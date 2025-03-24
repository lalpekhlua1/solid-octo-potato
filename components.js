// Common components for all pages
document.addEventListener("DOMContentLoaded", () => {
  // Initialize header
  initHeader()

  // Initialize footer
  initFooter()

  // Initialize breadcrumbs
  initBreadcrumbs()

  // Initialize theme toggle
  initThemeToggle()

  // Initialize cookie banner
  initCookieBanner()

  // Initialize mobile menu
  initMobileMenu()

  // Initialize FAQ accordions if they exist
  initFaqAccordions()

  // Initialize search functionality if it exists
  initSearch()

  // Initialize particles if on homepage
  if (document.querySelector(".hero") && document.getElementById("particles-canvas")) {
    initParticles()
  }

  // Initialize counters if they exist
  initCounters()

  // Initialize testimonial slider if it exists
  initTestimonialSlider()
})

// Header initialization
function initHeader() {
  const header = document.querySelector("header")
  if (!header) return

  // Add scroll event for header styling
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Check initial scroll position
  if (window.scrollY > 50) {
    header.classList.add("scrolled")
  }
}

// Footer initialization
function initFooter() {
  // Nothing specific needed for footer initialization
}

// Breadcrumbs initialization
function initBreadcrumbs() {
  const breadcrumbs = document.querySelector(".breadcrumbs")
  if (!breadcrumbs) return

  // Get current page path
  const path = window.location.pathname
  const pathParts = path.split("/").filter((part) => part !== "")

  // Create breadcrumb items
  let breadcrumbHTML = '<li><a href="/">Home</a></li>'
  let currentPath = ""

  pathParts.forEach((part, index) => {
    currentPath += `/${part}`
    const isLast = index === pathParts.length - 1
    const formattedPart = part.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())

    if (isLast) {
      breadcrumbHTML += `<li>${formattedPart}</li>`
    } else {
      breadcrumbHTML += `<li><a href="${currentPath}">${formattedPart}</a></li>`
    }
  })

  breadcrumbs.innerHTML = breadcrumbHTML
}

// Theme toggle initialization
function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle")
  if (!themeToggle) return

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme")
    const isDark = !document.body.classList.contains("light-theme")
    localStorage.setItem("dark-theme", isDark)
    updateThemeIcon(isDark)
  })

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("dark-theme")
  if (savedTheme === "false") {
    document.body.classList.add("light-theme")
    updateThemeIcon(false)
  } else {
    updateThemeIcon(true)
  }
}

function updateThemeIcon(isDark) {
  const themeIcon = document.querySelector("#theme-toggle i")
  if (themeIcon) {
    if (isDark) {
      themeIcon.classList.remove("fa-moon")
      themeIcon.classList.add("fa-sun")
    } else {
      themeIcon.classList.remove("fa-sun")
      themeIcon.classList.add("fa-moon")
    }
  }
}

// Cookie banner initialization
function initCookieBanner() {
  const cookieBanner = document.querySelector(".cookie-banner")
  const acceptCookiesBtn = document.querySelector(".accept-cookies")

  if (cookieBanner && acceptCookiesBtn) {
    // Check if user has already accepted cookies
    if (!localStorage.getItem("cookies-accepted")) {
      // Show banner after a short delay
      setTimeout(() => {
        cookieBanner.classList.add("active")
      }, 1000)

      // Handle accept button click
      acceptCookiesBtn.addEventListener("click", () => {
        localStorage.setItem("cookies-accepted", "true")
        cookieBanner.classList.remove("active")
      })
    }
  }
}

// Mobile menu initialization
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const nav = document.querySelector("nav")

  if (!mobileMenuBtn || !nav) return

  mobileMenuBtn.addEventListener("click", () => {
    nav.classList.toggle("active")
    mobileMenuBtn.classList.toggle("fa-times")
  })

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      nav.classList.remove("active")
      mobileMenuBtn.classList.remove("fa-times")
    }
  })

  // Close menu when clicking a link
  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active")
      mobileMenuBtn.classList.remove("fa-times")
    })
  })
}

// FAQ accordions initialization
function initFaqAccordions() {
  const faqItems = document.querySelectorAll(".faq-item")
  if (faqItems.length === 0) return

  faqItems.forEach((item) => {
    const header = item.querySelector(".faq-question")
    header.addEventListener("click", () => {
      item.classList.toggle("active")
    })
  })
}

// Search functionality initialization
function initSearch() {
  const searchInput = document.getElementById("kb-search")
  if (!searchInput) return

  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase()
    const articles = document.querySelectorAll(".kb-article")

    articles.forEach((article) => {
      const title = article.querySelector("h3").textContent.toLowerCase()
      const content = article.querySelector("p").textContent.toLowerCase()

      if (title.includes(searchTerm) || content.includes(searchTerm)) {
        article.style.display = "block"
      } else {
        article.style.display = "none"
      }
    })

    // Show/hide no results message
    const noResults = document.querySelector(".kb-no-results")
    const visibleArticles = document.querySelectorAll('.kb-article[style="display: block"]')

    if (noResults) {
      if (visibleArticles.length === 0 && searchTerm !== "") {
        noResults.style.display = "block"
      } else {
        noResults.style.display = "none"
      }
    }
  })
}

// Particles initialization
function initParticles() {
  const canvas = document.getElementById("particles-canvas")
  if (!canvas) return

  const ctx = canvas.getContext("2d")

  // Set canvas size to match parent
  function resizeCanvas() {
    const heroSection = document.querySelector(".hero")
    if (heroSection) {
      canvas.width = heroSection.offsetWidth
      canvas.height = heroSection.offsetHeight
    }
  }

  // Call resize initially and on window resize
  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  // Particle settings
  const particleCount = 100
  const particles = []
  const colors = ["rgba(124, 77, 255, 0.7)", "rgba(0, 230, 118, 0.7)", "rgba(0, 212, 255, 0.7)"]

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25,
      opacity: Math.random() * 0.5 + 0.5,
    })
  }

  // Animation loop
  function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]

      // Move particles
      p.x += p.speedX
      p.y += p.speedY

      // Wrap around edges
      if (p.x < 0) p.x = canvas.width
      if (p.x > canvas.width) p.x = 0
      if (p.y < 0) p.y = canvas.height
      if (p.y > canvas.height) p.y = 0

      // Draw particle
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fillStyle = p.color
      ctx.globalAlpha = p.opacity
      ctx.fill()

      // Draw connections between nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j]
        const dx = p.x - p2.x
        const dy = p.y - p2.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          ctx.beginPath()
          ctx.strokeStyle = p.color
          ctx.globalAlpha = 0.2 * (1 - distance / 100)
          ctx.lineWidth = 1
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.stroke()
        }
      }
    }
  }

  // Start animation
  animate()
}

// Counters initialization
function initCounters() {
  const counters = document.querySelectorAll(".counter-value")
  const counterSection = document.querySelector(".stats-section")

  if (!counterSection || counters.length === 0) return

  let counted = false

  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0
  }

  function checkCounters() {
    if (isInViewport(counterSection) && !counted) {
      counted = true
      counters.forEach((counter) => {
        const target = +counter.getAttribute("data-target")
        const duration = 2000 // 2 seconds
        const increment = target / (duration / 16) // 60fps

        let current = 0
        const updateCounter = () => {
          current += increment
          if (current < target) {
            counter.textContent = Math.ceil(current)
            requestAnimationFrame(updateCounter)
          } else {
            counter.textContent = target
          }
        }

        updateCounter()
      })
    }
  }

  // Check on scroll
  window.addEventListener("scroll", checkCounters)

  // Check initially
  checkCounters()
}

// Testimonial slider initialization
function initTestimonialSlider() {
  const testimonialSlider = document.querySelector(".testimonial-slider")
  if (!testimonialSlider) return

  let currentSlide = 0
  const slides = testimonialSlider.querySelectorAll(".testimonial-item")
  const totalSlides = slides.length
  const dots = testimonialSlider.querySelectorAll(".slider-dot")

  // Set initial state
  updateSlider()

  // Next button
  const nextBtn = testimonialSlider.querySelector(".slider-next")
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % totalSlides
      updateSlider()
    })
  }

  // Previous button
  const prevBtn = testimonialSlider.querySelector(".slider-prev")
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
      updateSlider()
    })
  }

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index
      updateSlider()
    })
  })

  function updateSlider() {
    // Update slides
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`
    })

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide)
    })
  }

  // Auto advance slides
  setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides
    updateSlider()
  }, 5000)
}

