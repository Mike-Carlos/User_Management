//import Navbar from "../components/navbar/Navbar";
import './../components/login/login.css'

import Sidebar from "../components/Sidebar/Sidebar";
import FloatingChart from '../components/charts/FloatingChart';

export default function DashboardPage(){
    return(
        <>
        
        

        <div>
        
        <Sidebar />
        
        
    
       </div>

       <div> <FloatingChart/> </div>
        </>
    );
}