import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Paper, Stack } from '@mui/material';
import { sampleCurriculumData } from '../data/sampleData';

const TestGenerator = () => {
  const navigate = useNavigate();

  const handleLoadSample = () => {
    localStorage.setItem('curriculumData', JSON.stringify(sampleCurriculumData));
    navigate('/preview');
  };

  const handleLoadLongSample = () => {
    const longData = {
      ...sampleCurriculumData,
      experience: [
        ...sampleCurriculumData.experience,
        ...sampleCurriculumData.experience,
        ...sampleCurriculumData.experience
      ],
      education: [
        ...sampleCurriculumData.education,
        ...sampleCurriculumData.education
      ]
    };
    localStorage.setItem('curriculumData', JSON.stringify(longData));
    navigate('/preview');
  };

  const handleLoadMinimalSample = () => {
    const minimalData = {
      personalInfo: sampleCurriculumData.personalInfo,
      education: [sampleCurriculumData.education[0]],
      experience: [sampleCurriculumData.experience[0]],
      skills: sampleCurriculumData.skills.slice(0, 3),
      languages: []
    };
    localStorage.setItem('curriculumData', JSON.stringify(minimalData));
    navigate('/preview');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Gerador de Testes de Currículo
        </Typography>
        <Typography variant="body1" paragraph>
          Use esta ferramenta para gerar currículos com dados fictícios e testar a visualização e geração de PDF.
        </Typography>
        
        <Stack spacing={2} direction="column">
          <Button variant="contained" color="primary" onClick={handleLoadSample}>
            Carregar Dados Padrão (1-2 páginas)
          </Button>
          <Button variant="contained" color="secondary" onClick={handleLoadLongSample}>
            Carregar Dados Longos (3+ páginas)
          </Button>
          <Button variant="outlined" onClick={handleLoadMinimalSample}>
            Carregar Dados Mínimos (1 página)
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default TestGenerator;
