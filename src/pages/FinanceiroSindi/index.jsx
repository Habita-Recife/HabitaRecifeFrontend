import { useState, useEffect } from 'react';
import HeaderSindi from "../../components/HeaderSindi";
import SidebarSindi from "../../components/SideBarSindi";
import { Download, DollarSign, ArrowUp, ArrowDown, ChevronRight, FileText, Bell, Eye, EyeOff, Clock } from 'lucide-react';

export function FinanceiroSindi() {
    const [periodo, setPeriodo] = useState('mensal');
    const [mostrarValores, setMostrarValores] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const resumoBancario = {
        saldoAtual: 45280.50,
        receitas: 32500.00,
        despesas: 18720.75
    };

    const movimentacoes = [
        { id: 1, tipo: 'receita', descricao: 'Taxa condominial - Jan/2024', valor: 12500.00, data: '15/01/2024' },
        { id: 2, tipo: 'despesa', descricao: 'Manutenção elevador', valor: 4200.00, data: '18/01/2024' },
        { id: 3, tipo: 'receita', descricao: 'Taxa condominial - Fev/2024', valor: 12500.00, data: '15/02/2024' },
        { id: 4, tipo: 'despesa', descricao: 'Limpeza áreas comuns', valor: 2500.00, data: '20/02/2024' },
        { id: 5, tipo: 'receita', descricao: 'Multa atraso - Apto 302', valor: 750.00, data: '25/02/2024' },
        { id: 6, tipo: 'despesa', descricao: 'Manutenção piscina', valor: 3200.75, data: '28/02/2024' },
    ];

    const alertas = [
        {
            id: 1,
            title: "Pagamento em atraso - Apto 402",
            description: "O morador do apartamento 402 está com a taxa condominial em atraso desde 10/02/2024.",
            time: "2 dias atrás"
        },
        {
            id: 2,
            title: "Despesa extraordinária aprovada",
            description: "A assembléia aprovou a reforma do hall de entrada no valor de R$ 15.000,00.",
            time: "5 dias atrás"
        }
    ];

    const handleGerarRelatorio = () => {
        alert('Relatório gerado com sucesso!');
    };

    const formatarValor = (valor) => {
        if (mostrarValores) {
            return valor.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }
        return '•••••';
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <SidebarSindi />
            
            <div className="flex-1 flex flex-col overflow-hidden">
                <HeaderSindi />
                <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <div className="flex items-center gap-3">
                                    <h1 className="text-4xl sm:text-5xl font-bold text-[#008080]">
                                        Financeiro
                                    </h1>
                                    <span className="text-sm text-white bg-gradient-to-r from-[#008080] to-[#006666] px-4 py-1.5 rounded-full shadow-md">
                                        Síndico
                                    </span>
                                </div>
                                <div className="flex flex-wrap items-center gap-4 mt-4">
                                    <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                                        <Clock className="w-5 h-5 text-[#008080]" />
                                        <span className="font-medium text-gray-700">{formatTime(currentTime)}</span>
                                    </div>
                                    <button 
                                        onClick={() => setMostrarValores(!mostrarValores)}
                                        className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                                    >
                                        {mostrarValores ? (
                                            <EyeOff className="w-5 h-5 text-[#008080]" />
                                        ) : (
                                            <Eye className="w-5 h-5 text-[#008080]" />
                                        )}
                                        <span className="font-medium text-gray-700">
                                            {mostrarValores ? "Ocultar valores" : "Mostrar valores"}
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={handleGerarRelatorio}
                                    className="flex items-center gap-2 bg-gradient-to-r from-[#008080] to-[#006666] text-white px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:from-[#006666] hover:to-[#004444]"
                                >
                                    <Download size={18} />
                                    Gerar Relatório
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Saldo Atual</p>
                                        <p className="text-xl font-bold text-gray-800 truncate">
                                            {formatarValor(resumoBancario.saldoAtual)}
                                        </p>
                                    </div>
                                    <div className="bg-teal-100 p-2 rounded-lg">
                                        <DollarSign className="w-5 h-5 text-teal-600" />
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400 mt-2">Disponível</p>
                            </div>

                            <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Receitas ({periodo})</p>
                                        <p className="text-xl font-bold text-gray-800 truncate">
                                            {formatarValor(resumoBancario.receitas)}
                                        </p>
                                    </div>
                                    <div className="bg-green-100 p-2 rounded-lg">
                                        <ArrowUp className="w-5 h-5 text-green-600" />
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400 mt-2">Total arrecadado</p>
                            </div>

                            <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Despesas ({periodo})</p>
                                        <p className="text-xl font-bold text-gray-800 truncate">
                                            {formatarValor(resumoBancario.despesas)}
                                        </p>
                                    </div>
                                    <div className="bg-red-100 p-2 rounded-lg">
                                        <ArrowDown className="w-5 h-5 text-red-600" />
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400 mt-2">Total gasto</p>
                            </div>

                            <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Relatórios</p>
                                        <p className="text-xl font-bold text-gray-800">12</p>
                                    </div>
                                    <div className="bg-purple-100 p-2 rounded-lg">
                                        <FileText className="w-5 h-5 text-purple-600" />
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400 mt-2">Gerados</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-800 mb-3">Filtrar por período</h2>
                            <div className="flex flex-wrap gap-2">
                                <button 
                                    onClick={() => setPeriodo('mensal')} 
                                    className={`px-3 py-1.5 text-sm rounded-lg ${periodo === 'mensal' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                >
                                    Mensal
                                </button>
                                <button 
                                    onClick={() => setPeriodo('trimestral')} 
                                    className={`px-3 py-1.5 text-sm rounded-lg ${periodo === 'trimestral' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                >
                                    Trimestral
                                </button>
                                <button 
                                    onClick={() => setPeriodo('anual')} 
                                    className={`px-3 py-1.5 text-sm rounded-lg ${periodo === 'anual' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                >
                                    Anual
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold text-gray-800">Últimas Movimentações</h2>
                                <button className="text-sm text-teal-600 hover:text-teal-800 flex items-center gap-1">
                                    Ver todas <ChevronRight size={16} />
                                </button>
                            </div>
                            <div className="space-y-3">
                                {movimentacoes.slice(0, 5).map((mov) => (
                                    <div key={mov.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-full ${mov.tipo === 'receita' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                {mov.tipo === 'receita' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800">{mov.descricao}</p>
                                                <p className="text-xs text-gray-500">{mov.data}</p>
                                            </div>
                                        </div>
                                        <p className={`font-semibold ${mov.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}`}>
                                            {mov.tipo === 'receita' ? '+' : '-'} 
                                            {mostrarValores ? 
                                                mov.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) :
                                                '•••••'
                                            }
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-100">
                            <div className="p-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-800">Histórico Completo</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Descrição</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {movimentacoes.map((mov) => (
                                            <tr key={mov.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{mov.data}</td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">{mov.descricao}</td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${mov.tipo === 'receita' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                        {mov.tipo === 'receita' ? 'Receita' : 'Despesa'}
                                                    </span>
                                                </td>
                                                <td className={`px-4 py-3 whitespace-nowrap text-sm font-medium ${mov.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}`}>
                                                    {mostrarValores ? 
                                                        mov.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) :
                                                        '•••••'
                                                    }
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}