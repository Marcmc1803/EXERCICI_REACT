import { Activity } from '../../models/Activity';

interface Props {
  activities: Activity[];
}

const ActivityList = ({ activities }: Props) => {
  const getActionColor = (action: string) => {
    switch (action) {
      case 'CREATE':
        return 'text-success';
      case 'UPDATE':
        return 'text-primary';
      case 'DELETE':
        return 'text-danger';
      default:
        return 'text-secondary';
    }
  };

  const formatTimestamp = (timestamp?: string) => {
    if (!timestamp) return '—';
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('es-ES', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  };

  if (activities.length === 0) {
    return <div className="alert alert-info">No hay actividades registradas.</div>;
  }

  return (
    <ul className="list-group">
      {activities.map((activity) => (
        <li key={activity._id || activity.entityId + activity.timestamp} className="list-group-item">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <span className={`fw-bold ${getActionColor(activity.action)}`}>
                [{activity.action}]
              </span>
              <span className="ms-2 badge bg-light text-dark border">
                {activity.entityType}
              </span>
              <p className="mb-0 mt-1">{activity.description}</p>
              <small className="text-muted">Entity ID: {activity.entityId}</small>
            </div>
            <div className="text-end">
              <small className="d-block text-muted">
                {formatTimestamp(activity.createdAt || activity.timestamp)}
              </small>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ActivityList;
