import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../../types';
import { getAllUsers } from '../../api';

const UserCard: React.FC<{ user: User, delay: string }> = ({ user, delay }) => {
    const handleRoleChange = (userName: string) => {
        alert(`Cambiar rol para ${userName}`);
    };

    const handleDeleteUser = (userName: string) => {
        if (confirm(`¿Estás seguro de que quieres eliminar a ${userName}?`)) {
            alert(`${userName} ha sido eliminado.`);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 animate-stagger" style={{ '--stagger-delay': delay } as React.CSSProperties}>
            <div className="flex items-center space-x-4">
                <img className="h-12 w-12 rounded-full object-cover" src={user.imageUrl} alt={user.name} />
                <div className="flex-grow">
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{user.name}</p>
                    <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === UserRole.Teacher ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300' : 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300'}`}>
                        {user.role}
                    </span>
                </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-end space-x-3">
                <button onClick={() => handleRoleChange(user.name)} className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center space-x-1">
                    {/* FIX: Changed 'className' to 'class' for web component compatibility. */}
                    <ion-icon name="create-outline"></ion-icon>
                    <span>Editar Rol</span>
                </button>
                <button onClick={() => handleDeleteUser(user.name)} className="text-xs font-semibold text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 flex items-center space-x-1">
                    {/* FIX: Changed 'className' to 'class' for web component compatibility. */}
                    <ion-icon name="trash-outline"></ion-icon>
                    <span>Eliminar</span>
                </button>
            </div>
        </div>
    );
};

interface UserManagementScreenProps {
    onBack: () => void;
}

const UserManagementScreen: React.FC<UserManagementScreenProps> = ({ onBack }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAllUsers().then(data => {
            setUsers(data);
            setIsLoading(false);
        });
    }, []);

    return (
        <div className="relative space-y-6">
            <button
                onClick={onBack}
                className="absolute -top-2 -left-2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-slate-200/50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                aria-label="Regresar"
            >
                {/* FIX: Changed 'className' to 'class' for web component compatibility. */}
                <ion-icon name="arrow-back-outline" class="text-xl"></ion-icon>
            </button>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 animate-stagger" style={{ '--stagger-delay': '100ms' } as React.CSSProperties}>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Gestión de Usuarios</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Administra los roles y el acceso de los usuarios.</p>
            </div>
            
            {isLoading ? (
                <div className="text-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500 mx-auto"></div>
                    <p className="mt-2 text-slate-500">Cargando usuarios...</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {users.map((user, index) => (
                        <UserCard key={user.id} user={user} delay={`${200 + index * 50}ms`} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserManagementScreen;