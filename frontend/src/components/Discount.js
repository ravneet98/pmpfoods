import React from 'react'

const Discount = ({ discount }) => {
    return (
      <div
        class='badge rounded-pill bg-danger'
        style={{
          width: "55px",
          height: "55px",
          background: "#E53935",
          borderRadius: "100%",
        
          position: 'absolute',
          margin:'5px'
       
        }}
      >
        <label
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {discount}
        </label>
      </div>
    );
}
export default Discount;