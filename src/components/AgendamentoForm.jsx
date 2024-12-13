import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const AgendamentoForm = () => {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      loadAgendamento();
    }
  }, [id]);

  const loadAgendamento = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/agendamentos/${id}`);
      if (!response.ok) {
        throw new Error("Erro ao carregar agendamento");
      }
      const data = await response.json();
      const fields = ["nomeCliente", "dataAgendamento", "horarioDoAgendamento", "descricaoAgendamento"];
      fields.forEach(field => setValue(field, data[field]));
    } catch (error) {
      console.error("Erro ao carregar agendamento:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      console.log("Dados enviados:", data); // Adiciona log dos dados enviados
      const options = {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(`http://localhost:3000/api/agendamentos${id ? `/${id}` : ""}`, options);
      if (!response.ok) {
        throw new Error(`Erro ao ${id ? "atualizar" : "criar"} agendamento`);
      }
      navigate("/");
    } catch (error) {
      console.error(`Erro ao ${id ? "atualizar" : "criar"} agendamento:`, error);
    }
  };

  return (
    <div>
      <h2>{id ? "Editar Agendamento" : "Novo Agendamento"}</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>Nome do Cliente</Form.Label>
          <Form.Control type="text" {...register("nomeCliente")} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Data do Agendamento</Form.Label>
          <Form.Control type="date" {...register("dataAgendamento")} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Hora do Agendamento</Form.Label>
          <Form.Control type="time" {...register("horarioDoAgendamento")} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Descrição</Form.Label>
          <Form.Control as="textarea" rows={3} {...register("descricaoAgendamento")} />
        </Form.Group>
        <Button variant="primary" type="submit">{id ? "Atualizar" : "Salvar"}</Button>
      </Form>
    </div>
  );
};

export default AgendamentoForm;
