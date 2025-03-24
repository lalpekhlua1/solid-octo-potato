document.addEventListener("DOMContentLoaded", () => {
  // Only initialize particles if we're on the home page with the hero section
  if (document.querySelector(".hero")) {
    initParticles()
  }
})

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

