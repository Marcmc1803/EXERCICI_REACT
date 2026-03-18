import { Organization } from '../../models/Organization';
import Button from '../Button/Button';

interface Props {
  organizations: Organization[];
  onEdit: (organization: Organization) => void;
  onDelete: (organization: Organization) => void;
}

/**
 * OrganizationList component - Displays a list of organizations
 * Handles only rendering, logic is managed by parent component
 */
const OrganizationList = ({ organizations, onEdit, onDelete }: Props) => {
  return (
    <ul className="list-group">
      {organizations.map((org) => (
        <li
          key={org._id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <div>
            <span className="fw-bold">{org.name}</span>
            <span className="mx-2 text-muted">|</span>
            <small className="text-muted">ID: {org._id}</small>
          </div>
          <div>
            <Button
              className="mx-1"
              color="secondary"
              onClick={() => onEdit(org)}
            >
              Edit
            </Button>
            <Button
              color="danger"
              onClick={() => onDelete(org)}
            >
              Delete
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default OrganizationList;
