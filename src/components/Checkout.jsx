import {useContext} from 'react';
import Modal from './UI/Modal';
import CartContext from '../store/CartContext';
import {currencyFormatter} from '../util/formatting';
import Input from './UI/Input';
import UserProgressContext from '../store/UserProgressContext';
import Button from './UI/Button';

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  function handleClose() {
    userProgressCtx.hideCheckout();
  }
  return (
    <Modal
      open={userProgressCtx.progress === 'checkout'}
      onClose={userProgressCtx.progress === 'checkout' ? handleClose : null}>
      <form action=''>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label='Full Name' type='text' id='full-name' />
        <Input label='Email' type='email' id='email' />
        <Input label='Street' type='text' id='street' />
        <div className='control-row'>
          <Input label='Postal Code' type='text' id='postal-code' />
          <Input label='City' type='text' id='city' />
        </div>

        <p className='modal-actions'>
          <Button type='button' textOnly onClick={handleClose}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
