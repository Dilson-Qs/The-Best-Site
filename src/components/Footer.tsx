import type { FC } from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import { useSiteConfig } from '../context/SiteConfigContext';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import WarningIcon from '@mui/icons-material/Warning';
import Divider from '@mui/material/Divider';
import SettingsIcon from '@mui/icons-material/Settings';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  const theme = useTheme();
  const { siteName } = useSiteConfig();
  const [showSecretButton, setShowSecretButton] = useState(false);
  const [credentials, setCredentials] = useState({ projectId: '', apiKey: '' });
  
  const handleBuyTemplate = () => {
    window.open('https://t.me/admUnlock', '_blank');
  };

  // Detectar combinação de teclas para mostrar botão secreto (Ctrl + Alt + S)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.altKey && event.key === 's') {
        setShowSecretButton(true);
        // Esconder após 10 segundos
        setTimeout(() => setShowSecretButton(false), 10000);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Carregar credenciais salvas
  useEffect(() => {
    // Não dependemos mais do Appwrite
    const saved = { projectId: '', apiKey: '' };
    setCredentials(saved);
  }, []);

  const handleSecretConfig = () => {
    const projectId = prompt('Digite o Access Key do Wasabi:');
    const apiKey = prompt('Digite a Secret Key do Wasabi:');
    
    if (projectId && apiKey) {
      // Não dependemos mais do Appwrite - salvar em localStorage
      localStorage.setItem('wasabi-config', JSON.stringify({ projectId, apiKey }));
      setCredentials({ projectId, apiKey });
      alert('Credenciais salvas com sucesso!');
    }
  };
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 4, 
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(180deg, rgba(15,15,15,0.95) 0%, rgba(10,10,10,0.98) 100%)'
          : 'linear-gradient(180deg, rgba(250,250,252,0.95) 0%, rgba(255,255,255,0.98) 100%)',
        borderTop: theme.palette.mode === 'dark'
          ? '1px solid rgba(255,255,255,0.05)'
          : '1px solid rgba(0,0,0,0.06)',
        color: theme.palette.mode === 'dark' ? '#fff' : '#111',
        mt: 4
      }}
    >
      {/* Age verification disclaimer */}
      <Box 
        sx={{ 
          background: theme.palette.mode === 'dark' 
            ? 'rgba(13,71,161,0.08)' 
            : 'rgba(13,71,161,0.04)', 
          p: 1.5, 
          mb: 3,
          borderRadius: 1.5,
          display: 'flex',
          alignItems: 'center',
          maxWidth: 1200,
          mx: 'auto',
          border: theme.palette.mode === 'dark'
            ? '1px solid rgba(13,71,161,0.2)'
            : '1px solid rgba(13,71,161,0.1)'
        }}
      >
        <WarningIcon sx={{ color: theme.palette.primary.main, mr: 1.5, fontSize: '1.2rem' }} />
        <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? 'white' : '#111', fontSize: '0.85rem' }}>
          <strong>AGE VERIFICATION:</strong> Adult content (18+). By accessing this site, you confirm you are at least 18 years old.
        </Typography>
      </Box>
      
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ color: '#d32f2f', fontWeight: 'bold', mb: 2 }}>
                {siteName}
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)' }}>
                We offer exclusive premium adult content for our users. 
                All videos are carefully selected to ensure 
                the highest quality viewing experience for our 18+ audience.
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 'bold', mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link 
                href="/" 
                underline="hover" 
                sx={{ 
                  mb: 1.5, 
                  color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
                  '&:hover': {
                    color: '#d32f2f'
                  }
                }}
              >
                Home
              </Link>
              <Link 
                href="/videos" 
                underline="hover" 
                sx={{ 
                  mb: 1.5, 
                  color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
                  '&:hover': {
                    color: '#d32f2f'
                  }
                }}
              >
                Videos
              </Link>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  color: '#d32f2f',
                  mt: 1,
                  background: theme.palette.mode === 'dark' ? 'rgba(142,36,170,0.1)' : 'rgba(211,47,47,0.06)',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  width: 'fit-content'
                }}
              >
                <Typography variant="body2" fontWeight="bold">
                  18+ ADULTS ONLY
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 'bold', mb: 2 }}>
              Legal Information
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)' }} paragraph>
              This website contains adult-oriented material intended for individuals 18 years of age or older. 
              All models appearing on this website were 18 years of age or older at the time of production.
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)' }} paragraph>
              USC 2257 Record-Keeping Requirements Compliance Statement
            </Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4, borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }} />
        
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)' }}>
            &copy; {currentYear} {siteName}. All rights reserved. Adults only.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: { xs: 2, md: 0 } }}>
            <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)' }}>
              By accessing this site you agree that you are at least 18 years old
            </Typography>
            
            {/* Botão secreto - aparece com Ctrl + Alt + S */}
            {showSecretButton && (
              <Button 
                variant="outlined" 
                size="small"
                startIcon={<SettingsIcon />}
                onClick={handleSecretConfig}
                sx={{ 
                  ml: 2,
                  borderColor: '#d32f2f',
                  color: '#d32f2f',
                  '&:hover': { 
                    borderColor: '#b71c1c',
                    color: '#b71c1c'
                  }
                }}
              >
                Config
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
