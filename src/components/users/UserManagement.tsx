import { useState } from 'react';
import { useUser } from '../../hooks/useUser';
import { User } from '../../models/User';
import UserList from './UserList';
import UserForm, { UserFormData } from './UserForm';
import Button from '../Button/Button';

/**
 * UserManagement component - Main container for users CRUD operations
 * Uses the useUser hook for all business logic
 * Handles state for form visibility and editing
 */
const UserManagement = () => {
  const { users, organizations, loading, error, createUser, updateUser, deleteUser } = useUser();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSave = async (data: UserFormData) => {
    const apiPayload = { ...data };
    // If password is empty, remove it from the payload for updates
    if (editingUser && !apiPayload.password) {
      delete (apiPayload as Partial<typeof apiPayload>).password;
    }

    try {
      if (editingUser) {
        // Update existing user
        const updatedUser = { ...editingUser, ...apiPayload } as User;
        await updateUser(updatedUser);
      } else {
        // Create new user
        await createUser(apiPayload as Omit<User, '_id'>);
      }
      setShowForm(false);
      setEditingUser(null);
    } catch {
      // Error is already handled by the hook
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = async (user: User) => {
    try {
      await deleteUser(user._id);
    } catch {
      // Error is already handled by the hook
    }
  };

  const handleAddClick = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  return (
    <div>
      <h2 className="mb-4">Users</h2>
      {error && <p className="text-danger">{error}</p>}
      {loading && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      {showForm ? (
        <UserForm
          onSubmit={handleSave}
          initialData={editingUser || undefined}
          onCancel={handleCancel}
          organizations={organizations}
        />
      ) : (
        <Button className="mb-3" color="primary" onClick={handleAddClick}>
          Add User
        </Button>
      )}

      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default UserManagement;
