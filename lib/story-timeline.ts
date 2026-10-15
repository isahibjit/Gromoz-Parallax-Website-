import type { StorySceneState } from "./story";
import { createStoryState } from "./story";

export interface SurfaceState {
  x: number;
  y: number;
  scale: number;
  opacity: number;
}
export interface HomeStoryState extends StorySceneState {
  surfaces: {
    model: SurfaceState;
    lead: SurfaceState;
    property: SurfaceState;
    visit: SurfaceState;
    workspace: SurfaceState;
  };
  leadDetails: number;
  leadCompact: number;
  propertyCompact: number;
  visitCompact: number;
  workspaceDetails: number;
  connectorProgress: number;
}
export function createHomeStoryState(): HomeStoryState {
  return {
    ...createStoryState(),
    surfaces: {
      model: { x: 0.48, y: -0.015, scale: 1, opacity: 1 },
      lead: { x: 0.765, y: 0.43, scale: 1, opacity: 1 },
      property: { x: 0.34, y: 0.43, scale: 1, opacity: 0 },
      visit: { x: 0.4, y: 0.38, scale: 1, opacity: 0 },
      workspace: { x: 0.23, y: 0.22, scale: 1, opacity: 0 },
    },
    leadDetails: 0,
    leadCompact: 0,
    propertyCompact: 0,
    visitCompact: 0,
    workspaceDetails: 0,
    connectorProgress: 1,
  };
}

export const storyHolds = [0, 0.17, 0.34, 0.52, 0.7, 0.86, 0.97] as const;
