import React, { useState, useEffect } from 'react';
import { Professor } from '../../types';
import { getProfessors } from '../../api';

interface CardManagementScreenProps {
    onBack: () => void;
}

const CardManagementScreen: React.FC<CardManagementScreenProps> = ({ onBack }) => {
    const [professors, setProfessors] = useState<Professor[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getProfessors().then(data => {
            setProfessors(data);
            setIsLoading(false);
        });
    }, []);

    const handleEdit = (profName: string) => alert(`Editando ${profName}`);
    const handleDelete = (profName: string) => {
        if(confirm(`¿Eliminar la carta de ${profName}?`)) {
            alert(`${profName} eliminada.`);
        }
    }

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
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Gestión de Cartas de Maestros</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Edita, reemplaza o elimina las cartas de profesores que ven los estudiantes.</p>
            </div>
            
            {isLoading ? (
                 <div className="text-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500 mx-auto"></div>
                    <p className="mt-2 text-slate-500">Cargando cartas...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {professors.map((prof, index) => (
                        <div 
                            key={prof.id} 
                            className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden group transition-all hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 animate-stagger"
                            style={{ '--stagger-delay': `${200 + index * 100}ms` } as React.CSSProperties}
                        >
                            <div className="relative">
                                <img src={prof.imageUrl} alt={prof.name} className="h-48 w-full object-cover" />
                                {prof.locked && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        {/* FIX: Changed 'className' to 'class' for web component compatibility. */}
                                        <ion-icon name="lock-closed" class="text-white text-3xl"></ion-icon>
                                        <span className="ml-2 text-white font-semibold">Bloqueada</span>
                                    </div>
                                )}
                            </div>

                            <div className="p-4">
                                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">{prof.name}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{prof.title}</p>
                            </div>
                            <div className="p-3 border-t border-slate-100 dark:border-slate-700 flex justify-end space-x-2 bg-slate-50/70 dark:bg-slate-900/40">
                                <button onClick={() => handleEdit(prof.name)} className="px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-100 dark:text-indigo-300 dark:bg-indigo-500/20 rounded-md hover:bg-indigo-200 dark:hover:bg-indigo-500/40 transition-colors flex items-center space-x-1">
                                    {/* FIX: Changed 'className' to 'class' for web component compatibility. */}
                                    <ion-icon name="create-outline"></ion-icon>
                                    <span>Editar</span>
                                </button>
                                <button onClick={() => handleDelete(prof.name)} className="px-3 py-1.5 text-xs font-semibold text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-500/20 rounded-md hover:bg-red-200 dark:hover:bg-red-500/40 transition-colors flex items-center space-x-1">
                                    {/* FIX: Changed 'className' to 'class' for web component compatibility. */}
                                    <ion-icon name="trash-outline"></ion-icon>
                                    <span>Eliminar</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CardManagementScreen;