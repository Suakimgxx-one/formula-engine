type Token = { type: string; value: string };
function tokenize(input: string): Token[] { {
    const tokens: Token[] = [];
    let i = 0;

    while (i < input.length) {
        const char = input[i];

        if (char === ' ') {
            i++;
            continue;
        }

        if (char >= '0' && char <= '9') {
            let num = '';
            let seenDot = false;
            while (i < input.length && ((input[i] >= '0' && input[i] <= '9') || input[i] === '.')) {
                if (input[i] == '.') {
                    if (seenDot) {
                        throw new Error(`Unexpected character "." at position ${i}`);
                    }
                    seenDot = true;
                }
                num += input[i];
                i++;
            }
            tokens.push({ type: 'NUMBER', value: num });
            continue;
        }

        if(char === '+') {
            tokens.push({ type: 'PLUS', value: char });
            i++;
            continue;
        }
        if (char === '-') {
            tokens.push({ type: 'MINUS', value: char });
            i++;
            continue;
        }

        if (char === '*') {
            tokens.push({ type: 'STAR', value: char });
            i++;
            continue;
        }

        if (char === '/') {
            tokens.push({ type: 'SLASH', value: char });
            i++;
            continue;
        }

        if (char === '(') {
            tokens.push({ type: 'LPAREN', value: char });
            i++;
            continue;
        }

        if (char === ')') {
            tokens.push({ type: 'RPAREN', value: char });
            i++;
            continue;
        }

           throw new Error(`Unexpected character "${char}" at position ${i}`);
    }

    return tokens;
}   
}


console.log(tokenize("3.5 + 2.5"));
console.log(tokenize("3.1.4"));