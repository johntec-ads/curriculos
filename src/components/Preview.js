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
        <Typography variant="h4" gutterBottom>
          {curriculumData.personalInfo.name}
        </Typography>
        
        {/* Resto do template do currículo aqui */}
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