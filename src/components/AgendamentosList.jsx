import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";

const AgendamentosList = () => {
  const [Agendamentos, setagendamentos] = useState([]);

  useEffect(() => {
    loadAgendamentos();
  }, []);

  const loadAgendamentos = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/Agendamentos");
      if (!response.ok) {
        throw new Error("Erro ao carregar agendamentos");
      }
      const data = await response.json();
      setagendamentos(data);
    } catch (error) {
      console.error("Erro ao carregar agendamentos:", error);
    }
  };

  const deleteagendamentos = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/Agendamento/${id}`, {
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
          {Agendamentos.map((Agendamentos) => (
            <tr key={Agendamentos.id}>
              <td>{Agendamentos.nomeCliente}</td>
              <td>{Agendamentos.dataAgendamento}</td>
              <td>{Agendamentos.horarioDoAgendamento}</td>
              <td>
                <Link to={`/editar/${agendamentos.id}`} className="btn btn-primary">Editar</Link>
                <Button variant="danger" onClick={() => deleteagendamentos(Agendamentos.id)}>Excluir</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AgendamentosList;
