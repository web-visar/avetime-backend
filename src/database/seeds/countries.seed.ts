import { Country } from 'src/countries/entities/country.entity';

export const countriesData: Partial<Country>[] = [
  {
    code: 'CH',
    name: 'Switzerland',
    translations: { en: 'Switzerland', fr: 'Suisse', de: 'Schweiz', it: 'Svizzera', sq: 'Zvicra', es: 'Suiza' },
    isActive: true,
  },
  {
    code: 'FR',
    name: 'France',
    translations: { en: 'France', fr: 'France', de: 'Frankreich', it: 'Francia', sq: 'Franca', es: 'Francia' },
    isActive: true,
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    translations: {
      en: 'United Kingdom',
      fr: 'Royaume-Uni',
      de: 'Vereinigtes Königreich',
      it: 'Regno Unito',
      sq: 'Mbretëria e Bashkuar',
      es: 'Reino Unido',
    },
    isActive: true,
  },
  {
    code: 'XK',
    name: 'Kosovo',
    translations: { en: 'Kosovo', fr: 'Kosovo', de: 'Kosovo', it: 'Kosovo', sq: 'Kosovë', es: 'Kosovo' },
    isActive: true,
  },
  {
    code: 'AL',
    name: 'Albania',
    translations: { en: 'Albania', fr: 'Albanie', de: 'Albanien', it: 'Albania', sq: 'Shqipëri', es: 'Albania' },
    isActive: true,
  },
  {
    code: 'AT',
    name: 'Austria',
    translations: { en: 'Austria', fr: 'Autriche', de: 'Österreich', it: 'Austria', sq: 'Austri', es: 'Austria' },
    isActive: true,
  },
  {
    code: 'DE',
    name: 'Germany',
    translations: { en: 'Germany', fr: 'Allemagne', de: 'Deutschland', it: 'Germania', sq: 'Gjermani', es: 'Alemania' },
    isActive: true,
  },
  {
    code: 'ES',
    name: 'Spain',
    translations: { en: 'Spain', fr: 'Espagne', de: 'Spanien', it: 'Spagna', sq: 'Spanja', es: 'España' },
    isActive: true,
  },
  {
    code: 'IT',
    name: 'Italy',
    translations: { en: 'Italy', fr: 'Italie', de: 'Italien', it: 'Italia', sq: 'Italia', es: 'Italia' },
    isActive: true,
  },
];
