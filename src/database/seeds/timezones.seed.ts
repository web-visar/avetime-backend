import { TranslationEntry } from 'src/core/interfaces';

export const timezonesData: { tzCode: string; name: string; translations: TranslationEntry; countryCode: string }[] = [
  // Switzerland - CET/CEST (UTC+1/+2)
  {
    tzCode: 'Europe/Zurich',
    name: 'Central European Time',
    translations: {
      en: 'Central European Time',
      fr: "Heure d'Europe centrale",
      de: 'Mitteleuropäische Zeit',
      it: "Ora dell'Europa centrale",
      sq: 'Koha e Evropës Qendrore',
      es: 'Hora de Europa Central',
    },
    countryCode: 'CH',
  },

  // France - CET/CEST (UTC+1/+2)
  {
    tzCode: 'Europe/Paris',
    name: 'Central European Time',
    translations: {
      en: 'Central European Time',
      fr: "Heure d'Europe centrale",
      de: 'Mitteleuropäische Zeit',
      it: "Ora dell'Europa centrale",
      sq: 'Koha e Evropës Qendrore',
      es: 'Hora de Europa Central',
    },
    countryCode: 'FR',
  },

  // United Kingdom - GMT/BST (UTC+0/+1)
  {
    tzCode: 'Europe/London',
    name: 'Greenwich Mean Time',
    translations: {
      en: 'Greenwich Mean Time',
      fr: 'Heure de Greenwich',
      de: 'Mittlere Greenwich-Zeit',
      it: 'Ora di Greenwich',
      sq: 'Koha e Grenviçit',
      es: 'Hora del Meridiano de Greenwich',
    },
    countryCode: 'GB',
  },

  // Kosovo - CET/CEST (UTC+1/+2)
  {
    tzCode: 'Europe/Belgrade',
    name: 'Central European Time',
    translations: {
      en: 'Central European Time',
      fr: "Heure d'Europe centrale",
      de: 'Mitteleuropäische Zeit',
      it: "Ora dell'Europa centrale",
      sq: 'Koha e Evropës Qendrore',
      es: 'Hora de Europa Central',
    },
    countryCode: 'XK',
  },

  // Albania - CET/CEST (UTC+1/+2)
  {
    tzCode: 'Europe/Tirane',
    name: 'Central European Time',
    translations: {
      en: 'Central European Time',
      fr: "Heure d'Europe centrale",
      de: 'Mitteleuropäische Zeit',
      it: "Ora dell'Europa centrale",
      sq: 'Koha e Evropës Qendrore',
      es: 'Hora de Europa Central',
    },
    countryCode: 'AL',
  },

  // Austria - CET/CEST (UTC+1/+2)
  {
    tzCode: 'Europe/Vienna',
    name: 'Central European Time',
    translations: {
      en: 'Central European Time',
      fr: "Heure d'Europe centrale",
      de: 'Mitteleuropäische Zeit',
      it: "Ora dell'Europa centrale",
      sq: 'Koha e Evropës Qendrore',
      es: 'Hora de Europa Central',
    },
    countryCode: 'AT',
  },

  // Germany - CET/CEST (UTC+1/+2)
  {
    tzCode: 'Europe/Berlin',
    name: 'Central European Time',
    translations: {
      en: 'Central European Time',
      fr: "Heure d'Europe centrale",
      de: 'Mitteleuropäische Zeit',
      it: "Ora dell'Europa centrale",
      sq: 'Koha e Evropës Qendrore',
      es: 'Hora de Europa Central',
    },
    countryCode: 'DE',
  },
];
