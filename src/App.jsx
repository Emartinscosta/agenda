import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import AgendamentosList from "./components/AgendamentosList.jsx";
import AgendamentoForm from "./components/AgendamentoForm.jsx";
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
          <Route path="/novo" element={<AgendamentoForm />} />
          <Route path="/editar/:id" element={<AgendamentoForm />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
