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
        <Typography variant="h3" component="h1" gutterBottom>
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
        >
          Criar Novo Currículo
        </Button>
      </Box>
    </Container>
  );
}

export default Home;
