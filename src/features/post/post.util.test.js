import { describe, expect, it } from "vitest";
import { formatPostDate } from "./post.util";

describe("formatPostDate utility", () => {
  it("formats by 'MMMM d, y' in upper case", () => {
    const testDate = new Date(2005, 10, 3);

    const result = formatPostDate(testDate);

    expect(result).toBe("NOVEMBER 3, 2005");
  });
});
