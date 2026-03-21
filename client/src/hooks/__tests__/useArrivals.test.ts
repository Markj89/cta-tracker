import { renderHook, act, waitFor } from "@testing-library/react";
import useArrivals from "../../hooks/useArrivals";



describe("useArrivals", () => {
  const originalFetch = global.fetch;
  let mockStation
  beforeAll(() => {
    // we will need this mock on our next test
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ 
          data: {
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
          },
          error: null,
          loading: false
        }), // Must return a promise
      })
    ) as jest.Mock<Promise<Response>>;
  });
  afterAll(() => {
    // Restore the original fetch after all tests in this suite
    global.fetch = originalFetch;
  });

  it("should keep loading at true", () => {
    const { result } = renderHook(() => useArrivals(30265, 30000));
    const { data, loading } = result.current;
    expect(data).toBe(null);
    expect(loading).toBe(true);
  });

  it('should return data successfully', async () => {
    const { result } = renderHook(() => useArrivals(30265, 30000));

    await act(async () => {
      await result.current.getArrivals(30265);
    });

    await waitFor(() => {
      expect(result.current.data).not.toBeNull();
      expect(result.current.error).toBe(false);
      expect(result.current.data).toEqual(mockStation);
    });
    expect(result.current.data).toEqual(mockStation);
  });
});
