import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FilterProductsComponent from '../ProductComponent/FilterProductsComponent'; // Import the FilterProducts component
 
const HomepageAdmin = () => {
 
 
 
  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col">
          <FilterProductsComponent /> {/* Include the FilterProducts component */}
        </div>
      </div>
 
      
    </div>
  );
};
 
export default HomepageAdmin;
 
 