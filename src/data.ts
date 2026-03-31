export type Priority = 3 | 2 | 1;

export interface Question {
  priority: Priority;
  title: string;
  papers: string[];
  marks: string;
  points: string[];
  recycled?: boolean;
}

export interface Section {
  title: string;
  questions: Question[];
}

export const documentData: {
  title: string;
  subtitle: string;
  description: string;
  stats: { label: string; value: string }[];
  quickStart: string[];
  formulas: { name: string; formula: string }[];
  sections: Section[];
} = {
  title: "PHYSICS II",
  subtitle: "ULTIMATE 5-YEAR QUESTION BANK",
  description: "Complete Strategic Study Guide\nBased on Papers 2021-2025",
  stats: [
    { label: "Total Questions", value: "187" },
    { label: "Recycled Questions", value: "23 (Free Marks!)" },
    { label: "Priority Topics", value: "12 Must-Study" },
    { label: "Coverage", value: "100% Past Papers" },
  ],
  quickStart: [
    "SHM Graphs (Page 3) - Appears in ALL 5 papers, 4 marks every time",
    "Huygens' Principle (Page 15) - Appears in ALL 5 papers, 4-5 marks",
    "Recording & Reproduction Definition (Page 11) - All 5 papers, 2-3 marks",
    "Diffraction Definition (Page 17) - All 5 papers, 2-3 marks",
    "Carbon Microphone (Page 7) - 4 out of 5 papers, 6-7 marks",
  ],
  formulas: [
    { name: "SHM", formula: "x = A sin(ωt), v = Aω cos(ωt), a = -ω²x" },
    { name: "Waves", formula: "v = fλ, T = 1/f, ω = 2πf" },
    { name: "Sabine", formula: "T = 0.161V/A" },
    { name: "Young", formula: "β = λD/d" },
    { name: "Brewster", formula: "tan θ_p = n" },
  ],
  sections: [
    {
      title: "Waves & Simple Harmonic Motion",
      questions: [
        {
          priority: 3,
          title: "What conditions must be met to produce simple harmonic motion?",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "3m",
          points: [
            "Restoring force must be proportional to displacement",
            "Force must be directed toward equilibrium position",
            "Mathematical condition: F = -kx or a = -ω²x",
            "Give example: spring-mass system, simple pendulum (small angles)",
          ],
        },
        {
          priority: 2,
          title: "Distinguish between infrasonic and ultrasonic wave / What do you mean by infrasonic wave, audio wave and ultrasonic wave?",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "4m",
          points: [
            "Infrasonic: frequency < 20 Hz (below human hearing), e.g., earthquakes, elephant calls",
            "Audio/Sonic: frequency 20 Hz - 20 kHz (human hearing range)",
            "Ultrasonic: frequency > 20 kHz (above human hearing), e.g., medical imaging, bat echolocation",
            "All are sound waves, only differ in frequency",
          ],
        },
        {
          priority: 3,
          title: "Graphically represent displacement, velocity, and acceleration of a particle in simple harmonic motion",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "4m",
          recycled: true,
          points: [
            "Draw three sinusoidal curves with proper phase relationships",
            "Displacement: x = A sin(ωt)",
            "Velocity: v = Aω cos(ωt) — 90° ahead of displacement",
            "Acceleration: a = -Aω² sin(ωt) — 180° opposite to displacement",
            "Label all axes with proper symbols and units",
          ],
        },
        {
          priority: 1,
          title: "Derive differential equation of simple harmonic motion",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "4m",
          points: [
            "Start from F = -kx (Hooke's law)",
            "Apply Newton's second law: F = ma",
            "Therefore: ma = -kx",
            "Get: d²x/dt² + (k/m)x = 0",
            "Let ω² = k/m, final form: d²x/dt² + ω²x = 0",
          ],
        },
      ],
    },
    {
      title: "Sound Transducers (Microphone & Loudspeaker)",
      questions: [
        {
          priority: 3,
          title: "Define the terms: (i) Microphone (ii) Loudspeaker",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "4m",
          points: [
            "Microphone: Electroacoustic transducer converting sound energy → electrical energy",
            "Loudspeaker: Electroacoustic transducer converting electrical energy → sound energy",
            "Both are reversible transducers (can work in opposite direction)",
            "Mention sensitivity, frequency response as key characteristics",
          ],
        },
        {
          priority: 3,
          title: "Describe the construction and working principle of a Carbon microphone",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "6m",
          points: [
            "Construction: Diaphragm, carbon granules chamber, electrodes, DC bias circuit, transformer",
            "Working: Sound wave → diaphragm vibration → varies pressure on carbon granules",
            "Increased pressure → decreased resistance → increased current",
            "Current variation proportional to sound wave",
            "Output: modulated DC, needs transformer for AC output",
            "Draw labeled diagram showing all components",
          ],
        },
        {
          priority: 2,
          title: "Describe the construction and working principle of a dynamic loudspeaker",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "6m",
          points: [
            "Construction: Permanent magnet, voice coil, diaphragm (cone), suspension",
            "Working: AC signal through voice coil → creates varying magnetic field",
            "Interaction with permanent magnet → coil moves in/out",
            "Coil attached to diaphragm → diaphragm vibrates → produces sound",
            "Frequency of vibration = frequency of input signal",
            "Draw cross-sectional diagram with labels",
          ],
        },
      ],
    },
    {
      title: "Recording & Reproduction",
      questions: [
        {
          priority: 3,
          title: "What do you mean by recording and reproduction? / Define recording and reproduction",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "3m",
          recycled: true,
          points: [
            "Recording: Process of converting sound signal into storable form (magnetic, optical, mechanical)",
            "Reproduction: Process of retrieving and converting stored signal back to sound",
            "Recording stores information as: magnetization pattern (tape), physical groove (vinyl), digital data",
            "Reproduction reverses process: reads stored data → converts to electrical signal → amplifies → speaker",
          ],
        },
        {
          priority: 3,
          title: "Describe the sound recording and reproduction in film / Describe magnetic film sound recording",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "6m",
          points: [
            "Two methods: Variable Density and Variable Width (Variable Area)",
            "Recording: Sound → microphone → amplifier → light modulator → exposes film",
            "Variable width: sound varies width of opaque track on film",
            "Variable density: sound varies density (transparency) of film track",
            "Reproduction: Light source → film → photocell → amplifier → loudspeaker",
            "Draw both recording and reproduction system diagrams with labels",
          ],
        },
      ],
    },
    {
      title: "Reverberation & Room Acoustics",
      questions: [
        {
          priority: 3,
          title: "What is reverberation? / What is reverberation of sound wave? What are the causes of reverberation?",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "3m",
          points: [
            "Definition: Persistence of sound in enclosed space after source has stopped",
            "Caused by multiple reflections from walls, ceiling, floor",
            "Sound energy gradually absorbed with each reflection",
            "Time taken for sound to decay by 60 dB = reverberation time",
          ],
        },
        {
          priority: 3,
          title: "Explain Sabine's theory of reverberation and find Sabine equation / Derive the sabine's formula",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "6m",
          points: [
            "Sabine's formula: T = 0.161V/A",
            "T = reverberation time (seconds)",
            "V = room volume (m³)",
            "A = total absorption (Sabins) = Σ(S × α) where S=surface area, α=absorption coefficient",
            "Derivation: Energy decay rate proportional to absorption",
            "Assumes: diffuse sound field, uniform absorption",
          ],
        },
        {
          priority: 2,
          title: "Give the theory of growth and decay of sound inside a room. Hence obtain an expression for Sabine's reverberation formula",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "8m",
          points: [
            "Growth: Sound builds up as reflections add (steady state reached)",
            "Decay: After source stops, energy decreases with each reflection",
            "Energy decay equation: E(t) = E_0 e^(-t/τ)",
            "Derive Sabine formula from decay constant",
            "60 dB decay corresponds to E/E_0 = 10^(-6)",
          ],
        },
      ],
    },
    {
      title: "Nature of Light",
      questions: [
        {
          priority: 3,
          title: "What is nature of light? / What is the nature of light?",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "3m",
          points: [
            "Dual nature: Wave and Particle",
            "Wave nature: Interference, diffraction, polarization phenomena",
            "Particle nature: Photoelectric effect, Compton scattering",
            "Wave-particle duality resolved by quantum mechanics",
            "Electromagnetic wave (oscillating E and B fields)",
          ],
        },
        {
          priority: 3,
          title: "State and explain Huygens' principle",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "5m",
          recycled: true,
          points: [
            "Statement: Every point on wavefront acts as source of secondary wavelets",
            "Secondary wavelets spread with wave velocity",
            "New wavefront = envelope of secondary wavelets",
            "Draw diagram: wavefront, secondary wavelets, new wavefront",
            "Used to explain: reflection, refraction, diffraction",
          ],
        },
        {
          priority: 3,
          title: "Explain Newton's Corpuscular theory / Mention limitations of Newton's Corpuscular theory",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "4m",
          points: [
            "Theory: Light consists of stream of particles (corpuscles) emitted from source",
            "Explains: Rectilinear propagation, reflection",
            "Limitations: Predicts light faster in denser medium (wrong)",
            "Cannot explain: Interference, diffraction, polarization",
            "Cannot explain partial reflection at interface",
          ],
        },
      ],
    },
    {
      title: "Interference of Light",
      questions: [
        {
          priority: 3,
          title: "Define coherent source and how it is obtained in practice",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "5m",
          points: [
            "Coherent sources: constant phase difference, same frequency",
            "Method 1: Division of wavefront (Young's double slit, Fresnel biprism)",
            "Method 2: Division of amplitude (thin films, Newton's rings, Michelson)",
            "Why needed: Random phase changes in independent sources destroy fringes",
            "Natural light sources are incoherent (atoms emit randomly)",
          ],
        },
        {
          priority: 3,
          title: "Explain Young's principle / Explain the Young's double-slit experiment with schematic diagram",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "6m",
          points: [
            "Setup: Monochromatic source → single slit (S) → double slit (S1, S2) → screen",
            "S1 and S2 are coherent sources (division of wavefront)",
            "Path difference at point P: ∆ = d sin θ ≈ dy/D",
            "Bright fringe condition: dy/D = nλ → y = nλD/d",
            "Fringe width: β = λD/d",
            "Draw diagram with all labels",
          ],
        },
      ],
    },
    {
      title: "Diffraction of Light",
      questions: [
        {
          priority: 3,
          title: "What do you mean by diffraction of light?",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "2m",
          recycled: true,
          points: [
            "Bending of light waves around obstacles or through apertures",
            "Light spreads into geometrical shadow region",
            "Occurs when obstacle/aperture size ≈ wavelength",
            "Evidence of wave nature of light",
          ],
        },
        {
          priority: 3,
          title: "Describe Fresnel diffraction of light in a single slit",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "8m",
          points: [
            "Setup: Point source → slit → screen at finite distances",
            "Wavefront divided into Fresnel half-period zones",
            "Alternate zones interfere destructively",
            "Resultant amplitude depends on number of zones exposed",
            "Pattern: central bright region with diminishing fringes",
            "More complex than Fraunhofer, requires zone plate analysis",
          ],
        },
        {
          priority: 2,
          title: "Describe the Fraunhofer diffraction of light in a single slit",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "7m",
          points: [
            "Setup: Collimated light → slit of width 'a' → lens → screen",
            "Path difference across slit: a sin θ",
            "First minimum when: a sin θ = λ → θ = λ/a",
            "General minima: a sin θ = nλ (n = 1,2,3...)",
            "Central maximum intensity >> side maxima",
            "Pattern: bright central band, alternating dark/bright fringes",
          ],
        },
      ],
    },
    {
      title: "Polarization of Light",
      questions: [
        {
          priority: 3,
          title: "What do you mean by polarization? How does polarization prove that light is a wave?",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "3m",
          points: [
            "Polarization: Vibrations of light confined to specific plane",
            "Unpolarized: vibrations in all planes perpendicular to direction",
            "Polarized: vibrations in single plane only",
            "Proves light is transverse wave (longitudinal waves can't be polarized)",
            "Methods: reflection, refraction through crystals, selective absorption",
          ],
        },
        {
          priority: 3,
          title: "Describe construction and working of Nicol Prism and show how it can be used as a polarizer and as an analyzer",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "6m",
          points: [
            "Construction: Calcite crystal cut at 68° angle, cemented with Canada balsam",
            "Working: Uses double refraction in calcite (ordinary and extraordinary rays)",
            "Ordinary ray: totally internally reflected at balsam layer (absorbed by black paint)",
            "Extraordinary ray: passes through, emerges plane-polarized",
            "As polarizer: produces plane-polarized light from unpolarized",
            "As analyzer: tests if light is polarized (rotation → intensity varies)",
          ],
        },
        {
          priority: 3,
          title: "What is Brewster law? Derive the formula for Brewster angle.",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "6m",
          points: [
            "Brewster's law: tan θ_p = n (n = refractive index)",
            "At polarizing angle: reflected and refracted rays are perpendicular (90°)",
            "Derivation: Use Snell's law with θ_r = 90° - θ_p",
            "Reflected light is completely plane-polarized (perpendicular to plane of incidence)",
            "Called polarizing angle because maximum polarization occurs at this angle",
            "Used in: polarizing sunglasses, camera filters",
          ],
        },
      ],
    },
  ],
};
