import { graphqlRequest } from "./request.js";

export const foldersLoader = async () => {
    const query = `query Folders {
                                folders {
                                    id
                                    name
                                    createdAt
                                }
                            }`;
    const data = await graphqlRequest({ query });
    return data;
};

export const addNewFolder = async (newFolder) => {
    const query = `mutation Mutation($name: String!) {
                                addFolder(name: $name) {
                                    name
                                    author {
                                        uid
                                        name
                                    }
                                }
                            }`;
    const variables = { name: newFolder.name };
    const data = await graphqlRequest({ query, variables });
    return data;
};
