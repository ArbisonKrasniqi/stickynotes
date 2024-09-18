import "./App.css";
import MainTitleBar from "./assets/MainTitleBar";
import MainFooter from "./assets/MainFooter";
import NotesList from "./assets/NotesList/NotesList";
import NotesItem from "./assets/NotesList/NotesItem";

function App() {

  return (
    <div 
    style={{ fontFamily: 'Poppins, Roboto' }}
    className="relative flex flex-col bg-light min-h-[150px] w-full h-full p-0 m-0">
      <MainTitleBar/>
        <NotesList>
          <NotesItem data="asdasidawd" title="Sticky note title" color="#ffbf18"/>
          <NotesItem data="asdasidawd" title="Sticky note title" color="#ffbf18"/>
          <NotesItem data="asdasidawd" title="Sticky note title" color="#ffbf18"/>
          <NotesItem data="asdasidawd" title="Sticky note title" color="#ffbf18"/>
          <NotesItem data="asdasidawd" title="Sticky note title" color="#ffbf18"/>
        </NotesList>
      <MainFooter/>
    </div>
  );
}

export default App;
