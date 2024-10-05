import "./App.css";
import MainTitleBar from "./assets/MainTitleBar";
import MainFooter from "./assets/MainFooter";
import NotesList from "./assets/NotesList/NotesList";
import NotesItem from "./assets/NotesList/NotesItem";
import { createContext, useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api";
import { listen } from '@tauri-apps/api/event';
import StickyNote from "./Windows/StickyNote/StickyNote";
import Settings from "./Windows/Settings/Settings";
import CreateNote from "./Windows/CreateNote/CreateNote";
import { getCurrent } from '@tauri-apps/api/window'; // Import getCurrent from Tauri API
import StickyNotes from "./Windows/StickyNotes/StickyNotes";

function App() {
  const [title, setTitle] = useState(""); // Set a default title

  // Fetch the current window title
  const fetchWindowTitle = async () => {
    const window = await getCurrent();
    const windowTitle = await window.title(); // Get the window title
    setTitle(windowTitle);
    console.log("Current window title:", windowTitle); // Log the window title
  };

  useEffect(() => {
    fetchWindowTitle();
  })

  switch (title) {
    case "stickynotes":
      return <StickyNotes/>;
    case "Settings":
      return <Settings/>;
    case "create":
      return <CreateNote/>;
    default:
      return <StickyNote/>;
  }

}

export default App;
