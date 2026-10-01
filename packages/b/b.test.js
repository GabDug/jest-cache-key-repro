const { nanoid } = require('nanoid');

test('b', () => {
  expect(nanoid()).toHaveLength(21);
});
