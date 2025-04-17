import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Paper, Box, Typography, Button, Avatar, Divider } from '@mui/material';

const Template6 = forwardRef(({ data, onBack, onPrint }, ref) => {
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
          fontFamily: 'Arial, sans-serif' 
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
            whiteSpace: 'nowrap',
            zIndex: 1
          }}
        >
          JOHNTEC.ADS
        </Typography>
        
        {/* Barra lateral */}
        <Box sx={{ width: 240, bgcolor: '#1976d2', color: '#fff', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar
            src={data.personalInfo.photoUrl || ''}
            alt={data.personalInfo.name}
            sx={{ width: 120, height: 120, mb: 2, border: '4px solid #fff', boxShadow: 2 }}
          >
            {(!data.personalInfo.photoUrl && data.personalInfo.name) ? data.personalInfo.name[0] : ''}
          </Avatar>
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>{data.personalInfo.name}</Typography>
          <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: '100%', mb: 2 }} />
          <Typography variant="subtitle2">Contato</Typography>
          <Typography variant="body2">{data.personalInfo.email}</Typography>
          <Typography variant="body2">{data.personalInfo.phone}</Typography>
          <Typography variant="body2">{data.personalInfo.address}</Typography>
          {data.personalInfo.linkedin && (
            <Typography variant="body2">LinkedIn: {data.personalInfo.linkedin}</Typography>
          )}
          <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: '100%', my: 2 }} />
          <Typography variant="subtitle2">Habilidades</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
            {(data.skills || []).map((skill, idx) => (
              <Typography key={idx} variant="body2" sx={{ bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 1, px: 1 }}>
                {skill}
              </Typography>
            ))}
          </Box>
        </Box>
        
        {/* Conteúdo principal */}
        <Box sx={{ flex: 1, p: 4 }}>
          <Typography variant="h4" sx={{ color: '#1976d2', mb: 2 }}>{data?.personalInfo?.name || 'Nome não informado'}</Typography>
          {data?.personalInfo?.objective && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ color: '#1976d2' }}>Objetivo</Typography>
              <Typography>{data.personalInfo.objective}</Typography>
            </Box>
          )}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ color: '#1976d2' }}>Experiência Profissional</Typography>
            {(data?.experience || []).map((exp, idx) => (
              <Box key={idx} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{exp.position}</Typography>
                <Typography variant="subtitle2">{exp.company}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </Typography>
                <Typography variant="body2">{exp.description}</Typography>
              </Box>
            ))}
          </Box>
          <Box>
            <Typography variant="h6" sx={{ color: '#1976d2' }}>Educação</Typography>
            {(data?.education || []).map((edu, idx) => (
              <Box key={idx} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{edu.course}</Typography>
                <Typography variant="subtitle2">{edu.institution}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </Typography>
                <Typography variant="body2">{edu.description}</Typography>
              </Box>
            ))}
          </Box>
          {/* Idiomas */}
          {data?.languages && data.languages.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ color: '#1976d2' }}>Idiomas</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {data.languages.map((lang, idx) => (
                  <Typography key={idx} variant="body2" sx={{ bgcolor: '#f5f5f5', borderRadius: 1, px: 2, py: 0.5 }}>
                    {lang}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Paper>

      <Box sx={{ textAlign: 'center', mb: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button 
          onClick={onBack} 
          variant="outlined" 
          color="primary" 
          size="large" 
          aria-label="Voltar e Editar"
        >
          Voltar e Editar
        </Button>
        <Button
          onClick={onPrint}
          variant="contained"
          color="primary"
          size="large"
          aria-label="Gerar PDF"
        >
          Gerar PDF
        </Button>
      </Box>
    </>
  );
});

Template6.propTypes = {
  data: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  onPrint: PropTypes.func.isRequired,
};

const Template6Wrapper = (props) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return <Template6 {...props} onBack={handleBack} />;
};

export default Template6Wrapper;
