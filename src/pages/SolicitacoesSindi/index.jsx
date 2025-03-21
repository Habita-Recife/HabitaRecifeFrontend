import HeaderSindi from "../../components/HeaderSindi"
import SidebarSindi from "../../components/SideBarSindi"
import RecentRequests from "../../components/SoliSindiRecent"
import "./style.css"





export function SolicitacoesSindi(){


    return(

        <>
        <HeaderSindi/>
        <div className="container_sindico1">
        <SidebarSindi/>
        <div className="container_SindiServi">
            <RecentRequests/>
            
        
        </div>

        

        </div>
        


      

        
        </>



    )


}