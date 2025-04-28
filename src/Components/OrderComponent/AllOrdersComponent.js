// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Payment.css'; // Import CSS for styling
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
 
// const Payment = () => {
//     const [cardNumber, setCardNumber] = useState('');
//     const [expiryDate, setExpiryDate] = useState('');
//     const [cvv, setCvv] = useState('');
//     const [cardHolderName, setCardHolderName] = useState('');
//     const [cardNumberError, setCardNumberError] = useState('');
//     const [expiryDateError, setExpiryDateError] = useState('');
//     const [cvvError, setCvvError] = useState('');
//     const [cardHolderNameError, setCardHolderNameError] = useState('');
//     const [touched, setTouched] = useState({
//         cardNumber: false,
//         expiryDate: false,
//         cvv: false,
//         cardHolderName: false,
//     });
//     const navigate = useNavigate();
 
//     const handleBlur = (field) => {
//         setTouched({ ...touched, [field]: true });
//         validateForm(); // Validate on blur as well
//     };
 
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const isValid = validateForm(true);
//         if (isValid) {
//             try {
//                 await placeOrder(); // Call placeOrder function
//                 // Show the toast message
//                 toast.success('Order placed successfully!', {
//                     position: "top-center",
//                     autoClose: 1500, // Duration for the toast
//                 });
 
//                 // Delay navigation until the toast is displayed
//                 setTimeout(() => {
//                     navigate('/homeuser');
//                 }, 1000); // Match the delay duration with the toast duration
//             } catch (error) {
//                 console.error('Error placing order:', error);
//                 toast.error('Failed to place order.');
//             }
//         } else {
//             toast.error('Please fill in all required fields correctly.');
//         }
//     };
 
//     const handleCancel = () => {
//         navigate('/homeuser'); // Navigate back to home page
//     };
 
//     const formatCardNumber = (value) => {
//         const cleanedValue = value.replace(/\D/g, '');
//         const formattedValue = cleanedValue.replace(/(\d{4})/g, '$1 ').trim();
//         return formattedValue.slice(0, 19); // Limit to 16 digits + 3 spaces
//     };
 
//     const handleCardNumberChange = (e) => {
//         setCardNumber(formatCardNumber(e.target.value));
//     };
 
//     const handleExpiryDateChange = (e) => {
//         const value = e.target.value.replace(/\D/g, '').slice(0, 4);
//         if (value.length <= 2) {
//             setExpiryDate(value);
//         } else {
//             setExpiryDate(`${value.slice(0, 2)}/${value.slice(2)}`);
//         }
//     };
 
//     const handleCvvChange = (e) => {
//         setCvv(e.target.value.replace(/\D/g, '').slice(0, 3));
//     };
 
//     const handleCardHolderNameChange = (e) => {
//         setCardHolderName(e.target.value.replace(/[^A-Za-z\s]/g, ''));
//     };
 
//     const validateForm = (isSubmit = false) => {
//         let isValid = true;
//         const errors = {
//             cardNumber: '',
//             expiryDate: '',
//             cvv: '',
//             cardHolderName: '',
//         };
 
//         if (isSubmit || touched.cardNumber) {
//             if (!cardNumber) {
//                 errors.cardNumber = 'Please enter your card number.';
//                 isValid = false;
//             } else if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(cardNumber)) {
//                 errors.cardNumber = 'Invalid card number. It should be 16 digits with a space after every 4 digits.';
//                 isValid = false;
//             }
//         }
 
//         if (isSubmit || touched.expiryDate) {
//             if (!expiryDate) {
//                 errors.expiryDate = 'Please enter the expiry date.';
//                 isValid = false;
//             } else if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
//                 errors.expiryDate = 'Invalid expiry date format. Please use MM/YY.';
//                 isValid = false;
//             } else {
//                 const [month, year] = expiryDate.split('/');
//                 const currentYear = new Date().getFullYear() % 100;
//                 const currentMonth = new Date().getMonth() + 1;
//                 const parsedMonth = parseInt(month, 10);
//                 const parsedYear = parseInt(year, 10);
 
//                 if (isNaN(parsedMonth) || isNaN(parsedYear) || parsedMonth < 1 || parsedMonth > 12 || parsedYear < 25 || parsedYear > 30 || (parsedYear === currentYear && parsedMonth < currentMonth)) {
//                     errors.expiryDate = 'Invalid expiry date.';
//                     isValid = false;
//                 }
//             }
//         }
 
//         if (isSubmit || touched.cvv) {
//             if (!cvv) {
//                 errors.cvv = 'Please enter the CVV.';
//                 isValid = false;
//             } else if (!/^\d{3}$/.test(cvv)) {
//                 errors.cvv = 'Invalid CVV. Please enter 3 digits.';
//                 isValid = false;
//             }
//         }
 
//         if (isSubmit || touched.cardHolderName) {
//             if (!cardHolderName) {
//                 errors.cardHolderName = 'Please enter the card holder name.';
//                 isValid = false;
//             } else if (/\d/.test(cardHolderName)) {
//                 errors.cardHolderName = 'Card holder name cannot contain numbers.';
//                 isValid = false;
//             } else if (/[^A-Za-z\s]/.test(cardHolderName)) {
//                 errors.cardHolderName = 'Card holder name cannot contain special characters.';
//                 isValid = false;
//             } else if (cardHolderName.trim().split(/\s+/).join('').length < 6) {
//                 errors.cardHolderName = 'Card holder name should have at least 6 letters.';
//                 isValid = false;
//             }
//         }
 
//         setCardNumberError(errors.cardNumber);
//         setExpiryDateError(errors.expiryDate);
//         setCvvError(errors.cvv);
//         setCardHolderNameError(errors.cardHolderName);
 
//         return isValid;
//     };
 
//     const placeOrder = async () => {
//         const orderProductId = localStorage.getItem('orderProductId');
//         const orderedQuantity = localStorage.getItem('orderedQuantity');
//         if (!orderedQuantity || parseInt(orderedQuantity) <= 0) {
//             throw new Error('Invalid quantity.');
//         }
//         const token = localStorage.getItem('token');
//         await axios.post(
//             'http://localhost:5203/api/Order',
//             {
//                 productId: orderProductId.trim(),
//                 orderedQuantity: parseInt(orderedQuantity),
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                 },
//             }
//         );
//         localStorage.removeItem('orderProductId');
//         localStorage.removeItem('orderedQuantity');
//     };
 
//     return (
//         <div className="payment-container">
//             <h2>Payment Information</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label>Card Number</label>
//                     <input
//                         type="text"
//                         value={cardNumber}
//                         onChange={handleCardNumberChange}
//                         placeholder="XXXX XXXX XXXX XXXX"
//                         onBlur={() => handleBlur('cardNumber')}
//                         maxLength="19"
//                         required // Make it a required field
//                     />
//                     {cardNumberError && <div className="error-box">{cardNumberError}</div>}
//                 </div>
//                 <div className="form-group">
//                     <label>Expiry Date (MM/YY)</label>
//                     <input
//                         type="text"
//                         value={expiryDate}
//                         onChange={handleExpiryDateChange}
//                         placeholder="MM/YY"
//                         onBlur={() => handleBlur('expiryDate')}
//                         maxLength="5"
//                         required // Make it a required field
//                     />
//                     {expiryDateError && <div className="error-box">{expiryDateError}</div>}
//                 </div>
//                 <div className="form-group">
//                     <label>CVV</label>
//                     <input
//                         type="password"
//                         value={cvv}
//                         onChange={handleCvvChange}
//                         placeholder="Enter CVV"
//                         onBlur={() => handleBlur('cvv')}
//                         maxLength="3"
//                         required // Make it a required field
//                     />
//                     {cvvError && <div className="error-box">{cvvError}</div>}
//                 </div>
//                 <div className="form-group">
//                     <label>Card Holder Name</label>
//                     <input
//                         type="text"
//                         value={cardHolderName}
//                         onChange={handleCardHolderNameChange}
//                         placeholder="Enter card holder name"
//                         onBlur={() => handleBlur('cardHolderName')}
//                         required // Make it a required field
//                     />
//                     {cardHolderNameError && <div className="error-box">{cardHolderNameError}</div>}
//                 </div>
//                 <button type="submit">Submit Payment</button><br/>
//                 <button type="button" className='cancel' onClick={handleCancel}>Cancel</button>

//             </form>
//             <ToastContainer position="bottom-right" autoClose={1000} />
//         </div>
//     );
// };
 
// export default Payment;
 