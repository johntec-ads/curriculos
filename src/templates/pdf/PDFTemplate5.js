/**
 * PDFTemplate5 - Template com Bordas e Seções Destacadas
 * Usando @react-pdf/renderer para geração de PDF com texto real
 */
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

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
    padding: 40,
    fontFamily: 'Roboto',
    fontSize: 10,
    backgroundColor: '#ffffff',
  },
  // Header com borda inferior
  header: {
    borderBottomWidth: 2,
    borderBottomColor: '#1976d2',
    paddingBottom: 15,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  contactItem: {
    fontSize: 9,
  },
  contactLabel: {
    fontWeight: 'bold',
  },
  contactValue: {
    color: '#333333',
  },
  // Seções com destaque
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  // Objetivo
  objective: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#444444',
    marginBottom: 15,
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#1976d2',
  },
  // Items
  itemContainer: {
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#333333',
  },
  itemSubtitle: {
    fontSize: 10,
    color: '#666666',
  },
  itemDate: {
    fontSize: 9,
    color: '#1976d2',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 9,
    color: '#444444',
    lineHeight: 1.4,
  },
  // Skills em grid
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillBadge: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 3,
    fontSize: 9,
    color: '#333333',
  },
  // Lista simples
  listItem: {
    fontSize: 9,
    color: '#444444',
    marginBottom: 4,
  },
  // Marca d'água
  watermark: {
    position: 'absolute',
    bottom: 40,
    right: 20,
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

const PDFTemplate5 = ({ data }) => {
  if (!data) return null;
  
  const { personalInfo, experience, education, skills, languages } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Marca d'água */}
        <Text style={styles.watermark}>JOHNTEC.ADS</Text>
        
        {/* Header com borda */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo?.name || 'Nome não informado'}</Text>
          <View style={styles.contactRow}>
            {personalInfo?.email && (
              <Text style={styles.contactItem}>
                <Text style={styles.contactLabel}>Email: </Text>
                <Text style={styles.contactValue}>{personalInfo.email}</Text>
              </Text>
            )}
            {personalInfo?.phone && (
              <Text style={styles.contactItem}>
                <Text style={styles.contactLabel}>Telefone: </Text>
                <Text style={styles.contactValue}>{personalInfo.phone}</Text>
              </Text>
            )}
            {personalInfo?.address && (
              <Text style={styles.contactItem}>
                <Text style={styles.contactLabel}>Endereço: </Text>
                <Text style={styles.contactValue}>{personalInfo.address}</Text>
              </Text>
            )}
            {personalInfo?.linkedin && (
              <Text style={styles.contactItem}>
                <Text style={styles.contactLabel}>LinkedIn: </Text>
                <Text style={styles.contactValue}>{personalInfo.linkedin}</Text>
              </Text>
            )}
          </View>
        </View>

        {/* Objetivo com destaque lateral */}
        {personalInfo?.objective && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Objetivo</Text>
            <Text style={styles.objective}>{personalInfo.objective}</Text>
          </View>
        )}

        {/* Experiência */}
        {experience && experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experiência Profissional</Text>
            {experience.map((exp, index) => (
              <View key={index} style={styles.itemContainer} wrap={false}>
                <Text style={styles.itemTitle}>{exp.position}</Text>
                <Text style={styles.itemSubtitle}>{exp.company}</Text>
                <Text style={styles.itemDate}>
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
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
                <Text style={styles.itemSubtitle}>{edu.institution}</Text>
                <Text style={styles.itemDate}>
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </Text>
                {edu.description && (
                  <Text style={styles.itemDescription}>{edu.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Habilidades em badges */}
        {skills && skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Habilidades</Text>
            <View style={styles.skillsGrid}>
              {skills.map((skill, index) => (
                <Text key={index} style={styles.skillBadge}>{skill}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Idiomas */}
        {languages && languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Idiomas</Text>
            {languages.map((lang, index) => (
              <Text key={index} style={styles.listItem}>• {lang}</Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default PDFTemplate5;
