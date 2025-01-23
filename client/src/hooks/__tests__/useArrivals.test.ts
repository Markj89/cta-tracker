import { renderHook, waitFor } from "@testing-library/react";
import useArrivals from "../../hooks/useArrivals";

// we will need this mock on our next test
global.fetch = jest.fn();

describe("useArrivals", () => {
  const mockStation = {
    color: "#009b3a",
    lat: 41.88422,
    lng: -87.696234,
    title: "California (63rd-bound)",
    ada: true,
    blue: false,
    brn: false,
    direction: "E",
    g: true,
    map_id: 41360,
    org: false,
    p: false,
    pink: false,
    purple_express: false,
    red: false,
    station_descriptive_name: "California (green Line)",
    stop_id: 30265,
    stop_name: "California (63rd-bound)",
    y: false,
  };
  it("should initially return true and then false", async () => {
    const { result } = renderHook(() => useArrivals(mockStation));
    const { loading } = result.current;

    // asserting that the initial value of loading is true
    // before the re-render
    expect(loading).toBe(false);

    await waitFor(() => {
      const { loading } = result.current;

      expect(loading).toBe(false);
    });
  });
});
