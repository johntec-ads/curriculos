/**
 * PDFTemplate7 - Template Compacto com Header Azul e Grid
 * Usando @react-pdf/renderer para geração de PDF com texto real
 */
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

// Registrar fonte Roboto
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 'normal' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 'bold' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf', fontStyle: 'italic' },
  ]
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    fontSize: 10,
    backgroundColor: '#ffffff',
    paddingTop: 25,
    paddingBottom: 40,
  },
  // Header com gradient (simulado)
  header: {
    backgroundColor: '#1565c0',
    color: '#ffffff',
    padding: 20,
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    marginTop: -25, // Compensar o paddingTop da página
    marginHorizontal: 0,
  },
  photoContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.85)',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  photoPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoInitial: {
    fontSize: 28,
    color: '#1565c0',
    fontWeight: 'bold',
  },
  headerContent: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    letterSpacing: 0.5,
  },
  objective: {
    fontSize: 9,
    fontStyle: 'italic',
    opacity: 0.95,
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  contactItem: {
    fontSize: 8,
    opacity: 0.95,
  },
  contactDivider: {
    opacity: 0.6,
  },
  // Content area com grid
  content: {
    padding: 20,
    flexDirection: 'row',
    gap: 20,
  },
  // Main column (2/3)
  mainColumn: {
    flex: 2,
  },
  // Side column (1/3)
  sideColumn: {
    flex: 1,
  },
  // Sections
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1565c0',
    marginBottom: 8,
  },
  // Items
  itemContainer: {
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333333',
  },
  itemSubtitle: {
    fontSize: 9,
    color: '#666666',
  },
  itemDateInline: {
    color: '#1976d2',
  },
  itemDescription: {
    fontSize: 9,
    color: '#444444',
    lineHeight: 1.4,
    marginTop: 3,
  },
  // Side cards
  card: {
    backgroundColor: '#f5f8fb',
    padding: 12,
    borderRadius: 4,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1565c0',
    marginBottom: 6,
  },
  cardItem: {
    fontSize: 9,
    color: '#444444',
    marginBottom: 3,
  },
  // Contact card
  contactCard: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#eeeeee',
    marginBottom: 10,
  },
  // Marca d'água
  watermark: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    fontSize: 50,
    color: 'rgba(0, 0, 0, 0.03)',
    transform: 'rotate(-45deg)',
  },
});

const formatDate = (date) => {
  if (!date) return 'Presente';
  return new Date(date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long'
  });
};

const sortByDate = (items) => {
  if (!Array.isArray(items)) return [];
  return [...items].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
};

const PDFTemplate7 = ({ data }) => {
  if (!data) return null;
  
  const { personalInfo, experience, education, skills, languages } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Marca d'água */}
        <Text style={styles.watermark}>JOHNTEC.ADS</Text>
        
        {/* Header compacto */}
        <View style={styles.header}>
          <View style={styles.photoContainer}>
            {personalInfo?.photoUrl ? (
              <Image src={personalInfo.photoUrl} style={styles.photo} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Text style={styles.photoInitial}>
                  {personalInfo?.name ? personalInfo.name[0] : '?'}
                </Text>
              </View>
            )}
          </View>
          
          <View style={styles.headerContent}>
            <Text style={styles.name}>{personalInfo?.name || 'Nome não informado'}</Text>
            
            {personalInfo?.objective && (
              <Text style={styles.objective}>{personalInfo.objective}</Text>
            )}
            
            <View style={styles.contactRow}>
              {personalInfo?.email && <Text style={styles.contactItem}>{personalInfo.email}</Text>}
              {personalInfo?.phone && (
                <>
                  <Text style={styles.contactDivider}> | </Text>
                  <Text style={styles.contactItem}>{personalInfo.phone}</Text>
                </>
              )}
              {personalInfo?.linkedin && (
                <>
                  <Text style={styles.contactDivider}> | </Text>
                  <Text style={styles.contactItem}>LinkedIn: {personalInfo.linkedin}</Text>
                </>
              )}
            </View>
          </View>
        </View>

        {/* Conteúdo em grid */}
        <View style={styles.content}>
          {/* Coluna Principal */}
          <View style={styles.mainColumn}>
            {/* Experiência */}
            {experience && experience.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experiência Profissional</Text>
                {sortByDate(experience).map((exp, index) => (
                  <View key={index} style={styles.itemContainer} wrap={false}>
                    <Text style={styles.itemTitle}>{exp.position}</Text>
                    <Text style={styles.itemSubtitle}>
                      {exp.company} • <Text style={styles.itemDateInline}>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</Text>
                    </Text>
                    {exp.description && (
                      <Text style={styles.itemDescription}>{exp.description}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Educação */}
            {education && education.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Educação</Text>
                {education.map((edu, index) => (
                  <View key={index} style={styles.itemContainer} wrap={false}>
                    <Text style={styles.itemTitle}>{edu.course}</Text>
                    <Text style={styles.itemSubtitle}>
                      {edu.institution} • <Text style={styles.itemDateInline}>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</Text>
                    </Text>
                    {edu.description && (
                      <Text style={styles.itemDescription}>{edu.description}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Coluna Lateral */}
          <View style={styles.sideColumn}>
            {/* Habilidades */}
            {skills && skills.length > 0 && (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Habilidades</Text>
                {skills.map((skill, index) => (
                  <Text key={index} style={styles.cardItem}>• {skill}</Text>
                ))}
              </View>
            )}

            {/* Idiomas */}
            {languages && languages.length > 0 && (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Idiomas</Text>
                {languages.map((lang, index) => (
                  <Text key={index} style={styles.cardItem}>• {lang}</Text>
                ))}
              </View>
            )}

            {/* Contato */}
            <View style={styles.contactCard}>
              <Text style={styles.cardTitle}>Contato</Text>
              {personalInfo?.email && <Text style={styles.cardItem}>{personalInfo.email}</Text>}
              {personalInfo?.phone && <Text style={styles.cardItem}>{personalInfo.phone}</Text>}
              {personalInfo?.address && <Text style={styles.cardItem}>{personalInfo.address}</Text>}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFTemplate7;
