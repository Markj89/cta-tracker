import { getColorByStation } from "./../color";

describe('getColorByStation', () => {
    it('should pick the color associated with the value', () => {
        expect(getColorByStation('pink')).toBe('#e27ea6');
    });
    it('should pick the default color associated with no value', () => {
        expect(getColorByStation('')).toBe('#565a5c');
    });
});