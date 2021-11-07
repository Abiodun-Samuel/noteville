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
    if (name === "title" && value.length >= 1) {
      setEmpty(false);
    } else {
      setEmpty(true);
    }
    setNote((prev) => {
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

  return (
    <div className="container position-relative d-flex justify-content-center">
      <div className="col-lg-8">
        <form className="create-note shadow">
          {isExpanded ? (
            <input
              className="w-100"
              name="title"
              onChange={handleChange}
              value={note.title}
              placeholder="Title"
              required
            />
          ) : null}
          <textarea
            className="w-100"
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
      </div>
    </div>
  );
}

export default CreateArea;
