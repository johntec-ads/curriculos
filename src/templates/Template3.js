import { forwardRef } from 'react';
import { Paper, Typography, Box, Button, Backdrop, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Template3 = forwardRef(({ data, onPrint, onBack, isGenerating }, ref) => {
  const formatDate = (date) => {
    if (!date) return 'Presente';
    return new Date(date).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long'
    });
  };

  const sortByDate = (items) => {
    return [...items].sort((a, b) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);
      return dateB - dateA;
    });
  };

  if (!data) return null;

  return (
    <>
      <Paper 
        ref={ref}
        sx={{
          width: '210mm',
          minHeight: '297mm',
          margin: '32px auto',
          p: 4,
          backgroundColor: '#fff',
          position: 'relative',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        {/* Cabeçalho */}
        <Box sx={{ 
          textAlign: 'center', 
          borderBottom: '2px solid #e0e0e0',
          pb: 2,
          mb: 4
        }}>
          <Typography variant="h3" sx={{ color: '#333' }}>
            {data?.personalInfo?.name || 'Nome não informado'}
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 3,
            mt: 2,
            color: '#666',
            flexWrap: 'wrap'
          }}>
            <Typography variant="body2">{data?.personalInfo?.email}</Typography>
            <Typography variant="body2">{data?.personalInfo?.phone}</Typography>
            <Typography variant="body2">{data?.personalInfo?.address}</Typography>
            {data?.personalInfo?.linkedin && (
              <Typography variant="body2">{data.personalInfo.linkedin}</Typography>
            )}
          </Box>
        </Box>

        {/* Objetivo */}
        {data.personalInfo.objective && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="body1" sx={{ textAlign: 'center', fontStyle: 'italic' }}>
              {data.personalInfo.objective}
            </Typography>
          </Box>
        )}

        {/* Grid de 2 colunas */}
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 4
        }}>
          {/* Coluna Esquerda */}
          <Box>
            {/* Experiência */}
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2,
                pb: 1,
                borderBottom: '1px solid #e0e0e0'
              }}
            >
              Experiência Profissional
            </Typography>
            {sortByDate(data.experience).map((exp, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>
                  {exp.position}
                </Typography>
                <Typography variant="subtitle2" sx={{ color: '#666' }}>
                  {exp.company}
                </Typography>
                <Typography variant="caption" sx={{ color: '#888' }}>
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {exp.description}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Coluna Direita */}
          <Box>
            {/* Educação */}
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2,
                pb: 1,
                borderBottom: '1px solid #e0e0e0'
              }}
            >
              Educação
            </Typography>
            {data.education.map((edu, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>
                  {edu.course}
                </Typography>
                <Typography variant="subtitle2" sx={{ color: '#666' }}>
                  {edu.institution}
                </Typography>
                <Typography variant="caption" sx={{ color: '#888' }}>
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </Typography>
                {edu.description && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {edu.description}
                  </Typography>
                )}
              </Box>
            ))}

            {/* Habilidades */}
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2,
                pb: 1,
                borderBottom: '1px solid #e0e0e0',
                mt: 4
              }}
            >
              Habilidades
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 1 
            }}>
              {data.skills.map((skill, index) => (
                <Box
                  key={index}
                  sx={{
                    bgcolor: '#f5f5f5',
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.875rem'
                  }}
                >
                  {skill}
                </Box>
              ))}
            </Box>

            {/* Idiomas */}
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2,
                pb: 1,
                borderBottom: '1px solid #e0e0e0',
                mt: 4
              }}
            >
              Idiomas
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 1 
            }}>
              {data.languages.map((language, index) => (
                <Box
                  key={index}
                  sx={{
                    bgcolor: '#f5f5f5',
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.875rem'
                  }}
                >
                  {language}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Paper>

      <Box sx={{ textAlign: 'center', mb: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button onClick={onBack} variant="outlined" color="primary" size="large">
          Voltar e Editar
        </Button>
        <Button
          onClick={onPrint}
          variant="contained" 
          color="primary"
          size="large"
          disabled={isGenerating}
        >
          Gerar PDF
        </Button>
      </Box>

      <Backdrop open={isGenerating}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress color="inherit" />
          <Typography sx={{ mt: 2, color: 'white' }}>
            Gerando PDF...
          </Typography>
        </Box>
      </Backdrop>
    </>
  );
});

export default function Template3Wrapper(props) {
  const navigate = useNavigate();
  const [data] = useState({
    personalInfo: {
      name: 'João da Silva',
      email: 'joao.silva@example.com',
      phone: '(11) 99999-9999',
      address: 'Rua Exemplo, 123, São Paulo, SP',
      linkedin: 'linkedin.com/in/joaosilva',
      objective: 'Busco uma posição desafiadora como Desenvolvedor Frontend para aplicar meus conhecimentos em React e contribuir para o crescimento da empresa.'
    },
    education: [
      {
        institution: 'Universidade Exemplo',
        course: 'Bacharelado em Ciência da Computação',
        startDate: '2015-01-01',
        endDate: '2019-12-31',
        description: 'Formação sólida em desenvolvimento de software, participação em projetos de pesquisa e iniciação científica.'
      },
      {
        institution: 'Escola Técnica Estadual',
        course: 'Técnico em Informática',
        startDate: '2012-01-01',
        endDate: '2014-12-31',
        description: 'Curso técnico com foco em lógica de programação, redes e manutenção de computadores.'
      }
    ],
    experience: [
      {
        company: 'Empresa Exemplo',
        position: 'Desenvolvedor Frontend',
        startDate: '2020-01-01',
        endDate: '2023-12-31',
        description: 'Desenvolvimento de interfaces responsivas em React, integração com APIs REST, testes automatizados e colaboração com equipe ágil.'
      },
      {
        company: 'Tech Solutions',
        position: 'Estagiário de Desenvolvimento',
        startDate: '2018-06-01',
        endDate: '2019-12-31',
        description: 'Apoio no desenvolvimento de sistemas internos, manutenção de aplicações em JavaScript e suporte a usuários.'
      }
    ],
    skills: ['JavaScript', 'React', 'CSS', 'HTML', 'TypeScript', 'Git', 'Jest', 'Redux', 'Figma'],
    languages: ['Português (Nativo)', 'Inglês (Avançado)', 'Espanhol (Intermediário)']
  });

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Template3
      {...props}
      data={data}
      onBack={handleBack}
    />
  );
}
