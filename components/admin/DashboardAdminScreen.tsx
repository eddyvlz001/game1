import React from 'react';
import { AdminScreen } from '../../types';

interface DashboardAdminScreenProps {
    setActiveScreen: (screen: AdminScreen) => void;
}

const StatCard: React.FC<{ title: string; value: string; icon: string; color: string; }> = ({ title, value, icon, color }) => (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center space-x-3">
        <div className={`p-3 rounded-full ${color}`}>
            {/* FIX: Changed 'className' to 'class' for web component compatibility. */}
            <ion-icon name={icon} class="text-xl text-white"></ion-icon>
        </div>
        <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">{title}</p>
            <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{value}</p>
        </div>
    </div>
);

const ActionCard: React.FC<{ title: string; icon: string; onClick: () => void; }> = ({ title, icon, onClick }) => (
    <button 
        onClick={onClick} 
        className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-lg transition-all flex flex-col items-center justify-center text-center group"
    >
        <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 mb-2 transition-colors group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
            {/* FIX: Changed 'className' to 'class' for web component compatibility. */}
            <ion-icon name={icon} class="text-2xl"></ion-icon>
        </div>
        <p className="font-semibold text-sm text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{title}</p>
    </button>
);


const DashboardAdminScreen: React.FC<DashboardAdminScreenProps> = ({ setActiveScreen }) => {
  return (
    <div className="space-y-6">
        <div className="animate-stagger" style={{ '--stagger-delay': '100ms' } as React.CSSProperties}>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Bienvenido, Admin</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Resumen de la plataforma.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 animate-stagger" style={{ '--stagger-delay': '200ms' } as React.CSSProperties}>
            <StatCard title="Total Usuarios" value="150" icon="people-circle-outline" color="bg-sky-500" />
            <StatCard title="Batallas Activas" value="12" icon="flash-outline" color="bg-amber-500" />
            <StatCard title="Preguntas Creadas" value="230" icon="book-outline" color="bg-emerald-500" />
        </div>

        <div className="animate-stagger" style={{ '--stagger-delay': '300ms' } as React.CSSProperties}>
            <h2 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-3">Acciones Rápidas</h2>
            <div className="grid grid-cols-2 gap-4">
                <ActionCard title="Usuarios" icon="people-outline" onClick={() => setActiveScreen(AdminScreen.Users)} />
                <ActionCard title="Cartas" icon="id-card-outline" onClick={() => setActiveScreen(AdminScreen.Cards)} />
                <ActionCard title="Preguntas" icon="book-outline" onClick={() => setActiveScreen(AdminScreen.Questions)} />
                <ActionCard title="Módulos" icon="layers-outline" onClick={() => setActiveScreen(AdminScreen.Modules)} />
            </div>
        </div>
    </div>
  );
};

export default DashboardAdminScreen;