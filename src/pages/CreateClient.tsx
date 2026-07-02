import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { uploadLogo } from '../api/upload'

function CreateClient() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [ruc, setRuc] = useState('')
    const [logo, setLogo] = useState<File | null>(null)
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            let logoUrl = ''
            if (logo) {
                logoUrl = await uploadLogo(logo)
            }

            await axios.post(
                'http://localhost:3000/api/client',
                {
                    name,
                    email,
                    phone,
                    ruc,
                    logo_url: logoUrl
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            navigate('/dashboard')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-8 w-full max-w-lg">
                <Link
                    to="/dashboard"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                    ← Clientes
                </Link>

                <h1 className="mt-4 text-2xl font-bold tracking-tight text-white">Nuevo cliente</h1>
                <p className="mt-1 text-sm text-gray-400">Completa los datos del cliente</p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="flex flex-col items-center gap-2">
                        <label className="flex flex-col items-center gap-2 cursor-pointer">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-gray-600 text-gray-400 overflow-hidden">
                                {logo ? (
                                    <img
                                        src={URL.createObjectURL(logo)}
                                        alt="Logo preview"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="17 8 12 3 7 8" />
                                        <line x1="12" x2="12" y1="3" y2="15" />
                                    </svg>
                                )}
                            </div>
                            <span className="text-sm text-gray-400">Subir logo</span>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => setLogo(e.target.files?.[0] ?? null)}
                            />
                        </label>
                    </div>

                    <div>
                        <label className="text-sm text-gray-400 block mb-1">Nombre del cliente</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Empresa S.A."
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-400 block mb-1">Correo electrónico</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="contacto@empresa.com"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-400 block mb-1">Teléfono</label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="6000-0000"
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-400 block mb-1">RUC</label>
                            <input
                                type="text"
                                value={ruc}
                                onChange={(e) => setRuc(e.target.value)}
                                placeholder="123-456-789"
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
                    >
                        Guardar cliente
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateClient
