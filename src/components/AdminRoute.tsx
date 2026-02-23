import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AdminRoute() {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkAdmin() {
            try {
                const { data: { session } } = await supabase.auth.getSession();

                if (!session) {
                    setIsAdmin(false);
                    setLoading(false);
                    return;
                }

                // Query the profiles table for the role
                const { data: profile, error } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', session.user.id)
                    .single();

                if (error || !profile) {
                    setIsAdmin(false);
                } else {
                    setIsAdmin(profile.role === 'admin');
                }
            } catch {
                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        }

        checkAdmin();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg-deep">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-purple"></div>
            </div>
        );
    }

    if (!isAdmin) {
        // If user is logged in but not admin, maybe send to dashboard? Handled by redirect.
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}
