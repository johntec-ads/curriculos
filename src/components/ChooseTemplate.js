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
  DialogActions,
  IconButton,
  Snackbar,
  Alert,
  useMediaQuery,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { templates } from '../templates';
import { useAuth } from '../context/AuthContext';
import Authentication from './Authentication';

function ChooseTemplate() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
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
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3, md: 4 }, px: { xs: 2, sm: 3, md: 4 } }}>
      <Typography 
        variant="h4" 
        align="center" 
        gutterBottom 
        sx={{ 
          mb: { xs: 2, sm: 3, md: 4 },
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
        }}
      >
        Escolha um Modelo de Currículo
      </Typography>
      <Box sx={{ px: { xs: 0, sm: 1, md: 2 } }}>
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {templates.map((template) => (
            <Grid item xs={12} sm={6} md={4} key={template.id}>
              <Card sx={{
                height: { xs: 'auto', sm: 400, md: 420 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0px 3px 6px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: { xs: 'none', sm: 'scale(1.03)', md: 'scale(1.05)' },
                  boxShadow: { xs: '0px 3px 6px rgba(0,0,0,0.1)', sm: '0px 6px 12px rgba(0,0,0,0.2)' }
                }
              }}>
                <Box sx={{
                  width: '100%',
                  height: { xs: 200, sm: 250, md: 280 },
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
                  p: { xs: 1.5, sm: 2 },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  minHeight: { xs: 70, sm: 80 }
                }}>
                  <Typography 
                    variant="h6" 
                    component="h2" 
                    align="center" 
                    gutterBottom 
                    sx={{
                      fontWeight: 'bold',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                      fontSize: { xs: '1.1rem', sm: '1.25rem' }
                    }}
                  >
                    {template.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    align="center" 
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      height: { xs: '2.6em', sm: '2.5em' },
                      fontSize: { xs: '0.85rem', sm: '0.875rem' }
                    }}
                  >
                    {template.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{
                  justifyContent: 'center',
                  p: { xs: 1.5, sm: 2 },
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
                    size={isMobile ? "medium" : "large"}
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
        sx={{
          '& .MuiDialog-paper': {
            width: '100%',
            maxWidth: { xs: '95%', sm: '90%', md: '900px' },
            margin: { xs: '10px', sm: '16px', md: '32px' }
          }
        }}
      >
        <DialogContent sx={{ 
          p: { xs: 1, sm: 1, md: 1 }, 
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
              right: { xs: 4, sm: 8 },
              top: { xs: 4, sm: 8 },
              color: (theme) => theme.palette.grey[500],
              bgcolor: 'rgba(255,255,255,0.8)',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,1)',
              },
              zIndex: 10
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box 
            component="img"
            src={selectedImage}
            alt="Visualização ampliada do modelo de currículo"
            sx={{
              maxHeight: { xs: '70vh', sm: '80vh' },
              maxWidth: '100%',
              objectFit: 'contain'
            }}
          />
        </DialogContent>
        <DialogActions sx={{ 
          justifyContent: 'center', 
          py: { xs: 1.5, sm: 2 }, 
          bgcolor: 'rgba(0,0,0,0.03)',
          px: { xs: 1, sm: 2 }
        }}>
          <Button 
            variant="contained" 
            onClick={handleCloseImage} 
            color="primary"
            sx={{ 
              minWidth: { xs: 100, sm: 120 },
              width: isMobile ? "100%" : "auto"
            }}
          >
            Fechar
          </Button>
        </DialogActions>
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
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ 
          vertical: 'bottom', 
          horizontal: isMobile ? 'center' : 'right' 
        }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity}
          variant="filled"
          sx={{
            width: '100%',
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default ChooseTemplate;