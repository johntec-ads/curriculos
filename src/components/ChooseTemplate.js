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
            <Card sx={{ height: 420, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
              <CardMedia
                component="img"
                image={template.thumbnail}
                alt={`Preview do ${template.name}`}
                sx={{
                  height: 180,
                  width: '100%',
                  objectFit: 'cover',
                  bgcolor: '#f5f5f5',
                  borderBottom: '1px solid #eee',
                  flexShrink: 0
                }}
              />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: 100, maxHeight: 120, overflow: 'hidden' }}>
                <Typography variant="h5" component="div" align="center" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
                  {template.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', maxHeight: 40 }}>
                  {template.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', mt: 'auto' }}>
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