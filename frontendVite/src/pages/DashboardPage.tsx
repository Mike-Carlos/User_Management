import Navbar from "../components/navbar/Navbar";
import './../components/login/login.css'
import UserTable from './../components/dashboard/UserTable';

export default function DashboardPage(){
    return(
        <>
        
        

        <div style={{backgroundColor:"#808080"}}>
        
        <Navbar />
        </div>
        
       <UserTable />
        </>
    );
}