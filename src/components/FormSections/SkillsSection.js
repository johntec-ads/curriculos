import {
  Box,
  TextField,
  Typography,
  Button,
  IconButton,
  Chip,
  Alert,
  Paper,
  Grid,
  Tooltip,
  Autocomplete
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import LanguageIcon from '@mui/icons-material/Language';

// Sugestões comuns de habilidades
const commonSkills = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'PHP', 'Ruby',
  'React', 'Angular', 'Vue.js', 'Node.js', 'Express', 'Django', 'Flask',
  'HTML', 'CSS', 'SASS', 'Tailwind CSS', 'Bootstrap', 'Material-UI',
  'SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase',
  'Git', 'GitHub', 'GitLab', 'Docker', 'Kubernetes', 'CI/CD',
  'AWS', 'Azure', 'Google Cloud', 'Heroku', 'Vercel', 'Netlify',
  'REST API', 'GraphQL', 'Microservices', 'Agile', 'Scrum',
  'Testes Automatizados', 'Jest', 'Cypress', 'Selenium',
  'Comunicação', 'Liderança', 'Trabalho em equipe', 'Gestão de projetos',
  'Resolução de problemas', 'Pensamento crítico', 'Criatividade'
];

// Sugestões de idiomas com níveis
const commonLanguages = [
  'Português - Nativo',
  'Inglês - Fluente',
  'Inglês - Avançado',
  'Inglês - Intermediário',
  'Inglês - Básico',
  'Espanhol - Fluente',
  'Espanhol - Avançado',
  'Espanhol - Intermediário',
  'Espanhol - Básico',
  'Francês - Fluente',
  'Francês - Avançado',
  'Francês - Intermediário',
  'Francês - Básico',
  'Alemão - Fluente',
  'Alemão - Avançado',
  'Alemão - Intermediário',
  'Alemão - Básico',
  'Mandarim - Fluente',
  'Mandarim - Avançado',
  'Mandarim - Intermediário',
  'Mandarim - Básico'
];

function SkillsSection({ formik }) {
  const addSkill = () => {
    formik.setFieldValue('skills', [...formik.values.skills, '']);
  };

  const removeSkill = (index) => {
    const newSkills = formik.values.skills.filter((_, i) => i !== index);
    formik.setFieldValue('skills', newSkills);
  };

  const updateSkill = (index, value) => {
    const newSkills = [...formik.values.skills];
    newSkills[index] = value;
    formik.setFieldValue('skills', newSkills);
  };

  const addLanguage = () => {
    formik.setFieldValue('languages', [...formik.values.languages, '']);
  };

  const removeLanguage = (index) => {
    const newLanguages = formik.values.languages.filter((_, i) => i !== index);
    formik.setFieldValue('languages', newLanguages);
  };

  const updateLanguage = (index, value) => {
    const newLanguages = [...formik.values.languages];
    newLanguages[index] = value;
    formik.setFieldValue('languages', newLanguages);
  };

  const skillsError = formik.touched.skills && formik.errors.skills;
  const languagesError = formik.touched.languages && formik.errors.languages;

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight="bold" color="primary" sx={{ mb: 1 }}>
        Habilidades e Competências
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Liste suas principais habilidades técnicas e comportamentais
      </Typography>

      {/* Seção de Habilidades */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderLeft: '4px solid', borderColor: 'primary.main' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <EmojiObjectsIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight="bold">
            Habilidades Técnicas e Comportamentais
          </Typography>
        </Box>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>💡 Dica:</strong> Inclua habilidades técnicas (ferramentas, linguagens) e comportamentais (comunicação, liderança).
            Seja específico e honesto sobre seu nível de conhecimento.
          </Typography>
        </Alert>

        <Grid container spacing={2}>
          {formik.values.skills.map((skill, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                <Autocomplete
                  fullWidth
                  freeSolo
                  options={commonSkills}
                  value={skill}
                  onChange={(event, newValue) => updateSkill(index, newValue || '')}
                  onInputChange={(event, newValue) => updateSkill(index, newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={`Habilidade ${index + 1}`}
                      placeholder="Digite ou selecione"
                      size="small"
                      error={skillsError && !skill}
                    />
                  )}
                />
                {formik.values.skills.length > 1 && (
                  <Tooltip title="Remover">
                    <IconButton
                      onClick={() => removeSkill(index)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>

        {skillsError && typeof skillsError === 'string' && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {skillsError}
          </Alert>
        )}

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={addSkill}
          fullWidth
          sx={{ mt: 3, py: 1 }}
        >
          Adicionar Habilidade
        </Button>

        {/* Sugestões rápidas */}
        {formik.values.skills.filter(s => s).length < 5 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
              Sugestões rápidas:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {commonSkills.slice(0, 8).map((suggestion) => (
                <Chip
                  key={suggestion}
                  label={suggestion}
                  size="small"
                  onClick={() => {
                    if (!formik.values.skills.includes(suggestion)) {
                      const emptyIndex = formik.values.skills.findIndex(s => !s);
                      if (emptyIndex !== -1) {
                        updateSkill(emptyIndex, suggestion);
                      } else {
                        formik.setFieldValue('skills', [...formik.values.skills, suggestion]);
                      }
                    }
                  }}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>
          </Box>
        )}
      </Paper>

      {/* Seção de Idiomas */}
      <Paper elevation={2} sx={{ p: 3, borderLeft: '4px solid', borderColor: 'secondary.main' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LanguageIcon color="secondary" sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight="bold">
            Idiomas
          </Typography>
        </Box>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>💡 Dica:</strong> Inclua seu nível de proficiência: Nativo, Fluente, Avançado, Intermediário ou Básico.
            Ex: "Inglês - Avançado" ou "Espanhol - Intermediário"
          </Typography>
        </Alert>

        <Grid container spacing={2}>
          {formik.values.languages.map((language, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                <Autocomplete
                  fullWidth
                  freeSolo
                  options={commonLanguages}
                  value={language}
                  onChange={(event, newValue) => updateLanguage(index, newValue || '')}
                  onInputChange={(event, newValue) => updateLanguage(index, newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={`Idioma ${index + 1}`}
                      placeholder="Ex: Inglês - Avançado"
                      size="small"
                      error={languagesError && !language}
                    />
                  )}
                />
                {formik.values.languages.length > 1 && (
                  <Tooltip title="Remover">
                    <IconButton
                      onClick={() => removeLanguage(index)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>

        {languagesError && typeof languagesError === 'string' && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {languagesError}
          </Alert>
        )}

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={addLanguage}
          fullWidth
          sx={{ mt: 3, py: 1 }}
        >
          Adicionar Idioma
        </Button>
      </Paper>
    </Box>
  );
}

export default SkillsSection;
