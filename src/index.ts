import {
  base64,
  bic,
  bytes,
  check,
  checkAsync,
  checkItems,
  checkItemsAsync,
  creditCard,
  cuid2,
  decimal,
  digits,
  email,
  emoji,
  empty,
  endsWith,
  everyItem,
  excludes,
  finite,
  graphemes,
  hash,
  hexadecimal,
  hexColor,
  imei,
  includes,
  integer,
  ip,
  ipv4,
  ipv6,
  isoDate,
  isoDateTime,
  isoTime,
  isoTimeSecond,
  isoTimestamp,
  isoWeek,
  length,
  mac,
  mac48,
  mac64,
  maxBytes,
  maxGraphemes,
  maxLength,
  maxSize,
  maxValue,
  maxWords,
  mimeType,
  minBytes,
  minGraphemes,
  minLength,
  minSize,
  minValue,
  minWords,
  multipleOf,
  nanoid,
  nonEmpty,
  notBytes,
  notGraphemes,
  notLength,
  notSize,
  notValue,
  notWords,
  octal,
  partialCheck,
  regex,
  safeInteger,
  setSchemaMessage,
  setSpecificMessage,
  size,
  someItem,
  startsWith,
  ulid,
  url,
  uuid,
  value,
  words,
} from 'valibot';

const valueLocales: Record<any, string> = {
  string: 'строка',
  number: 'число',
  boolean: 'логическое значение',
  Object: 'объект',
  any: 'что угодно',
  Array: 'массив',
  bigint: 'большое число',
  Blob: 'блоб-объект',
  File: 'файл',
  Function: 'функция',
  Map: 'карта',
  Set: 'набор',
  unknown: 'неизвестно',
  Date: 'дата',
  '!null': 'не пустое значение',
  '(!null & !undefined)': 'не пустое значение',
  '!undefined': 'не пустое значение',
  never: 'неожидаемое значение',
  NaN: 'не-число',
  null: 'пустое значение',
  undefined: 'пустое значение',
};

const femalePrimitives = new Set(['string', 'Date', 'Map']);

const formatExpected = (expected: any): any => {
  let expectedWord = 'ожидалось';
  const expectedLabel = valueLocales[expected] ?? expected;

  if (femalePrimitives.has(expected)) {
    expectedWord = 'ожидалась';
  }

  return `${expectedWord} ${expectedLabel}`;
};

const formatReceived = (received: any): any => {
  let receivedWord = 'получено';
  const expectedLabel = valueLocales[received] ?? received;

  if (femalePrimitives.has(received)) {
    receivedWord = 'получена';
  }

  return `${receivedWord} ${expectedLabel}`;
};

const localeName = 'better-ru';

setSchemaMessage(
  (issue) =>
    `Неправильный тип: ${formatExpected(issue.expected)}, ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  base64,
  (issue) => `Неправильный Base64: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  bic,
  (issue) => `Неправильный BIC: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  bytes,
  (issue) =>
    `Неправильное количество байтов: ${formatExpected(issue.expected)}, ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  check,
  (issue) => `Неправильные данные: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  checkAsync,
  (issue) => `Неправильные данные: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  checkItems,
  (issue) => `Неправильный элемент: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  checkItemsAsync,
  (issue) => `Неправильный элемент: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  creditCard,
  (issue) =>
    `Неправильный номер кредитной карты: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  cuid2,
  (issue) => `Неправильный Cuid2: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  decimal,
  (issue) =>
    `Неправильное десятичное значение: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  digits,
  (issue) => `Неправильное число: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  email,
  (issue) => `Неправильный email: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  emoji,
  (issue) => `Неправильный эмодзи: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  empty,
  (issue) =>
    `Неправильная длина: ${formatExpected(issue.expected)}, ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  endsWith,
  (issue) =>
    `Неправильный конец: ${formatExpected(issue.expected)}, ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  everyItem,
  (issue) => `Неправильный элемент: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  excludes,
  (issue) =>
    `Неправильное вхождение: ${formatExpected(issue.expected)}, ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  finite,
  (issue) => `Неправильное конечное число: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  graphemes,
  (issue) =>
    `Неправильное количество графем: ${formatExpected(issue.expected)}, ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  hash,
  (issue) => `Неправильный хеш: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  hexColor,
  (issue) =>
    `Неправильный шестнадцатеричный цвет: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  hexadecimal,
  (issue) =>
    `Неправильное шестнадцатеричное значение: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  imei,
  (issue) => `Неправильный IMEI: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  includes,
  (issue) =>
    `Неправильное вхождение: ${formatExpected(issue.expected)}, ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  integer,
  (issue) => `Неправильное целое число: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  ip,
  (issue) => `Неправильный IP: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  ipv4,
  (issue) => `Неправильный IPv4: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  ipv6,
  (issue) => `Неправильный IPv6: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  isoDate,
  (issue) => `Неправильная дата: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  isoDateTime,
  (issue) => `Неправильные дата и время: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  isoTime,
  (issue) => `Неправильное время: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  isoTimeSecond,
  (issue) =>
    `Неправильное время с секундами: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  isoTimestamp,
  (issue) => `Неправильная метка времени: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  isoWeek,
  (issue) => `Неправильная неделя: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  length,
  (issue) =>
    `Неправильная длина: ${formatExpected(issue.expected)}, ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  mac,
  (issue) => `Неправильный MAC: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  mac48,
  (issue) => `Неправильный 48-битный MAC: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  mac64,
  (issue) => `Неправильный 64-битный MAC: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  maxBytes,
  (issue) =>
    `Неправильное количество байтов: ${formatExpected(issue.expected)}, ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  maxGraphemes,
  (issue) =>
    `Неправильное количество графем: ${formatExpected(issue.expected)}, ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  maxLength,
  (issue) =>
    `Неправильная длина: ${formatExpected(issue.expected)}, ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  maxSize,
  (issue) =>
    `Неправильный размер: ${formatExpected(issue.expected)}, ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  maxValue,
  (issue) =>
    `Неправильное значение: ${formatExpected(issue.expected)}, ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  maxWords,
  (issue) =>
    `Неправильное количество слов: ${formatExpected(issue.expected)}, ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  mimeType,
  (issue) =>
    `Неправильный MIME тип: ${formatExpected(issue.expected)}, ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  minBytes,
  (issue) =>
    `Неправильное количество байтов: ${formatExpected(issue.expected)}, ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  minGraphemes,
  (issue) =>
    `Неправильное количество графем: ${formatExpected(issue.expected)}, ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  minLength,
  (issue) =>
    `Неправильная длина: ${formatExpected(issue.expected)}, ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  minSize,
  (issue) =>
    `Неправильный размер: ${formatExpected(issue.expected)}, ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  minValue,
  (issue) =>
    `Неправильное значение: ${formatExpected(issue.expected)}, ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  minWords,
  (issue) =>
    `Неправильное количество слов: ${formatExpected(issue.expected)}, ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  multipleOf,
  (issue) =>
    `Неправильное кратное число: ${formatExpected(issue.expected)}, ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  nanoid,
  (issue) => `Неправильный Nano ID: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  nonEmpty,
  () => `Значение должно не должно быть пустым`,
  localeName,
);
setSpecificMessage(
  notBytes,
  (issue) =>
    `Неправильное количество байтов: ${formatExpected(issue.expected)}, ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  notGraphemes,
  (issue) =>
    `Неправильное количество графем: ${formatExpected(issue.expected)}, ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  notLength,
  (issue) =>
    `Неправильная длина: ${formatExpected(issue.expected)}, ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  notSize,
  (issue) =>
    `Неправильный размер: ${formatExpected(issue.expected)}, ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  notValue,
  (issue) =>
    `Неправильное значение: ${formatExpected(issue.expected)}, ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  notWords,
  (issue) =>
    `Неправильное количество слов: ${formatExpected(issue.expected)}, ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  octal,
  (issue) =>
    `Неправильный восьмеричное значение: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  partialCheck,
  (issue) => `Неправильные данные: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  regex,
  (issue) =>
    `Неправильный формат: ${formatExpected(issue.expected)}, ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  safeInteger,
  (issue) =>
    `Неправильное безопасное целое число: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  size,
  (issue) =>
    `Неправильный размер: ${formatExpected(issue.expected)}, ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  someItem,
  (issue) => `Неправильный элемент: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  startsWith,
  (issue) =>
    `Неправильное начало: ${formatExpected(issue.expected)}, ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  ulid,
  (issue) => `Неправильный ULID: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  url,
  (issue) => `Неправильный URL: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  uuid,
  (issue) => `Неправильный UUID: ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  value,
  (issue) =>
    `Неправильное значение: ${formatExpected(issue.expected)}, ${formatReceived(issue.received)}`,
  localeName,
);
setSpecificMessage(
  words,
  (issue) =>
    `Неправильное количество слов: ${formatExpected(issue.expected)}, ${formatReceived(issue.received)}`,
  localeName,
);
