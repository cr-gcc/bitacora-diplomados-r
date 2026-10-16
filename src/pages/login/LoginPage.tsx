import banner from "@/assets/images/banners/fondo.jpg"
import logo from "@/assets/images/logos/cedigec_w_t.png"
import { LoginForm } from "@pages/login/components/LoginForm"

export default function LoginPage() {
    return (
        <div className="bg-cover bg-no-repeat bg-center h-screen w-screen relative"
            style={{ backgroundImage: `url(${banner})` }}>
            <div className="flex h-full">
                <div className="grid grid-cols-2 w-full overflow-hidden">
                    <div className="bg-gradient-to-br from-[#172b4d]/55 via-[#172b4d]/70 to-[#0a1526]/80">
                        <div className="flex flex-col justify-between h-full p-4 lg:p-8">
                            <div>
                                <img className="w-28 lg:w-48" src={logo} alt="CEDIGEC" />
                            </div>
                            <div>
                                <div className="text-4xl lg:text-5xl font-black leading-tight text-white drop-shadow-lg">
                                    Bitácora<br />Diplomados
                                </div>
                                <p className="mt-4 text-slate-100 text-base drop-shadow-md">
                                    Control interno y reportería académica
                                </p>
                                <div className="h-1 w-28 bg-gold rounded mt-7 shadow-md"></div>
                            </div>
                            <div className="text-slate-200 text-sm font-semibold tracking-wide drop-shadow-md">
                                UNAM · FCA
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center p-6 sm:p-10">
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    )
}