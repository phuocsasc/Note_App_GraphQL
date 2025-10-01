import fakeData from "../fakeData/index.js";
import { FolderModel } from "../models/index.js";
import { NoteModel } from "../models/index.js";
import { AuthorModel } from "../models/index.js";

export const resolvers = {
    Query: {
        folders: async () => {
            const folders = await FolderModel.find();
            return folders;
        },
        folder: async (parent, args) => {
            const folderId = args.folderId;
            const foundFolder = await FolderModel.findOne({
                _id: folderId,
            });
            return foundFolder;
        },
        note: (parent, args) => {
            const noteId = args.noteId;
            return fakeData.notes.find((note) => note.id === noteId);
        },
    },
    Folder: {
        author: (parent, args) => {
            console.log({ parent, args });
            const authorId = parent.authorId;
            return fakeData.authors.find((author) => author.id === authorId);
        },
        notes: (parent, args) => {
            // console.log({ parent }); // folder vừa mới trả về sau khi Click
            return fakeData.notes.filter((note) => note.folderId === parent.id);
        },
    },
    Mutation: {
        addFolder: async (parent, args) => {
            const newFolder = new FolderModel({ ...args, authorId: "1" });
            console.log({ newFolder });
            await newFolder.save();
            return newFolder;
        },
    },
};
