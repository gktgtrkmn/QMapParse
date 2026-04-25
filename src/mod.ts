/**
 * A dependency-free, pure TypeScript parser for Quake `.map` files.
 * * Supports both the legacy Quake format and the modern Valve 220 format 
 * (commonly used by TrenchBroom and J.A.C.K.). **Because format detection is 
 * handled on a per-plane basis, it seamlessly supports files that mix both 
 * legacy and Valve formats within the same map or even the same brush.**
 * * @module
 * * @example
 * ```ts
 * import { QuakeMapParser } from "@gktgtrkmn/quake-map-parser";
 * * const mapText = `{ "classname" "worldspawn" }`;
 * const parser = new QuakeMapParser(mapText);
 * const ast = parser.parseMap();
 * * console.log(ast.entities[0].properties.classname); // "worldspawn"
 * ```
 */

export { QuakeMapParser } from "./parser.ts";
export * from "./types.ts";
export { TokenType } from "./tokens.ts";