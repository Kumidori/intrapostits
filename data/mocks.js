import casual from 'casual';

const mocks = {
    String: () => 'It works!',
    Query: () => ({
        course: (root, args) => {
            return { name: args.name };
        },
    }),
    Course: () => ({ name: () => casual.title })
};

export default mocks;