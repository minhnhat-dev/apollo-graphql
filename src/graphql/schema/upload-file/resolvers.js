const UploadFileResolver = {
  Query: {
    uploads: (parent, args) => {},
  },
  Mutation: {
    singleUpload: (parent, args) => args.file.then((file) =>
    // Contents of Upload scalar: https://github.com/jaydenseric/graphql-upload#class-graphqlupload
    // file.createReadStream() is a readable node stream that contains the contents of the uploaded file
    // node stream api: https://nodejs.org/api/stream.html
      file),
  },
};

module.exports = UploadFileResolver;
