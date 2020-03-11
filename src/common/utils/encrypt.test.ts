import test from 'ava';

import {
  encryptString,
  decryptString,
  encryptFile,
  decryptFile
} from './encrypt';
import { createReadStream, createWriteStream, writeFileSync } from 'fs';
const path = require('path');

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

test('encryptFile should convert a file into a string', async t => {
  const key = 'hello123';
  const inputFile = path.resolve(__dirname, '../../../test/assets/sample.txt');
  const inputStream = createReadStream(inputFile);
  const encryptedFile = await encryptFile(key, inputStream);
  t.is(typeof encryptedFile, 'string');
});

test('decrypt should convert a decrypted file string to stream', async t => {
  const key = 'hello123';
  const inputFile = path.resolve(__dirname, '../../../test/assets/sample.txt');
  const outputFile = path.resolve(
    __dirname,
    '../../../test/assets/sample.output.txt'
  );
  const encryptedFilePath = path.resolve(
    __dirname,
    '../../../test/assets/sample.encrypted.txt'
  );
  const inputStream = createReadStream(inputFile);
  const outputStream = createWriteStream(outputFile);
  const encryptedFile = await encryptFile(key, inputStream);
  t.is(typeof encryptedFile, 'string');
  writeFileSync(encryptedFilePath, encryptedFile);
  const originalFileStream = decryptFile(key, encryptedFile);
  originalFileStream.pipe(outputStream);
  const outputReadStream = createReadStream(outputFile);
  const encryptedOutputFile = await encryptFile(key, outputReadStream);
  t.is(encryptedFile, encryptedOutputFile);
});
