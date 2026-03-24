import { assertEquals } from "@std/assert";
import { QuakeMapParser } from "../src/parser.ts";

Deno.test("Recursive Descent Parser: Parses full Entity and Brush", () => {
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