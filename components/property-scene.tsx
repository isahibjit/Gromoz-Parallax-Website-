"use client";

import { Component, useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { addAfterEffect, Canvas, useFrame, useThree } from "@react-three/fiber";
import { ACESFilmicToneMapping, InstancedMesh, Object3D, Vector3, type Group } from "three";
import type { PropertySceneProps } from "@/lib/story";

type Position = readonly [number, number, number];
interface Block { readonly position: Position; readonly size: Position }
interface Structure { stone: Block[]; glass: Block[]; metal: Block[]; timber: Block[]; greenery: Block[] }

const palette = {
  stone: "#e8e5da", glass: "#304f60", metal: "#c9c6b9", timber: "#b4a58b",
  greenery: "#77836b", teal: "#009a9a", tealLight: "#9dc9c3", upholstery: "#eeece0",
};
const floorHeight = 0.44;
const podiumHeight = 0.46;
const selectedFloorY = podiumHeight + 7 * floorHeight;
const selectedPosition: Position = [0.75, selectedFloorY, 0.58];
const emptyStructure = (): Structure => ({ stone: [], glass: [], metal: [], timber: [], greenery: [] });

function add(target: Block[], x: number, y: number, z: number, width: number, height: number, depth: number) {
  target.push({ position: [x, y, z], size: [width, height, depth] });
}

/** Shared box instances form a real, proportionate architectural grid. */
function floors(from: number, to: number): Structure {
  const result = emptyStructure();
  for (let index = from; index <= to; index++) {
    const y = podiumHeight + index * floorHeight;
    const isSelected = index === 7;
    add(result.stone, 0, y, 0, 3.24, 0.085, 2.44);
    add(result.stone, -1.37, y + 0.23, -0.13, 0.2, 0.38, 1.86);
    add(result.stone, 0, y + 0.23, -1.0, 2.84, 0.38, 0.16);
    add(result.stone, -0.28, y + 0.22, -0.27, 0.1, 0.36, 1.42);
    add(result.stone, 0.6, y + 0.22, -0.65, 1.35, 0.36, 0.08);
    for (const x of [-1.07, -0.58, -0.09, 0.4, 0.89, 1.3]) {
      if (!isSelected || x < 0.3) {
        add(result.glass, x, y + 0.24, 0.81, 0.42, 0.35, 0.035);
        add(result.metal, x - 0.225, y + 0.24, 0.84, 0.018, 0.36, 0.04);
      }
    }
    for (const z of [-0.7, -0.21, 0.28, 0.76]) {
      if (!isSelected || z < 0) {
        add(result.glass, 1.36, y + 0.24, z, 0.035, 0.35, 0.43);
        add(result.metal, 1.39, y + 0.24, z - 0.23, 0.04, 0.36, 0.018);
      }
    }
    // Balcony rails stay thin enough to retain the depth of the recessed glazing.
    add(result.metal, 0, y + 0.26, 1.15, 3.12, 0.018, 0.018);
    add(result.metal, 0, y + 0.08, 1.15, 3.12, 0.012, 0.018);
    add(result.metal, 1.56, y + 0.26, 0, 0.018, 0.018, 2.3);
    add(result.metal, 1.56, y + 0.08, 0, 0.018, 0.012, 2.3);
    for (const x of [-1.53, -1.03, -0.51, 0, 0.51, 1.03, 1.53]) {
      add(result.metal, x, y + 0.17, 1.15, 0.014, 0.18, 0.014);
    }
    for (const z of [-1.12, -0.56, 0, 0.56]) add(result.metal, 1.56, y + 0.17, z, 0.014, 0.18, 0.014);
    for (const x of [-1.54, -0.5, 0.51]) {
      if (!isSelected || x < 0) add(result.stone, x, y + 0.235, 0.96, 0.06, 0.38, 0.36);
    }
    add(result.timber, -0.91, y + 0.07, 0.95, 0.69, 0.025, 0.24);
    if (index % 3 === 1) {
      add(result.stone, -1.11, y + 0.11, 1.02, 0.45, 0.1, 0.16);
      add(result.greenery, -1.11, y + 0.18, 1.02, 0.39, 0.08, 0.13);
    }
  }
  return result;
}

const lowerFloors = floors(0, 6);
const selectedFloor = floors(7, 7);
const upperFloors = floors(8, 10);
const base = emptyStructure();
add(base.stone, 0, 0.055, 0, 4.05, 0.11, 3.2);
add(base.stone, 0, 0.155, 0, 3.65, 0.09, 2.82);
add(base.glass, 0, 0.32, 0.7, 2.65, 0.28, 0.12);
add(base.stone, -1.37, 0.32, 0, 0.18, 0.3, 2.2);
add(base.stone, 1.37, 0.32, 0, 0.18, 0.3, 2.2);
add(base.stone, 0, 0.32, -0.82, 2.7, 0.3, 0.2);
add(base.stone, -0.52, 0.34, 1.0, 0.07, 0.3, 0.26);
add(base.stone, 0.52, 0.34, 1.0, 0.07, 0.3, 0.26);
add(base.timber, 0, 0.44, 1.2, 1.3, 0.06, 0.7);
for (const x of [-1.65, 1.65]) {
  add(base.stone, x, 0.23, -0.1, 0.25, 0.18, 2.1);
  for (const z of [-0.8, -0.25, 0.3, 0.8]) add(base.greenery, x, 0.35, z, 0.2, 0.12, 0.33);
}

const roof = emptyStructure();
const roofY = podiumHeight + 11 * floorHeight;
add(roof.stone, 0, roofY, 0, 3.35, 0.1, 2.55);
add(roof.stone, -0.46, roofY + 0.23, -0.32, 1.22, 0.4, 1.08);
add(roof.stone, -0.46, roofY + 0.45, -0.32, 1.33, 0.07, 1.19);
add(roof.glass, -0.45, roofY + 0.2, 0.23, 0.76, 0.3, 0.02);
add(roof.stone, 0, roofY + 0.11, -1.16, 3.18, 0.17, 0.07);
add(roof.stone, -1.55, roofY + 0.11, 0, 0.07, 0.17, 2.27);
for (const x of [0.45, 1.0]) {
  add(roof.stone, x, roofY + 0.1, -0.78, 0.38, 0.12, 0.48);
  add(roof.greenery, x, roofY + 0.19, -0.78, 0.32, 0.1, 0.4);
}
for (const z of [0.1, 0.34, 0.58, 0.82]) add(roof.timber, 0.85, roofY + 0.12, z, 0.95, 0.035, 0.12);

const room = emptyStructure();
add(room.stone, 0, 0.075, 0, 1.39, 0.045, 1.06);
add(room.stone, -0.67, 0.24, -0.09, 0.045, 0.32, 0.88);
add(room.stone, 0, 0.24, -0.52, 1.38, 0.32, 0.045);
add(room.timber, -0.36, 0.12, -0.1, 0.44, 0.045, 0.3);
add(room.stone, -0.39, 0.18, -0.28, 0.56, 0.15, 0.23);
add(room.stone, -0.39, 0.24, -0.36, 0.56, 0.11, 0.07);
add(room.stone, 0.39, 0.18, -0.07, 0.34, 0.11, 0.34);
add(room.timber, 0.38, 0.13, 0.3, 0.29, 0.06, 0.27);
add(room.greenery, 0.51, 0.22, -0.37, 0.11, 0.22, 0.11);
const selectedTrim: Block[] = [
  { position: [0, 0.07, 0.02], size: [1.49, 0.045, 1.16] },
  { position: [0, 0.42, 0.59], size: [1.49, 0.035, 0.035] },
  { position: [0, 0.42, -0.55], size: [1.49, 0.035, 0.035] },
  { position: [0.73, 0.42, 0.02], size: [0.035, 0.035, 1.16] },
  { position: [-0.73, 0.42, 0.02], size: [0.035, 0.035, 1.16] },
  { position: [0.73, 0.25, 0.59], size: [0.028, 0.35, 0.028] },
  { position: [-0.73, 0.25, 0.59], size: [0.028, 0.35, 0.028] },
];
const selectedGlass: Block[] = [
  { position: [0, 0.25, 0.57], size: [1.42, 0.32, 0.015] },
  { position: [0.72, 0.25, 0.02], size: [0.015, 0.32, 1.1] },
];
const facade: Block[] = [
  { position: [0.51, selectedFloorY + 0.24, 0.96], size: [0.06, 0.38, 0.36] },
  { position: [1.51, selectedFloorY + 0.24, 0.96], size: [0.06, 0.38, 0.36] },
];

function BoxInstances({ blocks, color, opacity = 1 }: { blocks: readonly Block[]; color: string; opacity?: number }) {
  const mesh = useRef<InstancedMesh>(null);
  useLayoutEffect(() => {
    if (!mesh.current) return;
    const transform = new Object3D();
    blocks.forEach((block, index) => {
      transform.position.set(...block.position);
      transform.scale.set(...block.size);
      transform.updateMatrix();
      mesh.current?.setMatrixAt(index, transform.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    mesh.current.computeBoundingSphere();
  }, [blocks]);
  if (blocks.length === 0) return null;
  return <instancedMesh ref={mesh} args={[undefined, undefined, blocks.length]}>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color={color} roughness={0.86} metalness={0.05} transparent={opacity < 1} opacity={opacity} depthWrite={opacity === 1} />
  </instancedMesh>;
}

function StructureInstances({ structure }: { structure: Structure }) {
  return <>
    <BoxInstances blocks={structure.stone} color={palette.stone} />
    <BoxInstances blocks={structure.glass} color={palette.glass} />
    <BoxInstances blocks={structure.metal} color={palette.metal} />
    <BoxInstances blocks={structure.timber} color={palette.timber} />
    <BoxInstances blocks={structure.greenery} color={palette.greenery} />
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
    <ambientLight intensity={0.28} />
    <hemisphereLight args={["#fffdf4", "#a5aaa3", 0.85]} />
    <directionalLight position={[-5, 10, 8]} intensity={2.6} color="#fff7e6" />
    <directionalLight position={[8, 5, -4]} intensity={0.55} color="#e3edf1" />
    <group ref={building}>
      <group name="podium"><StructureInstances structure={base} /></group>
      <group name="lower-floors"><StructureInstances structure={lowerFloors} /></group>
      <group name="selected-floor"><StructureInstances structure={selectedFloor} /></group>
      <group ref={upper} name="upper-floors"><StructureInstances structure={upperFloors} /><StructureInstances structure={roof} /></group>
      <group ref={outerFacade} name="selected-facade">
        <BoxInstances blocks={facade} color={palette.stone} />
        <group position={selectedPosition}><BoxInstances blocks={selectedGlass} color={palette.tealLight} opacity={0.32} /></group>
      </group>
      <group ref={selectedUnit} position={selectedPosition} name="selected-unit-b-804">
        <BoxInstances blocks={selectedTrim} color={palette.teal} />
        <StructureInstances structure={room} />
      </group>
      <group name="ground-contact-shadow" position={[0.18, -0.007, 0.14]}>
        {[0, 1, 2, 3, 4].map(index => <mesh key={index} rotation={[-Math.PI / 2, 0, 0]} position={[index * 0.04, -index * 0.001, index * 0.02]} scale={[2.3 + index * 0.17, 1.7 + index * 0.13, 1]}>
          <circleGeometry args={[1, 32]} />
          <meshBasicMaterial color="#64706c" transparent opacity={0.026} depthWrite={false} />
        </mesh>)}
      </group>
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
