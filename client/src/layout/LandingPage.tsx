import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import ROUTES from '../routes/routesModel';
import { Button } from '@mui/material';
import FormLink from '../forms/components/FormLink';

// import "../App.css";
 type LandingProp = {
  children: JSX.Element[] | JSX.Element;
 };
// 
const LandingPage : React.FC<LandingProp> = ({ children }) => {
  // const navigate = useNavigate();
  // console.log(navigate);

  return (
    <div className="App">
    <header className="App-header">
  
      <h1>Welcome to My Landing Page</h1>
      <p>Thank you for visiting!</p>
     {/* <Button
     onClick={() => navigate(`${ROUTES.ROOT}`)}>
     get Started
     </Button> */}
      {/* <button className="App-button" 
      onClick={() => navigate(`${ROUTES.ABOUT}`)}>Get Started</button> */}
      {/* <FormLink text='get Started' to={ROUTES.FAV_CARDS}/> */}
      <Link to="/cards">Go to About page</Link>
    </header> 
    </div>
  )
}

export default LandingPage





