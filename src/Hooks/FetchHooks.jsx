import { invoke } from "@tauri-apps/api";

export async function createFile(filename, location, content) {
      await invoke('create_text_file', { filename, location, content })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error('Error creating file:', error);
      });
}
  
//Title of the window in OS
//File is the html file in ./public which will host the JSX files
export async function openNewNoteWindow(title, file) {
  try {
    await invoke('create_note_window', {title, file});
    console.log('New note window created');
  } catch (error) {
    console.error('Failed to create window:', error);
  }
}