import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Paper, Box, Typography, Button, Avatar, Divider } from '@mui/material';

const Template6 = ({ data, onBack, onPrint, isGenerating }) => {
  return (
    <Paper sx={{ display: 'flex', minHeight: '297mm', width: '210mm', margin: '32px auto', p: 0, background: '#fff' }}>
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
          {data.skills.map((skill, idx) => (
            <Typography key={idx} variant="body2" sx={{ bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 1, px: 1 }}>
              {skill}
            </Typography>
          ))}
        </Box>
      </Box>
      {/* Conteúdo principal */}
      <Box sx={{ flex: 1, p: 4 }}>
        <Typography variant="h4" sx={{ color: '#1976d2', mb: 2 }}>{data.personalInfo.name}</Typography>
        {data.personalInfo.objective && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ color: '#1976d2' }}>Objetivo</Typography>
            <Typography>{data.personalInfo.objective}</Typography>
          </Box>
        )}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ color: '#1976d2' }}>Experiência Profissional</Typography>
          {data.experience.map((exp, idx) => (
            <Box key={idx} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{exp.position}</Typography>
              <Typography variant="subtitle2">{exp.company}</Typography>
              <Typography variant="caption" color="text.secondary">{exp.startDate} - {exp.endDate}</Typography>
              <Typography variant="body2">{exp.description}</Typography>
            </Box>
          ))}
        </Box>
        <Box>
          <Typography variant="h6" sx={{ color: '#1976d2' }}>Educação</Typography>
          {data.education.map((edu, idx) => (
            <Box key={idx} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{edu.course}</Typography>
              <Typography variant="subtitle2">{edu.institution}</Typography>
              <Typography variant="caption" color="text.secondary">{edu.startDate} - {edu.endDate}</Typography>
              <Typography variant="body2">{edu.description}</Typography>
            </Box>
          ))}
        </Box>
        {/* Idiomas */}
        {data.languages && data.languages.length > 0 && (
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
        <Box sx={{ textAlign: 'center', mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button onClick={onBack} variant="outlined" color="primary" size="large" aria-label="Voltar e Editar">Voltar e Editar</Button>
          <Button onClick={onPrint} variant="contained" color="primary" size="large" disabled={isGenerating} aria-label="Gerar PDF">Gerar PDF</Button>
        </Box>
      </Box>
    </Paper>
  );
};

Template6.propTypes = {
  data: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  onPrint: PropTypes.func.isRequired,
  isGenerating: PropTypes.bool.isRequired,
};

const Template6Wrapper = (props) => {
  const navigate = useNavigate();
  const [data] = useState({
    personalInfo: {
      name: 'João da Silva',
      email: 'joao.silva@example.com',
      phone: '(11) 99999-9999',
      address: 'Rua Exemplo, 123, São Paulo, SP',
      linkedin: 'linkedin.com/in/joaosilva',
      objective: 'Contribuir com minhas habilidades em desenvolvimento web.',
      photoUrl: '', // Adicione aqui a URL da foto se desejar
    },
    education: [
      {
        institution: 'Universidade Exemplo',
        course: 'Bacharelado em Ciência da Computação',
        startDate: '2015-01-01',
        endDate: '2019-12-31',
        description: 'Formação sólida em desenvolvimento de software.'
      }
    ],
    experience: [
      {
        company: 'Empresa Exemplo',
        position: 'Desenvolvedor Frontend',
        startDate: '2020-01-01',
        endDate: '2023-12-31',
        description: 'Desenvolvimento de interfaces responsivas.'
      }
    ],
    skills: ['JavaScript', 'React', 'CSS'],
    languages: ['Português', 'Inglês']
  });

  const handleBack = () => {
    navigate(-1);
  };
  const handlePrint = () => {
    window.print();
  };

  return <Template6 data={data} onBack={handleBack} onPrint={handlePrint} isGenerating={false} {...props} />;
};

export default Template6Wrapper;
