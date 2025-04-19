import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  CardMedia, 
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { templates } from '../templates';
import { useAuth } from '../context/AuthContext';
import Authentication from './Authentication';

function ChooseTemplate() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const handleSelectTemplate = (templateId) => {
    if (currentUser) {
      navigate(`/create?template=${templateId}`);
    } else {
      // Se usuário não estiver logado, salvar o template selecionado e mostrar diálogo de login
      setSelectedTemplateId(templateId);
      setIsAuthDialogOpen(true);
    }
  };

  const handleOpenImage = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  const handleCloseAuthDialog = () => {
    setIsAuthDialogOpen(false);
  };

  const handleAfterLogin = () => {
    setSnackbarMessage("Login realizado com sucesso!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    
    // Após login bem-sucedido, navegar para a página de criação com o template selecionado
    if (selectedTemplateId) {
      setTimeout(() => {
        navigate(`/create?template=${selectedTemplateId}`);
      }, 1000);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                onClick={() => handleOpenImage(template.thumbnail)}
                aria-label={`Ver imagem ampliada do modelo ${template.name}`}
                >
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

      {/* Dialog para visualização ampliada da imagem */}
      <Dialog 
        open={!!selectedImage} 
        onClose={handleCloseImage}
        maxWidth="md"
        fullWidth
      >
        <DialogContent sx={{ 
          p: 1, 
          position: 'relative', 
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center',
          overflowY: 'hidden',
          bgcolor: 'rgba(0,0,0,0.03)'
        }}>
          <IconButton
            aria-label="Fechar visualização"
            onClick={handleCloseImage}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
              bgcolor: 'rgba(255,255,255,0.8)',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,1)',
              }
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box 
            component="img"
            src={selectedImage}
            alt="Visualização ampliada do modelo de currículo"
            sx={{
              maxHeight: '80vh',
              maxWidth: '100%',
              objectFit: 'contain'
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Componente de autenticação */}
      <Authentication
        open={isAuthDialogOpen}
        onClose={handleCloseAuthDialog}
        afterLogin={handleAfterLogin}
      />

      {/* Snackbar para feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default ChooseTemplate;