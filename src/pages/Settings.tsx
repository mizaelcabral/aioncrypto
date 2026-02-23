import { useState, useEffect, useRef, useCallback } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import { User, Mail, Phone, Shield, Save, CheckCircle2, Upload, Loader2, Smartphone, KeyRound, AlertTriangle, ShieldAlert } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export default function Settings() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [isSaved, setIsSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const fetchProfile = useCallback(async () => {
        if (!user) return;
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('full_name, avatar_url, phone')
                .eq('id', user.id)
                .single();

            if (error) throw error;
            if (data) {
                setName(data.full_name || '');
                setPhone(data.phone || '');
                setAvatarUrl(data.avatar_url || null);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            setEmail(user.email || '');
            fetchProfile();
        }
    }, [user, fetchProfile]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsSaving(true);
        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    full_name: name,
                    phone: phone,
                })
                .eq('id', user.id);

            if (error) throw error;

            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 3000);
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile.');
        } finally {
            setIsSaving(false);
        }
    };

    const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setIsUploading(true);
            if (!event.target.files || event.target.files.length === 0) {
                return;
            }
            if (!user) return;

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${user.id}-${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            // Upload image
            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            // Get public url
            const { data } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);

            const newAvatarUrl = data.publicUrl;

            // Update profile record with new url
            const { error: updateError } = await supabase
                .from('profiles')
                .update({ avatar_url: newAvatarUrl })
                .eq('id', user.id);

            if (updateError) {
                throw updateError;
            }

            setAvatarUrl(newAvatarUrl);
        } catch (error) {
            console.error('Error uploading avatar:', error);
            alert('Error uploading avatar!');
        } finally {
            setIsUploading(false);
        }
    };

    const getInitials = (nameStr: string) => {
        return nameStr ? nameStr.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'US';
    };

    return (
        <div className="pt-4 md:pt-8 px-4 md:px-8 max-w-[1600px] mx-auto min-h-screen pb-32 md:pb-12 pt-safe w-full">
            <DashboardHeader title="Configurações e Perfil" />

            <div className="flex flex-col lg:flex-row gap-8 mt-8 w-full">
                {/* Lateral Navigation */}
                <div className="w-full lg:w-72 shrink-0 space-y-2">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`w-full text-left px-6 py-4 rounded-2xl font-semibold border transition-all ${activeTab === 'profile' ? 'bg-primary-purple/20 text-primary-purple border-primary-purple/30' : 'hover:bg-white/5 text-text-secondary hover:text-white border-transparent hover:border-white/5'}`}
                    >
                        <div className="flex items-center gap-3">
                            <User className="w-5 h-5" />
                            <span>Perfil Pessoal</span>
                        </div>
                    </button>
                    <button
                        onClick={() => setActiveTab('security')}
                        className={`w-full text-left px-6 py-4 rounded-2xl font-semibold border transition-all ${activeTab === 'security' ? 'bg-primary-purple/20 text-primary-purple border-primary-purple/30' : 'hover:bg-white/5 text-text-secondary hover:text-white border-transparent hover:border-white/5'}`}
                    >
                        <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5" />
                            <span>Segurança</span>
                        </div>
                    </button>

                    {/* Creative Security Banner (PRO MAX Glassmorphism) */}
                    <div className="hidden lg:flex mt-8 bg-gradient-to-br from-[#1a1736] to-[#131128] border border-white/10 rounded-[32px] p-6 relative overflow-hidden group shadow-2xl flex-col gap-4">
                        {/* Dramatic Glow Effects */}
                        <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-primary-purple/30 blur-[50px] rounded-full pointer-events-none group-hover:bg-primary-purple/40 group-hover:blur-[60px] transition-all duration-700" />
                        <div className="absolute bottom-[-20px] left-[-20px] w-24 h-24 bg-pink-500/20 blur-[40px] rounded-full pointer-events-none transition-all duration-700 group-hover:bg-pink-500/30" />

                        {/* Glass Overlay */}
                        <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-3xl pointer-events-none" />

                        <div className="relative z-10 flex flex-col gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary-purple/20 to-pink-500/20 border border-white/10 flex items-center justify-center text-white shadow-[0_0_20px_rgba(102,57,228,0.3)]">
                                <ShieldAlert className="w-6 h-6 animate-pulse" />
                            </div>

                            <div>
                                <h4 className="text-white font-bold text-lg mb-1 tracking-tight">Proteção PRO MAX</h4>
                                <p className="text-xs text-text-secondary leading-relaxed">
                                    A segurança do seu patrimônio é nossa prioridade. Ative a autenticação de dois fatores (2FA) para garantir blindagem total contra intrusos.
                                </p>
                            </div>

                            <button
                                onClick={() => setActiveTab('security')}
                                className="w-full mt-2 bg-gradient-to-r from-primary-purple to-[#7b4dff] hover:opacity-90 text-white text-sm font-bold py-3 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(102,57,228,0.39)] flex items-center justify-center gap-2"
                            >
                                Configurar Segurança
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 min-w-0">
                    {activeTab === 'profile' ? (
                        <form onSubmit={handleSave} className="bg-[#131128] rounded-[32px] md:rounded-[40px] p-5 md:p-8 lg:p-12 border border-white/5 relative overflow-hidden">
                            {/* Decorative Background */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-purple/10 blur-[100px] rounded-full pointer-events-none" />

                            <div className="relative z-10">
                                <h2 className="text-2xl font-bold text-white mb-2">Informações Pessoais</h2>
                                <p className="text-text-secondary mb-8">Atualize suas informações de perfil e como os outros veem você na plataforma.</p>

                                {/* Avatar Section */}
                                <div className="flex items-center gap-6 mb-10">
                                    <div className="relative group cursor-pointer w-24 h-24 rounded-full" onClick={() => fileInputRef.current?.click()}>
                                        {avatarUrl ? (
                                            <img
                                                src={avatarUrl}
                                                alt="Profile"
                                                className="w-24 h-24 rounded-full object-cover shadow-[0_0_20px_rgba(102,57,228,0.4)]"
                                                key={avatarUrl}
                                            />
                                        ) : (
                                            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary-purple to-pink-500 flex items-center justify-center text-3xl font-bold text-white shadow-[0_0_20px_rgba(102,57,228,0.4)]">
                                                {getInitials(name)}
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            {isUploading ? <Loader2 className="w-6 h-6 animate-spin text-white" /> : <Upload className="w-6 h-6 text-white" />}
                                        </div>
                                        <input
                                            type="file"
                                            id="single"
                                            accept="image/*"
                                            onChange={uploadAvatar}
                                            disabled={isUploading}
                                            ref={fileInputRef}
                                            className="hidden"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled={isUploading}
                                            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
                                        >
                                            {isUploading ? 'Enviando...' : 'Alterar Avatar'}
                                        </button>
                                        <p className="text-xs text-text-secondary">JPG, GIF ou PNG. Max de 10MB.</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {/* Name Input */}
                                    <div>
                                        <label className="block text-sm font-medium text-text-secondary mb-2">Nome Completo</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <User className="h-5 w-5 text-text-secondary" />
                                            </div>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full bg-[rgba(40,36,84,0.4)] border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary-purple focus:ring-1 focus:ring-primary-purple transition-all"
                                                placeholder="Seu nome"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Email Input */}
                                    <div>
                                        <label className="block text-sm font-medium text-text-secondary mb-2">Endereço de E-mail</label>
                                        <div className="relative opacity-60 cursor-not-allowed">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Mail className="h-5 w-5 text-text-secondary" />
                                            </div>
                                            <input
                                                type="email"
                                                value={email}
                                                readOnly
                                                className="w-full bg-[rgba(40,36,84,0.4)] border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white cursor-not-allowed"
                                            />
                                        </div>
                                        <p className="text-xs text-text-secondary mt-1 ml-1">Para alterar o seu e-mail, entre em contato com o suporte.</p>
                                    </div>

                                    {/* Phone Input */}
                                    <div>
                                        <label className="block text-sm font-medium text-text-secondary mb-2">Telefone</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Phone className="h-5 w-5 text-text-secondary" />
                                            </div>
                                            <input
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="w-full bg-[rgba(40,36,84,0.4)] border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary-purple focus:ring-1 focus:ring-primary-purple transition-all"
                                                placeholder="+55 (11) 90000-0000"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 pt-8 border-t border-white/10 flex items-center gap-4">
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="bg-primary-purple hover:bg-[#7b4dff] text-white px-8 py-3 rounded-xl font-bold transition-all shadow-[0_4px_14px_0_rgba(102,57,228,0.39)] flex items-center gap-2 active:scale-95 disabled:opacity-50"
                                    >
                                        {isSaving ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <Save className="w-5 h-5" />
                                        )}
                                        Salvar Alterações
                                    </button>

                                    {isSaved && (
                                        <div className="flex items-center gap-2 text-green-400 animate-in fade-in slide-in-from-left-4 duration-300">
                                            <CheckCircle2 className="w-5 h-5" />
                                            <span className="text-sm font-medium">Perfil atualizado com sucesso!</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </form>
                    ) : (
                        <div className="bg-[#131128] rounded-[32px] md:rounded-[40px] p-5 md:p-8 lg:p-12 border border-white/5 relative overflow-hidden min-h-[500px]">
                            {/* Decorative Background */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 blur-[100px] rounded-full pointer-events-none" />

                            <div className="relative z-10">
                                <h2 className="text-2xl font-bold text-white mb-2">Segurança da Conta</h2>
                                <p className="text-text-secondary mb-8">Gerencie suas opções de segurança e proteja sua conta com autenticação de dois fatores (2FA).</p>

                                {/* 2FA Options */}
                                <div className="space-y-6">
                                    {/* Email 2FA */}
                                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 hover:bg-white/[0.07] transition-colors">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-primary-purple/20 text-primary-purple flex items-center justify-center shrink-0">
                                                <Mail className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-white mb-1">Código por E-mail</h3>
                                                <p className="text-sm text-text-secondary mb-2">Receba um código numérico no seu e-mail registrado a cada login.</p>
                                                <div className="flex items-center gap-2 text-xs font-medium text-green-400 bg-green-400/10 px-3 py-1 rounded-full w-max">
                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                    Ativo
                                                </div>
                                            </div>
                                        </div>

                                        <div className="shrink-0 cursor-pointer">
                                            {/* Mock Toggle - Active State */}
                                            <div className="w-14 h-8 bg-primary-purple rounded-full p-1 relative flex items-center shadow-[0_0_15px_rgba(102,57,228,0.5)] transition-all">
                                                <div className="w-6 h-6 bg-white rounded-full absolute right-1 shadow-md"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Google Authenticator */}
                                    <div className="bg-[#1a1736] border border-white/10 rounded-3xl p-6 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 hover:border-white/20 transition-all">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 text-white flex items-center justify-center shrink-0 border border-white/10">
                                                <Smartphone className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h3 className="text-lg font-bold text-white">Google Authenticator / Authy</h3>
                                                    <span className="text-[10px] uppercase font-bold tracking-wider bg-white/10 text-white px-2 py-0.5 rounded-full">Recomendado</span>
                                                </div>
                                                <p className="text-sm text-text-secondary mb-2">Use um aplicativo de autenticação de terceiros para gerar códigos temporários super seguros.</p>
                                                <div className="flex items-center gap-2 text-xs font-medium text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full w-max">
                                                    <AlertTriangle className="w-3.5 h-3.5" />
                                                    Não configurado
                                                </div>
                                            </div>
                                        </div>

                                        <button className="shrink-0 bg-white hover:bg-gray-200 text-[#0f0c29] font-bold px-6 py-3 rounded-xl transition-colors whitespace-nowrap shadow-[0_4px_14px_0_rgba(255,255,255,0.2)]">
                                            Configurar 2FA
                                        </button>
                                    </div>

                                    {/* Password Reset */}
                                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 hover:bg-white/[0.07] transition-colors mt-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 text-text-secondary flex items-center justify-center shrink-0">
                                                <KeyRound className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-white mb-1">Senha da Conta</h3>
                                                <p className="text-sm text-text-secondary">Uma senha forte e atualizada ajuda a prevenir acesso não autorizado à sua conta.</p>
                                            </div>
                                        </div>

                                        <button className="shrink-0 border border-white/20 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-xl transition-colors whitespace-nowrap">
                                            Alterar Senha
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}

