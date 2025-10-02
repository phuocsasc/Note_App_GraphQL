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
    const query = `query Folder($noteId: String) {
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
