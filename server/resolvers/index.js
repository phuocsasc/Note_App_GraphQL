import { FolderModel, NoteModel, AuthorModel, NotificationModel } from "../models/index.js";
import { GraphQLScalarType } from "graphql";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

export const resolvers = {
    Date: new GraphQLScalarType({
        name: "Date",
        description: "Date custom scalar type",
        parseValue(value) {
            return new Date(value); // value from the client
        },
        serialize(value) {
            return value.toISOString(); // value sent to the client
        },
        parseLiteral(ast) {
            return new Date(ast.value); // ast value is always in string format
        },
    }),
    Query: {
        folders: async (parent, args, context) => {
            const folders = await FolderModel.find({
                authorId: context.uid,
            }).sort({ updatedAt: "desc" });
            console.log({ folders, context });
            return folders;
        },
        folder: async (parent, args) => {
            const folderId = args.folderId;
            const foundFolder = await FolderModel.findOne({
                _id: folderId,
            });
            return foundFolder;
        },
        note: async (parent, args) => {
            const noteId = args.noteId;
            const note = await NoteModel.findOne({ _id: noteId });
            return note;
        },
    },
    Folder: {
        author: async (parent, args) => {
            const authorId = parent.authorId;
            const author = await AuthorModel.findOne({
                uid: authorId,
            });
            return author;
        },
        notes: async (parent, args) => {
            // console.log({ parent }); // folder vừa mới trả về sau khi Click
            const notes = await NoteModel.find({ folderId: parent.id }).sort({ updatedAt: "desc" });
            console.log({ notes });
            return notes;
        },
    },
    Mutation: {
        addNote: async (parent, args) => {
            const newNote = new NoteModel(args);
            await newNote.save();
            return newNote;
        },
        updateNote: async (parent, args) => {
            const notedId = args.id;
            const note = await NoteModel.findByIdAndUpdate(notedId, args, { new: true });
            return note;
        },
        addFolder: async (parent, args, context) => {
            const newFolder = new FolderModel({ ...args, authorId: context.uid });
            console.log({ newFolder });
            pubsub.publish("FOLDER_CREATED", { folderCreated: { message: "A new folder has been created." } });
            await newFolder.save();
            return newFolder;
        },
        register: async (parent, args) => {
            const foundUser = await AuthorModel.findOne({ uid: args.uid });
            if (!foundUser) {
                const newUser = new AuthorModel(args);
                await newUser.save();
                return newUser;
            }
            return foundUser;
        },
        pushNotification: async (parent, args) => {
            const newNotification = new NotificationModel(args);
            await newNotification.save();
            pubsub.publish("PUSH_NOTIFICATION", { notification: { message: args.content } });
            return { message: "Notification sent. Success" };
        },
    },
    Subscription: {
        folderCreated: {
            subscribe: () => pubsub.asyncIterator(["FOLDER_CREATED", "NOTE_CREATED"]),
        },
        notification: {
            subscribe: () => pubsub.asyncIterator(["PUSH_NOTIFICATION"]),
        },
    },
};
