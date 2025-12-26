export abstract class AbstractCsvStrategy<T> {
  public generate(data: T[]): string {
    const headerLine = this.getHeaders().join(';');

    const bodyLines = data.map(item => {
      const rowValues = this.mapRow(item);
      return rowValues.map(val => this.escape(val)).join(';');
    });

    return [headerLine, ...bodyLines].join('\n');
  }

  protected abstract getHeaders(): string[];
  protected abstract mapRow(data: T): (string | number | null | undefined)[];

  protected escape(value: unknown): string {
    if (value === null || value === undefined) return '';
    const str = String(value);
    if (/[;"\n]/.test(str)) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  }

  protected joinItemFields<K>(items: K[] | undefined, key: keyof K): string {
    if (!items?.length) return '';
    return items.map(i => String(i[key] ?? '')).join(', ');
  }
}
