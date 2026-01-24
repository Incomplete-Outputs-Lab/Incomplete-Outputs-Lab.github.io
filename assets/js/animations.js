/**
 * Animation Controller for Incomplete-Outputs-Lab Landing Page
 * Powered by anime.js
 */

// Animation State
let animationInstances = [];
let glitchInterval = null;

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
    opacity: [0.1, 0.2, 0.1],
    duration: 5000,
    easing: 'easeInOutSine',
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
  createProjectWaveforms();
  createPCBCircuitAnimation();
  createPacketGlitch();
  enhanceScanline();
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
  console.log('%c未完成成果物研究所', 'color: #00ff00; font-size: 20px; font-family: monospace;');
  console.log('%cIncomplete-Outputs-Lab Landing Page Initialized', 'color: #00ff00; font-family: monospace;');
  console.log('%cNon-profit Technical Community', 'color: #cccccc; font-family: monospace;');
});
