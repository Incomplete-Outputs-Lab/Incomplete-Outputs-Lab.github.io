/**
 * Configuration file for Incomplete-Outputs-Lab Landing Page
 * Centralized data and constants for easy customization
 */

// Color Scheme
const COLORS = {
  terminal_green: '#00ff00',
  terminal_dim: '#003300',
  background: '#000000',
  text: '#cccccc'
};

// Project Definitions
const PROJECTS = [
  {
    name: 'obs-sync',
    fullName: 'Distributed OBS Synchronization System',
    status: '[ PHASE: UNDER DEVELOPMENT ]',
    description: '中〜大規模配信現場における、マルチインスタンスOBSの完全同期ソリューション。マスター/スレーブ構成による設定値のリアルタイム・ミラーリング。スレーブ側での予期せぬ変更を即座に検知し、インシデントを未然に防ぐ。',
    techStack: ['Rust', 'React', 'Tauri', 'WebSocket', 'obs-websocket'],
    type: 'software',
    githubUrl: 'https://github.com/Incomplete-Outputs-Lab/obs-sync'
  },
  {
    name: 'stream-monitor',
    fullName: 'Broadcast Statistics Analyzer',
    status: '[ PHASE: UNDER DEVELOPMENT ]',
    description: '配信データと視聴者体験を数値化する、エッジ動作型のアナリティクスエンジン。マルチビュー監視と並行し、コメント密度や視聴者情報をAPI経由で集積。DuckDB を採用したエッジDBにより、数百万件の統計データから盛り上がりの瞬間を即座に抽出。',
    techStack: ['Rust', 'React', 'Tauri', 'DuckDB', 'Webhooks'],
    type: 'software',
    githubUrl: 'https://github.com/Incomplete-Outputs-Lab/stream-monitor'
  },
  {
    name: 'bi-kanpe',
    fullName: 'Bi-directional cue / teleprompter app',
    status: '[ PHASE: ACTIVE ]',
    description: '双方向カンペアプリ。現場のニーズに応える柔軟性の高い無料カンペアプリ。',
    techStack: ['Rust', 'Tauri', 'TypeScript', 'WebSocket', 'StreamDeck'],
    type: 'software',
    githubUrl: 'https://github.com/Incomplete-Outputs-Lab/bi-kanpe'
  },
  {
    name: 'Iryx',
    fullName: 'IP control panels for broadcast software',
    status: '[ PHASE: R&D ]',
    description: '放送用ソフトウェア専用 IPコントロールパネル群。Embassy (Rust for embedded) を活用し、超低遅延なレスポンスを実現。基板設計からファームウェアまで一貫した自社開発。現在、vMix専用コントローラーを開発中。',
    techStack: ['Rust (Embassy)', 'Raspberry Pi 5/Pico', 'KiCad', 'NDI SDK'],
    type: 'hardware',
    lineup: [
      { name: 'VMTALLY', desc: '無線/有線ハイブリッド・タリーシステム' },
      { name: 'VMReplay', desc: 'ジョグ/シャトルを模したリプレイ特化インターフェース' },
      { name: 'VMSwitch', desc: 'スイッチングの触感に特化した実用モデル' },
      { name: 'VMDeluxe', desc: 'NDIによるPRV/PGMモニタリング機能を統合した最上位機' }
    ]
  }
];

// Member Definitions
const MEMBERS = [
  {
    name: '未成 (Misei)',
    role: 'Founder / Lead Architect',
    focus: ['Rust', 'Embedded Systems (Embassy)', 'Desktop Application', 'Distributed Systems', 'StreamDeck Plugins'],
    description: '未完成成果物研究所の主宰。配信現場の「不確実性」をコードで制御することに執着する。マイコンを用いたハードウェアからクラウドオーケストレーションまで、放送に関連する技術の全レイヤーを横断的に設計。',
    socials: {
      x: 'https://x.com/miseinul'
    }
  },
  {
    name: 'Shugo "Flowing" Kawamura',
    role: 'vmix-utility 開発者',
    focus: ['Backend', 'Frontend', 'Hardware', 'Desktop Application'],
    description: 'vmix-utility の開発者。バックエンド、フロントエンド、ハードウェア開発からデスクトップアプリの開発まで幅広く手がける。',
    socials: {
      github: 'https://github.com/FlowingSPDG/'
    }
  }
];

// Organization Identity
const ORGANIZATION_IDENTITY = {
  name_ja: '未完成成果物研究所',
  name_ja_short: '未成研',
  name_en: 'Incomplete-Outputs-Lab',
  tagline_en: 'Independent R&D Team / Broadcast production tooling',
  tagline_ja: 'Active Professionals\' Guild',
  about: '未完成成果物研究所は、未成が主導する配信プロダクション向け各種ツール・ハードウェア機材の研究開発チームです。2026年1月現在、全メンバーが兼業であり、メインの業務がある傍ら未成研で研究開発を行っています。'
};

// Animation Configuration
const ANIM_CONFIG = {
  waveform_duration: 3000,
  waveform_points: 100,
  background_paths: 5,
  background_points: 50,
  glitch_probability: 0.02,
  glitch_interval: 100,
  scanline_speed: 8000,
  pcb_trace_speed: 4000,
  pcb_node_count: 6,
  pcb_trace_count: 10,
  packet_update_interval: 500,
  packet_update_probability: 0.7
};

// Waveform Generation Helper
const WaveformHelper = {
  /**
   * Generate random sine wave with noise
   * @param {number} points - Number of points in the wave
   * @param {number} amplitude - Wave amplitude
   * @param {number} frequency - Wave frequency
   * @param {number} phase - Phase offset
   * @param {number} noise - Noise amount (0-1)
   * @returns {Array} Array of {x, y} coordinates
   */
  generateWave(points, amplitude, frequency, phase, noise = 0) {
    const wave = [];
    for (let i = 0; i < points; i++) {
      const x = (i / (points - 1)) * 100;
      const baseY = Math.sin((i / points) * Math.PI * 2 * frequency + phase) * amplitude;
      const noiseY = noise > 0 ? (Math.random() - 0.5) * noise * amplitude : 0;
      const y = 50 + baseY + noiseY;
      wave.push({ x, y });
    }
    return wave;
  },

  /**
   * Convert wave points to SVG path string
   * @param {Array} points - Array of {x, y} coordinates
   * @returns {string} SVG path d attribute
   */
  pointsToPath(points) {
    if (points.length === 0) return '';
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x} ${points[i].y}`;
    }
    return path;
  },

  /**
   * Generate oscilloscope-style waveform
   * @param {number} points - Number of points
   * @param {number} phase - Phase offset (0-360)
   * @returns {string} SVG path d attribute
   */
  generateOscilloscope(points, phase) {
    const wave = [];
    const phaseRad = (phase * Math.PI) / 180;
    for (let i = 0; i < points; i++) {
      const x = (i / (points - 1)) * 100;
      const t = (i / points) * Math.PI * 4 + phaseRad;
      const y = 50 + Math.sin(t) * 30 + Math.sin(t * 2.5) * 10;
      wave.push({ x, y });
    }
    return this.pointsToPath(wave);
  }
};

// PCB Circuit Helper
const PCBHelper = {
  /**
   * Generate PCB trace paths
   * @param {number} width - SVG width
   * @param {number} height - SVG height
   * @param {number} count - Number of traces
   * @returns {Array} Array of trace path strings
   */
  generateTraces(width, height, count) {
    const traces = [];
    const padding = 20;
    const usableWidth = width - padding * 2;
    const usableHeight = height - padding * 2;

    // Main signal flow traces (horizontal with vertical segments)
    for (let i = 0; i < count; i++) {
      const y = padding + (usableHeight / (count + 1)) * (i + 1);
      const segments = 3 + Math.floor(Math.random() * 3);
      let path = `M ${padding} ${y}`;

      let currentX = padding;
      for (let j = 0; j < segments; j++) {
        const segmentWidth = usableWidth / segments;
        const nextX = currentX + segmentWidth;
        const verticalOffset = (Math.random() - 0.5) * 30;

        // Horizontal segment
        path += ` L ${nextX - 10} ${y}`;
        // Vertical jog
        path += ` L ${nextX - 10} ${y + verticalOffset}`;
        // Continue horizontal
        path += ` L ${nextX} ${y + verticalOffset}`;

        currentX = nextX;
      }

      traces.push(path);
    }

    return traces;
  },

  /**
   * Generate component node positions
   * @param {number} width - SVG width
   * @param {number} height - SVG height
   * @param {number} count - Number of nodes
   * @returns {Array} Array of {x, y, type} objects
   */
  generateNodes(width, height, count) {
    const nodes = [];
    const padding = 40;
    const types = ['ic', 'resistor', 'capacitor', 'led'];

    for (let i = 0; i < count; i++) {
      const x = padding + (width - padding * 2) * (i / (count - 1));
      const y = height / 2 + (Math.random() - 0.5) * (height - padding * 2);
      const type = types[Math.floor(Math.random() * types.length)];
      nodes.push({ x, y, type });
    }

    return nodes;
  }
};
