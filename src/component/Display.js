import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@mui/material/Fab";

const Display = (props) => {
  function handleDelete() {
    props.onDel(props.id);
  }

  return (
    <div className="col-lg-3 col-md-4 col-sm-6">
      <div className="note my-3 shadow">
        <h1>{props.title}</h1>
        <p>{props.content}</p>
        <Zoom in={true}>
          <Fab onClick={handleDelete}>
            <DeleteIcon />
          </Fab>
        </Zoom>
      </div>
    </div>
  );
};

export default Display;
