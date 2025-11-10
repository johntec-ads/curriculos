import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  Alert,
  Snackbar,
  LinearProgress,
  Fade,
  Chip,
  Stack,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SaveIcon from '@mui/icons-material/Save';
import InfoIcon from '@mui/icons-material/Info';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

// Importar seções do formulário
import PersonalInfoSection from './FormSections/PersonalInfoSection';
import ExperienceSection from './FormSections/ExperienceSection';
import EducationSection from './FormSections/EducationSection';
import SkillsSection from './FormSections/SkillsSection';

const steps = [
  { label: 'Informações Pessoais', description: 'Seus dados básicos' },
  { label: 'Experiência', description: 'Histórico profissional' },
  { label: 'Formação', description: 'Educação e cursos' },
  { label: 'Habilidades', description: 'Competências e idiomas' }
];

// Schema de validação para cada etapa
const validationSchemas = [
  // Etapa 1: Informações Pessoais
  Yup.object({
    personalInfo: Yup.object({
      name: Yup.string()
        .min(3, 'Nome deve ter pelo menos 3 caracteres')
        .max(100, 'Nome muito longo')
        .required('Nome é obrigatório'),
      email: Yup.string()
        .email('Email inválido')
        .required('Email é obrigatório'),
      phone: Yup.string()
        .matches(/^[\d\s()+-]+$/, 'Telefone inválido')
        .min(10, 'Telefone deve ter pelo menos 10 dígitos')
        .required('Telefone é obrigatório'),
      address: Yup.string()
        .min(5, 'Endereço deve ter pelo menos 5 caracteres'),
      linkedin: Yup.string()
        .url('URL do LinkedIn inválida'),
      objective: Yup.string()
        .max(500, 'Objetivo deve ter no máximo 500 caracteres')
    })
  }),
  // Etapa 2: Experiência
  Yup.object({
    experience: Yup.array().of(
      Yup.object({
        company: Yup.string().required('Empresa é obrigatória'),
        position: Yup.string().required('Cargo é obrigatório'),
        startDate: Yup.string().required('Data de início é obrigatória'),
        endDate: Yup.string()
          .nullable()
          .test('date-validation', 'Data de término deve ser posterior à data de início', function(value) {
            const { startDate } = this.parent;
            if (!value || !startDate) return true; // Se não houver data fim ou início, aceita
            return new Date(value) >= new Date(startDate);
          }),
        description: Yup.string()
          .min(20, 'Descreva suas responsabilidades (mínimo 20 caracteres)')
          .max(1000, 'Descrição muito longa (máximo 1000 caracteres)')
          .required('Descrição é obrigatória')
      })
    ).min(1, 'Adicione pelo menos uma experiência profissional')
  }),
  // Etapa 3: Educação
  Yup.object({
    education: Yup.array().of(
      Yup.object({
        institution: Yup.string().required('Instituição é obrigatória'),
        course: Yup.string().required('Curso é obrigatório'),
        startDate: Yup.string(),
        endDate: Yup.string()
          .nullable()
          .test('date-validation', 'Data de conclusão deve ser posterior à data de início', function(value) {
            const { startDate } = this.parent;
            if (!value || !startDate) return true;
            return new Date(value) >= new Date(startDate);
          }),
        description: Yup.string()
          .max(500, 'Descrição muito longa (máximo 500 caracteres)')
      })
    ).min(1, 'Adicione pelo menos uma formação')
  }),
  // Etapa 4: Habilidades
  Yup.object({
    skills: Yup.array()
      .test('min-skills', 'Adicione pelo menos 3 habilidades preenchidas', function(value) {
        const filledSkills = (value || []).filter(s => s && s.trim());
        return filledSkills.length >= 3;
      }),
    languages: Yup.array()
      .test('min-languages', 'Adicione pelo menos 1 idioma preenchido', function(value) {
        const filledLanguages = (value || []).filter(l => l && l.trim());
        return filledLanguages.length >= 1;
      })
  })
];

function CurriculumFormV2() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const queryParams = new URLSearchParams(location.search);
  const selectedTemplate = queryParams.get('template');

  const [activeStep, setActiveStep] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [autoSaveEnabled] = useState(true);
  const [lastSaved, setLastSaved] = useState(null);
  const [hasExistingData, setHasExistingData] = useState(false);

  // Verificar se há dados existentes ao montar o componente
  useEffect(() => {
    const data = localStorage.getItem('curriculumData');
    if (data) {
      try {
        const parsed = JSON.parse(data);
        // Verificar se há dados realmente preenchidos (não apenas estrutura vazia)
        const hasData = parsed.personalInfo?.name || parsed.personalInfo?.email || 
                       parsed.experience?.some(exp => exp.company) ||
                       parsed.education?.some(edu => edu.institution);
        setHasExistingData(hasData);
      } catch (e) {
        setHasExistingData(false);
      }
    }
  }, []);

  // Carregar dados salvos
  const loadSavedData = () => {
    const data = localStorage.getItem('curriculumData');
    if (data) {
      try {
        const parsed = JSON.parse(data);
        return parsed;
      } catch (e) {
        console.error('Erro ao carregar dados:', e);
      }
    }
    // Retornar dados vazios padrão ao invés de null
    return {
      personalInfo: {
        name: '',
        email: '',
        phone: '',
        address: '',
        linkedin: '',
        objective: '',
        photoUrl: ''
      },
      education: [{
        institution: '',
        course: '',
        startDate: '',
        endDate: '',
        description: ''
      }],
      experience: [{
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: ''
      }],
      skills: [''],
      languages: [''],
      template: selectedTemplate || 'template1'
    };
  };

  const formik = useFormik({
    initialValues: loadSavedData(),
    validationSchema: validationSchemas[activeStep],
    validateOnChange: false, // Desabilitar validação em cada mudança
    validateOnBlur: true,
    onSubmit: (values) => {
      if (activeStep === steps.length - 1) {
        handleFinalSubmit(values);
      } else {
        handleNext();
      }
    }
  });

  // Auto-save
  useEffect(() => {
    if (!autoSaveEnabled) return;

    const timeoutId = setTimeout(() => {
      if (formik.dirty) {
        localStorage.setItem('curriculumData', JSON.stringify(formik.values));
        setLastSaved(new Date());
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [formik.values, formik.dirty, autoSaveEnabled]);

  const handleNext = async () => {
    const currentSchema = validationSchemas[activeStep];
    try {
      await currentSchema.validate(formik.values, { abortEarly: false });
      setActiveStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.log('Erros de validação:', err);
      if (err.inner) {
        const errors = {};
        err.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        formik.setErrors(errors);
        
        // Mostrar mensagem mais específica
        const errorMessages = err.inner.map(e => e.message).join(', ');
        setSnackbar({
          open: true,
          message: `Por favor, corrija: ${errorMessages.substring(0, 100)}...`,
          severity: 'error'
        });
      } else {
        setSnackbar({
          open: true,
          message: err.message || 'Por favor, corrija os erros antes de continuar',
          severity: 'error'
        });
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalSubmit = (values) => {
    localStorage.setItem('curriculumData', JSON.stringify(values));
    setSnackbar({
      open: true,
      message: 'Currículo salvo com sucesso! Redirecionando...',
      severity: 'success'
    });
    setTimeout(() => {
      navigate('/preview');
    }, 1000);
  };

  const handleSaveProgress = () => {
    localStorage.setItem('curriculumData', JSON.stringify(formik.values));
    setLastSaved(new Date());
    setSnackbar({
      open: true,
      message: 'Progresso salvo com sucesso!',
      severity: 'success'
    });
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <PersonalInfoSection formik={formik} />;
      case 1:
        return <ExperienceSection formik={formik} />;
      case 2:
        return <EducationSection formik={formik} />;
      case 3:
        return <SkillsSection formik={formik} />;
      default:
        return 'Etapa desconhecida';
    }
  };

  const progress = ((activeStep + 1) / steps.length) * 100;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header com progresso */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          borderRadius: 2
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Criar Currículo
          </Typography>
          <Chip
            icon={<InfoIcon />}
            label={`${Math.round(progress)}% completo`}
            color="secondary"
            sx={{ fontWeight: 'bold' }}
          />
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: 'rgba(255,255,255,0.3)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: 'white',
              borderRadius: 4
            }
          }}
        />
        {lastSaved && autoSaveEnabled && (
          <Typography variant="caption" sx={{ mt: 1, display: 'block', opacity: 0.9 }}>
            <SaveIcon sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
            Salvo automaticamente às {lastSaved.toLocaleTimeString()}
          </Typography>
        )}
      </Paper>

      {/* Stepper */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Stepper activeStep={activeStep} alternativeLabel={!isMobile}>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  !isMobile && (
                    <Typography variant="caption">{step.description}</Typography>
                  )
                }
              >
                {isMobile ? `${index + 1}` : step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Dicas da seção atual */}
      <Fade in={true}>
        <Alert
          severity="info"
          icon={<HelpOutlineIcon />}
          sx={{ mb: 3, borderRadius: 2 }}
        >
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            Dica: {steps[activeStep].label}
          </Typography>
          <Typography variant="body2">
            {activeStep === 0 && 'Preencha seus dados com atenção. Um bom currículo começa com informações claras e profissionais.'}
            {activeStep === 1 && 'Liste suas experiências mais recentes primeiro. Descreva suas conquistas e responsabilidades de forma clara.'}
            {activeStep === 2 && 'Inclua sua formação acadêmica e cursos relevantes. Destaque certificações importantes para sua área.'}
            {activeStep === 3 && 'Liste habilidades técnicas e comportamentais relevantes. Seja honesto sobre seu nível de conhecimento.'}
          </Typography>
        </Alert>
      </Fade>

      {/* Alerta se houver dados antigos */}
      {hasExistingData && activeStep === 0 && (
        <Fade in={true}>
          <Alert
            severity="warning"
            sx={{ mb: 3, borderRadius: 2 }}
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => {
                  if (window.confirm('Tem certeza que deseja limpar todos os dados e começar um novo currículo?')) {
                    localStorage.removeItem('curriculumData');
                    window.location.reload();
                  }
                }}
              >
                Limpar
              </Button>
            }
          >
            <Typography variant="body2">
              Você tem dados salvos de um currículo anterior. Deseja continuar editando ou começar um novo?
            </Typography>
          </Alert>
        </Fade>
      )}

      {/* Conteúdo do formulário */}
      <Paper elevation={2} sx={{ p: { xs: 2, md: 4 }, mb: 3, borderRadius: 2 }}>
        <form onSubmit={formik.handleSubmit}>
          {getStepContent(activeStep)}
        </form>
      </Paper>

      {/* Botões de navegação */}
      <Paper elevation={0} sx={{ p: 2, borderRadius: 2, backgroundColor: theme.palette.grey[50] }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box sx={{ display: 'flex', gap: 2, width: { xs: '100%', sm: 'auto' } }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
              fullWidth={isMobile}
            >
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleSaveProgress}
              startIcon={<SaveIcon />}
              fullWidth={isMobile}
            >
              Salvar
            </Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, width: { xs: '100%', sm: 'auto' } }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<ArrowBackIcon />}
              variant="outlined"
              fullWidth={isMobile}
            >
              Voltar
            </Button>
            <Button
              onClick={activeStep === steps.length - 1 ? formik.handleSubmit : handleNext}
              variant="contained"
              endIcon={activeStep === steps.length - 1 ? <CheckCircleIcon /> : <ArrowForwardIcon />}
              fullWidth={isMobile}
              size="large"
            >
              {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
            </Button>
          </Box>
        </Stack>
      </Paper>

      {/* Snackbar para feedbacks */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default CurriculumFormV2;
