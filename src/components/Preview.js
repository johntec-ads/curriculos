import { useEffect, useState, useRef } from 'react';
import { Container, Paper, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

function Preview() {
  const navigate = useNavigate();
  const printRef = useRef(null);
  const [curriculumData, setCurriculumData] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('curriculumData');
    if (data) {
      const parsedData = JSON.parse(data);
      setCurriculumData(parsedData);
    }
  }, []);

  useEffect(() => {
    if (curriculumData) {
      setIsDataLoaded(true);
    } else {
      setIsDataLoaded(false);
    }
  }, [curriculumData]);

  const handlePrint = async () => {
    const element = printRef.current;
    if (!element) return;

    setIsGenerating(true);
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Curriculo_${curriculumData?.personalInfo?.name || 'Novo'}.pdf`);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar o PDF. Tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBack = () => {
    navigate('/create');
  };

  if (!isDataLoaded) return <div>Carregando...</div>;

  if (!curriculumData) return <div>Nenhum dado encontrado.</div>;

  return (
    <Container maxWidth="md">
      <Paper
        ref={printRef}
        sx={{
          p: 4,
          mt: 4,
          mb: 4,
          width: '210mm',
          minHeight: '297mm',
          margin: 'auto',
          backgroundColor: '#fff',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          position: 'relative',
          overflow: 'hidden',
          '@media print': {
            margin: 0,
            boxShadow: 'none',
            padding: '20mm'
          }
        }}
      >
        {/* Marca d'água */}
        <Typography
          sx={{
            position: 'absolute',
            bottom: '40px',
            right: '20px',
            transform: 'rotate(-45deg)',
            color: 'rgba(0, 0, 0, 0.03)',
            fontSize: '80px',
            pointerEvents: 'none',
            userSelect: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          johtec.ads
        </Typography>

        {/* Cabeçalho */}
        <Typography variant="h4" gutterBottom sx={{ borderBottom: '2px solid #1976d2' }}>
          {curriculumData.personalInfo.name}
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography>{curriculumData.personalInfo.email}</Typography>
          <Typography>{curriculumData.personalInfo.phone}</Typography>
          <Typography>{curriculumData.personalInfo.address}</Typography>
          {curriculumData.personalInfo.linkedin && (
            <Typography>LinkedIn: {curriculumData.personalInfo.linkedin}</Typography>
          )}
        </Box>

        {/* Objetivo */}
        {curriculumData.personalInfo.objective && (
          <>
            <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', mt: 3 }}>
              Objetivo Profissional
            </Typography>
            <Typography paragraph>{curriculumData.personalInfo.objective}</Typography>
          </>
        )}

        {/* Experiência */}
        <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', mt: 3 }}>
          Experiência Profissional
        </Typography>
        {curriculumData.experience.map((exp, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {exp.company} - {exp.position}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {exp.startDate} - {exp.endDate}
            </Typography>
            <Typography>{exp.description}</Typography>
          </Box>
        ))}

        {/* Educação */}
        <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', mt: 3 }}>
          Educação
        </Typography>
        {curriculumData.education.map((edu, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {edu.course}
            </Typography>
            <Typography variant="body2">
              {edu.institution} ({edu.startDate} - {edu.endDate})
            </Typography>
            <Typography>{edu.description}</Typography>
          </Box>
        ))}

        {/* Habilidades */}
        <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', mt: 3 }}>
          Habilidades
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {curriculumData.skills.map((skill, index) => (
            <Typography key={index} component="span" sx={{
              bgcolor: '#e3f2fd',
              px: 2,
              py: 0.5,
              borderRadius: 1
            }}>
              {skill}
            </Typography>
          ))}
        </Box>

        {/* Rodapé */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '10px',
            left: '0',
            right: '0',
            textAlign: 'center',
            borderTop: '1px solid #eee',
            pt: 1,
            mt: 4
          }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Desenvolvido por johtec.ads • {new Date().getFullYear()} • johntec.ads@gmail.com
          </Typography>
        </Box>
      </Paper>

      <Box sx={{ textAlign: 'center', mb: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button
          onClick={handleBack}
          variant="outlined"
          color="primary"
          size="large"
        >
          Voltar e Editar
        </Button>
        <Button
          onClick={handlePrint}
          variant="contained"
          color="primary"
          size="large"
          sx={{ minWidth: '200px' }}
          disabled={!isDataLoaded}
        >
          Gerar PDF
        </Button>
      </Box>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isGenerating}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress color="inherit" />
          <Typography sx={{ mt: 2, color: 'white' }}>
            Gerando PDF...
          </Typography>
        </Box>
      </Backdrop>
    </Container>
  );
}

export default Preview;
