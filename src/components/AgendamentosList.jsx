import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";

const AgendamentosList = () => {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    loadAgendamentos();
  }, []);

  const loadAgendamentos = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/agendamentos");
      if (!response.ok) {
        throw new Error("Erro ao carregar agendamentos");
      }
      const data = await response.json();
      setAgendamentos(data);
    } catch (error) {
      console.error("Erro ao carregar agendamentos:", error);
    }
  };

  const deleteAgendamento = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/agendamentos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erro ao deletar agendamento");
      }
      loadAgendamentos();
    } catch (error) {
      console.error("Erro ao deletar agendamento:", error);
    }
  };

  return (
    <div>
      <h2>Agendamentos</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome do Cliente</th>
            <th>Data</th>
            <th>Hora</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {agendamentos.map((agendamento) => (
            <tr key={agendamento.id}>
              <td>{agendamento.nomeCliente}</td>
              <td>{agendamento.dataAgendamento}</td>
              <td>{agendamento.horarioDoAgendamento}</td>
              <td>
                <Link to={`/editar/${agendamento.id}`} className="btn btn-primary">Editar</Link>
                <Button variant="danger" onClick={() => deleteAgendamento(agendamento.id)}>Excluir</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AgendamentosList;
