import {
  GraphQLError,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
  Kind,
} from 'graphql';

export type ISO8601Duration = string;

// original implementation
// https://stackoverflow.com/questions/32044846/regex-for-iso-8601-durations
// const ISO_DURATION_NEGATIVE_ALLOWED = /^-?P(?!$)(-?\d+(?:\.\d+)?Y)?(-?\d+(?:\.\d+)?M)?(-?\d+(?:\.\d+)?W)?(-?\d+(?:\.\d+)?D)?(T(?=-?\d)(-?\d+(?:\.\d+)?H)?(-?\d+(?:\.\d+)?M)?(-?\d+(?:\.\d+)?S)?)?$/
// const ISO_DURATION_WITHOUT_SIGN = /^P(?!$)(\d+(?:\.\d+)?Y)?(\d+(?:\.\d+)?M)?(\d+(?:\.\d+)?W)?(\d+(?:\.\d+)?D)?(T(?=\d)(\d+(?:\.\d+)?H)?(\d+(?:\.\d+)?M)?(\d+(?:\.\d+)?S)?)?$/

// negative and positive durations allowed, commas and decimal points valid for fractions
const ISO_DURATION =
  /^(-|\+)?P(?!$)((-|\+)?\d+(?:(\.|,)\d+)?Y)?((-|\+)?\d+(?:(\.|,)\d+)?M)?((-|\+)?\d+(?:(\.|,)\d+)?W)?((-|\+)?\d+(?:(\.|,)\d+)?D)?(T(?=(-|\+)?\d)((-|\+)?\d+(?:(\.|,)\d+)?H)?((-|\+)?\d+(?:(\.|,)\d+)?M)?((-|\+)?\d+(?:(\.|,)\d+)?S)?)?$/;

export const GraphQLDurationConfig: GraphQLScalarTypeConfig<string, string> =
  /*#__PURE__*/ {
    name: 'Duration',
    description: `
    A string representing a duration conforming to the ISO8601 standard,
    such as: P1W1DT13H23M34S
    P is the duration designator (for period) placed at the start of the duration representation.
    Y is the year designator that follows the value for the number of years.
    M is the month designator that follows the value for the number of months.
    W is the week designator that follows the value for the number of weeks.
    D is the day designator that follows the value for the number of days.
    T is the time designator that precedes the time components of the representation.
    H is the hour designator that follows the value for the number of hours.
    M is the minute designator that follows the value for the number of minutes.
    S is the second designator that follows the value for the number of seconds.

    Note the time designator, T, that precedes the time value.

    Matches moment.js, Luxon and DateFns implementations
    ,/. is valid for decimal places and +/- is a valid prefix
  `,

    serialize(value) {
      if (typeof value !== 'string') {
        throw new TypeError(`Value is not string: ${value}`);
      }

      if (!ISO_DURATION.test(value)) {
        throw new TypeError(`Value is not a valid ISO Duration: ${value}`);
      }

      return value;
    },

    parseValue(value) {
      if (typeof value !== 'string') {
        throw new TypeError(`Value is not string: ${value}`);
      }

      if (!ISO_DURATION.test(value)) {
        throw new TypeError(`Value is not a valid ISO Duration: ${value}`);
      }

      return value;
    },

    parseLiteral(ast) {
      if (ast.kind !== Kind.STRING) {
        throw new GraphQLError(
          `Can only validate strings as ISO Durations but got a: ${ast.kind}`,
        );
      }
      if (!ISO_DURATION.test(ast.value)) {
        throw new TypeError(`Value is not a valid ISO Duration: ${ast.value}`);
      }

      return ast.value;
    },
    extensions: {
      codegenScalarType: 'string',
    },
  };

export const GraphQLISO8601Duration = /*#__PURE__*/ new GraphQLScalarType({
  ...GraphQLDurationConfig,
  name: 'ISO8601Duration',
});

export const GraphQLDuration = /*#__PURE__*/ new GraphQLScalarType({
  ...GraphQLDurationConfig,
  name: 'Duration',
});
