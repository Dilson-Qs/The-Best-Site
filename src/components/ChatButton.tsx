import { FC, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
import TelegramIcon from '@mui/icons-material/Telegram';
import MessageIcon from '@mui/icons-material/Message';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

interface ChatButtonProps {
  telegramUrl?: string;
  zangiUrl?: string;
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  sx?: any;
}

const ChatButton: FC<ChatButtonProps> = ({ 
  telegramUrl, 
  zangiUrl = 'https://services.zangi.com/dl/conversation/5222074953',
  variant = 'outlined',
  size = 'medium',
  fullWidth = false,
  sx = {}
}) => {
  const [open, setOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent click from bubbling to parent elements
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTelegramClick = (event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation(); // Prevent click from bubbling
    }
    if (telegramUrl) {
      window.open(telegramUrl, '_blank', 'noopener,noreferrer');
    }
    handleClose();
  };

  const handleZangiClick = (event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation(); // Prevent click from bubbling
    }
    // Zangi não suporta mensagens pré-configuradas via URL da mesma forma que Telegram
    // O link abre a conversa diretamente
    window.open(zangiUrl, '_blank', 'noopener,noreferrer');
    handleClose();
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        startIcon={<ChatIcon />}
        endIcon={<KeyboardArrowDownIcon />}
        onClick={handleClick}
        sx={{
          ...sx,
        }}
      >
        Chat
      </Button>
      
      <Dialog
        open={open}
        onClose={handleClose}
        onClick={(e) => e.stopPropagation()}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }
        }}
      >
        {/* Header com X */}
        <DialogTitle sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          pb: 1,
          background: theme => theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(0,136,204,0.1) 0%, rgba(0,191,165,0.1) 100%)'
            : 'linear-gradient(135deg, rgba(0,136,204,0.05) 0%, rgba(0,191,165,0.05) 100%)',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ChatIcon sx={{ color: '#0088cc' }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Choose Chat Platform
            </Typography>
          </Box>
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{
              color: theme => theme.palette.text.secondary,
              '&:hover': {
                backgroundColor: theme => theme.palette.mode === 'dark' 
                  ? 'rgba(255,255,255,0.1)' 
                  : 'rgba(0,0,0,0.05)',
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 2, pb: 3 }}>
          {/* Info message */}
          <Box sx={{ 
            px: 2, 
            py: 1.5, 
            mb: 2,
            backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(0,191,165,0.1)' : 'rgba(0,191,165,0.05)',
            borderRadius: 2,
            border: theme => theme.palette.mode === 'dark' 
              ? '1px solid rgba(0,191,165,0.2)' 
              : '1px solid rgba(0,191,165,0.15)',
          }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: theme => theme.palette.mode === 'dark' ? '#B4B4C8' : '#5F5F7A',
                lineHeight: 1.5,
              }}
            >
              💡 <strong>Tip:</strong> If Telegram messages fail, try Zangi for secure and reliable communication.
            </Typography>
          </Box>

          {/* Telegram Option */}
          <Button
            fullWidth
            variant="outlined"
            size="large"
            startIcon={<TelegramIcon />}
            onClick={(e) => handleTelegramClick(e)}
            disabled={!telegramUrl}
            sx={{
              mb: 2,
              py: 2,
              justifyContent: 'flex-start',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              borderWidth: 2,
              borderColor: '#0088cc',
              color: '#0088cc',
              '&:hover': {
                borderWidth: 2,
                borderColor: '#0088cc',
                backgroundColor: 'rgba(0,136,204,0.08)',
                transform: 'translateX(4px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <Box sx={{ flex: 1, textAlign: 'left', ml: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                Telegram
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Fast and popular
              </Typography>
            </Box>
          </Button>

          {/* Zangi Option */}
          <Button
            fullWidth
            variant="outlined"
            size="large"
            startIcon={<MessageIcon />}
            onClick={(e) => handleZangiClick(e)}
            sx={{
              py: 2,
              justifyContent: 'flex-start',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              borderWidth: 2,
              borderColor: '#00BFA5',
              color: '#00BFA5',
              '&:hover': {
                borderWidth: 2,
                borderColor: '#00BFA5',
                backgroundColor: 'rgba(0,191,165,0.08)',
                transform: 'translateX(4px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <Box sx={{ flex: 1, textAlign: 'left', ml: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>
                    Zangi
                  </Typography>
                  <Chip 
                    label="NEW" 
                    size="small" 
                    sx={{ 
                      height: 18,
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #00E676 0%, #00BFA5 100%)',
                      color: 'white',
                      '& .MuiChip-label': {
                        px: 0.8,
                        py: 0
                      }
                    }} 
                  />
                </Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Secure and private
                </Typography>
              </Box>
            </Box>
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatButton;
