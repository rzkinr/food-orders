import Button from './UI/Button.jsx';
import logoImg from '../assets/logo.jpg';
import {useContext} from 'react';
import CartContext from '../store/CartContext.jsx';

export default function Header() {
  const cartCtx = useContext(CartContext);

  const totalCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.quantity;
  }, 0);

  return (
    <header id='main-header'>
      <div id='title'>
        <img src={logoImg} alt='' />
        <h1>React Food Orders</h1>
      </div>
      <nav>
        <Button textOnly>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}
