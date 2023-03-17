
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ProductDetails from './pages/ProductDetails';
import { Container, Navbar, Nav, Badge } from 'react-bootstrap';
import { GiGuitarBassHead } from 'react-icons/gi';
import { BsCart2 } from 'react-icons/bs';
import { Store } from './store/Store';
import { useContext } from 'react';
import Cart from './pages/Cart';
import { About } from './pages/About';


function App() {
  const { state } = useContext(Store);
  const { cart } = state;
  console.log(cart);

  const navigate = useNavigate();

  return (
    <div className='d-flex flex-column app-container'>
      <header>
        <Navbar bg="dark" variant='dark'>
          <Container>
            <Navbar.Brand href='/'><GiGuitarBassHead />E-Guitars</Navbar.Brand>
            <Nav className='justify-content-end'>
              <Nav.Link onClick={() => navigate('/cart')}>
                <BsCart2 size='1.5em' />
                {cart.cartItems.length > 0 &&
                  <Badge pill bg='danger'>
                    {cart.cartItems.reduce((a, c) => a + c.qty, 0)}
                  </Badge>}
              </Nav.Link>
              <Nav.Link onClick={() => navigate('/about')}>About</Nav.Link>
            </Nav>

          </Container>
        </Navbar>
      </header>
      <main>
        <Container>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='product/:slug/:id' element={<ProductDetails></ProductDetails>} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/about' element={<About />}></Route>
          </Routes>
        </Container>
      </main >
    </div >
  );
}

export default App;
