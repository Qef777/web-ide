export const cmp = `|        a         |        b         | sel |       out        |
| 0000000000000000 | 0000000000000000 |  0  | 0000000000000000 |
| 0000000000000000 | 0000000000000000 |  1  | 0000000000000000 |
| 0000000000000000 | 0001001000110100 |  0  | 0000000000000000 |
| 0000000000000000 | 0001001000110100 |  1  | 0001001000110100 |
| 1001100001110110 | 0000000000000000 |  0  | 1001100001110110 |
| 1001100001110110 | 0000000000000000 |  1  | 0000000000000000 |
| 1010101010101010 | 0101010101010101 |  0  | 1010101010101010 |
| 1010101010101010 | 0101010101010101 |  1  | 0101010101010101 |`;
export const hdl = `// 16 bit multiplexor. If sel==1 then out=b else out=a.

CHIP Mux16 {
    IN a[16], b[16], sel;
    OUT out[16];

    PARTS:
}`;
export const tst = `output-list a%B1.16.1 b%B1.16.1 sel%D2.1.2 out%B1.16.1;

set a 0, set b 0, set sel 0, eval, output;
set sel 1, eval, output;

set a %B0000000000000000, set b %B0001001000110100, set sel 0, eval, output;
set sel 1, eval, output;

set a %B1001100001110110, set b %B0000000000000000, set sel 0, eval, output;
set sel 1, eval, output;

set a %B1010101010101010, set b %B0101010101010101, set sel 0, eval, output;
set sel 1, eval, output;`;
