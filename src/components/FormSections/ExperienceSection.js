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
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';

function ExperienceSection({ formik }) {
  const addExperience = () => {
    const newExperience = {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    formik.setFieldValue('experience', [
      ...formik.values.experience,
      newExperience,
    ]);
  };

  const removeExperience = (index) => {
    const newExperience = formik.values.experience.filter(
      (_, i) => i !== index
    );
    formik.setFieldValue('experience', newExperience);
  };

  const getFieldError = (index, fieldName) => {
    const field = formik.errors.experience?.[index]?.[fieldName];
    const touched = formik.touched.experience?.[index]?.[fieldName];
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
        Experiência Profissional
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Liste suas experiências profissionais, começando pela mais recente
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>💡 Dicas importantes:</strong>
        </Typography>
        <Typography variant="body2" component="ul" sx={{ mt: 1, mb: 0, pl: 2 }}>
          <li>Comece pela experiência mais recente</li>
          <li>Use verbos de ação: "Desenvolvi", "Gerenciei", "Implementei"</li>
          <li>
            Quantifique resultados quando possível: "Aumentei vendas em 30%"
          </li>
          <li>Foque em conquistas, não apenas em responsabilidades</li>
        </Typography>
      </Alert>

      {formik.values.experience.map((exp, index) => (
        <Paper
          key={index}
          elevation={2}
          sx={{
            p: 3,
            mb: 3,
            borderLeft: '4px solid',
            borderColor: 'primary.main',
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
              label={`Experiência ${index + 1}`}
              color="primary"
              size="small"
              icon={<WorkIcon />}
            />
            {formik.values.experience.length > 1 && (
              <Tooltip title="Remover esta experiência">
                <IconButton
                  onClick={() => removeExperience(index)}
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
                label="Nome da Empresa"
                name={`experience[${index}].company`}
                value={exp.company}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!getFieldError(index, 'company')}
                helperText={
                  getFieldError(index, 'company') || 'Nome completo da empresa'
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
                label="Cargo/Função"
                name={`experience[${index}].position`}
                value={exp.position}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!getFieldError(index, 'position')}
                helperText={
                  getFieldError(index, 'position') ||
                  'Ex: Desenvolvedor Full Stack'
                }
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WorkIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Data de Início"
                name={`experience[${index}].startDate`}
                type="date"
                value={exp.startDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!getFieldError(index, 'startDate')}
                helperText={getFieldError(index, 'startDate')}
                required
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
                label="Data de Término"
                name={`experience[${index}].endDate`}
                type="date"
                value={exp.endDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!getFieldError(index, 'endDate')}
                helperText={
                  getFieldError(index, 'endDate') ||
                  'Deixe em branco se ainda trabalha aqui'
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
                label="Descrição das Atividades e Conquistas"
                name={`experience[${index}].description`}
                value={exp.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!getFieldError(index, 'description')}
                helperText={
                  getFieldError(index, 'description') ||
                  `Descreva suas responsabilidades e conquistas (${exp.description?.length || 0}/1000 caracteres)`
                }
                multiline
                rows={4}
                required
                placeholder="Ex: Desenvolvi aplicações web usando React e Node.js, resultando em aumento de 30% na produtividade da equipe. Implementei sistema de autenticação e gerenciei banco de dados..."
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
        onClick={addExperience}
        fullWidth
        sx={{ mt: 2, py: 1.5 }}
      >
        Adicionar Outra Experiência
      </Button>

      {formik.values.experience.length === 0 && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          Você precisa adicionar pelo menos uma experiência profissional
        </Alert>
      )}
    </Box>
  );
}

export default ExperienceSection;
