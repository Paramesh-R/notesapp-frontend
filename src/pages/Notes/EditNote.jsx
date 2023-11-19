import React, { useEffect, useState, } from 'react'

// Draft JS SETUP
import { Navigate, useParams } from 'react-router-dom'
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { useCookies } from 'react-cookie'
import DraftJsEditor from '../../components/Notes/DraftJSEditor/DraftJsEditor'
import jwtDecode from 'jwt-decode'
import { toast } from 'react-toastify'
// import '../component/DraftEditor.css'


const EditNote = (props) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [title, setTitle] = useState("")
    const [redirect, setRedirect] = useState(false);

    const { id } = useParams();
    // Cookies
    const [cookies] = useCookies([]);







    useEffect(() => {
        console.log("EDIT POST - UseEffect: " + id)

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

            return notesData;
        }

        getData().then(notesData => {
            // setPostInfo(notesData)
            const rawEditorData = JSON.parse(notesData.content)
            if (rawEditorData !== null) {
                const contentState = convertFromRaw(rawEditorData);
                setEditorState(EditorState.createWithContent(contentState));
                setTitle(notesData.title)
            }
        }
        )
    }, [id])





    async function updatePost(ev) {

        ev.preventDefault();
        const data = {
            "title": title,
            "summary": editorState.getCurrentContent().getPlainText().substring(0, 80) + "...",
            "content": JSON.stringify(convertToRaw(editorState.getCurrentContent())),       //Editor State -> Content State --(ConvtoRaw)--> Raw JSON
            "author": jwtDecode(cookies.token).email,
            "lastmodifiedAt": Date.now(),
            //     "tags": hashtags ? hashtags : [],
            //     "mentions": mentions ? mentions.map(ment => ment.value) : [],
            //     // "coverimage":""
        }
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/notes/${id}`,
            {
                method: "PUT",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'token': cookies.token
                },
                body: JSON.stringify(data),
            })
            .catch(err => console.log(`Error while creating new Post ${err}`))

        if (response.ok) {
            toast.success("Post Updated Successfully")
            setRedirect(true)
        } else {
            console.log("Response not okay while creating new");
            console.log(response)
        }
    }



    // <===============================================================================================================>
    //                           REDIRECT TO HOMEPAGE (IF POST CREATED SUCCESSFULLY)
    // <===============================================================================================================>
    if (redirect) return <Navigate to="/" />
    // <===============================================================================================================>

    return (
        <>

            <>
                <div className="container">
                    <div className="card border-0 shadow my-5">
                        <div className="card-body p-0">
                            <h2 className="text-center">Update Post</h2>
                            <hr className=' mx-5' /><br />
                            <form onSubmit={updatePost}>

                                {/* <div className="col-md-6 ms-4 text-left"> */}
                                <div className="col-md-6 mx-4 text-left">
                                    <input type="text" required maxLength="40" className="form-control" id="floatingInput" value={title} placeholder="Title" onChange={(event) => setTitle(event.target.value)} />
                                </div>
                                <div className="col mx-4">
                                    <DraftJsEditor
                                        editorState={editorState}
                                        setEditorState={setEditorState}
                                        max_char_length={2500}
                                    />
                                </div>


                                <div className="col-md-12 text-center mt-2">
                                    <button className="btn btn-success btn-lg " type="submit">Update Post</button>
                                </div>
                                <br />
                            </form>
                        </div>
                    </div>
                </div>

            </>


        </>
    )
}

export default EditNote