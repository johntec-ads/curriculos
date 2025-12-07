/**
 * PDFTemplate6 - Template Moderno com Header Colorido e Foto
 * Usando @react-pdf/renderer para geração de PDF com texto real
 */
import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from '@react-pdf/renderer';

// Registrar fonte Roboto
Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
      fontWeight: 'normal',
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf',
      fontWeight: 'bold',
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf',
      fontStyle: 'italic',
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    fontSize: 10,
    backgroundColor: '#ffffff',
    paddingTop: 30,
    paddingBottom: 40,
    paddingHorizontal: 0,
  },
  // Header com gradient (simulado com cor sólida)
  header: {
    backgroundColor: '#1976d2',
    color: '#ffffff',
    padding: 30,
    paddingTop: 35,
    flexDirection: 'row',
    gap: 25,
    marginTop: -30, // Compensar o paddingTop da página na primeira página
    marginHorizontal: 0,
  },
  photoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#ffffff',
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
    fontSize: 40,
    color: '#1976d2',
    fontWeight: 'bold',
  },
  headerContent: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  objective: {
    fontSize: 10,
    fontStyle: 'italic',
    marginBottom: 12,
    opacity: 0.9,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  contactItem: {
    fontSize: 9,
    opacity: 0.95,
  },
  // Content area
  content: {
    padding: 30,
    paddingTop: 25,
    flexDirection: 'row',
    gap: 25,
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
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#1976d2',
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
  // Side cards
  card: {
    backgroundColor: '#f5f8fb',
    padding: 12,
    borderRadius: 4,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 8,
  },
  cardItem: {
    fontSize: 9,
    color: '#444444',
    marginBottom: 4,
  },
  // Contact card
  contactCard: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 12,
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
    month: 'long',
  });
};

const sortByDate = (items) => {
  if (!Array.isArray(items)) return [];
  return [...items].sort(
    (a, b) => new Date(b.startDate) - new Date(a.startDate)
  );
};

const PDFTemplate6 = ({ data }) => {
  if (!data) return null;

  const { personalInfo, experience, education, skills, languages } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Marca d'água */}
        <Text style={styles.watermark}>JOHNTEC.ADS</Text>

        {/* Header com foto */}
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
            <Text style={styles.name}>
              {personalInfo?.name || 'Nome não informado'}
            </Text>

            {personalInfo?.objective && (
              <Text style={styles.objective}>{personalInfo.objective}</Text>
            )}

            <View style={styles.contactRow}>
              {personalInfo?.email && (
                <Text style={styles.contactItem}>{personalInfo.email}</Text>
              )}
              {personalInfo?.phone && (
                <Text style={styles.contactItem}>{personalInfo.phone}</Text>
              )}
              {personalInfo?.address && (
                <Text style={styles.contactItem}>{personalInfo.address}</Text>
              )}
              {personalInfo?.linkedin && (
                <Text style={styles.contactItem}>{personalInfo.linkedin}</Text>
              )}
            </View>
          </View>
        </View>

        {/* Conteúdo em 2 colunas */}
        <View style={styles.content}>
          {/* Coluna Principal */}
          <View style={styles.mainColumn}>
            {/* Experiência */}
            {experience && experience.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Experiência Profissional
                </Text>
                {sortByDate(experience).map((exp, index) => (
                  <View key={index} style={styles.itemContainer} wrap={false}>
                    <Text style={styles.itemTitle}>{exp.position}</Text>
                    <Text style={styles.itemSubtitle}>{exp.company}</Text>
                    <Text style={styles.itemDate}>
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </Text>
                    {exp.description && (
                      <Text style={styles.itemDescription}>
                        {exp.description}
                      </Text>
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
                      <Text style={styles.itemDescription}>
                        {edu.description}
                      </Text>
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
                  <Text key={index} style={styles.cardItem}>
                    • {skill}
                  </Text>
                ))}
              </View>
            )}

            {/* Idiomas */}
            {languages && languages.length > 0 && (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Idiomas</Text>
                {languages.map((lang, index) => (
                  <Text key={index} style={styles.cardItem}>
                    • {lang}
                  </Text>
                ))}
              </View>
            )}

            {/* Contato (duplicado para coluna lateral) */}
            <View style={styles.contactCard}>
              <Text style={styles.cardTitle}>Contato</Text>
              {personalInfo?.email && (
                <Text style={styles.cardItem}>{personalInfo.email}</Text>
              )}
              {personalInfo?.phone && (
                <Text style={styles.cardItem}>{personalInfo.phone}</Text>
              )}
              {personalInfo?.address && (
                <Text style={styles.cardItem}>{personalInfo.address}</Text>
              )}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFTemplate6;
