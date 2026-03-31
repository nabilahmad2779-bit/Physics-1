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
      title: "Chapter 1: Wave Motion & Simple Harmonic Motion",
      questions: [
        {
          priority: 3,
          title: "Graphically represent displacement, velocity and acceleration of a vibrating particle in simple harmonic motion.",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "5m",
          points: [
            "Draw three sinusoidal curves with proper phase relationships",
            "Displacement: x = A sin(ωt)",
            "Velocity: v = Aω cos(ωt) — 90° ahead of displacement",
            "Acceleration: a = -Aω² sin(ωt) — 180° opposite to displacement",
            "Label all axes with proper symbols and units",
          ],
        },
        {
          priority: 3,
          title: "Derive an expression for kinetic energy of a vibrating particle in simple harmonic motion.",
          papers: ["P1", "P2", "P3", "P4"],
          marks: "4m",
          points: [
            "Velocity v = ω√(A² - x²)",
            "Kinetic Energy KE = 1/2 mv²",
            "Substitute v: KE = 1/2 mω²(A² - x²)",
            "Maximum KE at mean position (x=0): KE_max = 1/2 mω²A²",
            "Minimum KE at extreme position (x=A): KE_min = 0",
          ],
        },
        {
          priority: 3,
          title: "Derive the differential equation of simple harmonic motion.",
          papers: ["P1", "P2", "P3", "P4"],
          marks: "4m",
          points: [
            "Start from F = -kx (Hooke's law)",
            "Apply Newton's second law: F = ma",
            "Therefore: ma = -kx",
            "Get: d²x/dt² + (k/m)x = 0",
            "Let ω² = k/m, final form: d²x/dt² + ω²x = 0",
          ],
        },
        {
          priority: 2,
          title: "Define wave, transverse wave and longitudinal wave with examples.",
          papers: ["P1", "P2", "P3"],
          marks: "3m",
          points: [
            "Wave: A disturbance that travels through a medium, transporting energy without transporting matter.",
            "Transverse wave: Particles vibrate perpendicular to the direction of wave propagation. Example: Light waves, waves on a string.",
            "Longitudinal wave: Particles vibrate parallel to the direction of wave propagation. Example: Sound waves in air.",
          ],
        },
        {
          priority: 2,
          title: "What is wave motion? Find the general equation of wave motion.",
          papers: ["P1", "P2", "P3"],
          marks: "3m",
          points: [
            "Wave motion is the transfer of energy and momentum from one point to another through a medium without actual transport of matter.",
            "General equation: y = f(x - vt) for a wave traveling in +x direction.",
            "For a harmonic wave: y(x,t) = A sin(kx - ωt + φ)",
            "Where A is amplitude, k is wave number (2π/λ), ω is angular frequency (2πf).",
          ],
        },
        {
          priority: 2,
          title: "Distinguish between infrasonic, audio and ultrasonic waves (with examples).",
          papers: ["P1", "P2", "P3"],
          marks: "3m",
          points: [
            "Infrasonic: frequency < 20 Hz (below human hearing), e.g., earthquakes, elephant calls",
            "Audio/Sonic: frequency 20 Hz - 20 kHz (human hearing range)",
            "Ultrasonic: frequency > 20 kHz (above human hearing), e.g., medical imaging, bat echolocation",
            "All are sound waves, only differ in frequency",
          ],
        },
        {
          priority: 2,
          title: "Draw a sine wave of 50 Hz and 220 V.",
          papers: ["P1", "P2", "P3"],
          marks: "3m",
          points: [
            "Draw a sinusoidal curve.",
            "Label the vertical axis as Voltage (V) with peak amplitude V_m = 220√2 ≈ 311V.",
            "Label the horizontal axis as Time (t).",
            "Mark one complete cycle (period) T = 1/f = 1/50 = 0.02 seconds (or 20 ms).",
          ],
        },
        {
          priority: 1,
          title: "What is the difference between plane wave and spherical wave?",
          papers: ["P1", "P2"],
          marks: "2m",
          points: [
            "Plane wave: Wavefronts are parallel planes. Produced by a source at infinity.",
            "Spherical wave: Wavefronts are concentric spheres. Produced by a point source in an isotropic medium.",
            "Intensity of plane wave remains constant, while intensity of spherical wave decreases as 1/r².",
          ],
        },
        {
          priority: 1,
          title: "What conditions must be met to produce simple harmonic motion?",
          papers: ["P1", "P2"],
          marks: "2m",
          points: [
            "Restoring force must be proportional to displacement",
            "Force must be directed toward equilibrium position",
            "Mathematical condition: F = -kx or a = -ω²x",
          ],
        },
        {
          priority: 1,
          title: "With example define simple harmonic motion.",
          papers: ["P1", "P2"],
          marks: "2m",
          points: [
            "SHM is a special type of periodic motion where the restoring force is directly proportional to the displacement and acts in the direction opposite to that of displacement.",
            "Example: A mass attached to a spring oscillating on a frictionless surface.",
            "Example: A simple pendulum oscillating with a small amplitude.",
          ],
        },
        {
          priority: 1,
          title: "Represent graphically the velocity of a vibrating particle in simple harmonic motion.",
          papers: ["P1", "P2"],
          marks: "2m",
          points: [
            "Draw a cosine curve if displacement is a sine curve.",
            "Equation: v = Aω cos(ωt)",
            "Maximum velocity at mean position (t=0, T/2, T).",
            "Zero velocity at extreme positions (t=T/4, 3T/4).",
          ],
        },
        {
          priority: 1,
          title: "What is the period of 60.0 Hz of electric power?",
          papers: ["P1"],
          marks: "1m",
          points: [
            "Period T = 1 / frequency f",
            "T = 1 / 60.0 Hz",
            "T = 0.01667 seconds or 16.67 ms",
          ],
        },
        {
          priority: 1,
          title: "Describe the theory of standing wave.",
          papers: ["P1"],
          marks: "1m",
          points: [
            "Formed by the superposition of two identical waves traveling in opposite directions.",
            "Equation: y = y1 + y2 = A sin(kx - ωt) + A sin(kx + ωt) = 2A sin(kx) cos(ωt)",
            "Characterized by nodes (points of zero amplitude) and antinodes (points of maximum amplitude).",
            "Energy is not transferred through space, it oscillates between kinetic and potential forms locally.",
          ],
        },
        {
          priority: 1,
          title: "What is particle velocity and wave velocity?",
          papers: ["P1"],
          marks: "1m",
          points: [
            "Particle velocity: The velocity at which a particle of the medium oscillates about its mean position. Changes with time.",
            "Wave velocity: The velocity at which the wave disturbance (or phase) travels through the medium. Usually constant for a given medium.",
          ],
        },
        {
          priority: 1,
          title: "What propagates in wave motion?",
          papers: ["P1"],
          marks: "1m",
          points: [
            "Energy and momentum propagate in wave motion.",
            "The particles of the medium do not propagate; they only oscillate about their mean positions.",
          ],
        },
        {
          priority: 1,
          title: "Classify the waves.",
          papers: ["P1"],
          marks: "1m",
          points: [
            "Based on medium requirement: Mechanical waves (require medium) and Electromagnetic waves (do not require medium).",
            "Based on particle motion: Transverse waves and Longitudinal waves.",
            "Based on energy transfer: Progressive (traveling) waves and Standing (stationary) waves.",
          ],
        }
      ],
    },
    {
      title: "Chapter 2: Microphone & Loudspeaker",
      questions: [
        {
          priority: 3,
          title: "Describe the construction and working principle of a Carbon microphone.",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "5m",
          points: [
            "Construction: Diaphragm, carbon granules chamber, electrodes, DC bias circuit, transformer",
            "Working: Sound wave → diaphragm vibration → varies pressure on carbon granules",
            "Increased pressure → decreased resistance → increased current",
            "Current variation proportional to sound wave",
            "Output: modulated DC, needs transformer for AC output",
          ],
        },
        {
          priority: 3,
          title: "What is microphone? What are the characteristics of microphones?",
          papers: ["P1", "P2", "P3", "P4"],
          marks: "4m",
          points: [
            "Microphone: An electroacoustic transducer that converts sound energy into electrical energy.",
            "Characteristics: Sensitivity (electrical output for a given acoustic input).",
            "Frequency response (range of frequencies it can reproduce accurately).",
            "Directivity (polar pattern, e.g., omnidirectional, unidirectional).",
            "Signal-to-noise ratio and output impedance.",
          ],
        },
        {
          priority: 2,
          title: "Give the differences between microphone and loudspeaker.",
          papers: ["P1", "P2", "P3"],
          marks: "3m",
          points: [
            "Microphone converts sound energy to electrical energy; Loudspeaker converts electrical energy to sound energy.",
            "Microphone acts as an input device; Loudspeaker acts as an output device.",
            "Microphone typically handles very small signals (mic level); Loudspeaker handles large signals (speaker level) requiring an amplifier.",
          ],
        },
        {
          priority: 2,
          title: "With examples name / classify different types of microphones and loudspeakers.",
          papers: ["P1", "P2", "P3"],
          marks: "3m",
          points: [
            "Microphones: Carbon, Dynamic (Moving Coil), Condenser (Capacitor), Ribbon, Crystal (Piezoelectric).",
            "Loudspeakers: Dynamic (Moving Coil), Horn type, Electrostatic, Piezoelectric.",
          ],
        },
        {
          priority: 2,
          title: "What is the function of microphone and loudspeaker?",
          papers: ["P1", "P2", "P3"],
          marks: "3m",
          points: [
            "Microphone function: To capture acoustic waves and convert them into an equivalent electrical signal for transmission, recording, or amplification.",
            "Loudspeaker function: To take an amplified electrical signal and convert it back into acoustic waves that can be heard by humans.",
          ],
        },
        {
          priority: 2,
          title: "Describe the construction and working principle of a dynamic loudspeaker.",
          papers: ["P1", "P2", "P3"],
          marks: "3m",
          points: [
            "Construction: Permanent magnet, voice coil, diaphragm (cone), suspension",
            "Working: AC signal through voice coil → creates varying magnetic field",
            "Interaction with permanent magnet → coil moves in/out",
            "Coil attached to diaphragm → diaphragm vibrates → produces sound",
          ],
        },
        {
          priority: 1,
          title: "Why is Carbon microphone only used in telephone, not in public address system?",
          papers: ["P1", "P2"],
          marks: "2m",
          points: [
            "Carbon microphones have poor frequency response (limited range) and high distortion.",
            "They generate a constant background noise (carbon hiss).",
            "They are rugged and produce a high output signal, which is sufficient for voice communication in telephones but inadequate for high-fidelity public address systems.",
          ],
        },
        {
          priority: 1,
          title: "Which loudspeaker can be used as microphone and how?",
          papers: ["P1", "P2"],
          marks: "2m",
          points: [
            "A dynamic (moving coil) loudspeaker can be used as a microphone.",
            "How: Sound waves hit the speaker cone, causing the attached voice coil to move within the permanent magnetic field.",
            "According to Faraday's law of induction, this motion induces a small electrical voltage in the coil, acting as a microphone.",
          ],
        },
        {
          priority: 1,
          title: "Describe the construction and working principle of a microphone based on variation of resistance.",
          papers: ["P1", "P2"],
          marks: "2m",
          points: [
            "This refers to the Carbon microphone.",
            "Construction: Carbon granules packed between two metal plates (one fixed, one attached to a diaphragm).",
            "Working: Sound waves vibrate the diaphragm, changing the pressure on the carbon granules.",
            "Varying pressure changes the electrical contact resistance between granules, modulating a DC current passing through them.",
          ],
        },
        {
          priority: 1,
          title: "What is the function of horn in horn type loudspeaker?",
          papers: ["P1", "P2"],
          marks: "2m",
          points: [
            "The horn acts as an acoustic transformer.",
            "It matches the high acoustic impedance of the heavy moving coil/diaphragm assembly to the low acoustic impedance of the free air.",
            "This greatly improves the efficiency of sound radiation and directs the sound (increases directivity).",
          ],
        },
        {
          priority: 1,
          title: "Define electroacoustic transducer with example.",
          papers: ["P1"],
          marks: "1m",
          points: [
            "An electroacoustic transducer is a device that converts electrical energy into acoustic energy (sound), or vice versa.",
            "Examples: Microphone (acoustic to electrical), Loudspeaker (electrical to acoustic).",
          ],
        },
        {
          priority: 1,
          title: "Discuss the electromechanical theory of the loudspeaker and deduce the motional admittance.",
          papers: ["P1"],
          marks: "1m",
          points: [
            "The loudspeaker is modeled as an electrical circuit coupled to a mechanical system.",
            "Force on coil: F = Bli. Induced EMF: e = Blv.",
            "Mechanical impedance Z_m = F/v. Electrical impedance Z_e = V/i.",
            "Motional impedance Z_mot = (Bl)² / Z_m.",
            "Motional admittance Y_mot = 1 / Z_mot = Z_m / (Bl)².",
          ],
        },
        {
          priority: 1,
          title: "Explain the terms Directivity, Sensitivity and Fidelity.",
          papers: ["P1"],
          marks: "1m",
          points: [
            "Directivity: The variation of response of a transducer with the direction of the incident or radiated sound.",
            "Sensitivity: The ratio of the electrical output to the acoustic input (for a mic), or acoustic output to electrical input (for a speaker).",
            "Fidelity: The degree of exactness with which a system reproduces the input signal without distortion.",
          ],
        },
        {
          priority: 1,
          title: "Show that the ribbon microphone has an intrinsic directivity independent of frequency.",
          papers: ["P1"],
          marks: "1m",
          points: [
            "A ribbon microphone operates on the pressure gradient principle.",
            "The force on the ribbon is proportional to the difference in pressure between its front and back.",
            "This pressure difference is proportional to cos(θ), where θ is the angle of incidence.",
            "Thus, the polar response is a figure-eight (cosine pattern), which is largely independent of frequency at lower frequencies.",
          ],
        },
        {
          priority: 1,
          title: "Mention the essential character of a good microphone.",
          papers: ["P1"],
          marks: "1m",
          points: [
            "High sensitivity.",
            "Flat frequency response over the audio range.",
            "Low inherent noise.",
            "Appropriate directivity pattern for the application.",
            "Low distortion.",
          ],
        }
      ],
    },
    {
      title: "Chapter 3: Sound Recording & Reproduction",
      questions: [
        {
          priority: 3,
          title: "Describe magnetic film/tape sound recording and reproduction system.",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "5m",
          points: [
            "Recording: Audio signal is amplified and fed to a recording head (electromagnet).",
            "The varying magnetic field aligns magnetic particles (e.g., iron oxide) on a moving tape, leaving a remanent magnetization pattern.",
            "A high-frequency AC bias is added to reduce distortion.",
            "Reproduction: The magnetized tape moves past a playback head.",
            "The changing magnetic flux induces a voltage in the playback head coil (Faraday's law), which is amplified to reproduce sound.",
          ],
        },
        {
          priority: 3,
          title: "What do you mean by recording and reproduction?",
          papers: ["P1", "P2", "P3", "P4"],
          marks: "4m",
          points: [
            "Recording: Process of converting sound signal into storable form (magnetic, optical, mechanical)",
            "Reproduction: Process of retrieving and converting stored signal back to sound",
            "Recording stores information as: magnetization pattern (tape), physical groove (vinyl), digital data",
            "Reproduction reverses process: reads stored data → converts to electrical signal → amplifies → speaker",
          ],
        },
        {
          priority: 2,
          title: "What are losses/how to measure the reproduction loss?",
          papers: ["P1", "P2", "P3"],
          marks: "3m",
          points: [
            "Losses in magnetic reproduction include: Gap loss (when wavelength equals gap width), Thickness loss, and Spacing loss (due to distance between tape and head).",
            "Reproduction loss is measured by comparing the frequency response of the reproduced signal to the original recorded signal.",
            "It is often expressed in decibels (dB) as a function of frequency.",
          ],
        },
        {
          priority: 2,
          title: "What are the essential characteristics of recording media/materials?",
          papers: ["P1", "P2", "P3"],
          marks: "3m",
          points: [
            "High retentivity: To retain a strong magnetic signal after the recording field is removed.",
            "Appropriate coercivity: High enough to resist accidental erasure or self-demagnetization, but low enough to be erased and recorded by the heads.",
            "Uniformity: Even distribution of magnetic particles for consistent recording.",
            "Physical durability and flexibility.",
          ],
        },
        {
          priority: 2,
          title: "How does a material record a signal and reproduce it?",
          papers: ["P1", "P2", "P3"],
          marks: "3m",
          points: [
            "Record: Material (like magnetic tape) passes through a varying magnetic field from a recording head, which aligns its magnetic domains.",
            "The material retains this magnetization (remanence) proportional to the signal.",
            "Reproduce: The magnetized material passes a playback head. Its magnetic field lines cut the head's coil.",
            "This induces a varying electromotive force (EMF) in the coil, recreating the electrical signal.",
          ],
        },
        {
          priority: 2,
          title: "Classify recording and reproduction.",
          papers: ["P1", "P2", "P3"],
          marks: "3m",
          points: [
            "Mechanical: Phonograph records (vinyl).",
            "Magnetic: Magnetic tape, hard disk drives.",
            "Optical: Film sound (variable area/density), CDs, DVDs.",
            "Solid-state/Digital: Flash memory (MP3 players, SSDs).",
          ],
        },
        {
          priority: 1,
          title: "How does a 'Head' work in recording?",
          papers: ["P1", "P2"],
          marks: "2m",
          points: [
            "A recording head is an electromagnet with a narrow gap in its core.",
            "The audio signal current flows through the coil, creating a magnetic flux in the core.",
            "The flux fringes out at the gap and penetrates the magnetic coating of the tape passing over it.",
            "This fringing field magnetizes the tape according to the audio signal.",
          ],
        },
        {
          priority: 1,
          title: "Describe variable width method of film sound recording.",
          papers: ["P1", "P2"],
          marks: "2m",
          points: [
            "Also known as variable area recording.",
            "The audio signal controls a galvanometer mirror or a light valve.",
            "This varies the width of a light beam exposing the moving photographic film.",
            "The resulting soundtrack has a transparent area and an opaque area, with the boundary between them oscillating according to the sound waveform.",
          ],
        },
        {
          priority: 1,
          title: "Define coercivity and retentivity.",
          papers: ["P1", "P2"],
          marks: "2m",
          points: [
            "Retentivity (Remanence): The magnetic flux density remaining in a material after the magnetizing field is removed.",
            "Coercivity: The reverse magnetizing field strength required to reduce the remanent magnetization to zero.",
          ],
        },
        {
          priority: 1,
          title: "Describe the sound recording and reproduction in film.",
          papers: ["P1"],
          marks: "1m",
          points: [
            "Recording: Sound → microphone → amplifier → light modulator → exposes film",
            "Variable width: sound varies width of opaque track on film",
            "Variable density: sound varies density (transparency) of film track",
            "Reproduction: Light source → film → photocell → amplifier → loudspeaker",
          ],
        }
      ],
    },
    {
      title: "Chapter 4: Reverberation & Room Acoustics",
      questions: [
        {
          priority: 3,
          title: "Derive / Explain Sabine's formula / Sabine's theory of reverberation.",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "5m",
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
          priority: 3,
          title: "What is reverberation time? What are the causes of reverberation?",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "5m",
          points: [
            "Reverberation time: The time required for the sound intensity to drop by 60 dB (to one millionth of its initial value) after the source stops.",
            "Causes: Multiple reflections of sound waves from the walls, ceiling, floor, and objects in an enclosed space.",
            "Because sound travels at a finite speed, these reflections arrive at the listener at different times, causing the sound to persist.",
          ],
        },
        {
          priority: 3,
          title: "Give the differences between live room and dead room.",
          papers: ["P1", "P2", "P3", "P4"],
          marks: "4m",
          points: [
            "Live Room: Long reverberation time, highly reflective surfaces (hard walls, glass), sounds loud and resonant.",
            "Dead Room: Very short reverberation time, highly absorptive surfaces (carpets, acoustic panels), sounds quiet and muffled.",
            "Anechoic chamber is an extreme example of a dead room.",
          ],
        },
        {
          priority: 2,
          title: "What do you mean by optimum reverberation time?",
          papers: ["P1", "P2", "P3"],
          marks: "3m",
          points: [
            "Optimum reverberation time is the reverberation time at which a room sounds best for its intended purpose.",
            "For speech (lecture halls): Needs to be short (0.5 - 1.0s) for clarity and articulation.",
            "For music (concert halls): Needs to be longer (1.5 - 2.5s) for blending and richness.",
          ],
        },
        {
          priority: 2,
          title: "What do you mean by reverberation and optimum reverberation?",
          papers: ["P1", "P2", "P3"],
          marks: "3m",
          points: [
            "Reverberation: Persistence of sound in an enclosed space due to multiple reflections after the source has stopped.",
            "Optimum reverberation: The ideal reverberation time for a specific room use, balancing clarity (short T) and fullness/resonance (long T).",
          ],
        },
        {
          priority: 2,
          title: "Give the theory of growth and decay of sound inside a room; hence obtain an expression for Sabine's reverberation formula.",
          papers: ["P1", "P2", "P3"],
          marks: "3m",
          points: [
            "Growth: Sound builds up as reflections add (steady state reached)",
            "Decay: After source stops, energy decreases with each reflection",
            "Energy decay equation: E(t) = E_0 e^(-t/τ)",
            "Derive Sabine formula from decay constant",
            "60 dB decay corresponds to E/E_0 = 10^(-6)",
          ],
        },
        {
          priority: 1,
          title: "Explain Sabine's formula and Eyring's formula.",
          papers: ["P1", "P2"],
          marks: "2m",
          points: [
            "Sabine's formula: T = 0.161V / Σ(Sα). Works well for 'live' rooms with low average absorption (α < 0.2).",
            "Eyring's formula: T = 0.161V / [-S ln(1 - α_avg)].",
            "Eyring's formula is more accurate for 'dead' rooms with high average absorption, as Sabine's formula predicts a non-zero reverberation time even if α=1 (perfect absorption).",
          ],
        },
        {
          priority: 1,
          title: "What are the disadvantages of reverberation?",
          papers: ["P1", "P2"],
          marks: "2m",
          points: [
            "Excessive reverberation causes syllables to overlap, severely reducing speech intelligibility.",
            "It masks fast musical passages, making them sound muddy.",
            "It increases the overall noise level in a room.",
          ],
        },
        {
          priority: 1,
          title: "What type of room is suitable for giving lectures/auditorium and why?",
          papers: ["P1", "P2"],
          marks: "2m",
          points: [
            "A room with a relatively short reverberation time (around 0.5 to 1.0 seconds).",
            "Why: To ensure high speech intelligibility. If T is too long, successive words overlap and become confusing.",
            "The room should also have a shape that directs early reflections toward the audience to reinforce the direct sound.",
          ],
        },
        {
          priority: 1,
          title: "A railway engine moving away from a person at 80 km/hr blows a whistle of pitch 730 Hz. If velocity of sound in air is 340 m/s, calculate the apparent pitch. (Doppler Effect)",
          papers: ["P1"],
          marks: "1m",
          points: [
            "Source velocity v_s = 80 km/hr = 80 * (5/18) = 22.22 m/s.",
            "Observer velocity v_o = 0.",
            "Apparent frequency f' = f * [v / (v + v_s)] (since source is moving away).",
            "f' = 730 * [340 / (340 + 22.22)] = 730 * [340 / 362.22] ≈ 685.2 Hz.",
          ],
        },
        {
          priority: 1,
          title: "What is Doppler Effect?",
          papers: ["P1"],
          marks: "1m",
          points: [
            "The apparent change in the frequency (or pitch) of a wave observed by an observer due to relative motion between the source of the wave and the observer.",
            "Frequency appears higher when approaching, lower when receding.",
          ],
        }
      ],
    },
    {
      title: "Chapter 5: Nature of Light & Corpuscular / Wave Theory",
      questions: [
        {
          priority: 3,
          title: "State and explain Huygens' principle.",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "5m",
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
          title: "Explain the reflection of light by Corpuscular theory.",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "5m",
          points: [
            "Corpuscles approach a reflecting surface.",
            "The surface exerts a repulsive force on the corpuscles near it.",
            "This force only acts perpendicular to the surface.",
            "The component of velocity parallel to the surface remains unchanged.",
            "The component perpendicular to the surface is reversed.",
            "This leads to the angle of incidence equaling the angle of reflection.",
          ],
        },
        {
          priority: 2,
          title: "What is the nature of light? / Explain the nature of light.",
          papers: ["P1", "P2", "P3", "P4"],
          marks: "4m",
          points: [
            "Dual nature: Wave and Particle",
            "Wave nature: Interference, diffraction, polarization phenomena",
            "Particle nature: Photoelectric effect, Compton scattering",
            "Wave-particle duality resolved by quantum mechanics",
            "Electromagnetic wave (oscillating E and B fields)",
          ],
        },
        {
          priority: 2,
          title: "Explain Newton's Corpuscular theory.",
          papers: ["P1", "P2", "P3", "P4"],
          marks: "4m",
          points: [
            "Theory: Light consists of stream of particles (corpuscles) emitted from source",
            "Corpuscles travel in straight lines with high speed (rectilinear propagation).",
            "Different colors are due to different sizes of corpuscles.",
            "Explains: Rectilinear propagation, reflection",
          ],
        },
        {
          priority: 2,
          title: "Explain refraction of light by Corpuscular theory.",
          papers: ["P1", "P2", "P3"],
          marks: "3m",
          points: [
            "Corpuscles approach a denser medium.",
            "The denser medium exerts an attractive force on the corpuscles.",
            "This force acts perpendicular to the surface, increasing the perpendicular velocity component.",
            "The parallel velocity component remains unchanged.",
            "Result: The corpuscle bends towards the normal.",
            "This incorrectly predicts that light travels faster in a denser medium.",
          ],
        },
        {
          priority: 1,
          title: "What is the merit of wave theory?",
          papers: ["P1", "P2"],
          marks: "2m",
          points: [
            "Successfully explains interference, diffraction, and polarization.",
            "Correctly predicts that the speed of light is slower in a denser medium (unlike corpuscular theory).",
            "Explains simultaneous reflection and refraction.",
          ],
        },
        {
          priority: 1,
          title: "Mention limitations of Newton's Corpuscular theory.",
          papers: ["P1", "P2"],
          marks: "2m",
          points: [
            "Predicts light travels faster in denser medium (experimentally proven wrong by Foucault).",
            "Cannot explain interference, diffraction, or polarization.",
            "Cannot explain partial reflection and partial refraction simultaneously at an interface.",
          ],
        },
        {
          priority: 1,
          title: "Explain reflection and refraction of light by Corpuscular theory.",
          papers: ["P1"],
          marks: "1m",
          points: [
            "Reflection: Explained by an elastic collision or a repulsive force from the surface, reversing the normal velocity component.",
            "Refraction: Explained by an attractive force from the denser medium, increasing the normal velocity component and bending the path towards the normal.",
          ],
        }
      ],
    },
    {
      title: "Chapter 6: Interference of Light",
      questions: [
        {
          priority: 3,
          title: "Explain Young's experiment / Young's double-slit experiment with schematic diagram.",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "5m",
          points: [
            "Setup: Monochromatic source → single slit (S) → double slit (S1, S2) → screen",
            "S1 and S2 are coherent sources (division of wavefront)",
            "Path difference at point P: ∆ = d sin θ ≈ dy/D",
            "Bright fringe condition: dy/D = nλ → y = nλD/d",
            "Fringe width: β = λD/d",
            "Draw diagram with all labels",
          ],
        },
        {
          priority: 3,
          title: "What are coherent sources? Define coherent source and how it is obtained in practice.",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "5m",
          points: [
            "Coherent sources: Sources that emit light waves of the same frequency with a constant phase difference.",
            "Method 1: Division of wavefront (Young's double slit, Fresnel biprism)",
            "Method 2: Division of amplitude (thin films, Newton's rings, Michelson)",
            "Why needed: Random phase changes in independent sources destroy fringes",
          ],
        },
        {
          priority: 3,
          title: "Explain how Newton's Rings are formed / Discuss the formation of Newton's rings.",
          papers: ["P1", "P2", "P3", "P4"],
          marks: "4m",
          points: [
            "Setup: A plano-convex lens of large radius of curvature placed on a flat glass plate.",
            "A thin air film of varying thickness is formed between them.",
            "Monochromatic light falls normally on the setup.",
            "Interference occurs between light reflected from the top and bottom surfaces of the air film.",
            "Locus of points of equal thickness is a circle, hence circular fringes (rings) are formed.",
            "Central spot is dark due to a π phase change upon reflection at the lower surface (air-glass boundary).",
          ],
        },
        {
          priority: 2,
          title: "What is interference of light?",
          papers: ["P1", "P2", "P3", "P4"],
          marks: "4m",
          points: [
            "The phenomenon of redistribution of light energy due to the superposition of two or more coherent light waves.",
            "Constructive interference: Waves meet in phase, resulting in maximum intensity (bright fringes).",
            "Destructive interference: Waves meet out of phase, resulting in minimum intensity (dark fringes).",
          ],
        },
        {
          priority: 2,
          title: "Discuss why two independent sources of light of the same wavelength cannot produce interference fringes.",
          papers: ["P1", "P2", "P3"],
          marks: "3m",
          points: [
            "Independent sources (like two bulbs) emit light in short, random bursts (wave trains).",
            "The phase difference between the waves from two independent sources changes randomly and rapidly (millions of times per second).",
            "This rapid change causes the interference pattern to shift so fast that the eye only sees an average, uniform illumination.",
            "Therefore, they are not coherent sources.",
          ],
        },
        {
          priority: 2,
          title: "Mention / discuss the condition for interference and coherent sources.",
          papers: ["P1", "P2", "P3"],
          marks: "3m",
          points: [
            "Sources must be coherent (constant phase difference).",
            "Sources must emit waves of the same frequency/wavelength.",
            "Sources should be monochromatic.",
            "Amplitudes should be nearly equal for good contrast.",
            "Sources must be narrow and close to each other.",
          ],
        },
        {
          priority: 1,
          title: "How is Newton's ring used to calculate the wavelength of light?",
          papers: ["P1", "P2"],
          marks: "2m",
          points: [
            "Measure the diameters of the m-th and n-th dark rings (D_m and D_n).",
            "Radius of dark ring: r_n² = nλR, so D_n² = 4nλR.",
            "D_m² - D_n² = 4(m - n)λR.",
            "Wavelength λ = (D_m² - D_n²) / [4(m - n)R], where R is the radius of curvature of the lens.",
          ],
        },
        {
          priority: 1,
          title: "Deduce the expression for measurement of thin film thickness using interference of light.",
          papers: ["P1", "P2"],
          marks: "2m",
          points: [
            "Path difference for reflected light from a thin film of thickness t and refractive index μ: ∆ = 2μt cos(r) ± λ/2.",
            "For normal incidence, r = 0, cos(r) = 1. ∆ = 2μt ± λ/2.",
            "Condition for dark fringe (destructive): 2μt = nλ.",
            "Condition for bright fringe (constructive): 2μt = (n + 1/2)λ.",
            "By knowing the order n and wavelength λ, thickness t can be calculated.",
          ],
        },
        {
          priority: 1,
          title: "In Newton's ring experiment, the diameters of the n-th and (n+8)-th bright rings are 4.2 mm and 7.0 mm, radius of curvature is 2 m. Determine the wavelength and ring numbers.",
          papers: ["P1"],
          marks: "1m",
          points: [
            "For bright rings: D_n² = 2(2n-1)λR.",
            "D_{n+8}² - D_n² = 2[2(n+8)-1 - (2n-1)]λR = 32λR.",
            "λ = (D_{n+8}² - D_n²) / 32R = (7.0² - 4.2²) * 10^-6 / (32 * 2) = (49 - 17.64) * 10^-6 / 64 = 31.36 * 10^-6 / 64 = 490 * 10^-9 m = 490 nm.",
            "To find n: D_n² = 2(2n-1)λR => (4.2 * 10^-3)² = 2(2n-1) * 490 * 10^-9 * 2.",
            "17.64 * 10^-6 = 1960 * 10^-9 * (2n-1) => 17640 / 1960 = 2n - 1 => 9 = 2n - 1 => 2n = 10 => n = 5.",
          ],
        }
      ],
    },
    {
      title: "Chapter 7: Diffraction of Light",
      questions: [
        {
          priority: 3,
          title: "Describe Fresnel's / Fraunhofer diffraction of light in a single slit.",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "5m",
          points: [
            "Fraunhofer Setup: Collimated light → slit of width 'a' → lens → screen",
            "Path difference across slit: a sin θ",
            "First minimum when: a sin θ = λ → θ = λ/a",
            "General minima: a sin θ = nλ (n = 1,2,3...)",
            "Central maximum intensity >> side maxima",
            "Pattern: bright central band, alternating dark/bright fringes",
          ],
        },
        {
          priority: 3,
          title: "What do you mean by diffraction of light?",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "5m",
          points: [
            "Bending of light waves around obstacles or through apertures",
            "Light spreads into geometrical shadow region",
            "Occurs when obstacle/aperture size ≈ wavelength",
            "Evidence of wave nature of light",
          ],
        },
        {
          priority: 2,
          title: "Classify / Give classification of diffraction of light.",
          papers: ["P1", "P2", "P3", "P4"],
          marks: "4m",
          points: [
            "Fresnel Diffraction: Source and/or screen are at a finite distance from the obstacle/aperture. Wavefronts are spherical or cylindrical. No lenses are required.",
            "Fraunhofer Diffraction: Source and screen are effectively at infinite distance. Wavefronts are plane. Lenses are used to collimate and focus light.",
          ],
        },
        {
          priority: 2,
          title: "Give differences between Fresnel and Fraunhofer diffraction.",
          papers: ["P1", "P2", "P3"],
          marks: "3m",
          points: [
            "Distance: Fresnel (finite), Fraunhofer (infinite).",
            "Wavefront: Fresnel (spherical/cylindrical), Fraunhofer (plane).",
            "Lenses: Fresnel (not required), Fraunhofer (required).",
            "Mathematical analysis: Fresnel (complex, uses half-period zones), Fraunhofer (simpler, uses Fourier transforms/integration).",
          ],
        },
        {
          priority: 1,
          title: "Give Fresnel's assumptions for diffraction.",
          papers: ["P1", "P2"],
          marks: "2m",
          points: [
            "A wavefront can be divided into a large number of strips or zones called Fresnel's half-period zones.",
            "The resultant effect at any point is the sum of the secondary waves from all these zones.",
            "The effect of a zone depends on its area, distance from the point, and the obliquity factor (1 + cos θ).",
          ],
        },
        {
          priority: 1,
          title: "Describe Fresnel diffraction of light at circular aperture.",
          papers: ["P1", "P2"],
          marks: "2m",
          points: [
            "Light passes through a circular hole.",
            "The aperture exposes a certain number of Fresnel half-period zones.",
            "If an odd number of zones is exposed, the center of the pattern is bright.",
            "If an even number of zones is exposed, the center is dark.",
            "The pattern consists of concentric bright and dark rings.",
          ],
        },
        {
          priority: 1,
          title: "What are the uses of diffraction of light?",
          papers: ["P1"],
          marks: "1m",
          points: [
            "Diffraction gratings are used in spectrometers to separate light into its component wavelengths (spectroscopy).",
            "X-ray diffraction is used to determine the crystal structure of materials.",
            "Determining the resolving power of optical instruments like telescopes and microscopes.",
          ],
        },
        {
          priority: 1,
          title: "What are Fresnel's assumptions?",
          papers: ["P1"],
          marks: "1m",
          points: [
            "A wavefront can be divided into a large number of strips or zones called Fresnel's half-period zones.",
            "The resultant effect at any point is the sum of the secondary waves from all these zones.",
            "The effect of a zone depends on its area, distance from the point, and the obliquity factor (1 + cos θ).",
          ],
        }
      ],
    },
    {
      title: "Chapter 8: Polarization of Light",
      questions: [
        {
          priority: 3,
          title: "Describe construction and working of Nicol Prism (as polarizer and analyzer).",
          papers: ["P1", "P2", "P3", "P4", "P5"],
          marks: "5m",
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
          title: "Describe polarization of light by reflection.",
          papers: ["P1", "P2", "P3", "P4"],
          marks: "4m",
          points: [
            "When unpolarized light reflects off a non-metallic surface (like glass or water), it becomes partially polarized.",
            "The degree of polarization depends on the angle of incidence.",
            "At a specific angle called Brewster's angle, the reflected light is completely plane-polarized.",
            "The plane of vibration of the polarized reflected light is parallel to the reflecting surface.",
          ],
        },
        {
          priority: 2,
          title: "What do you mean by polarization of light?",
          papers: ["P1", "P2", "P3", "P4"],
          marks: "4m",
          points: [
            "Polarization: Vibrations of light confined to specific plane",
            "Unpolarized: vibrations in all planes perpendicular to direction",
            "Polarized: vibrations in single plane only",
            "Proves light is transverse wave (longitudinal waves can't be polarized)",
          ],
        },
        {
          priority: 2,
          title: "What do you mean by double refraction?",
          papers: ["P1", "P2", "P3"],
          marks: "3m",
          points: [
            "Double refraction (birefringence): When a ray of unpolarized light enters certain anisotropic crystals (like calcite or quartz), it splits into two refracted rays.",
            "Ordinary ray (O-ray): Obeys Snell's law, travels with constant velocity in all directions.",
            "Extraordinary ray (E-ray): Does not obey Snell's law, velocity varies with direction.",
            "Both rays are plane-polarized, with their planes of vibration mutually perpendicular.",
          ],
        },
        {
          priority: 2,
          title: "What is Brewster's law? Derive the formula for Brewster angle. Why is Brewster angle called polarizing angle?",
          papers: ["P1", "P2", "P3"],
          marks: "3m",
          points: [
            "Brewster's law: tan θ_p = n (n = refractive index)",
            "At polarizing angle: reflected and refracted rays are perpendicular (90°)",
            "Derivation: Use Snell's law with θ_r = 90° - θ_p",
            "Called polarizing angle because maximum polarization occurs at this angle",
          ],
        },
        {
          priority: 1,
          title: "State and explain Malus's law.",
          papers: ["P1", "P2"],
          marks: "2m",
          points: [
            "Statement: When completely plane-polarized light is incident on an analyzer, the intensity of the transmitted light varies directly as the square of the cosine of the angle between the transmission axes of the polarizer and analyzer.",
            "Formula: I = I_0 cos²θ",
            "Where I_0 is maximum intensity (when θ=0), and θ is the angle between the axes.",
          ],
        },
        {
          priority: 1,
          title: "What is the function of a polariscope?",
          papers: ["P1", "P2"],
          marks: "2m",
          points: [
            "A polariscope is an instrument consisting of a polarizer and an analyzer.",
            "Function: Used to detect and analyze polarized light.",
            "Used to study the optical properties of materials, such as optical activity (rotation of plane of polarization) in sugar solutions.",
            "Used in photoelasticity to analyze stress distribution in transparent models.",
          ],
        },
        {
          priority: 1,
          title: "What are the applications of polarization of light?",
          papers: ["P1", "P2"],
          marks: "2m",
          points: [
            "Polaroid sunglasses to reduce glare from reflective surfaces.",
            "LCD screens (Liquid Crystal Displays) use polarization to control light transmission.",
            "3D movies use orthogonal polarization for the left and right eye images.",
            "Stress analysis in transparent plastics (photoelasticity).",
          ],
        },
        {
          priority: 1,
          title: "What is meant by refractive index?",
          papers: ["P1"],
          marks: "1m",
          points: [
            "The ratio of the speed of light in a vacuum (c) to the speed of light in the medium (v).",
            "n = c / v",
            "It is a measure of how much a ray of light bends when entering a material.",
          ],
        },
        {
          priority: 1,
          title: "Define angle of polarization.",
          papers: ["P1"],
          marks: "1m",
          points: [
            "Also known as Brewster's angle.",
            "The angle of incidence at which light with a particular polarization is perfectly transmitted through a transparent dielectric surface, with no reflection.",
            "At this angle, the reflected light is completely plane-polarized.",
          ],
        },
        {
          priority: 1,
          title: "How does polarization prove that light is a wave?",
          papers: ["P1"],
          marks: "1m",
          points: [
            "Polarization proves that light is a transverse wave.",
            "Longitudinal waves (like sound) oscillate parallel to the direction of travel, so they cannot be restricted to a single plane.",
            "Only transverse waves, which oscillate perpendicular to the direction of travel, can be polarized.",
          ],
        }
      ],
    },
  ],
};
