import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Template5Wrapper = () => {
  const navigate = useNavigate();
  const [data] = useState({
    personalInfo: {
      name: 'João da Silva',
      email: 'joao.silva@example.com',
      phone: '(11) 99999-9999',
      address: 'Rua Exemplo, 123, São Paulo, SP',
      linkedin: 'linkedin.com/in/joaosilva',
      objective: 'Contribuir com minhas habilidades em desenvolvimento web.'
    },
    education: [
      {
        institution: 'Universidade Exemplo',
        course: 'Bacharelado em Ciência da Computação',
        startDate: '2015-01-01',
        endDate: '2019-12-31',
        description: 'Formação sólida em desenvolvimento de software.'
      }
    ],
    experience: [
      {
        company: 'Empresa Exemplo',
        position: 'Desenvolvedor Frontend',
        startDate: '2020-01-01',
        endDate: '2023-12-31',
        description: 'Desenvolvimento de interfaces responsivas.'
      }
    ],
    skills: ['JavaScript', 'React', 'CSS']
  });

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#1976d2' }}>{data.personalInfo.name}</h1>
      <p><strong>Email:</strong> {data.personalInfo.email}</p>
      <p><strong>Telefone:</strong> {data.personalInfo.phone}</p>
      <p><strong>Endereço:</strong> {data.personalInfo.address}</p>
      <p><strong>LinkedIn:</strong> {data.personalInfo.linkedin}</p>
      <h2>Objetivo</h2>
      <p>{data.personalInfo.objective}</p>
      <h2>Educação</h2>
      {data.education.map((edu, index) => (
        <div key={index}>
          <p><strong>Instituição:</strong> {edu.institution}</p>
          <p><strong>Curso:</strong> {edu.course}</p>
          <p><strong>Período:</strong> {edu.startDate} - {edu.endDate}</p>
          <p>{edu.description}</p>
        </div>
      ))}
      <h2>Experiência</h2>
      {data.experience.map((exp, index) => (
        <div key={index}>
          <p><strong>Empresa:</strong> {exp.company}</p>
          <p><strong>Cargo:</strong> {exp.position}</p>
          <p><strong>Período:</strong> {exp.startDate} - {exp.endDate}</p>
          <p>{exp.description}</p>
        </div>
      ))}
      <h2>Habilidades</h2>
      <ul>
        {data.skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
      <button onClick={handleBack} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#1976d2', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Voltar</button>
    </div>
  );
};

export default Template5Wrapper;