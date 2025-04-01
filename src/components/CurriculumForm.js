import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CurriculumForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      address: ''
    },
    education: [],
    experience: [],
    skills: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Armazena dados no localStorage para persistência temporária
    localStorage.setItem('curriculumData', JSON.stringify(formData));
    navigate('/preview');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos do formulário organizados em seções */}
    </form>
  );
}

export default CurriculumForm;