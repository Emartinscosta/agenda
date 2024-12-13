import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import AgendamentosList from "./components/AgendamentosList.jsx"; 
import AgendamentosForm from "./components/AgendamentosForm.jsx"; 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">Agendamentos</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Lista</Nav.Link>
          <Nav.Link href="/novo">Novo Agendamento</Nav.Link>
        </Nav>
      </Navbar>
      <Container>
        <Routes>
          <Route exact path="/" element={<AgendamentosList />} /> 
          <Route path="/novo" element={<AgendamentosForm />} /> 
          <Route path="/editar/:id" element={<AgendamentosForm />} /> 
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
