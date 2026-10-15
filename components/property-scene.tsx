"use client";

import { Component, useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { addAfterEffect, Canvas, useFrame, useThree } from "@react-three/fiber";
import { ACESFilmicToneMapping, Color, InstancedMesh, Object3D, Vector3, type Group } from "three";
import type { PropertySceneProps } from "@/lib/story";

type Position = readonly [number, number, number];
interface Block { readonly position: Position; readonly size: Position; readonly color?: string }
interface Structure { stone: Block[]; glass: Block[]; metal: Block[]; timber: Block[]; greenery: Block[]; interior: Block[]; water: Block[] }

const palette = {
  stone: "#e8e5da", glass: "#304f60", metal: "#394a4d", timber: "#b4a58b",
  greenery: "#77836b", teal: "#009a9a", tealLight: "#9dc9c3", upholstery: "#eeece0",
  pool: "#3ecdc6", poolDeep: "#1ab5af", poolEdge: "#d6d2c6",
};
const floorHeight = 0.40;
const podiumHeight = 0.52;
const totalFloors = 13;
const selectedFloorIndex = 8;
const selectedFloorY = podiumHeight + selectedFloorIndex * floorHeight;
const selectedPosition: Position = [0.75, selectedFloorY, 0.58];
const emptyStructure = (): Structure => ({ stone: [], glass: [], metal: [], timber: [], greenery: [], interior: [], water: [] });

function add(target: Block[], x: number, y: number, z: number, width: number, height: number, depth: number) {
  target.push({ position: [x, y, z], size: [width, height, depth] });
}

/** Deterministic clusters share one low-polygon geometry, including the rooftop planting. */
function plant(structure: Structure, x: number, y: number, z: number, height: number, seed: number, lush = false) {
  add(structure.timber, x, y + height * 0.36, z, height * 0.045, height * 0.7, height * 0.045);
  const count = lush ? 14 : 9;
  for (let index = 0; index < count; index++) {
    const angle = index * 2.4 + seed;
    const radius = height * (index % 3 === 0 ? 0.08 : lush ? 0.26 : 0.2);
    const scale = height * (0.17 + (index % 3) * 0.025) * (lush ? 1.15 : 1);
    structure.greenery.push({
      position: [x + Math.cos(angle) * radius, y + height * (0.64 + (index % 3) * 0.09), z + Math.sin(angle) * radius],
      size: [scale * 1.1, scale, scale * 0.9],
      color: index % 3 === 0 ? palette.greenery : index % 3 === 1 ? "#65745a" : "#92967a",
    });
  }
}

/** Large trees for the ground level — taller trunks and bigger canopies. */
function largeTree(structure: Structure, x: number, y: number, z: number, height: number, seed: number) {
  add(structure.timber, x, y + height * 0.34, z, height * 0.035, height * 0.68, height * 0.035);
  for (let index = 0; index < 16; index++) {
    const angle = index * 1.9 + seed;
    const radius = height * (index % 4 === 0 ? 0.06 : index % 4 === 1 ? 0.22 : 0.3);
    const scale = height * (0.14 + (index % 3) * 0.03);
    structure.greenery.push({
      position: [x + Math.cos(angle) * radius, y + height * (0.58 + (index % 4) * 0.08), z + Math.sin(angle) * radius],
      size: [scale * 1.2, scale * 1.1, scale],
      color: index % 4 === 0 ? "#5a6b4e" : index % 4 === 1 ? palette.greenery : index % 4 === 2 ? "#65745a" : "#8a9672",
    });
  }
}

/** Shared box instances form a real, proportionate architectural grid. */
function floors(from: number, to: number): Structure {
  const result = emptyStructure();
  for (let index = from; index <= to; index++) {
    const y = podiumHeight + index * floorHeight;
    const isSelected = index === selectedFloorIndex;
    // Separate slender slab edges from the recessed rooms and balcony decks.
    add(result.stone, 0, y, 0, 3.24, 0.05, 2.44);
    add(result.timber, 0.02, y + 0.03, 0.06, 2.66, 0.014, 1.94);
    add(result.stone, -1.37, y + 0.21, -0.13, 0.2, 0.34, 1.86);
    add(result.stone, 0, y + 0.21, -1.0, 2.84, 0.34, 0.16);
    add(result.stone, -0.38, y + 0.20, -0.27, 0.16, 0.33, 1.42);
    add(result.stone, 0.6, y + 0.20, -0.65, 1.35, 0.33, 0.08);
    // Warm rooms sit behind actual translucent glazing, rather than painted dark windows.
    add(result.interior, -0.87, y + 0.20, 0.47, 0.81, 0.30, 0.022);
    if (!isSelected) {
      add(result.interior, 0.78, y + 0.19, 0.28, 0.99, 0.29, 0.028);
      add(result.interior, 1.04, y + 0.19, -0.14, 0.025, 0.29, 0.78);
      add(result.interior, 0.74, y + 0.11, 0.58, 0.51, 0.12, 0.18);
      add(result.timber, 1.05, y + 0.09, 0.53, 0.23, 0.025, 0.23);
    }
    for (const x of [-1.07, -0.58, -0.09, 0.4, 0.89, 1.3]) {
      if (!isSelected || x < 0.3) {
        add(result.glass, x, y + 0.22, 0.81, 0.46, 0.32, 0.014);
        add(result.metal, x - 0.235, y + 0.22, 0.83, 0.012, 0.33, 0.024);
        if ((index + Math.round(x * 10)) % 3 === 0) {
          // Narrow curtains leave the furnished glazing legible at the hero distance.
          add(result.interior, x - 0.14, y + 0.22, 0.77, 0.09, 0.30, 0.015);
        }
      }
    }
    for (const z of [-0.7, -0.21, 0.28, 0.76]) {
      if (!isSelected || z < 0) {
        add(result.glass, 1.36, y + 0.22, z, 0.014, 0.32, 0.46);
        add(result.metal, 1.38, y + 0.22, z - 0.235, 0.024, 0.33, 0.012);
      }
    }
    // Balcony rails stay thin enough to retain the depth of the recessed glazing.
    add(result.metal, 0, y + 0.22, 1.15, 3.12, 0.01, 0.01);
    add(result.metal, 0, y + 0.07, 1.15, 3.12, 0.007, 0.01);
    add(result.metal, 1.56, y + 0.22, 0, 0.01, 0.01, 2.3);
    add(result.metal, 1.56, y + 0.07, 0, 0.01, 0.007, 2.3);
    for (const x of [-1.53, -1.03, -0.51, 0, 0.51, 1.03, 1.53]) {
      add(result.metal, x, y + 0.145, 1.15, 0.008, 0.15, 0.008);
    }
    for (const z of [-1.12, -0.56, 0, 0.56]) add(result.metal, 1.56, y + 0.145, z, 0.008, 0.15, 0.008);
    for (const x of [-1.54, -0.42, 0.51]) {
      if (!isSelected || x < 0) add(result.stone, x, y + 0.215, 0.96, x === -0.42 ? 0.18 : 0.045, 0.35, 0.35);
    }
    // A recessed vertical screen breaks the repetitive horizontal floor grid.
    for (const x of [-0.31, -0.24, -0.17, -0.1]) add(result.timber, x, y + 0.21, 0.88, 0.025, 0.36, 0.11);
    add(result.timber, -0.91, y + 0.065, 0.95, 0.69, 0.025, 0.24);
    // Balcony planting on every other floor
    if (index % 2 === 1) {
      add(result.stone, -1.11, y + 0.10, 1.02, 0.45, 0.09, 0.16);
      plant(result, -1.12, y + 0.14, 1.02, index % 4 === 1 ? 0.28 : 0.20, index);
    }
    if (index % 3 === 0 && !isSelected) {
      add(result.stone, 1.47, y + 0.08, -0.65, 0.14, 0.07, 0.49);
      plant(result, 1.47, y + 0.12, -0.67, 0.24, index + 3);
    }
    // Side balcony planters for added greenery
    if (index % 4 === 2) {
      add(result.stone, 1.47, y + 0.08, 0.4, 0.14, 0.07, 0.35);
      plant(result, 1.47, y + 0.12, 0.4, 0.18, index + 7);
    }
  }
  return result;
}

const lowerFloors = floors(0, selectedFloorIndex - 1);
const selectedFloor = floors(selectedFloorIndex, selectedFloorIndex);
const upperFloors = floors(selectedFloorIndex + 1, totalFloors - 1);

// ─── Enhanced podium / base ─────────────────────────────────────────
const base = emptyStructure();
// Ground platform
add(base.stone, 0, 0.045, 0, 4.6, 0.09, 3.7);
add(base.stone, 0, 0.135, 0, 4.3, 0.08, 3.4);
// Entrance canopy
add(base.stone, 0, 0.42, 0.92, 1.9, 0.04, 0.55);
add(base.metal, -0.88, 0.24, 1.05, 0.025, 0.36, 0.025);
add(base.metal, 0.88, 0.24, 1.05, 0.025, 0.36, 0.025);
// Lobby glass front
add(base.glass, 0, 0.30, 0.7, 2.65, 0.26, 0.025);
add(base.interior, 0, 0.29, 0.47, 2.6, 0.25, 0.025);
// Interior warmth behind lobby glass
add(base.interior, -0.5, 0.28, 0.40, 0.7, 0.22, 0.02);
add(base.interior, 0.5, 0.28, 0.40, 0.7, 0.22, 0.02);
// Walls
add(base.stone, -1.37, 0.30, 0, 0.18, 0.28, 2.2);
add(base.stone, 1.37, 0.30, 0, 0.18, 0.28, 2.2);
add(base.stone, 0, 0.30, -0.82, 2.7, 0.28, 0.2);
// Entrance columns
add(base.stone, -0.52, 0.32, 1.0, 0.07, 0.28, 0.26);
add(base.stone, 0.52, 0.32, 1.0, 0.07, 0.28, 0.26);
// Entrance deck
add(base.timber, 0, 0.42, 1.25, 1.5, 0.035, 0.8);
// Covered parking area (reference shows a more substantial base)
add(base.stone, -1.78, 0.22, -0.06, 0.34, 0.17, 2.6);
add(base.stone, 1.78, 0.22, -0.06, 0.34, 0.17, 2.6);
// Parking shade structure
add(base.metal, -2.0, 0.38, 0.2, 0.01, 0.28, 0.01);
add(base.metal, -2.0, 0.38, -0.6, 0.01, 0.28, 0.01);
add(base.stone, -2.0, 0.52, -0.2, 0.8, 0.025, 0.9);
add(base.metal, 2.0, 0.38, 0.2, 0.01, 0.28, 0.01);
add(base.metal, 2.0, 0.38, -0.6, 0.01, 0.28, 0.01);
add(base.stone, 2.0, 0.52, -0.2, 0.8, 0.025, 0.9);
// Large trees at ground level — prominent landscaping
for (const [index, z] of [-0.9, -0.3, 0.35, 0.85].entries()) {
  largeTree(base, -1.78, 0.30, z, 0.9 + (index % 2) * 0.15, index);
  largeTree(base, 1.78, 0.30, z, 0.85 + (index % 2) * 0.2, index + 5);
}
// Additional landscaping around the entrance
for (const x of [-1.3, 1.23]) {
  add(base.stone, x, 0.22, 1.43, 0.63, 0.15, 0.3);
  plant(base, x, 0.30, 1.43, 0.5, x, true);
}
// Metal entrance railing
for (const x of [-0.51, 0.51]) add(base.metal, x, 0.29, 0.74, 0.018, 0.24, 0.025);
// Driveway marking
add(base.stone, 0, 0.006, 1.65, 2.4, 0.012, 0.35);

// ─── Enhanced rooftop with pool ─────────────────────────────────────
const roof = emptyStructure();
const roofY = podiumHeight + totalFloors * floorHeight;
// Main roof slab
add(roof.stone, 0, roofY, 0, 3.35, 0.06, 2.55);
// Rooftop pool — the striking teal feature visible in the reference
add(roof.stone, 0.45, roofY + 0.04, 0.18, 1.6, 0.07, 1.1); // pool edge/rim
roof.water.push({ position: [0.45, roofY + 0.08, 0.18], size: [1.48, 0.025, 0.98] }); // water surface
add(roof.stone, 0.45, roofY + 0.02, 0.18, 1.52, 0.04, 1.02); // pool basin
// Pool infinity edge (front)
add(roof.glass, 0.45, roofY + 0.05, 0.72, 1.5, 0.05, 0.015);
// Pool deck surrounding
add(roof.timber, 0.45, roofY + 0.035, 0.83, 1.7, 0.012, 0.16);
add(roof.timber, 0.45, roofY + 0.035, -0.47, 1.7, 0.012, 0.16);
add(roof.timber, -0.35, roofY + 0.035, 0.18, 0.16, 0.012, 1.14);
add(roof.timber, 1.28, roofY + 0.035, 0.18, 0.16, 0.012, 1.14);
// Pool lounge chairs
for (const x of [0.0, 0.35, 0.7]) {
  add(roof.interior, x, roofY + 0.06, 0.88, 0.22, 0.02, 0.08);
  add(roof.interior, x, roofY + 0.08, 0.92, 0.22, 0.06, 0.015);
}
// Rooftop mechanical/penthouse enclosure
add(roof.stone, -0.50, roofY + 0.22, -0.32, 1.18, 0.38, 1.08);
add(roof.stone, -0.50, roofY + 0.42, -0.32, 1.28, 0.04, 1.18);
add(roof.glass, -0.49, roofY + 0.19, 0.23, 0.72, 0.28, 0.02);
// Parapet walls
add(roof.stone, 0, roofY + 0.10, -1.16, 3.18, 0.15, 0.07);
add(roof.stone, -1.55, roofY + 0.10, 0, 0.07, 0.15, 2.27);
// Rooftop pergola / louvre structure (visible in reference)
for (const x of [0.25, 1.25]) {
  add(roof.metal, x, roofY + 0.06, -0.78, 0.018, 0.44, 0.018);
  add(roof.metal, x, roofY + 0.06, -0.32, 0.018, 0.44, 0.018);
}
// Louvre slats
for (let i = 0; i < 8; i++) {
  const z = -0.78 + i * 0.065;
  add(roof.timber, 0.75, roofY + 0.49, z, 1.14, 0.022, 0.035);
}
// Rooftop planters and greenery
for (const x of [0.35, 0.9]) {
  add(roof.stone, x, roofY + 0.08, -0.78, 0.38, 0.10, 0.48);
  plant(roof, x, roofY + 0.14, -0.78, 0.38, x * 3, true);
}
// Small trees on rooftop garden area
largeTree(roof, -1.2, roofY + 0.06, 0.6, 0.5, 11);
plant(roof, -0.7, roofY + 0.06, 0.7, 0.3, 13, true);
// Rooftop furniture area
add(roof.interior, -0.8, roofY + 0.10, 0.52, 0.55, 0.12, 0.22);
add(roof.interior, -0.8, roofY + 0.19, 0.60, 0.55, 0.09, 0.045);
add(roof.timber, -0.6, roofY + 0.08, 0.28, 0.36, 0.03, 0.25);
// Balustrades
for (const x of [-1.55, 1.55]) add(roof.metal, x, roofY + 0.18, 0.3, 0.01, 0.01, 1.62);
add(roof.metal, 0, roofY + 0.18, 1.13, 3.12, 0.01, 0.01);

// ─── Selected unit interior ─────────────────────────────────────────
const room = emptyStructure();
add(room.stone, 0, 0.07, 0, 1.39, 0.04, 1.06);
add(room.stone, -0.67, 0.22, -0.09, 0.045, 0.29, 0.88);
add(room.stone, 0, 0.22, -0.52, 1.38, 0.29, 0.045);
add(room.timber, -0.36, 0.11, -0.1, 0.44, 0.04, 0.3);
add(room.interior, -0.39, 0.17, -0.28, 0.56, 0.14, 0.23);
add(room.interior, -0.39, 0.22, -0.36, 0.56, 0.10, 0.07);
add(room.interior, 0.39, 0.17, -0.07, 0.34, 0.10, 0.34);
add(room.timber, 0.38, 0.12, 0.3, 0.29, 0.055, 0.27);
plant(room, 0.51, 0.09, -0.37, 0.29, 2);
const selectedTrim: Block[] = [
  { position: [0, 0.065, 0.02], size: [1.49, 0.04, 1.16] },
  { position: [0, 0.385, 0.59], size: [1.49, 0.035, 0.035] },
  { position: [0, 0.385, -0.55], size: [1.49, 0.035, 0.035] },
  { position: [0.73, 0.385, 0.02], size: [0.035, 0.035, 1.16] },
  { position: [-0.73, 0.385, 0.02], size: [0.035, 0.035, 1.16] },
  { position: [0.73, 0.23, 0.59], size: [0.028, 0.32, 0.028] },
  { position: [-0.73, 0.23, 0.59], size: [0.028, 0.32, 0.028] },
];
const selectedGlass: Block[] = [
  { position: [0, 0.23, 0.57], size: [1.42, 0.29, 0.015] },
  { position: [0.72, 0.23, 0.02], size: [0.015, 0.29, 1.1] },
  { position: [0, 0.386, 0.02], size: [1.45, 0.012, 1.1] },
];
const facade: Block[] = [
  { position: [0.51, selectedFloorY + 0.22, 0.96], size: [0.06, 0.35, 0.36] },
  { position: [1.51, selectedFloorY + 0.22, 0.96], size: [0.06, 0.35, 0.36] },
];

interface BoxInstancesProps {
  blocks: readonly Block[];
  color: string;
  opacity?: number;
  roughness?: number;
  metalness?: number;
  foliage?: boolean;
  warmth?: number;
}

function BoxInstances({ blocks, color, opacity = 1, roughness = 0.82, metalness = 0.02, foliage = false, warmth = 0 }: BoxInstancesProps) {
  const mesh = useRef<InstancedMesh>(null);
  useLayoutEffect(() => {
    if (!mesh.current) return;
    const transform = new Object3D();
    const tint = new Color();
    blocks.forEach((block, index) => {
      transform.position.set(...block.position);
      transform.scale.set(...block.size);
      transform.updateMatrix();
      mesh.current?.setMatrixAt(index, transform.matrix);
      mesh.current?.setColorAt(index, tint.set(block.color ?? color));
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
    mesh.current.computeBoundingSphere();
  }, [blocks, color]);
  if (blocks.length === 0) return null;
  return <instancedMesh ref={mesh} args={[undefined, undefined, blocks.length]} castShadow={opacity === 1} receiveShadow={opacity === 1}>
    {foliage ? <icosahedronGeometry args={[1, 1]} /> : <boxGeometry args={[1, 1, 1]} />}
    <meshStandardMaterial color="white" roughness={roughness} metalness={metalness} transparent={opacity < 1} opacity={opacity} depthWrite={opacity === 1} emissive={palette.timber} emissiveIntensity={warmth} />
  </instancedMesh>;
}

/** Pool water surface with unique material — translucent teal, slight emissive glow. */
function WaterInstances({ blocks }: { blocks: readonly Block[] }) {
  const mesh = useRef<InstancedMesh>(null);
  useLayoutEffect(() => {
    if (!mesh.current) return;
    const transform = new Object3D();
    const tint = new Color();
    blocks.forEach((block, index) => {
      transform.position.set(...block.position);
      transform.scale.set(...block.size);
      transform.updateMatrix();
      mesh.current?.setMatrixAt(index, transform.matrix);
      mesh.current?.setColorAt(index, tint.set(block.color ?? palette.pool));
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
    mesh.current.computeBoundingSphere();
  }, [blocks]);
  if (blocks.length === 0) return null;
  return <instancedMesh ref={mesh} args={[undefined, undefined, blocks.length]} receiveShadow>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color={palette.pool} roughness={0.1} metalness={0.05} transparent opacity={0.82} emissive={palette.poolDeep} emissiveIntensity={0.25} />
  </instancedMesh>;
}

function StructureInstances({ structure }: { structure: Structure }) {
  return <>
    <BoxInstances blocks={structure.stone} color={palette.stone} />
    <BoxInstances blocks={structure.glass} color={palette.glass} opacity={0.38} roughness={0.18} metalness={0.25} />
    <BoxInstances blocks={structure.metal} color={palette.metal} roughness={0.48} metalness={0.32} />
    <BoxInstances blocks={structure.timber} color={palette.timber} />
    <BoxInstances blocks={structure.greenery} color={palette.greenery} foliage />
    <BoxInstances blocks={structure.interior} color={palette.upholstery} warmth={0.22} />
    <WaterInstances blocks={structure.water} />
  </>;
}

function Architecture({ state, active, onReady, onProject, onFailure }: PropertySceneProps) {
  const building = useRef<Group>(null);
  const upper = useRef<Group>(null);
  const outerFacade = useRef<Group>(null);
  const selectedUnit = useRef<Group>(null);
  const point = useRef(new Vector3());
  const { invalidate, gl, setFrameloop } = useThree();

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    const canvas = gl.domElement;
    let measuredFrame = -1;
    // useFrame runs before gl.render. Read renderer.info after the real draw so
    // these are observed frame costs, including culling, rather than model totals.
    const unsubscribe = addAfterEffect(() => {
      const { render, memory } = gl.info;
      if (render.frame === measuredFrame) return;
      measuredFrame = render.frame;
      canvas.dataset.sceneMetrics = "rendered";
      canvas.dataset.renderCalls = String(render.calls);
      canvas.dataset.renderTriangles = String(render.triangles);
      canvas.dataset.renderFrame = String(render.frame);
      canvas.dataset.renderGeometries = String(memory.geometries);
      canvas.dataset.renderTextures = String(memory.textures);
      canvas.dataset.renderPrograms = String(gl.info.programs?.length ?? 0);
      canvas.dataset.renderDpr = String(gl.getPixelRatio());
      canvas.dataset.renderWidth = String(canvas.width);
      canvas.dataset.renderHeight = String(canvas.height);
      canvas.dataset.renderProgress = state.progress.toFixed(4);
    });
    return unsubscribe;
  }, [gl, state]);

  useEffect(() => {
    const requestFrame = () => { if (active && !document.hidden) invalidate(); };
    const onVisibility = () => {
      const rendering = active && !document.hidden;
      if (rendering && gl.domElement.isConnected && gl.getContext().isContextLost()) {
        setFrameloop("never");
        onFailure();
        return;
      }
      setFrameloop(rendering ? "demand" : "never");
      if (process.env.NODE_ENV === "development") gl.domElement.setAttribute("data-render-active", String(rendering));
      requestFrame();
    };
    onReady(requestFrame);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [active, gl, invalidate, onFailure, onReady, setFrameloop]);

  useFrame(({ camera, size }) => {
    if (!active || document.hidden || !building.current || !upper.current || !outerFacade.current || !selectedUnit.current) return;
    const { architecture, camera: view } = state;
    camera.position.set(view.x, view.y, view.z);
    camera.lookAt(view.targetX, view.targetY, view.targetZ);
    camera.updateMatrixWorld();
    building.current.position.set(architecture.x, architecture.y, 0);
    building.current.rotation.y = architecture.rotationY;
    building.current.scale.setScalar(architecture.scale);
    upper.current.position.y = architecture.upperLift;
    outerFacade.current.position.set(architecture.facadeShift * 0.55, 0, architecture.facadeShift);
    selectedUnit.current.position.set(selectedPosition[0] + architecture.unitOffset * 0.3, selectedPosition[1], selectedPosition[2] + architecture.unitOffset);
    building.current.updateMatrixWorld(true);
    point.current.set(0.74, 0.26, 0.59);
    selectedUnit.current.localToWorld(point.current).project(camera);
    onProject({ x: (point.current.x * 0.5 + 0.5) * size.width, y: (-point.current.y * 0.5 + 0.5) * size.height });
  });

  return <>
    <ambientLight intensity={0.38} />
    <hemisphereLight args={["#fffdf4", "#a5aaa3", 1.2]} />
    <directionalLight position={[-4, 9, 7]} intensity={3.0} color="#fff7e6" castShadow
      shadow-mapSize-width={1024} shadow-mapSize-height={1024}
      shadow-camera-left={-5} shadow-camera-right={5} shadow-camera-top={8} shadow-camera-bottom={-4}
      shadow-camera-near={0.5} shadow-camera-far={25} shadow-bias={-0.0002} shadow-normalBias={0.015} />
    <directionalLight position={[8, 5, -4]} intensity={0.8} color="#e3edf1" />
    {/* Subtle fill for interior warmth */}
    <pointLight position={[0, 3, 1.2]} intensity={0.35} color="#ffe8c0" distance={8} decay={2} />
    <group ref={building}>
      <group name="podium"><StructureInstances structure={base} /></group>
      <group name="lower-floors"><StructureInstances structure={lowerFloors} /></group>
      <group name="selected-floor"><StructureInstances structure={selectedFloor} /></group>
      <group ref={upper} name="upper-floors"><StructureInstances structure={upperFloors} /><StructureInstances structure={roof} /></group>
      <group ref={outerFacade} name="selected-facade">
        <BoxInstances blocks={facade} color={palette.stone} />
        <group position={selectedPosition}><BoxInstances blocks={selectedGlass} color={palette.teal} opacity={0.3} roughness={0.15} metalness={0.15} /></group>
      </group>
      <group ref={selectedUnit} position={selectedPosition} name="selected-unit-b-804">
        <BoxInstances blocks={selectedTrim} color={palette.teal} roughness={0.35} metalness={0.15} />
        <StructureInstances structure={room} />
      </group>
      <mesh name="ground-contact-shadow" rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.007, 0]} receiveShadow>
        <planeGeometry args={[18, 18]} />
        <shadowMaterial transparent opacity={0.15} depthWrite={false} />
      </mesh>
    </group>
  </>;
}

class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

/** Browser-only, demand-rendered scene. The HTML composition supplies its poster and accessible description. */
export default function PropertyScene(props: PropertySceneProps) {
  const [supported, setSupported] = useState(false);
  const mounted = useRef(false);
  const active = useRef(props.active);
  const attachedCanvas = useRef<HTMLCanvasElement | null>(null);
  const failureReported = useRef(false);
  const pendingFailure = useRef(false);
  const failureCallback = useRef(props.onFailure);
  const [reportFailure] = useState(() => () => {
    if (!mounted.current || failureReported.current) return;
    pendingFailure.current = true;
    if (!active.current || document.hidden) return;
    failureReported.current = true;
    failureCallback.current();
  });
  useLayoutEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);
  useLayoutEffect(() => {
    active.current = props.active;
    failureCallback.current = props.onFailure;
  }, [props.active, props.onFailure]);
  useEffect(() => {
    const resumeFailure = () => { if (pendingFailure.current) reportFailure(); };
    resumeFailure();
    document.addEventListener("visibilitychange", resumeFailure);
    return () => document.removeEventListener("visibilitychange", resumeFailure);
  }, [props.active, reportFailure]);
  const attachCanvas = useCallback((canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    attachedCanvas.current = canvas;
    const onContextLost = (event: Event) => {
      // R3F intentionally loses its renderer context after unmount. Detached or
      // superseded canvases must never disable a new mounted story instance.
      if (attachedCanvas.current !== canvas || !canvas.isConnected || !mounted.current) return;
      event.preventDefault();
      if (active.current && !document.hidden) reportFailure();
    };
    // Covers a renderer-creation failure after a successful capability probe.
    canvas.addEventListener("webglcontextcreationerror", reportFailure);
    canvas.addEventListener("webglcontextlost", onContextLost);
    return () => {
      if (attachedCanvas.current === canvas) attachedCanvas.current = null;
      canvas.removeEventListener("webglcontextcreationerror", reportFailure);
      canvas.removeEventListener("webglcontextlost", onContextLost);
    };
  }, [reportFailure]);

  useEffect(() => {
    // Three r180 requires WebGL2. Probe before Canvas because renderer configuration is async.
    // Give the useful HTML/poster a paint before allocating a graphics context.
    const frame = requestAnimationFrame(() => {
      const probe = document.createElement("canvas");
      try {
        const context = probe.getContext("webgl2");
        if (!context) { reportFailure(); return; }
        context.getExtension("WEBGL_lose_context")?.loseContext();
        setSupported(true);
      } catch { reportFailure(); }
    });
    return () => cancelAnimationFrame(frame);
  }, [reportFailure]);

  if (!supported) return null;
  return <SceneBoundary onFailure={reportFailure}>
    <Canvas
      ref={attachCanvas}
      aria-hidden="true"
      frameloop={props.active ? "demand" : "never"}
      shadows="soft"
      resize={{ offsetSize: true, scroll: false }}
      dpr={[1, 1.5]}
      camera={{ position: [9, 7, 11], fov: 34, near: 0.1, far: 80 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      onCreated={({ gl }) => { gl.setClearColor("#f5f5f0", 0); gl.toneMapping = ACESFilmicToneMapping; gl.toneMappingExposure = 1; }}
      style={{ pointerEvents: "none" }}
    >
      <Architecture {...props} onFailure={reportFailure} />
    </Canvas>
  </SceneBoundary>;
}
