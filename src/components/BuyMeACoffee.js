import React, { useState, useEffect } from 'react';
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
  Paper,
  CircularProgress,
} from '@mui/material';
import CoffeeIcon from '@mui/icons-material/LocalCafe';
import CloseIcon from '@mui/icons-material/Close';
import PixIcon from '@mui/icons-material/Pix';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const BuyMeACoffee = () => {
  const [open, setOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Usando nome mais genérico e apenas primeiro nome para maior privacidade
  const pixKey = 'johntec.ads@gmail.com';
  const receiverName = 'John - Desenvolvedor'; // Nome mais genérico
  const city = 'PR'; // Apenas estado, sem cidade específica

  // Gera URL para o QR Code PIX usando o serviço externo
  useEffect(() => {
    if (open && selectedValue) {
      setIsLoading(true);

      // Parâmetros para o QR Code PIX
      const params = new URLSearchParams({
        nome: receiverName,
        cidade: city,
        valor: selectedValue.toFixed(2),
        saida: 'qr',
        chave: pixKey,
        mensagem: 'Doação - Gerador de Currículos',
      });

      // URL do serviço externo que gera QR codes PIX
      const qrUrl = `https://gerarqrcodepix.com.br/api/v1/?${params.toString()}`;
      setQrCodeUrl(qrUrl);
      setIsLoading(false);
    }
  }, [open, selectedValue]);

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
            '@keyframes pulse': {
              '0%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.1)' },
              '100%': { transform: 'scale(1)' },
            },
            animation: 'pulse 2s infinite',
            zIndex: 1000,
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
          Apoie este Projeto
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
            Se ele foi útil para você, considere fazer uma contribuição para
            apoiar o desenvolvimento.
          </DialogContentText>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              my: 3,
            }}
          >
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
              Quanto deseja contribuir?
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                width: '100%',
                flexWrap: 'wrap',
              }}
            >
              <Button
                variant={selectedValue === 5 ? 'contained' : 'outlined'}
                onClick={() => handleValueSelection(5)}
              >
                R$ 5
              </Button>
              <Button
                variant={selectedValue === 10 ? 'contained' : 'outlined'}
                onClick={() => handleValueSelection(10)}
              >
                R$ 10
              </Button>
              <Button
                variant={selectedValue === 15 ? 'contained' : 'outlined'}
                onClick={() => handleValueSelection(15)}
              >
                R$ 15
              </Button>
              <Button
                variant={selectedValue === 20 ? 'contained' : 'outlined'}
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
            <Typography
              variant="subtitle1"
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontWeight: 'bold',
                mb: 1,
              }}
            >
              <PixIcon sx={{ mr: 1 }} /> Transferência PIX
            </Typography>

            <Box sx={{ textAlign: 'center', my: 2 }}>
              <Typography variant="body1" fontWeight="medium">
                Escolha um valor acima e use um dos métodos abaixo:
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                my: 2,
              }}
            >
              <Typography variant="body1" fontWeight="medium" sx={{ mb: 1 }}>
                Método 1: QR Code PIX
              </Typography>

              <Paper
                elevation={1}
                sx={{
                  textAlign: 'center',
                  p: 2,
                  borderRadius: 1,
                  minHeight: 200,
                  width: '100%',
                  maxWidth: 250,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {isLoading ? (
                  <CircularProgress size={60} />
                ) : selectedValue ? (
                  <Box>
                    <img
                      src={qrCodeUrl}
                      alt="QR Code PIX"
                      style={{ width: 180, height: 180 }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        e.target.parentNode.innerHTML +=
                          '<Typography color="error">Não foi possível carregar o QR Code. Por favor, use a chave PIX abaixo.</Typography>';
                      }}
                    />
                    <Typography
                      variant="caption"
                      display="block"
                      sx={{ mt: 1 }}
                    >
                      <strong>Destinatário:</strong> Desenvolvedor
                    </Typography>
                    <Typography variant="caption" display="block">
                      <strong>Valor:</strong> R$ {selectedValue},00
                    </Typography>
                  </Box>
                ) : (
                  <Typography color="text.secondary">
                    Selecione um valor acima para gerar o QR Code
                  </Typography>
                )}
              </Paper>
            </Box>

            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                ou
              </Typography>
            </Divider>

            <Box sx={{ textAlign: 'center', my: 2 }}>
              <Typography variant="body1" fontWeight="medium" sx={{ mb: 1 }}>
                Método 2: Chave PIX manual
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                value={pixKey}
                InputProps={{
                  readOnly: true,
                }}
              />
              <Tooltip title={copySuccess || 'Copiar chave PIX'}>
                <IconButton onClick={() => copyToClipboard(pixKey)}>
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>

            <Box
              sx={{
                textAlign: 'center',
                my: 3,
                p: 2,
                bgcolor: '#f8f9fa',
                borderRadius: 1,
              }}
            >
              <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
                Como fazer sua contribuição:
              </Typography>
              <Typography
                variant="body2"
                align="left"
                component="div"
                sx={{ maxWidth: 400, margin: '0 auto' }}
              >
                1. Abra o aplicativo do seu banco
                <br />
                2. Escolha a opção de pagamento via PIX
                <br />
                3. Escaneie o QR Code acima ou copie e cole a chave PIX
                <br />
                4. Confira o valor e os dados do recebedor
                <br />
                5. Conclua a transferência
              </Typography>
            </Box>

            {/* Card com informações mais genéricas */}
            <Box
              sx={{
                textAlign: 'center',
                p: 2,
                bgcolor: '#e3f2fd',
                borderRadius: 1,
                mt: 2,
              }}
            >
              <Typography variant="body2" fontWeight="medium" color="primary">
                Sua contribuição
              </Typography>
              <Typography variant="body2">
                Ao fazer uma doação, você ajuda a manter este gerador de
                currículos disponível gratuitamente para todos.
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Obrigado por apoiar desenvolvedores independentes!
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
