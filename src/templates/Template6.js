import { forwardRef } from 'react';
import { Paper, Typography, Box, Button, Avatar, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Template6 = forwardRef(({ data, onPrint, onBack, isGenerating = false }, ref) => {
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

  // Variáveis para garantir adaptabilidade
  const hasManyLanguages = (data?.languages?.length || 0) > 3;

  return (
    <>
      <Paper 
        ref={ref}
        sx={{ 
          width: '210mm', 
          height: '297mm',
          margin: isGenerating ? 0 : '32px auto', 
          p: 0,
          backgroundColor: '#fff', 
          boxShadow: '0 0 10px rgba(0,0,0,0.1)', 
          position: 'relative', 
          overflow: 'hidden', 
          fontFamily: '"Segoe UI", "Roboto", "Helvetica", sans-serif',
          display: 'flex',
          flexDirection: 'column',
          pageBreakAfter: 'always',
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
        }}>
          <Avatar
            src={data.personalInfo.photoUrl || ''}
            alt={data.personalInfo.name}
            sx={{ 
              width: 130, 
              height: 130, 
              border: '4px solid #fff', 
              boxShadow: 2,
            }}
          >
            {(!data.personalInfo.photoUrl && data.personalInfo.name) ? data.personalInfo.name[0] : ''}
          </Avatar>
          
          <Box sx={{ flex: 1 }}>
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

            {/* Informações de contato em linha */}
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 2, 
              alignItems: 'center',
              mt: 'auto',
            }}>
              <Typography variant="body2" sx={{ 
                display: 'flex', 
                alignItems: 'center',
                fontSize: '0.85rem',
              }}>
                {data.personalInfo.email}
              </Typography>
              <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.5)', height: 15 }} />
              <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                {data.personalInfo.phone}
              </Typography>
              <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.5)', height: 15 }} />
              <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                {data.personalInfo.address}
              </Typography>
              {data.personalInfo.linkedin && (
                <>
                  <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.5)', height: 15 }} />
                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
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
        }}>
          {/* Coluna da esquerda - maior */}
          <Box sx={{ 
            width: '65%', 
            p: 4,
            overflow: 'auto',
          }}>
            {/* Experiência Profissional */}
            <Box sx={{ mb: 4 }}>
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
                  }
                }}
              >
                Experiência Profissional
              </Typography>
              
              {sortByDate(data?.experience || []).map((exp, idx) => (
                <Box key={idx} sx={{ mb: 3 }}>
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
            
            {/* Educação */}
            <Box>
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
                  }
                }}
              >
                Educação
              </Typography>
              
              {data?.education.map((edu, idx) => (
                <Box key={idx} sx={{ mb: 3 }}>
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

      {/* Só renderiza os botões se NÃO estiver na página de preview */}
      {!isGenerating && onPrint && onBack && (
        <Box sx={{ textAlign: 'center', mb: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button onClick={onBack} variant="outlined" color="primary" size="large">
            Voltar e Editar
          </Button>
          <Button
            onClick={onPrint}
            variant="contained" 
            color="primary"
            size="large"
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
