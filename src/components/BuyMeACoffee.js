import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Box,
  Typography,
  Divider,
  TextField,
  Tooltip,
  Paper
} from '@mui/material';
import CoffeeIcon from '@mui/icons-material/LocalCafe';
import CloseIcon from '@mui/icons-material/Close';
import PixIcon from '@mui/icons-material/Pix';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { QRCodeCanvas } from 'qrcode.react';

const BuyMeACoffee = () => {
  const [open, setOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);
  const pixKey = "johntec.ads@gmail.com"; // Chave PIX (email)
  
  // Formatação correta da chave PIX para QR Code
  const getPixQRCode = () => {
    return `PIX:${pixKey}`;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCopySuccess('');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopySuccess('Copiado!');
        setTimeout(() => setCopySuccess(''), 2000);
      },
      () => {
        setCopySuccess('Falha ao copiar');
      }
    );
  };

  const handleValueSelection = (value) => {
    setSelectedValue(value);
  };

  return (
    <>
      <Tooltip title="Ofereça um cafezinho para o desenvolvedor">
        <IconButton 
          onClick={handleClickOpen} 
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            bgcolor: 'white',
            boxShadow: 2,
            '&:hover': {
              bgcolor: '#f5f5f5',
            },
            zIndex: 1000
          }}
        >
          <CoffeeIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="coffee-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="coffee-dialog-title">
          Pague-me um Cafezinho
          <IconButton
            aria-label="close"
            onClick={handleClose}
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
        <DialogContent>
          <DialogContentText>
            Este gerador de currículos é completamente gratuito e sem anúncios.
            Se ele foi útil para você, considere pagar um cafezinho para apoiar o desenvolvimento.
          </DialogContentText>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 3 }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
              Quanto deseja contribuir?
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, width: '100%', flexWrap: 'wrap' }}>
              <Button 
                variant={selectedValue === 5 ? "contained" : "outlined"}
                onClick={() => handleValueSelection(5)}
              >
                R$ 5
              </Button>
              <Button 
                variant={selectedValue === 10 ? "contained" : "outlined"}
                onClick={() => handleValueSelection(10)}
              >
                R$ 10
              </Button>
              <Button 
                variant={selectedValue === 15 ? "contained" : "outlined"}
                onClick={() => handleValueSelection(15)}
              >
                R$ 15
              </Button>
              <Button 
                variant={selectedValue === 20 ? "contained" : "outlined"}
                onClick={() => handleValueSelection(20)}
              >
                R$ 20
              </Button>
            </Box>
            {selectedValue && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Sua contribuição de R$ {selectedValue},00 é muito apreciada!
              </Typography>
            )}
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          {/* PIX */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', mb: 1 }}>
              <PixIcon sx={{ mr: 1 }} /> Transferência PIX
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                value={pixKey}
                InputProps={{
                  readOnly: true,
                }}
              />
              <Tooltip title={copySuccess || "Copiar chave PIX"}>
                <IconButton onClick={() => copyToClipboard(pixKey)}>
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <Paper elevation={1} sx={{ textAlign: 'center', p: 2, borderRadius: 1 }}>
                <QRCodeCanvas
                  id="pix-qrcode"
                  value={getPixQRCode()} // Usando o formato correto com prefixo PIX
                  size={180}
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"H"}
                  includeMargin={true}
                />
                <Typography variant="caption" display="block" sx={{ mt: 1, fontWeight: 'medium' }}>
                  Escaneie ou copie a chave PIX acima
                </Typography>
                {selectedValue && (
                  <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                    Valor sugerido: R$ {selectedValue},00
                  </Typography>
                )}
              </Paper>
            </Box>
            
            <Box sx={{ textAlign: 'center', my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                1. Abra o aplicativo do seu banco<br />
                2. Escolha a opção PIX<br />
                3. Use o QR code ou copie a chave acima<br />
                4. Informe o valor que deseja contribuir
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Sua contribuição ajuda a manter este projeto disponível e gratuito para todos.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BuyMeACoffee;