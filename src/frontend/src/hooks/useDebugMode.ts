import { useState, useEffect } from 'react';
import { 
  isDebugMode, 
  getDebugOrcidId, 
  getDebugUserInfo,
  getEffectiveOrcidId,
  shouldTreatAsAuthenticated 
} from '@/utils/debugConfig';
import { getStoredOrcidId, isOrcidAuthenticated } from '@/utils/orcidAuth';
import { getUserIdentity, UserIdentity } from '@/api/orcidApi';

interface UseDebugModeReturn {
  isDebugActive: boolean;
  debugOrcidId: string;
  effectiveOrcidId: string;
  isAuthenticated: boolean;
  userIdentity: UserIdentity | null;
  loading: boolean;
  error: string | null;
  refreshUserIdentity: () => Promise<void>;
}

export const useDebugMode = (): UseDebugModeReturn => {
  const [userIdentity, setUserIdentity] = useState<UserIdentity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isDebugActive = isDebugMode();
  const debugOrcidId = getDebugOrcidId();
  
  // Get the effective ORCID ID (debug or authenticated)
  const storedOrcidId = getStoredOrcidId();
  const effectiveOrcidId = getEffectiveOrcidId(storedOrcidId);
  
  // Determine authentication status
  const actuallyAuthenticated = isOrcidAuthenticated();
  const isAuthenticated = shouldTreatAsAuthenticated(actuallyAuthenticated);

  const fetchUserIdentity = async (orcidId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(`🔧 ${isDebugActive ? 'DEBUG MODE' : 'NORMAL MODE'} - Fetching user identity for:`, orcidId);
      
      const identity = await getUserIdentity(orcidId);
      
      // Mark as authenticated if in debug mode or actually authenticated
      identity.authenticated = isAuthenticated;
      
      setUserIdentity(identity);
      console.log('✅ User identity loaded:', identity);
    } catch (err) {
      console.error('❌ Error fetching user identity:', err);
      setError(err instanceof Error ? err.message : 'Failed to load user identity');
      
      // In debug mode, fall back to debug user info
      if (isDebugActive) {
        const debugInfo = getDebugUserInfo();
        setUserIdentity(debugInfo);
        setError(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const refreshUserIdentity = async () => {
    await fetchUserIdentity(effectiveOrcidId);
  };

  useEffect(() => {
    fetchUserIdentity(effectiveOrcidId);
  }, [effectiveOrcidId, isDebugActive]);

  return {
    isDebugActive,
    debugOrcidId,
    effectiveOrcidId,
    isAuthenticated,
    userIdentity,
    loading,
    error,
    refreshUserIdentity
  };
}; 