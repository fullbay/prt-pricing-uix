import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AccountConfig = {
  accountId: Scalars['String']['output'];
  parts: Maybe<PartsConfig>;
  skuType: Scalars['String']['output'];
  unitPack: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type CalculationMethod =
  | 'margin'
  | 'markup';

export type CheckAuthResponse = {
  message: Scalars['String']['output'];
  status: Scalars['String']['output'];
  timestamp: Scalars['String']['output'];
  user: User;
};

export type CreatePartPricingScaleInput = {
  calculatedBasedOn: CalculationMethod;
  isDefault: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  state: PricingState;
  tiers: Array<PricingTierInput>;
};

export type HelloResponse = {
  message: Scalars['String']['output'];
};

export type Mutation = {
  createPartPricingScale: PricingScale;
  deletePartPricingScale: Scalars['Boolean']['output'];
  updatePartPricingScale: PricingScale;
};


export type MutationCreatePartPricingScaleArgs = {
  accountId: Scalars['String']['input'];
  input: CreatePartPricingScaleInput;
};


export type MutationDeletePartPricingScaleArgs = {
  accountId: Scalars['String']['input'];
  pricingScaleId: Scalars['String']['input'];
};


export type MutationUpdatePartPricingScaleArgs = {
  accountId: Scalars['String']['input'];
  input: UpdatePartPricingScaleInput;
  pricingScaleId: Scalars['String']['input'];
};

export type PartsConfig = {
  eCommerce: Maybe<Scalars['String']['output']>;
  integrations: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  inventory: Maybe<Scalars['String']['output']>;
  marketPlace: Maybe<Scalars['String']['output']>;
  partsForRepair: Maybe<Scalars['String']['output']>;
};

export type PricingScale = {
  accountId: Scalars['String']['output'];
  calculatedBasedOn: CalculationMethod;
  createdAt: Scalars['Int']['output'];
  isDefault: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  pricingScaleId: Scalars['String']['output'];
  state: PricingState;
  tiers: Array<PricingTier>;
  updatedAt: Scalars['Int']['output'];
};

export type PricingState =
  | 'active'
  | 'archived'
  | 'deleted';

export type PricingTier = {
  minAmount: Scalars['Float']['output'];
  percent: Scalars['Float']['output'];
};

export type PricingTierInput = {
  minAmount: Scalars['Float']['input'];
  percent: Scalars['Float']['input'];
};

export type Query = {
  checkAuth: CheckAuthResponse;
  getConfig: Maybe<AccountConfig>;
  getPartPricingScale: Maybe<PricingScale>;
  hello: HelloResponse;
  listPartPricingScales: Array<PricingScale>;
};


export type QueryGetConfigArgs = {
  accountId: Scalars['String']['input'];
};


export type QueryGetPartPricingScaleArgs = {
  accountId: Scalars['String']['input'];
  pricingScaleId: Scalars['String']['input'];
};


export type QueryListPartPricingScalesArgs = {
  accountId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  state?: InputMaybe<PricingState>;
};

export type UpdatePartPricingScaleInput = {
  calculatedBasedOn: CalculationMethod;
  isDefault: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  state: PricingState;
  tiers: Array<PricingTierInput>;
};

export type User = {
  context: Scalars['String']['output'];
  organizationId: Scalars['String']['output'];
  roles: Array<Scalars['String']['output']>;
  sessionId: Scalars['String']['output'];
  sub: Scalars['String']['output'];
};

export type CreatePartPricingScaleMutationVariables = Exact<{
  accountId: Scalars['String']['input'];
  input: CreatePartPricingScaleInput;
}>;


export type CreatePartPricingScaleMutation = { createPartPricingScale: { accountId: string, pricingScaleId: string, name: string, isDefault: boolean, calculatedBasedOn: CalculationMethod, state: PricingState, createdAt: number, updatedAt: number, tiers: Array<{ minAmount: number, percent: number }> } };

export type DeletePartPricingScaleMutationVariables = Exact<{
  accountId: Scalars['String']['input'];
  pricingScaleId: Scalars['String']['input'];
}>;


export type DeletePartPricingScaleMutation = { deletePartPricingScale: boolean };

export type GetConfigQueryVariables = Exact<{
  accountId: Scalars['String']['input'];
}>;


export type GetConfigQuery = { getConfig: { accountId: string, skuType: string, unitPack: Array<string | null> | null, parts: { partsForRepair: string | null, inventory: string | null, marketPlace: string | null, eCommerce: string | null, integrations: Array<string | null> | null } | null } | null };

export type GetPartPricingScaleQueryVariables = Exact<{
  accountId: Scalars['String']['input'];
  pricingScaleId: Scalars['String']['input'];
}>;


export type GetPartPricingScaleQuery = { getPartPricingScale: { accountId: string, pricingScaleId: string, name: string, isDefault: boolean, calculatedBasedOn: CalculationMethod, state: PricingState, createdAt: number, updatedAt: number, tiers: Array<{ minAmount: number, percent: number }> } | null };

export type ListPartPricingScalesQueryVariables = Exact<{
  accountId: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<PricingState>;
}>;


export type ListPartPricingScalesQuery = { listPartPricingScales: Array<{ accountId: string, pricingScaleId: string, name: string, isDefault: boolean, calculatedBasedOn: CalculationMethod, state: PricingState, createdAt: number, updatedAt: number, tiers: Array<{ minAmount: number, percent: number }> }> };

export type UpdatePartPricingScaleMutationVariables = Exact<{
  accountId: Scalars['String']['input'];
  pricingScaleId: Scalars['String']['input'];
  input: UpdatePartPricingScaleInput;
}>;


export type UpdatePartPricingScaleMutation = { updatePartPricingScale: { accountId: string, pricingScaleId: string, name: string, isDefault: boolean, calculatedBasedOn: CalculationMethod, state: PricingState, createdAt: number, updatedAt: number, tiers: Array<{ minAmount: number, percent: number }> } };


export const CreatePartPricingScaleDocument = gql`
    mutation CreatePartPricingScale($accountId: String!, $input: CreatePartPricingScaleInput!) {
  createPartPricingScale(accountId: $accountId, input: $input) {
    accountId
    pricingScaleId
    name
    isDefault
    calculatedBasedOn
    tiers {
      minAmount
      percent
    }
    state
    createdAt
    updatedAt
  }
}
    `;
export const DeletePartPricingScaleDocument = gql`
    mutation DeletePartPricingScale($accountId: String!, $pricingScaleId: String!) {
  deletePartPricingScale(accountId: $accountId, pricingScaleId: $pricingScaleId)
}
    `;
export const GetConfigDocument = gql`
    query GetConfig($accountId: String!) {
  getConfig(accountId: $accountId) {
    accountId
    skuType
    unitPack
    parts {
      partsForRepair
      inventory
      marketPlace
      eCommerce
      integrations
    }
  }
}
    `;
export const GetPartPricingScaleDocument = gql`
    query GetPartPricingScale($accountId: String!, $pricingScaleId: String!) {
  getPartPricingScale(accountId: $accountId, pricingScaleId: $pricingScaleId) {
    accountId
    pricingScaleId
    name
    isDefault
    calculatedBasedOn
    tiers {
      minAmount
      percent
    }
    state
    createdAt
    updatedAt
  }
}
    `;
export const ListPartPricingScalesDocument = gql`
    query ListPartPricingScales($accountId: String!, $limit: Int, $cursor: String, $state: PricingState) {
  listPartPricingScales(
    accountId: $accountId
    limit: $limit
    cursor: $cursor
    state: $state
  ) {
    accountId
    pricingScaleId
    name
    isDefault
    calculatedBasedOn
    tiers {
      minAmount
      percent
    }
    state
    createdAt
    updatedAt
  }
}
    `;
export const UpdatePartPricingScaleDocument = gql`
    mutation UpdatePartPricingScale($accountId: String!, $pricingScaleId: String!, $input: UpdatePartPricingScaleInput!) {
  updatePartPricingScale(
    accountId: $accountId
    pricingScaleId: $pricingScaleId
    input: $input
  ) {
    accountId
    pricingScaleId
    name
    isDefault
    calculatedBasedOn
    tiers {
      minAmount
      percent
    }
    state
    createdAt
    updatedAt
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CreatePartPricingScale(variables: CreatePartPricingScaleMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreatePartPricingScaleMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreatePartPricingScaleMutation>({ document: CreatePartPricingScaleDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreatePartPricingScale', 'mutation', variables);
    },
    DeletePartPricingScale(variables: DeletePartPricingScaleMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DeletePartPricingScaleMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeletePartPricingScaleMutation>({ document: DeletePartPricingScaleDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeletePartPricingScale', 'mutation', variables);
    },
    GetConfig(variables: GetConfigQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetConfigQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetConfigQuery>({ document: GetConfigDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetConfig', 'query', variables);
    },
    GetPartPricingScale(variables: GetPartPricingScaleQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetPartPricingScaleQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPartPricingScaleQuery>({ document: GetPartPricingScaleDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetPartPricingScale', 'query', variables);
    },
    ListPartPricingScales(variables: ListPartPricingScalesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ListPartPricingScalesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ListPartPricingScalesQuery>({ document: ListPartPricingScalesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'ListPartPricingScales', 'query', variables);
    },
    UpdatePartPricingScale(variables: UpdatePartPricingScaleMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpdatePartPricingScaleMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdatePartPricingScaleMutation>({ document: UpdatePartPricingScaleDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdatePartPricingScale', 'mutation', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;