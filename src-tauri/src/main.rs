// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
pub mod controller;
pub mod models;
pub mod repo;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/commands

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![controller::greet, controller::create_text_file, controller::create_note_window,])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
