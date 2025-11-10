import { forwardRef } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Template4 = forwardRef(({ data, isGenerating = false }, ref) => {
  
  const formatDate = (date) => {
    if (!date) return 'Presente';
    return new Date(date).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long'
    });
  };

  if (!data) return null;

  return (
    <>
      {/* Wrapper container responsivo - apenas ajusta a forma como o currículo é visualizado na tela */}
      <Box 
        sx={{ 
          overflowX: 'auto',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          py: { xs: 1, sm: 2 }
        }}
      >
        {/* Template do currículo com dimensões fixas A4 para garantir consistência no PDF */}
        <Paper
          ref={ref}
          sx={{ 
            width: '210mm', 
            minHeight: '297mm', 
            margin: isGenerating ? 0 : '0 auto', 
            p: 4, 
            backgroundColor: '#fff', 
            boxShadow: '0 0 10px rgba(0,0,0,0.1)', 
            position: 'relative', 
            overflow: 'hidden', 
            fontFamily: 'Arial, sans-serif',
            display: 'flex',
            flexDirection: 'column',
            '@media print': {
              width: '210mm !important',
              minHeight: '297mm !important',
              padding: '20px !important',
              overflow: 'visible !important'
            }
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
              fontSize: '80px',
              pointerEvents: 'none',
              userSelect: 'none',
              whiteSpace: 'nowrap'
            }}
          >
            JOHNTEC.ADS
          </Typography>
          
          {/* Conteúdo principal com scroll interno */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            height: '100%',
            '@media print': {
              display: 'block !important',
              height: 'auto !important',
              pageBreakInside: 'avoid'
            }
          }}>
            <Typography variant="h4" sx={{ color: '#1976d2', mb: 2 }}>{data.personalInfo.name}</Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography><strong>Email:</strong> {data.personalInfo.email}</Typography>
              <Typography><strong>Telefone:</strong> {data.personalInfo.phone}</Typography>
              <Typography><strong>Endereço:</strong> {data.personalInfo.address}</Typography>
              {data.personalInfo.linkedin && (
                <Typography><strong>LinkedIn:</strong> {data.personalInfo.linkedin}</Typography>
              )}
            </Box>
            
            <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>Objetivo</Typography>
            <Typography paragraph>{data.personalInfo.objective}</Typography>
            
            <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>Educação</Typography>
            {data.education.map((edu, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">{edu.course}</Typography>
                <Typography variant="subtitle2">{edu.institution}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </Typography>
                <Typography paragraph>{edu.description}</Typography>
              </Box>
            ))}
            
            <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>Experiência</Typography>
            {data.experience.map((exp, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">{exp.position}</Typography>
                <Typography variant="subtitle2">{exp.company}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </Typography>
                <Typography paragraph>{exp.description}</Typography>
              </Box>
            ))}
            
            {/* Habilidades e Idiomas lado a lado para economizar espaço */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: {xs: 'column', sm: 'row'}, 
              gap: 3,
              mt: 2,
              '@media print': {
                display: 'flex !important',
                flexDirection: 'row !important',
                gap: '24px !important'
              }
            }}>
              {/* Habilidades */}
              <Box sx={{ 
                flex: 1,
                '@media print': {
                  flex: '1 !important'
                }
              }}>
                <Typography variant="h5" sx={{ mb: 1 }}>Habilidades</Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: 1,
                  '@media print': {
                    display: 'flex !important',
                    flexWrap: 'wrap !important'
                  }
                }}>
                  {data.skills.map((skill, index) => (
                    <Typography key={index} component="span" sx={{
                      bgcolor: '#e3f2fd',
                      px: 2,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: '0.8rem',
                      '@media print': {
                        backgroundColor: '#e3f2fd !important',
                        marginBottom: '4px !important'
                      }
                    }}>
                      {skill}
                    </Typography>
                  ))}
                </Box>
              </Box>
              
              {/* Idiomas */}
              <Box sx={{ 
                flex: 1,
                '@media print': {
                  flex: '1 !important'
                }
              }}>
                <Typography variant="h5" sx={{ mb: 1 }}>Idiomas</Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: 1,
                  '@media print': {
                    display: 'flex !important',
                    flexWrap: 'wrap !important'
                  }
                }}>
                  {data.languages.map((language, index) => (
                    <Typography key={index} component="span" sx={{
                      bgcolor: '#e3f2fd',
                      px: 2,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: '0.8rem',
                      '@media print': {
                        backgroundColor: '#e3f2fd !important',
                        marginBottom: '4px !important'
                      }
                    }}>
                      {language}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Botões removidos - agora são gerenciados pela página Preview */}
    </>
  );
});

Template4.propTypes = {
  data: PropTypes.object.isRequired,
  isGenerating: PropTypes.bool
};

export default function Template4Wrapper(props) {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Template4
      {...props}
      onBack={props.onBack || handleBack}
    />
  );
}