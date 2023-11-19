import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Navigate } from 'react-router-dom';
import PaginationComp from '../Dashboard/PaginationComp';
import CardNotesAdmin from '../Cards/CardNotesAdmin';

const ShowNotes = () => {


    // const [clicked, setClicked] = useState(false);

    // const [notes, setNotes] = useState([]);
    // Pagination
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [total_items, setTotal_items] = useState(0);

    const [myNotes, setMyNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    // Cookies
    const [cookies] = useCookies([]);

    useEffect(() => {
        console.log("My Notes");

        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/api/notes?page=${page}`,
                {
                    // withCredentials: true,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                        'token': cookies.token,
                    }
                })
            .then(response => {
                setTotal_items(response.data.count)
                setMyNotes(response.data.items)
                setPage(response.data.page)
                setTotalPages(response.data.pageCount)
                console.log(response.data)
                console.log(total_items)
                setLoading(false)
            })
            .catch(error => {
                console.log("UseEffect Error")
                console.log(error)
                if (error.message === "jwt expired") {
                    Navigate("/sign-in")
                }
            })


    }, [page, cookies.token,total_items /* clicked */])
    //    }, [page, cookies.token, clicked])



    // PAGINATION Function
    function handlePageChange(value) {
        if (value === "&laquo;" || value === "... ") { setPage(1) }
        else if (value === "&lsaquo;") { if (page !== 1) { setPage(page - 1) } }
        else if (value === "&rsaquo;") { if (page !== totalPages) { setPage(page + 1) } }
        else if (value === "&raquo;" || value === " ...") { setPage(totalPages) }
        else { setPage(value) }

        //   // console.log("clicked Page in Pagination"+ value)
    }


    return (
        <>
            {
                loading
                    ? (<p>Loading</p>)
                    : (
                        <div className="container">                           {     /* <!-- Page Content --> */}
                            {/* <button onClick={refreshContent}>Refresh</button> */} {/* TESTING Purpose */}

                            {/* --------------------Page Header-------------------- */}
                            <div className="container mt-2 px-0">
                                {/* <!------ Page header with logo and tagline------> */}
                                <header className="py-0 rounded bg-light mb-1">
                                    <div className="container p-0 m-0">
                                        <div className="text-center my-0">
                                            <h1 className="display-6">{/* fw-bolder  */}
                                                My Notes
                                            </h1>
                                            <p className="lead mb-0"></p>
                                        </div>
                                    </div>
                                </header>
                                <hr />
                            </div>
                            {/* --------------------------------------------------- */}
                            <div className="container">                               {/* 06-03-2023 Index Blog Post */}
                                <div className="row">
                                    {/* POSTS old design */}

                                    <div className="row">
                                        {myNotes.length > 0 && myNotes.map((post, index) => (<CardNotesAdmin key={index} {...post} setMyPosts />))}
                                        {myNotes.length === 0 && <h2 className="text-center">No Result Found</h2>}
                                    </div>
                                    <div className='pagination-container d-flex justify-content-center'>

                                        {/* <SelectLimit onLimitChange={setPageLimit} /> */}

                                        <PaginationComp
                                            totalPage={totalPages}
                                            page={page}
                                            limit={5}
                                            sibling={1}
                                            onPageChange={handlePageChange}
                                        />

                                    </div>
                                </div>
                            </div>

                        </div>
                    )
            }
        </>
    )
}

export default ShowNotes