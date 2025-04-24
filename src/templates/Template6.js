import { forwardRef } from 'react';
import { Paper, Typography, Box, Button, Avatar, Divider, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Template6 = forwardRef(({ data, onPrint, onBack, isGenerating = false }, ref) => {
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
            height: '297mm',
            margin: isGenerating ? 0 : '0 auto', 
            p: 0,
            backgroundColor: '#fff', 
            boxShadow: '0 0 10px rgba(0,0,0,0.1)', 
            position: 'relative', 
            overflow: 'hidden', 
            fontFamily: '"Segoe UI", "Roboto", "Helvetica", sans-serif',
            display: 'flex',
            flexDirection: 'column',
            pageBreakAfter: 'always',
            '@media print': {
              width: '210mm !important',
              height: '297mm !important',
              display: 'flex !important',
              flexDirection: 'column !important'
            }
          }}
        >
          {/* Marca d'água */}
          <Typography
            sx={{
              position: 'absolute',
              bottom: '40px',
              right: '30px',
              transform: 'rotate(-45deg)',
              color: 'rgba(0, 0, 0, 0.03)',
              fontSize: '80px',
              pointerEvents: 'none',
              userSelect: 'none',
              whiteSpace: 'nowrap',
              zIndex: 1
            }}
          >
            JOHNTEC.ADS
          </Typography>
          
          {/* Cabeçalho com gradient e foto */}
          <Box sx={{ 
            width: '100%', 
            background: 'linear-gradient(90deg, #1976d2 0%, #5e9ce9 100%)',
            color: '#fff',
            p: 4,
            pt: 5,
            pb: 4,
            display: 'flex',
            gap: 4,
            position: 'relative',
            '@media print': {
              background: 'linear-gradient(90deg, #1976d2 0%, #5e9ce9 100%) !important',
              color: '#fff !important',
              display: 'flex !important',
              gap: '32px !important',
              padding: '32px !important',
              paddingTop: '40px !important',
              paddingBottom: '32px !important',
              pageBreakAfter: 'avoid',
              pageBreakInside: 'avoid'
            }
          }}>
            <Avatar
              src={data.personalInfo.photoUrl || ''}
              alt={data.personalInfo.name}
              sx={{ 
                width: 130, 
                height: 130, 
                border: '4px solid #fff', 
                boxShadow: 2,
                '@media print': {
                  width: '130px !important',
                  height: '130px !important',
                  border: '4px solid #fff !important'
                }
              }}
            >
              {(!data.personalInfo.photoUrl && data.personalInfo.name) ? data.personalInfo.name[0] : ''}
            </Avatar>
            
            <Box sx={{ 
              flex: 1,
              '@media print': {
                flex: '1 !important'
              }
            }}>
              <Typography variant="h4" sx={{ 
                mb: 1, 
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                {data.personalInfo.name}
              </Typography>
              
              {data.personalInfo.objective && (
                <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic', maxWidth: '80%' }}>
                  {data.personalInfo.objective}
                </Typography>
              )}

              {/* Informações de contato em linha - corrigir problema da linha extra */}
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 2, 
                alignItems: 'center',
                mt: 'auto',
                '@media print': {
                  display: 'flex !important',
                  flexWrap: 'wrap !important',
                  gap: '16px !important',
                  marginTop: 'auto !important'
                }
              }}>
                <Typography 
                  variant="body2" 
                  component="span"
                  sx={{ 
                    display: 'inline-flex', 
                    alignItems: 'center',
                    fontSize: '0.85rem',
                    whiteSpace: 'nowrap',
                    '@media print': {
                      display: 'inline-flex !important',
                      lineHeight: '1 !important'
                    }
                  }}
                >
                  {data.personalInfo.email}
                </Typography>
                <Divider 
                  orientation="vertical" 
                  flexItem 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.5)', 
                    height: 15,
                    '@media print': {
                      backgroundColor: 'rgba(255,255,255,0.5) !important',
                      height: '15px !important',
                      display: 'inline-block !important'
                    }
                  }} 
                />
                <Typography 
                  variant="body2" 
                  component="span"
                  sx={{ 
                    fontSize: '0.85rem',
                    whiteSpace: 'nowrap',
                    '@media print': {
                      display: 'inline-flex !important',
                      lineHeight: '1 !important'
                    }
                  }}
                >
                  {data.personalInfo.phone}
                </Typography>
                <Divider 
                  orientation="vertical" 
                  flexItem 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.5)', 
                    height: 15,
                    '@media print': {
                      backgroundColor: 'rgba(255,255,255,0.5) !important',
                      height: '15px !important',
                      display: 'inline-block !important'
                    }
                  }} 
                />
                <Typography 
                  variant="body2" 
                  component="span"
                  sx={{ 
                    fontSize: '0.85rem',
                    whiteSpace: 'nowrap',
                    '@media print': {
                      display: 'inline-flex !important',
                      lineHeight: '1 !important'
                    }
                  }}
                >
                  {data.personalInfo.address}
                </Typography>
                {data.personalInfo.linkedin && (
                  <>
                    <Divider 
                      orientation="vertical" 
                      flexItem 
                      sx={{ 
                        bgcolor: 'rgba(255,255,255,0.5)', 
                        height: 15,
                        '@media print': {
                          backgroundColor: 'rgba(255,255,255,0.5) !important',
                          height: '15px !important',
                          display: 'inline-block !important'
                        }
                      }} 
                    />
                    <Typography 
                      variant="body2" 
                      component="span"
                      sx={{ 
                        fontSize: '0.85rem',
                        whiteSpace: 'nowrap',
                        '@media print': {
                          display: 'inline-flex !important',
                          lineHeight: '1 !important'
                        }
                      }}
                    >
                      LinkedIn: {data.personalInfo.linkedin}
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
          </Box>
          
          {/* Conteúdo dividido em duas colunas */}
          <Box sx={{ 
            display: 'flex',
            flex: 1,
            position: 'relative',
            overflow: 'hidden',
            '@media print': {
              display: 'flex !important',
              flex: '1 !important',
              height: 'calc(100% - 175px) !important',
              overflow: 'visible !important'
            }
          }}>
            {/* Coluna da esquerda - maior */}
            <Box sx={{ 
              width: '65%', 
              p: 4,
              overflow: 'auto',
              '@media print': {
                width: '65% !important',
                padding: '24px !important',
                overflow: 'visible !important'
              }
            }}>
              {/* Experiência Profissional */}
              <Box sx={{ 
                mb: 4,
                '@media print': {
                  marginBottom: '24px !important'
                }
              }}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 600, 
                    mb: 2, 
                    color: '#1976d2',
                    position: 'relative',
                    paddingBottom: '8px',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '50px',
                      height: '3px',
                      backgroundColor: '#1976d2',
                    },
                    '@media print': {
                      color: '#1976d2 !important',
                      paddingBottom: '8px !important',
                      marginBottom: '16px !important',
                      '&:after': {
                        backgroundColor: '#1976d2 !important'
                      }
                    }
                  }}
                >
                  Experiência Profissional
                </Typography>
                
                {sortByDate(data?.experience || []).map((exp, idx) => (
                  <Box key={idx} sx={{ 
                    mb: 3,
                    '@media print': {
                      marginBottom: '24px !important',
                      pageBreakInside: 'avoid'
                    }
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {exp.position}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#1976d2', fontWeight: 500 }}>
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                      </Typography>
                    </Box>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: '#555' }}>
                      {exp.company}
                    </Typography>
                    <Typography variant="body2">{exp.description}</Typography>
                  </Box>
                ))}
              </Box>
              
              {/* Educação - reduzir tamanho para caber na página */}
              <Box sx={{ 
                '@media print': {
                  pageBreakInside: 'avoid'
                }
              }}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 600, 
                    mb: 2, 
                    color: '#1976d2',
                    position: 'relative',
                    paddingBottom: '8px',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '50px',
                      height: '3px',
                      backgroundColor: '#1976d2',
                    },
                    '@media print': {
                      color: '#1976d2 !important',
                      paddingBottom: '8px !important',
                      marginBottom: '16px !important',
                      '&:after': {
                        backgroundColor: '#1976d2 !important'
                      }
                    }
                  }}
                >
                  Educação
                </Typography>
                
                {data?.education.map((edu, idx) => (
                  <Box key={idx} sx={{ 
                    mb: 3,
                    '@media print': {
                      marginBottom: '16px !important',
                      pageBreakInside: 'avoid'
                    }
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {edu.course}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#1976d2', fontWeight: 500 }}>
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </Typography>
                    </Box>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: '#555' }}>
                      {edu.institution}
                    </Typography>
                    <Typography variant="body2">{edu.description}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            
            {/* Coluna da direita - menor, com fundo mais claro */}
            <Box sx={{ 
              width: '35%',
              backgroundColor: '#f5f9ff',
              p: 3,
              borderLeft: '1px solid #e0e0e0',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'auto',
              '@media print': {
                width: '35% !important',
                backgroundColor: '#f5f9ff !important',
                padding: '18px !important',
                borderLeft: '1px solid #e0e0e0 !important',
                display: 'flex !important',
                flexDirection: 'column !important',
                overflow: 'visible !important'
              }
            }}>
              {/* Habilidades */}
              <Box sx={{ mb: 4 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600, 
                    mb: 2, 
                    color: '#1976d2',
                    position: 'relative',
                    paddingBottom: '5px',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '30px',
                      height: '2px',
                      backgroundColor: '#1976d2',
                    }
                  }}
                >
                  Habilidades
                </Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 1.5
                }}>
                  {(data?.skills || []).map((skill, idx) => (
                    <Box 
                      key={idx} 
                      sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Box sx={{ 
                        width: 8, 
                        height: 8, 
                        borderRadius: '50%', 
                        backgroundColor: '#1976d2',
                        mr: 1.5 
                      }} />
                      <Typography variant="body2">{skill}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
              
              {/* Idiomas */}
              {data?.languages && data.languages.length > 0 && (
                <Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600, 
                      mb: 2, 
                      color: '#1976d2',
                      position: 'relative',
                      paddingBottom: '5px',
                      '&:after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '30px',
                        height: '2px',
                        backgroundColor: '#1976d2',
                      }
                    }}
                  >
                    Idiomas
                  </Typography>
                  
                  <Box sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1
                  }}>
                    {data.languages.map((lang, idx) => (
                      <Box 
                        key={idx} 
                        sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Box sx={{ 
                          width: 8, 
                          height: 8, 
                          borderRadius: '50%', 
                          backgroundColor: '#1976d2',
                          mr: 1.5 
                        }} />
                        <Typography variant="body2">{lang}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Paper>
      </Box>

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

Template6.propTypes = {
  data: PropTypes.object.isRequired,
  onBack: PropTypes.func,
  onPrint: PropTypes.func,
  isGenerating: PropTypes.bool,
};

export default function Template6Wrapper(props) {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Template6
      {...props}
      onBack={props.onBack || handleBack}
    />
  );
}
