import { useEffect, useState } from "react";
import { listarCondominios } from "../../utils/api";
import { getDados } from "../../utils/utils";
import { MapPin, Phone } from "lucide-react";

const ComponentServicos = () => {
  const [vitrine, setVitrine] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const emailMorador = getDados(token)?.sub;

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
          console.log("Condomínio do morador logado:", condominio);

          fetch(`http://localhost:8080/v1/vitrine/condominio/${condominio.idCondominio}`)
            .then((response) => response.json())
            .then((data) => {
              console.log("Itens da vitrine retornados:", data);

              const vitrineOrdenada = data.sort((a, b) => b.id_vitrine - a.id_vitrine);

              console.log("Itens da vitrine ordenados:", vitrineOrdenada);
              setVitrine(vitrineOrdenada);
            })
            .catch((error) => {
              console.error("Erro ao buscar dados da vitrine:", error);
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
                <h3 className="font-bold text-gray-800">{item.nomeProduto}</h3>
                <p className="text-sm text-gray-500">{item.tipoVitrine}</p>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <MapPin className="w-4 h-4 mr-2" />
                Bloco {item.bloco || "N/A"}, Apartamento {item.apartamento || "N/A"}
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Phone className="w-4 h-4 mr-2" />
                {item.telefoneContato || "Telefone não disponível"}
              </div>
              <p className="text-sm text-gray-600">{item.descricaoProduto || "Descrição não disponível"}</p>
              <p className="text-sm text-gray-500 mt-2">
                <strong>Postado por:</strong> {item.nomeMorador || "Não informado"}
              </p>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-lg font-bold text-[#008080]">
                R$ {item.valorProduto ? parseFloat(item.valorProduto).toFixed(2) : "0.00"}
              </span>
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