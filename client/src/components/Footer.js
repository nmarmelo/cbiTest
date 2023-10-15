import React from "react"; 
import { 
Box
} from "./FooterStyles"; 

const Footer = () => { 
return ( 
	<Box> 
    <h1 style={{ color: "orange", 
				textAlign: "center"}}> 
		    {process.env.NODE_ENV === 'development' 
                ? process.env.REACT_APP_DEV_MODE 
                : process.env.REACT_APP_PRO_MODE}
    </h1>
	</Box> 
); 
}; 
export default Footer; 
