export type Vector3 = [number, number, number];

export interface ValveAxis {
    vector: Vector3;
    offset: number;
}

export interface BasePlane {
    p1: Vector3,
    p2: Vector3,
    p3: Vector3,
    texture: string,
    rotation: number;
    xScale: number;
    yScale: number;
}

export interface LegacyPlane extends BasePlane {
    type: "legacy";
    xOff: number;
    yOff: number;
}

export interface ValvePlane extends BasePlane {
    type: "valve";
    uAxis: ValveAxis;
    vAxis: ValveAxis;
}

export type Plane = LegacyPlane | ValvePlane;

export interface Brush {
    planes: Plane[];
}

export interface Entity {
    properties: Record<string, string>;
    brushes: Brush[];
}

export interface MapData {
    entities: Entity[];
}