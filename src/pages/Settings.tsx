import { useState, useEffect, useRef } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import { User, Mail, Phone, Shield, Save, CheckCircle2, Upload, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export default function Settings() {
    const { user } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [isSaved, setIsSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (user) {
            setEmail(user.email || '');
            fetchProfile();
        }
    }, [user]);

    const fetchProfile = async () => {
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
    };

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
        <div className="pt-4 md:pt-8 px-4 md:px-8 max-w-[1600px] mx-auto min-h-screen pb-32 md:pb-12 pt-safe">
            <DashboardHeader title="Configurações e Perfil" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                {/* Lateral Navigation */}
                <div className="lg:col-span-1 space-y-2">
                    <button className="w-full text-left px-6 py-4 rounded-2xl bg-primary-purple/20 text-primary-purple font-semibold border border-primary-purple/30 group transition-all">
                        <div className="flex items-center gap-3">
                            <User className="w-5 h-5" />
                            <span>Perfil Pessoal</span>
                        </div>
                    </button>
                    <button className="w-full text-left px-6 py-4 rounded-2xl hover:bg-white/5 text-text-secondary hover:text-white font-medium border border-transparent hover:border-white/5 transition-all">
                        <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5" />
                            <span>Segurança</span>
                        </div>
                    </button>
                </div>

                {/* Main Form Area */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleSave} className="bg-[#131128] rounded-[40px] p-8 md:p-12 border border-white/5 relative overflow-hidden">
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
                </div>
            </div>
        </div>
    );
}

