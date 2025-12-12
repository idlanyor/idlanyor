import { useEffect, useRef } from 'react';
import './BackgroundAnimation.css';

export default function BackgroundAnimation() {
  const canvasRef = useRef(null);
  const animationId = useRef(null);
  const particlesArray = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, radius: 100 });
  const frameSkip = useRef(0); // For performance optimization
  
  // Colors based on theme
  const colors = {
    primary: '#14b8a6',
    secondary: '#0d9488',
    accent: '#ec4899',
    dark: '#0f172a',
    light: '#f8fafc'
  };
  
  class Particle {
    constructor(context, width, height) {
      this.context = context;
      this.width = width;
      this.height = height;
      
      // Random position
      this.x = Math.random() * this.width;
      this.y = Math.random() * this.height;
      
      // Random size
      this.size = Math.random() * 2 + 1;
      
      // Random speed
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
      
      // Color based on position
      this.color = this.getColor();
      
      // Alpha for fading effect
      this.alpha = Math.random() * 0.3 + 0.2;
      
      // For connection lines
      this.connections = [];
    }
    
    getColor() {
      const gradientRatio = this.x / this.width;
      if (gradientRatio < 0.33) {
        return colors.primary;
      } else if (gradientRatio < 0.66) {
        return colors.secondary;
      } else {
        return colors.accent;
      }
    }
    
    update() {
      // Move particle (slow down for low performance devices)
      const movementScale = isLowPerformanceMobile() ? 0.7 : 1;
      this.x += this.speedX * movementScale;
      this.y += this.speedY * movementScale;

      // Bounce off edges
      if (this.x > this.width || this.x < 0) {
        this.speedX = -this.speedX;
      }
      if (this.y > this.height || this.y < 0) {
        this.speedY = -this.speedY;
      }
      
      // Slight random movement variation
      if (Math.random() > 0.9) {
        this.speedX += (Math.random() * 0.2 - 0.1);
        this.speedY += (Math.random() * 0.2 - 0.1);
      }
      
      // Keep speed in bounds
      this.speedX = Math.max(Math.min(this.speedX, 1.5), -1.5);
      this.speedY = Math.max(Math.min(this.speedY, 1.5), -1.5);
      
      // Update color based on current position
      this.color = this.getColor();
    }
    
    draw() {
      const ctx = this.context;
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
      ctx.closePath();
      
      // Draw glow effect
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(
        this.x, this.y, this.size,
        this.x, this.y, this.size * 3
      );
      gradient.addColorStop(0, this.color.replace(')', ', 0.3)'));
      gradient.addColorStop(1, this.color.replace(')', ', 0)'));
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.closePath();
      
      // Reset alpha
      ctx.globalAlpha = 1;
    }
  }
  
  const handleMouseMove = (event) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current.x = event.clientX - rect.left;
    mouseRef.current.y = event.clientY - rect.top;
  };
  
  const handleResize = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    // Recreate particles for new size
    particlesArray.current = [];
    init();
  };
  
  const init = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Adaptive particle count based on screen size and device performance
    const screenArea = canvas.width * canvas.height;
    let particleCount;

    // Check if mobile device
    const isMobile = window.innerWidth <= 768;

    // Check device memory for performance optimization
    const deviceMemory = window.navigator.deviceMemory || 4;

    // Automatic particle count adjustment
    if (isMobile) {
      // Mobile devices
      particleCount = Math.floor(screenArea / 20000); // Less particles on mobile

      // Further reduce for low memory devices
      if (deviceMemory <= 2) {
        particleCount = Math.floor(particleCount * 0.5);
      }
    } else {
      // Desktop devices
      particleCount = Math.floor(screenArea / 15000);

      // Adjust based on device memory
      if (deviceMemory >= 8) {
        particleCount = Math.floor(particleCount * 1.2); // More particles for high-end devices
      } else if (deviceMemory <= 2) {
        particleCount = Math.floor(particleCount * 0.7); // Less particles for low memory
      }
    }

    // Clamp between reasonable limits
    particleCount = Math.min(Math.max(particleCount, 30), 200);

    particlesArray.current = [];

    for (let i = 0; i < particleCount; i++) {
      particlesArray.current.push(new Particle(ctx, canvas.width, canvas.height));
    }
  };
  
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Performance optimization: skip frames on low FPS
    frameSkip.current += 1;
    const skipRate = isLowPerformanceMobile() ? 2 : 1;

    // Clear canvas with fade effect (adjust fade amount based on performance)
    const fadeAmount = skipRate === 2 ? 0.1 : 0.05;
    ctx.fillStyle = `rgba(15, 23, 42, ${fadeAmount})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particlesArray.current.forEach(particle => {
      particle.update();
      particle.draw();
    });

    // Draw connection lines between particles (less frequent on mobile)
    if (frameSkip.current % skipRate === 0) {
      drawConnections(ctx);
      drawMouseConnections(ctx);
    }

    animationId.current = requestAnimationFrame(animate);
  };
  
  const drawConnections = (ctx) => {
    const particles = particlesArray.current;
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Only connect particles within 100px
        if (distance < 100) {
          const opacity = 1 - (distance / 100);
          
          // Use gradient color between the two particles
          const gradient = ctx.createLinearGradient(
            particles[i].x, particles[i].y,
            particles[j].x, particles[j].y
          );
          gradient.addColorStop(0, particles[i].color.replace(')', ', ' + opacity * 0.3 + ')'));
          gradient.addColorStop(1, particles[j].color.replace(')', ', ' + opacity * 0.3 + ')'));
          
          ctx.beginPath();
          ctx.lineWidth = 1;
          ctx.strokeStyle = gradient;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  };
  
  const drawMouseConnections = (ctx) => {
    const particles = particlesArray.current;
    const mouse = mouseRef.current;
    
    particles.forEach(particle => {
      const dx = particle.x - mouse.x;
      const dy = particle.y - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < mouse.radius) {
        const opacity = 1 - (distance / mouse.radius);
        
        // Create gradient from particle to mouse
        const gradient = ctx.createLinearGradient(
          particle.x, particle.y,
          mouse.x, mouse.y
        );
        gradient.addColorStop(0, particle.color.replace(')', ', ' + opacity * 0.5 + ')'));
        gradient.addColorStop(1, colors.accent.replace(')', ', ' + opacity * 0.2 + ')'));
        
        // Draw connection line
        ctx.beginPath();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = gradient;
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
        ctx.closePath();
        
        // Draw mouse point
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = colors.accent.replace(')', ', ' + opacity * 0.5 + ')');
        ctx.fill();
        ctx.closePath();
      }
    });
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set initial size
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    // Initialize particles
    init();
    
    // Start animation
    animate();
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
      
      // Clear canvas
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      className="background-animation-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
}