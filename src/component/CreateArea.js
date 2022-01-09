import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@mui/material/Fab";
import KEY from "./Constant";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [isEmpty, setEmpty] = useState(true);

  const [note, setNote] = useState({
    id: Date.now(),
    title: "",
    content: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setNote((prev) => {
      if (prev.title.length >= 1 && prev.content.length >= 1) {
        setEmpty(false);
      } else {
        setEmpty(true);
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function submitNote(e) {
    e.preventDefault();
    props.onAdd(note);
    const prev_local_notes = JSON.parse(localStorage.getItem(KEY));
    if (!prev_local_notes) {
      localStorage.setItem(KEY, JSON.stringify([note]));
    } else {
      const new_local_notes = [...prev_local_notes, { ...note }];
      localStorage.setItem(KEY, JSON.stringify(new_local_notes));
    }

    props.dispatch({ type: "add", payload: { ...note } });
    setNote({
      id: Date.now(),
      title: "",
      content: "",
    });
    setEmpty(true);
  }

  function expand() {
    setExpanded(true);
  }

  function clear() {
    localStorage.clear();
    props.dispatch({ type: "clear", payload: {} });
  }

  return (
    <div className="container position-relative">
      <div className="row">
        <div className="col-lg-6">
          <form className="create-note shadow">
            <input
              className="form-control"
              name="title"
              onChange={handleChange}
              value={note.title}
              placeholder="Title"
              required
            />
            <textarea
              style={{ overflow: "hidden" }}
              className="form-control mt-2"
              onClick={expand}
              name="content"
              onChange={handleChange}
              value={note.content}
              placeholder="Enter your note..."
              rows={isExpanded ? 3 : 1}
              required
            />
            {isEmpty ? null : (
              <Fab onClick={submitNote}>
                <AddIcon />
              </Fab>
            )}
          </form>
          <div className="my-1">
            <button onClick={clear} className="btn btn-danger">
              Delete all Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateArea;
