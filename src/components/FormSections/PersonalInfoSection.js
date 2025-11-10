import { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Avatar,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slider,
  Grid,
  InputAdornment,
  Tooltip,
  Alert
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WorkIcon from '@mui/icons-material/Work';
import Cropper from 'react-easy-crop';

function PersonalInfoSection({ formik }) {
  const [photo, setPhoto] = useState(formik.values.personalInfo.photoUrl || null);
  const [showCropper, setShowCropper] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [tempPhoto, setTempPhoto] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('A foto deve ter no máximo 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempPhoto(reader.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  async function getCroppedImg(imageSrc, crop) {
    const createImage = (url) =>
      new Promise((resolve, reject) => {
        const image = new window.Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.setAttribute('crossOrigin', 'anonymous');
        image.src = url;
      });

    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height
    );

    return canvas.toDataURL('image/jpeg', 0.9);
  }

  const handleCropSave = async () => {
    if (tempPhoto && croppedAreaPixels) {
      const croppedImg = await getCroppedImg(tempPhoto, croppedAreaPixels);
      setPhoto(croppedImg);
      formik.setFieldValue('personalInfo.photoUrl', croppedImg);
      setShowCropper(false);
      setTempPhoto(null);
    }
  };

  const handleDeletePhoto = () => {
    setPhoto(null);
    formik.setFieldValue('personalInfo.photoUrl', '');
  };

  const getFieldError = (fieldName) => {
    return formik.touched.personalInfo?.[fieldName] && formik.errors.personalInfo?.[fieldName];
  };

  const getFieldHelperText = (fieldName) => {
    const error = getFieldError(fieldName);
    return error || '';
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight="bold" color="primary" sx={{ mb: 3 }}>
        Informações Pessoais
      </Typography>

      <Alert severity="success" sx={{ mb: 3 }}>
        <Typography variant="body2">
          💡 <strong>Dica profissional:</strong> Use uma foto profissional com fundo neutro e roupas adequadas.
          Evite selfies ou fotos com outras pessoas.
        </Typography>
      </Alert>

      {/* Seção de Foto */}
      <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar
          src={photo}
          sx={{
            width: 150,
            height: 150,
            mb: 2,
            border: '4px solid',
            borderColor: 'primary.light',
            boxShadow: 3
          }}
        >
          <PersonIcon sx={{ fontSize: 80 }} />
        </Avatar>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            component="label"
            startIcon={<PhotoCameraIcon />}
            size="small"
          >
            {photo ? 'Alterar Foto' : 'Adicionar Foto'}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </Button>
          {photo && (
            <Tooltip title="Remover foto">
              <IconButton onClick={handleDeletePhoto} color="error" size="small">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
          Foto opcional • Máx. 5MB
        </Typography>
      </Box>

      {/* Dialog para cortar foto */}
      <Dialog open={showCropper} onClose={() => setShowCropper(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Ajustar Foto</DialogTitle>
        <DialogContent>
          <Box sx={{ position: 'relative', width: '100%', height: 400, mb: 3 }}>
            {tempPhoto && (
              <Cropper
                image={tempPhoto}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            )}
          </Box>
          <Box sx={{ px: 2 }}>
            <Typography gutterBottom>Zoom</Typography>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(e, zoom) => setZoom(zoom)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCropper(false)}>Cancelar</Button>
          <Button onClick={handleCropSave} variant="contained">
            Aplicar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Campos do formulário */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nome Completo"
            name="personalInfo.name"
            value={formik.values.personalInfo.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!getFieldError('name')}
            helperText={getFieldHelperText('name') || 'Digite seu nome completo como aparece em documentos'}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Email"
            name="personalInfo.email"
            type="email"
            value={formik.values.personalInfo.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!getFieldError('email')}
            helperText={getFieldHelperText('email') || 'Use um email profissional'}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Telefone"
            name="personalInfo.phone"
            value={formik.values.personalInfo.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!getFieldError('phone')}
            helperText={getFieldHelperText('phone') || '(11) 99999-9999'}
            required
            placeholder="(11) 99999-9999"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Endereço"
            name="personalInfo.address"
            value={formik.values.personalInfo.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!getFieldError('address')}
            helperText={getFieldHelperText('address') || 'Cidade, Estado (ex: São Paulo, SP)'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="LinkedIn"
            name="personalInfo.linkedin"
            value={formik.values.personalInfo.linkedin}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!getFieldError('linkedin')}
            helperText={getFieldHelperText('linkedin') || 'linkedin.com/in/seu-perfil (opcional)'}
            placeholder="linkedin.com/in/seu-perfil"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkedInIcon />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Objetivo Profissional"
            name="personalInfo.objective"
            value={formik.values.personalInfo.objective}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!getFieldError('objective')}
            helperText={
              getFieldHelperText('objective') ||
              `Descreva brevemente sua trajetória e objetivos (${formik.values.personalInfo.objective?.length || 0}/500)`
            }
            multiline
            rows={4}
            placeholder="Ex: Profissional com 5 anos de experiência em desenvolvimento web, buscando oportunidades para contribuir com projetos inovadores..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 2 }}>
                  <WorkIcon />
                </InputAdornment>
              )
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default PersonalInfoSection;
