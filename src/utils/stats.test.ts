import { METERS_IN_MILE, MS_IN_MINUTES } from "./constants";
import { displayDistanceInMiles, displayPacePerMile, getDistanceInMiles, getPacePerMile } from "./stats";

const expectedPrecision = 0.001;

describe("getDistanceInMiles", () => {
  it("handles zero", () => {
    expect(getDistanceInMiles(0)).toBe(0);
  });

  it("handles 5k", () => {
    const actual = getDistanceInMiles(5000);
    const expected = 3.106;
    expect(actual - expected).toBeLessThanOrEqual(expectedPrecision);
  });
});

describe("getPacePerMile", () => {
  it("handles zero", () => {
    expect(getPacePerMile(0, 0)).toBe(0);
  });

  it("handles a pace", () => {
    const actual = getPacePerMile(MS_IN_MINUTES * 8, METERS_IN_MILE);
    const expected = 8;
    expect(actual - expected).toBeLessThanOrEqual(expectedPrecision);
  });
});

describe("displayDistanceInMiles", () => {
  it("handles zero", () => {
    expect(displayDistanceInMiles(0)).toBe(`0.00`);
  });

  it("handles 5k", () => {
    expect(displayDistanceInMiles(5000)).toBe(`3.11`);
  });
});

describe("displayPacePerMile", () => {
  it("handles zero", () => {
    expect(displayPacePerMile(0, 0)).toBe(`0'00"`);
  });

  it("handles a pace", () => {
    expect(displayPacePerMile(MS_IN_MINUTES * 8, METERS_IN_MILE)).toBe(`8'00"`);
  });
});
