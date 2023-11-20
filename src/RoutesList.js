import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './Homepage';
import CompanyList from './CompanyList';
import CompanyDetail from './CompanyDetail';
import CompanyForm from './CompanyForm';
import JobList from './JobList';
import NotFound from './NotFound';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import ProfileForm from './ProfileForm';
import CompaniesAppliedTo from './CompaniesAppliedTo';

/** Provides routing for app. Will provide access to routes with info on
 *    companies/jobs/profile if user is logged in, otherwise will
 *    show only login and signup buttons, and will not allow other routing.
 */
function RoutesList({ user, signup, login, update }) {

  return (
    <>
      {user ?
        <Routes>
          <Route path="/" element={<Homepage user={user} />} />
          <Route path="/profile" element={<ProfileForm handleSubmit={update} />} />
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/companies/:handle" element={<CompanyDetail />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/applications" element={<CompaniesAppliedTo />} />
          {user.isAdmin && <Route path="/companies/editform" element={<CompanyForm />} />}
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/signup" element={<Navigate to="/" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        :
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<SignupForm handleSubmit={signup}/>} />
          <Route path="/login" element={<LoginForm handleSubmit={login}/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      }
    </>
  );
}


export default RoutesList;
