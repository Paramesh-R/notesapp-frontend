// import React, { useState } from 'react'
// import CreateUrl from '../createUrl/CreateUrl';
// import EmptyStateUrl from './EmptyStateUrl';

import ShowNotes from "../../components/Notes/ShowNotes"

// import { useCookies } from 'react-cookie';
// import jwtDecode from 'jwt-decode';
// import AppBar from '../../components/Appbar/AppBar';
// import NavbarComp from '../../components/Navbar/NavbarComp';
// import ShortUrlDataTable from './ShortUrlDataTable';


const Dashboard = () => {


  // const [showUrlAddView, setShowUrlAddView] = useState(false);

  /* function isTokenExpired(token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.exp < (Date.now() / 1000);

  }
 */







  return (
    <>
      <div className="dashboard">
        <ShowNotes />
        {/* <div className="container d-flex align-items-center justify-content-center" style={{ 'minHeight': '50vh' }}>
          <h1 className="display-4">Welcome</h1>
        </div> */}
      {/*   {
          !showUrlAddView
          && (<ShortUrlDataTable setShowUrlAddView={setShowUrlAddView} />)
        }
        {
          showUrlAddView &&
          (<CreateUrl setShowUrlAddView={setShowUrlAddView} />)
        } */}
      </div >
    </>
  )

}

export default Dashboard