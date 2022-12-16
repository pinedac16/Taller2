import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { IoGameController } from "react-icons/io5";

const Header = ({title}) => {
  return (
    <Navbar bg="light">
        <Container>
            <Navbar.Brand href="#home">
                <IoGameController />{title}
            </Navbar.Brand>
            <Navbar.Toggle />
        </Container>
      </Navbar>
  )
}

export default Header