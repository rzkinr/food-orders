import {createContext, useState} from 'react';

const UserProgressContext = createContext({
  progress: '', // 'cart', 'checkout'
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export function UserProgressContextProvider({children}) {
  const [userProgress, setUserProgress] = useState('');

  function showCart() {
    // Implementation here
    setUserProgress('cart');
  }

  function hideCart() {
    setUserProgress('');
    // Implementation here
  }

  function showCheckout() {
    setUserProgress('checkout');
    // Implementation here
  }

  function hideCheckout() {
    setUserProgress('');
    // Implementation here
  }

  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  return (
    <UserProgressContext value={userProgressCtx}>
      {children}
    </UserProgressContext>
  );
}

export default UserProgressContext;
