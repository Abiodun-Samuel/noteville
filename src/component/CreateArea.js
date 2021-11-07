import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@mui/material/Fab";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [isEmpty, setEmpty] = useState(true);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setNote((prev) => {
      if (prev.title.length >= 2) {
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
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
    });
    e.preventDefault();
    var key = note.title;
    var value = note.content;
    localStorage.setItem(key, value);
  }

  function expand() {
    setExpanded(true);
  }
  function clear() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div className="container position-relative">
      <div className="row">
        <div className="col-lg-6">
          <form className="create-note shadow">
            {isExpanded ? (
              <input
                className="form-control"
                name="title"
                onChange={handleChange}
                value={note.title}
                placeholder="Title"
                required
              />
            ) : null}
            <textarea
              className="form-control mt-2"
              onClick={expand}
              name="content"
              onChange={handleChange}
              value={note.content}
              placeholder="Take a note..."
              rows={isExpanded ? 3 : 1}
              required
            />
            {!isEmpty ? (
              <Zoom in={isExpanded}>
                <Fab onClick={submitNote}>
                  <AddIcon />
                </Fab>
              </Zoom>
            ) : null}
          </form>
          <div className="my-1">
            <button onClick={clear} className="btn btn-danger">
              Clear Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateArea;
