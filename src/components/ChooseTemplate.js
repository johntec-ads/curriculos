import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, CardMedia } from '@mui/material';
import { templates } from '../templates';

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
                image={template.thumbnail}
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
                <Button size="small" onClick={() => handleSelectTemplate(template.id)} aria-label={`Selecionar modelo ${template.name}`}>
                  Selecionar
                </Button>
                <Button size="small" onClick={() => navigate(`/${template.id}`)} aria-label={`Visualizar modelo ${template.name}`}>
                  Visualizar
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