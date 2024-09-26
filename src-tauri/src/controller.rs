use std::io::prelude::*;
use tauri::{AppHandle, WindowBuilder, WindowUrl};

#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
pub fn create_text_file(filename: String, location: String, content: String) -> Result<String, String> {
    let full_path = format!("{}/{}.txt", location, filename);

    let mut file = match std::fs::File::create(&full_path) {
        Ok(file) => file,
        Err(e) => return Err(format!("Failed to create file: {}", e)),
    };

    match file.write_all(content.as_bytes()) {
        Ok(_) => Ok(format!("Created file '{}' with content:\n{}", full_path, content)),
        Err(e) => Err(format!("Failed to write to file: {}", e)),
    }
}

#[tauri::command]
pub fn create_note_window(app_handle: AppHandle, title: String, file: String) {
    println!("Attempting to create new note window");
    match WindowBuilder::new(
        &app_handle,
        "createNote",
        WindowUrl::App(file.into())
    )
    .title(title)
    .inner_size(250.0, 350.0)
    .min_inner_size(200.0, 300.0)
    .decorations(false)
    .transparent(false)
    .build() {
        Ok(_) => println!("Window created successfully."),
        Err(e) => eprintln!("Failed to create window: {:?}", e),
    }
}