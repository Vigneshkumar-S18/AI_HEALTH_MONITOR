import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, Hospital } from '../types';
import { apiRequest } from '../services/api';

interface AuthContextType {
  user: User | null;
  hospital: Hospital | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  quickLoginAsRole: (role: UserRole) => void;
  logout: () => void;
}

const DEFAULT_HOSPITAL: Hospital = {
  id: 'HOSP-001',
  name: 'City Care General Hospital',
  code: 'HOSP-001',
  phone: '+1 (555) 019-2831',
  email: 'info@citycarehospital.org',
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  hospital: null,
  isAuthenticated: false,
  login: async () => false,
  quickLoginAsRole: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('medflow_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [hospital, setHospital] = useState<Hospital | null>(DEFAULT_HOSPITAL);

  useEffect(() => {
    if (user) {
      localStorage.setItem('medflow_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('medflow_user');
    }
  }, [user]);

  const login = async (email: string, pass: string): Promise<boolean> => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password: pass }),
    });

    if (response.success && response.data) {
      const { user: authUser, tokens, hospital: hosp } = response.data;
      localStorage.setItem('medflow_access_token', tokens.accessToken);
      localStorage.setItem('medflow_hospital_id', hosp.id);
      setUser(authUser);
      setHospital(hosp);
      return true;
    }
    return false;
  };

  const quickLoginAsRole = (role: UserRole) => {
    const roleProfiles: Record<UserRole, User> = {
      ADMIN: { userId: 'u-admin-1', email: 'admin@medflow.com', firstName: 'Eleanor', lastName: 'Vane', role: 'ADMIN', hospitalId: 'HOSP-001' },
      DOCTOR: { userId: 'u-doc-1', email: 'doctor@medflow.com', firstName: 'Dr. Sarah', lastName: 'Jenkins', role: 'DOCTOR', hospitalId: 'HOSP-001' },
      RECEPTIONIST: { userId: 'u-rec-1', email: 'receptionist@medflow.com', firstName: 'Marcus', lastName: 'Wright', role: 'RECEPTIONIST', hospitalId: 'HOSP-001' },
      NURSE: { userId: 'u-nurse-1', email: 'nurse@medflow.com', firstName: 'Clara', lastName: 'Oswald', role: 'NURSE', hospitalId: 'HOSP-001' },
      LAB_TECH: { userId: 'u-lab-1', email: 'labtech@medflow.com', firstName: 'David', lastName: 'Banner', role: 'LAB_TECH', hospitalId: 'HOSP-001' },
      PHARMACIST: { userId: 'u-pharm-1', email: 'pharmacist@medflow.com', firstName: 'Rachel', lastName: 'Green', role: 'PHARMACIST', hospitalId: 'HOSP-001' },
      PATIENT: { userId: 'u-pat-1', email: 'patient@medflow.com', firstName: 'Arthur', lastName: 'Pendelton', role: 'PATIENT', hospitalId: 'HOSP-001' },
    };

    const targetUser = roleProfiles[role];
    localStorage.setItem('medflow_access_token', 'demo_mock_jwt_token_' + role);
    localStorage.setItem('medflow_hospital_id', 'HOSP-001');
    setUser(targetUser);
    setHospital(DEFAULT_HOSPITAL);
  };

  const logout = () => {
    localStorage.removeItem('medflow_access_token');
    localStorage.removeItem('medflow_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        hospital,
        isAuthenticated: !!user,
        login,
        quickLoginAsRole,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
