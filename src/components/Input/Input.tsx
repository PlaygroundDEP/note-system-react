import './Input.css';
import {FormEvent, useRef} from "react";
import {TextField} from "@mui/material";
import {Button} from "@mui/material";

export default function Input({onAdd}:{onAdd:(text:string)=>void}){
    const refInputContainer=useRef(null);

    function addNote(e: FormEvent){
        e.preventDefault();

        onAdd((refInputContainer.current! as HTMLInputElement).value);
        (refInputContainer.current! as HTMLInputElement).value='';
        (refInputContainer.current! as HTMLInputElement).focus();
    }

    return(
        <form className="Input d-flex flex-row justify-content-center g-3 p-3" onSubmit={addNote}>
            <TextField inputRef={refInputContainer} style={{width:'100%'}} id="outlined-basic" label="Enter a new Note" variant="outlined" />
           {/* <button className="btn btn-primary" style={{width:'120px'}}>+Add Note</button>*/}
            <Button variant="contained" style={{width:'180px'}} onClick={addNote}>Add Note +</Button>
        </form>
    );
}