import React, { useEffect, useState } from 'react';
import './Home.css';
import fakeData from '../../fakedata/fakedata.json';
import HomeDatels from '../HomeDatels/HomeDatels';

const Home = () => {

   const[carts,setCart] = useState([]);
   useEffect(() => {
      setCart(fakeData)
   },[])

console.log('user', carts)
   return (
    <div className="home-color">
       <div className="container">
         <div className="row">
            {
               carts.map(cart => <HomeDatels key={cart.id} cart={cart}></HomeDatels>)

            //   const asdsa = carts.find( cart => cart.name === type.name)
            }
         </div>
      </div>
    </div>
   );
};

export default Home;