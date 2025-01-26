import { render } from "@testing-library/react";
import Map from "../Map";

describe("Map", () => {
  const location = {
    lat: 41.8786956,
    lng: -87.6835597,
  };
  it("should render Map Component", async () => {
    const wrapper = render(
      <Map width={0} height={0} currentLocation={location} zoom={11} />
    );
    expect(wrapper.container.firstChild).toMatchSnapshot();
  });
});
