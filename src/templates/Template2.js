import { forwardRef } from 'react';
import { Paper, Typography, Box, Button, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Template2 = forwardRef(({ data, onPrint, onBack, isGenerating = false }, ref) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
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

  // Calcular o layout da barra lateral com base no conteúdo
  const hasLargePhoto = !!data?.personalInfo?.photoUrl;
  const hasManySkills = (data?.skills?.length || 0) > 5;
  const hasManyLanguages = (data?.languages?.length || 0) > 3;

  return (
    <>
      <Paper 
        ref={ref}
        sx={{ 
          width: { xs: '100%', md: '210mm' }, 
          height: { xs: 'auto', md: '297mm' },
          margin: isGenerating ? 0 : { xs: '16px auto', md: '32px auto' }, 
          p: 0,
          backgroundColor: '#fff', 
          boxShadow: '0 0 10px rgba(0,0,0,0.1)', 
          position: 'relative', 
          overflow: 'hidden', 
          fontFamily: 'Arial, sans-serif',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          pageBreakAfter: 'always',
        }}
      >
        {/* Barra lateral adaptativa */}
        <Box sx={{ 
          width: { xs: '100%', sm: '240px' }, 
          bgcolor: '#1976d2', 
          color: 'white', 
          p: { xs: 2, sm: 3 }, 
          display: 'flex',
          flexDirection: 'column',
          height: { xs: 'auto', sm: '100%' },
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Cabeçalho para mobile - somente visível em telas pequenas */}
          {isMobile && (
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'white', 
                mb: 2, 
                textAlign: 'center',
                fontWeight: 'bold'
              }}
            >
              {data.personalInfo.name}
            </Typography>
          )}
          
          {/* Foto do usuário - com tamanho adaptativo */}
          <Box 
            sx={{
              width: { xs: hasLargePhoto ? 100 : 80, sm: hasLargePhoto ? 120 : 100 },
              height: { xs: hasLargePhoto ? 100 : 80, sm: hasLargePhoto ? 120 : 100 },
              borderRadius: '50%',
              backgroundColor: '#fff',
              margin: '10px auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            {data?.personalInfo?.photoUrl ? (
              <img
                src={data.personalInfo.photoUrl}
                alt="Foto do candidato"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
              />
            ) : (
              <Typography variant="body2" color="primary">Foto</Typography>
            )}
          </Box>
          
          {/* Informações de Contato */}
          <Typography 
            variant="h6" 
            sx={{ 
              mt: 1, 
              mb: 1, 
              fontSize: { xs: '0.95rem', sm: '1rem' }, 
              fontWeight: 'bold' 
            }}
          >
            Contato
          </Typography>
          <Box sx={{ mb: 2, width: '100%' }}>
            <Typography 
              variant="body2" 
              sx={{ 
                fontSize: { xs: '0.75rem', sm: '0.8rem' }, 
                mb: 0.5,
                wordBreak: 'break-word'
              }}
            >
              {data?.personalInfo?.email}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                fontSize: { xs: '0.75rem', sm: '0.8rem' }, 
                mb: 0.5 
              }}
            >
              {data?.personalInfo?.phone}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                fontSize: { xs: '0.75rem', sm: '0.8rem' }, 
                mb: 0.5 
              }}
            >
              {data?.personalInfo?.address}
            </Typography>
            {data?.personalInfo?.linkedin && (
              <Typography 
                variant="body2" 
                sx={{ 
                  fontSize: { xs: '0.75rem', sm: '0.8rem' },
                  wordBreak: 'break-word' 
                }}
              >
                LinkedIn: {data.personalInfo.linkedin}
              </Typography>
            )}
          </Box>
          
          {/* Layout adaptativo para habilidades e idiomas */}
          {(isMobile || hasManyLanguages) ? (
            <Box sx={{ 
              display: 'flex', 
              width: '100%', 
              flex: isMobile ? 'none' : 1, 
              overflow: 'hidden',
              flexDirection: { xs: 'column', sm: 'row' }
            }}>
              {/* Habilidades */}
              <Box sx={{ 
                width: { xs: '100%', sm: '50%' }, 
                pr: { xs: 0, sm: 1 },
                mb: { xs: 2, sm: 0 }
              }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontSize: { xs: '0.95rem', sm: '1rem' }, 
                    fontWeight: 'bold', 
                    mb: 1 
                  }}
                >
                  Habilidades
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 0.5,
                  overflow: 'auto',
                  maxHeight: { xs: '120px', sm: 'calc(100% - 30px)' },
                }}>
                  {data.skills.map((skill, index) => (
                    <Typography 
                      key={index} 
                      variant="body2" 
                      sx={{ 
                        fontSize: { xs: '0.75rem', sm: '0.8rem' }, 
                        lineHeight: 1.2 
                      }}
                    >
                      • {skill}
                    </Typography>
                  ))}
                </Box>
              </Box>

              {/* Idiomas */}
              <Box sx={{ 
                width: { xs: '100%', sm: '50%' }, 
                pl: { xs: 0, sm: 1 } 
              }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontSize: { xs: '0.95rem', sm: '1rem' }, 
                    fontWeight: 'bold', 
                    mb: 1 
                  }}
                >
                  Idiomas
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 0.5,
                  overflow: 'auto',
                  maxHeight: { xs: '120px', sm: 'calc(100% - 30px)' },
                }}>
                  {data.languages.map((language, index) => (
                    <Typography 
                      key={index} 
                      variant="body2" 
                      sx={{ 
                        fontSize: { xs: '0.75rem', sm: '0.8rem' }, 
                        lineHeight: 1.2 
                      }}
                    >
                      • {language}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          ) : (
            <>
              {/* Layout tradicional - um abaixo do outro */}
              <Typography 
                variant="h6" 
                sx={{ 
                  fontSize: { xs: '0.95rem', sm: '1rem' }, 
                  fontWeight: 'bold', 
                  mb: 1, 
                  mt: 1 
                }}
              >
                Habilidades
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 0.5,
                mb: 2,
                maxHeight: hasManySkills ? '120px' : '150px',
                overflow: 'auto',
              }}>
                {data.skills.map((skill, index) => (
                  <Typography 
                    key={index} 
                    variant="body2" 
                    sx={{ 
                      fontSize: { xs: '0.75rem', sm: '0.8rem' }, 
                      lineHeight: 1.2 
                    }}
                  >
                    • {skill}
                  </Typography>
                ))}
              </Box>
              
              <Typography 
                variant="h6" 
                sx={{ 
                  fontSize: { xs: '0.95rem', sm: '1rem' }, 
                  fontWeight: 'bold', 
                  mb: 1 
                }}
              >
                Idiomas
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 0.5,
                maxHeight: '80px',
                overflow: 'auto',
              }}>
                {data.languages.map((language, index) => (
                  <Typography 
                    key={index} 
                    variant="body2" 
                    sx={{ 
                      fontSize: { xs: '0.75rem', sm: '0.8rem' }, 
                      lineHeight: 1.2 
                    }}
                  >
                    • {language}
                  </Typography>
                ))}
              </Box>
            </>
          )}
          
          {/* Marca d'água na barra lateral */}
          <Typography
            sx={{
              position: 'absolute',
              bottom: '15px',
              left: '0',
              width: '100%',
              textAlign: 'center',
              fontSize: '0.7rem',
              opacity: 0.5,
              pointerEvents: 'none',
              userSelect: 'none',
              display: { xs: 'none', sm: 'block' }
            }}
          >
            JOHNTEC.ADS
          </Typography>
        </Box>

        {/* Conteúdo Principal */}
        <Box sx={{ 
          flex: 1, 
          p: { xs: 2, sm: 3, md: 4 }, 
          overflow: 'auto' 
        }}>
          {/* Nome - oculto em mobile (já aparece na parte de cima) */}
          {!isMobile && (
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                color: '#1976d2',
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
                wordBreak: 'break-word'
              }}
            >
              {data.personalInfo.name}
            </Typography>
          )}
          
          {/* Objetivo */}
          {data.personalInfo.objective && (
            <Box sx={{ mb: { xs: 3, md: 4 } }}>
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  color: '#1976d2',
                  fontSize: { xs: '1.1rem', sm: '1.25rem' }
                }}
              >
                Objetivo Profissional
              </Typography>
              <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                {data.personalInfo.objective}
              </Typography>
            </Box>
          )}
          
          {/* Experiência */}
          <Box sx={{ mb: { xs: 3, md: 4 } }}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                color: '#1976d2',
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}
            >
              Experiência Profissional
            </Typography>
            {sortByDate(data.experience).map((exp, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontWeight: 'bold',
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    wordBreak: 'break-word'
                  }}
                >
                  {exp.position}
                </Typography>
                <Typography 
                  variant="subtitle2" 
                  color="primary"
                  sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                >
                  {exp.company}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="textSecondary"
                  sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                >
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </Typography>
                <Typography 
                  variant="body2"
                  sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                >
                  {exp.description}
                </Typography>
              </Box>
            ))}
          </Box>
          
          {/* Educação */}
          <Box>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                color: '#1976d2',
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}
            >
              Educação
            </Typography>
            {data.education.map((edu, index) => (
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
                <Typography 
                  variant="subtitle2" 
                  color="primary"
                  sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                >
                  {edu.institution}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="textSecondary"
                  sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                >
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </Typography>
                <Typography 
                  variant="body2"
                  sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                >
                  {edu.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Paper>

      {/* Só renderiza os botões se NÃO estiver na página de preview */}
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

export default function Template2Wrapper(props) {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Template2
      {...props}
      onBack={props.onBack || handleBack}
    />
  );
}
