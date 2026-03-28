import { Token, TokenType } from "./tokens.ts"

export class MapScanner {
    private tokens: Token[] = [];
    private current = 0;

    constructor(source: string) {
        this.tokenize(source);
    }

    private tokenize(source: string) {
        const cleanSource = source.replace(/\/\/.*$/gm, "");
        const regex = /"[^"]*"|[()[\]{}]|[^\s()[\]{}]+/g;
        const matches = cleanSource.match(regex) || [];

        for (const match of matches) {
            let type = TokenType.Value;
            let lexeme = match;

            if (match === "{") {
                type = TokenType.BeginBlock;
            } else if (match === "}") {
                type = TokenType.EndBlock;
            } else if (match === "(") {
                type = TokenType.BeginParen;
            } else if (match === ")") {
                type = TokenType.EndParen;
            } else if (match === "[") {
                type = TokenType.BeginBracket;
            } else if (match === "]") {
                type = TokenType.EndBracket;
            } else {
                lexeme = lexeme.replace(/^["“”]+|["“”]+$/g, "");
            }

            this.tokens.push({ type, lexeme, line: 1} );
        }

        this.tokens.push({ type: TokenType.EOF, lexeme: "", line: -1 });
    }

    public peek(): Token {
        return this.tokens[this.current];
    }

    public advance(): Token {
        if (!this.isAtEnd()) this.current++;
        return this.tokens[this.current - 1];
    }

    public isAtEnd(): boolean {
        return this.peek().type === TokenType.EOF;
    }

    public consume(type: TokenType, errorMessage: string): Token {
        if (this.peek().type === type) return this.advance();
        throw new Error(`Parse Error: ${errorMessage}. Found '${this.peek().lexeme}'`);
    }
}