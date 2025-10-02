import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, IconButton, Tooltip, TextField, DialogActions, Button } from "@mui/material";
import { CreateNewFolderOutlined } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";

import { addNewFolder } from "../utils/folderUtils";

export default function NewFolder() {
    const [newFolderName, setNewFolderName] = useState("");
    const [open, setOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const popupName = searchParams.get("popup");

    const handleOpenPopup = () => {
        // setOpen(true);
        setSearchParams({ popup: "add-folder" });
    };

    const handleClosePopup = () => {
        // setOpen(false);
        setNewFolderName("");
        navigate(-1);
    };

    const handleNewFolderNameChange = (event) => {
        setNewFolderName(event.target.value);
    };

    const handleAddNewFolder = async () => {
        const { addFolder } = await addNewFolder({ name: newFolderName });
        console.log({ addFolder });
        handleClosePopup();
    };

    useEffect(() => {
        if (popupName === "add-folder") {
            setOpen(true);
            return;
        }
        setOpen(false);
    }, [popupName]);

    return (
        <div>
            <Tooltip title="Add new folder" onClick={handleOpenPopup}>
                <IconButton size="small" sx={{ color: "white" }}>
                    <CreateNewFolderOutlined />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClosePopup}>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Folder Name"
                        fullWidth
                        size="small"
                        variant="standard"
                        sx={{ width: "400px" }}
                        autoComplete="off"
                        value={newFolderName}
                        onChange={handleNewFolderNameChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePopup}>Cancel</Button>
                    <Button onClick={handleAddNewFolder}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
