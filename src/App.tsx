import { useState } from 'react';
import UserManagement from './components/users/UserManagement';
import OrganizationManagement from './components/organizations/OrganizationManagement';

function App() {
  const [view, setView] = useState<'users' | 'organizations'>('users');

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Admin Dashboard</h1>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${view === 'users' ? 'active' : ''}`}
            onClick={() => setView('users')}
          >
            Users
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${view === 'organizations' ? 'active' : ''}`}
            onClick={() => setView('organizations')}
          >
            Organizations
          </button>
        </li>
      </ul>

      {view === 'users' && <UserManagement />}
      {view === 'organizations' && <OrganizationManagement />}
    </div>
  );
}

export default App;
