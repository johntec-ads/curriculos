import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

function CurriculumForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      objective: ''
    },
    education: [{
      institution: '',
      course: '',
      startDate: '',
      endDate: '',
      description: ''
    }],
    experience: [{
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    }],
    skills: ['']
  });

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value
      }
    }));
  };

  const handleEducationChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const handleSkillChange = (index, value) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => i === index ? value : skill)
    }));
  };

  const addNewField = (section) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], section === 'skills' ? '' : section === 'education' ? {
        institution: '',
        course: '',
        startDate: '',
        endDate: '',
        description: ''
      } : {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: ''
      }]
    }));
  };

  const removeField = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('curriculumData', JSON.stringify(formData));
    navigate('/preview');
  };

  return (
    <Container maxWidth="md">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>Informações Pessoais</Typography>
        
        <Box sx={{ display: 'grid', gap: 2, mb: 4 }}>
          <TextField
            fullWidth
            label="Nome Completo"
            name="name"
            value={formData.personalInfo.name}
            onChange={handlePersonalInfoChange}
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.personalInfo.email}
            onChange={handlePersonalInfoChange}
            required
          />
          <TextField
            fullWidth
            label="Telefone"
            name="phone"
            value={formData.personalInfo.phone}
            onChange={handlePersonalInfoChange}
            required
          />
          <TextField
            fullWidth
            label="Endereço"
            name="address"
            value={formData.personalInfo.address}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            label="LinkedIn"
            name="linkedin"
            value={formData.personalInfo.linkedin}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            label="Objetivo Profissional"
            name="objective"
            multiline
            rows={4}
            value={formData.personalInfo.objective}
            onChange={handlePersonalInfoChange}
          />
        </Box>

        {/* Seção de Educação */}
        <Typography variant="h5" gutterBottom>Educação</Typography>
        {formData.education.map((edu, index) => (
          <Box key={index} sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <Box sx={{ display: 'grid', gap: 2 }}>
              <TextField
                fullWidth
                label="Instituição"
                value={edu.institution}
                onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
              />
              <TextField
                fullWidth
                label="Curso"
                value={edu.course}
                onChange={(e) => handleEducationChange(index, 'course', e.target.value)}
              />
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <TextField
                  label="Data Início"
                  type="date"
                  value={edu.startDate}
                  onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Data Fim"
                  type="date"
                  value={edu.endDate}
                  onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
            </Box>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton onClick={() => removeField('education', index)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
        <Button
          startIcon={<AddIcon />}
          onClick={() => addNewField('education')}
          sx={{ mb: 4 }}
        >
          Adicionar Educação
        </Button>

        {/* Seção de Experiência */}
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Experiência Profissional</Typography>
        {formData.experience.map((exp, index) => (
          <Box key={index} sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <Box sx={{ display: 'grid', gap: 2 }}>
              <TextField
                fullWidth
                label="Empresa"
                value={exp.company}
                onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Cargo"
                value={exp.position}
                onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                required
              />
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <TextField
                  label="Data Início"
                  type="date"
                  value={exp.startDate}
                  onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  required
                />
                <TextField
                  label="Data Fim"
                  type="date"
                  value={exp.endDate}
                  onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              <TextField
                fullWidth
                label="Descrição das Atividades"
                multiline
                rows={3}
                value={exp.description}
                onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
              />
            </Box>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton onClick={() => removeField('experience', index)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
        <Button
          startIcon={<AddIcon />}
          onClick={() => addNewField('experience')}
          sx={{ mb: 4 }}
        >
          Adicionar Experiência
        </Button>

        {/* Seção de Habilidades */}
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Habilidades</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
          {formData.skills.map((skill, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                label={`Habilidade ${index + 1}`}
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                size="small"
              />
              <IconButton onClick={() => removeField('skills', index)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
        <Button
          startIcon={<AddIcon />}
          onClick={() => addNewField('skills')}
          sx={{ mb: 4 }}
        >
          Adicionar Habilidade
        </Button>

        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button 
            onClick={() => navigate('/')} 
            variant="outlined" 
            color="primary" 
            size="large"
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            size="large"
            fullWidth
          >
            Visualizar Currículo
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default CurriculumForm;