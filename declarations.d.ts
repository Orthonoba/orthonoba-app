/* ORTHONOBA — declarations.d.ts */

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.gif" {
  const content: string;
  export default content;
}

declare module "*.webp" {
  const content: string;
  export default content;
}

declare module "*.ico" {
  const content: string;
  export default content;
}

declare module "*.stl" {
  const content: string;
  export default content;
}

declare module "*.obj" {
  const content: string;
  export default content;
}

declare module "*.ply" {
  const content: string;
  export default content;
}

declare module "*.glb" {
  const content: string;
  export default content;
}

declare module "*.gltf" {
  const content: string;
  export default content;
}

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.module.css" {
  const classes: { [className: string]: string };
  export default classes;
}

declare module "*.json" {
  const value: any;
  export default value;
}

declare module "three/examples/jsm/loaders/STLLoader" {
  export class STLLoader {
    load(url: string, onLoad: (geometry: any) => void): void;
  }
}

declare module "three/examples/jsm/loaders/OBJLoader" {
  export class OBJLoader {
    load(url: string, onLoad: (object: any) => void): void;
  }
}

declare module "three/examples/jsm/controls/OrbitControls" {
  export class OrbitControls {
    constructor(camera: any, domElement: any);
    enableDamping: boolean;
    dampingFactor: number;
    update(): void;
    dispose(): void;
  }
}
