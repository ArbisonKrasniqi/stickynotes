use std::io::prelude::*;
use tauri::{AppHandle,Manager, WindowBuilder, WindowUrl};
use std::fs::File;
use std::io::BufReader;
use tauri::api::path::app_data_dir;
use crate::models;
use std::fs;
use std::fs::OpenOptions;
use std::io::Write;
use crate::repo;

#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
pub fn create_stickynote(app_handle: AppHandle, title: String, color: String) -> Result<String, String> {
    match repo::create_sticky_note(&app_handle, title.as_str(), color.as_str()) {
        Ok(_) => Ok(format!("Create sticky note '{}'", title)),
        Err(e) => Err(format!("Failed to create sticky note: {}", e)),
    }
}


#[tauri::command]
pub fn create_window(app_handle: AppHandle, title: String, file: String, width: f64, length: f64) {
    println!("Attempting to create new note window");

    let sanitized_label = title.replace(" ", "_"); // Replace spaces with underscores
    let sanitized_file = file.replace(" ", "%20"); // Replace spaces in the file path with %20

    match WindowBuilder::new(
        &app_handle,
        &sanitized_label,
        WindowUrl::App(sanitized_file.into())
    )
    .title(&title)
    .inner_size(width, length)
    .min_inner_size(200.0, 300.0)
    .decorations(false)
    .transparent(false)
    .build() {
        Ok(_) => println!("Window created successfully."),
        Err(e) => eprintln!("Failed to create window: {:?}", e),
    }
}

#[tauri::command]
pub fn get_sticky_notes(app_handle: AppHandle) -> Result<Vec<models::StickyNote>, String> {
    let config = app_handle.config();
    let app_dir = app_data_dir(&config).ok_or("Could not get app data directory")?.join("stickynotes");
    let mut sticky_notes = Vec::new();

    if let Ok(entries) = fs::read_dir(app_dir) {
        for entry in entries {
            if let Ok(entry) = entry {
                let path = entry.path();
                if path.extension().unwrap_or_default() == "json" {
                    // Deserialize only the fields that exist in the JSON
                    let json_content = fs::read_to_string(&path).map_err(|e| e.to_string())?;
                    let meta: models::StickyNote = serde_json::from_str(&json_content).map_err(|e| e.to_string())?;
                    
                    // Read the first 5 lines of the .txt file
                    let txt_file_path = path.with_extension("txt");
                    let txt_file = File::open(&txt_file_path).map_err(|e| e.to_string())?;
                    let buf_reader = BufReader::new(txt_file);
                    
                    let content: String = buf_reader.lines().take(5)
                        .collect::<Result<Vec<String>, _>>() // Collect lines and handle errors
                        .map_err(|e| format!("Failed to read lines: {}", e))? // Propagate the error if any
                        .join("\n");

                    // Check if the content is empty and set a default message if it is
                    let content = if content.trim().is_empty() {
                        None // or Some("No content available".to_string())
                    } else {
                        Some(content)
                    };

                    // Push the sticky note with the content to the vector
                    sticky_notes.push(models::StickyNote {
                        title: meta.title,
                        color: meta.color,
                        width: meta.width as f64,
                        length: meta.length as f64,
                        content, // Set content here
                    });
                }
            }
        }
    } else {
        return Err("Could not read sticky notes directory".to_string());
    }
    Ok(sticky_notes)
}

#[tauri::command]
pub async fn get_sticky_note_data(app_handle: AppHandle, title: String) -> Result<models::StickyNote, String> {
    // Get the application data directory
    let config = app_handle.config();
    let app_data = app_data_dir(&config).ok_or("Could not find app data directory")?;
    let notes_dir = app_data.join("stickynotes");

    // Define the file paths
    let txt_file_path = notes_dir.join(format!("{}.txt", title));
    let json_file_path = notes_dir.join(format!("{}.json", title));

    // Read the content of the .txt file
    let content = fs::read_to_string(&txt_file_path)
        .map_err(|_| format!("Could not read the file: {}", txt_file_path.display()))?;

    // Read the content of the .json file
    let json_data = fs::read_to_string(&json_file_path)
        .map_err(|_| format!("Could not read the file: {}", json_file_path.display()))?;

    // Deserialize the JSON data
    let sticky_note: models::StickyNote = serde_json::from_str(&json_data)
        .map_err(|_| "Could not parse JSON data".to_string())?;

    // Set the content in the StickyNote struct
    Ok(models::StickyNote {
        content: Some(content),
        ..sticky_note
    })
}


#[tauri::command]
pub async fn update_sticky_note(app_handle: AppHandle, note: models::StickyNote) -> Result<(), String> {
    let config = app_handle.config();
    let app_data_dir = tauri::api::path::app_data_dir(&config).ok_or("Could not find app data directory")?;
    let sticky_notes_dir = app_data_dir.join("stickynotes");
    let text_file_path = sticky_notes_dir.join(format!("{}.txt", note.title));
    let json_file_path = sticky_notes_dir.join(format!("{}.json", note.title));
    // Update the text file with the content
    // Update the text file with the content
    match OpenOptions::new().write(true).truncate(true).open(&text_file_path) {
        Ok(mut file) => {
            // Handle the Option case
            if let Some(content) = &note.content {
                if let Err(e) = file.write_all(content.as_bytes()) {
                    return Err(format!("Failed to write to text file: {}", e));
                }
            } else {
                return Err("Content is None".into()); // Handle the case where content is None
            }
        }
        Err(e) => return Err(format!("Failed to open text file: {}", e)),
    }

    // Create a JSON representation of the StickyNote struct
    let json_data = serde_json::to_string(&note).map_err(|e| format!("Failed to serialize JSON: {}", e))?;

    tauri::async_runtime::spawn(async move {
        // Use app_handle to emit the event
        app_handle.emit_all("sticky-note-updated", {}).unwrap(); // Sending an empty payload for this example
    });

    // Update the JSON file
    match fs::write(json_file_path, json_data) {
        Ok(_) => Ok(()),
        Err(e) => Err(format!("Failed to write to JSON file: {}", e)),
    }
}