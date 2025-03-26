import { useState } from 'react';
import { QrCode, Barcode, Eye } from 'lucide-react';

const ControlFinanceMorador = () => {

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);


  const charges = [
    { id: 1, type: 'Taxa Condominial', amount: 500.00, dueDate: '10/08/2025' },
    { id: 2, type: 'Conta Condominial', amount: 150.00, dueDate: '15/08/2025' },
    { id: 3, type: 'Multas', amount: 75.00, dueDate: '20/08/2025' }
  ];


  const paymentHistory = [
    {
      id: 1,
      month: 'Julho 2025',
      amount: 500.00,
      status: 'Pago',
      reference: 'REF-2025-07-001',
      details: 'Taxa condominial mensal'
    },
    {
      id: 2,
      month: 'Agosto 2025',
      amount: 500.00,
      status: 'Pendente',
      reference: 'REF-2025-08-001',
      details: 'Taxa condominial mensal',
      resident: 'João Silva',
      unit: 'Apto 302',
      block: 'Bloco B',
      phone: '(11) 98765-4321'
    }
  ];

  // o modal eh para visualizar os pagamentos pendentes
  const openModal = (payment) => {
    setSelectedPayment(payment);
    setModalOpen(true);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-[#2C3E50] mb-2">Cobranças e Pagamentos</h1>
      
      {/* um dashboard com as cobranças pendentes e tal*/}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-[#2C3E50] mb-4">Verificar Cobranças</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {charges.map((charge) => (
            <div key={charge.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <h3 className="font-medium text-[#008080]">{charge.type}</h3>
              <p className="text-2xl font-bold my-2">R$ {charge.amount.toFixed(2)}</p>
              <p className="text-sm text-gray-600">Vencimento: {charge.dueDate}</p>
            </div>
          ))}
        </div>
      </section>

      {/* esse eh o historico de pagamentos  porem nao coloquei localstorage como sempre*/}
      <section>
        <h2 className="text-xl font-semibold text-[#2C3E50] mb-4">Histórico de Pagamentos</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mês</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referência</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paymentHistory.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.month}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ {payment.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      payment.status === 'Pago' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.reference}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {payment.status === 'Pendente' && (
                      <button
                        onClick={() => openModal(payment)}
                        className="text-[#008080] hover:text-[#2C3E50] flex items-center gap-1"
                      >
                        <Eye size={16} /> Visualizar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* esse eh o modal de detalhes do pagamento */}
      {modalOpen && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#2C3E50]">Detalhes do Pagamento</h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Morador</p>
                <p className="font-medium">{selectedPayment.resident}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Unidade</p>
                <p className="font-medium">{selectedPayment.unit}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Bloco</p>
                <p className="font-medium">{selectedPayment.block}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Telefone</p>
                <p className="font-medium">{selectedPayment.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Valor</p>
                <p className="font-medium">R$ {selectedPayment.amount.toFixed(2)}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => alert('QR Code gerado!')}
                className="flex items-center gap-2 px-4 py-2 bg-[#008080] text-white rounded hover:bg-[#006666]"
              >
                <QrCode size={16} /> Gerar QR Code
              </button>
              <button
                onClick={() => alert('Boleto gerado!')}
                className="flex items-center gap-2 px-4 py-2 bg-[#2C3E50] text-white rounded hover:bg-[#1A2B3C]"
              >
                <Barcode size={16} /> Gerar Boleto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlFinanceMorador;