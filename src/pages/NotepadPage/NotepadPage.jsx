import React, { useEffect, useState } from 'react';
import './NotepadPage.css';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import { useNavigate, useParams } from 'react-router-dom';
import { hideLoader, showLoader } from '../../utils/loader';
import { fetchNotepad, updateNotepad } from '../../controllers/notepad';

const NotepadPage = () => {
  const { userCredential } = useAuth();
  const navigate = useNavigate();
  const params = useParams();

  const [isClicked, setIsClicked] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState([]);

  // State for the new note to be added
  const [newNote, setNewNote] = useState('');
  const [beginAction, setBeginAction] = useState(false);

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
  const onLoad = async () => {
    try {
      showLoader('note');
      const notepad = await fetchNotepad(params.notepadId);
      setNotes(notepad.notes);
      setBeginAction(true);
    } catch (error) {
      console.error(error);
      toast.error("Can't load notebook");
      navigate('/');
    } finally {
      hideLoader('note');
    }
  };
  useEffect(() => {
    onLoad();
  }, []);

  useEffect(() => {
    if (!beginAction) return;
    updateNotepad(params.notepadId, notes)
      .then(() => {})
      .catch(() => {
        toast.error("Can't update notepad");
      });
  }, [notes]);

  return (
    <div className="NotepadPage">
      <div className="notepad-title">Notes</div>
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
