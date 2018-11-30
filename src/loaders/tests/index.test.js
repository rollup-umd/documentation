import loaders from '../index';

describe('loaders', () => {
  it('it should be loaders', () => {
    expect(Object.keys(loaders).indexOf('wave') !== -1).toBe(true);
  });
});
