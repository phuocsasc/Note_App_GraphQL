import { graphqlRequest } from "./request";

export const notesLoader = async ({ params: { folderId } }) => {
    console.log({ folderId });
    const query = `query Folder($folderId: String!) {
                    folder(folderId: $folderId) {
                        id
                        name
                        notes {
                            content
                            id
                            updatedAt
                            }
                        }
                    }`;

    const data = await graphqlRequest({
        query,
        variables: {
            folderId: folderId,
        },
    });
    return data;
};

export const noteLoader = async ({ params: { noteId } }) => {
    console.log({ noteId });
    const query = `query Note($noteId: String) {
                        note(noteId: $noteId) {
                            content
                            id
                        }
                    }`;

    const data = await graphqlRequest({
        query,
        variables: {
            noteId: noteId,
        },
    });
    return data;
};

export const addNewNote = async ({ params, request }) => {
    const newNote = await request.formData();
    const formDataObj = {};
    newNote.forEach((value, key) => (formDataObj[key] = value));
    console.log({ newNote, formDataObj });

    const query = `mutation Mutation($content: String!, $folderId: String!) {
                        addNote(content: $content, folderId: $folderId) {
                            id
                            content
                        }
                    }`;

    const { addNote } = await graphqlRequest({
        query,
        variables: {
            ...formDataObj,
        },
    });

    console.log({ addNote });

    return addNote;
};

export const updateNote = async ({ params, request }) => {
    const updatedNote = await request.formData();
    const formDataObj = {};
    updatedNote.forEach((value, key) => (formDataObj[key] = value));
    console.log({ updatedNote, formDataObj });
    const query = `mutation Mutation($id: String!, $content: String!) {
                        updateNote(id: $id, content: $content) {
                            id
                            content
                        }
                    }`;
    const { updateNote } = await graphqlRequest({
        query,
        variables: {
            ...formDataObj,
        },
    });
    console.log({ updateNote });

    return updateNote;
};
