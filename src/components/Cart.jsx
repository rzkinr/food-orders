import {useContext} from 'react';

import Modal from './UI/Modal';
import CartContext from '../store/CartContext.jsx';
import {currencyFormatter} from '../util/formatting.js';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext.jsx';

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  return (
    <Modal open={userProgressCtx.progress === 'cart'} className='cart'>
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity}
          </li>
        ))}
      </ul>
      <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
      <p className='modal-actions'>
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        <Button>Add to Checkout</Button>
      </p>
    </Modal>
  );
}
