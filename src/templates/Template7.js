import { forwardRef } from 'react';
import { Paper, Typography, Box, Avatar, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Template7 = forwardRef(({ data, isGenerating = false }, ref) => {
  const formatDate = (date) => {
    if (!date) return 'Presente';
    return new Date(date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' });
  };

  const sortByDate = (items) => (Array.isArray(items) ? [...items].sort((a, b) => new Date(b.startDate) - new Date(a.startDate)) : []);

  if (!data) return null;

  return (
    <>
      <Box sx={{ overflowX: 'auto', width: '100%', display: 'flex', justifyContent: 'center', py: { xs: 1, sm: 2 } }}>
        <Paper
          ref={ref}
          sx={{
            width: '210mm',
            minHeight: '297mm',
            margin: isGenerating ? 0 : '0 auto',
            p: 0,
            backgroundColor: '#fff',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: 'Arial, sans-serif',
            '@media print': {
              width: '210mm !important',
              minHeight: '297mm !important'
            }
          }}
          className={isGenerating ? 'print-only' : ''}
        >
          {/* Header */}
          <Box sx={{ background: 'linear-gradient(90deg,#1565c0 0%, #42a5f5 100%)', color: '#fff', p: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
            <Avatar src={data.personalInfo.photoUrl || ''} alt={data.personalInfo.name} sx={{ width: 90, height: 90, border: '3px solid rgba(255,255,255,0.85)' }}>
              {(!data.personalInfo.photoUrl && data.personalInfo.name) ? data.personalInfo.name[0] : ''}
            </Avatar>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, letterSpacing: '0.5px' }}>{data.personalInfo.name}</Typography>
              {data.personalInfo.objective && (
                <Typography variant="body2" sx={{ fontStyle: 'italic', opacity: 0.95, maxWidth: '70%' }}>{data.personalInfo.objective}</Typography>
              )}
              <Box sx={{ display: 'flex', gap: 2, mt: 1, flexWrap: 'wrap' }}>
                <Typography variant="body2">{data.personalInfo.email}</Typography>
                <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.6)' }} />
                <Typography variant="body2">{data.personalInfo.phone}</Typography>
                {data.personalInfo.linkedin && (
                  <>
                    <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.6)' }} />
                    <Typography variant="body2">LinkedIn: {data.personalInfo.linkedin}</Typography>
                  </>
                )}
              </Box>
            </Box>
          </Box>

          {/* Content */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 3, p: 3 }}>
            {/* Left: main */}
            <Box sx={{ '& > *': { pageBreakInside: 'avoid' } }}>
              <Typography variant="h6" sx={{ color: '#1565c0', mb: 1 }}>Experiência Profissional</Typography>
              {sortByDate(data.experience).map((exp, idx) => (
                <Box key={idx} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: '700' }}>{exp.position}</Typography>
                  <Typography variant="subtitle2" sx={{ color: '#666' }}>{exp.company} • <span style={{ color: '#1976d2' }}>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span></Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>{exp.description}</Typography>
                </Box>
              ))}

              <Typography variant="h6" sx={{ color: '#1565c0', mt: 3, mb: 1 }}>Educação</Typography>
              {(data.education || []).map((edu, idx) => (
                <Box key={idx} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: '700' }}>{edu.course}</Typography>
                  <Typography variant="subtitle2" sx={{ color: '#666' }}>{edu.institution} • <span style={{ color: '#1976d2' }}>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span></Typography>
                  {edu.description && <Typography variant="body2" sx={{ mt: 1 }}>{edu.description}</Typography>}
                </Box>
              ))}
            </Box>

            {/* Right: compact cards */}
            <Box>
              <Box sx={{ mb: 2, p: 2, backgroundColor: '#f5f8fb', borderRadius: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1565c0', mb: 1 }}>Habilidades</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {(data.skills || []).map((skill, i) => (
                    <Typography key={i} variant="body2">• {skill}</Typography>
                  ))}
                </Box>
              </Box>

              <Box sx={{ mb: 2, p: 2, backgroundColor: '#f5f8fb', borderRadius: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1565c0', mb: 1 }}>Idiomas</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {(data.languages || []).map((lang, i) => (
                    <Typography key={i} variant="body2">• {lang}</Typography>
                  ))}
                </Box>
              </Box>

              <Box sx={{ mb: 2, p: 2, backgroundColor: '#fff', borderRadius: 1, border: '1px solid #eee' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1565c0', mb: 1 }}>Contato</Typography>
                <Typography variant="body2">{data.personalInfo.email}</Typography>
                <Typography variant="body2">{data.personalInfo.phone}</Typography>
                {data.personalInfo.address && <Typography variant="body2">{data.personalInfo.address}</Typography>}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
});

const Template7Wrapper = (props) => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  return <Template7 {...props} onBack={props.onBack || handleBack} />;
};

export default Template7Wrapper;
