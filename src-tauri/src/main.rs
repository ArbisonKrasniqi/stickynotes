// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
pub mod controller;
pub mod models;
pub mod repo;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/commands

// fn main() {
//     tauri::Builder::default()
//         .invoke_handler(tauri::generate_handler![controller::greet, controller::create_text_file, controller::create_window,])
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            // Ensure the config exists at startup
            let app_handle = app.handle();
            if let Err(e) = repo::ensure_config_exists(&app_handle) {
                eprintln!("Error ensuring config file: {}", e);
            }

            if let Err(e) = repo::ensure_app_data_dir(&app_handle) {
                eprintln!("Error ensuring data directory: {}", e);
            }

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
                controller::greet,
                controller::create_stickynote,
                controller::create_window,
                controller::get_sticky_notes,
                controller::get_sticky_note_data,
                controller::update_sticky_note,
                controller::delete_sticky_note])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}