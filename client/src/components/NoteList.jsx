import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams, useLoaderData, useSubmit, useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Grid, IconButton, List, Tooltip, Typography } from "@mui/material";
import { NoteAddOutlined } from "@mui/icons-material";
import moment from "moment";

export default function NoteList() {
    const { noteId, folderId } = useParams();
    const [activeNoteId, setActiveNoteId] = useState(noteId);
    const { folder } = useLoaderData();
    const submit = useSubmit();
    const navigate = useNavigate();

    console.log("NoteList:", { folder });

    useEffect(() => {
        if (noteId) {
            setActiveNoteId(noteId);
            return;
        }
        if (folder?.notes?.[0]) {
            navigate(`note/${folder.notes[0].id}`);
        }
    }, [noteId, folder.notes]);

    const handleAddNewNote = () => {
        submit(
            {
                content: "",
                folderId,
            },
            { method: "post", action: `/folders/${folderId}` },
        );
    };
    return (
        <Grid container height="100%">
            <Grid
                item
                xs={4}
                sx={{
                    width: "100%",
                    maxWidth: "360px",
                    bgcolor: "#f0ebe3",
                    height: "100%",
                    overflowY: "auto",
                    padding: "10px",
                    textAlign: "left",
                }}
            >
                <List
                    subheader={
                        <Box
                            sx={{ mb: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                        >
                            <Typography sx={{ fontWeight: "bold" }}>Notes</Typography>
                            <Tooltip title="Add new note" onClick={handleAddNewNote}>
                                <IconButton size="small" sx={{ color: "black" }}>
                                    <NoteAddOutlined />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    }
                >
                    {folder.notes.map(({ id, content, updatedAt }) => {
                        return (
                            <Link
                                key={id}
                                to={`note/${id}`}
                                style={{ textDecoration: "none" }}
                                onClick={() => setActiveNoteId(id)}
                            >
                                <Card
                                    sx={{
                                        mb: "5px",
                                        backgroundColor: id === activeNoteId ? "rgb(255 211 140)" : null,
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            "&:last-child": { pb: "10px" },
                                            padding: "10px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: 14,
                                                fontWeight: "bold",
                                            }}
                                            dangerouslySetInnerHTML={{
                                                __html: `${content.substring(0, 30) || "Empty"}`,
                                            }}
                                        />
                                        <Typography sx={{ fontSize: 10, color: "gray", marginTop: "5px" }} gutterBottom>
                                            {moment(updatedAt).format("hh:mm a - DD/MM/YYYY")}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </List>
            </Grid>
            <Grid item xs={8}>
                <Outlet />
            </Grid>
        </Grid>
    );
}
