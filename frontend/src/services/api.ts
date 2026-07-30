const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; message?: string; errors?: any }> {
  const token = localStorage.getItem('medflow_access_token');
  const hospitalId = localStorage.getItem('medflow_hospital_id') || 'HOSP-001';

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Hospital-ID': hospitalId,
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.warn(`[MedFlow API] Endpoint ${endpoint} unreachable. Using resilient offline state.`, error);
    return {
      success: false,
      message: 'Server unreachable. Operating in resilient offline mode.',
    };
  }
}
