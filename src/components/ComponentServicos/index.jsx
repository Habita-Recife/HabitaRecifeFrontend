import { useEffect, useState } from "react";
import { listarCondominios, listarSolicitacoes } from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";

const ComponentServicos = () => {
  const { user } = useAuth();
  const [vitrine, setVitrine] = useState([]);

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const emailMorador = user?.sub;

    if (!emailMorador) {
      console.error("Erro: E-mail do morador não encontrado no token.");
      return;
    }

    listarCondominios()
      .then((response) => {
        const condominio = response.data.find((c) =>
          c.morador?.some((m) => m.emailMorador === emailMorador)
        );

        if (condominio) {
          const condominioId = condominio.idCondominio;
          console.log("Condomínio do morador logado:", condominio);

          listarSolicitacoes()
            .then((solicitacoesResponse) => {
              console.log("Solicitações retornadas:", solicitacoesResponse.data);

              const vitrinesAprovadas = solicitacoesResponse.data
                .filter(
                  (solicitacao) =>
                    solicitacao.status_solicitacao === "APROVADO" &&
                    solicitacao.vitrine 
                )
                .map((solicitacao) => solicitacao.vitrine);

              console.log("Vitrines aprovadas:", vitrinesAprovadas);

              const vitrineOrdenada = vitrinesAprovadas.sort(
                (a, b) => b.id_vitrine - a.id_vitrine
              );

              setVitrine(vitrineOrdenada);
            })
            .catch((error) => {
              console.error("Erro ao buscar solicitações:", error);
            });
        } else {
          console.error("Erro: Não foi possível identificar o condomínio.");
        }
      })
      .catch((error) => {
        console.error("Erro ao listar condomínios:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl sm:text-5xl font-bold text-[#008080] mb-8">
        Vitrine de Serviços e Produtos
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vitrine.map((item) => (
          <div
            key={item.id_vitrine}
            className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-800">{capitalizeFirstLetter(item.nomeProduto)}</h3>
                <p className="text-sm text-gray-500">{item.tipoVitrine}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-500">
                <strong>Descrição:</strong> {item.descricaoProduto || "Não disponível"}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                <strong>Contato:</strong> {item.telefoneContato || "Não disponível"}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                <strong>Valor:</strong> R$ {item.valorProduto ? parseFloat(item.valorProduto).toFixed(2) : "0.00"}
              </p>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <button className="px-4 py-2 bg-[#008080] text-white rounded-lg hover:bg-[#006666]">
                Contratar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentServicos;