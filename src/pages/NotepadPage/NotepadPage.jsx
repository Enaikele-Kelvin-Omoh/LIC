import React, { useState } from 'react';
import './NotepadPage.css';

const NotepadPage = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(
    Array.from(
      { length: 7 },
      (_, i) =>
        `A very lengthy point I created for the creation of the UI/UX of the software to be presented at the inventors hackathon. This one is a bit lengthier. This one has multiple lines so as to give users as much liberty as possible. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae dolor, dolore fugiat dignissimos animi libero optio debitis dolorem dolorum sint.`,
    ),
  );

  // State for the new note to be added
  const [newNote, setNewNote] = useState('');

  // Event handlers
  const handleDelete = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    setIsClicked(false);
    setSelectedItemIndex(null);
    setIsEditing(false);
  };

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
    setIsClicked(selectedItemIndex !== index || !isClicked); // Toggle the clicked state
    setIsEditing(false); // Reset editing state
  };

  const handleEditClick = (index) => {
    setIsEditing(true); // Enable editing mode
    setSelectedItemIndex(index); // Make sure the correct note is being edited
  };

  const handleEditChange = (e, index) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = e.target.value;
    setNotes(updatedNotes);
  };

  const handleEditSave = () => {
    setIsEditing(false); // Exit editing mode
  };

  // Handle adding a new note
  const handleAddNote = () => {
    if (newNote.trim() !== '') {
      setNotes([...notes, newNote]); // Add new note to the list
      setNewNote(''); // Clear the textarea
    }
  };

  return (
    <div className="NotepadPage">
      <div className="notepad-title">Notes for CSC 201</div>
      <ul className="notepad-container">
        {notes.map((note, i) => (
          <div className="notepad-list" key={i}>
            <div className="notepad-content-container">
              <i className="fa-solid fa-diamond point-marker"></i>
              {isEditing && selectedItemIndex === i ? (
                <textarea
                  className="notepad-textarea"
                  value={notes[i]}
                  onChange={(e) => handleEditChange(e, i)}
                />
              ) : (
                <li
                  className="notepad-point"
                  onClick={() => handleItemClick(i)}
                >
                  {note}
                </li>
              )}
            </div>
            {isClicked && selectedItemIndex === i && (
              <div className="notepad-edit-buttons">
                {!isEditing ? (
                  <button
                    className="notepad-button notepad-edit-button"
                    onClick={() => handleEditClick(i)}
                  >
                    Edit Note <i className="fa-solid fa-pen"></i>
                  </button>
                ) : (
                  <button
                    className="notepad-button notepad-save-button"
                    onClick={handleEditSave}
                  >
                    Save Note <i className="fa-solid fa-check"></i>
                  </button>
                )}
                <button
                  className="notepad-button notepad-delete-button"
                  onClick={() => handleDelete(i)}
                >
                  Delete Note <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            )}
          </div>
        ))}
      </ul>

      {/* New note input and add button */}
      <div className="notepad-add-container">
        <textarea
          className="notepad-add-content"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)} // Update new note state
          placeholder="Write your new note here..."
        />
        {/* <button
          className="notepad-button notepad-add-button"
          // Add note when clicked
        > */}
        <i
          className="fa-solid fa-circle-arrow-up btn-notepad-submit"
          onClick={handleAddNote}
        ></i>
        {/* </button> */}
      </div>
    </div>
  );
};

export default NotepadPage;
