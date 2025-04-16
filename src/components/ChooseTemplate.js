import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, CardMedia } from '@mui/material';

const templates = [
  { id: 1, name: 'Modelo 1', description: 'Um modelo clássico e profissional.', image: '/images/template1.png' },
  { id: 2, name: 'Modelo 2', description: 'Um modelo moderno e criativo.', image: '/images/template2.png' },
  { id: 3, name: 'Modelo 3', description: 'Um modelo minimalista e elegante.', image: '/images/template3.png' },
  { id: 4, name: 'Modelo 4', description: 'Um modelo com foco em habilidades técnicas.', image: '/images/template4.png' },
  { id: 5, name: 'Modelo 5', description: 'Um modelo com design limpo e organizado.', image: '/images/template5.png' },
];

function ChooseTemplate() {
  const navigate = useNavigate();

  const handleSelectTemplate = (templateId) => {
    navigate(`/create?template=${templateId}`);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Escolha um Modelo de Currículo
      </Typography>
      <Grid container spacing={4}>
        {templates.map((template) => (
          <Grid item xs={12} sm={6} md={4} key={template.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={template.image}
                alt={`Preview do ${template.name}`}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {template.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {template.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleSelectTemplate(template.id)}>
                  Selecionar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ChooseTemplate;