/* eslint-disable sonarjs/no-useless-intersection */
/* eslint-disable no-duplicate-imports */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable import/no-unresolved */
import type { $ZodErrorMap, $ZodStringFormats } from 'zod/v4/core';
import { util } from 'zod/v4/core';

function getRussianPlural(
  count: number,
  one: string,
  few: string,
  many: string,
): string {
  const absCount = Math.abs(count);
  const lastDigit = absCount % 10;
  const lastTwoDigits = absCount % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return many;
  }

  if (lastDigit === 1) {
    return one;
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return few;
  }

  return many;
}

interface RussianSizable {
  unit: {
    one: string;
    few: string;
    many: string;
  };
  verb: string;
}

interface Opts {
  extraTypeLocales?: Record<string, string>;
  extraNouns?: Record<string, any>;
  overrides?: {
    /**
     * @default `Значение должно быть заполнено`
     */
    valueIsRequired?: string;
  };
}

const error = (opts?: Opts): $ZodErrorMap => {
  const valueIsRequiredMessage =
    opts?.overrides?.valueIsRequired ?? `Значение должно быть заполнено`;

  const Sizable: Record<string, RussianSizable> = {
    string: {
      unit: {
        one: 'символ',
        few: 'символа',
        many: 'символов',
      },
      verb: 'иметь',
    },
    file: {
      unit: {
        one: 'байт',
        few: 'байта',
        many: 'байт',
      },
      verb: 'иметь',
    },
    array: {
      unit: {
        one: 'элемент',
        few: 'элемента',
        many: 'элементов',
      },
      verb: 'иметь',
    },
    set: {
      unit: {
        one: 'элемент',
        few: 'элемента',
        many: 'элементов',
      },
      verb: 'иметь',
    },
  };

  function getSizing(origin: string): RussianSizable | null {
    return Sizable[origin] ?? null;
  }

  const typeLocales: Record<any, string> = {
    string: 'строка',
    number: 'число',
    int: 'целое число',
    boolean: 'логическое значение',
    object: 'объект',
    array: 'массив',
    bigint: 'большое число',
    blob: 'блоб-объект',
    file: 'файл',
    function: 'функция',
    map: 'карта',
    set: 'набор',
    unknown: 'неизвестное значение',
    date: 'дата',
    never: 'неожидаемое значение',
    nan: 'не-число',
    null: 'пустое значение',
    undefined: 'пустое значение',
    any: 'значение',
    ...opts?.extraTypeLocales,
  };

  const getLocaledType = (data: any): string => {
    const keyedValue = `${data}`.toLowerCase();
    const dataType = (typeof data).toLowerCase();

    if (dataType === 'object') {
      if (Array.isArray(data)) {
        return typeLocales.array;
      }

      if (
        data &&
        Object.getPrototypeOf(data) !== Object.prototype &&
        data.constructor
      ) {
        return typeLocales[data.constructor.name] || data.constructor.name;
      }
    }

    return typeLocales[keyedValue] || `${data}`;
  };

  const Nouns: {
    [k in $ZodStringFormats | (string & {})]?: string;
  } = {
    regex: 'ввод',
    email: 'email адрес',
    url: 'URL',
    emoji: 'эмодзи',
    uuid: 'UUID',
    uuidv4: 'UUIDv4',
    uuidv6: 'UUIDv6',
    nanoid: 'nanoid',
    guid: 'GUID',
    cuid: 'cuid',
    cuid2: 'cuid2',
    ulid: 'ULID',
    xid: 'XID',
    ksuid: 'KSUID',
    datetime: 'ISO дата и время',
    date: 'ISO дата',
    time: 'ISO время',
    duration: 'ISO длительность',
    ipv4: 'IPv4 адрес',
    ipv6: 'IPv6 адрес',
    cidrv4: 'IPv4 диапазон',
    cidrv6: 'IPv6 диапазон',
    base64: 'строка в формате base64',
    base64url: 'строка в формате base64url',
    json_string: 'JSON строка',
    e164: 'номер E.164',
    jwt: 'JWT',
    template_literal: 'ввод',
    ...opts?.extraNouns,
  };

  const femaledTypes = new Set([
    typeLocales.Function,
    typeLocales.string,
    typeLocales.Date,
    Nouns.datetime,
    Nouns.date,
    Nouns.json_string,
    Nouns.base64,
    Nouns.base64url,
  ]);

  const neuterTypes = new Set([Nouns.time]);

  const f = {
    expects: (v: any) => {
      const formatted = getLocaledType(v);
      if (femaledTypes.has(formatted)) {
        return `ожидалась ${formatted}`;
      }
      return `ожидалось ${formatted}`;
    },
    received: (v: any) => {
      const formatted = getLocaledType(v);
      if (femaledTypes.has(formatted)) {
        return `получена ${formatted}`;
      }
      return `получено ${formatted}`;
    },
  };

  return (issue) => {
    switch (issue.code) {
      case 'invalid_type': {
        if (issue.input == null && issue.expected != null) {
          return valueIsRequiredMessage;
        }

        return `Неверный ввод: ${f.expects(issue.expected)}, ${f.received(issue.input)}`;
      }
      case 'invalid_value': {
        if (issue.values.length === 1)
          return `Неверный ввод: ${f.expects(util.stringifyPrimitive(getLocaledType(issue.values[0])))}`;
        return `Неверный вариант: ожидалось одно из ${util.joinValues(
          issue.values.map((value) => getLocaledType(value)),
          '|',
        )}`;
      }
      case 'too_big': {
        const adj = issue.inclusive ? '<=' : '<';
        const sizing = getSizing(issue.origin);

        if (sizing) {
          const maxValue = Number(issue.maximum);
          const unit = getRussianPlural(
            maxValue,
            sizing.unit.one,
            sizing.unit.few,
            sizing.unit.many,
          );
          return `Слишком большое значение: ожидалось, что ${getLocaledType(issue.origin)} будет иметь ${adj}${issue.maximum.toString()} ${unit}`;
        }
        return `Слишком большое значение: ожидалось, что ${getLocaledType(issue.origin)} будет ${adj}${issue.maximum.toString()}`;
      }
      case 'too_small': {
        if (
          issue.origin === 'string' &&
          issue.minimum > 0 &&
          issue.input === ''
        ) {
          return valueIsRequiredMessage;
        }

        const adj = issue.inclusive ? '>=' : '>';
        const sizing = getSizing(issue.origin);

        if (sizing) {
          const minValue = Number(issue.minimum);
          const unit = getRussianPlural(
            minValue,
            sizing.unit.one,
            sizing.unit.few,
            sizing.unit.many,
          );
          return `Слишком маленькое значение: ожидалось, что ${getLocaledType(issue.origin)} будет иметь ${adj}${issue.minimum.toString()} ${unit}`;
        }
        return `Слишком маленькое значение: ожидалось, что ${getLocaledType(issue.origin)} будет ${adj}${issue.minimum.toString()}`;
      }
      case 'invalid_format': {
        const _issue = issue;
        if (_issue.format === 'starts_with')
          return `Неверная строка: должна начинаться с "${_issue.prefix}"`;
        if (_issue.format === 'ends_with')
          return `Неверная строка: должна заканчиваться на "${_issue.suffix}"`;
        if (_issue.format === 'includes')
          return `Неверная строка: должна содержать "${_issue.includes}"`;
        if (_issue.format === 'regex')
          return `Неверная строка: должна соответствовать шаблону ${_issue.pattern}`;

        const format = Nouns[_issue.format] ?? issue.format;

        if (neuterTypes.has(format)) {
          return `Неверное ${format}`;
        }

        if (femaledTypes.has(format)) {
          return `Неверная ${format}`;
        }

        return `Неверный ${format}`;
      }
      case 'not_multiple_of': {
        return `Неверное число: должно быть кратным ${issue.divisor}`;
      }
      case 'unrecognized_keys': {
        return `Нераспознанн${issue.keys.length > 1 ? 'ые' : 'ый'} ключ${issue.keys.length > 1 ? 'и' : ''}: ${util.joinValues(issue.keys, ', ')}`;
      }
      case 'invalid_key': {
        return `Неверный ключ в ${issue.origin}`;
      }
      case 'invalid_union': {
        return 'Неверные входные данные';
      }
      case 'invalid_element': {
        return `Неверное значение в ${getLocaledType(issue.origin)}`;
      }
      default: {
        return `Неверные входные данные`;
      }
    }
  };
};

export function betterRuLocale(opts?: Opts): { localeError: $ZodErrorMap } {
  return {
    localeError: error(opts),
  };
}
