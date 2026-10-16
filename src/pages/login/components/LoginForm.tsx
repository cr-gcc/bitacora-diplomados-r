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

export function LoginForm() {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardDescription className='text-sm'>
                    <span className='text-gold font-bold uppercase'>Bienvenido</span>
                </CardDescription>
                <CardTitle className='text-sky-900 text-3xl font-bold'>Inicia sesión</CardTitle>
                <CardDescription className='text-xs'>
                    <span className='text-slate-500'>Accede al control académico interno</span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email" className='text-xs'>Email</Label>
                            <Input
                                id="email"
                                type="email"
                                className='text-xs focus-visible:border-gold focus-visible:ring-gold/50'
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password" className='text-xs'>Contraseña</Label>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                className='text-xs focus-visible:border-gold focus-visible:ring-gold/50'
                                placeholder="Contraseña"
                                required
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full bg-gold cursor-pointer flex items-center gap-2 hover:bg-gold/80 transition-colors duration-200">
                    <span>Entrar</span><LogIn />
                </Button>
            </CardFooter>
        </Card>
    )
}
