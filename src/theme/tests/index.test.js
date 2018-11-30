import theme, { makeTheme } from '../index';

describe('theme', () => {
  it('should have a theme', () => {
    expect(theme instanceof Object).toBe(true);
  });
  it('should have a makeTheme equal to theme', () => {
    expect(makeTheme()).toEqual(theme);
  });
});
