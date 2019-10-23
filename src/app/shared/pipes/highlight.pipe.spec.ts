import { HighlightPipe } from './highlight.pipe';

describe('HighlightPipe', () => {
  let pipe: HighlightPipe;

  beforeEach(() => {
    pipe = new HighlightPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should mark substring that matches the term', () => {
    const result = pipe.transform('abctest', 'abc');
    expect(result).toEqual('<mark>abc</mark>test', 'marking fail');
  });

  it('should be case insensitive', () => {
    const result = pipe.transform('ABC', 'abc');
    expect(result).toEqual('<mark>ABC</mark>', 'case sensitivity fail');
  });

  it('should transform non-string values to string', () => {
    const result = pipe.transform(123, '123');
    expect(result).toEqual('<mark>123</mark>', 'pipe not converting to string');
  });

  it('should mark all matches in string', () => {
    const result = pipe.transform('hello 123123 hello', 'hello');
    expect(result).toEqual('<mark>hello</mark> 123123 <mark>hello</mark>');
  });
});
