import { useEffect } from "react";
import TitleBar from "../../assets/SimpleTitleBar";
import { appWindow } from '@tauri-apps/api/window';
import { useState } from "react";
import { EditorProvider} from '@tiptap/react'
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit'
import "../../App.css";
import { getNoteData } from "../../Hooks/FetchHooks";
import { invoke } from "@tauri-apps/api";
import UseWindowDimensions from "../../Hooks/UseWindowDimensions";
import { useContext } from "react";

const StickyNote = () => {
  const [windowTitle, setWindowTitle] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('light');
  const [initialContent, setInitialContent] = useState('');
  const [newContent, setNewContent] = useState('');
  const {width, height} = UseWindowDimensions();
  
  useEffect(() => {
    const getTitle = async () => {
        try {
            const title = await appWindow.title();
            setWindowTitle(title);
        } catch (error) {
            console.log("Error fetching title");
        }
    }
    getTitle();
    
    async function fetchNoteData() {
      if (windowTitle !== '') {
        try {
          const noteData = await getNoteData(windowTitle);
          setInitialContent(noteData.content);
          setBackgroundColor(noteData.color);
          setInitialContent(noteData.content || '');
        } catch (error) {
          console.error('Failed to fetch note data', error);
        }
      }
    }
    
    fetchNoteData();
  }, [windowTitle]);


  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
  });

  useEffect(() => {
    if (editor && initialContent) {
      editor.commands.setContent(initialContent); // Set the content in the editor
      setNewContent(initialContent);
    }

  }, [editor, initialContent]);
  

  useEffect(() => {
    if (editor) {
      const updateHandler = () => {
        const htmlContent = editor.getHTML();
        setNewContent(htmlContent);
      };

      editor.on('update', updateHandler);

      return () => {
        editor.off('update', updateHandler);
      };
    }
  }, [editor]);

  useEffect(() => {
    console.log(newContent);
  }, [newContent])

  //Saving content logic:

  useEffect(() => {
    const saveStickyNote = async () => {
      try {
        const note = {
          title: windowTitle,
          color: backgroundColor,
          content: newContent,
          width: width,
          length: height
        }
        const result = await invoke('update_sticky_note', {note: note});
      } catch (error) {
        console.log(error);
      }
    }


    const handler = setTimeout(() => {
        if (newContent) {
            saveStickyNote();
            
        }
    }, 1000); // Save after 1 second of inactivity

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
          saveStickyNote();
      }, 1000);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    return () => {
        clearTimeout(handler);
        window.removeEventListener('resize', handleResize);
    };

  }, [newContent, width, height]);

  return (
    <div
        style={{ fontFamily: 'Poppins, Roboto',
                 backgroundColor: backgroundColor
         }}
        className="relative flex flex-col w-full h-full p-0 m-0"
    >
        <TitleBar color={backgroundColor}/>
        {/* Text editor */}

        <div className="prose tiptap focus:outline-none text-dark w-auto h-auto m-4 overflow-auto">
            {editor ? <EditorContent editor={editor} /> : <p>Loading editor...</p>}
        </div>
    </div>
  )
      
}

export default StickyNote;