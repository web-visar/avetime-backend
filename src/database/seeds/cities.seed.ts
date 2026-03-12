import { City } from 'src/cities/entities/city.entity';

export const citiesData: Partial<City>[] = [
  // France cities (no translations — local name only)
  { name: 'Saint-Julien-en-Genevois', countryCode: 'FR', translations: null, isActive: true },
  { name: 'Collonges-sous-Salève', countryCode: 'FR', translations: null, isActive: true },
  { name: 'Annemasse', countryCode: 'FR', translations: null, isActive: true },
  { name: 'Gaillard', countryCode: 'FR', translations: null, isActive: true },
  { name: 'Cranves-Sales', countryCode: 'FR', translations: null, isActive: true },
  { name: 'Ville-la-Grand', countryCode: 'FR', translations: null, isActive: true },
  { name: 'Vétraz-Monthoux', countryCode: 'FR', translations: null, isActive: true },
  // Paris
  {
    name: 'Paris',
    countryCode: 'FR',
    translations: { en: 'Paris', fr: 'Paris', de: 'Paris', it: 'Parigi', sq: 'Parisi', es: 'París' },
    isActive: true,
  },
  // Marseille
  {
    name: 'Marseille',
    countryCode: 'FR',
    translations: { en: 'Marseille', fr: 'Marseille', de: 'Marseille', it: 'Marsiglia', sq: 'Marsejë', es: 'Marsella' },
    isActive: true,
  },
  // United Kingdom cities (no translations — local name only)
  { name: 'Reading', countryCode: 'GB', translations: null, isActive: true },
  { name: 'Slough', countryCode: 'GB', translations: null, isActive: true },
  { name: 'Woking', countryCode: 'GB', translations: null, isActive: true },
  { name: 'Guildford', countryCode: 'GB', translations: null, isActive: true },
  { name: 'Bracknell', countryCode: 'GB', translations: null, isActive: true },
  { name: 'Maidenhead', countryCode: 'GB', translations: null, isActive: true },
  { name: 'Windsor', countryCode: 'GB', translations: null, isActive: true },
  // London
  {
    name: 'London',
    countryCode: 'GB',
    translations: { en: 'London', fr: 'Londres', de: 'London', it: 'Londra', sq: 'Londër', es: 'Londres' },
    isActive: true,
  },
  // Switzerland cities
  {
    name: 'Geneva',
    countryCode: 'CH',
    translations: { en: 'Geneva', fr: 'Genève', de: 'Genf', it: 'Ginevra', sq: 'Gjenevë', es: 'Ginebra' },
    isActive: true,
  },
  {
    name: 'Lausanne',
    countryCode: 'CH',
    translations: { en: 'Lausanne', fr: 'Lausanne', de: 'Lausanne', it: 'Losanna', sq: 'Lozanë', es: 'Lausana' },
    isActive: true,
  },
  // Kosovo cities (no translations — local name only)
  { name: 'Prishtinë', countryCode: 'XK', translations: null, isActive: true },
  { name: 'Ferizaj', countryCode: 'XK', translations: null, isActive: true },
  { name: 'Gjilan', countryCode: 'XK', translations: null, isActive: true },
  { name: 'Prizren', countryCode: 'XK', translations: null, isActive: true },
  { name: 'Pejë', countryCode: 'XK', translations: null, isActive: true },
  { name: 'Gjakovë', countryCode: 'XK', translations: null, isActive: true },
  { name: 'Mitrovicë', countryCode: 'XK', translations: null, isActive: true },

  // Italy cities
  { name: 'Rome', countryCode: 'IT', translations: { en: 'Rome', fr: 'Roma', de: 'Rom', it: 'Roma', sq: 'Romë', es: 'Roma' }, isActive: true },
  {
    name: 'Milan',
    countryCode: 'IT',
    translations: { en: 'Milan', fr: 'Milan', de: 'Mailand', it: 'Milano', sq: 'Milano', es: 'Milán' },
    isActive: true,
  },
  {
    name: 'Naples',
    countryCode: 'IT',
    translations: { en: 'Naples', fr: 'Naples', de: 'Neapel', it: 'Napoli', sq: 'Napoli', es: 'Nápoles' },
    isActive: true,
  },

  // Germany cities
  {
    name: 'Berlin',
    countryCode: 'DE',
    translations: { en: 'Berlin', fr: 'Berlin', de: 'Berlin', it: 'Berlin', sq: 'Berlin', es: 'Berlín' },
    isActive: true,
  },
  {
    name: 'Munich',
    countryCode: 'DE',
    translations: { en: 'Munich', fr: 'Munich', de: 'München', it: 'Monaco di Baviera', sq: 'Minhen', es: 'Múnich' },
    isActive: true,
  },
  {
    name: 'Hamburg',
    countryCode: 'DE',
    translations: { en: 'Hamburg', fr: 'Hambourg', de: 'Hamburg', it: 'Amburgo', sq: 'Hamburg', es: 'Hamburgo' },
    isActive: true,
  },
  {
    name: 'Frankfurt',
    countryCode: 'DE',
    translations: { en: 'Frankfurt', fr: 'Francfort', de: 'Frankfurt', it: 'Francoforte sul Meno', sq: 'Frankfurt', es: 'Fráncfort del Meno' },
    isActive: true,
  },

  // Spain cities
  { name: 'Madrid', countryCode: 'ES', translations: null, isActive: true },
  {
    name: 'Barcelona',
    countryCode: 'ES',
    translations: { en: 'Barcelona', fr: 'Barcelone', de: 'Barcelona', it: 'Barcellona', sq: 'Barcelona', es: 'Barcelona' },
    isActive: true,
  },

  // Austria cities
  {
    name: 'Vienna',
    countryCode: 'AT',
    translations: { en: 'Vienna', fr: 'Vienne', de: 'Wien', it: 'Vienna', sq: 'Vjena', es: 'Viena' },
    isActive: true,
  },
  {
    name: 'Salzburg',
    countryCode: 'AT',
    translations: { en: 'Salzburg', fr: 'Salzbourg', de: 'Salzburg', it: 'Salzburg', sq: 'Salzburg', es: 'Salzburgo' },
    isActive: true,
  },
  { name: 'Graz', countryCode: 'AT', translations: null, isActive: true },
];
