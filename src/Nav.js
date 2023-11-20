import "./Nav.css";
import { NavLink, Link } from "react-router-dom";


/** Renders navigation bar for website.
 * Shows login/signup/homepage only if user not logged in.
 * If user is logged in, show all links to companies/jobs/profile/homepage.
 */
function Nav({ user, logout }) {

  return (
    <nav className="NavBar">
      {user ?
        <>
          <NavLink to="/">Jobly</NavLink>
          <NavLink to="/companies">Companies</NavLink>
          <NavLink to="/jobs">Jobs</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/applications">Applications</NavLink>
          <Link to="/" onClick={logout}>Logout</Link>
        </>
        :
        <>
          <NavLink to="/">Jobly</NavLink>
          <NavLink to="/signup" >Sign Up</NavLink>
          <NavLink to="/login" >Login</NavLink>
        </>
      }
    </nav>

  );
}


export default Nav;