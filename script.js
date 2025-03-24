document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const nav = document.querySelector("nav")

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

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })

        // Close mobile menu if open
        if (nav.classList.contains("active")) {
          nav.classList.remove("active")
          setTimeout(() => {
            nav.style.display = "none"
          }, 300)
        }
      }
    })
  })

  // Add active class to nav items on scroll
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll("nav ul li a")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })

  // Theme toggle
  const themeToggle = document.getElementById("theme-toggle")
  if (themeToggle) {
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

  // Server status indicators
  updateServerStatus()

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item")
  faqItems.forEach((item) => {
    const header = item.querySelector(".faq-question")
    header.addEventListener("click", () => {
      item.classList.toggle("active")
    })
  })

  // Animated counters
  const counters = document.querySelectorAll(".counter-value")
  const counterSection = document.querySelector(".stats-section")

  if (counterSection && counters.length) {
    let counted = false

    window.addEventListener("scroll", () => {
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
    })
  }

  // Testimonial slider
  const testimonialSlider = document.querySelector(".testimonial-slider")
  if (testimonialSlider) {
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

  // Newsletter form submission
  const newsletterForm = document.getElementById("newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const emailInput = this.querySelector('input[type="email"]')
      if (emailInput && emailInput.value) {
        // Show success message
        const successMsg = document.createElement("div")
        successMsg.className = "newsletter-success"
        successMsg.textContent = "Thank you for subscribing!"

        // Replace form with success message
        this.innerHTML = ""
        this.appendChild(successMsg)
      }
    })
  }

  // Cookie consent banner
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

  // Helper function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0
  }

  // Server status update function
  function updateServerStatus() {
    const statusIndicators = document.querySelectorAll(".server-status")

    // Simulate server status (in a real app, this would fetch from an API)
    const regions = ["us-east", "us-west", "eu-central", "ap-south"]

    statusIndicators.forEach((indicator) => {
      const region = indicator.getAttribute("data-region")
      // Simulate 95% uptime
      const isUp = Math.random() > 0.05

      indicator.classList.toggle("status-up", isUp)
      indicator.classList.toggle("status-down", !isUp)

      const statusText = indicator.querySelector(".status-text")
      if (statusText) {
        statusText.textContent = isUp ? "Operational" : "Issues Detected"
      }
    })
  }
})

