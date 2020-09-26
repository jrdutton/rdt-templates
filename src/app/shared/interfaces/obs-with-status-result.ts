export interface IObsWithStatusResult<T> {
  loading?: boolean;
  value?: T;
  error?: string;
}
