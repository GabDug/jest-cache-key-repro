const { nanoid } = require('nanoid');

test('a', () => {
  expect(nanoid()).toHaveLength(21);
});
