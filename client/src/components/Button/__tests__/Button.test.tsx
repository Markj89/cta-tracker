import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import Button from '../Button';

describe('Button', () => {
    it('should render button component', () => {
        const onClickFn = jest.fn();
        render(
            <Button className="btn" onClick={onClickFn}>Click Me!</Button>,
        );
        const buttonElement = screen.getByTestId("button-component");
        expect(buttonElement).toMatchSnapshot();
    });
});