import { forwardRef } from 'react';
import { Paper, Typography, Box, Button, Backdrop, CircularProgress } from '@mui/material';

const Template3 = forwardRef(({ data, onPrint, onBack, isGenerating }, ref) => {
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
          position: 'relative'
        }}
      >
        {/* Cabeçalho */}
        <Box sx={{ 
          textAlign: 'center', 
          borderBottom: '2px solid #e0e0e0',
          pb: 2,
          mb: 4
        }}>
          <Typography variant="h3" sx={{ color: '#333' }}>
            {data?.personalInfo?.name || 'Nome não informado'}
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 3,
            mt: 2,
            color: '#666',
            flexWrap: 'wrap'
          }}>
            <Typography variant="body2">{data?.personalInfo?.email}</Typography>
            <Typography variant="body2">{data?.personalInfo?.phone}</Typography>
            <Typography variant="body2">{data?.personalInfo?.address}</Typography>
            {data?.personalInfo?.linkedin && (
              <Typography variant="body2">{data.personalInfo.linkedin}</Typography>
            )}
          </Box>
        </Box>

        {/* Objetivo */}
        {data.personalInfo.objective && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="body1" sx={{ textAlign: 'center', fontStyle: 'italic' }}>
              {data.personalInfo.objective}
            </Typography>
          </Box>
        )}

        {/* Grid de 2 colunas */}
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 4
        }}>
          {/* Coluna Esquerda */}
          <Box>
            {/* Experiência */}
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2,
                pb: 1,
                borderBottom: '1px solid #e0e0e0'
              }}
            >
              Experiência Profissional
            </Typography>
            {sortByDate(data.experience).map((exp, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>
                  {exp.position}
                </Typography>
                <Typography variant="subtitle2" sx={{ color: '#666' }}>
                  {exp.company}
                </Typography>
                <Typography variant="caption" sx={{ color: '#888' }}>
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {exp.description}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Coluna Direita */}
          <Box>
            {/* Educação */}
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2,
                pb: 1,
                borderBottom: '1px solid #e0e0e0'
              }}
            >
              Educação
            </Typography>
            {data.education.map((edu, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>
                  {edu.course}
                </Typography>
                <Typography variant="subtitle2" sx={{ color: '#666' }}>
                  {edu.institution}
                </Typography>
                <Typography variant="caption" sx={{ color: '#888' }}>
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </Typography>
                {edu.description && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {edu.description}
                  </Typography>
                )}
              </Box>
            ))}

            {/* Habilidades */}
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2,
                pb: 1,
                borderBottom: '1px solid #e0e0e0',
                mt: 4
              }}
            >
              Habilidades
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 1 
            }}>
              {data.skills.map((skill, index) => (
                <Box
                  key={index}
                  sx={{
                    bgcolor: '#f5f5f5',
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.875rem'
                  }}
                >
                  {skill}
                </Box>
              ))}
            </Box>
          </Box>
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

const fakeData = {
  personalInfo: {
    name: 'Carlos Souza',
    email: 'carlos.souza@email.com',
    phone: '(31) 99876-5432',
    address: 'Praça Exemplo, 789, Belo Horizonte, MG',
    linkedin: 'linkedin.com/in/carlossouza',
    objective: 'Desenvolver soluções inovadoras em engenharia de software.'
  },
  education: [
    {
      institution: 'Instituto Exemplo',
      course: 'Engenharia de Software',
      startDate: '2014-01-01',
      endDate: '2018-12-31',
      description: 'Foco em arquitetura de software e metodologias ágeis.'
    }
  ],
  experience: [
    {
      company: 'Tech Solutions',
      position: 'Engenheiro de Software',
      startDate: '2019-01-01',
      endDate: '2025-12-31',
      description: 'Desenvolvimento de sistemas escaláveis e integração de APIs.'
    }
  ],
  skills: ['Python', 'Django', 'REST APIs', 'SQL', 'AWS']
};

export default function Template3Wrapper(props) {
  return <Template3 {...props} data={fakeData} />;
}
