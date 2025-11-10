import { forwardRef } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Template2 = forwardRef(({ data, isGenerating = false }, ref) => {
  
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
      {/* Wrapper container responsivo - apenas ajusta a forma como o currículo é visualizado na tela */}
      <Box 
        sx={{ 
          overflowX: 'auto',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          py: { xs: 1, sm: 2 }
        }}
        className={isGenerating ? "print-container" : "no-print-container"}
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
            fontFamily: 'Arial, sans-serif',
            display: 'flex',
            flexDirection: 'row',
            pageBreakAfter: 'always',
            '@media print': {
              display: 'flex !important',
              flexDirection: 'row !important',
              width: '210mm !important',
              height: '297mm !important',
            }
          }}
          className={isGenerating ? "print-only" : ""}
        >
          {/* Barra lateral limitada à altura exata do PDF A4 */}
          <Box sx={{ 
            width: '200px', 
            minWidth: '200px',
            bgcolor: '#1565c0', 
            color: 'white', 
            p: 2.5, 
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden',
            position: 'relative',
            '@media print': {
              width: '200px !important',
              display: 'flex !important',
              flexDirection: 'column !important',
              backgroundColor: '#1565c0 !important',
              color: 'white !important',
              height: '100% !important',
              padding: '20px !important',
              overflow: 'visible !important',
              visibility: 'visible !important',
            }
          }}>
            {/* Foto do usuário - com tamanho adaptativo */}
            <Box 
              sx={{
                width: hasLargePhoto ? 110 : 90,
                height: hasLargePhoto ? 110 : 90,
                borderRadius: '50%',
                backgroundColor: '#fff',
                margin: '8px auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                '@media print': {
                  display: 'flex !important',
                  visibility: 'visible !important',
                  backgroundColor: '#fff !important',
                }
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
            <Typography variant="h6" sx={{ 
              mt: 1, 
              mb: 1, 
              fontSize: '1rem', 
              fontWeight: '700',
              '@media print': {
                color: 'white !important',
                visibility: 'visible !important',
                display: 'block !important',
              }
            }}>Contato</Typography>
            <Box sx={{ 
              mb: 2, 
              width: '100%',
              '@media print': {
                display: 'block !important',
                visibility: 'visible !important',
              }
            }}>
              <Typography variant="body2" sx={{ 
                fontSize: '0.8rem', 
                mb: 0.5,
                '@media print': {
                  color: 'white !important',
                  visibility: 'visible !important',
                  display: 'block !important',
                }
              }}>{data?.personalInfo?.email}</Typography>
              <Typography variant="body2" sx={{ 
                fontSize: '0.8rem', 
                mb: 0.5,
                '@media print': {
                  color: 'white !important',
                  visibility: 'visible !important',
                  display: 'block !important',
                }
              }}>{data?.personalInfo?.phone}</Typography>
              <Typography variant="body2" sx={{ 
                fontSize: '0.8rem', 
                mb: 0.5,
                '@media print': {
                  color: 'white !important',
                  visibility: 'visible !important',
                  display: 'block !important',
                }
              }}>{data?.personalInfo?.address}</Typography>
              {data?.personalInfo?.linkedin && (
                <Typography variant="body2" sx={{ 
                  fontSize: '0.8rem',
                  '@media print': {
                    color: 'white !important',
                    visibility: 'visible !important',
                    display: 'block !important',
                  }
                }}>
                  LinkedIn: {data.personalInfo.linkedin}
                </Typography>
              )}
            </Box>
            
            {/* Habilidades e Idiomas - lado a lado quando há muitos */}
            {hasManyLanguages ? (
              <Box sx={{ display: 'flex', width: '100%', flex: 1, overflow: 'hidden' }}>
                {/* Habilidades */}
                <Box sx={{ 
                  width: '50%', 
                  pr: 1,
                  '@media print': {
                    display: 'block !important',
                    visibility: 'visible !important',
                  }
                }}>
                  <Typography variant="h6" sx={{ 
                    fontSize: '1rem', 
                    fontWeight: 'bold', 
                    mb: 1,
                    '@media print': {
                      color: 'white !important',
                      visibility: 'visible !important',
                      display: 'block !important',
                    }
                  }}>Habilidades</Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 0.5,
                    overflow: 'auto',
                    maxHeight: 'calc(100% - 30px)',
                    '@media print': {
                      display: 'flex !important',
                      flexDirection: 'column !important',
                      visibility: 'visible !important',
                      overflow: 'visible !important',
                      maxHeight: 'none !important',
                    }
                  }}>
                    {data.skills.map((skill, index) => (
                      <Typography key={index} variant="body2" sx={{ 
                        fontSize: '0.8rem', 
                        lineHeight: 1.2,
                        '@media print': {
                          color: 'white !important',
                          visibility: 'visible !important',
                          display: 'block !important',
                        }
                      }}>
                        • {skill}
                      </Typography>
                    ))}
                  </Box>
                </Box>

                {/* Idiomas */}
                <Box sx={{ 
                  width: '50%', 
                  pl: 1,
                  '@media print': {
                    display: 'block !important',
                    visibility: 'visible !important',
                  }
                }}>
                  <Typography variant="h6" sx={{ 
                    fontSize: '1rem', 
                    fontWeight: 'bold', 
                    mb: 1,
                    '@media print': {
                      color: 'white !important',
                      visibility: 'visible !important',
                      display: 'block !important',
                    }
                  }}>Idiomas</Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 0.5,
                    overflow: 'auto',
                    maxHeight: 'calc(100% - 30px)',
                    '@media print': {
                      display: 'flex !important',
                      flexDirection: 'column !important',
                      visibility: 'visible !important',
                      overflow: 'visible !important',
                      maxHeight: 'none !important',
                    }
                  }}>
                    {data.languages.map((language, index) => (
                      <Typography key={index} variant="body2" sx={{ 
                        fontSize: '0.8rem', 
                        lineHeight: 1.2,
                        '@media print': {
                          color: 'white !important',
                          visibility: 'visible !important',
                          display: 'block !important',
                        }
                      }}>
                        • {language}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </Box>
            ) : (
              <>
                {/* Layout tradicional - um abaixo do outro */}
                <Typography variant="h6" sx={{ 
                  fontSize: '1rem', 
                  fontWeight: 'bold', 
                  mb: 1, 
                  mt: 1,
                  '@media print': {
                    color: 'white !important',
                    visibility: 'visible !important',
                    display: 'block !important',
                  }
                }}>Habilidades</Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 0.5,
                  mb: 2,
                  maxHeight: hasManySkills ? '120px' : '150px',
                  overflow: 'auto',
                  '@media print': {
                    display: 'flex !important',
                    flexDirection: 'column !important',
                    visibility: 'visible !important',
                    overflow: 'visible !important',
                    maxHeight: 'none !important',
                  }
                }}>
                  {data.skills.map((skill, index) => (
                    <Typography key={index} variant="body2" sx={{ 
                      fontSize: '0.8rem', 
                      lineHeight: 1.2,
                      '@media print': {
                        color: 'white !important',
                        visibility: 'visible !important',
                        display: 'block !important',
                      }
                    }}>
                      • {skill}
                    </Typography>
                  ))}
                </Box>
                
                <Typography variant="h6" sx={{ 
                  fontSize: '1rem', 
                  fontWeight: 'bold', 
                  mb: 1,
                  '@media print': {
                    color: 'white !important',
                    visibility: 'visible !important',
                    display: 'block !important',
                  }
                }}>Idiomas</Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 0.5,
                  maxHeight: '80px',
                  overflow: 'auto',
                  '@media print': {
                    display: 'flex !important',
                    flexDirection: 'column !important',
                    visibility: 'visible !important',
                    overflow: 'visible !important',
                    maxHeight: 'none !important',
                  }
                }}>
                  {data.languages.map((language, index) => (
                    <Typography key={index} variant="body2" sx={{ 
                      fontSize: '0.8rem', 
                      lineHeight: 1.2,
                      '@media print': {
                        color: 'white !important',
                        visibility: 'visible !important',
                        display: 'block !important',
                      }
                    }}>
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
                '@media print': {
                  color: 'white !important',
                  visibility: 'visible !important',
                  display: 'block !important',
                  opacity: '0.5 !important',
                }
              }}
            >
              JOHNTEC.ADS
            </Typography>
          </Box>

          {/* Conteúdo Principal */}
          <Box sx={{ 
            flex: 1, 
            p: { xs: 3, md: 4 }, 
            overflow: 'auto',
            borderLeft: '1px solid rgba(0,0,0,0.04)',
            backgroundColor: 'transparent',
            '@media print': {
              flex: '1 !important',
              display: 'block !important',
              visibility: 'visible !important',
              padding: '28px !important',
              width: 'calc(100% - 200px) !important',
            }
          }}>
            <Typography variant="h4" gutterBottom sx={{ color: '#1976d2' }}>
              {data.personalInfo.name}
            </Typography>
            
            {/* Objetivo */}
            {data.personalInfo.objective && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }}>
                  Objetivo Profissional
                </Typography>
                <Typography>{data.personalInfo.objective}</Typography>
              </Box>
            )}
            
            {/* Experiência */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }}>
                Experiência Profissional
              </Typography>
              {sortByDate(data.experience).map((exp, index) => (
                <Box key={index} sx={{ mb: 2, breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {exp.position}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: '#1976d2' }}>
                    {exp.company}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </Typography>
                  <Typography variant="body2">{exp.description}</Typography>
                </Box>
              ))}
            </Box>
            
            {/* Educação */}
            <Box>
              <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }}>
                Educação
              </Typography>
              {data.education.map((edu, index) => (
                <Box key={index} sx={{ mb: 2, breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {edu.course}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: '#1976d2' }}>
                    {edu.institution}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </Typography>
                  <Typography variant="body2">{edu.description}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Botões removidos - agora são gerenciados pela página Preview */}
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
