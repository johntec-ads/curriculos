import {
  Box,
  TextField,
  Typography,
  Button,
  IconButton,
  Paper,
  Grid,
  Chip,
  Alert,
  Tooltip,
  InputAdornment,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';
import MenuBookIcon from '@mui/icons-material/MenuBook';

function EducationSection({ formik }) {
  const addEducation = () => {
    const newEducation = {
      institution: '',
      course: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    formik.setFieldValue('education', [
      ...formik.values.education,
      newEducation,
    ]);
  };

  const removeEducation = (index) => {
    const newEducation = formik.values.education.filter((_, i) => i !== index);
    formik.setFieldValue('education', newEducation);
  };

  const getFieldError = (index, fieldName) => {
    const field = formik.errors.education?.[index]?.[fieldName];
    const touched = formik.touched.education?.[index]?.[fieldName];
    return touched && field;
  };

  return (
    <Box>
      <Typography
        variant="h5"
        gutterBottom
        fontWeight="bold"
        color="primary"
        sx={{ mb: 1 }}
      >
        Formação Acadêmica
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Adicione sua formação acadêmica, começando pela mais recente
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>💡 O que incluir:</strong>
        </Typography>
        <Typography variant="body2" component="ul" sx={{ mt: 1, mb: 0, pl: 2 }}>
          <li>Graduação, pós-graduação, mestrado, doutorado</li>
          <li>Cursos técnicos relevantes para sua área</li>
          <li>Certificações importantes (ex: AWS, PMP, etc.)</li>
          <li>Mencione projetos acadêmicos relevantes na descrição</li>
        </Typography>
      </Alert>

      {formik.values.education.map((edu, index) => (
        <Paper
          key={index}
          elevation={2}
          sx={{
            p: 3,
            mb: 3,
            borderLeft: '4px solid',
            borderColor: 'secondary.main',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Chip
              label={`Formação ${index + 1}`}
              color="secondary"
              size="small"
              icon={<SchoolIcon />}
            />
            {formik.values.education.length > 1 && (
              <Tooltip title="Remover esta formação">
                <IconButton
                  onClick={() => removeEducation(index)}
                  color="error"
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Instituição de Ensino"
                name={`education[${index}].institution`}
                value={edu.institution}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!getFieldError(index, 'institution')}
                helperText={
                  getFieldError(index, 'institution') ||
                  'Nome da universidade, escola ou instituição'
                }
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Curso/Formação"
                name={`education[${index}].course`}
                value={edu.course}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!getFieldError(index, 'course')}
                helperText={
                  getFieldError(index, 'course') ||
                  'Ex: Bacharelado em Ciência da Computação'
                }
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MenuBookIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Data de Início"
                name={`education[${index}].startDate`}
                type="date"
                value={edu.startDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!getFieldError(index, 'startDate')}
                helperText={getFieldError(index, 'startDate')}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Data de Conclusão"
                name={`education[${index}].endDate`}
                type="date"
                value={edu.endDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!getFieldError(index, 'endDate')}
                helperText={
                  getFieldError(index, 'endDate') ||
                  'Deixe em branco se ainda está cursando'
                }
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descrição (Opcional)"
                name={`education[${index}].description`}
                value={edu.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!getFieldError(index, 'description')}
                helperText={
                  getFieldError(index, 'description') ||
                  `Projetos relevantes, prêmios ou destaques (${edu.description?.length || 0}/500 caracteres)`
                }
                multiline
                rows={3}
                placeholder="Ex: Projeto de conclusão sobre Inteligência Artificial. Bolsista de iniciação científica. Participei do programa de monitoria..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ alignSelf: 'flex-start', mt: 2 }}
                    >
                      <DescriptionIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={addEducation}
        fullWidth
        sx={{ mt: 2, py: 1.5 }}
      >
        Adicionar Outra Formação
      </Button>

      {formik.values.education.length === 0 && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          Você precisa adicionar pelo menos uma formação acadêmica
        </Alert>
      )}
    </Box>
  );
}

export default EducationSection;
