export type BatchType = 'contact' | 'product' | 'order' | 'invoice';

export type Platform = 'OMIE' | 'BLING' | 'TINY' | 'MICROVIX' | 'WBUY' | 'OTHER';

export type OrderStatus =
  | 'WAITING_PAYMENT' | 'PAYMENT_ANALYSIS' | 'PAYMENT_CONFIRMED'
  | 'ORDER_EXPEDITING' | 'ORDER_SHIPPED' | 'ORDER_CANCELED'
  | 'ORDER_FINISHED' | 'PAYMENT_DENIED' | 'ORDER_AVAILABLE'
  | 'ORDER_RETURNED' | 'ORDER_REVIEW' | 'INVOICE_ISSUED'
  | 'ORDER_PREPARING' | 'RECEIPT_ISSUED' | 'ON_ROUTE'
  | 'PICKUP_AVAILABLE' | 'DELIVERED';

export type MeasurementUnit =
  | 'AMPOLA' | 'BALDE' | 'BANDEJ' | 'BARRA' | 'BISNAG' | 'BLOCO' | 'BOBINA' | 'BOMB'
  | 'CAPS' | 'CART' | 'CENTO' | 'CJ' | 'CM' | 'CM2' | 'CX' | 'CX2' | 'CX3' | 'CX5'
  | 'CX10' | 'CX15' | 'CX20' | 'CX25' | 'CX50' | 'CX100' | 'DISP' | 'DUZIA' | 'EMBAL'
  | 'FARDO' | 'FOLHA' | 'FRASCO' | 'GALAO' | 'GF' | 'GRAMAS' | 'JOGO' | 'KG' | 'KIT'
  | 'LATA' | 'LITRO' | 'M' | 'M2' | 'M3' | 'MILHEI' | 'ML' | 'MWH' | 'PACOTE' | 'PALETE'
  | 'PARES' | 'PC' | 'POTE' | 'K' | 'RESMA' | 'ROLO' | 'SACO' | 'SACOLA' | 'TAMBOR'
  | 'TANQUE' | 'TON' | 'TUBO' | 'UNID' | 'VASIL' | 'VIDRO';

export interface ItemBase {
  productExternalId?: string;
  sku?: string;
  ean?: string;
  name: string;
  quantity: number | string;
  measurementUnit: MeasurementUnit;
  priceUnit: number | string;
  currency: string;
}

export interface InvoiceItem extends ItemBase {
  totalValue?: number | string;
  fiscalOperationCode?: string;
  ncm?: string;
}

export interface ContactDTO {
  externalPlatform?: Platform;
  externalId?: string;
  firstName: string;
  lastName?: string;
  birthdate?: Date | string;
  email: string | string[];
  mobile?: string;
  landline?: string;
  country?: string;
  zipcode?: string;
  state?: string;
  city?: string;
  address?: string;
  streetNumber?: string;
  neighborhood?: string;
}

export interface ProductDTO {
  externalPlatform: Platform;
  externalId: string;
  name: string;
  sku: string;
  ean?: string;
  brand: string;
  description: string;
  measurementUnit: MeasurementUnit;
  priceUnit: number | string;
  currency: string;
  ncm?: string;
}

export interface OrderDTO {
  externalPlatform: Platform;
  externalId: string;
  invoiceExternalId?: string;
  customerExternalId?: string;
  orderNumber: string;
  orderTimestamp: Date | string;
  totalAmount: number | string;
  legalCode?: string;
  legalName?: string;
  primaryPhone?: string;
  email: string | string[];
  orderStatus: OrderStatus;
  items?: ItemBase[];
}

export interface InvoiceDTO {
  externalPlatform: Platform;
  externalId: string;
  customerExternalId?: string;
  issueTimestamp: Date | string;
  invoiceKey?: string;
  invoiceNumber: string;
  invoiceSerie?: string;
  orderNumber?: string;
  orderExternalId?: string;
  legalCode?: string;
  legalName?: string;
  primaryPhone?: string;
  email?: string;
  totalAmount: number | string;
  items?: InvoiceItem[];
}
