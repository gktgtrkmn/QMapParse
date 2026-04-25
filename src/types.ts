/**
 * A 3-dimensional vector representing coordinates [X, Y, Z].
 */
export type Vector3 = [number, number, number];

/**
 * Represents a texture projection axis used in the Valve 220 map format.
 */
export interface ValveAxis {
  /** The 3D directional vector of the axis. */
  vector: Vector3;
  /** The texture alignment offset along this axis. */
  offset: number;
}

/**
 * Shared properties common to all brush planes, regardless of format.
 */
export interface BasePlane {
  /** First point defining the plane. */
  p1: Vector3;
  /** Second point defining the plane. */
  p2: Vector3;
  /** Third point defining the plane. */
  p3: Vector3;
  /** The name of the texture applied to this plane. */
  texture: string;
  /** Texture rotation angle in degrees. */
  rotation: number;
  /** Texture scaling factor along the X/U axis. */
  xScale: number;
  /** Texture scaling factor along the Y/V axis. */
  yScale: number;
}

/**
 * Represents a plane using the legacy Quake format (simple X/Y offsets).
 */
export interface LegacyPlane extends BasePlane {
  /** Discriminator for type narrowing. */
  type: "legacy";
  /** Texture alignment offset along the X axis. */
  xOff: number;
  /** Texture alignment offset along the Y axis. */
  yOff: number;
}

/**
 * Represents a plane using the modern Valve 220 format (explicit U/V axes).
 */
export interface ValvePlane extends BasePlane {
  /** Discriminator for type narrowing. */
  type: "valve";
  /** The U-axis projection data. */
  uAxis: ValveAxis;
  /** The V-axis projection data. */
  vAxis: ValveAxis;
}

/**
 * A Discriminated Union representing a single face of a 3D brush.
 * Check the `type` property to safely access format-specific UV data.
 */
export type Plane = LegacyPlane | ValvePlane;

/**
 * Represents a Constructive Solid Geometry (CSG) brush, defined by intersecting planes.
 */
export interface Brush {
  /** The array of infinite planes that carve out this brush's volume. */
  planes: Plane[];
}

/**
 * Represents a game object (e.g., spawn points, doors, triggers, worldspawn).
 */
export interface Entity {
  /** Key-value pairs defining the entity's attributes (e.g., "classname": "light"). */
  properties: Record<string, string>;
  /** An array of CSG brushes attached to this entity (empty for point entities). */
  brushes: Brush[];
}

/**
 * The root Abstract Syntax Tree (AST) object representing a parsed `.map` file.
 */
export interface MapData {
  /** The list of all entities contained in the map. */
  entities: Entity[];
}
