import { render } from '@testing-library/react';
import Icon, { ICONS } from '../Icon';

describe('Icon', () => {
    it('should render Train Icon', () => {
        const wrapper = render(<Icon icon={ICONS.Train}/> );
        expect(wrapper.container.firstChild).toMatchSnapshot();
    });
    it('should render Station Icon', () => {
        const wrapper = render(<Icon icon={ICONS.Stations}/> );
        expect(wrapper.container.firstChild).toMatchSnapshot();
    });
});