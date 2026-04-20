import { useEffect, useState } from 'react';
import activityService from '../services/activity-service';
import { CanceledError } from '../services/api-client';
import { Activity } from '../models/Activity';

interface UseActivitiesReturn {
  activities: Activity[];
  loading: boolean;
  error: string;
  fetchActivities: () => void;
  logActivity: (activity: Omit<Activity, '_id' | 'createdAt'>) => Promise<void>;
}

/**
 * Custom hook for managing activity logs.
 */
export function useActivity(): UseActivitiesReturn {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = () => {
    setLoading(true);
    setError('');
    const { request, cancel } = activityService.getAll<Activity>();

    request
      .then((res) => {
        // Sorting by timestamp or createdAt descending if available
        const sorted = (res.data || []).sort((a, b) => {
          const dateA = new Date(a.createdAt || a.timestamp || 0).getTime();
          const dateB = new Date(b.createdAt || b.timestamp || 0).getTime();
          return dateB - dateA;
        });
        setActivities(sorted);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError((err as Error).message);
        setLoading(false);
      });

    return () => cancel();
  };

  const logActivity = async (activity: Omit<Activity, '_id' | 'createdAt'>) => {
    try {
      await activityService.create(activity);
      // We don't necessarily need to update local state here if we refresh later,
      // but let's keep it simple.
    } catch (err) {
      console.error('Failed to log activity:', err);
      // We don't set global error here to avoid blocking UI for audit log failures
    }
  };

  return {
    activities,
    loading,
    error,
    fetchActivities,
    logActivity,
  };
}
