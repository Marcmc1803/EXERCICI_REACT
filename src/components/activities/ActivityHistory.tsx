import { useState, useMemo } from 'react';
import { useActivity } from '../../hooks/useActivity';
import ActivityList from './ActivityList';
import Button from '../Button/Button';

/**
 * ActivityHistory component - Main container for viewing activity logs.
 */
const ActivityHistory = () => {
  const { activities, loading, error, fetchActivities } = useActivity();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredActivities = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return activities;

    return activities.filter((a) =>
      [
        a.action,
        a.entityType,
        a.entityId,
        a.description,
        a.createdAt,
        a.timestamp,
      ]
        .join(' ')
        .toLowerCase()
        .includes(term)
    );
  }, [activities, searchTerm]);

  return (
    <div>
      <h2 className="mb-4">Historial de Actividad</h2>
      <p className="text-muted">
        Registro de acciones realizadas sobre usuarios y organizaciones.
      </p>

      {error && <p className="text-danger">{error}</p>}
      {loading && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3 text-start">
        <Button color="secondary" onClick={fetchActivities}>
          Actualizar
        </Button>
        <div className="flex-grow-1 ms-3 text-start" style={{ maxWidth: '400px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por acción, entidad, ID o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <ActivityList activities={filteredActivities} />
    </div>
  );
};

export default ActivityHistory;
