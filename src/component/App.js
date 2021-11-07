import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
// import Note from "./Note";
import CreateArea from "./CreateArea";
import Display from "./Display";

function App() {
  const [notes, setNotes] = useState([]);
  const stores = localStorage;
  console.log(notes);

  function addNote(newNote) {
    setNotes((prev) => {
      return [...prev, newNote];
    });
  }

  // function deleteNote(id) {
  //   setNotes((prev) => {
  //     return prev.filter((noteItem, index) => {
  //       return index !== id;
  //     });
  //   });
  // }
  function deleteDisplay(title) {
    localStorage.removeItem(title);
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {/* {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })} */}
      <div className="container-fluid my-5">
        <div className="row mb-5">
          {Object.keys(stores).map((store, index) => {
            return (
              <Display
                key={localStorage.key(index)}
                id={localStorage.key(index)}
                title={localStorage.key(index)}
                content={localStorage.getItem(localStorage.key(index))}
                onDel={deleteDisplay}
              />
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
