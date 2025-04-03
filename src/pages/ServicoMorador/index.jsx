import HeaderMorador from "../../components/HeaderMorador"
import SidebarMorador from "../../components/SidebarMorador"
import ComponentServicos from "../../components/ComponentServicos"
export function ServicoMorador() {
    return (
        <div className="flex h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
            <SidebarMorador />
            <div className="flex-1 flex flex-col overflow-hidden">
                <HeaderMorador />
                <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    <h1 className="text-2xl font-bold text-gray-900">Vitrine de Serviços    </h1>
                    <ComponentServicos />
                </div>
            </div>
        </div>
    )
}