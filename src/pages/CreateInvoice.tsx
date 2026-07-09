import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

type Client = {
    id: number
    name: string
}

function CreateInvoice() {
    const [clients, setClients] = useState<Client[]>([])
    const [clientId, setClientId] = useState('')
    const [issueDate, setIssueDate] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [subtotal, setSubtotal] = useState('')
    const [notes, setNotes] = useState('')
    const navigate = useNavigate()

    const subtotalNumber = parseFloat(subtotal) || 0
    const itbms = subtotalNumber * 0.07
    const total = subtotalNumber + itbms

    const formatMoney = (value: number) =>
        `$${value.toFixed(2)}`

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/client', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setClients(response.data.data ?? [])
            } catch (error) {
                console.error(error)
            }
        }

        fetchClients()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await axios.post(
                'http://localhost:3000/api/invoices',
                {
                    client_id: Number(clientId),
                    issue_date: issueDate,
                    due_date: dueDate,
                    subtotal: subtotalNumber,
                    notes: notes || undefined
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
                    ← Facturas
                </Link>

                <h1 className="mt-4 text-2xl font-bold tracking-tight text-white">Nueva factura</h1>
                <p className="mt-1 text-sm text-gray-400">Completa los datos de la factura</p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div>
                        <label className="text-sm text-gray-400 block mb-1">Cliente</label>
                        <select
                            value={clientId}
                            onChange={(e) => setClientId(e.target.value)}
                            required
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
                        >
                            <option value="" disabled>
                                Selecciona un cliente
                            </option>
                            {clients.map((client) => (
                                <option key={client.id} value={client.id}>
                                    {client.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-400 block mb-1">Fecha de emisión</label>
                            <input
                                type="date"
                                value={issueDate}
                                onChange={(e) => setIssueDate(e.target.value)}
                                required
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-400 block mb-1">Fecha de vencimiento</label>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                required
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm text-gray-400 block mb-1">Subtotal</label>
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={subtotal}
                            onChange={(e) => setSubtotal(e.target.value)}
                            placeholder="0.00"
                            required
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        />
                    </div>

                    <div className="rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-3 space-y-3">
                        <div className="flex items-center justify-between text-sm text-gray-400">
                            <span>ITBMS (7%)</span>
                            <span>{formatMoney(itbms)}</span>
                        </div>
                        <div className="border-t border-gray-700" />
                        <div className="flex items-center justify-between text-sm font-semibold text-white">
                            <span>Total</span>
                            <span>{formatMoney(total)}</span>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm text-gray-400 block mb-1">Notas — opcional</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Servicios de diseño gráfico..."
                            rows={3}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
                    >
                        Crear factura
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateInvoice
