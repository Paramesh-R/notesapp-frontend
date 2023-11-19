import React, { useState } from 'react'
import DraftJsEditor from '../../components/Notes/DraftJSEditor/DraftJsEditor';

// Draft JS SETUP
import { convertToRaw, EditorState } from 'draft-js';
import { Navigate } from 'react-router-dom';
// import { Badge } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

// const NewNoteArea = () => {
//   // STATES
//   const [title, setTitle] = useState("")
//   const [editorState, setEditorState] = useState(EditorState.createEmpty());
//   const [redirect, setRedirect] = useState(false);

//   return (
//     <>
//       <form onSubmit={() => { }}>
//         <div className="col-md-5 col-lg-4">
          
//           <input
//             type="text"
//             name="title"
//             id="notesTitle"
//             required={true}
//             maxLength={40}
//             className='form-control'
//             placeholder='Title'
//             onChange={(event) => setTitle(event.target.value)}
//           />
//         </div>
       
//         <DraftJsEditor
//           editorState={editorState}
//           setEditorState={setEditorState}
//           max_char_length={2500}
//         />
//       </form>
//     </>
//   )
// }

const CreateNote = () => {
  const [cookies] = useCookies([]);

  // STATES
  const [title, setTitle] = useState("")
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [redirect, setRedirect] = useState(false);

  async function createNewNote(ev) {
    
    ev.preventDefault();
    
    const data = {
      "title": title,
      "content": JSON.stringify(convertToRaw(editorState.getCurrentContent())),       //Editor State -> Content State --(ConvtoRaw)--> Raw JSON
      // "tags": hashtags ? hashtags : [],
      // "mentions": mentions ? mentions.map(ment => ment.value) : [],
      "author": jwtDecode(cookies.token).email,
      "summary": editorState.getCurrentContent().getPlainText().substring(0, 80) + "...",
      "createdAt": Date.now()
      // "coverimage":""
    }
    
    const response = await fetch(process.env.REACT_APP_SERVER_URL+'/api/notes',
      {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'token': cookies.token
      },
        body: JSON.stringify(data)
      })
      .catch(err => console.log(`Error while creating new Note ${err}`))

    if (response.ok) {
      console.log(response)
      // alert("Note Created Successfully")
      setRedirect(true)
      toast.success("Note created Successfully")
    } else {
      console.log("Response not okay while creating new");
    }
  }


  // <===============================================================================================================>
  //                           REDIRECT TO HOMEPAGE (IF POST CREATED SUCCESSFULLY)
  // <===============================================================================================================>
  if (redirect) return <Navigate to="/" />
  // <===============================================================================================================>

  return (
    <>
      {/* --------------------Page Header-------------------- */}
      <div className="container mt-2 px-0">
        {/* <!------ Page header with logo and tagline------> */}
        <header className="py-0 rounded bg-light mb-1">
          <div className="container p-0 m-0">
            <div className="text-center my-0">
              <h1 className="display-6">{/* fw-bolder  */}
                Create New Note
              </h1>
              <p className="lead mb-0"></p>
            </div>
          </div>
        </header>
      </div>
      {/* --------------------------------------------------- */}



      {/* Implement Draft JS Editor for Creating New Note */}
      <div className="container">

        {/* <NewNoteArea /> */}

        <hr />

        {/* CARD */}
        <div className="card border-1 shadow my-5">

          {/* CARD BODY */}
          <div className="card-bodyp-0">

            {/* Create Post Form   */}
            <form onSubmit={createNewNote}>
              <div className="col-md-6 mx-4 text-left">
                {/* Title */}
                <input
                  type="text"
                  name="title"
                  id="notesTitle"
                  required={true}
                  maxLength={40}
                  className='form-control'
                  placeholder='Title'
                  onChange={(event) => setTitle(event.target.value)}
                />


              </div>
              <div className="col mx-4 border border-danger ">
                {/* DraftJS Editor */}
                <DraftJsEditor
                  editorState={editorState}
                  setEditorState={setEditorState}
                  max_char_length={2500}
                />
              </div>



              <div className="col-sm-6 col-md-12 text-center mt-2">
                <button className="btn btn-success btn-lg " type="submit">Create Post</button>
              </div>



            </form>

          </div>

        </div>

      </div>
      {/* --------------------------------------------------- */}


    </>
  )
}

export default CreateNote