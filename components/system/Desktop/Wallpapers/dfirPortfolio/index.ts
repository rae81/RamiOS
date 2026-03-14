type Vector3 = {
  x: number;
  y: number;
  z: number;
};

type BackgroundParticle = {
  drift: number;
  phase: number;
  size: number;
  x: number;
  y: number;
  z: number;
};

type CanvasSize = {
  height: number;
  width: number;
};

type ExpertiseNode = {
  color: string;
  emphasis: "high" | "low" | "medium";
  id: string;
  label?: string;
  phase: number;
  position: Vector3;
  radius: number;
};

type GraphEdge = {
  from: string;
  to: string;
};

type SkillProfileId = "blue_team" | "dfir" | "red_team";

type PanelButton = {
  height: number;
  id: SkillProfileId;
  width: number;
  x: number;
  y: number;
};

type PanelLayout = {
  buttonGap: number;
  buttonHeight: number;
  chipHeight: number;
  chipInset: number;
  compactMode: boolean;
  panelHeight: number;
  panelWidth: number;
  panelX: number;
  panelY: number;
  titleY: number;
};

type ProjectedNode = ExpertiseNode & {
  depth: number;
  scale: number;
  screenX: number;
  screenY: number;
  visible: boolean;
  world: Vector3;
};

type SkillProfile = {
  buttonLabel: string;
  chips: string[];
  edges: GraphEdge[];
  lines: readonly string[];
  nodes: ExpertiseNode[];
  primaryColor: string;
  rootId: string;
  secondaryColor: string;
  subtitle: string;
  telemetry: readonly string[];
  title: string;
};

type VisibleEdge = {
  from: ProjectedNode;
  to: ProjectedNode;
};

const BRANCH_COLORS = {
  amber: "#f5a04a",
  cyan: "#6be8ff",
};

const MAJOR_LABEL_BREAKPOINT = 1120;

const MINOR_LABEL_BREAKPOINT = 1460;

const PROFILE_ORDER: SkillProfileId[] = ["dfir", "blue_team", "red_team"];

const PROFILE_SUMMARY_LINES = [
  "AUB CCE (Cybersecurity & AI)",
  "GPA 4.05 / Dean's Honors / SOC Analyst Intern",
] as const;

const createBaseNodes = (rootNode: ExpertiseNode): ExpertiseNode[] => [
  {
    color: "#4dd7c0",
    emphasis: "medium",
    id: "foundation",
    phase: 0.14,
    position: { x: 0, y: 248, z: 72 },
    radius: 12,
  },
  {
    color: "#6be8ff",
    emphasis: "medium",
    id: "spine",
    phase: 0.32,
    position: { x: 0, y: 118, z: 136 },
    radius: 11,
  },
  rootNode,
];

const PROFILES: Record<SkillProfileId, SkillProfile> = {
  blue_team: {
    buttonLabel: "Blue Team",
    chips: [
      "SOC Monitoring",
      "SIEM + EDR",
      "Detection Workflows",
      "Phishing Triage",
      "Falcon Reports",
      "MITRE ATT&CK",
    ],
    edges: [
      { from: "foundation", to: "spine" },
      { from: "spine", to: "blue_root" },
      { from: "blue_root", to: "response" },
      { from: "blue_root", to: "detection" },
      { from: "blue_root", to: "soc" },
      { from: "response", to: "phishing" },
      { from: "response", to: "attack_mapping" },
      { from: "detection", to: "siem" },
      { from: "detection", to: "falcon" },
      { from: "soc", to: "automation" },
    ],
    lines: [
      "Blue Team / Detection / Response",
      "SOC monitoring and incident workflows",
      "Automation, ATT&CK mapping, and reporting",
    ],
    nodes: [
      ...createBaseNodes({
        color: "#77ffe3",
        emphasis: "high",
        id: "blue_root",
        label: "Blue Team",
        phase: 0.48,
        position: { x: 0, y: -18, z: 214 },
        radius: 18,
      }),
      {
        color: "#59dfd3",
        emphasis: "high",
        id: "response",
        label: "Incident Response",
        phase: 0.76,
        position: { x: -220, y: -118, z: 302 },
        radius: 14,
      },
      {
        color: "#7ce8b2",
        emphasis: "high",
        id: "detection",
        label: "Detection Engineering",
        phase: 1.02,
        position: { x: 228, y: -120, z: 302 },
        radius: 14,
      },
      {
        color: "#4dd7c0",
        emphasis: "high",
        id: "soc",
        label: "SOC Monitoring",
        phase: 1.28,
        position: { x: 0, y: -226, z: 378 },
        radius: 14,
      },
      {
        color: "#7ce8b2",
        emphasis: "medium",
        id: "phishing",
        label: "Phishing Triage",
        phase: 1.58,
        position: { x: -356, y: -296, z: 478 },
        radius: 11,
      },
      {
        color: "#59dfd3",
        emphasis: "medium",
        id: "attack_mapping",
        label: "MITRE ATT&CK",
        phase: 1.86,
        position: { x: -122, y: -340, z: 520 },
        radius: 11,
      },
      {
        color: "#7ce8b2",
        emphasis: "medium",
        id: "siem",
        label: "SIEM + EDR",
        phase: 2.14,
        position: { x: 122, y: -338, z: 518 },
        radius: 11,
      },
      {
        color: "#8bffcd",
        emphasis: "medium",
        id: "falcon",
        label: "Falcon Reports",
        phase: 2.38,
        position: { x: 356, y: -292, z: 474 },
        radius: 11,
      },
      {
        color: "#4dd7c0",
        emphasis: "medium",
        id: "automation",
        label: "SOC Automation",
        phase: 2.68,
        position: { x: 0, y: -430, z: 604 },
        radius: 10,
      },
    ],
    primaryColor: "#59dfd3",
    rootId: "blue_root",
    secondaryColor: "#7ce8b2",
    subtitle: "Detection, response, and automation loops",
    telemetry: [
      "soc monitoring :: alert triage -> telemetry review -> escalation -> closure",
      "incident response :: phishing analysis -> host validation -> timeline -> containment",
      "detection engineering :: siem + edr correlation -> att&ck mapping -> falcon reporting",
    ],
    title: "Blue Team Tree",
  },
  dfir: {
    buttonLabel: "DFIR",
    chips: [
      "Windows DFIR",
      "Linux Forensics",
      "Network Forensics",
      "Timeline Reconstruction",
      "Malware Analysis",
      "IOC Correlation",
      "Chain of Custody",
    ],
    edges: [
      { from: "foundation", to: "spine" },
      { from: "spine", to: "dfir_root" },
      { from: "dfir_root", to: "host" },
      { from: "dfir_root", to: "linux" },
      { from: "dfir_root", to: "network" },
      { from: "dfir_root", to: "response" },
      { from: "dfir_root", to: "custody" },
      { from: "host", to: "timeline" },
      { from: "linux", to: "malware" },
      { from: "network", to: "pcap" },
      { from: "network", to: "ioc" },
    ],
    lines: [
      "DFIR / Host + Network Evidence",
      "Windows, Linux, malware, and timeline analysis",
      "PCAP, IOC correlation, and custody discipline",
    ],
    nodes: [
      ...createBaseNodes({
        color: "#a9f7ff",
        emphasis: "high",
        id: "dfir_root",
        label: "DFIR",
        phase: 0.48,
        position: { x: 0, y: -18, z: 214 },
        radius: 18,
      }),
      {
        color: "#7ee4ff",
        emphasis: "high",
        id: "host",
        label: "Windows DFIR",
        phase: 0.76,
        position: { x: -276, y: -118, z: 302 },
        radius: 14,
      },
      {
        color: "#7ef4ff",
        emphasis: "high",
        id: "linux",
        label: "Linux Forensics",
        phase: 0.92,
        position: { x: 0, y: -172, z: 342 },
        radius: 14,
      },
      {
        color: "#5de6ff",
        emphasis: "high",
        id: "network",
        label: "Network Forensics",
        phase: 1.04,
        position: { x: 276, y: -112, z: 302 },
        radius: 14,
      },
      {
        color: "#4dd7c0",
        emphasis: "high",
        id: "response",
        label: "Incident Response",
        phase: 1.28,
        position: { x: -156, y: -282, z: 438 },
        radius: 14,
      },
      {
        color: "#ffd29a",
        emphasis: "high",
        id: "custody",
        label: "Chain of Custody",
        phase: 1.54,
        position: { x: 156, y: -282, z: 438 },
        radius: 13,
      },
      {
        color: "#8cecff",
        emphasis: "medium",
        id: "timeline",
        label: "Timeline Reconstruction",
        phase: 1.84,
        position: { x: -376, y: -290, z: 472 },
        radius: 11,
      },
      {
        color: "#ff8e63",
        emphasis: "medium",
        id: "malware",
        label: "Malware Analysis",
        phase: 2.08,
        position: { x: 0, y: -398, z: 572 },
        radius: 11,
      },
      {
        color: "#76f4ff",
        emphasis: "medium",
        id: "pcap",
        label: "PCAP + C2",
        phase: 2.32,
        position: { x: 132, y: -338, z: 516 },
        radius: 11,
      },
      {
        color: "#9cefff",
        emphasis: "medium",
        id: "ioc",
        label: "IOC Correlation",
        phase: 2.58,
        position: { x: 356, y: -290, z: 468 },
        radius: 11,
      },
    ],
    primaryColor: "#6be8ff",
    rootId: "dfir_root",
    secondaryColor: "#4dd7c0",
    subtitle: "Windows, Linux, malware, and network evidence workflows",
    telemetry: [
      "host forensics :: windows + linux acquisition -> artifact review -> persistence mapping",
      "network forensics :: pcap triage -> c2 correlation -> dns analysis -> intrusion scoping",
      "case discipline :: malware evidence -> iocs -> chain of custody -> reporting",
    ],
    title: "DFIR Tree",
  },
  red_team: {
    buttonLabel: "Red Team",
    chips: [
      "Ethical Hacking",
      "Bug Bounty",
      "CTF Tradecraft",
      "DNS Spoofing",
      "Exploit Validation",
      "Applied Crypto",
    ],
    edges: [
      { from: "foundation", to: "spine" },
      { from: "spine", to: "red_root" },
      { from: "red_root", to: "ethical" },
      { from: "red_root", to: "bounty" },
      { from: "red_root", to: "ctf" },
      { from: "ethical", to: "dns" },
      { from: "ethical", to: "exploit" },
      { from: "bounty", to: "web" },
      { from: "bounty", to: "emulation" },
      { from: "ctf", to: "crypto" },
    ],
    lines: [
      "Red Team / Ethical Hacking / Tradecraft",
      "Bug bounty, CTF, and exploit validation",
      "Attack simulation grounded in network security work",
    ],
    nodes: [
      ...createBaseNodes({
        color: "#ffc37c",
        emphasis: "high",
        id: "red_root",
        label: "Red Team",
        phase: 0.48,
        position: { x: 0, y: -18, z: 214 },
        radius: 18,
      }),
      {
        color: "#ff9f63",
        emphasis: "high",
        id: "ethical",
        label: "Ethical Hacking",
        phase: 0.78,
        position: { x: -228, y: -118, z: 302 },
        radius: 14,
      },
      {
        color: "#f5a04a",
        emphasis: "high",
        id: "bounty",
        label: "Bug Bounty",
        phase: 1.04,
        position: { x: 228, y: -114, z: 300 },
        radius: 14,
      },
      {
        color: "#ffbc6d",
        emphasis: "high",
        id: "ctf",
        label: "CTF Tradecraft",
        phase: 1.32,
        position: { x: 0, y: -228, z: 378 },
        radius: 14,
      },
      {
        color: "#ff8e63",
        emphasis: "medium",
        id: "dns",
        label: "DNS Spoofing",
        phase: 1.58,
        position: { x: -354, y: -292, z: 472 },
        radius: 11,
      },
      {
        color: "#ffb467",
        emphasis: "medium",
        id: "exploit",
        label: "Exploit Validation",
        phase: 1.88,
        position: { x: -126, y: -340, z: 520 },
        radius: 11,
      },
      {
        color: "#ffc37c",
        emphasis: "medium",
        id: "web",
        label: "Web Attack Surface",
        phase: 2.16,
        position: { x: 126, y: -338, z: 518 },
        radius: 11,
      },
      {
        color: "#ff9f63",
        emphasis: "medium",
        id: "emulation",
        label: "Adversary Emulation",
        phase: 2.42,
        position: { x: 352, y: -290, z: 470 },
        radius: 11,
      },
      {
        color: "#ffe0a4",
        emphasis: "medium",
        id: "crypto",
        label: "Applied Crypto",
        phase: 2.68,
        position: { x: 0, y: -430, z: 606 },
        radius: 10,
      },
    ],
    primaryColor: "#f5a04a",
    rootId: "red_root",
    secondaryColor: "#ff8e63",
    subtitle: "Offensive validation, hacking, and adversary mindset",
    telemetry: [
      "ethical hacking :: recon -> attack path validation -> exploit refinement -> lessons learned",
      "bug bounty :: web surface review -> finding triage -> report quality -> iteration",
      "ctf tradecraft :: dns spoofing -> adversary emulation -> crypto challenges -> offensive labs",
    ],
    title: "Red Team Tree",
  },
};

const seededNoise = (seed: number): number => {
  const value = Math.sin(seed * 127.1) * 43_758.545_312_3;

  return value - Math.floor(value);
};

const BACKGROUND_PARTICLES: BackgroundParticle[] = Array.from(
  { length: 56 },
  (_, index) => ({
    drift: 0.15 + seededNoise(index + 23) * 0.5,
    phase: seededNoise(index + 71) * Math.PI * 2,
    size: 0.9 + seededNoise(index + 107) * 2.4,
    x: seededNoise(index + 131) * 2 - 1,
    y: seededNoise(index + 197),
    z: 0.25 + seededNoise(index + 251) * 0.75,
  })
);

const clamp = (value: number, minimum: number, maximum: number): number =>
  Math.min(maximum, Math.max(minimum, value));

const colorWithAlpha = (hexColor: string, alpha: number): string =>
  `${hexColor}${Math.round(clamp(alpha, 0, 1) * 255)
    .toString(16)
    .padStart(2, "0")}`;

const rotateX = (vector: Vector3, angle: number): Vector3 => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  return {
    x: vector.x,
    y: vector.y * cos - vector.z * sin,
    z: vector.y * sin + vector.z * cos,
  };
};

const rotateY = (vector: Vector3, angle: number): Vector3 => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  return {
    x: vector.x * cos - vector.z * sin,
    y: vector.y,
    z: vector.x * sin + vector.z * cos,
  };
};

const createSize = (): CanvasSize => ({
  height: window.innerHeight,
  width: window.innerWidth,
});

const getPanelLayout = (size: CanvasSize): PanelLayout => {
  const compactMode = size.width < 1_060;
  const estimatedPanelWidth = compactMode
    ? size.width * 0.54
    : size.width * 0.36;
  const panelWidth = Math.min(
    size.width * 0.9,
    clamp(estimatedPanelWidth, 340, 500)
  );
  const panelHeight = compactMode ? 344 : 360;
  const panelX = Math.max(18, size.width - panelWidth - size.width * 0.05);
  const panelY = Math.min(
    compactMode ? size.height * 0.07 : size.height * 0.12,
    size.height - panelHeight - 46
  );

  return {
    buttonGap: 8,
    buttonHeight: compactMode ? 24 : 28,
    chipHeight: compactMode ? 18 : 20,
    chipInset: 18,
    compactMode,
    panelHeight,
    panelWidth,
    panelX,
    panelY,
    titleY: panelY + (compactMode ? 106 : 120),
  };
};

const createProfileButtons = (layout: PanelLayout): PanelButton[] => {
  const { buttonGap, buttonHeight, chipInset, panelWidth, panelX, panelY } =
    layout;
  const availableWidth = panelWidth - chipInset * 2 - buttonGap * 2;
  const buttonWidth = availableWidth / PROFILE_ORDER.length;
  const buttonY = panelY + 58;

  return PROFILE_ORDER.map((id, index) => ({
    height: buttonHeight,
    id,
    width: buttonWidth,
    x: panelX + chipInset + index * (buttonWidth + buttonGap),
    y: buttonY,
  }));
};

const getButtonAt = (
  buttons: PanelButton[],
  clientX: number,
  clientY: number
): PanelButton | undefined =>
  buttons.find(
    ({ height, width, x, y }) =>
      clientX >= x &&
      clientX <= x + width &&
      clientY >= y &&
      clientY <= y + height
  );

const wrapText = (
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] => {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  words.forEach((word) => {
    const trialLine = currentLine ? `${currentLine} ${word}` : word;

    if (!currentLine || context.measureText(trialLine).width <= maxWidth) {
      currentLine = trialLine;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
};

const drawWrappedText = (
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number => {
  const lines = wrapText(context, text, maxWidth);

  lines.forEach((line, index) => {
    context.fillText(line, x, y + index * lineHeight);
  });

  return y + lines.length * lineHeight;
};

const drawBackdrop = (
  context: CanvasRenderingContext2D,
  size: CanvasSize,
  time: number,
  profile: SkillProfile
): void => {
  const { height, width } = size;
  const skyGradient = context.createLinearGradient(0, 0, 0, height);
  const glowOffset = Math.sin(time * 0.00014) * width * 0.03;
  const rootGlow = context.createRadialGradient(
    width * 0.46 + glowOffset,
    height * 0.46,
    0,
    width * 0.46 + glowOffset,
    height * 0.46,
    width * 0.5
  );
  const warmGlow = context.createRadialGradient(
    width * 0.82,
    height * 0.26,
    0,
    width * 0.82,
    height * 0.26,
    width * 0.3
  );

  skyGradient.addColorStop(0, "#030a11");
  skyGradient.addColorStop(0.45, "#061623");
  skyGradient.addColorStop(1, "#031018");
  rootGlow.addColorStop(0, colorWithAlpha(profile.primaryColor, 0.3));
  rootGlow.addColorStop(0.38, colorWithAlpha(profile.primaryColor, 0.1));
  rootGlow.addColorStop(1, "rgba(3, 10, 17, 0)");
  warmGlow.addColorStop(0, colorWithAlpha(profile.secondaryColor, 0.24));
  warmGlow.addColorStop(0.45, colorWithAlpha(profile.secondaryColor, 0.1));
  warmGlow.addColorStop(1, "rgba(5, 10, 18, 0)");

  context.fillStyle = skyGradient;
  context.fillRect(0, 0, width, height);
  context.fillStyle = rootGlow;
  context.fillRect(0, 0, width, height);
  context.fillStyle = warmGlow;
  context.fillRect(0, 0, width, height);
};

const drawBackgroundParticles = (
  context: CanvasRenderingContext2D,
  size: CanvasSize,
  time: number
): void => {
  const { height, width } = size;

  context.save();
  context.globalCompositeOperation = "screen";

  BACKGROUND_PARTICLES.forEach(
    ({ drift, phase, size: particleSize, x, y, z }) => {
      const px =
        ((x + 1) / 2) * width +
        Math.sin(time * 0.00008 * drift + phase) * width * 0.045;
      const py =
        y * height * 0.55 +
        Math.cos(time * 0.00012 * drift + phase) * height * 0.035;
      const radius = particleSize * (0.65 + z);
      const alpha = 0.08 + z * 0.12;

      context.beginPath();
      context.fillStyle = `rgba(107, 232, 255, ${alpha})`;
      context.arc(px, py, radius, 0, Math.PI * 2);
      context.fill();
    }
  );

  context.restore();
};

const drawGrid = (
  context: CanvasRenderingContext2D,
  size: CanvasSize,
  rotationY: number,
  profile: SkillProfile
): void => {
  const { height, width } = size;
  const centerX = width * 0.5;
  const horizonY = height * 0.57;

  context.save();
  context.lineWidth = 1;

  for (let index = 0; index < 9; index += 1) {
    const depth = index / 8;
    const lineY = horizonY + depth * depth * height * 0.42;
    const alpha = 0.04 + (1 - depth) * 0.12;

    context.beginPath();
    context.strokeStyle = colorWithAlpha(profile.primaryColor, alpha);
    context.moveTo(width * 0.06, lineY);
    context.lineTo(width * 0.94, lineY);
    context.stroke();
  }

  for (let index = -9; index <= 9; index += 1) {
    const baseX = centerX + index * width * 0.052;
    const horizonX = centerX + index * width * 0.015 - rotationY * width * 0.28;

    context.beginPath();
    context.strokeStyle = colorWithAlpha(
      profile.secondaryColor,
      0.045 + Math.abs(index) * 0.004
    );
    context.moveTo(baseX, height);
    context.lineTo(horizonX, horizonY);
    context.stroke();
  }

  context.restore();
};

const createProjectedNodes = (
  nodes: ExpertiseNode[],
  size: CanvasSize,
  time: number,
  pointerX: number,
  pointerY: number,
  reduceMotion: boolean
): ProjectedNode[] => {
  const centerX = size.width * 0.47;
  const centerY = size.height * 0.62;
  const motionScale = reduceMotion ? 0.22 : 1;
  const rotationX =
    (pointerY - 0.5) * -0.22 + Math.cos(time * 0.00021) * 0.03 * motionScale;
  const rotationY =
    (pointerX - 0.5) * 0.52 + Math.sin(time * 0.00016) * 0.08 * motionScale;

  return nodes.map((node) => {
    const sway = Math.sin(time * 0.00052 + node.phase) * 14 * motionScale;
    const lift = Math.cos(time * 0.00046 + node.phase * 1.8) * 10 * motionScale;
    const depthShift =
      Math.sin(time * 0.00033 + node.phase * 0.7) * 24 * motionScale;
    const animatedPosition = {
      x: node.position.x + sway,
      y: node.position.y + lift,
      z: node.position.z + depthShift,
    };
    const rotatedPosition = rotateX(
      rotateY(animatedPosition, rotationY),
      rotationX
    );
    const depth = rotatedPosition.z + 920;
    const scale = 820 / depth;
    const screenX = centerX + rotatedPosition.x * scale;
    const screenY = centerY + rotatedPosition.y * scale;

    return {
      ...node,
      depth,
      scale,
      screenX,
      screenY,
      visible:
        depth > 0 &&
        screenX > -80 &&
        screenX < size.width + 80 &&
        screenY > -80 &&
        screenY < size.height + 80,
      world: rotatedPosition,
    };
  });
};

const isVisibleEdge = (edge: {
  from?: ProjectedNode;
  to?: ProjectedNode;
}): edge is VisibleEdge =>
  Boolean(edge.from && edge.from.visible && edge.to && edge.to.visible);

const drawOrbitRings = (
  context: CanvasRenderingContext2D,
  rootNode: ProjectedNode,
  time: number,
  profile: SkillProfile
): void => {
  const ringScale = clamp(rootNode.scale * 132, 26, 118);
  const ringOffset = Math.sin(time * 0.0007) * 0.2;

  context.save();
  context.strokeStyle = colorWithAlpha(profile.primaryColor, 0.24);
  context.lineWidth = 1.2;

  context.beginPath();
  context.ellipse(
    rootNode.screenX,
    rootNode.screenY,
    ringScale,
    ringScale * 0.28,
    ringOffset,
    0,
    Math.PI * 2
  );
  context.stroke();

  context.beginPath();
  context.strokeStyle = colorWithAlpha(profile.secondaryColor, 0.2);
  context.ellipse(
    rootNode.screenX,
    rootNode.screenY,
    ringScale * 0.68,
    ringScale * 0.16,
    -ringOffset * 1.5,
    0,
    Math.PI * 2
  );
  context.stroke();
  context.restore();
};

const drawGraph = (
  context: CanvasRenderingContext2D,
  nodes: ProjectedNode[],
  edges: GraphEdge[],
  rootId: string,
  profile: SkillProfile,
  size: CanvasSize,
  time: number
): void => {
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const visibleEdges = edges
    .map((edge) => ({
      from: nodeMap.get(edge.from),
      to: nodeMap.get(edge.to),
    }))
    .filter((edge): edge is VisibleEdge => isVisibleEdge(edge))
    .sort(
      (
        { from: fromNode, to: toNode },
        { from: nextFromNode, to: nextToNode }
      ) =>
        (nextFromNode.depth + nextToNode.depth) / 2 -
        (fromNode.depth + toNode.depth) / 2
    );

  context.save();
  context.globalCompositeOperation = "screen";

  visibleEdges.forEach(({ from, to }, index) => {
    const edgeGradient = context.createLinearGradient(
      from.screenX,
      from.screenY,
      to.screenX,
      to.screenY
    );
    const alpha = clamp(1.1 - (from.depth + to.depth) / 1_900, 0.12, 0.42);

    edgeGradient.addColorStop(0, colorWithAlpha(from.color, alpha));
    edgeGradient.addColorStop(1, colorWithAlpha(to.color, alpha));

    context.beginPath();
    context.lineCap = "round";
    context.lineWidth = clamp((from.scale + to.scale) * 3.6, 1.25, 5);
    context.strokeStyle = edgeGradient;
    context.moveTo(from.screenX, from.screenY);
    context.lineTo(to.screenX, to.screenY);
    context.stroke();

    const travel = (time * (0.00014 + index * 0.0000025) + index * 0.173) % 1;
    const pulseX = from.screenX + (to.screenX - from.screenX) * travel;
    const pulseY = from.screenY + (to.screenY - from.screenY) * travel;
    const pulseRadius = clamp((from.scale + to.scale) * 1.3, 1.8, 4.4);

    context.beginPath();
    context.fillStyle =
      index % 2 === 0
        ? colorWithAlpha(profile.secondaryColor, 0.88)
        : colorWithAlpha(profile.primaryColor, 0.82);
    context.shadowBlur = 18;
    context.shadowColor =
      index % 2 === 0 ? BRANCH_COLORS.amber : BRANCH_COLORS.cyan;
    context.arc(pulseX, pulseY, pulseRadius, 0, Math.PI * 2);
    context.fill();
  });

  nodes
    .filter(({ visible }) => visible)
    .sort((leftNode, rightNode) => rightNode.depth - leftNode.depth)
    .forEach((node) => {
      const radius = clamp(
        node.radius * node.scale,
        2.4,
        node.emphasis === "high" ? 16 : 11
      );
      const haloRadius =
        radius *
        (node.emphasis === "high"
          ? 3.8
          : node.emphasis === "medium"
            ? 3.2
            : 2.6);
      const halo = context.createRadialGradient(
        node.screenX,
        node.screenY,
        0,
        node.screenX,
        node.screenY,
        haloRadius
      );

      halo.addColorStop(0, colorWithAlpha(node.color, 0.6));
      halo.addColorStop(0.45, colorWithAlpha(node.color, 0.13));
      halo.addColorStop(1, colorWithAlpha(node.color, 0));

      context.beginPath();
      context.fillStyle = halo;
      context.arc(node.screenX, node.screenY, haloRadius, 0, Math.PI * 2);
      context.fill();

      context.beginPath();
      context.fillStyle = node.color;
      context.shadowBlur = node.emphasis === "high" ? 20 : 14;
      context.shadowColor = node.color;
      context.arc(node.screenX, node.screenY, radius, 0, Math.PI * 2);
      context.fill();

      context.beginPath();
      context.fillStyle = "rgba(255, 255, 255, 0.84)";
      context.shadowBlur = 0;
      context.arc(
        node.screenX - radius * 0.28,
        node.screenY - radius * 0.24,
        Math.max(1, radius * 0.24),
        0,
        Math.PI * 2
      );
      context.fill();
    });

  const rootNode = nodes.find(({ id }) => id === rootId);

  if (rootNode) {
    drawOrbitRings(context, rootNode, time, profile);
  }

  context.restore();

  nodes
    .filter(({ label, visible }) => label && visible)
    .forEach((node) => {
      const showLabel =
        node.emphasis === "high" ||
        (node.emphasis === "medium" && size.width >= MAJOR_LABEL_BREAKPOINT) ||
        size.width >= MINOR_LABEL_BREAKPOINT;

      if (!showLabel) {
        return;
      }

      const isLeftSide = node.screenX < size.width * 0.45;
      const labelX = node.screenX + (isLeftSide ? -12 : 12);
      const labelY = node.screenY - 12;
      const fontSize = clamp(
        node.emphasis === "high" ? node.scale * 21 : node.scale * 16,
        10,
        17
      );

      context.save();
      context.font = `${node.emphasis === "high" ? 600 : 500} ${fontSize}px "IBM Plex Mono", "JetBrains Mono", monospace`;
      context.textAlign = isLeftSide ? "right" : "left";
      context.textBaseline = "bottom";
      context.shadowBlur = 14;
      context.shadowColor = node.color;
      context.fillStyle =
        node.emphasis === "high"
          ? "rgba(228, 250, 255, 0.95)"
          : "rgba(201, 243, 248, 0.82)";
      context.fillText(node.label || "", labelX, labelY);
      context.restore();
    });
};

const drawProfileButtons = (
  context: CanvasRenderingContext2D,
  buttons: PanelButton[],
  activeProfileId: SkillProfileId,
  hoveredProfileId?: SkillProfileId
): void => {
  buttons.forEach((button) => {
    const profile = PROFILES[button.id];
    const active = button.id === activeProfileId;
    const hovered = button.id === hoveredProfileId;

    context.save();
    context.fillStyle = active
      ? colorWithAlpha(profile.primaryColor, 0.22)
      : hovered
        ? colorWithAlpha(profile.primaryColor, 0.14)
        : "rgba(5, 18, 28, 0.42)";
    context.strokeStyle = active
      ? colorWithAlpha(profile.primaryColor, 0.68)
      : hovered
        ? colorWithAlpha(profile.primaryColor, 0.46)
        : "rgba(107, 232, 255, 0.14)";
    context.lineWidth = active ? 1.4 : 1;
    context.fillRect(button.x, button.y, button.width, button.height);
    context.strokeRect(button.x, button.y, button.width, button.height);
    context.font = `600 11px "IBM Plex Mono", "JetBrains Mono", monospace`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = active
      ? "rgba(244, 252, 255, 0.98)"
      : "rgba(205, 239, 244, 0.86)";
    context.fillText(
      profile.buttonLabel,
      button.x + button.width / 2,
      button.y + button.height / 2 + 0.5
    );
    context.restore();
  });
};

const drawPortfolioPanel = (
  context: CanvasRenderingContext2D,
  size: CanvasSize,
  time: number,
  activeProfileId: SkillProfileId,
  hoveredProfileId?: SkillProfileId
): void => {
  const layout = getPanelLayout(size);
  const buttons = createProfileButtons(layout);
  const profile = PROFILES[activeProfileId];
  const sweep = Math.sin(time * 0.00085) * 0.5 + 0.5;
  const borderGradient = context.createLinearGradient(
    layout.panelX,
    layout.panelY,
    layout.panelX + layout.panelWidth,
    layout.panelY + layout.panelHeight
  );

  borderGradient.addColorStop(0, colorWithAlpha(profile.primaryColor, 0.34));
  borderGradient.addColorStop(
    sweep,
    colorWithAlpha(profile.secondaryColor, 0.36)
  );
  borderGradient.addColorStop(1, colorWithAlpha(profile.primaryColor, 0.22));

  context.save();
  context.fillStyle = "rgba(2, 11, 18, 0.28)";
  context.strokeStyle = borderGradient;
  context.lineWidth = 1.2;
  context.fillRect(
    layout.panelX,
    layout.panelY,
    layout.panelWidth,
    layout.panelHeight
  );
  context.strokeRect(
    layout.panelX,
    layout.panelY,
    layout.panelWidth,
    layout.panelHeight
  );

  context.fillStyle = "rgba(107, 232, 255, 0.84)";
  context.font = `600 ${layout.compactMode ? 11 : 12}px "IBM Plex Mono", "JetBrains Mono", monospace`;
  context.fillText("PORTFOLIO CANOPY", layout.panelX + 18, layout.panelY + 28);
  context.fillText(
    "CLICK A TRACK TO SWAP THE TREE",
    layout.panelX + 18,
    layout.panelY + 44
  );

  drawProfileButtons(context, buttons, activeProfileId, hoveredProfileId);

  context.fillStyle = colorWithAlpha(profile.primaryColor, 0.96);
  context.font = `700 ${layout.compactMode ? 24 : 34}px "IBM Plex Sans", "Segoe UI", sans-serif`;
  context.fillText("Rami Eid", layout.panelX + 18, layout.titleY);

  let cursorY = layout.titleY + (layout.compactMode ? 22 : 28);
  const textWidth = layout.panelWidth - 36;

  context.fillStyle = "rgba(229, 245, 249, 0.9)";
  context.font = `600 ${layout.compactMode ? 12 : 13}px "IBM Plex Mono", "JetBrains Mono", monospace`;
  cursorY = drawWrappedText(
    context,
    profile.title,
    layout.panelX + 18,
    cursorY,
    textWidth,
    15
  );

  context.fillStyle = colorWithAlpha(profile.secondaryColor, 0.86);
  context.font = `500 ${layout.compactMode ? 11 : 12}px "IBM Plex Mono", "JetBrains Mono", monospace`;
  cursorY = drawWrappedText(
    context,
    profile.subtitle,
    layout.panelX + 18,
    cursorY + 4,
    textWidth,
    14
  );

  context.fillStyle = "rgba(216, 243, 248, 0.88)";
  context.font = `500 ${layout.compactMode ? 12 : 13}px "IBM Plex Mono", "JetBrains Mono", monospace`;

  [...profile.lines, ...PROFILE_SUMMARY_LINES].forEach((line, index) => {
    cursorY = drawWrappedText(
      context,
      line,
      layout.panelX + 18,
      cursorY + (index === 0 ? 8 : 4),
      textWidth,
      16
    );
  });

  let chipX = layout.panelX + layout.chipInset;
  let chipY = cursorY + 12;
  const chipRightEdge = layout.panelX + layout.panelWidth - layout.chipInset;

  context.font = `500 ${layout.compactMode ? 10 : 11}px "IBM Plex Mono", "JetBrains Mono", monospace`;

  profile.chips.forEach((label, index) => {
    const labelWidth = context.measureText(label).width + 18;
    const chipWidth = Math.min(
      labelWidth,
      layout.panelWidth - layout.chipInset * 2
    );

    if (chipX + chipWidth > chipRightEdge) {
      chipX = layout.panelX + layout.chipInset;
      chipY += layout.chipHeight + 8;
    }

    if (chipY + layout.chipHeight > layout.panelY + layout.panelHeight - 14) {
      return;
    }

    context.fillStyle =
      index % 2 === 0
        ? colorWithAlpha(profile.primaryColor, 0.14)
        : colorWithAlpha(profile.secondaryColor, 0.14);
    context.strokeStyle =
      index % 2 === 0
        ? colorWithAlpha(profile.primaryColor, 0.34)
        : colorWithAlpha(profile.secondaryColor, 0.34);
    context.fillRect(chipX, chipY, chipWidth, layout.chipHeight);
    context.strokeRect(chipX, chipY, chipWidth, layout.chipHeight);
    context.fillStyle = "rgba(232, 250, 255, 0.82)";
    context.fillText(label, chipX + 9, chipY + layout.chipHeight - 6);

    chipX += chipWidth + 8;
  });

  context.restore();
};

const drawTelemetry = (
  context: CanvasRenderingContext2D,
  size: CanvasSize,
  time: number,
  profile: SkillProfile
): void => {
  const { height, width } = size;

  context.save();
  context.beginPath();
  context.rect(width * 0.04, height * 0.82, width * 0.92, height * 0.13);
  context.clip();
  context.font = `500 ${width < 1_000 ? 10 : 11}px "IBM Plex Mono", "JetBrains Mono", monospace`;
  context.fillStyle = colorWithAlpha(profile.primaryColor, 0.22);

  profile.telemetry.forEach((line, index) => {
    const pattern = `${line}     ${line}     `;
    const textWidth = context.measureText(pattern).width;
    const speed = 20 + index * 8;
    const offset = ((time * speed) / 1_000) % textWidth;
    const y = height * 0.86 + index * 18;

    context.fillText(pattern, width * 0.04 - offset, y);
    context.fillText(pattern, width * 0.04 - offset + textWidth, y);
  });

  context.restore();
};

export const libs: string[] = [];

const dfirPortfolioWallpaper = (el?: HTMLElement | null): void => {
  if (!el) {
    return;
  }

  const desktopElement = el;
  const canvas = document.createElement("canvas");
  const context =
    canvas.getContext("2d", {
      alpha: false,
      desynchronized: true,
    }) || canvas.getContext("2d");

  if (!context) {
    return;
  }

  let activeProfileId: SkillProfileId = "dfir";
  let animationFrame = 0;
  let hoveredProfileId: SkillProfileId | undefined;
  let pointerX = 0.5;
  let pointerY = 0.5;
  let size = createSize();
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const updateCursor = (): void => {
    desktopElement.style.cursor = hoveredProfileId ? "pointer" : "";
  };
  const findHoveredButton = (
    clientX: number,
    clientY: number
  ): PanelButton | undefined =>
    getButtonAt(createProfileButtons(getPanelLayout(size)), clientX, clientY);

  const resizeCanvas = (): void => {
    size = createSize();

    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    canvas.height = Math.floor(size.height * devicePixelRatio);
    canvas.style.height = `${size.height}px`;
    canvas.style.width = `${size.width}px`;
    canvas.width = Math.floor(size.width * devicePixelRatio);

    context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    context.imageSmoothingEnabled = true;
  };

  const handlePointerMove = ({ clientX, clientY }: PointerEvent): void => {
    pointerX = clientX / size.width;
    pointerY = clientY / size.height;
    hoveredProfileId = findHoveredButton(clientX, clientY)?.id;
    updateCursor();
  };

  const handlePointerDown = ({ clientX, clientY }: PointerEvent): void => {
    const clickedButton = findHoveredButton(clientX, clientY);

    if (clickedButton) {
      activeProfileId = clickedButton.id;
      hoveredProfileId = clickedButton.id;
      updateCursor();
    }
  };

  const handlePointerLeave = (): void => {
    hoveredProfileId = undefined;
    pointerX = 0.5;
    pointerY = 0.5;
    updateCursor();
  };

  const render = (time: number): void => {
    const activeProfile = PROFILES[activeProfileId];
    const projectedNodes = createProjectedNodes(
      activeProfile.nodes,
      size,
      time,
      pointerX,
      pointerY,
      reduceMotion
    );

    drawBackdrop(context, size, time, activeProfile);
    drawBackgroundParticles(context, size, time);
    drawGrid(context, size, (pointerX - 0.5) * 0.52, activeProfile);
    drawGraph(
      context,
      projectedNodes,
      activeProfile.edges,
      activeProfile.rootId,
      activeProfile,
      size,
      time
    );
    drawPortfolioPanel(context, size, time, activeProfileId, hoveredProfileId);
    drawTelemetry(context, size, time, activeProfile);

    animationFrame = window.requestAnimationFrame(render);
  };

  resizeCanvas();
  canvas.ariaHidden = "true";
  desktopElement.append(canvas);
  window.addEventListener("pointerdown", handlePointerDown, { passive: true });
  window.addEventListener("pointerleave", handlePointerLeave, {
    passive: true,
  });
  window.addEventListener("pointermove", handlePointerMove, { passive: true });
  window.addEventListener("resize", resizeCanvas, { passive: true });
  animationFrame = window.requestAnimationFrame(render);

  window.WallpaperDestroy = () => {
    desktopElement.style.cursor = "";
    window.cancelAnimationFrame(animationFrame);
    window.removeEventListener("pointerdown", handlePointerDown);
    window.removeEventListener("pointerleave", handlePointerLeave);
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("resize", resizeCanvas);
    window.WallpaperDestroy = undefined;
  };
};

export default dfirPortfolioWallpaper;
