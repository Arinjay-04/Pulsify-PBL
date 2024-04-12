import './Donation.css'
import { FaHandHoldingDroplet } from "react-icons/fa6";
import { GiDroplets } from "react-icons/gi";
import { BiSolidDonateBlood } from "react-icons/bi"
import { Outlet, Link } from "react-router-dom";



const Donation1 = () => {
    return ( 
       
<div className="donationfirst">
    <h2> Blood Donation < FaHandHoldingDroplet className="icon" /></h2>

    <Link to= "/donar" class="btn btn-primary btn-lg">
        Find Donor <GiDroplets className="icon1" />
    </Link>

    <a href="link_to_donate_blood_page" class="btn btn-secondary btn-lg">
        Donate Blood <BiSolidDonateBlood className="icon1" />
    </a>
    <img src="donation.svg" width="500" height="600" alt="Diseases" />
</div>

       
     );
}
 
export default Donation1;