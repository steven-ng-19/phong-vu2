export type BaseQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  sort?: {
    [key: string]: 'asc' | 'desc' | 'ascending' | 'descending' | 1 | -1;
  };
  populate?: string[];
};

export type OrderQueryParams = BaseQueryParams & {
  where?: {
    status?: { $in: string[] };
    user?: string;
  };
};

export type ProductQueryParams = BaseQueryParams & {
  where?: {
    category?: { $in: string[] };
    price?: { $gte: number; $lte: number };
    quantity?: { $gte: number };
  };
};

export type WishQueryParams = BaseQueryParams & {
  where?: {
    product?: { $in: string[] };
    user?: string;
  };
};

export type PromotionQueryParams = BaseQueryParams & {
  where?: {
    isDefault?: boolean;
    endDate?: { $gte: Date };
  };
};

export type StatisticsQueryParams = {
  where?: {
    fromDate: Date;
    toDate: Date;
  };
};
