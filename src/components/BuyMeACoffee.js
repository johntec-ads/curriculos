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
  Tooltip
} from '@mui/material';
import CoffeeIcon from '@mui/icons-material/LocalCafe';
import CloseIcon from '@mui/icons-material/Close';
import PixIcon from '@mui/icons-material/Pix';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { QRCodeCanvas } from 'qrcode.react';

const BuyMeACoffee = () => {
  const [open, setOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const pixKey = "johntec.ads@gmail.com"; // Substitua pela sua chave PIX
  // Informações opcionais para outras formas de pagamento
  const paypalLink = "https://www.paypal.com/donate?hosted_button_id=SEUPIXAQUI"; // Substitua com seu link

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
              Quanto custa seu apoio?
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, width: '100%', flexWrap: 'wrap' }}>
              <Button variant="outlined">R$ 5</Button>
              <Button variant="contained" color="primary">R$ 10</Button>
              <Button variant="outlined">R$ 15</Button>
              <Button variant="outlined">R$ 20</Button>
            </Box>
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
              <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                <QRCodeCanvas
                  value={`pix:${pixKey}`}
                  size={150}
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"H"}
                  includeMargin={false}
                />
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Escaneie para fazer a transferência
                </Typography>
              </Box>
            </Box>
          </Box>
          
          {/* PayPal ou outros métodos */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', mb: 2 }}>
              <CreditCardIcon sx={{ mr: 1 }} /> Outras formas de pagamento
            </Typography>
            
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              href={paypalLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Doar com PayPal
            </Button>
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