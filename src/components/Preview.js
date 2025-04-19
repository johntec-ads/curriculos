import { useEffect, useState, useRef } from 'react';
import { 
  Container, 
  Box, 
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { getTemplateById, templates } from '../templates';

function Preview() {
  const navigate = useNavigate();
  const printRef = useRef(null);
  const [curriculumData, setCurriculumData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('template1');
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('curriculumData');
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        setCurriculumData(parsedData);
        setSelectedTemplate(parsedData.template || 'template1');
      } catch (error) {
        console.error('Erro ao analisar os dados do localStorage:', error);
        alert('Os dados armazenados estão corrompidos. Por favor, reinicie o processo.');
        localStorage.removeItem('curriculumData');
      }
    }
  }, []);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `Curriculo_${curriculumData?.personalInfo?.name || 'Novo'}`,
  });

  const handleBack = () => {
    navigate('/create');
  };

  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId);
    setCurriculumData(prev => ({
      ...prev,
      template: templateId
    }));
    localStorage.setItem('curriculumData', JSON.stringify({
      ...curriculumData,
      template: templateId
    }));
    setIsTemplateDialogOpen(false);
  };

  const templateData = getTemplateById(selectedTemplate);
  const TemplateComponent = templateData?.component;

  if (!TemplateComponent) return <div>Template não encontrado</div>;

  return (
    <Container maxWidth="md">
      {/* Apenas mostramos o componente de template, sem passar as funções de botões */}
      <TemplateComponent 
        ref={printRef}
        data={curriculumData}
        isGenerating={false}
      />

      {/* Todos os botões de ação ficam aqui agora */}
      <Box sx={{ textAlign: 'center', mb: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button 
          onClick={handleBack} 
          variant="outlined" 
          color="primary" 
          size="large"
        >
          Voltar e Editar
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          onClick={() => setIsTemplateDialogOpen(true)}
        >
          Escolher Outro Modelo
        </Button>
        <Button
          onClick={handlePrint}
          variant="contained" 
          color="primary"
          size="large"
        >
          Gerar PDF
        </Button>
      </Box>

      <Dialog 
        open={isTemplateDialogOpen} 
        onClose={() => setIsTemplateDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Escolha um Modelo de Currículo</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {templates.map((template) => (
              <Grid item xs={12} sm={6} md={4} key={template.id}>
                <Card 
                  sx={{ 
                    border: selectedTemplate === template.id ? '2px solid #1976d2' : '1px solid #e0e0e0',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 3
                    }
                  }}
                >
                  <CardActionArea onClick={() => handleTemplateChange(template.id)}>
                    <CardMedia
                      component="img"
                      height="320"
                      image={template.thumbnail}
                      alt={template.name}
                      sx={{
                        objectFit: 'contain',
                        bgcolor: '#f5f5f5',
                        filter: selectedTemplate === template.id ? 'none' : 'grayscale(40%)'
                      }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div" sx={{ 
                        color: selectedTemplate === template.id ? '#1976d2' : 'inherit' 
                      }}>
                        {template.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {template.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default Preview;
