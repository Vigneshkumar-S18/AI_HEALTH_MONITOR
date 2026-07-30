import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Login } from './pages/Auth/Login';

// Phase 1 Dashboards
import { AdminDashboard } from './pages/Dashboards/AdminDashboard';
import { DoctorDashboard } from './pages/Dashboards/DoctorDashboard';
import { ReceptionDashboard } from './pages/Dashboards/ReceptionDashboard';
import { NurseDashboard } from './pages/Dashboards/NurseDashboard';
import { LabDashboard } from './pages/Dashboards/LabDashboard';
import { PharmacyDashboard } from './pages/Dashboards/PharmacyDashboard';
import { PatientPortal } from './pages/Dashboards/PatientPortal';

// Phase 1 Operational Modules
import { PatientList } from './pages/Patients/PatientList';
import { AppointmentManager } from './pages/Appointments/AppointmentManager';
import { BedManager } from './pages/Wards/BedManager';
import { BillingManager } from './pages/Billing/BillingManager';
import { HospitalSettings } from './pages/Settings/HospitalSettings';

// Phase 2 Patient Engagement & Telemedicine Modules
import { TelemedicineRoom } from './pages/Telemedicine/TelemedicineRoom';
import { RecoveryDashboard } from './pages/Recovery/RecoveryDashboard';
import { AIChatBot } from './pages/AIAssistant/AIChatBot';
import { SecureMessaging } from './pages/Chat/SecureMessaging';
import { CaregiverPortal } from './pages/Caregiver/CaregiverPortal';
import { HealthHub } from './pages/Wearables/HealthHub';
import { FormIntake } from './pages/DigitalForms/FormIntake';
import { EducationHub } from './pages/Education/EducationHub';

// Phase 3 Ambient Clinical Intelligence Modules
import { ACIAmbientScribe } from './pages/ACI/ACIAmbientScribe';
import { HospitalCommandCenter } from './pages/CommandCenter/HospitalCommandCenter';
import { DigitalTwinTimeline } from './pages/DigitalTwin/DigitalTwinTimeline';
import { PredictiveRiskAnalytics } from './pages/Predictive/PredictiveRiskAnalytics';
import { WoundHealingTracker } from './pages/Vision/WoundHealingTracker';
import { SmartORSuite } from './pages/SmartOR/SmartORSuite';
import { AIProductivityAnalytics } from './pages/Analytics/AIProductivityAnalytics';

const DynamicDashboardSwitch: React.FC = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  switch (user.role) {
    case 'ADMIN':
      return <AdminDashboard />;
    case 'DOCTOR':
      return <DoctorDashboard />;
    case 'RECEPTIONIST':
      return <ReceptionDashboard />;
    case 'NURSE':
      return <NurseDashboard />;
    case 'LAB_TECH':
      return <LabDashboard />;
    case 'PHARMACIST':
      return <PharmacyDashboard />;
    case 'PATIENT':
      return <PatientPortal />;
    default:
      return <AdminDashboard />;
  }
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <DashboardLayout>{children}</DashboardLayout>;
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DynamicDashboardSwitch />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patients"
              element={
                <ProtectedRoute>
                  <PatientList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/appointments"
              element={
                <ProtectedRoute>
                  <AppointmentManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/queue"
              element={
                <ProtectedRoute>
                  <DoctorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wards"
              element={
                <ProtectedRoute>
                  <BedManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pharmacy"
              element={
                <ProtectedRoute>
                  <PharmacyDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/lab"
              element={
                <ProtectedRoute>
                  <LabDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/billing"
              element={
                <ProtectedRoute>
                  <BillingManager />
                </ProtectedRoute>
              }
            />

            {/* Phase 2 Routes */}
            <Route
              path="/telemedicine"
              element={
                <ProtectedRoute>
                  <TelemedicineRoom />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recovery"
              element={
                <ProtectedRoute>
                  <RecoveryDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ai-assistant"
              element={
                <ProtectedRoute>
                  <AIChatBot />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <SecureMessaging />
                </ProtectedRoute>
              }
            />
            <Route
              path="/caregiver"
              element={
                <ProtectedRoute>
                  <CaregiverPortal />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wearables"
              element={
                <ProtectedRoute>
                  <HealthHub />
                </ProtectedRoute>
              }
            />
            <Route
              path="/forms"
              element={
                <ProtectedRoute>
                  <FormIntake />
                </ProtectedRoute>
              }
            />
            <Route
              path="/education"
              element={
                <ProtectedRoute>
                  <EducationHub />
                </ProtectedRoute>
              }
            />

            {/* Phase 3 ACI Routes */}
            <Route
              path="/aci"
              element={
                <ProtectedRoute>
                  <ACIAmbientScribe />
                </ProtectedRoute>
              }
            />
            <Route
              path="/command-center"
              element={
                <ProtectedRoute>
                  <HospitalCommandCenter />
                </ProtectedRoute>
              }
            />
            <Route
              path="/digital-twin"
              element={
                <ProtectedRoute>
                  <DigitalTwinTimeline />
                </ProtectedRoute>
              }
            />
            <Route
              path="/predictive"
              element={
                <ProtectedRoute>
                  <PredictiveRiskAnalytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vision"
              element={
                <ProtectedRoute>
                  <WoundHealingTracker />
                </ProtectedRoute>
              }
            />
            <Route
              path="/smart-or"
              element={
                <ProtectedRoute>
                  <SmartORSuite />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ai-analytics"
              element={
                <ProtectedRoute>
                  <AIProductivityAnalytics />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <HospitalSettings />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
