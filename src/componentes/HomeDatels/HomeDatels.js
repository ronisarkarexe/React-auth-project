import React from 'react';
import { useHistory } from 'react-router';
import './HomeDatels.css'

const HomeDatels = (props) => {
   const {name, img} = props.cart;

   const history = useHistory()
   const handleBook = (rideType) => {
       history.push(`/destination/${rideType}`);
   }

   return (
      <div className="col-md-3">
         <div className="homeDeals">
            <div className="">
               <div className="image-cart">
                   <a onClick={() => handleBook(name)}>  <img src={img}/> </a>
                  <div className="name">
                     <h5>{name}</h5>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default HomeDatels;