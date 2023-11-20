import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter } from 'react-router-dom'; //Navigate
import RoutesList from './RoutesList';
import Nav from './Nav';
import userContext from "./userContext";
import JoblyApi from './api';
import jwt_decode from "jwt-decode";
import Loading from './Loading';


// Notes on context:
//  - Using context in: JobCard, ProfileForm.
//  - For nav and homepage, passing user directly as prop.


/** App: Job app. Allows user to sign in and view jobs and companies
 *    including options for user to search for jobs by company or by job title.
 * Displays Nav bar and routes list.
 *
 * Props: None
 *
 * State:
 *  - User: The current logged in user, if any
 *  - Token: Issued from backend, used for authorization
 *
 */
function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoaded, setIsLoaded] = useState(false);

  /** Updates token and sets within local storage (removes if not available) */
  function updateToken(token) {
    // console.log("token", token);

    setToken(token);
    (token) ?
      localStorage.setItem("token", token) :
      localStorage.removeItem("token");
  }

  async function login(formData) {
    const token = await JoblyApi.loginUser(formData);
    updateToken(token);
  }

  async function signup(formData) {
    const token = await JoblyApi.registerUser(formData);
    updateToken(token);
  }

  async function update(formData) {
    JoblyApi.token = token;
    const newUser = await JoblyApi.updateUser(user.username, formData);
    setUser(newUser);
  }

  async function updateCompany(handle, formData){
    JoblyApi.token = token;
    const newCompany = await JoblyApi.updateCompany(handle, formData);
    console.log('updated company info for ', newCompany);
  }

  function logout() {
    setUser(null);
    updateToken(null);
  }

  async function apply(username, jobId) {
    //const applyMsg = await JoblyApi.applyToJob(username, jobId);
    await JoblyApi.applyToJob(username, jobId);
    const newUser = await JoblyApi.getUserInfo(username);
    setUser(newUser);
  }


  /** Checks state for a token, if token exists set token in Jobly API
   *    and set user state if token exists. */
  useEffect(function getUserData() {
    async function fetchUserData() {
      if (token) {
        try { // Using try/catch block here to check for bad existing token from local storage
          JoblyApi.token = token;
          const decoded = jwt_decode(token);
          const userData = await JoblyApi.getUserInfo(decoded.username);
          setUser(userData);
        } catch(err) {
          console.error(err);
        }
      }
      setIsLoaded(true);

    }
    fetchUserData();
  }, [token]);


  return (
    <div className="App">
      {isLoaded ?
            <userContext.Provider value={{ user, token, apply }}>
            <BrowserRouter>
              <Nav user={user} logout={logout} />
              <RoutesList user={user} login={login} signup={signup} update={update} updateCompany={updateCompany}/>
            </BrowserRouter>
          </userContext.Provider>
      :
      <Loading />
      }
    </div>
  );
}

export default App;
