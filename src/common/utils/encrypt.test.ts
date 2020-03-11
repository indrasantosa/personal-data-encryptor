import test from 'ava';

import {
  encryptString,
  decryptString,
  getCipher,
  getDecipher
} from './encrypt';

const path = require('path');
const fs = require('fs');

test('encryptString should take a password and string, and should be able to encrypt a string to base64', t => {
  const password = 'hello123';
  const stringToEncrypt = 'Hello world';
  const result = encryptString(password, stringToEncrypt);
  t.not(result, stringToEncrypt);
});

test('decryptString should take a password and base64 string and return resulting utf8 string', t => {
  const password = 'hello123';
  const stringToDecrypt = 'Hello world';
  const revertedString = decryptString(password, stringToDecrypt);
  t.not(revertedString, stringToDecrypt);
});

test('encryptString, decryptString should be able to revert the encrypted string', t => {
  const password = 'hello123';
  const stringToEncrypt = 'Hello world';
  const result = encryptString(password, stringToEncrypt);
  const revertedString = decryptString(password, result);
  t.is(stringToEncrypt, revertedString);
});
