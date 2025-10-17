export interface RecruiterRequest {
  id: string;
  userEmail: string;
  userName: string;
  linkedinProfile: string;
  requestedAt: string;
  status: 'pending' | 'approved' | 'denied' | 'blocked';
  adminNotes?: string;
}

export class RecruiterRequestService {
  private static STORAGE_KEY = 'devcaliber_recruiter_requests';

  static submitRequest(userEmail: string, userName: string, linkedinProfile: string): void {
    const requests = this.getAllRequests();
    
    const newRequest: RecruiterRequest = {
      id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userEmail,
      userName,
      linkedinProfile,
      requestedAt: new Date().toISOString(),
      status: 'pending'
    };
    
    requests.push(newRequest);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(requests));
  }

  static getAllRequests(): RecruiterRequest[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  static getPendingRequests(): RecruiterRequest[] {
    return this.getAllRequests().filter(req => req.status === 'pending');
  }

  static updateRequestStatus(requestId: string, status: 'approved' | 'denied' | 'blocked', adminNotes?: string): void {
    const requests = this.getAllRequests();
    const requestIndex = requests.findIndex(req => req.id === requestId);
    
    if (requestIndex !== -1) {
      requests[requestIndex].status = status;
      if (adminNotes) {
        requests[requestIndex].adminNotes = adminNotes;
      }
      
      // If approved, set the user's role to RECRUITER
      if (status === 'approved') {
        const userEmail = requests[requestIndex].userEmail;
        localStorage.setItem(`user_role_${userEmail}`, 'RECRUITER');
      }
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(requests));
    }
  }

  static getUserRequestStatus(userEmail: string): RecruiterRequest | null {
    const requests = this.getAllRequests();
    return requests.find(req => req.userEmail === userEmail) || null;
  }

  static isBlocked(userEmail: string): boolean {
    const request = this.getUserRequestStatus(userEmail);
    return request?.status === 'blocked' || false;
  }
}
