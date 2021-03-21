import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { UseContext } from '../../App';
import './Destination.css';
import fakeData from '../../fakedata/fakedata.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Mapcontainer from '../Mapcontainer/Mapcontainer';

const Destination = () => {
   const [loggedInUser, setLoggedInUser] = useContext(UseContext)

   const {rideType} = useParams();

   const[carts,setCart] = useState([]);
   const carValue = carts.find(cart => cart.name === rideType)
   useEffect(() => {
      setCart(fakeData)
   },[])

   const [newUser, setNewUser] = useState({name: ''})
   const [submittedPlace, setSubmittedPlace] = useState(false);

   const handelSubmit = (e) => {
      
      if(newUser.from && newUser.to){
         const carUser = {...newUser}
         setSubmittedPlace(carUser)
      }
      
      e.preventDefault();
   }
   const handelBlur = (e) => {
      let isFromValid = true;
      if (e.target.name === "from") {
         isFromValid = /^[A-Za-z]+$/.test(e.target.value);
     }
     if (e.target.name === "to") {
      isFromValid = /^[A-Za-z]+$/.test(e.target.value);
  }
     if(isFromValid){
        const fromValid = {...newUser}
        fromValid[e.target.name] = e.target.value;
        setNewUser(fromValid)
     }
   }

   return (
      <div className="container">
         <div>
            <div class="booking-form">
               { !submittedPlace &&
                  <form onSubmit={handelSubmit}>
                  <div class="input-group">
                     <label for="">Pick From</label>
                     <input class="inp-style" onBlur={handelBlur} type="text" name="from" id="" placeholder="Mirpur-1"/>
                  </div>
                  <div class="input-group">
                     <label for="">Pick To</label>
                     <input class="inp-style" onBlur={handelBlur} type="text" name="to" placeholder="Dhanmondi"></input>
                  </div>
                  <div>
                  <div class="input-group">
                     <label for="" >Departure</label>
                     <input class="inp-style" type="date" name=""></input>
                  </div>
                  </div>
                  <input className="butto-color" variant="primary" type="submit" value="Submit"/>_
                  
               </form>            
               }

               { submittedPlace && 
                  <div>
                     <div className="location-destination">
                        <h4>{newUser.from}</h4>
                        <small>To</small>
                        <h4>{newUser.to}</h4>
                     </div>
                     <div className="car-default">
                        <img src={carValue?.img} alt=""/>
                        <h5>{carValue?.name}</h5>
                        <h6><FontAwesomeIcon icon={faUserFriends}/>{carValue?.people}</h6>
                        <h5>${carValue?.amount}</h5>
                     </div>
                     <div className="car-default">
                        <img src={carValue?.img} alt=""/>
                        <h5>{carValue?.name}</h5>
                        <h6><FontAwesomeIcon icon={faUserFriends}/>{carValue?.people}</h6>
                        <h5>${carValue?.amount}</h5>
                     </div>
                     <div className="car-default">
                        <img src={carValue?.img} alt=""/>
                        <h5>{carValue?.name}</h5>
                        <h6><FontAwesomeIcon icon={faUserFriends}/>{carValue?.people}</h6>
                        <h5>${carValue?.amount}</h5>
                     </div>
                  </div>
               }
            </div>
            <p>Want a <Link to="/home">different rides?</Link> </p>
            
            <div className="map-container">
               <Mapcontainer></Mapcontainer>
            </div>
         </div>

      </div>

      
   );
};

export default Destination;