import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Divider,
  IconButton,
  Alert,
  Tabs,
  Tab,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GoogleIcon from '@mui/icons-material/Google';
import { useAuth } from '../context/AuthContext';

function Authentication({ open, onClose, afterLogin }) {
  const [tab, setTab] = useState(0); // 0 para login, 1 para registro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);
  
  const { login, signup, loginWithGoogle, resetPassword } = useAuth();

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    setError('');
    setSuccess('');
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !validateEmail(email)) {
      setError('Por favor, insira um email válido');
      return;
    }
    
    if (!password) {
      setError('Por favor, insira sua senha');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      setSuccess('Login realizado com sucesso!');
      setTimeout(() => {
        onClose();
        if (afterLogin) afterLogin();
      }, 1000);
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setError('Email ou senha incorretos');
      } else if (error.code === 'auth/too-many-requests') {
        setError('Muitas tentativas. Tente novamente mais tarde');
      } else {
        setError('Erro ao fazer login. Tente novamente');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!email || !validateEmail(email)) {
      setError('Por favor, insira um email válido');
      return;
    }
    
    if (!password) {
      setError('Por favor, insira uma senha');
      return;
    }
    
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('As senhas não conferem');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      setSuccess('Conta criada com sucesso!');
      setTimeout(() => {
        onClose();
        if (afterLogin) afterLogin();
      }, 1000);
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        setError('Este email já está sendo usado');
      } else {
        setError('Erro ao criar conta. Tente novamente');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      onClose();
      if (afterLogin) afterLogin();
    } catch (error) {
      console.error(error);
      setError('Erro ao fazer login com Google. Tente novamente');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (!email || !validateEmail(email)) {
      setError('Por favor, insira um email válido');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      await resetPassword(email);
      setSuccess('Email de redefinição enviado. Verifique sua caixa de entrada');
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/user-not-found') {
        setError('Email não encontrado');
      } else {
        setError('Erro ao enviar email de redefinição');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={loading ? null : onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {forgotPassword ? 'Recuperar Senha' : 'Acesse sua Conta'}
        <IconButton
          aria-label="close"
          onClick={onClose}
          disabled={loading}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent>
        {!forgotPassword && (
          <Tabs 
            value={tab} 
            onChange={handleTabChange} 
            variant="fullWidth" 
            sx={{ mb: 3 }}
          >
            <Tab label="Login" />
            <Tab label="Criar Conta" />
          </Tabs>
        )}
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        
        {forgotPassword ? (
          <Box component="form" onSubmit={handleResetPassword} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Enviar email de recuperação'}
            </Button>
            
            <Button
              fullWidth
              variant="text"
              onClick={() => setForgotPassword(false)}
              disabled={loading}
            >
              Voltar ao login
            </Button>
          </Box>
        ) : (
          <>
            {tab === 0 ? (
              <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Entrar'}
                </Button>
                
                <Button
                  variant="text"
                  size="small"
                  onClick={() => setForgotPassword(true)}
                  disabled={loading}
                  sx={{ mb: 2 }}
                >
                  Esqueci minha senha
                </Button>
              </Box>
            ) : (
              <Box component="form" onSubmit={handleSignup} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  helperText="A senha deve ter pelo menos 6 caracteres"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirmar Senha"
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                />
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Criar Conta'}
                </Button>
              </Box>
            )}
          </>
        )}
        
        {!forgotPassword && (
          <>
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                OU
              </Typography>
            </Divider>
            
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              Continuar com Google
            </Button>
          </>
        )}
        
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3 }}>
          Ao fazer login, você concorda com nossos Termos de Uso e Política de Privacidade.
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

export default Authentication;