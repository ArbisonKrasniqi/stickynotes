import "../../App.css";
import MainTitleBar from "../../assets/MainTitleBar";
import MainFooter from "../../assets/MainFooter";
import NotesList from "../../assets/NotesList/NotesList";
import NotesItem from "../../assets/NotesList/NotesItem";
import { createContext, useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api";
import { listen } from '@tauri-apps/api/event';

export const MainContext = createContext();

const StickyNotes = () => {
    const [stickynotes, setStickynotes] = useState();
    async function fetchStickyNotes() {
      try {
            const notes = await invoke('get_sticky_notes');
            setStickynotes(notes);
        } catch (error) {
            console.error('Failed to fetch notes: ', error);
        }
    }
    
    useEffect(() => {
        fetchStickyNotes();
    }, []);

    useEffect(() => {
        const unlistenCreate = listen('sticky-note-created', () => {
            console.log('A new sticky note has been created!');
            fetchStickyNotes();
        });
    
        const unlistenUpdate = listen('sticky-note-updated', () => {
            console.log("Sticky note updated!");
            fetchStickyNotes();
        });    
        return () => {
            unlistenCreate.then(unsubscribe => unsubscribe());
            unlistenUpdate.then(unsubscribe => unsubscribe());
        };
    }, []);
    
    const contextValue = { stickynotes, setStickynotes, fetchStickyNotes };

    return(
        <MainContext.Provider value={contextValue}>
        <div
          style={{ fontFamily: 'Poppins, Roboto' }}
          className="relative flex flex-col bg-light min-h-[150px] w-full h-full p-0 m-0">
          <MainTitleBar />
          <NotesList>
            {stickynotes && stickynotes.map(note => (
              <NotesItem
                key={note.title} // It's good practice to include a key for each item in the list
                data={note.content}
                title={note.title}
                color={note.color}
                width={note.width}
                height={note.length}
              />
            ))}
          </NotesList>
          <MainFooter />
        </div>
      </MainContext.Provider>
    );

}

export default StickyNotes