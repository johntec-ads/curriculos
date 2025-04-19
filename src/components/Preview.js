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
  DialogActions,
  Grid,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
  TextField,
  Snackbar,
  Alert,
  Tabs,
  Tab
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { getTemplateById, templates } from '../templates';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import { QRCodeCanvas } from 'qrcode.react';
import { useState, useRef, useEffect } from 'react';

function Preview() {
  const navigate = useNavigate();
  const printRef = useRef(null);
  const [curriculumData, setCurriculumData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('template1');
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [printError, setPrintError] = useState(null);
  
  // Estados para compartilhamento
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [qrCodeValue, setQrCodeValue] = useState(''); // Estado específico para o QR Code
  const [tabValue, setTabValue] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  
  // Gera uma URL de compartilhamento usando localStorage e base64
  const generateShareUrl = () => {
    try {
      // Cria uma cópia dos dados para evitar referências circulares
      const shareData = {...curriculumData};
      // Converte para string e depois para base64
      const encodedData = btoa(encodeURIComponent(JSON.stringify(shareData)));
      // Cria URL com os dados codificados
      const url = `${window.location.origin}/preview?shared=${encodedData}`;
      return url;
    } catch (error) {
      console.error("Erro ao gerar URL de compartilhamento:", error);
      setSnackbarMessage("Erro ao gerar link de compartilhamento");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return "";
    }
  };
  
  // Funções de compartilhamento
  const handleShareButtonClick = () => {
    // Gera a URL e atualiza os estados antes de abrir o diálogo
    const url = generateShareUrl();
    setShareUrl(url);
    setQrCodeValue(url); // O QR Code usa a mesma URL que o link
    setIsShareDialogOpen(true);
  };

  const handleCopyToClipboard = () => {
    try {
      navigator.clipboard.writeText(shareUrl);
      setSnackbarMessage("Link copiado para a área de transferência!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Erro ao copiar o link");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Compartilhamento para redes sociais
  const shareToWhatsApp = () => {
    const text = `Confira meu currículo: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareToTwitter = () => {
    const text = `Confira meu currículo profissional ${shareUrl}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareByEmail = () => {
    const subject = `Currículo de ${curriculumData.personalInfo.name}`;
    const body = `Olá,\n\nGostaria de compartilhar meu currículo com você.\n\nAcesse o link: ${shareUrl}\n\nAtenciosamente,\n${curriculumData.personalInfo.name}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Verifica se há dados compartilhados na URL
  useEffect(() => {
    const data = localStorage.getItem('curriculumData');
    const queryParams = new URLSearchParams(window.location.search);
    const sharedData = queryParams.get('shared');
    
    if (sharedData) {
      try {
        // Decodifica os dados compartilhados
        const decodedData = JSON.parse(decodeURIComponent(atob(sharedData)));
        setCurriculumData(decodedData);
        setSelectedTemplate(decodedData.template || 'template1');
        // Salva localmente para permitir edição
        localStorage.setItem('curriculumData', JSON.stringify(decodedData));
      } catch (error) {
        console.error('Erro ao decodificar dados compartilhados:', error);
        // Se falhar, tenta carregar os dados locais
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
      }
    } else if (data) {
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
    onBeforePrint: () => {
      console.log("Preparando para impressão...");
      setIsGeneratingPdf(true);
    },
    onAfterPrint: () => {
      console.log("Impressão concluída!");
      setIsGeneratingPdf(false);
    },
    onPrintError: (error) => {
      console.error("Erro de impressão:", error);
      setPrintError(error.message || 'Erro ao gerar o PDF');
      setIsGeneratingPdf(false);
    },
    removeAfterPrint: true,
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          color-adjust: exact;
          print-color-adjust: exact;
        }
        html, body {
          height: 100%;
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden;
        }
      }
    `
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

  if (!curriculumData || !TemplateComponent) {
    return (
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Carregando currículo...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      {/* Conteúdo imprimível com estilo otimizado para PDF */}
      <div style={{ display: 'none' }}>
        <div ref={printRef} style={{ position: 'relative' }}>
          <TemplateComponent 
            data={curriculumData}
            isGenerating={true}
          />
        </div>
      </div>

      {/* Versão visível para o usuário */}
      <TemplateComponent 
        data={curriculumData}
        isGenerating={false}
      />

      {/* Botões de ação */}
      <Box sx={{ textAlign: 'center', mb: 4, mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button 
          onClick={handleBack}
          variant="outlined" 
          color="primary"
          size="large"
          disabled={isGeneratingPdf}
        >
          Voltar e Editar
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          onClick={() => setIsTemplateDialogOpen(true)}
          disabled={isGeneratingPdf}
        >
          Escolher Outro Modelo
        </Button>
        <Button
          onClick={handleShareButtonClick}
          variant="outlined"
          color="info"
          size="large"
          disabled={isGeneratingPdf}
        >
          Compartilhar
        </Button>
        <Button
          onClick={handlePrint}
          variant="contained" 
          color="primary"
          size="large"
          disabled={isGeneratingPdf}
        >
          {isGeneratingPdf ? 'Gerando PDF...' : 'Gerar PDF'}
        </Button>
      </Box>

      {printError && (
        <Typography color="error" align="center" sx={{ mb: 2 }}>
          {printError}
        </Typography>
      )}

      {/* Diálogo para escolha de template */}
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

      {/* Diálogo de compartilhamento */}
      <Dialog
        open={isShareDialogOpen}
        onClose={() => setIsShareDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Compartilhar Currículo</DialogTitle>
        <DialogContent>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Link" />
            <Tab label="QR Code" />
          </Tabs>
          {tabValue === 0 && (
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                value={shareUrl}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <IconButton onClick={handleCopyToClipboard}>
                      <ContentCopyIcon />
                    </IconButton>
                  )
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                <Tooltip title="WhatsApp">
                  <IconButton onClick={shareToWhatsApp}>
                    <WhatsAppIcon color="success" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Facebook">
                  <IconButton onClick={shareToFacebook}>
                    <FacebookIcon color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Twitter">
                  <IconButton onClick={shareToTwitter}>
                    <TwitterIcon color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="LinkedIn">
                  <IconButton onClick={shareToLinkedIn}>
                    <LinkedInIcon color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Email">
                  <IconButton onClick={shareByEmail}>
                    <EmailIcon color="error" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          )}
          {tabValue === 1 && (
            <Box sx={{ textAlign: 'center', mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              {qrCodeValue ? (
                <>
                  <QRCodeCanvas 
                    value={qrCodeValue} 
                    size={256}
                    level="H"
                    includeMargin={true}
                    id="qr-code-canvas"
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                    Escaneie este código QR para visualizar o currículo
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      const canvas = document.getElementById('qr-code-canvas');
                      if (canvas) {
                        const pngUrl = canvas.toDataURL('image/png')
                          .replace('image/png', 'image/octet-stream');
                        let downloadLink = document.createElement('a');
                        downloadLink.href = pngUrl;
                        downloadLink.download = `curriculo-qrcode-${curriculumData?.personalInfo?.name || 'novo'}.png`;
                        document.body.appendChild(downloadLink);
                        downloadLink.click();
                        document.body.removeChild(downloadLink);
                      }
                    }}
                  >
                    Baixar QR Code
                  </Button>
                </>
              ) : (
                <Typography>Não foi possível gerar o QR Code</Typography>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsShareDialogOpen(false)} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Preview;
