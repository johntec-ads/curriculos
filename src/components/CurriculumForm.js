import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Alert,
  Snackbar,
  Tooltip,
} from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import HomeIcon from '@mui/icons-material/Home';
import Cropper from 'react-easy-crop';
import Slider from '@mui/material/Slider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import TutorialGuide from './TutorialGuide'; // Importando o componente de tutorial

function CurriculumForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const queryParams = new URLSearchParams(location.search);
  const selectedTemplate = queryParams.get('template');

  console.log('Modelo Selecionado:', selectedTemplate);

  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      objective: '',
      photoUrl: '',
    },
    education: [
      {
        institution: '',
        course: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ],
    experience: [
      {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ],
    skills: [''],
    languages: [''],
    template: selectedTemplate || 'template1', // Adiciona o template selecionado
  });
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [photo, setPhoto] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);

  useEffect(() => {
    // Carrega dados do localStorage se existirem
    const data = localStorage.getItem('curriculumData');
    if (data) {
      try {
        const parsed = JSON.parse(data);
        setFormData((prev) => ({ ...prev, ...parsed }));
        if (parsed.personalInfo && parsed.personalInfo.photoUrl) {
          setPhoto(parsed.personalInfo.photoUrl);
        }
      } catch (e) {
        // Se der erro, ignora e segue com formulário limpo
      }
    }
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value,
      },
    }));
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
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
    return canvas.toDataURL('image/jpeg');
  }

  const handleCropSave = async () => {
    if (photo && croppedAreaPixels) {
      const croppedImg = await getCroppedImg(photo, croppedAreaPixels);
      setFormData((prev) => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          photoUrl: croppedImg,
        },
      }));
      setPhoto(croppedImg);
      setShowCropper(false);
    }
  };

  const handleEducationChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const handleSkillChange = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill, i) => (i === index ? value : skill)),
    }));
  };

  const addNewField = (section) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [
        ...prev[section],
        section === 'skills' || section === 'languages'
          ? ''
          : section === 'education'
            ? {
                institution: '',
                course: '',
                startDate: '',
                endDate: '',
                description: '',
              }
            : {
                company: '',
                position: '',
                startDate: '',
                endDate: '',
                description: '',
              },
      ],
    }));
  };

  const removeField = (section, index) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validação de campos obrigatórios
    if (!formData.personalInfo.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    if (!formData.personalInfo.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.personalInfo.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.personalInfo.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    }

    // Validação de Experiência
    formData.experience.forEach((exp, index) => {
      if (!exp.company.trim()) {
        newErrors[`experience_${index}_company`] = 'Empresa é obrigatória';
      }
      if (!exp.position.trim()) {
        newErrors[`experience_${index}_position`] = 'Cargo é obrigatório';
      }
      if (!exp.startDate) {
        newErrors[`experience_${index}_startDate`] =
          'Data de início é obrigatória';
      }
    });

    // Validação de Educação
    formData.education.forEach((edu, index) => {
      if (!edu.institution.trim()) {
        newErrors[`education_${index}_institution`] =
          'Instituição é obrigatória';
      }
      if (!edu.course.trim()) {
        newErrors[`education_${index}_course`] = 'Curso é obrigatório';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Salva o template junto com os dados
      localStorage.setItem(
        'curriculumData',
        JSON.stringify({
          ...formData,
          template: selectedTemplate || 'template1',
        })
      );
      setSnackbarMessage('Dados salvos com sucesso!');
      setSnackbarOpen(true); // Exibir feedback visual
      navigate('/preview');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Função para limpar o formulário
  const handleClearForm = () => {
    // Mantém apenas o template selecionado
    const initialFormState = {
      personalInfo: {
        name: '',
        email: '',
        phone: '',
        address: '',
        linkedin: '',
        objective: '',
        photoUrl: '',
      },
      education: [
        {
          institution: '',
          course: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
      experience: [
        {
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
      skills: [''],
      languages: [''],
      template: selectedTemplate || 'template1',
    };

    // Reseta o estado do formulário
    setFormData(initialFormState);
    setPhoto(null);
    setErrors({});

    // Remove os dados do localStorage
    localStorage.removeItem('curriculumData');

    // Mostra feedback ao usuário
    setSnackbarMessage('Formulário limpo com sucesso!');
    setSnackbarOpen(true);

    // Fecha o diálogo de confirmação
    setShowClearConfirmation(false);
  };

  // Função para abrir o diálogo de confirmação
  const openClearConfirmation = () => {
    setShowClearConfirmation(true);
  };

  // Função para fechar o diálogo de confirmação
  const closeClearConfirmation = () => {
    setShowClearConfirmation(false);
  };

  return (
    <Container maxWidth="md">
      {/* Feedback visual */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />

      {/* Diálogo de confirmação para limpar formulário */}
      <Dialog
        open={showClearConfirmation}
        onClose={closeClearConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Limpar Formulário</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja limpar todos os dados do formulário? Esta
            ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeClearConfirmation} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClearForm} color="error" autoFocus>
            Limpar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Componente de Tutorial/Dicas */}
      <TutorialGuide />

      {Object.keys(errors).length > 0 && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Por favor, corrija os erros antes de continuar
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, mb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ mb: 0 }}>
            Informações Pessoais
          </Typography>
          <Tooltip title="Voltar ao Início">
            <IconButton
              onClick={() => {
                const isDirty =
                  (formData.personalInfo &&
                    (formData.personalInfo.name ||
                      formData.personalInfo.email ||
                      formData.personalInfo.phone)) ||
                  (formData.experience &&
                    formData.experience.some((e) => e.company || e.position)) ||
                  (formData.education &&
                    formData.education.some(
                      (ed) => ed.institution || ed.course
                    )) ||
                  (formData.skills &&
                    formData.skills.some((s) => s && s.trim()));
                if (isDirty) {
                  if (
                    window.confirm(
                      'Existem mudanças não salvas. Deseja realmente voltar ao início e perder os dados?'
                    )
                  ) {
                    navigate('/');
                  }
                } else {
                  navigate('/');
                }
              }}
              aria-label="Voltar ao Início"
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ display: 'grid', gap: 2, mb: 4 }}>
          {/* Upload de Foto */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<PhotoCamera />}
              aria-label="Enviar foto do candidato"
            >
              Enviar Foto
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handlePhotoChange}
              />
            </Button>
            {photo && (
              <img
                src={photo}
                alt="Foto do candidato"
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
            )}
          </Box>
          <Dialog
            open={showCropper}
            onClose={() => setShowCropper(false)}
            maxWidth="xs"
            fullWidth
          >
            <DialogTitle>Enquadre sua foto</DialogTitle>
            <DialogContent>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: 300,
                  bgcolor: '#333',
                }}
              >
                <Cropper
                  image={photo}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography gutterBottom>Zoom</Typography>
                <Slider
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  onChange={(e, z) => setZoom(z)}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowCropper(false)} color="secondary">
                Cancelar
              </Button>
              <Button
                onClick={handleCropSave}
                color="primary"
                variant="contained"
              >
                Salvar
              </Button>
            </DialogActions>
          </Dialog>
          <TextField
            fullWidth
            label="Nome Completo"
            name="name"
            value={formData.personalInfo.name}
            onChange={handlePersonalInfoChange}
            required
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.personalInfo.email}
            onChange={handlePersonalInfoChange}
            required
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            label="Telefone"
            name="phone"
            value={formData.personalInfo.phone}
            onChange={handlePersonalInfoChange}
            required
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <TextField
            fullWidth
            label="Endereço"
            name="address"
            value={formData.personalInfo.address}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            label="LinkedIn"
            name="linkedin"
            value={formData.personalInfo.linkedin}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            label="Objetivo Profissional"
            name="objective"
            multiline
            rows={4}
            value={formData.personalInfo.objective}
            onChange={handlePersonalInfoChange}
          />
        </Box>

        {/* Seção de Educação */}
        <Typography variant="h5" gutterBottom>
          Educação
        </Typography>
        {formData.education.map((edu, index) => (
          <Box
            key={index}
            sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}
          >
            <Box sx={{ display: 'grid', gap: 2 }}>
              <TextField
                fullWidth
                label="Instituição"
                value={edu.institution}
                onChange={(e) =>
                  handleEducationChange(index, 'institution', e.target.value)
                }
                error={!!errors[`education_${index}_institution`]}
                helperText={errors[`education_${index}_institution`]}
              />
              <TextField
                fullWidth
                label="Curso"
                value={edu.course}
                onChange={(e) =>
                  handleEducationChange(index, 'course', e.target.value)
                }
                error={!!errors[`education_${index}_course`]}
                helperText={errors[`education_${index}_course`]}
              />
              <Box
                sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}
              >
                <TextField
                  label="Data Início"
                  type="date"
                  value={edu.startDate}
                  onChange={(e) =>
                    handleEducationChange(index, 'startDate', e.target.value)
                  }
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Data Fim"
                  type="date"
                  value={edu.endDate}
                  onChange={(e) =>
                    handleEducationChange(index, 'endDate', e.target.value)
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
            </Box>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton
                onClick={() => removeField('education', index)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
        <Button
          startIcon={<AddIcon />}
          onClick={() => addNewField('education')}
          sx={{ mb: 4 }}
        >
          Adicionar Educação
        </Button>

        {/* Seção de Experiência */}
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Experiência Profissional
        </Typography>
        {formData.experience.map((exp, index) => (
          <Box
            key={index}
            sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}
          >
            <Box sx={{ display: 'grid', gap: 2 }}>
              <TextField
                fullWidth
                label="Empresa"
                value={exp.company}
                onChange={(e) =>
                  handleExperienceChange(index, 'company', e.target.value)
                }
                required
                error={!!errors[`experience_${index}_company`]}
                helperText={errors[`experience_${index}_company`]}
              />
              <TextField
                fullWidth
                label="Cargo"
                value={exp.position}
                onChange={(e) =>
                  handleExperienceChange(index, 'position', e.target.value)
                }
                required
                error={!!errors[`experience_${index}_position`]}
                helperText={errors[`experience_${index}_position`]}
              />
              <Box
                sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}
              >
                <TextField
                  label="Data Início"
                  type="date"
                  value={exp.startDate}
                  onChange={(e) =>
                    handleExperienceChange(index, 'startDate', e.target.value)
                  }
                  InputLabelProps={{ shrink: true }}
                  required
                  error={!!errors[`experience_${index}_startDate`]}
                  helperText={errors[`experience_${index}_startDate`]}
                />
                <TextField
                  label="Data Fim"
                  type="date"
                  value={exp.endDate}
                  onChange={(e) =>
                    handleExperienceChange(index, 'endDate', e.target.value)
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              <TextField
                fullWidth
                label="Descrição das Atividades"
                multiline
                rows={3}
                value={exp.description}
                onChange={(e) =>
                  handleExperienceChange(index, 'description', e.target.value)
                }
              />
            </Box>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton
                onClick={() => removeField('experience', index)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
        <Button
          startIcon={<AddIcon />}
          onClick={() => addNewField('experience')}
          sx={{ mb: 4 }}
        >
          Adicionar Experiência
        </Button>

        {/* Seção de Habilidades */}
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Habilidades
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
          {formData.skills.map((skill, index) => (
            <Box
              key={index}
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <TextField
                label={`Habilidade ${index + 1}`}
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                size="small"
              />
              <IconButton
                onClick={() => removeField('skills', index)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
        <Button
          startIcon={<AddIcon />}
          onClick={() => addNewField('skills')}
          sx={{ mb: 4 }}
        >
          Adicionar Habilidade
        </Button>

        {/* Seção de Idiomas */}
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Idiomas
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
          {(formData.languages || ['']).map((lang, index) => (
            <Box
              key={index}
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <TextField
                label={`Idioma ${index + 1}`}
                value={lang}
                onChange={(e) => {
                  const newLangs = [...(formData.languages || [''])];
                  newLangs[index] = e.target.value;
                  setFormData((prev) => ({ ...prev, languages: newLangs }));
                }}
                size="small"
              />
              <IconButton
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    languages: (prev.languages || ['']).filter(
                      (_, i) => i !== index
                    ),
                  }));
                }}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
        <Button
          startIcon={<AddIcon />}
          onClick={() =>
            setFormData((prev) => ({
              ...prev,
              languages: [...(prev.languages || ['']), ''],
            }))
          }
          sx={{ mb: 4 }}
        >
          Adicionar Idioma
        </Button>

        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button
            onClick={() => navigate('/')}
            variant="outlined"
            color="primary"
            size="large"
            fullWidth={isMobile}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={openClearConfirmation}
            variant="outlined"
            color="error"
            size="large"
            fullWidth={isMobile}
          >
            Limpar Formulário
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth={true}
          >
            Visualizar Currículo
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default CurriculumForm;
