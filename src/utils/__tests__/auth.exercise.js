// Testing Pure Functions

import cases from 'jest-in-case'

import {isPasswordAllowed} from '../auth'

///////////// jest in case second solution /////////////

function casify(object) {
  return Object.entries(object).map(([name, password]) => ({
    name: `${password} - ${name}`,
    password,
  }))
}

cases(
  'isPasswordAllowed: valid passwords',
  ({password}) => {
    expect(isPasswordAllowed(password)).toBe(true)
  },
  casify({'valid password': '!aBc123'}),
)

cases(
  'isPasswordAllowed: invalid passwords',
  ({password}) => {
    expect(isPasswordAllowed(password)).toBe(false)
  },
  casify({
    'less than 6 characters': 'a2c!',
    'no letters': '123456!',
    'no numbers': 'ABCdef!',
    'no uppercase letters': 'abc123!',
    'no lowercase letters': 'ABC123!',
    'no non-alphanumeric characters': 'ABCdef123',
  }),
)

///////////// jest in case solution /////////////

// cases(
//   'isPasswordAllowed: valid passwords',
//   ({password}) => {
//     expect(isPasswordAllowed(password)).toBe(true)
//   },
//   {'!aBc123 - valid password': {password: '!aBc123'}},
// )

// cases(
//   'isPasswordAllowed: invalid passwords',
//   ({password}) => {
//     expect(isPasswordAllowed(password)).toBe(false)
//   },
//   {
//     'a2c! - less than 6 characters': {
//       password: 'a2c!',
//     },
//     '123456! - no alphabet characters': {
//       password: '123456!',
//     },
//     'ABCdef! - no numbers': {
//       password: 'ABCdef!',
//     },
//     'abc123! - no uppercase characters': {
//       password: 'abc123!',
//     },
//     'ABC123! - no lowercase characters': {
//       password: 'ABC123!',
//     },
//     'ABCdef123 - no non-alphanumeric characters': {
//       password: 'ABCdef123',
//     },
//   },
// )

///////////// extra credit solution /////////////

// test('isPasswordAllowed returns true for valid passwords', () => {
//   expect(isPasswordAllowed('!aBc123')).toBe(true)
// })

// const invalidPasswordDescriptions = [
//   'less than 6 characters',
//   'no alphabet characters',
//   'no numbers',
//   'no uppercase letters',
//   'no lowercase letters',
//   'no non-alphanumeric characters',
// ]
// const invalidPasswords = [
//   'a2c!',
//   '123456!',
//   'ABCdef!',
//   'abc123!',
//   'ABC123!',
//   'ABCdef123',
// ]

// for (let i = 0; i < 6; i++) {
//   test(`isPasswordAllowed returns false if the password has ${invalidPasswordDescriptions[i]}: ${invalidPasswords[i]}`, () => {
//     expect(isPasswordAllowed(invalidPasswords[i])).toBe(false)
//   })
// }

///////////// exercise solution /////////////

// test('isPasswordAllowed returns true for valid passwords', () => {
//   expect(isPasswordAllowed('!aBc123')).toBe(true)
// })

// test('isPasswordAllowed returns false for invalid passwords', () => {
//   expect(isPasswordAllowed('a2c!')).toBe(false)
//   expect(isPasswordAllowed('123456!')).toBe(false)
//   expect(isPasswordAllowed('ABCdef!')).toBe(false)
//   expect(isPasswordAllowed('abc123!')).toBe(false)
//   expect(isPasswordAllowed('ABC123!')).toBe(false)
//   expect(isPasswordAllowed('ABCdef123')).toBe(false)
// })
