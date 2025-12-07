import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TranslateIcon from '@mui/icons-material/Translate';
import PersonIcon from '@mui/icons-material/Person';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

function TutorialGuide() {
  const [open, setOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('photo');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleSectionClick = (section) => {
    setCurrentSection(section);
    if (isMobile) {
      setOpen(false);
    }
  };

  // Conteúdo das diferentes seções do tutorial
  const tutorialContent = {
    photo: {
      title: 'Devo incluir uma foto no meu currículo?',
      content: (
        <>
          <Typography paragraph>
            A questão do uso de fotos em currículos varia dependendo de fatores
            regionais, culturais e do tipo de vaga.
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            Considerações importantes:
          </Typography>
          <Typography paragraph component="div">
            <ul>
              <li>
                Em alguns países europeus (França, Alemanha), fotos são comuns
                em currículos
              </li>
              <li>
                Nos EUA e Reino Unido, evita-se o uso de fotos para prevenir
                discriminação inconsciente
              </li>
              <li>
                No Brasil, não há consenso definitivo, mas cresce a tendência de
                omitir fotos
              </li>
            </ul>
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            Quando incluir uma foto:
          </Typography>
          <Typography paragraph component="div">
            <ul>
              <li>Se for solicitado especificamente na vaga</li>
              <li>
                Em vagas que exijam aparência profissional para interação com
                clientes
              </li>
              <li>
                Em indústrias criativas onde a apresentação visual é relevante
              </li>
            </ul>
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            Quando evitar uma foto:
          </Typography>
          <Typography paragraph component="div">
            <ul>
              <li>
                Se a empresa adota processos seletivos "cegos" para evitar
                vieses
              </li>
              <li>
                Se você preferir ser avaliado apenas por suas qualificações
                profissionais
              </li>
              <li>
                Se a foto não for tirada em contexto profissional (evite fotos
                casuais)
              </li>
            </ul>
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            Se decidir incluir uma foto:
          </Typography>
          <Typography paragraph component="div">
            <ul>
              <li>
                Use uma foto profissional, com boa iluminação e fundo neutro
              </li>
              <li>
                Esteja vestido profissionalmente, como estaria em uma entrevista
              </li>
              <li>Utilize uma expressão neutra e profissional</li>
              <li>Evite filtros ou edições excessivas</li>
            </ul>
          </Typography>
          <Typography paragraph color="textSecondary" fontStyle="italic">
            Lembre-se que o principal objetivo do currículo é destacar suas
            qualificações, habilidades e experiências.
          </Typography>
        </>
      ),
    },
    personal: {
      title: 'Informações Pessoais',
      content: (
        <>
          <Typography paragraph>
            Esta seção deve conter seus dados de contato e informações
            essenciais para o recrutador.
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            Dicas importantes:
          </Typography>
          <Typography paragraph component="div">
            <ul>
              <li>
                <strong>Nome:</strong> Use seu nome completo, evitando apelidos
              </li>
              <li>
                <strong>E-mail:</strong> Utilize um endereço profissional,
                preferencialmente com seu nome
              </li>
              <li>
                <strong>Telefone:</strong> Inclua um número no qual você esteja
                disponível para contato
              </li>
              <li>
                <strong>Endereço:</strong> Em geral, basta incluir cidade e
                estado/província
              </li>
              <li>
                <strong>LinkedIn:</strong> Certifique-se que seu perfil esteja
                atualizado e completo
              </li>
            </ul>
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            O que evitar:
          </Typography>
          <Typography paragraph component="div">
            <ul>
              <li>
                Informações desnecessárias como data de nascimento, estado civil
                ou RG/CPF
              </li>
              <li>E-mails com nomes informais ou não profissionais</li>
              <li>
                Endereço completo com rua e número (questões de privacidade)
              </li>
            </ul>
          </Typography>
        </>
      ),
    },
    objective: {
      title: 'Objetivo Profissional',
      content: (
        <>
          <Typography paragraph>
            O objetivo profissional apresenta um resumo conciso do que você
            busca e do que pode oferecer.
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            Como escrever um bom objetivo:
          </Typography>
          <Typography paragraph component="div">
            <ul>
              <li>Seja específico sobre a posição ou área desejada</li>
              <li>Destaque 1-2 qualificações ou habilidades principais</li>
              <li>Mantenha entre 2-3 linhas no máximo</li>
              <li>Adapte de acordo com a vaga que está se candidatando</li>
            </ul>
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            Exemplo:
          </Typography>
          <Typography paragraph fontStyle="italic">
            "Analista de Marketing Digital com 5 anos de experiência em SEO e
            campanhas de mídia paga, buscando posição que permita aplicar
            conhecimentos em estratégias de crescimento e análise de performance
            digital."
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            O que evitar:
          </Typography>
          <Typography paragraph component="div">
            <ul>
              <li>Objetivos vagos ou genéricos demais</li>
              <li>
                Foco em benefícios pessoais ("Busco crescimento na minha
                carreira")
              </li>
              <li>Informações que não sejam relevantes para a vaga</li>
            </ul>
          </Typography>
        </>
      ),
    },
    education: {
      title: 'Educação',
      content: (
        <>
          <Typography paragraph>
            A seção de educação deve destacar sua formação acadêmica de forma
            organizada e relevante.
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            Como estruturar:
          </Typography>
          <Typography paragraph component="div">
            <ul>
              <li>
                Liste em ordem cronológica inversa (mais recente primeiro)
              </li>
              <li>
                Inclua nome da instituição, curso, período de estudo e grau
                obtido
              </li>
              <li>Destaque cursos relevantes para a vaga</li>
              <li>Mencione honras acadêmicas ou reconhecimentos notáveis</li>
            </ul>
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            O que incluir (se relevante):
          </Typography>
          <Typography paragraph component="div">
            <ul>
              <li>Projetos acadêmicos importantes relacionados à vaga</li>
              <li>Intercâmbios ou experiências internacionais</li>
              <li>Cursos complementares, certificações e especializações</li>
              <li>TCC ou pesquisas relevantes</li>
            </ul>
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            O que evitar:
          </Typography>
          <Typography paragraph component="div">
            <ul>
              <li>Notas específicas, a menos que sejam excepcionais</li>
              <li>Cursos incompletos sem explicação</li>
              <li>Formação do ensino médio (se você já tem graduação)</li>
              <li>Cursos muito antigos ou irrelevantes para a posição</li>
            </ul>
          </Typography>
        </>
      ),
    },
    experience: {
      title: 'Experiência Profissional',
      content: (
        <>
          <Typography paragraph>
            Esta é frequentemente a seção mais importante do seu currículo,
            detalhando sua trajetória profissional.
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            Como estruturar:
          </Typography>
          <Typography paragraph component="div">
            <ul>
              <li>
                Liste em ordem cronológica inversa (mais recente primeiro)
              </li>
              <li>Inclua empresa, cargo, período de trabalho e localização</li>
              <li>
                Descreva suas responsabilidades e realizações usando verbos de
                ação
              </li>
              <li>
                Quantifique resultados sempre que possível (%, valores,
                métricas)
              </li>
            </ul>
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            Exemplos de verbos de ação:
          </Typography>
          <Typography paragraph>
            Desenvolveu, implementou, coordenou, liderou, otimizou, reduziu,
            aumentou, negociou, planejou, criou
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            Exemplo de realização quantificada:
          </Typography>
          <Typography paragraph fontStyle="italic">
            "Implementou estratégia de marketing que aumentou as vendas em 35%
            em 6 meses com redução de 15% no orçamento"
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            O que evitar:
          </Typography>
          <Typography paragraph component="div">
            <ul>
              <li>Descrições vagas sem resultados concretos</li>
              <li>Gaps de tempo inexplicados</li>
              <li>Linguagem na primeira pessoa ("Eu fiz...")</li>
              <li>Informações negativas sobre empregos anteriores</li>
            </ul>
          </Typography>
        </>
      ),
    },
    skills: {
      title: 'Habilidades',
      content: (
        <>
          <Typography paragraph>
            A seção de habilidades destaca suas competências técnicas e pessoais
            mais relevantes para a posição.
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            Como estruturar:
          </Typography>
          <Typography paragraph component="div">
            <ul>
              <li>
                Divida entre habilidades técnicas e comportamentais (soft
                skills)
              </li>
              <li>Seja específico e evite termos genéricos</li>
              <li>Priorize habilidades mencionadas na descrição da vaga</li>
              <li>Seja honesto sobre seu nível de proficiência</li>
            </ul>
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            Exemplos de habilidades técnicas:
          </Typography>
          <Typography paragraph>
            Java, Python, Excel avançado, Análise de dados, UX/UI Design, SEO,
            Adobe Photoshop
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            Exemplos de soft skills:
          </Typography>
          <Typography paragraph>
            Liderança, comunicação, trabalho em equipe, resolução de problemas,
            adaptabilidade
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            O que evitar:
          </Typography>
          <Typography paragraph component="div">
            <ul>
              <li>
                Habilidades óbvias ou básicas demais (ex: "sabe usar email")
              </li>
              <li>Exagerar suas competências</li>
              <li>
                Listar habilidades que você não conseguiria demonstrar em uma
                entrevista
              </li>
              <li>Habilidades irrelevantes para a vaga</li>
            </ul>
          </Typography>
        </>
      ),
    },
    languages: {
      title: 'Idiomas',
      content: (
        <>
          <Typography paragraph>
            A seção de idiomas é cada vez mais importante no mercado
            globalizado.
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            Como estruturar:
          </Typography>
          <Typography paragraph component="div">
            <ul>
              <li>Liste cada idioma com seu nível de proficiência</li>
              <li>
                Use termos padronizados para níveis (Básico, Intermediário,
                Avançado, Fluente, Nativo)
              </li>
              <li>
                Seja específico sobre habilidades em cada idioma (leitura,
                escrita, conversação)
              </li>
              <li>
                Mencione certificações relevantes (TOEFL, IELTS, Cambridge,
                DELE, etc.)
              </li>
            </ul>
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            Exemplo:
          </Typography>
          <Typography paragraph>
            <strong>Inglês:</strong> Avançado (Certificação TOEFL iBT 105)
            <br />
            <strong>Espanhol:</strong> Intermediário (conversação e leitura),
            Básico (escrita)
            <br />
            <strong>Português:</strong> Nativo
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            O que evitar:
          </Typography>
          <Typography paragraph component="div">
            <ul>
              <li>Exagerar seu nível de proficiência</li>
              <li>
                Incluir idiomas com nível muito básico, a menos que seja
                relevante para a vaga
              </li>
              <li>Usar termos ambíguos como "bom" ou "razoável"</li>
            </ul>
          </Typography>
        </>
      ),
    },
    general: {
      title: 'Dicas Gerais',
      content: (
        <>
          <Typography paragraph>
            Algumas orientações para tornar seu currículo mais eficaz e
            profissional.
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            Formatação e apresentação:
          </Typography>
          <Typography paragraph component="div">
            <ul>
              <li>
                Mantenha entre 1-2 páginas (idealmente 1 página para início de
                carreira)
              </li>
              <li>
                Use fonte clara e profissional (Arial, Calibri, Times New Roman)
              </li>
              <li>
                Mantenha consistência no design (espaçamento, fonte, tamanho)
              </li>
              <li>Use marcadores para melhorar a legibilidade</li>
              <li>Salve e envie como PDF para manter a formatação</li>
            </ul>
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            Revisão e atualização:
          </Typography>
          <Typography paragraph component="div">
            <ul>
              <li>
                Revise cuidadosamente para erros gramaticais e ortográficos
              </li>
              <li>Peça feedback a profissionais da sua área</li>
              <li>
                Atualize regularmente com novas experiências e habilidades
              </li>
              <li>Adapte para cada vaga que você se candidatar</li>
            </ul>
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            O que evitar:
          </Typography>
          <Typography paragraph component="div">
            <ul>
              <li>Informações falsas ou exageradas</li>
              <li>
                Cores extravagantes ou designs muito elaborados (exceto para
                áreas criativas)
              </li>
              <li>Fotos informais ou inadequadas</li>
              <li>
                Informações pessoais irrelevantes (hobbies, a menos que sejam
                relevantes)
              </li>
              <li>
                Referências (use "Referências disponíveis mediante solicitação")
              </li>
            </ul>
          </Typography>
        </>
      ),
    },
  };

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<InfoIcon />}
        onClick={toggleDrawer}
        sx={{ mb: 2 }}
      >
        Dicas para um currículo eficaz
      </Button>

      <Drawer
        anchor={isMobile ? 'bottom' : 'right'}
        open={open}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: isMobile ? '100%' : 400,
            maxHeight: isMobile ? '80vh' : '100%',
            borderTopLeftRadius: isMobile ? 16 : 0,
            borderTopRightRadius: isMobile ? 16 : 0,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            height: '100%',
          }}
        >
          {/* Barra lateral com seções */}
          <Box
            sx={{
              width: isMobile ? '100%' : 200,
              borderRight: isMobile ? 'none' : 1,
              borderBottom: isMobile ? 1 : 'none',
              borderColor: 'divider',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                borderBottom: 1,
                borderColor: 'divider',
              }}
            >
              <Typography variant="h6">Guia de Dicas</Typography>
              <IconButton onClick={toggleDrawer}>
                <CloseIcon />
              </IconButton>
            </Box>
            <List
              sx={{
                overflow: 'auto',
                display: isMobile ? 'flex' : 'block',
                flexDirection: isMobile ? 'row' : 'column',
                flexWrap: isMobile ? 'nowrap' : 'unset',
                overflowX: isMobile ? 'scroll' : 'hidden',
              }}
            >
              <ListItem
                button
                selected={currentSection === 'photo'}
                onClick={() => handleSectionClick('photo')}
                sx={{
                  minWidth: isMobile ? 'auto' : 'unset',
                  whiteSpace: isMobile ? 'nowrap' : 'normal',
                }}
              >
                <ListItemIcon>
                  <PhotoCameraIcon />
                </ListItemIcon>
                <ListItemText primary="Foto no Currículo" />
              </ListItem>
              <ListItem
                button
                selected={currentSection === 'personal'}
                onClick={() => handleSectionClick('personal')}
                sx={{
                  minWidth: isMobile ? 'auto' : 'unset',
                  whiteSpace: isMobile ? 'nowrap' : 'normal',
                }}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Info. Pessoais" />
              </ListItem>
              <ListItem
                button
                selected={currentSection === 'objective'}
                onClick={() => handleSectionClick('objective')}
                sx={{
                  minWidth: isMobile ? 'auto' : 'unset',
                  whiteSpace: isMobile ? 'nowrap' : 'normal',
                }}
              >
                <ListItemIcon>
                  <EmojiObjectsIcon />
                </ListItemIcon>
                <ListItemText primary="Objetivo" />
              </ListItem>
              <ListItem
                button
                selected={currentSection === 'education'}
                onClick={() => handleSectionClick('education')}
                sx={{
                  minWidth: isMobile ? 'auto' : 'unset',
                  whiteSpace: isMobile ? 'nowrap' : 'normal',
                }}
              >
                <ListItemIcon>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText primary="Educação" />
              </ListItem>
              <ListItem
                button
                selected={currentSection === 'experience'}
                onClick={() => handleSectionClick('experience')}
                sx={{
                  minWidth: isMobile ? 'auto' : 'unset',
                  whiteSpace: isMobile ? 'nowrap' : 'normal',
                }}
              >
                <ListItemIcon>
                  <WorkIcon />
                </ListItemIcon>
                <ListItemText primary="Experiência" />
              </ListItem>
              <ListItem
                button
                selected={currentSection === 'skills'}
                onClick={() => handleSectionClick('skills')}
                sx={{
                  minWidth: isMobile ? 'auto' : 'unset',
                  whiteSpace: isMobile ? 'nowrap' : 'normal',
                }}
              >
                <ListItemIcon>
                  <PsychologyIcon />
                </ListItemIcon>
                <ListItemText primary="Habilidades" />
              </ListItem>
              <ListItem
                button
                selected={currentSection === 'languages'}
                onClick={() => handleSectionClick('languages')}
                sx={{
                  minWidth: isMobile ? 'auto' : 'unset',
                  whiteSpace: isMobile ? 'nowrap' : 'normal',
                }}
              >
                <ListItemIcon>
                  <TranslateIcon />
                </ListItemIcon>
                <ListItemText primary="Idiomas" />
              </ListItem>
              <ListItem
                button
                selected={currentSection === 'general'}
                onClick={() => handleSectionClick('general')}
                sx={{
                  minWidth: isMobile ? 'auto' : 'unset',
                  whiteSpace: isMobile ? 'nowrap' : 'normal',
                }}
              >
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="Dicas Gerais" />
              </ListItem>
            </List>
          </Box>

          {/* Conteúdo da seção selecionada */}
          <Box
            sx={{
              flex: 1,
              p: 3,
              overflow: 'auto',
            }}
          >
            <Typography variant="h5" gutterBottom>
              {tutorialContent[currentSection].title}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {tutorialContent[currentSection].content}
          </Box>
        </Box>
      </Drawer>

      {/* Versão colapsável para a página */}
      <Paper sx={{ mb: 4, display: { xs: 'none', md: 'block' } }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="tutorial-content"
            id="tutorial-header"
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <InfoIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">
                Dicas para criar um currículo eficaz
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Clique no botão "Dicas para um currículo eficaz" acima para abrir
              o guia completo com orientações específicas para cada seção do seu
              currículo.
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold">
              Dicas rápidas:
            </Typography>
            <Typography component="div">
              <ul>
                <li>Mantenha seu currículo conciso (1-2 páginas)</li>
                <li>Adapte-o para cada vaga específica</li>
                <li>Quantifique suas realizações sempre que possível</li>
                <li>Revise cuidadosamente para erros de português</li>
                <li>Salve o documento final em formato PDF</li>
                <li>
                  Inclua uma foto somente se for realmente necessário e
                  apropriado para a vaga
                </li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </>
  );
}

export default TutorialGuide;
