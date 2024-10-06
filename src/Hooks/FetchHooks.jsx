import { invoke } from "@tauri-apps/api";

export async function createFile(title, color) {
      await invoke('create_stickynote', { title, color })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error('Error creating file:', error);
      });
}
  
//Title of the window in OS
//File is the html file in ./public which will host the JSX files
//Min width x length: 200.0, 300.0 respectively
export async function createWindow(title, file, width, length) {
  try {
    await invoke('create_window', {title, file, width, length});
    console.log('New note window created');
  } catch (error) {
    console.error('Failed to create window:', error);
  }
}

export async function getStickyNotes() {
  try {
    const notes = await invoke('get_sticky_notes');
    return notes;
  } catch (error) {
    console.error('Failed to fetch notes: ', error);
  }
}

export async function getNoteData(title) {
  try {
    // Pass the argument as an object with the key `noteName`
    const note = await invoke('get_sticky_note_data', { title: title });
    return note;
  } catch (error) {
    console.error('Failed to get data', error);
  }
}

export async function deleteStickyNote(title) {
  try {
    const response = await invoke('delete_sticky_note', {noteTitle: title+""})
  } catch (error) {
    console.error("Failed to delete note", error);
  }
}