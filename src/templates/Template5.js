import { forwardRef } from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Template5 = forwardRef(({ data, onPrint, onBack, isGenerating = false }, ref) => {
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
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
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
        
        {/* Cabeçalho com bordas */}
        <Box sx={{ borderBottom: '2px solid #1976d2', pb: 2, mb: 3 }}>
          <Typography variant="h4" sx={{ color: '#1976d2', mb: 2 }}>{data.personalInfo.name}</Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Typography><strong>Email:</strong> {data.personalInfo.email}</Typography>
            <Typography><strong>Telefone:</strong> {data.personalInfo.phone}</Typography>
            <Typography><strong>Endereço:</strong> {data.personalInfo.address}</Typography>
            {data.personalInfo.linkedin && (
              <Typography><strong>LinkedIn:</strong> {data.personalInfo.linkedin}</Typography>
            )}
          </Box>
        </Box>
        
        <Typography variant="h5" sx={{ color: '#1976d2', mt: 3, mb: 1 }}>Objetivo</Typography>
        <Typography paragraph>{data.personalInfo.objective}</Typography>
        
        <Typography variant="h5" sx={{ color: '#1976d2', mt: 3, mb: 1 }}>Educação</Typography>
        <Box sx={{ pl: 2, borderLeft: '3px solid #1976d2' }}>
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
        </Box>
        
        <Typography variant="h5" sx={{ color: '#1976d2', mt: 3, mb: 1 }}>Experiência</Typography>
        <Box sx={{ pl: 2, borderLeft: '3px solid #1976d2' }}>
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
        </Box>
        
        <Typography variant="h5" sx={{ color: '#1976d2', mt: 3, mb: 1 }}>Habilidades</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {data.skills.map((skill, index) => (
            <Typography key={index} component="span" sx={{
              bgcolor: '#e3f2fd',
              px: 2,
              py: 0.5,
              borderRadius: 1
            }}>
              {skill}
            </Typography>
          ))}
        </Box>
        
        <Typography variant="h5" sx={{ color: '#1976d2', mt: 3, mb: 1 }}>Idiomas</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {data.languages.map((language, index) => (
            <Typography key={index} component="span" sx={{
              bgcolor: '#e3f2fd',
              px: 2,
              py: 0.5,
              borderRadius: 1
            }}>
              {language}
            </Typography>
          ))}
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

Template5.propTypes = {
  data: PropTypes.object.isRequired,
  onBack: PropTypes.func,
  onPrint: PropTypes.func,
  isGenerating: PropTypes.bool,
};

export default function Template5Wrapper(props) {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Template5
      {...props}
      onBack={props.onBack || handleBack}
    />
  );
}