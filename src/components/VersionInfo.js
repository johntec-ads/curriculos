import React, { useState, useEffect } from 'react';
import { Box, Typography, Tooltip } from '@mui/material';

const VersionInfo = ({ showBuildDate = true, position = 'bottomRight' }) => {
  const [version, setVersion] = useState('0.1.0'); // Versão padrão
  
  useEffect(() => {
    // Tenta obter a versão do package.json via ambiente
    const appVersion = process.env.REACT_APP_VERSION || '0.1.0';
    setVersion(appVersion);
  }, []);

  // Determinar data e hora da construção
  const buildDate = new Date().toLocaleString('pt-BR');

  // Adicionar um sufixo indicando ambiente de desenvolvimento
  const isDevelopment = process.env.NODE_ENV === 'development';
  const versionDisplay = isDevelopment ? `${version}-dev` : version;

  // Configurar estilos de posicionamento
  const positionStyles = {
    bottomRight: {
      position: 'fixed',
      right: '8px',
      bottom: '8px',
    },
    bottomLeft: {
      position: 'fixed',
      left: '8px',
      bottom: '8px',
    },
    topRight: {
      position: 'fixed',
      right: '8px',
      top: '8px',
    },
    topLeft: {
      position: 'fixed',
      left: '8px',
      top: '8px',
    }
  };

  // Determinar estilo de fundo com base no ambiente
  const backgroundColor = isDevelopment ? 'rgba(255, 193, 7, 0.15)' : 'rgba(76, 175, 80, 0.15)';
  
  return (
    <Tooltip 
      title={`Versão: ${versionDisplay}${showBuildDate ? `\nCompilação: ${buildDate}` : ''}`}
      placement="top"
      arrow
    >
      <Box
        sx={{
          ...positionStyles[position],
          backgroundColor,
          color: 'text.secondary',
          fontSize: '0.7rem',
          padding: '2px 6px',
          borderRadius: '4px',
          zIndex: 1000,
          opacity: 0.8,
          '&:hover': {
            opacity: 1,
            cursor: 'help'
          },
        }}
      >
        <Typography variant="caption" component="div" sx={{ fontWeight: 'medium' }}>
          v{versionDisplay}
        </Typography>
      </Box>
    </Tooltip>
  );
};

export default VersionInfo;