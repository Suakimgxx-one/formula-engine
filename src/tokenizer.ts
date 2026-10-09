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

                if (char >= 'A' && char <= 'Z') {
            let letters = '';
            let digits = '';

            while (i < input.length && input[i] >= 'A' && input[i] <= 'Z') {
                letters += input[i];
                i++;
            }

            while (i < input.length && input[i] >= '0' && input[i] <= '9') {
                digits += input[i];
                i++;
            }

            const word = letters + digits;

            if (input[i] === '(') {
                tokens.push({ type: 'FUNC_NAME', value: word });
            } else if (word === 'TRUE' || word === 'FALSE') {
                tokens.push({ type: 'BOOLEAN', value: word });
            } else if (digits !== '') {
                tokens.push({ type: 'CELL_REF', value: word });
            } else {
                throw new Error(`Unknown name "${word}" at position ${i - word.length}`);
            }
            continue;
        }



           throw new Error(`Unexpected character "${char}" at position ${i}`);
        }
    return tokens;
    }   
}

console.log(tokenize("SUM(A1) + 2"));
console.log(tokenize("TRUE"));
console.log(tokenize("ABC"));