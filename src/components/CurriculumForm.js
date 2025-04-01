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
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Informações Pessoais
        </Typography>
        
        <Box sx={{ display: 'grid', gap: 2, marginBottom: 4 }}>
          <TextField
            fullWidth
            label="Nome Completo"
            name="name"
            value={formData.personalInfo.name}
            onChange={handlePersonalInfoChange}
            required
          />
          {/* Outros campos do formulário aqui */}
        </Box>

        <Button type="submit" variant="contained" color="primary" size="large">
          Visualizar Currículo
        </Button>
      </Box>
    </Container>
  );
}

export default CurriculumForm;