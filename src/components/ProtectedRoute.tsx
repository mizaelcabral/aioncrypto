import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute() {
    const { user, loading } = useAuth();
    const location = useLocation();

    // Enquanto está validando a sessão, não renderiza as rotas nem redireciona. 
    // Isso evita um piscar da página de login antes da sessão carregar.
    if (loading) {
        return (
            <div className="min-h-screen bg-bg-deep flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary-purple border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) {
        // Redireciona para o login e salva o estado da URL original para o usuário retornar após o login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
}
