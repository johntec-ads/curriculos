import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  Stack,
  Paper,
  Chip,
  Avatar,
  Fade,
  Zoom,
  useTheme
} from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import DescriptionIcon from '@mui/icons-material/Description';
import PaletteIcon from '@mui/icons-material/Palette';
import DownloadIcon from '@mui/icons-material/Download';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import BugReportIcon from '@mui/icons-material/BugReport';

function HomeV2() {
  const [isVisible, setIsVisible] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <SpeedIcon sx={{ fontSize: 50 }} />,
      title: 'Criação Rápida',
      description: 'Preencha seu currículo em poucos minutos com nossa interface intuitiva e assistida.',
      color: theme.palette.primary.main
    },
    {
      icon: <PaletteIcon sx={{ fontSize: 50 }} />,
      title: 'Templates Profissionais',
      description: 'Escolha entre diversos templates modernos, elegantes e otimizados para ATS.',
      color: theme.palette.secondary.main
    },
    {
      icon: <DownloadIcon sx={{ fontSize: 50 }} />,
      title: 'PDF Alta Qualidade',
      description: 'Exporte seu currículo em PDF de alta resolução, pronto para impressão.',
      color: theme.palette.success.main
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 50 }} />,
      title: '100% Gratuito',
      description: 'Sem taxas ocultas, sem limites. Crie quantos currículos precisar, gratuitamente.',
      color: theme.palette.info.main
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 50 }} />,
      title: 'Guia Passo a Passo',
      description: 'Dicas profissionais em cada etapa para criar um currículo que se destaca.',
      color: theme.palette.warning.main
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 50 }} />,
      title: 'Auto-Save',
      description: 'Seu progresso é salvo automaticamente. Volte a qualquer momento.',
      color: theme.palette.error.main
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'Escolha um Template',
      description: 'Selecione o design que melhor representa seu estilo profissional'
    },
    {
      number: '2',
      title: 'Preencha Seus Dados',
      description: 'Siga o guia passo a passo com dicas para cada seção'
    },
    {
      number: '3',
      title: 'Baixe em PDF',
      description: 'Gere e baixe seu currículo profissional em segundos'
    }
  ];

  return (
    <Box sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 12 }
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Fade in={isVisible} timeout={1000}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              {/* Badge */}
              <Zoom in={isVisible} timeout={800}>
                <Chip
                  icon={<EmojiEventsIcon />}
                  label="🎉 Gratuito • Sem Cadastro • Sem Limites"
                  sx={{
                    mb: 3,
                    py: 2.5,
                    px: 1,
                    fontSize: '1rem',
                    fontWeight: 600,
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    border: '2px solid rgba(255,255,255,0.3)',
                    '& .MuiChip-icon': {
                      color: 'white'
                    }
                  }}
                />
              </Zoom>

              {/* Main Heading */}
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                  fontWeight: 900,
                  color: 'white',
                  mb: 2,
                  textShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  lineHeight: 1.2
                }}
              >
                Conquiste a Vaga dos{' '}
                <Box
                  component="span"
                  sx={{
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                  }}
                >
                  Seus Sonhos
                </Box>
              </Typography>

              {/* Subtitle */}
              <Typography
                variant="h5"
                sx={{
                  color: 'rgba(255,255,255,0.95)',
                  mb: 4,
                  maxWidth: 700,
                  mx: 'auto',
                  fontWeight: 400,
                  lineHeight: 1.6,
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                Crie currículos profissionais que impressionam recrutadores.
                <br />
                Rápido, fácil e completamente gratuito.
              </Typography>

              {/* CTA Buttons */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                <Button
                  component={Link}
                  to="/create"
                  variant="contained"
                  size="large"
                  startIcon={<RocketLaunchIcon />}
                  sx={{
                    py: 2,
                    px: 4,
                    fontSize: '1.2rem',
                    borderRadius: '50px',
                    backgroundColor: '#fff',
                    color: '#764ba2',
                    '&:hover': {
                      backgroundColor: '#f0f0f0',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Criar Currículo Agora
                </Button>
                <Button
                  component={Link}
                  to="/test-generator"
                  variant="outlined"
                  size="large"
                  startIcon={<BugReportIcon />}
                  sx={{
                    py: 2,
                    px: 4,
                    fontSize: '1.2rem',
                    borderRadius: '50px',
                    borderColor: 'rgba(255,255,255,0.5)',
                    color: '#fff',
                    '&:hover': {
                      borderColor: '#fff',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Teste Rápido (Dados Fictícios)
                </Button>
              </Stack>

              {/* Trust Badges */}
              <Stack
                direction="row"
                spacing={3}
                justifyContent="center"
                flexWrap="wrap"
                sx={{ gap: 2 }}
              >
                {['Sem Cadastro', 'Salva Automaticamente', 'PDF Profissional'].map((badge) => (
                  <Box key={badge} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircleIcon sx={{ color: '#4ade80', fontSize: 20 }} />
                    <Typography sx={{ color: 'white', fontWeight: 500 }}>
                      {badge}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, background: 'white' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: theme.palette.primary.main,
                mb: 2
              }}
            >
              Por Que Usar Nossa Plataforma?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Ferramentas profissionais para ajudá-lo a conseguir o emprego que merece
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Zoom in={isVisible} timeout={500 + index * 100}>
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      borderRadius: 3,
                      border: '2px solid',
                      borderColor: 'grey.100',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        borderColor: feature.color,
                        boxShadow: `0 12px 24px ${feature.color}20`
                      }
                    }}
                  >
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                      <Avatar
                        sx={{
                          width: 80,
                          height: 80,
                          mx: 'auto',
                          mb: 2,
                          background: `linear-gradient(135deg, ${feature.color} 0%, ${feature.color}CC 100%)`,
                          boxShadow: `0 8px 16px ${feature.color}30`
                        }}
                      >
                        {feature.icon}
                      </Avatar>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: theme.palette.primary.main,
                mb: 2
              }}
            >
              Como Funciona?
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Apenas 3 passos simples para seu currículo profissional
            </Typography>
          </Box>

          <Grid container spacing={4} alignItems="center">
            {steps.map((step, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Fade in={isVisible} timeout={800 + index * 200}>
                  <Paper
                    elevation={4}
                    sx={{
                      p: 4,
                      textAlign: 'center',
                      borderRadius: 3,
                      position: 'relative',
                      background: 'white',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        transition: 'transform 0.3s ease'
                      }
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        mx: 'auto',
                        mb: 2,
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
                      }}
                    >
                      {step.number}
                    </Avatar>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      {step.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {step.description}
                    </Typography>
                  </Paper>
                </Fade>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              component={Link}
              to="/choose-template"
              variant="contained"
              size="large"
              startIcon={<DescriptionIcon />}
              sx={{
                px: 6,
                py: 2.5,
                fontSize: '1.2rem',
                fontWeight: 700,
                background: theme.palette.primary.main,
                '&:hover': {
                  background: theme.palette.primary.dark,
                  transform: 'scale(1.05)'
                }
              }}
            >
              Começar Agora - É Grátis!
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 4, background: 'rgba(0,0,0,0.05)', textAlign: 'center' }}>
        <Container>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            JOHNTEC.ADS
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ajudando profissionais a conquistarem suas oportunidades • 2024
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default HomeV2;
