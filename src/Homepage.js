import { NavLink } from "react-router-dom";
import './Homepage.css';

/** Homepage which displays welcome message or login/sign up buttons */
function Homepage({ user }) {
  return (
    <div className="Homepage">
      <h1>Jobly</h1>
      <p>All the jobs in one, convenient place.</p>
      {user ?
        <h2>Welcome back, {user.username}!</h2>
        :
        <>
          <NavLink to="/signup"><button>Sign Up</button></NavLink>
          <NavLink to="/login"><button>Login</button></NavLink>
        </>
      }
    </div>
  );
}

export default Homepage;
