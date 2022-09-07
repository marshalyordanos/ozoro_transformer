import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import RatingType from "./RatingType";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";

const DragAndDrop = ({ file, setFiles }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => setFiles([...file, ...files]),
  });
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  const deleteAtachFileHandler = (id) => {
    setFiles(file.filter((v, i) => id !== i));
  };
  return (
    <DragAndDropStyle>
      <section className="container">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        {file.length > 0 && (
          <div className="table-con">
            <aside className="file-lists">
              <table>
                <tbody>
                  <tr>
                    <th>Type</th>
                    <th>Name</th>
                  </tr>
                  {file.map((file, id) => (
                    <tr key={id}>
                      <td>Png</td>
                      <td>{file.name}</td>
                      <td>
                        <IconButton onClick={() => deleteAtachFileHandler(id)}>
                          <RemoveCircleOutlineOutlinedIcon />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </aside>
          </div>
        )}
      </section>
    </DragAndDropStyle>
  );
};

const DragAndDropStyle = styled.div`
  .container2,
  .dropzone {
    margin: 20px auto;
    width: 90vw;
    height: 200px;
    border-radius: 20px;
    border: 2px dashed #006a66;

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    text-align: center;
    p {
      color: #006a66;
    }
  }

  .table-con {
    border: 1px solid #006a66;
    margin: 5px auto;
    width: 90vw;
    border-radius: 15px;
    height: 200px;
    padding: 5px;
    overflow-y: auto;
  }

  .file-lists {
    overflow-y: auto;
    display: flex;
    justify-content: center;
    table {
      border-collapse: collapse;
      width: 98%;
    }
    th {
      padding: 8px;
      color: #006a66;
      text-align: left;
    }
    td {
      padding: 8px;
      text-align: left;
      color: #006a66;
      border-bottom: 1px solid #ddd;
    }
  }
`;

export default DragAndDrop;

// import React, { useRef, useState } from "react";
// import styled from "styled-components";

// const DragAndDrop = (props) => {
//   const wrapperRef = useRef();
//   const [filelist, setFilelist] = useState([]);
//   const onDragEnter = (e) => {
//     e.preventDefault();
//     wrapperRef.current.classList.add("dragover");
//   };
//   const onDragLeave = (e) => {
//     e.preventDefault();
//     wrapperRef.current.classList.remove("dragover");
//   };
//   const onDrop = (e) => {
//     e.preventDefault();
//     wrapperRef.current.classList.remove("dragover");
//   };
//   const onFileDrop = (e) => {
//     e.preventDefault();
//     const newFile = e.target.files[0];
//     if (newFile) {
//       const updateList = [...filelist, newFile];
//       setFilelist(updateList);
//       props.onChangeFile(newFile);
//     }
//   };
//   return (
//     <div>

//     </div>
//     // <DragAndDropStyle>
//     //   <div ref={wrapperRef} className="drop-file-input">
//     //     <div className="drop-file-input__label">
//     //       <p>Drag and Drop your files here</p>
//     //       <input
//     //         onChange={onFileDrop}
//     //         onDragEnter={onDragEnter}
//     //         onDragLeave={onDragLeave}
//     //         onDrop={onDrop}
//     //         type={"file"}
//     //         name="files"
//     //         id=""
//     //       />
//     //     </div>
//     //   </div>
//     // </DragAndDropStyle>
//   );
// };

// const DragAndDropStyle = styled.div`
//   margin: 20px;
//   .drop-file-input {
//     position: relative;
// width: 90vw;
// height: 200px;
// border-radius: 20px;
// border: 2px dashed;

// display: flex;
// align-items: center;
// justify-content: center;
//     input {
//       opacity: 0;
//       /* z-index: 10; */
//       position: absolute;
//       top: 0;
//       left: 0;
//       width: 100%;
//       height: 100%;
//       cursor: pointer;
//     }
//   }
//   .drop-file-input:hover,
//   .drop-file-input.dragover {
//     opacity: 0.6;
//   }
//   .drop-file-input__label {
//     text-align: center;
//     color: #006a66;
//     padding: 0 10px;
//     font-weight: 600;
//   }
// `;
// export default DragAndDrop;
