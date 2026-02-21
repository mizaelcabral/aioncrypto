import { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import { User, Mail, Phone, Shield, Save, CheckCircle2 } from 'lucide-react';

export default function Settings() {
    const [name, setName] = useState('Sophie Moore');
    const [email, setEmail] = useState('sophie@example.com');
    const [phone, setPhone] = useState('+1 (555) 000-0000');
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Here we would typically send data to the backend
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    return (
        <div className="pt-8 px-8 max-w-[1600px] mx-auto min-h-screen pb-12">
            <DashboardHeader title="Configurações e Perfil" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                {/* Lateral Navigation (Mockup) */}
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
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-purple/10 blur-[100px] rounded-full" />

                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold text-white mb-2">Informações Pessoais</h2>
                            <p className="text-text-secondary mb-8">Atualize suas informações de perfil e como os outros veem você na plataforma.</p>

                            {/* Avatar Section */}
                            <div className="flex items-center gap-6 mb-10">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary-purple to-pink-500 flex items-center justify-center text-3xl font-bold text-white shadow-[0_0_20px_rgba(102,57,228,0.4)]">
                                    SM
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button type="button" className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                                        Alterar Avatar
                                    </button>
                                    <p className="text-xs text-text-secondary">JPG, GIF ou PNG. Max de 1MB.</p>
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
                                        />
                                    </div>
                                </div>

                                {/* Email Input */}
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-2">Endereço de E-mail</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-text-secondary" />
                                        </div>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-[rgba(40,36,84,0.4)] border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary-purple focus:ring-1 focus:ring-primary-purple transition-all"
                                            placeholder="seu@email.com"
                                        />
                                    </div>
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
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 pt-8 border-t border-white/10 flex items-center gap-4">
                                <button
                                    type="submit"
                                    className="bg-primary-purple hover:bg-[#7b4dff] text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary-purple/20 flex items-center gap-2 active:scale-95"
                                >
                                    <Save className="w-5 h-5" />
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
