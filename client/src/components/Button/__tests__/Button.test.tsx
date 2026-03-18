import { render, fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import Button from '../Button';

describe('Button', () => {
    it('should render button component', () => {
        const onClickFn = jest.fn();
        render(
            <Button className="btn" onClick={onClickFn}>Click Me!</Button>,
        );
        const buttonElement = screen.getByTestId("button-component");
        expect(buttonElement).toBeInTheDocument();
    });

    it('should call onClick when the button is clicked', () => {
        const onClickFn = jest.fn();
        render(<Button className="btn" onClick={onClickFn}>Click Me!</Button>);
        const buttonMock = screen.getByText(/click me/i);
        fireEvent.mouseDown(buttonMock);
        expect(onClickFn).toHaveBeenCalled();
        expect(onClickFn).toHaveBeenCalledTimes(1);
    });
});