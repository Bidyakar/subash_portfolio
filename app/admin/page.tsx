'use client';

import React, { useFormState, useFormStatus } from 'react-dom';
import { login } from '@/app/actions';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const LoginButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button className="w-full bg-[#FF4D00] hover:bg-[#FF4D00]/90 font-bold" disabled={pending}>
            {pending ? "Logging in..." : "Login Dashboard"}
        </Button>
    );
}

const LoginPage = () => {
    const [loginState, loginDispatch] = useFormState(login, undefined);

    return (
        <main className="min-h-screen bg-[#0A192F] flex items-center justify-center p-6">
            <Card className="w-full max-w-md bg-white border-0 shadow-2xl">
                <CardHeader className="text-center space-y-4 pb-8">
                    <CardTitle className="text-3xl font-black italic font-playfair">
                        Admin<span className="text-[#FF4D00]">.</span>
                    </CardTitle>
                    <CardDescription className="text-xs font-bold uppercase tracking-widest text-[#0A192F]/60">
                        Secure Access Portal
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <form action={loginDispatch} className="space-y-4">
                        {loginState?.error && (
                            <div className="bg-destructive/10 text-destructive text-sm font-medium p-3 rounded-md text-center">
                                {loginState.error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="username">Email / Username</Label>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="admin@example.com"
                                required
                                className="bg-slate-50"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                className="bg-slate-50"
                            />
                        </div>

                        <LoginButton />
                    </form>
                </CardContent>
                <CardFooter className="justify-center">
                    <p className="text-[10px] text-muted-foreground">
                        Restricted area. Authorized personnel only.
                    </p>
                </CardFooter>
            </Card>
        </main>
    );
};

export default LoginPage;