import { forwardRef } from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Template3 = forwardRef(({ data, onPrint, onBack, isGenerating = false }, ref) => {
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
          width: '210mm', 
          minHeight: '297mm', 
          margin: '32px auto', 
          p: 4, 
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
          pb: 2,
          mb: 4
        }}>
          <Typography variant="h3" sx={{ color: '#333' }}>
            {data?.personalInfo?.name || 'Nome não informado'}
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 3,
            mt: 2,
            color: '#666',
            flexWrap: 'wrap'
          }}>
            <Typography variant="body2">{data?.personalInfo?.email}</Typography>
            <Typography variant="body2">{data?.personalInfo?.phone}</Typography>
            <Typography variant="body2">{data?.personalInfo?.address}</Typography>
            {data?.personalInfo?.linkedin && (
              <Typography variant="body2">{data.personalInfo.linkedin}</Typography>
            )}
          </Box>
        </Box>

        {/* Objetivo */}
        {data.personalInfo.objective && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="body1" sx={{ textAlign: 'center', fontStyle: 'italic' }}>
              {data.personalInfo.objective}
            </Typography>
          </Box>
        )}

        {/* Grid de 2 colunas */}
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 4
        }}>
          {/* Coluna Esquerda */}
          <Box>
            {/* Experiência */}
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2,
                pb: 1,
                borderBottom: '1px solid #e0e0e0'
              }}
            >
              Experiência Profissional
            </Typography>
            {sortByDate(data.experience).map((exp, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>
                  {exp.position}
                </Typography>
                <Typography variant="subtitle2" sx={{ color: '#666' }}>
                  {exp.company}
                </Typography>
                <Typography variant="caption" sx={{ color: '#888' }}>
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
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
                borderBottom: '1px solid #e0e0e0'
              }}
            >
              Educação
            </Typography>
            {data.education.map((edu, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>
                  {edu.course}
                </Typography>
                <Typography variant="subtitle2" sx={{ color: '#666' }}>
                  {edu.institution}
                </Typography>
                <Typography variant="caption" sx={{ color: '#888' }}>
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </Typography>
                {edu.description && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
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
                mt: 4
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
                    fontSize: '0.875rem'
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
                mt: 4
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
                    fontSize: '0.875rem'
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
