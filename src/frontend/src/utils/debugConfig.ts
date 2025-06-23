/**
 * Debug configuration for development and testing
 * 
 * This file contains debug settings that can be easily toggled
 * for development, testing, and demonstration purposes.
 */

// Debug mode flag - set to true to enable debug mode
export const DEBUG_MODE = false;

// Hardcoded ORCID ID for debug mode
export const DEBUG_ORCID_ID = "0000-0003-1574-0784";

// Debug user information (simulated)
export const DEBUG_USER_INFO = {
  orcid_id: DEBUG_ORCID_ID,
  name: "Debug User",
  email: "debug@example.com",
  current_affiliation: "Debug University",
  current_location: "Debug City, Debug Country",
  profile_url: `https://orcid.org/${DEBUG_ORCID_ID}`,
  authenticated: true
};

/**
 * Check if debug mode is enabled
 */
export const isDebugMode = (): boolean => {
  return DEBUG_MODE;
};

/**
 * Get the debug ORCID ID
 */
export const getDebugOrcidId = (): string => {
  return DEBUG_ORCID_ID;
};

/**
 * Get debug user information
 */
export const getDebugUserInfo = () => {
  return DEBUG_USER_INFO;
};

/**
 * Check if the given ORCID ID is the debug ORCID ID
 */
export const isDebugOrcidId = (orcidId: string): boolean => {
  return orcidId === DEBUG_ORCID_ID;
};

/**
 * Get appropriate ORCID ID based on debug mode and authentication status
 * @param authenticatedOrcidId - The ORCID ID from authentication (if any)
 * @returns The ORCID ID to use (debug or authenticated)
 */
export const getEffectiveOrcidId = (authenticatedOrcidId?: string | null): string => {
  if (DEBUG_MODE) {
    return DEBUG_ORCID_ID;
  }
  return authenticatedOrcidId || DEBUG_ORCID_ID;
};

/**
 * Check if the current session should be treated as authenticated
 * @param isAuthenticated - Whether the user is actually authenticated
 * @returns Whether to treat as authenticated (true in debug mode or if actually authenticated)
 */
export const shouldTreatAsAuthenticated = (isAuthenticated: boolean): boolean => {
  return DEBUG_MODE || isAuthenticated;
}; 