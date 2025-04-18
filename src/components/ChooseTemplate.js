import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, CardMedia, Box } from '@mui/material';
import { templates } from '../templates';

function ChooseTemplate() {
  const navigate = useNavigate();

  const handleSelectTemplate = (templateId) => {
    navigate(`/create?template=${templateId}`);
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
                  height: 280,
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
                      width: '100%',
                      height: '100%',
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
                    fullWidth
                  >
                    Selecionar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default ChooseTemplate;