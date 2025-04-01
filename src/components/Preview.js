import { useEffect, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Container, Paper, Typography, Button, Box } from '@mui/material';

function Preview() {
  const [curriculumData, setCurriculumData] = useState(null);
  
  useEffect(() => {
    const data = localStorage.getItem('curriculumData');
    if (data) {
      setCurriculumData(JSON.parse(data));
    }
  }, []);

  const handlePrint = useReactToPrint({
    content: () => document.getElementById('curriculum-preview'),
  });

  if (!curriculumData) return <div>Carregando...</div>;

  return (
    <Container maxWidth="md">
      <Paper 
        id="curriculum-preview" 
        sx={{ 
          p: 4, 
          mt: 4, 
          mb: 4, 
          minHeight: '297mm',
          width: '210mm',
          margin: 'auto'
        }}
      >
        {/* Cabeçalho */}
        <Typography variant="h4" gutterBottom sx={{ borderBottom: '2px solid #1976d2' }}>
          {curriculumData.personalInfo.name}
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Typography>{curriculumData.personalInfo.email}</Typography>
          <Typography>{curriculumData.personalInfo.phone}</Typography>
          <Typography>{curriculumData.personalInfo.address}</Typography>
          {curriculumData.personalInfo.linkedin && (
            <Typography>LinkedIn: {curriculumData.personalInfo.linkedin}</Typography>
          )}
        </Box>

        {/* Objetivo */}
        {curriculumData.personalInfo.objective && (
          <>
            <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', mt: 3 }}>
              Objetivo Profissional
            </Typography>
            <Typography paragraph>{curriculumData.personalInfo.objective}</Typography>
          </>
        )}

        {/* Experiência */}
        <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', mt: 3 }}>
          Experiência Profissional
        </Typography>
        {curriculumData.experience.map((exp, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {exp.company} - {exp.position}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {exp.startDate} - {exp.endDate}
            </Typography>
            <Typography>{exp.description}</Typography>
          </Box>
        ))}

        {/* Educação */}
        <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', mt: 3 }}>
          Educação
        </Typography>
        {curriculumData.education.map((edu, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {edu.course}
            </Typography>
            <Typography variant="body2">
              {edu.institution} ({edu.startDate} - {edu.endDate})
            </Typography>
            <Typography>{edu.description}</Typography>
          </Box>
        ))}

        {/* Habilidades */}
        <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', mt: 3 }}>
          Habilidades
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {curriculumData.skills.map((skill, index) => (
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
      
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Button 
          onClick={handlePrint} 
          variant="contained" 
          color="primary"
          size="large"
        >
          Imprimir/Salvar PDF
        </Button>
      </Box>
    </Container>
  );
}

export default Preview;