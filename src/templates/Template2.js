import { forwardRef } from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Template2 = forwardRef(({ data, onPrint, onBack, isGenerating = false }, ref) => {
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
          width: '210mm', 
          height: '297mm',
          margin: isGenerating ? 0 : '32px auto', 
          p: 0,
          backgroundColor: '#fff', 
          boxShadow: '0 0 10px rgba(0,0,0,0.1)', 
          position: 'relative', 
          overflow: 'hidden', 
          fontFamily: 'Arial, sans-serif',
          display: 'flex',
          flexDirection: 'row',
          pageBreakAfter: 'always',
        }}
      >
        {/* Barra lateral limitada à altura exata do PDF A4 */}
        <Box sx={{ 
          width: '240px', 
          bgcolor: '#1976d2', 
          color: 'white', 
          p: 3, 
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Foto do usuário - com tamanho adaptativo */}
          <Box 
            sx={{
              width: hasLargePhoto ? 120 : 100,
              height: hasLargePhoto ? 120 : 100,
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
          <Typography variant="h6" sx={{ mt: 1, mb: 1, fontSize: '1rem', fontWeight: 'bold' }}>Contato</Typography>
          <Box sx={{ mb: 2, width: '100%' }}>
            <Typography variant="body2" sx={{ fontSize: '0.8rem', mb: 0.5 }}>{data?.personalInfo?.email}</Typography>
            <Typography variant="body2" sx={{ fontSize: '0.8rem', mb: 0.5 }}>{data?.personalInfo?.phone}</Typography>
            <Typography variant="body2" sx={{ fontSize: '0.8rem', mb: 0.5 }}>{data?.personalInfo?.address}</Typography>
            {data?.personalInfo?.linkedin && (
              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                LinkedIn: {data.personalInfo.linkedin}
              </Typography>
            )}
          </Box>
          
          {/* Habilidades e Idiomas - lado a lado quando há muitos */}
          {hasManyLanguages ? (
            <Box sx={{ display: 'flex', width: '100%', flex: 1, overflow: 'hidden' }}>
              {/* Habilidades */}
              <Box sx={{ width: '50%', pr: 1 }}>
                <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold', mb: 1 }}>Habilidades</Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 0.5,
                  overflow: 'auto',
                  maxHeight: 'calc(100% - 30px)',
                }}>
                  {data.skills.map((skill, index) => (
                    <Typography key={index} variant="body2" sx={{ fontSize: '0.8rem', lineHeight: 1.2 }}>
                      • {skill}
                    </Typography>
                  ))}
                </Box>
              </Box>

              {/* Idiomas */}
              <Box sx={{ width: '50%', pl: 1 }}>
                <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold', mb: 1 }}>Idiomas</Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 0.5,
                  overflow: 'auto',
                  maxHeight: 'calc(100% - 30px)',
                }}>
                  {data.languages.map((language, index) => (
                    <Typography key={index} variant="body2" sx={{ fontSize: '0.8rem', lineHeight: 1.2 }}>
                      • {language}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          ) : (
            <>
              {/* Layout tradicional - um abaixo do outro */}
              <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold', mb: 1, mt: 1 }}>Habilidades</Typography>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 0.5,
                mb: 2,
                maxHeight: hasManySkills ? '120px' : '150px',
                overflow: 'auto',
              }}>
                {data.skills.map((skill, index) => (
                  <Typography key={index} variant="body2" sx={{ fontSize: '0.8rem', lineHeight: 1.2 }}>
                    • {skill}
                  </Typography>
                ))}
              </Box>
              
              <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold', mb: 1 }}>Idiomas</Typography>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 0.5,
                maxHeight: '80px',
                overflow: 'auto',
              }}>
                {data.languages.map((language, index) => (
                  <Typography key={index} variant="body2" sx={{ fontSize: '0.8rem', lineHeight: 1.2 }}>
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
            }}
          >
            JOHNTEC.ADS
          </Typography>
        </Box>

        {/* Conteúdo Principal */}
        <Box sx={{ flex: 1, p: 4, overflow: 'auto' }}>
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
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {exp.position}
                </Typography>
                <Typography variant="subtitle2" color="primary">
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
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {edu.course}
                </Typography>
                <Typography variant="subtitle2" color="primary">
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
