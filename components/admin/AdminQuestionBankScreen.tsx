import React, { useState, useEffect } from 'react';
import { Question } from '../../types';
import { getQuestionBank } from '../../api';

interface AdminQuestionBankScreenProps {
    onBack: () => void;
}

const AdminQuestionBankScreen: React.FC<AdminQuestionBankScreenProps> = ({ onBack }) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // En una app real, podría haber una api.getGlobalQuestionBank()
        getQuestionBank().then(data => {
            setQuestions(data);
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
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Banco de Preguntas Global</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Gestiona todas las preguntas de la plataforma.</p>
            </div>
            
            {isLoading ? (
                <div className="text-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500 mx-auto"></div>
                    <p className="mt-2 text-slate-500">Cargando preguntas...</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {questions.map((q, index) => (
                        <div 
                            key={q.id} 
                            className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-all hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 animate-stagger"
                            style={{ '--stagger-delay': `${200 + index * 100}ms` } as React.CSSProperties}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <p className="font-bold text-slate-800 dark:text-slate-100 flex-grow pr-4">{q.text}</p>
                                <div className="flex-shrink-0 space-x-3">
                                    <button className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-semibold flex items-center space-x-1">
                                        {/* FIX: Changed 'className' to 'class' for web component compatibility. */}
                                        <ion-icon name="create-outline"></ion-icon>
                                        <span>Editar</span>
                                    </button>
                                    <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-semibold flex items-center space-x-1">
                                        {/* FIX: Changed 'className' to 'class' for web component compatibility. */}
                                        <ion-icon name="trash-outline"></ion-icon>
                                        <span>Eliminar</span>
                                    </button>
                                </div>
                            </div>
                            <ul className="space-y-2 text-sm">
                                {q.answers.map((ans, index) => (
                                    <li key={index} className={`flex items-center space-x-3 pl-3 pr-2 py-1 rounded-md ${index === q.correctAnswerIndex ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 font-semibold' : 'bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                                        {index === q.correctAnswerIndex ? 
                                            /* FIX: Changed 'className' to 'class' for web component compatibility. */
                                            <ion-icon name="checkmark-circle" class="text-green-600 text-base"></ion-icon> :
                                            /* FIX: Changed 'className' to 'class' for web component compatibility. */
                                            <ion-icon name="ellipse-outline" class="text-slate-400 text-base"></ion-icon>
                                        }
                                        <span>{ans}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
       </div>
    );
};

export default AdminQuestionBankScreen;