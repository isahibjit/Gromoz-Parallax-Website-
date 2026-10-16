export const sampleLead = {
  name: "Aarya Mehta",
  initials: "AM",
  id: "GR-1042",
  source: "Website enquiry",
  project: "Harbour House",
  unit: "B-804",
  owner: "Riya Shah",
  ownerInitials: "RS",
  requirement: "3 bedroom apartment",
  area: "1,650 sq ft",
  visitDate: "17 October 2026",
  visitShortDate: "17 Oct",
  visitTime: "11:00 am",
  status: "Follow-up",
  nextAction: "Share the requested property details",
} as const;

export const storyChapters = [
  {
    id: "enquiry",
    label: "Enquiry",
    heading: "Start with the enquiry.",
    text: "A person, a property conversation, and a clear owner.",
    hold: 0.17,
  },
  {
    id: "property",
    label: "Property",
    heading: "Connect it to the right property.",
    text: "Keep the unit and the buyer’s requirements in the same conversation.",
    hold: 0.34,
  },
  {
    id: "visit",
    label: "Visit",
    heading: "Make the site visit the next step.",
    text: "An agreed time, with the right person and property attached.",
    hold: 0.52,
  },
  {
    id: "workspace",
    label: "Workspace",
    heading: "Keep the conversation moving.",
    text: "Bring the enquiry, visit and next action into a shared sales workspace.",
    hold: 0.7,
  },
  {
    id: "progress",
    label: "Next action",
    heading: "See the next action.",
    text: "The visit becomes context for the next conversation.",
    hold: 0.86,
  },
  {
    id: "demo",
    label: "Explore together",
    heading: "Bring your sales process into view.",
    text: "Explore Gromoze with your team’s workflow in mind.",
    hold: 0.97,
  },
] as const;

export interface StorySceneState {
  progress: number;
  camera: {
    x: number;
    y: number;
    z: number;
    targetX: number;
    targetY: number;
    targetZ: number;
  };
  architecture: {
    upperLift: number;
    facadeShift: number;
    unitOffset: number;
    rotationY: number;
    scale: number;
    x: number;
    y: number;
  };
}
export interface ScenePoint {
  x: number;
  y: number;
}
export interface PropertySceneProps {
  state: StorySceneState;
  active: boolean;
  onReady: (invalidate: () => void) => void;
  onProject: (point: ScenePoint) => void;
  onFailure: () => void;
}
// Extra drawing space below the model prevents an internal canvas edge from
// cutting off the podium while its HTML layer moves between story frames.
export const sceneRenderOverscan = 1.15;

export function createStoryState(): StorySceneState {
  return {
    progress: 0,
    camera: { x: 8.2, y: 7.0, z: 10.0, targetX: 0, targetY: 3.0, targetZ: 0 },
    architecture: {
      upperLift: 0,
      facadeShift: 0,
      unitOffset: 0,
      rotationY: 0,
      scale: 1,
      x: 0,
      y: 0,
    },
  };
}
