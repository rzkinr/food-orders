import {useContext} from 'react';
import Modal from './UI/Modal';
import CartContext from '../store/CartContext';
import {currencyFormatter} from '../util/formatting';
import Input from './UI/Input';
import UserProgressContext from '../store/UserProgressContext';
import Button from './UI/Button';
import useHttp from '../hooks/useHttp';
import Error from './Error';

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp('http://localhost:3000/orders', requestConfig);

  const cartTotal = cartCtx.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: userData,
        },
      }),
    );
  }

  let actions = (
    <>
      <Button type='button' textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === 'checkout'}
        onClose={handleFinish}>
        <h2>Success!</h2>
        <p>Your order has been successfully submitted!</p>
        <p className='modal-actions'>
          <Button onClick={handleFinish}>Close</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={userProgressCtx.progress === 'checkout'}
      onClose={userProgressCtx.progress === 'checkout' ? handleClose : null}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label='Full Name' type='text' id='name' />
        <Input label='Email' type='email' id='email' />
        <Input label='Street' type='text' id='street' />
        <div className='control-row'>
          <Input label='Postal Code' type='text' id='postal-code' />
          <Input label='City' type='text' id='city' />
        </div>

        {error && <Error title='Error Submitting Order' message={error} />}

        <p className='modal-actions'>{actions}</p>
      </form>
    </Modal>
  );
}
