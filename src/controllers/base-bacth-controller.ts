import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { BatchType, IZenApiConfig } from '../models/zen-api';
import { AbstractCsvStrategy } from '../strategies/abstract-csv-strategy';

interface BaseControllerOptions<T> {
  zenApiConfig: IZenApiConfig;
  csvStrategy: AbstractCsvStrategy<T>;
  resourceName: BatchType;
}

export abstract class BaseBatchController<T> {
  protected zenApiConfig: IZenApiConfig;
  protected csvStrategy: AbstractCsvStrategy<T>;
  protected resourceName: BatchType;
  protected endpoint: string;

  protected constructor(options: BaseControllerOptions<T>) {
    this.zenApiConfig = options.zenApiConfig;
    this.csvStrategy = options.csvStrategy;
    this.resourceName = options.resourceName;

    this.endpoint = `${options.resourceName}-batches`;
  }

  public create = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    try {
      const token = req.headers['x-api-token'];

      const data: T[] = Array.isArray(req.body) ? req.body : [req.body];
      const csvString = this.csvStrategy.generate(data);

      const csvBuffer = Buffer.from(csvString, 'utf-8');
      const blob = new Blob([csvBuffer], { type: 'text/csv' });

      const form = new FormData();
      form.append('file', blob, `${this.resourceName}.csv`);

      const response = await axios.post(`${this.zenApiConfig.uri}/${this.endpoint}`, form, {
        headers: { 'x-api-token': token }
      });

      res.json(response.data);
    } catch (error) {
      console.error(`Failed to create ${this.resourceName} batch`, error);
      res.status(500).json({ error: `Error processing ${this.resourceName}` });
    }
  }

  public list = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    try {
      const token = req.headers['x-api-token'];
      const { size, page } = req.query;

      const params = {
        ...(size && { size }),
        ...(page && { page }),
      };

      const response = await axios.get(`${this.zenApiConfig.uri}/${this.endpoint}`, {
        headers: { 'x-api-token': token },
        params,
      });

      res.json(response.data);
    } catch (error) {
      console.error(`Failed to list ${this.resourceName}`, error);
      res.status(500).json({ error: `Error listing ${this.resourceName}` });
    }
  }

  public get = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    try {
      const token = req.headers['x-api-token'];
      const { batchId } = req.params;

      const response = await axios.get(`${this.zenApiConfig.uri}/${this.endpoint}/${batchId}`, {
        headers: { 'x-api-token': token }
      });

      res.json(response.data);
    } catch (error) {
      console.error(`Failed to get ${this.resourceName} details`, error);
      res.status(500).json({ error: `Error getting ${this.resourceName}` });
    }
  }
}
