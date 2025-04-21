import { forwardRef } from 'react';
import { Paper, Typography, Box, Button, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Template3 = forwardRef(({ data, onPrint, onBack, isGenerating = false }, ref) => {
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
          margin: isGenerating ? 0 : { xs: '16px auto', sm: '24px auto', md: '32px auto' }, 
          p: { xs: 2, sm: 3, md: 4 }, 
          backgroundColor: '#fff', 
          boxShadow: '0 0 10px rgba(0,0,0,0.1)', 
          position: 'relative', 
          overflow: 'hidden', 
          fontFamily: 'Arial, sans-serif' 
        }}
      >
        {/* Cabeçalho */}
        <Box sx={{ 
          textAlign: 'center', 
          borderBottom: '2px solid #e0e0e0',
          pb: { xs: 1.5, sm: 2 },
          mb: { xs: 2, sm: 3, md: 4 }
        }}>
          <Typography 
            variant="h3" 
            sx={{ 
              color: '#333',
              fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' },
              wordBreak: 'break-word'
            }}
          >
            {data?.personalInfo?.name || 'Nome não informado'}
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center', 
            gap: { xs: 1, sm: 3 },
            mt: { xs: 1, sm: 2 },
            color: '#666',
            flexWrap: 'wrap'
          }}>
            <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>{data?.personalInfo?.email}</Typography>
            <Typography variant="body2">{data?.personalInfo?.phone}</Typography>
            <Typography variant="body2">{data?.personalInfo?.address}</Typography>
            {data?.personalInfo?.linkedin && (
              <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>{data.personalInfo.linkedin}</Typography>
            )}
          </Box>
        </Box>

        {/* Objetivo */}
        {data.personalInfo.objective && (
          <Box sx={{ mb: { xs: 3, md: 4 } }}>
            <Typography 
              variant="body1" 
              sx={{ 
                textAlign: 'center', 
                fontStyle: 'italic',
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}
            >
              {data.personalInfo.objective}
            </Typography>
          </Box>
        )}

        {/* Grid de 2 colunas - adaptativo para mobile */}
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: 3, md: 4 }
        }}>
          {/* Coluna Esquerda */}
          <Box>
            {/* Experiência */}
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2,
                pb: 1,
                borderBottom: '1px solid #e0e0e0',
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}
            >
              Experiência Profissional
            </Typography>
            {sortByDate(data.experience).map((exp, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontWeight: 'bold', 
                    color: '#333',
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    wordBreak: 'break-word'
                  }}
                >
                  {exp.position}
                </Typography>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    color: '#666',
                    wordBreak: 'break-word'
                  }}
                >
                  {exp.company}
                </Typography>
                <Typography variant="caption" sx={{ color: '#888' }}>
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mt: 1,
                    fontSize: { xs: '0.85rem', sm: '0.875rem' }
                  }}
                >
                  {exp.description}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Coluna Direita */}
          <Box>
            {/* Educação */}
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2,
                pb: 1,
                borderBottom: '1px solid #e0e0e0',
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}
            >
              Educação
            </Typography>
            {data.education.map((edu, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontWeight: 'bold', 
                    color: '#333',
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    wordBreak: 'break-word'
                  }}
                >
                  {edu.course}
                </Typography>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    color: '#666',
                    wordBreak: 'break-word'
                  }}
                >
                  {edu.institution}
                </Typography>
                <Typography variant="caption" sx={{ color: '#888' }}>
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </Typography>
                {edu.description && (
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mt: 1,
                      fontSize: { xs: '0.85rem', sm: '0.875rem' }
                    }}
                  >
                    {edu.description}
                  </Typography>
                )}
              </Box>
            ))}

            {/* Habilidades */}
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2,
                pb: 1,
                borderBottom: '1px solid #e0e0e0',
                mt: { xs: 3, md: 4 },
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}
            >
              Habilidades
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 1 
            }}>
              {data.skills.map((skill, index) => (
                <Box
                  key={index}
                  sx={{
                    bgcolor: '#f5f5f5',
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                    margin: '2px'
                  }}
                >
                  {skill}
                </Box>
              ))}
            </Box>

            {/* Idiomas */}
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2,
                pb: 1,
                borderBottom: '1px solid #e0e0e0',
                mt: { xs: 3, md: 4 },
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}
            >
              Idiomas
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 1 
            }}>
              {data.languages.map((language, index) => (
                <Box
                  key={index}
                  sx={{
                    bgcolor: '#f5f5f5',
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                    margin: '2px'
                  }}
                >
                  {language}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Paper>

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

export default function Template3Wrapper(props) {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Template3
      {...props}
      onBack={props.onBack || handleBack}
    />
  );
}
