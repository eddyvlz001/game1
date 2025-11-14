import React, { useState, useEffect, useRef } from 'react';
import { AdminScreen, User, Screen, TeacherScreen, CustomModule } from '../../types';
import DashboardAdminScreen from './DashboardAdminScreen';
import UserManagementScreen from './UserManagementScreen';
import CardManagementScreen from './CardManagementScreen';
import AdminQuestionBankScreen from './AdminQuestionBankScreen';
import AdminBottomNav from './AdminBottomNav';
import ModuleManagementScreen from './ModuleManagementScreen';
import ModuleCreatorScreen from './ModuleCreatorScreen';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
  enabledModules: Set<Screen | TeacherScreen | string>;
  setEnabledModules: React.Dispatch<React.SetStateAction<Set<Screen | TeacherScreen | string>>>;
  customModules: CustomModule[];
  setCustomModules: React.Dispatch<React.SetStateAction<CustomModule[]>>;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout, enabledModules, setEnabledModules, customModules, setCustomModules, theme, onToggleTheme }) => {
  const [activeScreen, setActiveScreen] = useState<AdminScreen>(AdminScreen.Dashboard);

  const getScreenTitle = () => {
    switch (activeScreen) {
        case AdminScreen.Dashboard: return 'Panel de Control';
        case AdminScreen.Users: return 'Gestión de Usuarios';
        case AdminScreen.Cards: return 'Gestión de Cartas';
        case AdminScreen.Questions: return 'Banco de Preguntas';
        case AdminScreen.Modules: return 'Gestión de Módulos';
        case AdminScreen.ModuleCreator: return 'Creador de Módulos';
        default: return 'Admin Panel';
    }
  }

  const renderContent = () => {
    let content;
    const handleBackToDashboard = () => setActiveScreen(AdminScreen.Dashboard);
    const handleBackToModules = () => setActiveScreen(AdminScreen.Modules);

    switch (activeScreen) {
      case AdminScreen.Dashboard:
        content = <DashboardAdminScreen setActiveScreen={setActiveScreen} />;
        break;
      case AdminScreen.Users:
        content = <UserManagementScreen onBack={handleBackToDashboard} />;
        break;
      case AdminScreen.Cards:
        content = <CardManagementScreen onBack={handleBackToDashboard} />;
        break;
      case AdminScreen.Questions:
        content = <AdminQuestionBankScreen onBack={handleBackToDashboard} />;
        break;
      case AdminScreen.Modules:
        content = <ModuleManagementScreen 
                    enabledModules={enabledModules} 
                    setEnabledModules={setEnabledModules} 
                    customModules={customModules}
                    setActiveScreen={setActiveScreen}
                    onBack={handleBackToDashboard}
                />;
        break;
      case AdminScreen.ModuleCreator:
        content = <ModuleCreatorScreen 
                    onModuleCreate={(newModule) => {
                        setCustomModules(prev => [...prev, newModule]);
                        // Also enable the new module by default
                        setEnabledModules(prev => new Set(prev).add(newModule.id));
                        setActiveScreen(AdminScreen.Modules);
                    }}
                    onBack={handleBackToModules}
                />;
        break;
      default:
        content = <DashboardAdminScreen setActiveScreen={setActiveScreen} />;
        break;
    }
    return <div key={activeScreen}>{content}</div>;
  };

  return (
    <div className="flex flex-col h-full bg-slate-100 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 p-4 flex justify-between items-center flex-shrink-0">
          <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">{getScreenTitle()}</h1>
          <div className="flex items-center space-x-3">
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 hidden sm:block">{user.name}</span>
              <img src={user.imageUrl} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
              <button onClick={onToggleTheme} className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                {/* FIX: Changed 'className' to 'class' for web component compatibility. */}
                <ion-icon name={theme === 'light' ? 'moon-outline' : 'sunny-outline'} class="text-xl"></ion-icon>
            </button>
          </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow overflow-y-auto p-4 md:p-6 pb-32">
          {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <AdminBottomNav activeScreen={activeScreen} setActiveScreen={setActiveScreen} onLogout={onLogout} />
    </div>
  );
};

export default AdminDashboard;