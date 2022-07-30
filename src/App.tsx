import React from 'react';
import './App.css';
import Input from "./components/Input/Input";
import {Note as NoteDTO} from './dto/Note'
import Note from "./components/Note/Note";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';




export const USER_ID = "9d07fc53-a463-433d-b716-222c74451a3b";

export default class App extends React.Component<any, { notes: Array<NoteDTO> }> {

    constructor(props: any) {
        super(props);
        this.state = {notes: []}
        this.addNote = this.addNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
    }

    componentDidMount() {
        this.loadAllNotes();
    }

    async loadAllNotes() {
        let response = await fetch(`http://localhost:8080/notes/api/v1/users/${USER_ID}/notes`);
        this.setState({
            notes: await response.json()
        })
    }

    async deleteNote(note:NoteDTO) {
        console.log(note);
        const response = await fetch(`http://localhost:8080/notes/api/v1/users/${USER_ID}/notes/${note.id}`, {method:'DELETE'});

        if (response.status === 204) {
            const newArray = this.state.notes.filter(n => n!==note);
            this.setState({
                notes: newArray
            });
        }
    }

    async addNote(text: string) {

        let response = await fetch(`http://localhost:8080/notes/api/v1/users/${USER_ID}/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(new NoteDTO(null, text, USER_ID))
        });

        if (response.status === 201) {
            this.setState({
                notes: [await response.json(), ...this.state.notes]
            });
        }

    }


    render() {
        return (
            <>
                <header>
                    <h1 className="text-center mt-3">Simple Note Taking React App</h1>
                </header>
                <Input onAdd={this.addNote}/>
                {this.state.notes.map(note=><Note key={note.id} note={note} onDelete={this.deleteNote}/>)}
            </>
        );

    }

}