import { forwardRef } from 'react';
import { Paper, Typography, Box, Button, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Template1 = forwardRef(({ data, onPrint, onBack, isGenerating = false }, ref) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const formatDate = (date) => {
    if (!date) return 'Presente';
    return new Date(date).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long'
    });
  };

  const sortByDate = (items) => {
    return [...items].sort((a, b) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);
      return dateB - dateA;
    });
  };

  if (!data) return null;

  return (
    <>
      <Paper
        ref={ref}
        sx={{ 
          width: { xs: '100%', sm: '100%', md: '210mm' }, 
          minHeight: { xs: 'auto', md: '297mm' },
          margin: isGenerating ? 0 : { xs: '16px auto', sm: '16px auto', md: '32px auto' }, 
          p: { xs: 2, sm: 3, md: 4 }, 
          backgroundColor: '#fff', 
          boxShadow: '0 0 10px rgba(0,0,0,0.1)', 
          position: 'relative', 
          overflow: 'hidden', 
          fontFamily: 'Arial, sans-serif',
          fontSize: { xs: '0.9rem', sm: '1rem' }
        }}
      >
        {/* Marca d'água */}
        <Typography
          sx={{
            position: 'absolute',
            bottom: '40px',
            right: '20px',
            transform: 'rotate(-45deg)',
            color: 'rgba(0, 0, 0, 0.03)',
            fontSize: { xs: '60px', sm: '80px' },
            pointerEvents: 'none',
            userSelect: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          JOHNTEC.ADS
        </Typography>

        {/* Cabeçalho */}
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            borderBottom: '2px solid #1976d2',
            fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.125rem' },
            wordBreak: 'break-word'
          }}
        >
          {data?.personalInfo?.name || 'Nome não informado'}
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography sx={{ wordBreak: 'break-word' }}>{data?.personalInfo?.email}</Typography>
          <Typography>{data?.personalInfo?.phone}</Typography>
          <Typography>{data?.personalInfo?.address}</Typography>
          {data?.personalInfo?.linkedin && (
            <Typography sx={{ wordBreak: 'break-word' }}>LinkedIn: {data.personalInfo.linkedin}</Typography>
          )}
        </Box>

        {/* Objetivo */}
        {data?.personalInfo?.objective && (
          <>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                color: '#1976d2', 
                mt: 3,
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}
            >
              Objetivo Profissional
            </Typography>
            <Typography paragraph>{data.personalInfo.objective}</Typography>
          </>
        )}

        {/* Experiência */}
        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            color: '#1976d2', 
            mt: 3,
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
        >
          Experiência Profissional
        </Typography>
        {sortByDate(data?.experience || []).map((exp, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 'bold',
                fontSize: { xs: '1rem', sm: '1.1rem' },
                wordBreak: 'break-word'
              }}
            >
              {exp.company} - {exp.position}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
            </Typography>
            <Typography>{exp.description}</Typography>
          </Box>
        ))}

        {/* Educação */}
        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            color: '#1976d2', 
            mt: 3,
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
        >
          Educação
        </Typography>
        {(data?.education || []).map((edu, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 'bold',
                fontSize: { xs: '1rem', sm: '1.1rem' },
                wordBreak: 'break-word'
              }}
            >
              {edu.course}
            </Typography>
            <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
              {edu.institution} ({formatDate(edu.startDate)} - {formatDate(edu.endDate)})
            </Typography>
            <Typography>{edu.description}</Typography>
          </Box>
        ))}

        {/* Habilidades */}
        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            color: '#1976d2', 
            mt: 3,
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
        >
          Habilidades
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {(data?.skills || []).map((skill, index) => (
            <Typography key={index} component="span" sx={{
              bgcolor: '#e3f2fd',
              px: 2,
              py: 0.5,
              borderRadius: 1,
              fontSize: { xs: '0.85rem', sm: '1rem' },
              margin: '2px'
            }}>
              {skill}
            </Typography>
          ))}
        </Box>

        {/* Idiomas */}
        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            color: '#1976d2', 
            mt: 3,
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
        >
          Idiomas
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {(data?.languages || []).map((language, index) => (
            <Typography key={index} component="span" sx={{
              bgcolor: '#e3f2fd',
              px: 2,
              py: 0.5,
              borderRadius: 1,
              fontSize: { xs: '0.85rem', sm: '1rem' },
              margin: '2px'
            }}>
              {language}
            </Typography>
          ))}
        </Box>
      </Paper>

      {/* Só renderiza os botões se NÃO estiver na página de preview (isGenerating = false) */}
      {!isGenerating && onPrint && onBack && (
        <Box sx={{ 
          textAlign: 'center', 
          mb: 4, 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2, 
          justifyContent: 'center',
          px: 2
        }}>
          <Button 
            onClick={onBack} 
            variant="outlined" 
            color="primary" 
            size="large" 
            fullWidth={isMobile}
          >
            Voltar e Editar
          </Button>
          <Button
            onClick={onPrint}
            variant="contained" 
            color="primary"
            size="large"
            fullWidth={isMobile}
          >
            Gerar PDF
          </Button>
        </Box>
      )}
    </>
  );
});

const Template1Wrapper = (props) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Template1
      {...props}
      onBack={props.onBack || handleBack}
    />
  );
};

export default Template1Wrapper;
