import React, { useState, useRef, useEffect } from 'react';
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
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
  useMediaQuery,
  useTheme,
  Paper,
  Tooltip,
  Stack,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getTemplateById, templates } from '../templates';
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ShareIcon from '@mui/icons-material/Share';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PrintIcon from '@mui/icons-material/Print';
import { generateHighQualityPDF } from '../utils/pdfGeneratorFinal';

const Preview = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const printRef = useRef(null);
  const [curriculumData, setCurriculumData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('template1');
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [printError, setPrintError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [zoomLevel, setZoomLevel] = useState(isMobile ? 0.6 : isTablet ? 0.8 : 1);
  const [shareMenuAnchor, setShareMenuAnchor] = useState(null);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) - 32;
    const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) * 0.7;
    const widthRatio = viewportWidth / 794;
    const heightRatio = viewportHeight / 1123;
    const idealZoom = Math.min(widthRatio, heightRatio, 1);
    setZoomLevel(Math.max(idealZoom * 0.9, 0.4));
  }, [isMobile, isTablet]);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.3));
  };

  const handleResetZoom = () => {
    const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) - 32;
    const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) * 0.7;
    const widthRatio = viewportWidth / 794;
    const heightRatio = viewportHeight / 1123;
    const idealZoom = Math.min(widthRatio, heightRatio, 1);
    setZoomLevel(Math.max(idealZoom * 0.9, 0.4));
  };

  useEffect(() => {
    const data = localStorage.getItem('curriculumData');
    const queryParams = new URLSearchParams(window.location.search);
    const sharedData = queryParams.get('shared');

    if (sharedData) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(atob(sharedData)));
        setCurriculumData(decodedData);
        setSelectedTemplate(decodedData.template || 'template1');
        localStorage.setItem('curriculumData', JSON.stringify(decodedData));
      } catch (error) {
        console.error('Erro ao decodificar dados compartilhados:', error);
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

  // Função para gerar PDF
  const handleGeneratePDF = async () => {
    if (!printRef.current) return;
    
    setIsGeneratingPdf(true);
    setPrintError(null);

    try {
      const filename = `Curriculo_${curriculumData?.personalInfo?.name?.replace(/\s+/g, '_') || 'Novo'}.pdf`;
      
      // Usar diretamente o elemento visível na tela (não o oculto)
      // Vamos pegar o conteúdo renderizado dentro do Paper de visualização
      const visibleContent = document.querySelector('.curriculum-preview-content');
      const elementToCapture = visibleContent || printRef.current;
      
      await generateHighQualityPDF(elementToCapture, filename, {
        scale: 2,
        quality: 0.92,
        onProgress: (percent, message) => {
          console.log(`${percent}% - ${message}`);
        }
      });

      setSnackbarMessage("PDF gerado com sucesso!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      setPrintError(error.message || 'Erro ao gerar o PDF');
      setSnackbarMessage("Erro ao gerar o PDF. Tente novamente.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Função para compartilhar
  const handleShare = (event) => {
    setShareMenuAnchor(event.currentTarget);
  };

  const handleCloseShareMenu = () => {
    setShareMenuAnchor(null);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = async () => {
    try {
      const encodedData = btoa(encodeURIComponent(JSON.stringify(curriculumData)));
      const shareUrl = `${window.location.origin}/preview?shared=${encodedData}`;
      
      await navigator.clipboard.writeText(shareUrl);
      
      setSnackbarMessage("Link copiado para a área de transferência!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      handleCloseShareMenu();
    } catch (error) {
      console.error("Erro ao copiar link:", error);
      setSnackbarMessage("Erro ao copiar link.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleShareWhatsApp = () => {
    (async () => {
      handleCloseShareMenu();
      if (!printRef.current) {
        setSnackbarMessage('Conteúdo do currículo não disponível para compartilhamento.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return;
      }

      setIsGeneratingPdf(true);
      const element = printRef.current;
      // Tornar o elemento visível para captura (mesma técnica usada em handleGeneratePDF)
      const previousStyles = {
        visibility: element.style.visibility,
        position: element.style.position,
        left: element.style.left,
        top: element.style.top,
        zIndex: element.style.zIndex,
        pointerEvents: element.style.pointerEvents
      };

      try {
        const filename = `Curriculo_${curriculumData?.personalInfo?.name || 'Novo'}.pdf`;

        element.style.visibility = 'visible';
        element.style.position = 'fixed';
        element.style.left = '0';
        element.style.top = '0';
        element.style.zIndex = '9999';
        element.style.pointerEvents = 'auto';

        // Aguardar breve momento para reflow/render
        await new Promise(resolve => setTimeout(resolve, 150));

        // Gerar PDF como Blob em memória
        const pdfBlob = await generateHighQualityPDF(element, filename, {
          scale: 2,
          quality: 0.9,
          margin: 10,
          returnBlob: true,
          onProgress: (p, msg) => console.log(p, msg)
        });

        const file = new File([pdfBlob], filename, { type: 'application/pdf' });

        // Tenta usar Web Share API com arquivos (apenas em ambientes suportados, normalmente mobile)
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({ files: [file], title: `Currículo - ${curriculumData?.personalInfo?.name || ''}`, text: 'Segue meu currículo em anexo.' });
            setSnackbarMessage('Compartilhamento concluído!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            return;
          } catch (err) {
            console.warn('Falha ao usar navigator.share com arquivos:', err);
            // cair para fallback
          }
        }

        // Se Web Share com arquivos não estiver disponível, tentar abrir o WhatsApp Web com link
        // Primeiro oferecemos o download do PDF para o usuário enviar manualmente
        const url = URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);

        setSnackbarMessage('PDF gerado e baixado. Envie o arquivo manualmente pelo WhatsApp.');
        setSnackbarSeverity('info');
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Erro ao compartilhar no WhatsApp:', error);
        setSnackbarMessage('Erro ao gerar/compartilhar o PDF.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      } finally {
        // Restaurar estilos do elemento de impressão
        try {
          element.style.visibility = previousStyles.visibility || 'hidden';
          element.style.position = previousStyles.position || 'fixed';
          element.style.left = previousStyles.left || '0';
          element.style.top = previousStyles.top || '0';
          element.style.zIndex = previousStyles.zIndex || '-1';
          element.style.pointerEvents = previousStyles.pointerEvents || 'none';
        } catch (e) {
          // ignore
        }
        setIsGeneratingPdf(false);
      }
    })();
  };

  const handleShareEmail = () => {
    try {
      const encodedData = btoa(encodeURIComponent(JSON.stringify(curriculumData)));
      const shareUrl = `${window.location.origin}/preview?shared=${encodedData}`;
      const subject = `Currículo - ${curriculumData?.personalInfo?.name || 'Profissional'}`;
      const body = `Olá,\n\nConfira meu currículo através do link: ${shareUrl}\n\nAtenciosamente,\n${curriculumData?.personalInfo?.name || ''}`;
      const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      window.location.href = mailtoUrl;
      handleCloseShareMenu();
    } catch (error) {
      console.error("Erro ao compartilhar por email:", error);
      setSnackbarMessage("Erro ao compartilhar por email.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

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
    setSnackbarMessage("Modelo alterado com sucesso!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const templateData = getTemplateById(selectedTemplate);
  const TemplateComponent = templateData?.component;

  if (!TemplateComponent) {
    return (
      <Container maxWidth="md" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
        <Box sx={{ textAlign: 'center', py: { xs: 4, sm: 6, md: 8 } }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Carregando template...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (!curriculumData) {
    return (
      <Container maxWidth="md" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
        <Box sx={{ textAlign: 'center', py: { xs: 4, sm: 6, md: 8 } }}>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Nenhum currículo carregado
          </Typography>
          <Button
            onClick={handleBack}
            variant="contained"
            color="primary"
            size="large"
          >
            Criar Novo Currículo
          </Button>
        </Box>
      </Container>
    );
  }

  const a4WidthInPixels = 794;
  const a4HeightInPixels = 1123;

  return (
    <Container maxWidth="md" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap',           // permite quebrar multiline no mobile
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: 1, 
        mb: 2,
        mt: 1,
        backgroundColor: 'rgba(25, 118, 210, 0.08)',
        borderRadius: 1,
        py: 1,
        px: 2,
        '@media (max-width:600px)': {  // mobile
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }
      }} className="no-print">
        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          ℹ️ Esta é uma visualização exata do formato A4 do seu currículo. Use os controles de zoom para melhor visualização.
        </Typography>
      </Box>

      <Stack 
        direction="row"
        justifyContent="center" 
        alignItems="center" 
        spacing={1}
        sx={{ mb: 2 }}
        className="no-print"
      >
        <Tooltip title="Diminuir zoom">
          <IconButton onClick={handleZoomOut} color="primary" size="small">
            <ZoomOutIcon />
          </IconButton>
        </Tooltip>
        <Typography variant="body2" sx={{ 
          minWidth: '48px', 
          textAlign: 'center',
          bgcolor: 'rgba(25, 118, 210, 0.04)',
          borderRadius: 1,
          py: 0.5,
          px: 1
        }}>
          {Math.round(zoomLevel * 100)}%
        </Typography>
        <Tooltip title="Aumentar zoom">
          <IconButton onClick={handleZoomIn} color="primary" size="small">
            <ZoomInIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Ajustar à tela">
          <IconButton onClick={handleResetZoom} color="primary" size="small">
            <FullscreenIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      <Box sx={{ 
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pb: 2,
        overflow: 'hidden'
      }}>
        <Box sx={{
          width: '100%',
          maxWidth: '100%',
          overflowX: 'auto',
          overflowY: 'auto',
          display: 'flex',
          justifyContent: 'center',
          pb: 2,
          maxHeight: {
            xs: 'calc(100vh - 280px)',
            sm: 'calc(100vh - 260px)',
            md: 'calc(100vh - 240px)'
          }
        }}>
          <Paper 
            elevation={3} 
            sx={{
              margin: '0 auto',
              width: (a4WidthInPixels * zoomLevel) + 'px',
              height: (a4HeightInPixels * zoomLevel) + 'px',
              position: 'relative',
              border: '1px solid #ddd',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }}
          >
            {/* Conteúdo para visualização na tela */}
            <Box 
              className="curriculum-preview-content"
              sx={{ 
                width: a4WidthInPixels,
                height: a4HeightInPixels,
                position: 'absolute',
                top: 0,
                left: 0,
                transform: 'scale(' + zoomLevel + ')',
                transformOrigin: 'top left',
              }}>
              <TemplateComponent 
                data={curriculumData}
                isGenerating={false}
              />
            </Box>
          </Paper>
        </Box>

        {/* Elemento oculto apenas para impressão - posicionado de forma visível mas fora da viewport */}
        <Box 
          ref={printRef}
          id="print-content"
          sx={{ 
            position: 'fixed',
            left: 0,
            top: 0,
            width: '210mm',
            minHeight: '297mm',
            backgroundColor: '#ffffff',
            visibility: 'hidden',
            pointerEvents: 'none',
            zIndex: -1,
            '&.printing': {
              visibility: 'visible',
              position: 'static',
              zIndex: 9999
            }
          }}
          className="print-only"
        >
          <TemplateComponent 
            data={curriculumData}
            isGenerating={true}
          />
        </Box>
      </Box>

      <Box sx={{ 
        textAlign: 'center', 
        mb: 4, 
        mt: 3, 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2, 
        justifyContent: 'center',
        px: { xs: 2, sm: 0 }
      }} className="no-print">
        <Button 
          onClick={handleBack}
          variant="outlined" 
          color="primary"
          size="large"
          disabled={isGeneratingPdf}
          fullWidth={isMobile}
        >
          Voltar e Editar
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => setIsTemplateDialogOpen(true)}
          disabled={isGeneratingPdf}
          fullWidth={isMobile}
          sx={{ 
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2,
              backgroundColor: 'rgba(25, 118, 210, 0.04)'
            },
            fontWeight: 'medium'
          }}
        >
          Escolher Outro Modelo
        </Button>
        <Button
          onClick={handlePrint}
          variant="outlined" 
          color="secondary"
          size="large"
          disabled={isGeneratingPdf}
          fullWidth={isMobile}
          startIcon={<PrintIcon />}
          sx={{ 
            fontWeight: 'medium'
          }}
        >
          Imprimir
        </Button>
        <Button
          onClick={handleShare}
          variant="outlined" 
          color="success"
          size="large"
          disabled={isGeneratingPdf}
          fullWidth={isMobile}
          startIcon={<ShareIcon />}
          sx={{ 
            fontWeight: 'medium'
          }}
        >
          Compartilhar
        </Button>
        <Button
          onClick={handleGeneratePDF}
          variant="contained" 
          color="primary"
          size="large"
          disabled={isGeneratingPdf}
          fullWidth={isMobile}
          startIcon={<PictureAsPdfIcon />}
          sx={{ 
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(25, 118, 210, 0.25)',
            '&:hover': {
              boxShadow: '0 6px 10px rgba(25, 118, 210, 0.3)',
            }
          }}
        >
          {isGeneratingPdf ? 'Gerando PDF...' : 'Gerar PDF'}
        </Button>
      </Box>

      {/* Menu de compartilhamento */}
      <Menu
        anchorEl={shareMenuAnchor}
        open={Boolean(shareMenuAnchor)}
        onClose={handleCloseShareMenu}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        className="no-print"
      >
        <MenuItem onClick={handleCopyLink}>
          <ListItemIcon>
            <ContentCopyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copiar Link</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleShareWhatsApp}>
          <ListItemIcon>
            <WhatsAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>WhatsApp</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleShareEmail}>
          <ListItemIcon>
            <EmailIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Email</ListItemText>
        </MenuItem>
      </Menu>

      {printError && (
        <Typography color="error" align="center" sx={{ mb: 2 }}>
          {printError}
        </Typography>
      )}

      <Dialog 
        open={isTemplateDialogOpen} 
        onClose={() => setIsTemplateDialogOpen(false)}
        maxWidth="md"
        fullWidth
        className="no-print"
        sx={{
          '& .MuiDialog-paper': {
            width: '100%',
            maxWidth: { xs: '95%', sm: '80%', md: '900px' }
          }
        }}
      >
        <DialogTitle sx={{ 
          position: 'relative', 
          pr: 6,
          fontSize: { xs: '1.1rem', sm: '1.25rem' }
        }}>
          Escolha um Modelo de Currículo
          <IconButton
            aria-label="Fechar"
            onClick={() => setIsTemplateDialogOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 1, sm: 2 } }}>
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {templates.map((template) => (
              <Grid item xs={12} sm={6} md={4} key={template.id}>
                <Card 
                  sx={{ 
                    border: selectedTemplate === template.id ? '2px solid #1976d2' : '1px solid #e0e0e0',
                    transition: 'all 0.2s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: { xs: 'none', sm: 'translateY(-4px)' },
                      boxShadow: 3
                    }
                  }}
                >
                  <CardActionArea 
                    onClick={() => handleTemplateChange(template.id)}
                    sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                  >
                    <CardMedia
                      component="img"
                      height={isMobile ? "200" : "320"}
                      image={template.thumbnail}
                      alt={template.name}
                      sx={{
                        objectFit: 'contain',
                        bgcolor: '#f5f5f5',
                        filter: selectedTemplate === template.id ? 'none' : 'grayscale(40%)'
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography 
                        gutterBottom 
                        variant="h6" 
                        component="div" 
                        sx={{ 
                          color: selectedTemplate === template.id ? '#1976d2' : 'inherit',
                          fontSize: { xs: '1rem', sm: '1.25rem' }
                        }}
                      >
                        {template.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                      >
                        {template.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ 
          p: { xs: 1.5, sm: 2 }, 
          justifyContent: { xs: 'center', sm: 'space-between' },
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1, sm: 0 }
        }}>
          <Button 
            onClick={() => setIsTemplateDialogOpen(false)} 
            color="primary" 
            size="large" 
            variant="outlined"
            fullWidth={isMobile}
          >
            Cancelar
          </Button>
          <Button 
            onClick={() => setIsTemplateDialogOpen(false)} 
            color="primary" 
            size="large" 
            variant="contained"
            fullWidth={isMobile}
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ 
          vertical: 'bottom', 
          horizontal: isMobile ? 'center' : 'right' 
        }}
        className="no-print"
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity}
          variant="filled"
          sx={{
            width: '100%',
            backgroundColor: snackbarSeverity === 'success' ? theme.palette.primary.main : undefined,
            color: snackbarSeverity === 'success' ? theme.palette.primary.contrastText : undefined
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Preview;
