import { render, screen } from "@testing-library/react";
import { Loader } from "../Loader";

describe('LoadingPage', () => {
    it('should render Loader component', () => {
        render(<Loader />);
        const loaderElement = screen.getByTestId("loading-page-container");
        expect(loaderElement).toMatchSnapshot();
    });
});