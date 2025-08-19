import { describe, expect, it } from "vitest";
import { subMonths } from "date-fns";
import { formatPostDate } from "./post-item.util";

describe("formatPostDate utility function", () => {
  it("formats by distance if date is less than one year ago", () => {
    const testDate = subMonths(new Date(), 10);

    const result = formatPostDate(testDate);

    expect(result).toMatch("10 months ago");
  });

  it("formats by 'on Month, Day Year' if date is more than one year ago", () => {
    const testDate = new Date(2015, 4, 15);

    const result = formatPostDate(testDate);

    expect(result).toMatch("on May 15, 2015");
  });
});
