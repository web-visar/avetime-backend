export interface IAutocompleteOption {
  value: string;
  text: string;
  meta?: { [key: string]: string | null };
}
