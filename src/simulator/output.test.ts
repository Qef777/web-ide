import {
  expect,
  it,
  describe,
  cleanState,
} from "@davidsouther/jiffies/scope/index.js";
import { Output } from "./output.js";
import {
  Test,
  TestOutputInstruction,
  TestOutputListInstruction,
} from "./tst.js";

class OutputTest extends Test {
  private readonly vars: Map<string, number>;

  constructor(init: [string, number][]) {
    super();
    this.vars = new Map(init);
  }

  hasVar(variable: string | number): boolean {
    return this.vars.has(`${variable}`);
  }
  getVar(variable: string | number): number {
    return this.vars.get(`${variable}`) ?? 0;
  }
  setVar(variable: string, value: number): void {
    this.vars.set(`${variable}`, value);
  }
}

describe("Test Output Handler", () => {
  const state = cleanState(() => ({
    test: new OutputTest([
      ["a", 1],
      ["b", 20],
      ["in", 0],
      ["out", -1],
    ]),
  }));

  it("outputs padded values", () => {
    const outA = new Output("a", "D", 1, 3, 3);
    const a = outA.print(state.test);

    expect(a).toEqual("   1   ");
  });

  it("outputs 16 bit values", () => {
    const outB = new Output("b", "B", 16, 1, 1);
    const b = outB.print(state.test);
    expect(b).toEqual(" 0000000000010100 ");
  });

  it("outputs a line", () => {
    state.test.outputList([
      new Output("a", "D", 1, 2, 2),
      new Output("b", "X", 6, 1, 1),
      new Output("in", "B", 2, 2, 2),
      new Output("out", "B", 4, 2, 2),
    ]);
    state.test.addInstruction(new TestOutputInstruction());
    state.test.run();

    expect(state.test.log()).toEqual("|  1  | 0x0014 |  00  |  1111  |\n");
  });

  it("outputs 16 bit", () => {
    const test = new OutputTest([
      ["a", 0b0001001000110100],
      ["b", 0b1001100001110110],
    ]);
    test.outputList([
      new Output("a", "B", 16, 1, 1),
      new Output("b", "B", 16, 1, 1),
    ]);

    test.addInstruction(new TestOutputInstruction());
    test.run();

    expect(test.log()).toEqual("| 0001001000110100 | 1001100001110110 |\n");
  });
});
