use std::fs::{self, File};
use std::io::Write;
use std::io;
use tauri::api::path::app_config_dir;
use tauri::api::path::app_data_dir;
use tauri::AppHandle;
use std::path::PathBuf;
use tauri::Manager;
use crate::models;

pub fn ensure_config_exists(app_handle: &AppHandle) -> std::io::Result<()> {
    // Step 1: Get the configuration directory path using app.config()
    let config = app_handle.config();
    if let Some(config_dir) = app_config_dir(&config) {
        // Define the path to the config file
        let mut config_path = config_dir.clone();
        config_path.push("stickynotes.config.toml"); // The config file

        //Check if the config file exists
        if !config_path.exists() {
            println!("Config file not found. Creating one...");

            //Create the directory if it doesn't exist
            if let Some(parent_dir) = config_path.parent() {
                if !parent_dir.exists() {
                    fs::create_dir_all(parent_dir)?;
                }
            }

            //Create the config file with default content
            let mut file = File::create(config_path)?;
            file.write_all(b"[settings]\nkey = \"value\"\n")?; // Write default content (TOML in this case)

            println!("Config file created with default content.");
        } else {
            println!("Config file already exists.");
        }
    } else {
        println!("No app config directory found.");
    }

    Ok(())
}

pub fn ensure_app_data_dir(app_handle: &AppHandle) -> io::Result<PathBuf> {
    // Get the app data directory
    let config = app_handle.config();
    let data_dir = app_data_dir(&config).ok_or_else(|| {
        io::Error::new(io::ErrorKind::NotFound, "App data directory not found")
    })?;

    // Create the directory for sticky notes if it doesn't exist
    let sticky_notes_dir = data_dir.join("stickynotes");
    if !sticky_notes_dir.exists() {
        fs::create_dir_all(&sticky_notes_dir)?;
    }

    Ok(sticky_notes_dir)
}

pub fn create_sticky_note(app_handle: &AppHandle, title: &str, color: &str) -> io::Result<()> {
    
    let config = app_handle.config();
    let data_dir = app_data_dir(&config).ok_or_else(|| io::Error::new(io::ErrorKind::NotFound, "App data directory not found"))?;

    let sticky_notes_dir = data_dir.join("stickynotes");
    if !sticky_notes_dir.exists() {
        fs::create_dir_all(&sticky_notes_dir)?;
    }

    let txt_file_name = sticky_notes_dir.join(format!("{}.txt", title));
    let json_file_name = sticky_notes_dir.join(format!("{}.json", title));

    //Create empty sticky note
    File::create(&txt_file_name)?;

    let new_file_data = models::NewFile {
        title: title.to_string(),
        color: color.to_string(),
        width: 400.0,
        length: 400.0,
    };

    // Serialize the struct to JSON
    let json_data = serde_json::to_string(&new_file_data)?;

    // Write the JSON data to sticky note config
    let mut json_file = File::create(&json_file_name)?;
    json_file.write_all(json_data.as_bytes())?;

    println!("Sticky note '{}' created successfully with color '{}'.", title, color);

    let app = app_handle.clone();
    tauri::async_runtime::spawn(async move {
        app.emit_all("sticky-note-created", {}).unwrap();
    });

    Ok(())
}

