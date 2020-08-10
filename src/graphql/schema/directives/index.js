/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
const { gql, SchemaDirectiveVisitor } = require('apollo-server-express');
const { defaultFieldResolver } = require('graphql');

const DirectiveType = gql`
    directive @uppercase on FIELD_DEFINITION
`;

class UpperCaseDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args) {
      const result = await resolve.apply(this, args);
      if (typeof result === 'string') {
        return result.toUpperCase();
      }
      return result;
    };
  }
}

module.exports = {
  DirectiveType,
  UpperCaseDirective,
};
