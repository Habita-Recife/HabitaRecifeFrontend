import RecentRequestsButton from "../../components/BotoesSindi"
import HistoricoButton from "../../components/BotoesSindi2"
import HeaderSindi from "../../components/HeaderSindi"
import SidebarSindi from "../../components/SideBarSindi"
import "./style.css"


export function SindiServi(){


    return(

        <>
        <HeaderSindi/>
        <div className="container_sindico1">
        <SidebarSindi/>
        <div className="container_SindiServi">
        <RecentRequestsButton/>
        <HistoricoButton/>
        </div>

        

        </div>
        


      

        
        </>



    )


}