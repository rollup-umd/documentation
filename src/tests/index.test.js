import { name } from '../../package.json';
import { createConfig } from '../index';

describe('createConfig', () => {
  it('should have a createConfig function', () => {
    expect(createConfig().title).toEqual(name);
  });
});
