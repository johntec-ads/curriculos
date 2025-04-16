import { forwardRef } from 'react';
import { Paper, Typography, Box, Button, Backdrop, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Template1 = forwardRef(({ data, onPrint, onBack, isGenerating }, ref) => {
  const formatDate = (date) => {
    if (!date) return 'Presente';
    return new Date(date).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long'
    });
  };

  const sortByDate = (items) => {
    return [...items].sort((a, b) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);
      return dateB - dateA;
    });
  };

  if (!data) return null;

  return (
    <>
      <Paper
        ref={ref}
        sx={{
          p: 4,
          mt: 4,
          mb: 4,
          width: '210mm',
          minHeight: '297mm',
          margin: 'auto',
          backgroundColor: '#fff',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Marca d'água */}
        <Typography
          sx={{
            position: 'absolute',
            bottom: '40px',
            right: '20px',
            transform: 'rotate(-45deg)',
            color: 'rgba(0, 0, 0, 0.03)',
            fontSize: '80px',
            pointerEvents: 'none',
            userSelect: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          JOHNTEC.ADS
        </Typography>

        {/* Cabeçalho */}
        <Typography variant="h4" gutterBottom sx={{ borderBottom: '2px solid #1976d2' }}>
          {data?.personalInfo?.name || 'Nome não informado'}
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography>{data?.personalInfo?.email}</Typography>
          <Typography>{data?.personalInfo?.phone}</Typography>
          <Typography>{data?.personalInfo?.address}</Typography>
          {data?.personalInfo?.linkedin && (
            <Typography>LinkedIn: {data.personalInfo.linkedin}</Typography>
          )}
        </Box>

        {/* Objetivo */}
        {data?.personalInfo?.objective && (
          <>
            <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', mt: 3 }}>
              Objetivo Profissional
            </Typography>
            <Typography paragraph>{data.personalInfo.objective}</Typography>
          </>
        )}

        {/* Experiência */}
        <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', mt: 3 }}>
          Experiência Profissional
        </Typography>
        {sortByDate(data?.experience || []).map((exp, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {exp.company} - {exp.position}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
            </Typography>
            <Typography>{exp.description}</Typography>
          </Box>
        ))}

        {/* Educação */}
        <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', mt: 3 }}>
          Educação
        </Typography>
        {(data?.education || []).map((edu, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {edu.course}
            </Typography>
            <Typography variant="body2">
              {edu.institution} ({formatDate(edu.startDate)} - {formatDate(edu.endDate)})
            </Typography>
            <Typography>{edu.description}</Typography>
          </Box>
        ))}

        {/* Habilidades */}
        <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', mt: 3 }}>
          Habilidades
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {(data?.skills || []).map((skill, index) => (
            <Typography key={index} component="span" sx={{
              bgcolor: '#e3f2fd',
              px: 2,
              py: 0.5,
              borderRadius: 1
            }}>
              {skill}
            </Typography>
          ))}
        </Box>
      </Paper>

      <Box sx={{ textAlign: 'center', mb: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button onClick={onBack} variant="outlined" color="primary" size="large">
          Voltar e Editar
        </Button>
        <Button
          onClick={onPrint}
          variant="contained" 
          color="primary"
          size="large"
          disabled={isGenerating}
        >
          Gerar PDF
        </Button>
      </Box>

      <Backdrop open={isGenerating}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress color="inherit" />
          <Typography sx={{ mt: 2, color: 'white' }}>
            Gerando PDF...
          </Typography>
        </Box>
      </Backdrop>
    </>
  );
});

const Template1Wrapper = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
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

  const handlePrint = () => {
    window.print();
  };

  return (
    <Template1
      {...props}
      data={data}
      onBack={handleBack}
      onPrint={handlePrint}
    />
  );
};

export default Template1Wrapper;
