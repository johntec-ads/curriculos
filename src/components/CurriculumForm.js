import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Box, Typography, IconButton, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';

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
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};
    
    // Validação de campos obrigatórios
    if (!formData.personalInfo.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    if (!formData.personalInfo.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.personalInfo.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.personalInfo.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    }

    // Validação de Experiência
    formData.experience.forEach((exp, index) => {
      if (!exp.company.trim()) {
        newErrors[`experience_${index}_company`] = 'Empresa é obrigatória';
      }
      if (!exp.position.trim()) {
        newErrors[`experience_${index}_position`] = 'Cargo é obrigatório';
      }
      if (!exp.startDate) {
        newErrors[`experience_${index}_startDate`] = 'Data de início é obrigatória';
      }
    });

    // Validação de Educação
    formData.education.forEach((edu, index) => {
      if (!edu.institution.trim()) {
        newErrors[`education_${index}_institution`] = 'Instituição é obrigatória';
      }
      if (!edu.course.trim()) {
        newErrors[`education_${index}_course`] = 'Curso é obrigatório';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: '2-digit'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem('curriculumData', JSON.stringify(formData));
      navigate('/preview');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Container maxWidth="md">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, mb: 4 }}>
        {Object.keys(errors).length > 0 && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Por favor, corrija os erros antes de continuar
          </Alert>
        )}

        <Typography variant="h4" gutterBottom>Informações Pessoais</Typography>
        
        <Box sx={{ display: 'grid', gap: 2, mb: 4 }}>
          <TextField
            fullWidth
            label="Nome Completo"
            name="name"
            value={formData.personalInfo.name}
            onChange={handlePersonalInfoChange}
            required
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.personalInfo.email}
            onChange={handlePersonalInfoChange}
            required
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            label="Telefone"
            name="phone"
            value={formData.personalInfo.phone}
            onChange={handlePersonalInfoChange}
            required
            error={!!errors.phone}
            helperText={errors.phone}
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
                error={!!errors[`education_${index}_institution`]}
                helperText={errors[`education_${index}_institution`]}
              />
              <TextField
                fullWidth
                label="Curso"
                value={edu.course}
                onChange={(e) => handleEducationChange(index, 'course', e.target.value)}
                error={!!errors[`education_${index}_course`]}
                helperText={errors[`education_${index}_course`]}
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
                error={!!errors[`experience_${index}_company`]}
                helperText={errors[`experience_${index}_company`]}
              />
              <TextField
                fullWidth
                label="Cargo"
                value={exp.position}
                onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                required
                error={!!errors[`experience_${index}_position`]}
                helperText={errors[`experience_${index}_position`]}
              />
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <TextField
                  label="Data Início"
                  type="date"
                  value={exp.startDate}
                  onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  required
                  error={!!errors[`experience_${index}_startDate`]}
                  helperText={errors[`experience_${index}_startDate`]}
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