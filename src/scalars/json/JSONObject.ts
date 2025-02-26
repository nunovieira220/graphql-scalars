/* eslint-disable @typescript-eslint/ban-types */
import { GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { ensureObject, parseObject } from './utils';

const specifiedByURL =
  'http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf';

export const GraphQLJSONObjectConfig = /*#__PURE__*/ {
  name: 'JSONObject',
  description:
    'The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).',
  serialize: ensureObject,
  parseValue: ensureObject,
  parseLiteral: parseObject,
  specifiedByURL,
  specifiedByUrl: specifiedByURL,
  extensions: {
    codegenScalarType: 'Record<string, any>',
  },
} as GraphQLScalarTypeConfig<object, object>;

export const GraphQLJSONObject = /*#__PURE__*/ new GraphQLScalarType(
  GraphQLJSONObjectConfig,
);
