import "../../App.css";
import MainTitleBar from "../../assets/MainTitleBar";
import { useState } from "react";
import { createFile } from "../../Hooks/FetchHooks";

function CreateNote(){
  
  const [title, setTitle] = useState('');
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const [color, setColor] = useState('#ffbf18');
  const handleColorChange = (event) => {
    setColor(event.target.value);
  };
  const [errorMessage, setErrorMessage] = useState('');


  const handleCreate = (e) => {
    e.preventDefault();
    if (title.trim() === '') {
      setErrorMessage('Title is required.');
      return;
    }
    setErrorMessage('');
  
    try {
      createFile(title, '/home/rbee/Desktop/stickynotes', "Test content");
    } catch (error) {
      if (error.message) setErrorMessage(error.message);
    }
    
  }
  return (
    <div
    style={{ fontFamily: 'Poppins, Roboto' }}
    className="relative flex flex-col bg-light w-full h-full p-0 m-0"
    >
      <MainTitleBar/>
      <form class="h-[auto] w-full mt-6 mb-6 flex flex-col items-center justify-center" onSubmit={handleCreate}>
        <div className="flex flex-row h-[40px] w-[80%] mb-6">
          <input type="text"
                 id="filename"
                 value={title}
                 onChange={handleTitleChange}
                 placeholder="Sticky note name"
                 className="w-[80%] mr-1 h-full shadow-md text-dark text-sm focus:ring-blue-500 focus:border-blue-500"/>

          <input type="color"
                 className="h-full w-[20%] block bg-white cursor-pointer shadow-md disabled:opacity-50 disabled:pointer-events-none"
                 id={"color"}
                 value={color}
                 onChange={handleColorChange}
                 title="Choose your color"/>
        </div>
        <button type="submit" className="w-[50%] px-5 py-2.5 text-sm font-medium rounded-sm shadow-md text-center text-light bg-lighterDark hover:bg-dark focus:ring-4">Create</button>
      </form>
      <div className="text-center w-full flex justify-center">
        <p className="text-red-600 w-[90%] h-auto break-words">{errorMessage}</p>
      </div>
    </div>

    
  )
}
export default CreateNote;