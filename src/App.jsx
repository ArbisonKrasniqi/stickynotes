import "./App.css";
import MainTitleBar from "./assets/MainTitleBar";
import MainFooter from "./assets/MainFooter";
import NotesList from "./assets/NotesList/NotesList";
import NotesItem from "./assets/NotesList/NotesItem";
import { createContext, useState } from "react";


export const MainContext = createContext();

function App() {

  const [notesLocation ,setNotesLocation] = useState('/home/rbee/Desktop/stickynotes');
  const configValues = {notesLocation, setNotesLocation};

  const contextValue = {configValues};
  return (
    <MainContext.Provider value={contextValue}>
      <div 
      style={{ fontFamily: 'Poppins, Roboto' }}
      className="relative flex flex-col bg-light min-h-[150px] w-full h-full p-0 m-0">
        <MainTitleBar/>
          <NotesList>
            <NotesItem data="asdasidawd" title="Sticky note title" color="#ffbf18"/>
            <NotesItem data="asdasidawd" title="Sticky note title" color="#ffbf18"/>
            <NotesItem data="asdasidawd" title="Sticky note title" color="#ffbf18"/>
          </NotesList>
        <MainFooter/>
      </div>
    </MainContext.Provider>
  );
}

export default App;
