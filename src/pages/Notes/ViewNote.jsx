import { EditorState, convertFromRaw } from 'draft-js';
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom';
import DraftJsEditor from '../../components/Notes/DraftJSEditor/DraftJsEditor';

import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { Icon } from '@iconify/react';

const ViewNote = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const { id } = useParams();
  const [notes, setNotes] = useState({});
  const navigate = useNavigate();

  // Cookies
  const [cookies] = useCookies([]);

  const deletePost = async (_id) => {
    console.log('Delete button clicked' + _id)
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/notes/${_id}`,
        {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })
        .catch(err => console.log(`Error while Deleting Post ${err}`))

    if (response.ok) {
        console.log(response)
        // alert("Post Deleted Successfully")
        toast.success("Note Deleted")
    } else {
        console.log("Response not okay while Deleting Post");
    }
    window.location.reload(true);
    <Navigate to={'/dashboard'} />


}


  useEffect(() => {
    // console.log("view POST - UseEffect: " + id)
    async function getData() {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/notes/${id}`,
        {
          // withCredentials: true,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'token': cookies.token,
          }
        });
      const notesData = await response.json()
      console.log(notesData)

      return notesData;
    }

    getData()
      .then(notesData => {
        if (notesData == null) {
          navigate("/")
        } else {
          setNotes(notesData)
          // console.log("GETDATAINFO", postInfo, postInfo.comments[0].comment)
          // console.log(postInfo.comments)
          const rawEditorData = JSON.parse(notesData.content)
          if (rawEditorData !== null) {
            const contentState = convertFromRaw(rawEditorData);
            setEditorState(EditorState.createWithContent(contentState));
          }
        }
      }
      )
  }, [cookies.token, id, navigate])


  return (
    <>
      <div className="container">
        <div className="card border-0 shadow my-5">
          <div className="card-body p-5">
            <article>
              <header className="mb-4">
                <h1 className="fw-bolder mb-1">{notes.title}</h1>
                <div className="d-flex flex-row bd-highlight mb-0">
                  {/* <div className="p-2 bd-highlight"><i className="bi bi-person"></i> {notes.author}</div> */}
                  {/* <div className="p-2 bd-highlight"><i className="bi bi-clock"></i> {formatRFC7231(new Date(postInfo.createdAt))}</div> */}
                  <div className="p-2 bd-highlight"><i className="bi bi-clock"></i> {new Date(notes.createdAt).toDateString()} - {new Date(notes.createdAt).toLocaleTimeString()}</div>
                  {/* <div className="p-2 bd-highlight"><i className="bi bi-chat-dots"></i> {notes.comments.length}</div> */}
                  <div className="p-2 bd-highlight"><i className="bi bi-eye"></i> {notes.viewCount}</div>
                </div>
                <div className="d-flex flex-row bd-highlight mb-3">
                </div>


                {/* {notes.tags.length > 0 && notes.tags.map((tag, index) => (<a key={index} className="badge bg-primary text-decoration-none link-light me-2" href="#!">{tag}</a>))} */}
                {/* {notes.mentions.length > 0 && notes.mentions.map((ment, index) => (<a key={index} className="badge bg-secondary text-decoration-none link-light me-2" href="#!">{ment}</a>))} */}
              </header>
              {/* <figure className="mb-4"><img className="img-fluid rounded" src={postInfo.coverImage} alt="..." /></figure> */}
              <div className="card border-0 rounded-3 shadow-lg">
                <div className="card-body p-4">
                  <section>
                    <DraftJsEditor
                      editorState={editorState}
                      setEditorState={setEditorState}
                      toolbarHidden={true}
                      placeholder={" "}
                      readOnly={true}
                      // content={postInfo.content}
                      wrapperClassName="view-wrapper-class"
                      editorClassName="view-editor-class"
                      toolbarClassName="view-toolbar-class"
                    />

                    {/* <div className="p-2 bd-highlight">last modified:  {formatRFC7231(new Date(postInfo.lastmodifiedAt))}</div> */}
                    {/*  <p className="p-2 bd-highlight text-right">Last modified:  {new Date(postInfo.lastmodifiedAt).toDateString()} - {new Date(postInfo.lastmodifiedAt).toLocaleTimeString()}</p> */}
                    <div className="d-flex flex-row-reverse bd-highlight">
                      <div className="p-2 mt-3 bd-highlight small">Last modified:  {new Date(notes.lastmodifiedAt).toDateString()} - {new Date(notes.lastmodifiedAt).toLocaleTimeString()}</div>

                    </div>
                  </section>
                </div>
              </div>
              <br />
              <Link className="btn btn-warning btn-sm rounded mx-1" to={`/edit/${notes._id}`}><Icon icon="mynaui:edit" width="20" /></Link>
              <span className="btn btn-danger btn-sm rounded mx-1" onClick={() => deletePost(notes._id)}><Icon icon="octicon:trash-24" width="20" /></span>
              <br />
              <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>Go Back</button>
            </article>
            <br />

          </div>
        </div>
      </div>
    </>
  )
}

export default ViewNote