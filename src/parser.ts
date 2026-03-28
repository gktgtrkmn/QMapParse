import { MapScanner } from "./scanner.ts";
import { TokenType } from "./tokens.ts";
import type { MapData, Entity, Brush, Plane, Vector3, ValveAxis } from "./types.ts";

export class QuakeMapParser {
    private scanner: MapScanner;

    constructor(source: string) {
        this.scanner = new MapScanner(source);
    }

    public parseMap(): MapData {
        const entities: Entity[] = [];
        while (!this.scanner.isAtEnd()) {
            entities.push(this.parseEntity());
        }
        return { entities };
    }

    private parseEntity(): Entity {
        this.scanner.consume(TokenType.BeginBlock, "Expected '{' at start of entity");

        const properties: Record<string, string> = {};
        const brushes: Brush[] = [];

        while (this.scanner.peek().type === TokenType.Value) {
            const key = this.scanner.advance().lexeme;
            const value = this.scanner.consume(TokenType.Value, "Expected value after property key").lexeme;
            properties[key] = value;
        }

        while (this.scanner.peek().type === TokenType.BeginBlock) {
            brushes.push(this.parseBrush());
        }

        this.scanner.consume(TokenType.EndBlock, "Expected '}' at end of entity");
        return { properties, brushes };
    }

    private parseBrush(): Brush {
        this.scanner.consume(TokenType.BeginBlock, "Expected '{' at start of brush");
        const planes: Plane[] = [];

        while (this.scanner.peek().type === TokenType.BeginParen) {
            planes.push(this.parsePlane());
        }

        this.scanner.consume(TokenType.EndBlock, "Expected '}' at end of brush");
        return { planes };
    }

    private parsePlane(): Plane {
        const p1 = this.parsePoint();
        const p2 = this.parsePoint();
        const p3 = this.parsePoint();

        const texture = this.scanner.consume(TokenType.Value, "Expected texture name").lexeme;
        
        const isValve = this.scanner.peek().type === TokenType.BeginBracket;
        
        type FormatData = 
            | { type: "legacy"; xOff: number; yOff: number }
            | { type: "valve"; uAxis: ValveAxis; vAxis: ValveAxis };
        
        let formatData: FormatData;

        if (isValve) {
            formatData = {
                type: "valve",
                uAxis: this.parseValveAxis(),
                vAxis: this.parseValveAxis(),
            };
        } else {
            formatData = {
                type: "legacy",
                xOff: parseFloat(this.scanner.consume(TokenType.Value, "Expected x-offset").lexeme),
                yOff: parseFloat(this.scanner.consume(TokenType.Value, "Expected y-offset").lexeme),
            }
        }
        
        const rotation = parseFloat(this.scanner.consume(TokenType.Value, "Expected rotation").lexeme);
        const xScale = parseFloat(this.scanner.consume(TokenType.Value, "Expected x-scale").lexeme);
        const yScale = parseFloat(this.scanner.consume(TokenType.Value, "Expected y-scale").lexeme);

        return {
            p1, p2, p3, texture,
            ...formatData,
            rotation, xScale, yScale
        } as Plane;
    }

    private parseValveAxis(): ValveAxis {
        this.scanner.consume(TokenType.BeginBracket, "Expected '[' for Valve UV axis");

        const x = parseFloat(this.scanner.consume(TokenType.Value, "Expected U/V X axis").lexeme);
        const y = parseFloat(this.scanner.consume(TokenType.Value, "Expected U/V Y axis").lexeme);
        const z = parseFloat(this.scanner.consume(TokenType.Value, "Expected U/V Z axis").lexeme);
        const offset = parseFloat(this.scanner.consume(TokenType.Value, "Expected U/V offset").lexeme);        
        
        this.scanner.consume(TokenType.EndBracket, "Expected ']' for Valve UV axis");

        return { vector: [x, y, z], offset };
    }

    private parsePoint(): Vector3 {
        this.scanner.consume(TokenType.BeginParen, "Expected '(' for point coordinate");
    
        const x = parseFloat(this.scanner.consume(TokenType.Value, "Expected X coordinate").lexeme);
        const y = parseFloat(this.scanner.consume(TokenType.Value, "Expected Y coordinate").lexeme);
        const z = parseFloat(this.scanner.consume(TokenType.Value, "Expected Z coordinate").lexeme);
        
        this.scanner.consume(TokenType.EndParen, "Expected ')' after point coordinates");
        
        return [x, y, z];
    }
}