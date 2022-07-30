import './Note.css';
import React from "react";
import {Note as NoteDTO} from "../../dto/Note";
import {Icon} from "@mui/material";

type propShape={
    note: NoteDTO,
    onDelete: (note: NoteDTO)=>void
}

export default function Note({note, onDelete}: propShape){
    function deleteNote(){
        onDelete(note!);
    }

    return(
        <div className="Note d-flex justify-content-between p-3" >
            <h1>{note.text}</h1>
            {/*<img src="assets/bin.png" style={{width:'40px'}} alt="bin" onClick={deleteNote}/>*/}
            <Icon className="Icon" style={{fontSize:'3rem'}} onClick={deleteNote}>delete</Icon>
        </div>
    );
}