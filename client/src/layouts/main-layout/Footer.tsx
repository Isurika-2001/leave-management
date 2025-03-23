import { Link, Stack, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Stack
      direction="row"
      justifyContent="flex-end" // Aligns the content to the right
      alignItems="center"
      sx={{
        py: 2, // Padding for better spacing
        px: { xs: 2, md: 4 },
        borderTop: 1, // Subtle top border for separation
        borderColor: 'grey.300',
      }}
    >
      <Typography 
        variant="body2" 
        fontFamily="Poppins" 
        color="text.secondary"
        textAlign="right" // Align text to the right
      >
        © {new Date().getFullYear()}  
        <Link
          href="https://themewagon.com"
          target="_blank"
          rel="noopener"
          sx={{ 
            color: 'text.primary', 
            textDecoration: 'none', 
            fontWeight: 600, 
            ml: 0.5,
            '&:hover': { color: 'primary.main', textDecoration: 'underline' } 
          }}
        >
          Isurika Samarakoon
        </Link>. All rights reserved.
      </Typography>
    </Stack>
  );
};

export default Footer;
