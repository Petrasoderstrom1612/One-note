import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import { nanoid } from "nanoid"
import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore"
import { notesCollection, db } from "./firebase"

export default function App() {
    const [notes, setNotes] = React.useState([])
    const [currentNoteId, setCurrentNoteId] = React.useState("")
    
    const currentNote = 
        notes.find(note => note.id === currentNoteId) 
        || notes[0]


    updatedNotes = notes.sort((a,b) => b.updatedAt - a.updatedAt)
        
    React.useEffect(() => {
     const unsubscribe = onSnapshot(notesCollection, function (snapshot) {
        //sync
        const notesArr = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }))
        setNotes(notesArr)
     })
     return unsubscribe
    }, [])

    React.useEffect(() => {
        if(!currentNoteId) {
            setCurrentNoteId(notes[0]?.id)
        }
    }, [notes])

    React.useEffect(() => {
        const timeoutId = setTimeout(() =>{
            if(tempNoteText !== currentNote.body){
            updateNote(tempNoteText)}
        }, 500)
        return () => clearTimeout (timeoutId)
    }, [tempNoteText])

    async function createNewNote() {
        const newNote = {
          body: "# Type your markdown note's title here",
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
      
        try {
          const newNoteRef = await addDoc(notesCollection, newNote);
          setCurrentNoteId(newNoteRef.id);
        } catch (error) {
          // Handle any errors that might occur during the asynchronous operation
          console.error("Error creating a new note:", error);
        }
      }
      
      // Call the async function
      createNewNote();

      async function updateNote(text) {
        const docRef = doc(db, "notes", currentNoteId);
      
        try {
          await setDoc(docRef, { body: text, updatedAt: Date.now() }, { merge: true });
        } catch (error) {
          // Handle any errors that might occur during the asynchronous operation
          console.error("Error updating the note:", error);
        }
      }
      
      // Call the async function
      updateNote("New text for the note");

      async function deleteNote(noteId) {
        const docRef = doc(db, "notes", noteId);
      
        try {
          await deleteDoc(docRef);
        } catch (error) {
          // Handle any errors that might occur during the asynchronous operation
          console.error("Error deleting the note:", error);
        }
      }

    return (
        <main>
            {
                notes.length > 0
                    ?
                    <Split
                        sizes={[30, 70]}
                        direction="horizontal"
                        className="split"
                    >
                        <Sidebar
                            notes={updatedNotes}
                            currentNote={currentNote}
                            setCurrentNoteId={setCurrentNoteId}
                            newNote={createNewNote}
                            deleteNote={deleteNote}
                        />
                        {
                            <Editor
                                currentNote={currentNote}
                                updateNote={updateNote}
                            />
                        }
                    </Split>
                    :
                    <div className="no-notes">
                        <h1>You have no notes</h1>
                        <button
                            className="first-note"
                            onClick={createNewNote}
                        >
                            Create one now
                </button>
                    </div>

            }
        </main>
    )
}
