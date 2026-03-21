import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Map from "../Map";

// Mock Google Maps
const mockMap = {
  setCenter: jest.fn(),
  setZoom: jest.fn(),
  // Add other methods as needed
};

const mockGoogleMaps = {
  Map: jest.fn(() => mockMap),
  // Add other Google Maps classes as needed
};

(global as any).google = {
  maps: mockGoogleMaps,
};

describe("Map", () => {
  const location = {
    lat: 41.8786956,
    lng: -87.6835597,
  };

  it("should render Map Component", async () => {
    const mockStations = [];
    const mockArrivals = [];
    const mockNearbyLocations = [];
    const mockNearbyLocationsIds: string[] = [];

    const wrapper = render(
      <MemoryRouter>
        <Map
          width={0}
          height={0}
          currentLocation={location}
          maps={[]}
          zoom={11}
          stations={mockStations}
          arrivals={mockArrivals}
          nearbyLocations={mockNearbyLocations}
          nearbyLocationsIds={mockNearbyLocationsIds}
        />
      </MemoryRouter>
    );
    expect(wrapper.container.firstChild).toBeInTheDocument();
  });
});
