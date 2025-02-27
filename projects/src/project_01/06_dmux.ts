export const hdl = `/**
 * Demultiplexor.
 * {a,b} = {in,0} if sel==0
 *         {0,in} if sel==1
 */

CHIP DMux {
    IN in, sel;
    OUT a, b;

    PARTS:
}`;
export const tst = `output-list in%B3.1.3 sel%B3.1.3 a%B3.1.3 b%B3.1.3;

set in 0, set sel 0, eval, output;
set sel 1, eval, output;

set in 1, set sel 0, eval, output;
set sel 1, eval, output;`;

export const cmp = `|  in   |  sel  |   a   |   b   |
|   0   |   0   |   0   |   0   |
|   0   |   1   |   0   |   0   |
|   1   |   0   |   1   |   0   |
|   1   |   1   |   0   |   1   |`;
