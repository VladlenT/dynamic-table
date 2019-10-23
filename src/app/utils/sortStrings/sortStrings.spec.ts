import { sortStrings } from '@app/utils/sortStrings/sortStrings';

describe('sortStrings.ts', () => {
  it('should sort strings', () => {
    expect(sortStrings('A', 'a')).toEqual(1);
    expect(sortStrings('b', 'a')).toEqual(1);
    expect(sortStrings('b', 'A')).toEqual(1);

    expect(sortStrings('a', 'a')).toEqual(0);
    expect(sortStrings('A', 'A')).toEqual(0);

    expect(sortStrings('a', 'b')).toEqual(-1);
    expect(sortStrings('a', 'A')).toEqual(-1);
    expect(sortStrings('A', 'b')).toEqual(-1);
  });

  it('should sort numeric values by default', () => {
    expect(sortStrings('1', '10')).toEqual(-1);
    expect(sortStrings('2', '10')).toEqual(-1);
    expect(sortStrings('003', '100')).toEqual(-1);
  });

  it('should use provided locale to sort', () => {
    expect(sortStrings('Z', 'A', 'en')).toEqual(1);

    expect(sortStrings('а', 'ї', 'uk')).toEqual(-1);
  });
});
