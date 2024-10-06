#[derive(serde::Serialize)]
pub struct NewFile {
    pub title: String,
    pub color: String,
    pub width: f64,
    pub length: f64,
}

#[derive(serde::Serialize)]
#[derive(serde::Deserialize)]

pub struct StickyNote {
    pub title: String,
    pub color: String,
    pub width: f64,
    pub length: f64,
    pub content: Option<String>,
}

#[derive(serde::Serialize)]
pub struct StickyNoteDeletedPayload {
    pub note_title: String,
}
    
    