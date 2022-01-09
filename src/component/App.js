import React, { useState, useReducer } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import Display from "./Display";
import KEY from "./Constant";

function App() {
  var initialState = JSON.parse(localStorage.getItem(KEY));
  if (!initialState) {
    initialState = [];
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case "add":
        return [...state, action.payload];
      case "clear":
        return [];
      case "delete":
        return state.filter((st) => {
          return st.id !== action.payload;
        });
      default:
        throw new Error("Required");
    }
  };

  const [notes, setNotes] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);

  function addNote(newNote) {
    setNotes((prev) => {
      return [...prev, newNote];
    });
  }

  const deleteDisplay = (id) => {
    const get_all = JSON.parse(localStorage.getItem(KEY));
    const return_deleted = get_all.filter((get_one) => {
      return get_one.id !== id;
    });
    dispatch({ type: "delete", payload: id });
    localStorage.setItem(KEY, JSON.stringify(return_deleted));
  };

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} dispatch={dispatch} />
      <div className="container-fluid my-5">
        <div className="row mb-5">
          {!state
            ? ""
            : state.map((store) => {
                return (
                  <Display
                    key={store.id}
                    id={store.id}
                    title={store.title}
                    content={store.content}
                    onDel={deleteDisplay}
                  />
                );
              })}
        </div>
      </div>
      {/* <div className="container-fluid my-5">
        <div className="row mb-5">
          {!state
            ? ""
            : Object.keys(state).map((store, index) => {
                return (
                  <Display
                    key={localStorage.key(index)}
                    // id={localStorage.getItem(store)}
                    title={localStorage.key(index)}
                    content={localStorage.getItem(localStorage.key(index))}
                    onDel={deleteDisplay}
                  />
                );
              })}
        </div>
      </div> */}

      <Footer />
    </div>
  );
}

export default App;
