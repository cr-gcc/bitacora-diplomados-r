import { LogIn } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useLoginForm } from "@pages/login/hooks/useLoginForm";
import { ProgressBar } from '@components/layouts/components/loading/ProgressBar';

export function LoginForm() {
    const {
        values,
        errors,
        generalError,
        loading,
        setField,
        handleLogin
    } = useLoginForm();

    return (
        <Card className="w-full max-w-sm">
            <form onSubmit={handleLogin} >
                <CardHeader>
                    <CardDescription className='text-sm'>
                        <span className='text-gold font-bold uppercase'>Bienvenido</span>
                    </CardDescription>
                    <CardTitle className='text-sky-900 text-3xl font-bold'>
                        Inicia sesión
                    </CardTitle>
                    <CardDescription className='text-xs'>
                        <span className='text-slate-500'>
                            Accede al control académico interno
                        </span>
                    </CardDescription>
                </CardHeader>
                <CardContent className="mb-4">
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-x-2 gap-y-1">
                            <Label htmlFor="email" className='text-xs'>Email</Label>
                            <Input
                                id="email"
                                type="email"
                                className='text-xs focus-visible:border-gold focus-visible:ring-gold/50'
                                placeholder="Email"
                                value={values.email}
                                onChange={(e) => setField("email", e.target.value)}
                                aria-invalid={!!errors.email}
                                aria-describedby={
                                    errors.email ? "email-error" : undefined
                                }
                            />
                            {
                                errors.email && (
                                    <p id="email-error" className="text-red-500 text-xs font-semibold">
                                        {errors.email}
                                    </p>
                                )
                            }
                        </div>
                        <div className="grid gap-x-2 gap-y-1">
                            <div className="flex items-center">
                                <Label htmlFor="password" className='text-xs'>Contraseña</Label>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                className='text-xs focus-visible:border-gold focus-visible:ring-gold/50'
                                placeholder="Contraseña"
                                value={values.password}
                                onChange={(e) => setField("password", e.target.value)}
                                aria-invalid={!!errors.password}
                                aria-describedby={
                                    errors.password ? "password-error" : undefined
                                }
                            />
                            {
                                errors.password && (
                                    <p id="password-error" className="text-red-500 text-xs font-semibold">
                                        {errors.password}
                                    </p>
                                )
                            }
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button
                        type="submit"
                        className="w-full bg-gold cursor-pointer flex items-center gap-2 hover:bg-gold/80 transition-colors duration-200"
                        disabled={loading}
                        aria-label="Entrar"
                    >
                        <span>Entrar</span><LogIn />
                    </Button>
                    {loading && <ProgressBar />}
                    {
                        generalError && <p className="text-red-500 text-xs font-semibold">{generalError}</p>
                    }
                </CardFooter>
            </form>
        </Card>
    )
}
