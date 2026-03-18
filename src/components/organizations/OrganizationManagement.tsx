import { useState } from 'react';
import { useOrganization } from '../../hooks/useOrganization';
import { Organization } from '../../models/Organization';
import OrganizationList from './OrganizationList';
import OrganizationForm, { OrganizationFormData } from './OrganizationForm';
import Button from '../Button/Button';

/**
 * OrganizationManagement component - Main container for organizations CRUD operations
 * Uses the useOrganization hook for all business logic
 * Handles state for form visibility and editing
 */
const OrganizationManagement = () => {
  const { organizations, loading, error, createOrganization, updateOrganization, deleteOrganization } = useOrganization();
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSave = async (data: OrganizationFormData) => {
    try {
      if (editingOrg) {
        // Update existing organization
        const updatedOrg = { ...editingOrg, ...data } as Organization;
        await updateOrganization(updatedOrg);
      } else {
        // Create new organization
        await createOrganization(data as Omit<Organization, '_id'>);
      }
      setShowForm(false);
      setEditingOrg(null);
    } catch {
      // Error is already handled by the hook
    }
  };

  const handleEdit = (org: Organization) => {
    setEditingOrg(org);
    setShowForm(true);
  };

  const handleDelete = async (org: Organization) => {
    try {
      await deleteOrganization(org._id);
    } catch {
      // Error is already handled by the hook
    }
  };

  const handleAddClick = () => {
    setEditingOrg(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingOrg(null);
  };

  return (
    <div>
      <h2 className="mb-4">Organizations</h2>
      {error && <p className="text-danger">{error}</p>}
      {loading && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      {showForm ? (
        <OrganizationForm
          onSubmit={handleSave}
          initialData={editingOrg || undefined}
          onCancel={handleCancel}
        />
      ) : (
        <Button className="mb-3" color="primary" onClick={handleAddClick}>
          Add Organization
        </Button>
      )}

      <OrganizationList
        organizations={organizations}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default OrganizationManagement;
