import React, { useState } from 'react';

const ButtonReserva = () => {
  const [showReservaModal, setShowReservaModal] = useState(false);
  const [reservaData, setReservaData] = useState({
    espaco: '',
    data: '',
    horario: '',
    descricao: ''
  });

  const handleReservaSubmit = (e) => {
    e.preventDefault();
    setShowReservaModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowReservaModal(true)}
        className="py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-100"
      >
        Reserva
      </button>

      {showReservaModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#2C3E50]">Reservar Espaço</h3>
              <button
                onClick={() => setShowReservaModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleReservaSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Espaço</label>
                <select
                  value={reservaData.espaco}
                  onChange={(e) => setReservaData({ ...reservaData, espaco: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                  required
                >
                  <option value="">Selecione um espaço</option>
                  <option value="Salão de Festas">Salão de Festas</option>
                  <option value="Área Gourmet">Área Gourmet</option>
                  <option value="Piscina">Piscina</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">Data</label>
                  <input
                    type="date"
                    value={reservaData.data}
                    onChange={(e) => setReservaData({ ...reservaData, data: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Horário</label>
                  <input
                    type="time"
                    value={reservaData.horario}
                    onChange={(e) => setReservaData({ ...reservaData, horario: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Descrição</label>
                <textarea
                  value={reservaData.descricao}
                  onChange={(e) => setReservaData({ ...reservaData, descricao: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] h-32"
                  placeholder="Detalhes da reserva"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowReservaModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#008080] text-white rounded-lg hover:bg-[#006666]"
                >
                  Reservar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ButtonReserva;