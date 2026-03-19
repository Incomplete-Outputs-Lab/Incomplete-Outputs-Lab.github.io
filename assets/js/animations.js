/**
 * Animation Controller for Incomplete-Outputs-Lab Landing Page
 * Powered by anime.js
 */

// Animation State
let animationInstances = [];
let glitchInterval = null;
let scrollAnimationsInitialized = false;

/**
 * Create background waveform animations
 */
function createBackgroundWaveforms() {
  const svg = document.getElementById('waveform-svg');
  if (!svg) return;

  const width = window.innerWidth;
  const height = window.innerHeight;
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

  // Clear existing paths
  svg.innerHTML = '';

  // Create multiple layered waveforms
  for (let i = 0; i < ANIM_CONFIG.background_paths; i++) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const opacity = 0.3 - (i * 0.05);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', COLORS.terminal_green);
    path.setAttribute('stroke-width', '2');
    path.setAttribute('opacity', opacity.toString());

    svg.appendChild(path);

    // Initial wave
    const frequency = 2 + i * 0.5;
    const amplitude = height * 0.1;
    const noise = 0.2 + i * 0.05;

    // Animate waveform morphing
    const duration = ANIM_CONFIG.waveform_duration + i * 500;

    anime({
      targets: path,
      duration: duration,
      easing: 'linear',
      loop: true,
      update: function(anim) {
        const phase = (anim.progress / 100) * Math.PI * 2;
        const wave = WaveformHelper.generateWave(
          ANIM_CONFIG.background_points,
          amplitude,
          frequency,
          phase,
          noise
        );

        // Scale wave to viewport
        const scaledWave = wave.map(point => ({
          x: (point.x / 100) * width,
          y: (point.y / 100) * height
        }));

        path.setAttribute('d', WaveformHelper.pointsToPath(scaledWave));
      }
    });
  }

  // Random glitch effects
  if (glitchInterval) clearInterval(glitchInterval);
  glitchInterval = setInterval(() => {
    if (Math.random() < ANIM_CONFIG.glitch_probability) {
      svg.classList.add('glitch');
      setTimeout(() => svg.classList.remove('glitch'), 300);
    }
  }, ANIM_CONFIG.glitch_interval);
}

/**
 * Create waveform monitor animations for software projects
 */
function createProjectWaveforms() {
  const monitors = document.querySelectorAll('.waveform-monitor');

  monitors.forEach((monitor, index) => {
    const svg = monitor.querySelector('svg');
    if (!svg) return;

    const rect = monitor.getBoundingClientRect();
    const width = rect.width || 300;
    const height = rect.height || 200;

    svg.setAttribute('viewBox', `0 0 100 100`);
    svg.setAttribute('preserveAspectRatio', 'none');

    // Create waveform path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', COLORS.terminal_green);
    path.setAttribute('stroke-width', '1.5');
    svg.appendChild(path);

    // Create grid lines (optional enhancement)
    const gridGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    gridGroup.setAttribute('opacity', '0.1');

    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      const y = (i / 4) * 100;
      line.setAttribute('x1', '0');
      line.setAttribute('y1', y);
      line.setAttribute('x2', '100');
      line.setAttribute('y2', y);
      line.setAttribute('stroke', COLORS.terminal_green);
      line.setAttribute('stroke-width', '0.5');
      gridGroup.appendChild(line);
    }

    // Vertical grid lines
    for (let i = 0; i <= 4; i++) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      const x = (i / 4) * 100;
      line.setAttribute('x1', x);
      line.setAttribute('y1', '0');
      line.setAttribute('x2', x);
      line.setAttribute('y2', '100');
      line.setAttribute('stroke', COLORS.terminal_green);
      line.setAttribute('stroke-width', '0.5');
      gridGroup.appendChild(line);
    }

    svg.insertBefore(gridGroup, path);

    // Animate oscilloscope waveform
    const animInstance = anime({
      targets: { phase: 0 },
      phase: 360,
      duration: 2000,
      easing: 'linear',
      loop: true,
      update: function(anim) {
        const phase = anim.animations[0].currentValue;
        const pathData = WaveformHelper.generateOscilloscope(
          ANIM_CONFIG.waveform_points,
          phase
        );
        path.setAttribute('d', pathData);
      }
    });

    animationInstances.push(animInstance);
  });
}

/**
 * Create PCB circuit board animation for hardware projects
 */
function createPCBCircuitAnimation() {
  const circuits = document.querySelectorAll('.pcb-circuit');

  circuits.forEach((circuit, index) => {
    const svg = circuit.querySelector('svg');
    if (!svg) return;

    const rect = circuit.getBoundingClientRect();
    const width = rect.width || 300;
    const height = rect.height || 200;

    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.innerHTML = '';

    // Generate circuit traces
    const traces = PCBHelper.generateTraces(width, height, ANIM_CONFIG.pcb_trace_count);
    const nodes = PCBHelper.generateNodes(width, height, ANIM_CONFIG.pcb_node_count);

    // Create trace paths
    traces.forEach((tracePath, i) => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', tracePath);
      path.classList.add('trace');
      path.setAttribute('stroke', COLORS.terminal_green);
      path.setAttribute('stroke-width', '2');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('opacity', '0.6');

      // Calculate path length for dash animation
      svg.appendChild(path);
      const pathLength = path.getTotalLength();

      path.setAttribute('stroke-dasharray', pathLength);
      path.setAttribute('stroke-dashoffset', pathLength);

      // Animate signal flow
      const delay = i * (ANIM_CONFIG.pcb_trace_speed / traces.length);
      anime({
        targets: path,
        strokeDashoffset: [pathLength, 0],
        duration: ANIM_CONFIG.pcb_trace_speed,
        delay: delay,
        easing: 'easeInOutQuad',
        loop: true
      });
    });

    // Create component nodes
    nodes.forEach((node, i) => {
      let element;

      if (node.type === 'ic') {
        // IC chip (rectangle)
        element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        element.setAttribute('x', node.x - 8);
        element.setAttribute('y', node.y - 8);
        element.setAttribute('width', '16');
        element.setAttribute('height', '16');
        element.setAttribute('rx', '2');
      } else {
        // Other components (circle)
        element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        element.setAttribute('cx', node.x);
        element.setAttribute('cy', node.y);
        element.setAttribute('r', node.type === 'led' ? '5' : '4');
      }

      element.classList.add('component-node');
      element.setAttribute('fill', COLORS.terminal_green);
      element.setAttribute('opacity', '0.8');
      svg.appendChild(element);

      // Pulsing animation
      const delay = i * 300;
      anime({
        targets: element,
        scale: [1, 1.3, 1],
        opacity: [0.8, 1, 0.8],
        duration: 2000,
        delay: delay,
        easing: 'easeInOutSine',
        loop: true
      });

      // Add glow effect
      const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      if (node.type === 'ic') {
        // For IC, create a larger circle behind
        glow.setAttribute('cx', node.x);
        glow.setAttribute('cy', node.y);
      } else {
        glow.setAttribute('cx', node.x);
        glow.setAttribute('cy', node.y);
      }
      glow.setAttribute('r', '8');
      glow.setAttribute('fill', COLORS.terminal_green);
      glow.setAttribute('opacity', '0.2');
      svg.insertBefore(glow, element);

      anime({
        targets: glow,
        scale: [1, 1.5, 1],
        opacity: [0.2, 0.05, 0.2],
        duration: 2000,
        delay: delay,
        easing: 'easeInOutSine',
        loop: true
      });
    });

    // Add connection lines between nodes
    for (let i = 0; i < nodes.length - 1; i++) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', nodes[i].x);
      line.setAttribute('y1', nodes[i].y);
      line.setAttribute('x2', nodes[i + 1].x);
      line.setAttribute('y2', nodes[i + 1].y);
      line.setAttribute('stroke', COLORS.terminal_dim);
      line.setAttribute('stroke-width', '1');
      line.setAttribute('opacity', '0.3');
      line.setAttribute('stroke-dasharray', '3,3');
      svg.insertBefore(line, svg.firstChild);
    }

    // Add labels
    const labels = [
      { text: 'RPi GPIO', x: 30, y: 20 },
      { text: 'CONTROL', x: width / 2 - 20, y: height - 15 },
      { text: 'NDI OUT', x: width - 50, y: 20 }
    ];

    labels.forEach(label => {
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', label.x);
      text.setAttribute('y', label.y);
      text.setAttribute('fill', COLORS.terminal_green);
      text.setAttribute('opacity', '0.5');
      text.setAttribute('font-size', '8');
      text.setAttribute('font-family', 'IBM Plex Mono, monospace');
      text.textContent = label.text;
      svg.appendChild(text);
    });
  });
}

/**
 * Create packet glitch effect
 */
function createPacketGlitch() {
  const elements = document.querySelectorAll('.packet-glitch');

  elements.forEach(element => {
    setInterval(() => {
      if (Math.random() < ANIM_CONFIG.packet_update_probability) {
        const hex = Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase().padStart(6, '0');
        element.textContent = `0x${hex}`;

        // Flash animation
        anime({
          targets: element,
          opacity: [1, 0.3, 1],
          duration: 200,
          easing: 'easeInOutQuad'
        });
      }
    }, ANIM_CONFIG.packet_update_interval);
  });
}

/**
 * Enhance scanline effect with subtle opacity variation
 */
function enhanceScanline() {
  const scanline = document.getElementById('scanline-overlay');
  if (!scanline) return;

  anime({
    targets: scanline,
    opacity: [0.03, 0.07, 0.03],
    duration: 5000,
    easing: 'easeInOutSine',
    loop: true
  });
}

/**
 * Create hero entrance animation
 */
function createHeroEntrance() {
  const header = document.getElementById('hero-header');
  if (!header) return;

  const title = header.querySelector('h1');
  const subtitles = header.querySelectorAll('p');
  const githubLink = header.querySelector('a[href*="github.com"]');

  // Title dramatic entrance
  anime({
    targets: title,
    opacity: [0, 1],
    translateY: [-50, 0],
    scale: [0.8, 1],
    duration: 1500,
    easing: 'easeOutElastic(1, .8)',
  });

  // Staggered subtitle entrance
  anime({
    targets: subtitles,
    opacity: [0, 1],
    translateX: [-30, 0],
    duration: 1000,
    delay: anime.stagger(200, {start: 500}),
    easing: 'easeOutQuad'
  });

  // GitHub link entrance
  if (githubLink) {
    anime({
      targets: githubLink.parentElement,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      delay: 1200,
      easing: 'easeOutQuad'
    });
  }
}

/**
 * Create project cards entrance animation
 */
function createProjectCardsAnimation() {
  const cards = document.querySelectorAll('.project-card');

  anime({
    targets: cards,
    opacity: [0, 1],
    translateY: [50, 0],
    rotateX: [10, 0],
    duration: 1200,
    delay: anime.stagger(200, {start: 300}),
    easing: 'easeOutExpo'
  });

  // Add hover effect enhancement with anime.js
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      anime({
        targets: card,
        scale: 1.005,
        boxShadow: [
          '0 0 8px rgba(0, 255, 0, 0.08)',
          '0 0 18px rgba(0, 255, 0, 0.14)'
        ],
        duration: 300,
        easing: 'easeOutQuad'
      });
    });

    card.addEventListener('mouseleave', () => {
      anime({
        targets: card,
        scale: 1,
        boxShadow: [
          '0 0 18px rgba(0, 255, 0, 0.14)',
          '0 0 8px rgba(0, 255, 0, 0.08)'
        ],
        duration: 300,
        easing: 'easeOutQuad'
      });
    });
  });

  // Animate GitHub icons
  const githubIcons = document.querySelectorAll('a[title="View on GitHub"] svg');
  anime({
    targets: githubIcons,
    rotate: [0, 360],
    duration: 2000,
    delay: anime.stagger(300, {start: 1500}),
    easing: 'easeInOutQuad',
    complete: function() {
      // Add subtle pulse animation after initial rotation
      anime({
        targets: githubIcons,
        scale: [1, 1.1, 1],
        duration: 2000,
        delay: anime.stagger(500),
        easing: 'easeInOutQuad',
        loop: true
      });
    }
  });
}

/**
 * Create members section animation
 */
function createMembersAnimation() {
  const memberCards = document.querySelectorAll('.member-card');

  anime({
    targets: memberCards,
    opacity: [0, 1],
    scale: [0.8, 1],
    rotate: [-5, 0],
    duration: 800,
    delay: anime.stagger(150),
    easing: 'easeOutBack'
  });
}

/**
 * Create capabilities animation
 */
function createCapabilitiesAnimation() {
  const items = document.querySelectorAll('.capability-item');

  anime({
    targets: items,
    opacity: [0, 1],
    translateX: [-50, 0],
    duration: 600,
    delay: anime.stagger(100, {start: 200}),
    easing: 'easeOutQuad'
  });

  // Add pulse effect to arrow symbols
  items.forEach(item => {
    const arrow = item.querySelector('span:first-child');
    anime({
      targets: arrow,
      scale: [1, 1.2, 1],
      duration: 2000,
      delay: anime.random(0, 1000),
      easing: 'easeInOutQuad',
      loop: true
    });
  });
}

/**
 * Create COMING SOON animation
 */
function createComingSoonAnimation() {
  const comingSoon = document.querySelectorAll('.coming-soon-display span');

  comingSoon.forEach(element => {
    // Typing effect
    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = 1;

    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex < text.length) {
        element.textContent += text[charIndex];
        charIndex++;

        // Random glitch effect during typing
        if (Math.random() < 0.1) {
          anime({
            targets: element,
            translateX: [
              {value: -2, duration: 50},
              {value: 2, duration: 50},
              {value: 0, duration: 50}
            ],
            easing: 'easeInOutQuad'
          });
        }
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    // Continuous pulse after typing
    setTimeout(() => {
      anime({
        targets: element,
        scale: [1, 1.05, 1],
        duration: 2000,
        easing: 'easeInOutQuad',
        loop: true
      });
    }, text.length * 100 + 500);
  });
}

/**
 * Create scroll-triggered animations
 */
function createScrollAnimations() {
  if (scrollAnimationsInitialized) return;
  scrollAnimationsInitialized = true;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;

        // Animate based on section
        if (target.id === 'members') {
          createMembersAnimation();
        } else if (target.id === 'capabilities') {
          createCapabilitiesAnimation();
        }

        // Unobserve after animation
        observer.unobserve(target);
      }
    });
  }, {
    threshold: 0.2
  });

  // Observe sections
  const sections = document.querySelectorAll('#members, #capabilities');
  sections.forEach(section => observer.observe(section));
}

/**
 * Create dramatic background pulse
 */
function createBackgroundPulse() {
  const background = document.getElementById('background-visual');
  if (!background) return;

  anime({
    targets: background,
    opacity: [0.08, 0.14, 0.08],
    duration: 8000,
    easing: 'easeInOutQuad',
    loop: true
  });
}

/**
 * Initialize all animations
 */
function initAnimations() {
  // Clear existing animations
  animationInstances.forEach(instance => {
    if (instance && instance.pause) {
      instance.pause();
    }
  });
  animationInstances = [];

  if (glitchInterval) {
    clearInterval(glitchInterval);
  }

  // Create animations
  createBackgroundWaveforms();
  createBackgroundPulse();
  createProjectWaveforms();
  createPCBCircuitAnimation();
  createPacketGlitch();
  enhanceScanline();

  // Hero entrance
  createHeroEntrance();

  // Project cards with stagger
  setTimeout(() => {
    createProjectCardsAnimation();
  }, 800);

  // Coming Soon animation
  setTimeout(() => {
    createComingSoonAnimation();
  }, 1500);

  // Scroll-triggered animations
  createScrollAnimations();
}

/**
 * Debounce function for resize events
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Handle window resize
 */
const handleResize = debounce(() => {
  createBackgroundWaveforms();
  createPCBCircuitAnimation();
}, 250);

/**
 * Check for reduced motion preference
 */
function checkReducedMotion() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    console.log('Reduced motion preference detected - animations simplified');
  }
  return prefersReducedMotion;
}

/**
 * DOM Ready Event Listener
 */
document.addEventListener('DOMContentLoaded', () => {
  // Check accessibility preferences
  checkReducedMotion();

  // Initialize animations
  initAnimations();

  // Add resize listener
  window.addEventListener('resize', handleResize);

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    animationInstances.forEach(instance => {
      if (instance && instance.pause) {
        instance.pause();
      }
    });
    if (glitchInterval) {
      clearInterval(glitchInterval);
    }
  });

  // Log initialization
  console.log('%c未完成成果物研究所 (aka. 未成研)', 'color: #00ff00; font-size: 20px; font-family: monospace;');
  console.log('%cIncomplete-Outputs-Lab Landing Page Initialized', 'color: #00ff00; font-family: monospace;');
  console.log('%cIndependent R&D team', 'color: #cccccc; font-family: monospace;');
});
