export type Vector3 = [number, number, number];

export interface Plane {
    p1: Vector3;
    p2: Vector3;
    p3: Vector3;
    texture: string;
    xOff: number;
    yOff: number;
    rotation: number;
    xScale: number;
    yScale: number;
}

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