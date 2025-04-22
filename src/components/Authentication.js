import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Divider,
  IconButton,
  Alert,
  Tabs,
  Tab,
  CircularProgress,
  useMediaQuery,
  useTheme
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
  const [operationCompleted, setOperationCompleted] = useState(false);
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);
  const timeoutIdRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const { login, signup, loginWithGoogle, resetPassword, currentUser, redirectInProgress } = useAuth();

  // Fechar modal quando o redirecionamento para login Google for iniciado em dispositivos móveis
  useEffect(() => {
    if (redirectInProgress) {
      console.log("Redirecionamento em progresso, fechando modal...");
      onClose();
    }
  }, [redirectInProgress, onClose]);

  // Reset do estado quando o modal é aberto/fechado
  useEffect(() => {
    if (open) {
      setError('');
      setSuccess('');
      setIsGoogleLogin(false);
    }
  }, [open]);

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
      setOperationCompleted(false);
      await login(email, password);
      setOperationCompleted(true);
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
      setOperationCompleted(false);
      await signup(email, password);
      setOperationCompleted(true);
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
      setOperationCompleted(false);
      setIsGoogleLogin(true);
      
      console.log("Iniciando login com Google...");
      await loginWithGoogle();
      
      // Se não for redirecionamento (desktop), vamos fechar o modal após login bem-sucedido
      // Em dispositivos móveis, o redirecionamento já fechará o modal através do useEffect
      if (!redirectInProgress) {
        setSuccess('Login com Google realizado com sucesso!');
        setTimeout(() => {
          onClose();
          if (afterLogin) afterLogin();
        }, 1000);
      }
    } catch (error) {
      console.error("Erro capturado no handleGoogleLogin:", error);
      setError('Erro ao fazer login com Google. Tente novamente');
      setIsGoogleLogin(false);
    } finally {
      if (!redirectInProgress) {
        setLoading(false);
      }
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
      setOperationCompleted(false);
      await resetPassword(email);
      setOperationCompleted(true);
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

  // Fechar o modal automaticamente se o usuário for autenticado
  useEffect(() => {
    if (currentUser && (loading || isGoogleLogin)) {
      console.log("Usuário autenticado detectado:", currentUser.email);
      setOperationCompleted(true);
      setLoading(false);
      setIsGoogleLogin(false);
      
      // Limpar qualquer temporizador pendente
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
      
      // Fechar o modal imediatamente
      console.log("Fechando modal após autenticação bem-sucedida");
      onClose();
      if (afterLogin) afterLogin();
    }
  }, [currentUser, loading, isGoogleLogin, onClose, afterLogin]);

  // Temporizador de segurança revisado
  useEffect(() => {
    if (loading && !isGoogleLogin && !redirectInProgress) {
      console.log("Iniciando temporizador de segurança...");
      
      // Limpar qualquer temporizador existente
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      
      timeoutIdRef.current = setTimeout(() => {
        if (!operationCompleted) {
          console.log("Temporizador de segurança acionado - operação não concluída");
          setLoading(false);
          
          // Verificar novamente se o usuário foi autenticado
          if (currentUser) {
            console.log("Usuário já está autenticado, fechando modal");
            onClose();
            if (afterLogin) afterLogin();
          } else {
            setError('A operação demorou muito tempo. Por favor, tente novamente.');
          }
        }
      }, 5000);
    }
    
    return () => {
      if (timeoutIdRef.current) {
        console.log("Limpando temporizador de segurança");
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [loading, operationCompleted, currentUser, onClose, afterLogin, isGoogleLogin, redirectInProgress]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: { xs: '95%', sm: '450px' },
          m: { xs: 1, sm: 2 },
          p: { xs: 1, sm: 2 }
        }
      }}
    >
      <DialogTitle>
        {forgotPassword ? 'Recuperar Senha' : 'Acesse sua Conta'}
        <IconButton
          aria-label="close"
          onClick={onClose}
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
              sx={{
                py: 1,
                fontSize: { xs: '0.95rem', sm: '1rem' }
              }}
            >
              {isMobile ? 'Entrar com Google' : 'Continuar com Google'}
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