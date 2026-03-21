import { render } from '@testing-library/react';
import Icon, { ICONS } from '../Icon';

describe('Icon', () => {
    it('should render Train Icon', () => {
        render(<Icon icon={ICONS.Train}/> );
    });
    // it('should render Station Icon', () => {
    //     const wrapper = render(<Icon icon={ICONS.Stations}/> );
    //     expect(wrapper.container.firstChild).toBeInTheDocument();
    // });
});