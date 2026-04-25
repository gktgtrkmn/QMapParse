# Quake Map Parser

A dependency-free, strictly-typed parser for Quake `.map` files built for Deno and JSR. Converts raw map text into a structured Abstract Syntax Tree (AST).

## Features
- **Dual Format:** Supports both Legacy Quake and modern Valve 220 formats.
- **Fault Tolerant:** Safely parses files that mix legacy and Valve brushes.
- **Zero Dependencies:** Pure TypeScript.
- **Type Safe:** Uses Discriminated Unions to guarantee format safety.

## Installation

```bash
deno add @gktgtrkmn/quake-map-parser
```

## Quick Start

```typescript
import { QuakeMapParser } from "@gktgtrkmn/quake-map-parser";

const mapSource = `
{
  "classname" "worldspawn"
  {
    ( 128 0 0 ) ( 128 1 0 ) ( 128 0 1 ) BRICK_01 0 0 0 1 1
  }
}
`;

const ast = new QuakeMapParser(mapSource).parseMap();
const worldspawn = ast.entities[0];

console.log(worldspawn.properties["classname"]); // "worldspawn"

// Safely access plane formats
const plane = worldspawn.brushes[0].planes[0];
if (plane.type === "legacy") {
  console.log(`Offsets -> X: ${plane.xOff}, Y: ${plane.yOff}`);
}
```

## Testing

```bash
deno test

## License
MIT License.