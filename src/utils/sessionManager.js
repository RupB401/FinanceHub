/**
 * Session Persistence Utility (Client-Side Only)
 * Handles local session persistence without backend
 */

class SessionManager {
  constructor() {
    this.listeners = new Set();
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    // Listen for storage changes across tabs
    window.addEventListener('storage', (e) => {
      if (e.key === 'user_data') {
        this.notifyListeners(e);
      }
    });
  }

  // Subscribe to session changes
  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  // Notify all listeners of session changes
  notifyListeners(event) {
    this.listeners.forEach(callback => {
      try {
        callback(event);
      } catch (error) {
        console.error('Session listener error:', error);
      }
    });
  }

  // Clear session data
  clearSession() {
    localStorage.removeItem('user_data');
    localStorage.removeItem('remember_me');
    this.notifyListeners({ key: 'user_data', newValue: null });
  }

  // Get current session state
  getSessionState() {
    const userData = localStorage.getItem('user_data');
    
    return {
      isAuthenticated: !!userData,
      user: userData ? JSON.parse(userData) : null,
    };
  }

  // Save session data (client-side only)
  saveSession(userData, rememberMe = false) {
    localStorage.setItem('user_data', JSON.stringify(userData));
    if (rememberMe) {
      localStorage.setItem('remember_me', rememberMe.toString());
    }
    this.notifyListeners({ key: 'user_data', newValue: userData });
  }

  // Initialize session from storage
  initializeFromStorage() {
    const userData = localStorage.getItem('user_data');
    const rememberMe = localStorage.getItem('remember_me') === 'true';
    
    if (userData) {
      return {
        user: JSON.parse(userData),
        rememberMe,
      };
    }
    
    return null;
  }
}

export default new SessionManager();
