import { render } from '@testing-library/react';
import Card from '../Card';

describe('Card', () => {
    it('should render card component and match snapshot', () => {
        const wrapper = render(
            <Card>
                Hello World
            </Card>
        );
        expect(wrapper.container.firstChild).toMatchSnapshot();
    });
});