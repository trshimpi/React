import { useParams } from "react-router-dom";

function User() {
    const {userId} = useParams()
    return ( 
        <div className="bg-grey-700"> User : {userId} </div>
     );
}

export default User;