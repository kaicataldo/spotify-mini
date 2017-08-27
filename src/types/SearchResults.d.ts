export interface SearchResults {
  status?: 'success' | 'error';
  album?: {};
  artist?: {};
  track?: {};
  message?: string;
}
