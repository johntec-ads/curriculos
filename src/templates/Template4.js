import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Paper, Button, Box } from '@mui/material';

const Template4 = ({ data, onBack, onPrint, isGenerating }) => {
  return (
    <Paper sx={{ width: '210mm', minHeight: '297mm', margin: '32px auto', p: 4, fontFamily: 'Arial, sans-serif' }}>
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
      <h2>Idiomas</h2>
      <ul>
        {data.languages.map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <Box sx={{ textAlign: 'center', mb: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button onClick={onBack} variant="outlined" color="primary" size="large" aria-label="Voltar e Editar">
          Voltar e Editar
        </Button>
        <Button
          onClick={onPrint}
          variant="contained"
          color="primary"
          size="large"
          disabled={isGenerating}
          aria-label="Gerar PDF"
        >
          Gerar PDF
        </Button>
      </Box>
    </Paper>
  );
};

Template4.propTypes = {
  data: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  onPrint: PropTypes.func.isRequired,
  isGenerating: PropTypes.bool.isRequired,
};

const Template4Wrapper = (props) => {
  const navigate = useNavigate();
  const [data] = useState({
    personalInfo: {
      name: 'João da Silva',
      email: 'joao.silva@example.com',
      phone: '(11) 99999-9999',
      address: 'Rua Exemplo, 123, São Paulo, SP',
      linkedin: 'linkedin.com/in/joaosilva',
      objective: 'Busco uma posição desafiadora como Desenvolvedor Frontend para aplicar meus conhecimentos em React e contribuir para o crescimento da empresa.'
    },
    education: [
      {
        institution: 'Universidade Exemplo',
        course: 'Bacharelado em Ciência da Computação',
        startDate: '2015-01-01',
        endDate: '2019-12-31',
        description: 'Formação sólida em desenvolvimento de software, participação em projetos de pesquisa e iniciação científica.'
      },
      {
        institution: 'Escola Técnica Estadual',
        course: 'Técnico em Informática',
        startDate: '2012-01-01',
        endDate: '2014-12-31',
        description: 'Curso técnico com foco em lógica de programação, redes e manutenção de computadores.'
      }
    ],
    experience: [
      {
        company: 'Empresa Exemplo',
        position: 'Desenvolvedor Frontend',
        startDate: '2020-01-01',
        endDate: '2023-12-31',
        description: 'Desenvolvimento de interfaces responsivas em React, integração com APIs REST, testes automatizados e colaboração com equipe ágil.'
      },
      {
        company: 'Tech Solutions',
        position: 'Estagiário de Desenvolvimento',
        startDate: '2018-06-01',
        endDate: '2019-12-31',
        description: 'Apoio no desenvolvimento de sistemas internos, manutenção de aplicações em JavaScript e suporte a usuários.'
      }
    ],
    skills: ['JavaScript', 'React', 'CSS', 'HTML', 'TypeScript', 'Git', 'Jest', 'Redux', 'Figma'],
    languages: ['Português (Nativo)', 'Inglês (Avançado)', 'Espanhol (Intermediário)']
  });

  const handleBack = () => {
    navigate(-1);
  };
  const handlePrint = () => {
    window.print();
  };

  return <Template4 data={data} onBack={handleBack} onPrint={handlePrint} isGenerating={false} {...props} />;
};

export default Template4Wrapper;