import { GRAPHQL_SERVER_URL } from "./constants.js";

export const graphqlRequest = async (payload, options = {}) => {
    if (localStorage.getItem("accessToken")) {
        const res = await fetch(`${GRAPHQL_SERVER_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                ...options,
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            if (res.status === 403) {
                return null; // Forbidden
            }
        }

        const { data } = await res.json();
        return data;
    }
    return null;
};
