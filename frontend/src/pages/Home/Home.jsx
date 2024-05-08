import React, { useState } from 'react';
import './Home.css';
import Header from '../../componets/Header/Header';
import ExploreMenu from '../../componets/ExploreMenu/ExploreMenu';

const Home = () => {
   const [category, setCategory] = useState("All")

  return (
    <div>
    <Header/>
    <ExploreMenu/>
    </div>
  );
}

export default Home;