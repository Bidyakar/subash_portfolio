'use client';

import React, { useFormState, useFormStatus } from 'react-dom';
import { login } from '@/app/actions';

const LoginButton = () => {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            aria-disabled={pending}
            disabled={pending}
            className="w-full py-5 bg-[#FF4D00] text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-[#0A192F] transition-all shadow-lg shadow-[#FF4D00]/20 mt-4 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
            {pending ? (
                <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>LOGGING IN...</span>
                </>
            ) : (
                "LOGIN DASHBOARD"
            )}
        </button>
    );
}

const LoginPage = () => {
    const [state, dispatch] = useFormState(login, undefined);

    return (
        <main className="min-h-screen bg-[#0A192F] flex items-center justify-center p-6">
            <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full">
                <div className="text-center mb-10">
                    <h1 className="font-playfair font-black text-3xl italic mb-2">
                        Admin<span className="text-[#FF4D00]">.</span>
                    </h1>
                    <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Secure Access</p>
                </div>

                <form action={dispatch} className="space-y-6">
                    {state?.error && (
                        <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-bold text-center border border-red-100">
                            {state.error}
                        </div>
                    )}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-tighter">Username</label>
                        <input
                            name="username"
                            type="text"
                            required
                            className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#FF4D00]/10 border border-transparent focus:border-[#FF4D00]/20 transition-all font-bold text-[#0A192F]"
                            placeholder="Enter username"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-tighter">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#FF4D00]/10 border border-transparent focus:border-[#FF4D00]/20 transition-all font-bold text-[#0A192F]"
                            placeholder="••••••••"
                        />
                    </div>

                    <LoginButton />

                    <p className="text-center text-xs text-gray-300 mt-6">
                        Restricted area. Authorized personnel only.
                    </p>
                </form>
            </div>
        </main>
    );
};

export default LoginPage;