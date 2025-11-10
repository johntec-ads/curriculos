import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tooltip,
  Snackbar,
  Alert,
  Paper,
  Avatar,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import DescriptionIcon from '@mui/icons-material/Description';
import PaletteIcon from '@mui/icons-material/Palette';
import DownloadIcon from '@mui/icons-material/Download';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { QRCodeCanvas } from 'qrcode.react';
import Authentication from './Authentication';
import { useAuth } from '../context/AuthContext';

function Home() {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const appUrl = window.location.origin;

  const { currentUser, logout } = useAuth();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleShareDialogOpen = () => {
    setIsShareDialogOpen(true);
  };

  const handleShareDialogClose = () => {
    setIsShareDialogOpen(false);
  };

  const handleOpenAuthDialog = () => {
    setIsAuthDialogOpen(true);
  };

  const handleCloseAuthDialog = () => {
    setIsAuthDialogOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setSnackbarMessage('Logout realizado com sucesso!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Erro ao fazer logout');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(appUrl);
      setSnackbarMessage('Link copiado para a área de transferência!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Erro ao copiar link');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleShare = (platform) => {
    const text = 'Confira este gerador gratuito de currículos!';
    const url = appUrl;
    let shareUrl = '';

    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent('Gerador de Currículos')}&body=${encodeURIComponent(text + '\n\n' + url)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const features = [
    {
      icon: <DescriptionIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Criação Rápida',
      description: 'Preencha seu currículo em poucos minutos com nossa interface intuitiva.'
    },
    {
      icon: <PaletteIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
      title: 'Templates Profissionais',
      description: 'Escolha entre diversos templates modernos e profissionais.'
    },
    {
      icon: <DownloadIcon sx={{ fontSize: 40, color: 'success.main' }} />,
      title: 'Exportação em PDF',
      description: 'Baixe seu currículo em formato PDF de alta qualidade.'
    },
    {
      icon: <ShareOutlinedIcon sx={{ fontSize: 40, color: 'info.main' }} />,
      title: 'Compartilhamento Fácil',
      description: 'Compartilhe seu currículo ou o aplicativo com um clique.'
    }
  ];

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)',
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 3,
          px: 2
        }}>
          {currentUser ? (
            <Paper
              elevation={0}
              className="glass-effect"
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                borderRadius: 3,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              <Avatar
                src={currentUser.photoURL}
                sx={{
                  bgcolor: 'primary.main',
                  width: 40,
                  height: 40
                }}
              >
                {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : currentUser.email[0].toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {currentUser.displayName || 'Usuário'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {currentUser.email}
                </Typography>
              </Box>
              <Tooltip title="Sair">
                <IconButton onClick={handleLogout} size="small">
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Paper>
          ) : (
            <Button
              startIcon={<LoginIcon />}
              variant="outlined"
              onClick={handleOpenAuthDialog}
              sx={{
                color: 'white',
                borderColor: 'rgba(255,255,255,0.3)',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Entrar
            </Button>
          )}
        </Box>

        <Box sx={{
          textAlign: 'center',
          py: { xs: 8, md: 12 },
          px: 2,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease-out'
        }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 800,
              color: 'white',
              mb: 2,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            JOHNTEC<span style={{
              background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>.ADS</span>
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.5rem', md: '2.5rem' },
              fontWeight: 600,
              color: 'white',
              mb: 3,
              opacity: 0.9
            }}
          >
            Gerador de Currículos
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255,255,255,0.8)',
              mb: 4,
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            Crie currículos profissionais em minutos. Templates modernos,
            interface intuitiva e exportação em PDF de alta qualidade.
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ mb: 6 }}
          >
            <Button
              component={Link}
              to="/choose-template"
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                background: 'white',
                color: '#6366f1',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                '&:hover': {
                  background: 'rgba(255,255,255,0.9)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.3)'
                },
                transition: 'all 0.3s ease'
              }}
              className="animate-bounce-in"
            >
              Criar Currículo Agora
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<ShareIcon />}
              onClick={handleShareDialogOpen}
              sx={{
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                borderColor: 'rgba(255,255,255,0.3)',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Compartilhar
            </Button>
          </Stack>
        </Box>

        <Box sx={{ py: 8, px: 2 }}>
          <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
              mb: 6,
              fontWeight: 700,
              color: 'white'
            }}
          >
            Por que escolher nosso gerador?
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  className="hover-lift"
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    p: 3,
                    borderRadius: 4,
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    transition: 'all 0.3s ease',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transitionDelay: `${index * 0.1}s`
                  }}
                >
                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ py: 8, px: 2 }}>
          <Paper
            elevation={0}
            className="glass-effect hover-scale"
            sx={{
              p: 4,
              textAlign: 'center',
              borderRadius: 4,
              maxWidth: 400,
              mx: 'auto',
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Compartilhe com Amigos
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
              Mostre este QR code para quem precisa criar um currículo profissional
            </Typography>
            <Box sx={{
              display: 'inline-block',
              p: 2,
              bgcolor: 'white',
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
              <QRCodeCanvas
                value={appUrl}
                size={160}
                level="H"
                includeMargin={true}
              />
            </Box>
          </Paper>
        </Box>

        <Box sx={{ py: 4, textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
            Desenvolvido por JOHNTEC.ADS
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
            © {new Date().getFullYear()} Todos os direitos reservados
          </Typography>
        </Box>
      </Container>

      <Dialog
        open={isShareDialogOpen}
        onClose={handleShareDialogClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Compartilhar Aplicativo</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Compartilhe este gerador de currículos com amigos que estão procurando emprego:
          </Typography>

          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              value={appUrl}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <IconButton onClick={handleCopyLink}>
                    <ContentCopyIcon />
                  </IconButton>
                ),
              }}
              sx={{ mb: 2 }}
            />
          </Box>

          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            Compartilhar nas redes sociais:
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip
              icon={<WhatsAppIcon />}
              label="WhatsApp"
              onClick={() => handleShare('whatsapp')}
              sx={{
                '&:hover': { bgcolor: '#25d366', color: 'white' }
              }}
            />
            <Chip
              icon={<FacebookIcon />}
              label="Facebook"
              onClick={() => handleShare('facebook')}
              sx={{
                '&:hover': { bgcolor: '#1877f2', color: 'white' }
              }}
            />
            <Chip
              icon={<LinkedInIcon />}
              label="LinkedIn"
              onClick={() => handleShare('linkedin')}
              sx={{
                '&:hover': { bgcolor: '#0077b5', color: 'white' }
              }}
            />
            <Chip
              icon={<TwitterIcon />}
              label="Twitter"
              onClick={() => handleShare('twitter')}
              sx={{
                '&:hover': { bgcolor: '#1da1f2', color: 'white' }
              }}
            />
            <Chip
              icon={<EmailIcon />}
              label="Email"
              onClick={() => handleShare('email')}
              sx={{
                '&:hover': { bgcolor: '#ea4335', color: 'white' }
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleShareDialogClose}>Fechar</Button>
        </DialogActions>
      </Dialog>

      <Authentication
        open={isAuthDialogOpen}
        onClose={handleCloseAuthDialog}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Home;
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tooltip,
  Snackbar,
  Alert,
  Paper,
  Avatar,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import DescriptionIcon from '@mui/icons-material/Description';
import PaletteIcon from '@mui/icons-material/Palette';
import DownloadIcon from '@mui/icons-material/Download';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { QRCodeCanvas } from 'qrcode.react';
import Authentication from './Authentication';
import { useAuth } from '../context/AuthContext';

function Home() {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const appUrl = window.location.origin;

  const { currentUser, logout } = useAuth();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleShareDialogOpen = () => {
    setIsShareDialogOpen(true);
  };

  const handleShareDialogClose = () => {
    setIsShareDialogOpen(false);
  };

  const handleOpenAuthDialog = () => {
    setIsAuthDialogOpen(true);
  };

  const handleCloseAuthDialog = () => {
    setIsAuthDialogOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setSnackbarMessage('Logout realizado com sucesso!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Erro ao fazer logout');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(appUrl);
      setSnackbarMessage('Link copiado para a área de transferência!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Erro ao copiar link');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleShare = (platform) => {
    const text = 'Confira este gerador gratuito de currículos!';
    const url = appUrl;
    let shareUrl = '';

    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent('Gerador de Currículos')}&body=${encodeURIComponent(text + '\n\n' + url)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const features = [
    {
      icon: <DescriptionIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Criação Rápida',
      description: 'Preencha seu currículo em poucos minutos com nossa interface intuitiva.'
    },
    {
      icon: <PaletteIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
      title: 'Templates Profissionais',
      description: 'Escolha entre diversos templates modernos e profissionais.'
    },
    {
      icon: <DownloadIcon sx={{ fontSize: 40, color: 'success.main' }} />,
      title: 'Exportação em PDF',
      description: 'Baixe seu currículo em formato PDF de alta qualidade.'
    },
    {
      icon: <ShareOutlinedIcon sx={{ fontSize: 40, color: 'info.main' }} />,
      title: 'Compartilhamento Fácil',
      description: 'Compartilhe seu currículo ou o aplicativo com um clique.'
    }
  ];

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)',
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 3,
          px: 2
        }}>
          {currentUser ? (
            <Paper
              elevation={0}
              className="glass-effect"
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                borderRadius: 3,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              <Avatar
                src={currentUser.photoURL}
                sx={{
                  bgcolor: 'primary.main',
                  width: 40,
                  height: 40
                }}
              >
                {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : currentUser.email[0].toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {currentUser.displayName || 'Usuário'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {currentUser.email}
                </Typography>
              </Box>
              <Tooltip title="Sair">
                <IconButton onClick={handleLogout} size="small">
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Paper>
          ) : (
            <Button
              startIcon={<LoginIcon />}
              variant="outlined"
              onClick={handleOpenAuthDialog}
              sx={{
                color: 'white',
                borderColor: 'rgba(255,255,255,0.3)',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Entrar
            </Button>
          )}
        </Box>

        <Box sx={{
          textAlign: 'center',
          py: { xs: 8, md: 12 },
          px: 2,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease-out'
        }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 800,
              color: 'white',
              mb: 2,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            JOHNTEC<span style={{
              background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>.ADS</span>
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.5rem', md: '2.5rem' },
              fontWeight: 600,
              color: 'white',
              mb: 3,
              opacity: 0.9
            }}
          >
            Gerador de Currículos
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255,255,255,0.8)',
              mb: 4,
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            Crie currículos profissionais em minutos. Templates modernos,
            interface intuitiva e exportação em PDF de alta qualidade.
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ mb: 6 }}
          >
            <Button
              component={Link}
              to="/choose-template"
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                background: 'white',
                color: '#6366f1',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                '&:hover': {
                  background: 'rgba(255,255,255,0.9)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.3)'
                },
                transition: 'all 0.3s ease'
              }}
              className="animate-bounce-in"
            >
              Criar Currículo Agora
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<ShareIcon />}
              onClick={handleShareDialogOpen}
              sx={{
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                borderColor: 'rgba(255,255,255,0.3)',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Compartilhar
            </Button>
          </Stack>
        </Box>

        <Box sx={{ py: 8, px: 2 }}>
          <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
              mb: 6,
              fontWeight: 700,
              color: 'white'
            }}
          >
            Por que escolher nosso gerador?
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  className="hover-lift"
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    p: 3,
                    borderRadius: 4,
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    transition: 'all 0.3s ease',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transitionDelay: `${index * 0.1}s`
                  }}
                >
                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ py: 8, px: 2 }}>
          <Paper
            elevation={0}
            className="glass-effect hover-scale"
            sx={{
              p: 4,
              textAlign: 'center',
              borderRadius: 4,
              maxWidth: 400,
              mx: 'auto',
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Compartilhe com Amigos
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
              Mostre este QR code para quem precisa criar um currículo profissional
            </Typography>
            <Box sx={{
              display: 'inline-block',
              p: 2,
              bgcolor: 'white',
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
              <QRCodeCanvas
                value={appUrl}
                size={160}
                level="H"
                includeMargin={true}
              />
            </Box>
          </Paper>
        </Box>

        <Box sx={{ py: 4, textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
            Desenvolvido por JOHNTEC.ADS
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
            © {new Date().getFullYear()} Todos os direitos reservados
          </Typography>
        </Box>
      </Container>

      <Dialog
        open={isShareDialogOpen}
        onClose={handleShareDialogClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Compartilhar Aplicativo</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Compartilhe este gerador de currículos com amigos que estão procurando emprego:
          </Typography>

          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              value={appUrl}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <IconButton onClick={handleCopyLink}>
                    <ContentCopyIcon />
                  </IconButton>
                ),
              }}
              sx={{ mb: 2 }}
            />
          </Box>

          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            Compartilhar nas redes sociais:
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip
              icon={<WhatsAppIcon />}
              label="WhatsApp"
              onClick={() => handleShare('whatsapp')}
              sx={{
                '&:hover': { bgcolor: '#25d366', color: 'white' }
              }}
            />
            <Chip
              icon={<FacebookIcon />}
              label="Facebook"
              onClick={() => handleShare('facebook')}
              sx={{
                '&:hover': { bgcolor: '#1877f2', color: 'white' }
              }}
            />
            <Chip
              icon={<LinkedInIcon />}
              label="LinkedIn"
              onClick={() => handleShare('linkedin')}
              sx={{
                '&:hover': { bgcolor: '#0077b5', color: 'white' }
              }}
            />
            <Chip
              icon={<TwitterIcon />}
              label="Twitter"
              onClick={() => handleShare('twitter')}
              sx={{
                '&:hover': { bgcolor: '#1da1f2', color: 'white' }
              }}
            />
            <Chip
              icon={<EmailIcon />}
              label="Email"
              onClick={() => handleShare('email')}
              sx={{
                '&:hover': { bgcolor: '#ea4335', color: 'white' }
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleShareDialogClose}>Fechar</Button>
        </DialogActions>
      </Dialog>

      <Authentication
        open={isAuthDialogOpen}
        onClose={handleCloseAuthDialog}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Home;
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tooltip,
  Snackbar,
  Alert,
  Paper,
  Avatar,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import DescriptionIcon from '@mui/icons-material/Description';
import PaletteIcon from '@mui/icons-material/Palette';
import DownloadIcon from '@mui/icons-material/Download';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { QRCodeCanvas } from 'qrcode.react';
import Authentication from './Authentication';
import { useAuth } from '../context/AuthContext';

function Home() {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const appUrl = window.location.origin;

  const { currentUser, logout } = useAuth();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleShareDialogOpen = () => {
    setIsShareDialogOpen(true);
  };

  const handleShareDialogClose = () => {
    setIsShareDialogOpen(false);
  };

  const handleOpenAuthDialog = () => {
    setIsAuthDialogOpen(true);
  };

  const handleCloseAuthDialog = () => {
    setIsAuthDialogOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setSnackbarMessage('Logout realizado com sucesso!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Erro ao fazer logout');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(appUrl);
      setSnackbarMessage('Link copiado para a área de transferência!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Erro ao copiar link');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleShare = (platform) => {
    const text = 'Confira este gerador gratuito de currículos!';
    const url = appUrl;
    let shareUrl = '';

    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent('Gerador de Currículos')}&body=${encodeURIComponent(text + '\n\n' + url)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const features = [
    {
      icon: <DescriptionIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Criação Rápida',
      description: 'Preencha seu currículo em poucos minutos com nossa interface intuitiva.'
    },
    {
      icon: <PaletteIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
      title: 'Templates Profissionais',
      description: 'Escolha entre diversos templates modernos e profissionais.'
    },
    {
      icon: <DownloadIcon sx={{ fontSize: 40, color: 'success.main' }} />,
      title: 'Exportação em PDF',
      description: 'Baixe seu currículo em formato PDF de alta qualidade.'
    },
    {
      icon: <ShareOutlinedIcon sx={{ fontSize: 40, color: 'info.main' }} />,
      title: 'Compartilhamento Fácil',
      description: 'Compartilhe seu currículo ou o aplicativo com um clique.'
    }
  ];

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)',
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 3,
          px: 2
        }}>
          {currentUser ? (
            <Paper
              elevation={0}
              className="glass-effect"
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                borderRadius: 3,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              <Avatar
                src={currentUser.photoURL}
                sx={{
                  bgcolor: 'primary.main',
                  width: 40,
                  height: 40
                }}
              >
                {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : currentUser.email[0].toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {currentUser.displayName || 'Usuário'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {currentUser.email}
                </Typography>
              </Box>
              <Tooltip title="Sair">
                <IconButton onClick={handleLogout} size="small">
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Paper>
          ) : (
            <Button
              startIcon={<LoginIcon />}
              variant="outlined"
              onClick={handleOpenAuthDialog}
              sx={{
                color: 'white',
                borderColor: 'rgba(255,255,255,0.3)',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Entrar
            </Button>
          )}
        </Box>

        <Box sx={{
          textAlign: 'center',
          py: { xs: 8, md: 12 },
          px: 2,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease-out'
        }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 800,
              color: 'white',
              mb: 2,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            JOHNTEC<span style={{
              background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>.ADS</span>
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.5rem', md: '2.5rem' },
              fontWeight: 600,
              color: 'white',
              mb: 3,
              opacity: 0.9
            }}
          >
            Gerador de Currículos
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255,255,255,0.8)',
              mb: 4,
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            Crie currículos profissionais em minutos. Templates modernos,
            interface intuitiva e exportação em PDF de alta qualidade.
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ mb: 6 }}
          >
            <Button
              component={Link}
              to="/choose-template"
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                background: 'white',
                color: '#6366f1',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                '&:hover': {
                  background: 'rgba(255,255,255,0.9)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.3)'
                },
                transition: 'all 0.3s ease'
              }}
              className="animate-bounce-in"
            >
              Criar Currículo Agora
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<ShareIcon />}
              onClick={handleShareDialogOpen}
              sx={{
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                borderColor: 'rgba(255,255,255,0.3)',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Compartilhar
            </Button>
          </Stack>
        </Box>

        <Box sx={{ py: 8, px: 2 }}>
          <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
              mb: 6,
              fontWeight: 700,
              color: 'white'
            }}
          >
            Por que escolher nosso gerador?
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  className="hover-lift"
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    p: 3,
                    borderRadius: 4,
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    transition: 'all 0.3s ease',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transitionDelay: `${index * 0.1}s`
                  }}
                >
                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ py: 8, px: 2 }}>
          <Paper
            elevation={0}
            className="glass-effect hover-scale"
            sx={{
              p: 4,
              textAlign: 'center',
              borderRadius: 4,
              maxWidth: 400,
              mx: 'auto',
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Compartilhe com Amigos
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
              Mostre este QR code para quem precisa criar um currículo profissional
            </Typography>
            <Box sx={{
              display: 'inline-block',
              p: 2,
              bgcolor: 'white',
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
              <QRCodeCanvas
                value={appUrl}
                size={160}
                level="H"
                includeMargin={true}
              />
            </Box>
          </Paper>
        </Box>

        <Box sx={{ py: 4, textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
            Desenvolvido por JOHNTEC.ADS
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
            © {new Date().getFullYear()} Todos os direitos reservados
          </Typography>
        </Box>
      </Container>

      <Dialog
        open={isShareDialogOpen}
        onClose={handleShareDialogClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Compartilhar Aplicativo</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Compartilhe este gerador de currículos com amigos que estão procurando emprego:
          </Typography>

          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              value={appUrl}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <IconButton onClick={handleCopyLink}>
                    <ContentCopyIcon />
                  </IconButton>
                ),
              }}
              sx={{ mb: 2 }}
            />
          </Box>

          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            Compartilhar nas redes sociais:
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip
              icon={<WhatsAppIcon />}
              label="WhatsApp"
              onClick={() => handleShare('whatsapp')}
              sx={{
                '&:hover': { bgcolor: '#25d366', color: 'white' }
              }}
            />
            <Chip
              icon={<FacebookIcon />}
              label="Facebook"
              onClick={() => handleShare('facebook')}
              sx={{
                '&:hover': { bgcolor: '#1877f2', color: 'white' }
              }}
            />
            <Chip
              icon={<LinkedInIcon />}
              label="LinkedIn"
              onClick={() => handleShare('linkedin')}
              sx={{
                '&:hover': { bgcolor: '#0077b5', color: 'white' }
              }}
            />
            <Chip
              icon={<TwitterIcon />}
              label="Twitter"
              onClick={() => handleShare('twitter')}
              sx={{
                '&:hover': { bgcolor: '#1da1f2', color: 'white' }
              }}
            />
            <Chip
              icon={<EmailIcon />}
              label="Email"
              onClick={() => handleShare('email')}
              sx={{
                '&:hover': { bgcolor: '#ea4335', color: 'white' }
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleShareDialogClose}>Fechar</Button>
        </DialogActions>
      </Dialog>

      <Authentication
        open={isAuthDialogOpen}
        onClose={handleCloseAuthDialog}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Home;
