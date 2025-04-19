import { Link } from 'react-router-dom';
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
  Divider,
  Paper
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import { QRCodeCanvas } from 'qrcode.react';
import { useState } from 'react';

function Home() {
  // Estados para compartilhamento
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const appUrl = window.location.origin;
  
  // Funções para compartilhamento
  const handleShareDialogOpen = () => {
    setIsShareDialogOpen(true);
  };
  
  const handleShareDialogClose = () => {
    setIsShareDialogOpen(false);
  };
  
  const handleCopyToClipboard = () => {
    try {
      navigator.clipboard.writeText(appUrl);
      setSnackbarMessage("Link copiado para a área de transferência!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Erro ao copiar o link");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  
  // Funções para compartilhamento em redes sociais
  const shareToWhatsApp = () => {
    const text = `Confira esta ferramenta gratuita para criar currículos profissionais: ${appUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(appUrl)}`, '_blank');
  };

  const shareToTwitter = () => {
    const text = `Crie currículos profissionais gratuitamente com esta ferramenta online: ${appUrl}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(appUrl)}`, '_blank');
  };

  const shareByEmail = () => {
    const subject = "Ferramenta gratuita para criar currículos";
    const body = `Olá,\n\nEncontrei esta ferramenta online gratuita para criar currículos profissionais e achei que você poderia gostar.\n\nAcesse: ${appUrl}\n\nAtenciosamente.`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  
  const downloadQRCode = () => {
    const canvas = document.getElementById('app-qrcode-canvas');
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
      let downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'gerador-curriculos-qrcode.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      setSnackbarMessage("QR Code baixado com sucesso!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box 
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3
        }}
      >
        {/* Logo e Identificação */}
        <Typography 
          variant="h3" 
          sx={{ 
            color: '#1976d2',
            fontWeight: 'bold',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}
        >
          JOHNTEC.ADS
        </Typography>

        <Typography variant="h4" component="h1" gutterBottom>
          Gerador de Currículos
        </Typography>

        <Typography variant="body1" align="center" paragraph>
          Crie seu currículo profissional de forma rápida e fácil. 
          Escolha entre diversos templates e exporte em PDF.
        </Typography>

        <Button
          component={Link}
          to="/choose-template"
          variant="contained"
          color="primary"
          size="large"
          sx={{ minWidth: '200px' }}
        >
          Criar Novo Currículo
        </Button>
        
        {/* Botão de compartilhamento */}
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ShareIcon />}
          onClick={handleShareDialogOpen}
          sx={{ minWidth: '200px' }}
        >
          Compartilhar Aplicativo
        </Button>

        {/* Paper com QR Code visível na página inicial */}
        <Paper 
          elevation={2} 
          sx={{ 
            p: 3, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            mt: 2,
            width: '100%',
            maxWidth: '280px'
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 2, textAlign: 'center' }}>
            Escaneie para acessar o gerador de currículos
          </Typography>
          <QRCodeCanvas
            id="home-page-qrcode"
            value={appUrl}
            size={180}
            level="H"
            includeMargin={true}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
          />
        </Paper>

        {/* Informações de Contato */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Desenvolvido por JOHNTEC.ADS
          </Typography>
          <Typography variant="body2" color="text.secondary">
            johntec.ads@gmail.com
          </Typography>
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} Todos os direitos reservados
          </Typography>
        </Box>
      </Box>
      
      {/* Diálogo de compartilhamento */}
      <Dialog
        open={isShareDialogOpen}
        onClose={handleShareDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Compartilhar Aplicativo</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" gutterBottom>
              Compartilhe este gerador de currículos com amigos que estão procurando emprego:
            </Typography>
            <TextField
              fullWidth
              value={appUrl}
              margin="normal"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <IconButton onClick={handleCopyToClipboard} size="small">
                    <ContentCopyIcon />
                  </IconButton>
                )
              }}
            />
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="subtitle2" gutterBottom align="center">
            Compartilhar via:
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
            <Tooltip title="WhatsApp">
              <IconButton onClick={shareToWhatsApp} size="large">
                <WhatsAppIcon color="success" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Facebook">
              <IconButton onClick={shareToFacebook} size="large">
                <FacebookIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Twitter">
              <IconButton onClick={shareToTwitter} size="large">
                <TwitterIcon sx={{ color: "#1DA1F2" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="LinkedIn">
              <IconButton onClick={shareToLinkedIn} size="large">
                <LinkedInIcon sx={{ color: "#0077b5" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Email">
              <IconButton onClick={shareByEmail} size="large">
                <EmailIcon color="error" />
              </IconButton>
            </Tooltip>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="subtitle2" gutterBottom>
              Código QR
            </Typography>
            <QRCodeCanvas
              id="app-qrcode-canvas"
              value={appUrl}
              size={200}
              level="H"
              includeMargin={true}
            />
            <Button 
              variant="outlined" 
              size="small" 
              onClick={downloadQRCode}
              sx={{ mt: 2 }}
            >
              Baixar QR Code
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleShareDialogClose}>Fechar</Button>
        </DialogActions>
      </Dialog>
      
      {/* Snackbar para feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
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

export default Home;
