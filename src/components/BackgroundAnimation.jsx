import { useEffect, useRef } from 'react';
import './BackgroundAnimation.css';

export default function BackgroundAnimation() {
  const canvasRef = useRef(null);
  const animationId = useRef(null);
  const particlesArray = useRef([]);
  const frameSkip = useRef(0);
  
  // Helper function to detect low-performance mobile devices
  const isLowPerformanceMobile = () => {
    const isMobile = window.innerWidth <= 768;
    const deviceMemory = window.navigator.deviceMemory || 4;
    return isMobile && deviceMemory <= 2;
  };
  
  class WaterDroplet {
    constructor(context, width, height) {
      this.context = context;
      this.width = width;
      this.height = height;
      
      // Random position
      this.x = Math.random() * this.width;
      this.y = Math.random() * this.height;
      
      // Start with small size, will grow
      this.size = Math.random() * 3 + 1;
      this.maxSize = Math.random() * 15 + 8;
      this.growthRate = Math.random() * 0.08 + 0.02;
      
      // Mostly stationary until it gets heavy
      this.speedX = 0;
      this.speedY = 0;
      
      // Gravity kicks in when droplet is big enough
      this.gravity = 0.01;
      this.mass = this.size;
      
      // For merging detection
      this.merged = false;
      
      // Slight wobble effect
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = Math.random() * 0.02 + 0.01;
    }
    
    update() {
      if (this.merged) return;
      
      // Grow droplet over time
      if (this.size < this.maxSize) {
        this.size += this.growthRate;
        this.mass = this.size;
      }
      
      // When droplet is big enough, it starts to slide down
      if (this.size > 5) {
        this.speedY += this.gravity * (this.mass / 10);
        
        // Add slight sideways drift
        this.wobble += this.wobbleSpeed;
        this.speedX = Math.sin(this.wobble) * 0.1;
      }
      
      // Apply movement
      this.x += this.speedX;
      this.y += this.speedY;
      
      // Reset when droplet goes off screen
      if (this.y > this.height + 20) {
        this.y = -10;
        this.x = Math.random() * this.width;
        this.size = Math.random() * 3 + 1;
        this.maxSize = Math.random() * 15 + 8;
        this.speedY = 0;
        this.speedX = 0;
      }
      
      // Keep within horizontal bounds
      if (this.x < 0) this.x = 0;
      if (this.x > this.width) this.x = this.width;
    }
    
    draw() {
      const ctx = this.context;
      
      // Main droplet body with gradient for glass effect
      const gradient = ctx.createRadialGradient(
        this.x - this.size * 0.3,
        this.y - this.size * 0.3,
        0,
        this.x,
        this.y,
        this.size
      );
      
      // Water droplet colors - translucent with slight tint
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
      gradient.addColorStop(0.3, 'rgba(180, 230, 255, 0.25)');
      gradient.addColorStop(0.7, 'rgba(100, 200, 255, 0.15)');
      gradient.addColorStop(1, 'rgba(100, 180, 230, 0.1)');
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add highlight for 3D effect
      const highlight = ctx.createRadialGradient(
        this.x - this.size * 0.4,
        this.y - this.size * 0.4,
        0,
        this.x - this.size * 0.4,
        this.y - this.size * 0.4,
        this.size * 0.5
      );
      highlight.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
      highlight.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.beginPath();
      ctx.arc(this.x - this.size * 0.3, this.y - this.size * 0.3, this.size * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = highlight;
      ctx.fill();
      
      // Outer glow/blur for soft edges
      const blur = ctx.createRadialGradient(
        this.x, this.y, this.size * 0.8,
        this.x, this.y, this.size * 1.3
      );
      blur.addColorStop(0, 'rgba(200, 230, 255, 0.1)');
      blur.addColorStop(1, 'rgba(200, 230, 255, 0)');
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 1.2, 0, Math.PI * 2);
      ctx.fillStyle = blur;
      ctx.fill();
      
      ctx.closePath();
    }
    
    // Check if this droplet can merge with another
    canMergeWith(other) {
      if (this.merged || other.merged) return false;
      
      const dx = this.x - other.x;
      const dy = this.y - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      return distance < (this.size + other.size) * 0.7;
    }
    
    // Merge with another droplet
    mergeWith(other) {
      // New position is weighted average
      const totalMass = this.mass + other.mass;
      this.x = (this.x * this.mass + other.x * other.mass) / totalMass;
      this.y = (this.y * this.mass + other.y * other.mass) / totalMass;
      
      // Combine sizes (volume-based)
      const newVolume = Math.PI * this.size * this.size + Math.PI * other.size * other.size;
      this.size = Math.sqrt(newVolume / Math.PI);
      this.maxSize = Math.max(this.maxSize, other.maxSize, this.size + 5);
      this.mass = this.size;
      
      // Average speeds
      this.speedY = (this.speedY * this.mass + other.speedY * other.mass) / totalMass;
      
      // Mark the other droplet as merged
      other.merged = true;
    }
  }
  
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
      particlesArray.current.push(new WaterDroplet(ctx, canvas.width, canvas.height));
    }
  };
  
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Clear canvas completely for water droplet effect
    ctx.fillStyle = 'rgba(15, 23, 42, 0.02)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Check for merging droplets
    const activeDroplets = particlesArray.current.filter(d => !d.merged);
    
    for (let i = 0; i < activeDroplets.length; i++) {
      for (let j = i + 1; j < activeDroplets.length; j++) {
        if (activeDroplets[i].canMergeWith(activeDroplets[j])) {
          activeDroplets[i].mergeWith(activeDroplets[j]);
        }
      }
    }

    // Update and draw droplets
    particlesArray.current.forEach(droplet => {
      if (!droplet.merged) {
        droplet.update();
        droplet.draw();
      }
    });

    // Clean up merged droplets occasionally
    if (frameSkip.current % 100 === 0) {
      particlesArray.current = particlesArray.current.filter(d => !d.merged);
      
      // Add new droplets to replace merged ones
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      while (particlesArray.current.length < 60) {
        particlesArray.current.push(new WaterDroplet(ctx, canvas.width, canvas.height));
      }
    }

    frameSkip.current += 1;
    animationId.current = requestAnimationFrame(animate);
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
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
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