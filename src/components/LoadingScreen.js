import {
  Box,
  CircularProgress,
  Typography,
  LinearProgress,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function LoadingScreen({
  message = 'Carregando...',
  progress = null,
  steps = [],
}) {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          maxWidth: 400,
          width: '90%',
          backgroundColor: 'rgba(255,255,255,0.95)',
          borderRadius: 4,
          p: 4,
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
      >
        <CircularProgress
          size={60}
          thickness={4}
          sx={{
            mb: 3,
            color: '#667eea',
          }}
        />

        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: '#2c3e50',
            mb: 2,
          }}
        >
          {message}
        </Typography>

        {progress !== null && (
          <Box sx={{ width: '100%', mb: 2 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: '#e0e7ff',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#667eea',
                  borderRadius: 4,
                },
              }}
            />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 1, display: 'block' }}
            >
              {Math.round(progress)}% completo
            </Typography>
          </Box>
        )}

        {steps.length > 0 && (
          <Box sx={{ mt: 3, textAlign: 'left' }}>
            {steps.map((step, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 1,
                  opacity: step.completed ? 1 : 0.5,
                }}
              >
                {step.completed ? (
                  <CheckCircleIcon sx={{ color: '#10b981', fontSize: 20 }} />
                ) : (
                  <CircularProgress size={20} thickness={4} />
                )}
                <Typography
                  variant="body2"
                  color={step.completed ? 'success.main' : 'text.secondary'}
                >
                  {step.label}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        <Typography
          variant="caption"
          sx={{
            display: 'block',
            mt: 3,
            color: 'text.secondary',
            fontStyle: 'italic',
          }}
        >
          Aguarde enquanto preparamos tudo para você...
        </Typography>
      </Box>
    </Box>
  );
}

export default LoadingScreen;
