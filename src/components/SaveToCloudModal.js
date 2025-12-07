import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Stack } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { signInAnonymously, migrateLocalToCloud } from '../utils/firebaseService';
import { useNavigate } from 'react-router-dom';

function SaveToCloudModal({ open, onClose, localData, onSaved }) {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleOpenAuth = () => {
    // Mark that user intends to migrate after authentication
    try {
      localStorage.setItem('pendingCloudSave', 'true');
    } catch (e) {
      // ignore
    }
    onClose();
    // Navigate to home where authentication modal is available
    navigate('/');
  };

  const handleAnonymousSave = async () => {
    setLoading(true);
    setError('');
    try {
      const user = await signInAnonymously();
      // Firebase auth state will update; now migrate data
      await migrateLocalToCloud(user.uid, localData);
      if (onSaved) onSaved();
      onClose();
    } catch (e) {
      console.error(e);
      setError('Não foi possível salvar na nuvem. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleLater = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Salvar na nuvem</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <Typography>
            Você pode salvar seu currículo na nuvem para acessá‑lo de outros dispositivos, fazer backup automático
            e recuperá‑lo caso limpe o navegador. Não é obrigatório — seus dados continuarão disponíveis localmente.
          </Typography>

          <Typography variant="subtitle2">Opções</Typography>
          <ol>
            <li><b>Entrar / Criar conta:</b> Salve seus dados sob sua conta (recomendado).</li>
            <li><b>Salvar anonimamente:</b> Criamos um identificador temporário sem pedir dados — útil para testes rápidos.</li>
            <li><b>Mais tarde:</b> Mantém apenas localStorage no seu dispositivo.</li>
          </ol>

          {error && <Typography color="error">{error}</Typography>}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLater}>Mais tarde</Button>
        <Button onClick={handleAnonymousSave} disabled={loading} variant="outlined">Salvar anonimamente</Button>
        <Button onClick={handleOpenAuth} variant="contained">Entrar / Criar conta</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SaveToCloudModal;
