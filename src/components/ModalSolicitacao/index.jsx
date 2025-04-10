import React from 'react';
import ButtonReserva from '../ButtonReserva';

const ModalSolicitacao = ({
  isOpen,
  onClose,
  tipoSolicitacao,
  setTipoSolicitacao,
  tipoVitrine,
  setTipoVitrine,
  nomeProduto,
  setNomeProduto,
  valorProduto,
  setValorProduto,
  descricaoProduto,
  setDescricaoProduto,
  telefoneContato,
  setTelefoneContato,
  titulo,
  setTitulo,
  conteudo,
  setConteudo,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[rgb(0,128,128)]">Nova Solicitação</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Tipo de Solicitação</label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setTipoSolicitacao('POSTAGEM_VITRINE')}
              className={`py-2 px-4 rounded-lg border ${tipoSolicitacao === 'POSTAGEM_VITRINE'
                  ? 'border-[rgb(0,128,128)] bg-[rgba(0,128,128,0.1)]'
                  : 'border-gray-300'
                }`}
            >
              Vitrine
            </button>
            <ButtonReserva />
            <button
              onClick={() => setTipoSolicitacao('Aviso')}
              className={`py-2 px-4 rounded-lg border ${tipoSolicitacao === 'Aviso'
                  ? 'border-[rgb(0,128,128)] bg-[rgba(0,128,128,0.1)]'
                  : 'border-gray-300'
                }`}
            >
              Aviso
            </button>
          </div>
        </div>

        {/* Formulário para Vitrine */}
        {tipoSolicitacao === 'POSTAGEM_VITRINE' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Tipo de Vitrine</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setTipoVitrine('SERVICO')}
                  className={`py-2 px-4 rounded-lg border ${tipoVitrine === 'SERVICO'
                      ? 'border-[rgb(0,128,128)] bg-[rgba(0,128,128,0.1)]'
                      : 'border-gray-300'
                    }`}
                >
                  Serviço
                </button>
                <button
                  onClick={() => setTipoVitrine('PRODUTO')}
                  className={`py-2 px-4 rounded-lg border ${tipoVitrine === 'PRODUTO'
                      ? 'border-[rgb(0,128,128)] bg-[rgba(0,128,128,0.1)]'
                      : 'border-gray-300'
                    }`}
                >
                  Produto
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Nome do Produto/Serviço</label>
              <input
                type="text"
                value={nomeProduto}
                onChange={(e) => setNomeProduto(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(0,128,128)]"
                placeholder="Digite o nome do produto ou serviço"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Valor</label>
              <input
                type="number"
                value={valorProduto}
                onChange={(e) => setValorProduto(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(0,128,128)]"
                placeholder="Digite o valor do produto ou serviço"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Telefone de Contato</label>
              <input
                type="tel"
                value={telefoneContato || ''}
                onChange={(e) => setTelefoneContato(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(0,128,128)]"
                placeholder="Digite o telefone de contato"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Descrição</label>
              <textarea
                value={descricaoProduto}
                onChange={(e) => setDescricaoProduto(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(0,128,128)] h-32"
                placeholder="Descreva o produto ou serviço"
              />
            </div>
          </>
        )}

        {/* Formulário para Aviso */}
        {tipoSolicitacao === 'Aviso' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Título</label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(0,128,128)]"
                placeholder="Digite o título"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Conteúdo</label>
              <textarea
                value={conteudo}
                onChange={(e) => setConteudo(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(0,128,128)] h-32"
                placeholder="Descreva sua solicitação"
              />
            </div>
          </>
        )}

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={onSubmit}
            className="px-6 py-2 bg-[rgb(0,128,128)] text-white rounded-lg hover:bg-[rgba(0,128,128,0.9)]"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSolicitacao;