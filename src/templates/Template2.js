import { forwardRef } from 'react';
import { Paper, Typography, Box, Button, Backdrop, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Template2 = forwardRef(({ data, onPrint, onBack, isGenerating }, ref) => {
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
          width: '210mm', 
          minHeight: '297mm', 
          margin: '32px auto', 
          p: 4, 
          backgroundColor: '#fff', 
          boxShadow: '0 0 10px rgba(0,0,0,0.1)', 
          position: 'relative', 
          overflow: 'hidden', 
          fontFamily: 'Arial, sans-serif' 
        }}
      >
        {/* Coluna Lateral */}
        <Box sx={{ 
          width: '240px', 
          bgcolor: '#1976d2', 
          color: 'white', 
          p: 3, 
          borderRadius: 1, 
          flexShrink: 0 
        }}>
          {/* Foto Placeholder */}
          <Box 
            sx={{
              width: 150,
              height: 150,
              borderRadius: '50%',
              backgroundColor: '#fff',
              margin: '0 auto 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography variant="body2" color="primary">Foto</Typography>
          </Box>

          {/* Informações de Contato */}
          <Typography variant="h6" gutterBottom>Contato</Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2">{data?.personalInfo?.email}</Typography>
            <Typography variant="body2">{data?.personalInfo?.phone}</Typography>
            <Typography variant="body2">{data?.personalInfo?.address}</Typography>
            {data?.personalInfo?.linkedin && (
              <Typography variant="body2">LinkedIn: {data.personalInfo.linkedin}</Typography>
            )}
          </Box>

          {/* Habilidades */}
          <Typography variant="h6" gutterBottom>Habilidades</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {data.skills.map((skill, index) => (
              <Typography key={index} variant="body2">
                • {skill}
              </Typography>
            ))}
          </Box>

          {/* Idiomas */}
          <Typography variant="h6" gutterBottom>Idiomas</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {data.languages.map((language, index) => (
              <Typography key={index} variant="body2">
                • {language}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Conteúdo Principal */}
        <Box>
          <Typography variant="h4" gutterBottom sx={{ color: '#1976d2' }}>
            {data.personalInfo.name}
          </Typography>

          {/* Objetivo */}
          {data.personalInfo.objective && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }}>
                Objetivo Profissional
              </Typography>
              <Typography>{data.personalInfo.objective}</Typography>
            </Box>
          )}

          {/* Experiência */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }}>
              Experiência Profissional
            </Typography>
            {sortByDate(data.experience).map((exp, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {exp.position}
                </Typography>
                <Typography variant="subtitle2" color="primary">
                  {exp.company}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </Typography>
                <Typography variant="body2">{exp.description}</Typography>
              </Box>
            ))}
          </Box>

          {/* Educação */}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }}>
              Educação
            </Typography>
            {data.education.map((edu, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {edu.course}
                </Typography>
                <Typography variant="subtitle2" color="primary">
                  {edu.institution}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </Typography>
                <Typography variant="body2">{edu.description}</Typography>
              </Box>
            ))}
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

export default function Template2Wrapper(props) {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Template2
      {...props}
      onBack={handleBack}
    />
  );
}
