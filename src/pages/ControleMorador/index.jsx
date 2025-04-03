import HeaderMorador from "../../components/HeaderMorador";
import SidebarMorador from "../../components/SidebarMorador";
import ControlFinanceMorador from "../../components/ConstroleFinanceMorador";

export function ControleMorador() {
    return (
        <div className="flex h-screen">
            <SidebarMorador />
            
            <div className="flex-1 flex flex-col overflow-hidden">
                <HeaderMorador />
                
                <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    <ControlFinanceMorador />
                </main>
            </div>
        </div>
    );
}