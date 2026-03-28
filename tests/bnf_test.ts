import { assertEquals } from "@std/assert";
import { QuakeMapParser } from "../src/parser.ts";

Deno.test("Recursive Descent Parser: Parses full Legacy Entity and Brush", () => {
    const mapSource = `
      // This is a comment that should be ignored
      {
        "classname" "worldspawn"
        "message" "My Blog Level"
        {
          ( 128 0 0 ) ( 128 1 0 ) ( 128 0 1 ) BRICK_01 0 0 0 1 1
          ( 0 128 0 ) ( 0 128 1 ) ( 1 128 0 ) BRICK_01 0 0 0 1 1
        }
      }
    `;

    const parser = new QuakeMapParser(mapSource);
    const ast = parser.parseMap();

    // Test Entities
    assertEquals(ast.entities.length, 1);
    const worldspawn = ast.entities[0];
    
    // Test Properties
    console.log("Parser Properties:", worldspawn.properties);
    assertEquals(worldspawn.properties["classname"], "worldspawn");
    assertEquals(worldspawn.properties["message"], "My Blog Level");

    // Test Brushes & Planes
    assertEquals(worldspawn.brushes.length, 1);
    const brush = worldspawn.brushes[0];
    assertEquals(brush.planes.length, 2);

    // Test Point Parsing
    const firstPlane = brush.planes[0];
    assertEquals(firstPlane.texture, "BRICK_01");
    assertEquals(firstPlane.p1, [128, 0, 0]);
    assertEquals(firstPlane.p2, [128, 1, 0]);
});

Deno.test("Parser: Correctly parses modern Valve 220 format", () => {
  const mapSource = `{
    "classname" "worldspawn"
    {
      ( -64 64 64 ) ( 64 64 64 ) ( 64 -64 64 ) BRICK_01 [ 1 0 0 12.5 ] [ 0 -1 0 -4 ] 0 1 1
    }
  }`;

  const parser = new QuakeMapParser(mapSource);
  const ast = parser.parseMap();
  const plane = ast.entities[0].brushes[0].planes[0];

  assertEquals(plane.type, "valve");

  if (plane.type === "valve") {
    assertEquals(plane.texture, "BRICK_01");
    assertEquals(plane.uAxis.vector, [1, 0, 0]);
    assertEquals(plane.uAxis.offset, 12.5);
    assertEquals(plane.vAxis.vector, [0, -1, 0]);
    assertEquals(plane.vAxis.offset, -4);
    assertEquals(plane.rotation, 0);    
  }
});