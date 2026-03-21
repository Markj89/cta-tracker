import { render, screen } from "@testing-library/react";
import { LoadingPage } from "../LoadingPage";

describe('LoadingPage', () => {
    it('should render Loader component', () => {
        render(<LoadingPage />);
        const loaderElement = screen.getByTestId("loading-page-container");
        expect(loaderElement).toBeInTheDocument();
    });
});