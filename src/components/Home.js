import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

function Home() {
  return (
    <Container maxWidth="sm">
      <Box 
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3
        }}
      >
        {/* Logo e Identificação */}
        <Typography 
          variant="h3" 
          sx={{ 
            color: '#1976d2',
            fontWeight: 'bold',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}
        >
          JOHNTEC.ADS
        </Typography>

        <Typography variant="h4" component="h1" gutterBottom>
          Gerador de Currículos
        </Typography>

        <Typography variant="body1" align="center" paragraph>
          Crie seu currículo profissional de forma rápida e fácil. 
          Escolha entre diversos templates e exporte em PDF.
        </Typography>

        <Button
          component={Link}
          to="/create"
          variant="contained"
          color="primary"
          size="large"
          sx={{ minWidth: '200px' }}
        >
          Criar Novo Currículo
        </Button>

        {/* Informações de Contato */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Desenvolvido por JOHNTEC.ADS
          </Typography>
          <Typography variant="body2" color="text.secondary">
            johntec.ads@gmail.com
          </Typography>
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} Todos os direitos reservados
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default Home;
