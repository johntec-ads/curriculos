import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, CardMedia, Box, Dialog, DialogContent } from '@mui/material';
import { templates, getTemplateById } from '../templates';

// Dados fictícios para visualização
const fakeData = {
  personalInfo: {
    name: 'Maria da Silva',
    email: 'maria@email.com',
    phone: '(11) 99999-8888',
    address: 'Rua Exemplo, 123, São Paulo - SP',
    linkedin: 'linkedin.com/in/mariasilva',
    objective: 'Busco uma posição de destaque na área de tecnologia.',
    photoUrl: ''
  },
  education: [
    {
      institution: 'Universidade Exemplo',
      course: 'Análise e Desenvolvimento de Sistemas',
      startDate: '2019-01-01',
      endDate: '2022-12-01',
      description: 'Formação sólida em desenvolvimento de software.'
    }
  ],
  experience: [
    {
      company: 'Empresa Tech',
      position: 'Desenvolvedora Frontend',
      startDate: '2023-01-01',
      endDate: '',
      description: 'Atuação com React, JavaScript e integração com APIs.'
    }
  ],
  skills: ['JavaScript', 'React', 'CSS', 'Git'],
  languages: ['Português', 'Inglês']
};

function ChooseTemplate() {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleSelectTemplate = (templateId) => {
    navigate(`/create?template=${templateId}`);
  };

  const handleOpenPreview = (template) => {
    setSelectedTemplate(template);
  };

  const handleClosePreview = () => {
    setSelectedTemplate(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
        Escolha um Modelo de Currículo
      </Typography>
      <Box sx={{ px: { xs: 0, sm: 1, md: 2 } }}>
        <Grid container spacing={3}>
          {templates.map((template) => (
            <Grid item xs={12} sm={6} md={4} key={template.id}>
              <Card sx={{
                height: 420,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0px 3px 6px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0px 6px 12px rgba(0,0,0,0.2)'
                }
              }}>
                <Box sx={{
                  width: '100%',
                  height: 160,
                  overflow: 'hidden',
                  bgcolor: '#f5f5f5',
                  borderBottom: '1px solid #eee',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <CardMedia
                    component="img"
                    image={template.thumbnail}
                    alt={`Preview do ${template.name}`}
                    sx={{
                      width: 'auto',
                      height: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      bgcolor: '#f5f5f5'
                    }}
                  />
                </Box>
                <CardContent sx={{
                  flexGrow: 1,
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  minHeight: 80
                }}>
                  <Typography variant="h6" component="h2" align="center" gutterBottom sx={{
                    fontWeight: 'bold',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {template.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center" sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    height: '2.5em'
                  }}>
                    {template.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{
                  justifyContent: 'center',
                  p: 2,
                  pt: 0,
                  borderTop: '1px solid #f0f0f0',
                  mt: 'auto'
                }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSelectTemplate(template.id)}
                    aria-label={`Selecionar modelo ${template.name}`}
                    sx={{ minWidth: 100 }}
                  >
                    Selecionar
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleOpenPreview(template)}
                    aria-label={`Visualizar modelo ${template.name}`}
                    sx={{ minWidth: 100, ml: 1 }}
                  >
                    Visualizar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Modal de Visualização */}
      {selectedTemplate && (
        <Dialog open={!!selectedTemplate} onClose={handleClosePreview} maxWidth="md" fullWidth>
          <DialogContent>
            <Typography variant="h5" align="center" gutterBottom>
              {selectedTemplate.name}
            </Typography>
            {/* Renderização do template real com dados fictícios */}
            {(() => {
              const TemplateComponent = getTemplateById(selectedTemplate.id)?.component;
              if (TemplateComponent) {
                return (
                  <Box sx={{ my: 2 }}>
                    <TemplateComponent data={fakeData} onBack={() => {}} onPrint={() => {}} isGenerating={false} />
                  </Box>
                );
              }
              return (
                <img
                  src={selectedTemplate.thumbnail}
                  alt={`Preview do ${selectedTemplate.name}`}
                  style={{ width: '100%', borderRadius: '8px' }}
                />
              );
            })()}
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              {selectedTemplate.description}
            </Typography>
          </DialogContent>
        </Dialog>
      )}
    </Container>
  );
}

export default ChooseTemplate;