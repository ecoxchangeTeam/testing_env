
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model ActivationRecord
 * 
 */
export type ActivationRecord = $Result.DefaultSelection<Prisma.$ActivationRecordPayload>
/**
 * Model ProductSnapshot
 * 
 */
export type ProductSnapshot = $Result.DefaultSelection<Prisma.$ProductSnapshotPayload>
/**
 * Model QRRecord
 * 
 */
export type QRRecord = $Result.DefaultSelection<Prisma.$QRRecordPayload>
/**
 * Model QRInventory
 * 
 */
export type QRInventory = $Result.DefaultSelection<Prisma.$QRInventoryPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more ActivationRecords
 * const activationRecords = await prisma.activationRecord.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more ActivationRecords
   * const activationRecords = await prisma.activationRecord.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.activationRecord`: Exposes CRUD operations for the **ActivationRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActivationRecords
    * const activationRecords = await prisma.activationRecord.findMany()
    * ```
    */
  get activationRecord(): Prisma.ActivationRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productSnapshot`: Exposes CRUD operations for the **ProductSnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductSnapshots
    * const productSnapshots = await prisma.productSnapshot.findMany()
    * ```
    */
  get productSnapshot(): Prisma.ProductSnapshotDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.qRRecord`: Exposes CRUD operations for the **QRRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QRRecords
    * const qRRecords = await prisma.qRRecord.findMany()
    * ```
    */
  get qRRecord(): Prisma.QRRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.qRInventory`: Exposes CRUD operations for the **QRInventory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QRInventories
    * const qRInventories = await prisma.qRInventory.findMany()
    * ```
    */
  get qRInventory(): Prisma.QRInventoryDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    ActivationRecord: 'ActivationRecord',
    ProductSnapshot: 'ProductSnapshot',
    QRRecord: 'QRRecord',
    QRInventory: 'QRInventory'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "activationRecord" | "productSnapshot" | "qRRecord" | "qRInventory"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      ActivationRecord: {
        payload: Prisma.$ActivationRecordPayload<ExtArgs>
        fields: Prisma.ActivationRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivationRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivationRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivationRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivationRecordPayload>
          }
          findFirst: {
            args: Prisma.ActivationRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivationRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivationRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivationRecordPayload>
          }
          findMany: {
            args: Prisma.ActivationRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivationRecordPayload>[]
          }
          create: {
            args: Prisma.ActivationRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivationRecordPayload>
          }
          createMany: {
            args: Prisma.ActivationRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActivationRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivationRecordPayload>[]
          }
          delete: {
            args: Prisma.ActivationRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivationRecordPayload>
          }
          update: {
            args: Prisma.ActivationRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivationRecordPayload>
          }
          deleteMany: {
            args: Prisma.ActivationRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivationRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActivationRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivationRecordPayload>[]
          }
          upsert: {
            args: Prisma.ActivationRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivationRecordPayload>
          }
          aggregate: {
            args: Prisma.ActivationRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivationRecord>
          }
          groupBy: {
            args: Prisma.ActivationRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivationRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivationRecordCountArgs<ExtArgs>
            result: $Utils.Optional<ActivationRecordCountAggregateOutputType> | number
          }
        }
      }
      ProductSnapshot: {
        payload: Prisma.$ProductSnapshotPayload<ExtArgs>
        fields: Prisma.ProductSnapshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductSnapshotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSnapshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductSnapshotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSnapshotPayload>
          }
          findFirst: {
            args: Prisma.ProductSnapshotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSnapshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductSnapshotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSnapshotPayload>
          }
          findMany: {
            args: Prisma.ProductSnapshotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSnapshotPayload>[]
          }
          create: {
            args: Prisma.ProductSnapshotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSnapshotPayload>
          }
          createMany: {
            args: Prisma.ProductSnapshotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductSnapshotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSnapshotPayload>[]
          }
          delete: {
            args: Prisma.ProductSnapshotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSnapshotPayload>
          }
          update: {
            args: Prisma.ProductSnapshotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSnapshotPayload>
          }
          deleteMany: {
            args: Prisma.ProductSnapshotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductSnapshotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductSnapshotUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSnapshotPayload>[]
          }
          upsert: {
            args: Prisma.ProductSnapshotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSnapshotPayload>
          }
          aggregate: {
            args: Prisma.ProductSnapshotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductSnapshot>
          }
          groupBy: {
            args: Prisma.ProductSnapshotGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductSnapshotGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductSnapshotCountArgs<ExtArgs>
            result: $Utils.Optional<ProductSnapshotCountAggregateOutputType> | number
          }
        }
      }
      QRRecord: {
        payload: Prisma.$QRRecordPayload<ExtArgs>
        fields: Prisma.QRRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QRRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QRRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRRecordPayload>
          }
          findFirst: {
            args: Prisma.QRRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QRRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRRecordPayload>
          }
          findMany: {
            args: Prisma.QRRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRRecordPayload>[]
          }
          create: {
            args: Prisma.QRRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRRecordPayload>
          }
          createMany: {
            args: Prisma.QRRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QRRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRRecordPayload>[]
          }
          delete: {
            args: Prisma.QRRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRRecordPayload>
          }
          update: {
            args: Prisma.QRRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRRecordPayload>
          }
          deleteMany: {
            args: Prisma.QRRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QRRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QRRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRRecordPayload>[]
          }
          upsert: {
            args: Prisma.QRRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRRecordPayload>
          }
          aggregate: {
            args: Prisma.QRRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQRRecord>
          }
          groupBy: {
            args: Prisma.QRRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<QRRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.QRRecordCountArgs<ExtArgs>
            result: $Utils.Optional<QRRecordCountAggregateOutputType> | number
          }
        }
      }
      QRInventory: {
        payload: Prisma.$QRInventoryPayload<ExtArgs>
        fields: Prisma.QRInventoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QRInventoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRInventoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QRInventoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRInventoryPayload>
          }
          findFirst: {
            args: Prisma.QRInventoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRInventoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QRInventoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRInventoryPayload>
          }
          findMany: {
            args: Prisma.QRInventoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRInventoryPayload>[]
          }
          create: {
            args: Prisma.QRInventoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRInventoryPayload>
          }
          createMany: {
            args: Prisma.QRInventoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QRInventoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRInventoryPayload>[]
          }
          delete: {
            args: Prisma.QRInventoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRInventoryPayload>
          }
          update: {
            args: Prisma.QRInventoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRInventoryPayload>
          }
          deleteMany: {
            args: Prisma.QRInventoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QRInventoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QRInventoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRInventoryPayload>[]
          }
          upsert: {
            args: Prisma.QRInventoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRInventoryPayload>
          }
          aggregate: {
            args: Prisma.QRInventoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQRInventory>
          }
          groupBy: {
            args: Prisma.QRInventoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<QRInventoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.QRInventoryCountArgs<ExtArgs>
            result: $Utils.Optional<QRInventoryCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    activationRecord?: ActivationRecordOmit
    productSnapshot?: ProductSnapshotOmit
    qRRecord?: QRRecordOmit
    qRInventory?: QRInventoryOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model ActivationRecord
   */

  export type AggregateActivationRecord = {
    _count: ActivationRecordCountAggregateOutputType | null
    _min: ActivationRecordMinAggregateOutputType | null
    _max: ActivationRecordMaxAggregateOutputType | null
  }

  export type ActivationRecordMinAggregateOutputType = {
    id: string | null
    dppId: string | null
    productId: string | null
    status: string | null
    activatedAt: Date | null
    ipAddress: string | null
    deviceInfo: string | null
    activatedBy: string | null
    qrRecordId: string | null
  }

  export type ActivationRecordMaxAggregateOutputType = {
    id: string | null
    dppId: string | null
    productId: string | null
    status: string | null
    activatedAt: Date | null
    ipAddress: string | null
    deviceInfo: string | null
    activatedBy: string | null
    qrRecordId: string | null
  }

  export type ActivationRecordCountAggregateOutputType = {
    id: number
    dppId: number
    productId: number
    status: number
    activatedAt: number
    ipAddress: number
    deviceInfo: number
    activatedBy: number
    qrRecordId: number
    _all: number
  }


  export type ActivationRecordMinAggregateInputType = {
    id?: true
    dppId?: true
    productId?: true
    status?: true
    activatedAt?: true
    ipAddress?: true
    deviceInfo?: true
    activatedBy?: true
    qrRecordId?: true
  }

  export type ActivationRecordMaxAggregateInputType = {
    id?: true
    dppId?: true
    productId?: true
    status?: true
    activatedAt?: true
    ipAddress?: true
    deviceInfo?: true
    activatedBy?: true
    qrRecordId?: true
  }

  export type ActivationRecordCountAggregateInputType = {
    id?: true
    dppId?: true
    productId?: true
    status?: true
    activatedAt?: true
    ipAddress?: true
    deviceInfo?: true
    activatedBy?: true
    qrRecordId?: true
    _all?: true
  }

  export type ActivationRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivationRecord to aggregate.
     */
    where?: ActivationRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivationRecords to fetch.
     */
    orderBy?: ActivationRecordOrderByWithRelationInput | ActivationRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivationRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivationRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivationRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActivationRecords
    **/
    _count?: true | ActivationRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivationRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivationRecordMaxAggregateInputType
  }

  export type GetActivationRecordAggregateType<T extends ActivationRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateActivationRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivationRecord[P]>
      : GetScalarType<T[P], AggregateActivationRecord[P]>
  }




  export type ActivationRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivationRecordWhereInput
    orderBy?: ActivationRecordOrderByWithAggregationInput | ActivationRecordOrderByWithAggregationInput[]
    by: ActivationRecordScalarFieldEnum[] | ActivationRecordScalarFieldEnum
    having?: ActivationRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivationRecordCountAggregateInputType | true
    _min?: ActivationRecordMinAggregateInputType
    _max?: ActivationRecordMaxAggregateInputType
  }

  export type ActivationRecordGroupByOutputType = {
    id: string
    dppId: string
    productId: string
    status: string
    activatedAt: Date
    ipAddress: string | null
    deviceInfo: string | null
    activatedBy: string | null
    qrRecordId: string | null
    _count: ActivationRecordCountAggregateOutputType | null
    _min: ActivationRecordMinAggregateOutputType | null
    _max: ActivationRecordMaxAggregateOutputType | null
  }

  type GetActivationRecordGroupByPayload<T extends ActivationRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivationRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivationRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivationRecordGroupByOutputType[P]>
            : GetScalarType<T[P], ActivationRecordGroupByOutputType[P]>
        }
      >
    >


  export type ActivationRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dppId?: boolean
    productId?: boolean
    status?: boolean
    activatedAt?: boolean
    ipAddress?: boolean
    deviceInfo?: boolean
    activatedBy?: boolean
    qrRecordId?: boolean
  }, ExtArgs["result"]["activationRecord"]>

  export type ActivationRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dppId?: boolean
    productId?: boolean
    status?: boolean
    activatedAt?: boolean
    ipAddress?: boolean
    deviceInfo?: boolean
    activatedBy?: boolean
    qrRecordId?: boolean
  }, ExtArgs["result"]["activationRecord"]>

  export type ActivationRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dppId?: boolean
    productId?: boolean
    status?: boolean
    activatedAt?: boolean
    ipAddress?: boolean
    deviceInfo?: boolean
    activatedBy?: boolean
    qrRecordId?: boolean
  }, ExtArgs["result"]["activationRecord"]>

  export type ActivationRecordSelectScalar = {
    id?: boolean
    dppId?: boolean
    productId?: boolean
    status?: boolean
    activatedAt?: boolean
    ipAddress?: boolean
    deviceInfo?: boolean
    activatedBy?: boolean
    qrRecordId?: boolean
  }

  export type ActivationRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "dppId" | "productId" | "status" | "activatedAt" | "ipAddress" | "deviceInfo" | "activatedBy" | "qrRecordId", ExtArgs["result"]["activationRecord"]>

  export type $ActivationRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActivationRecord"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      dppId: string
      productId: string
      status: string
      activatedAt: Date
      ipAddress: string | null
      deviceInfo: string | null
      activatedBy: string | null
      qrRecordId: string | null
    }, ExtArgs["result"]["activationRecord"]>
    composites: {}
  }

  type ActivationRecordGetPayload<S extends boolean | null | undefined | ActivationRecordDefaultArgs> = $Result.GetResult<Prisma.$ActivationRecordPayload, S>

  type ActivationRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActivationRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActivationRecordCountAggregateInputType | true
    }

  export interface ActivationRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActivationRecord'], meta: { name: 'ActivationRecord' } }
    /**
     * Find zero or one ActivationRecord that matches the filter.
     * @param {ActivationRecordFindUniqueArgs} args - Arguments to find a ActivationRecord
     * @example
     * // Get one ActivationRecord
     * const activationRecord = await prisma.activationRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivationRecordFindUniqueArgs>(args: SelectSubset<T, ActivationRecordFindUniqueArgs<ExtArgs>>): Prisma__ActivationRecordClient<$Result.GetResult<Prisma.$ActivationRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ActivationRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActivationRecordFindUniqueOrThrowArgs} args - Arguments to find a ActivationRecord
     * @example
     * // Get one ActivationRecord
     * const activationRecord = await prisma.activationRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivationRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivationRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivationRecordClient<$Result.GetResult<Prisma.$ActivationRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActivationRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivationRecordFindFirstArgs} args - Arguments to find a ActivationRecord
     * @example
     * // Get one ActivationRecord
     * const activationRecord = await prisma.activationRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivationRecordFindFirstArgs>(args?: SelectSubset<T, ActivationRecordFindFirstArgs<ExtArgs>>): Prisma__ActivationRecordClient<$Result.GetResult<Prisma.$ActivationRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActivationRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivationRecordFindFirstOrThrowArgs} args - Arguments to find a ActivationRecord
     * @example
     * // Get one ActivationRecord
     * const activationRecord = await prisma.activationRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivationRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivationRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivationRecordClient<$Result.GetResult<Prisma.$ActivationRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ActivationRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivationRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActivationRecords
     * const activationRecords = await prisma.activationRecord.findMany()
     * 
     * // Get first 10 ActivationRecords
     * const activationRecords = await prisma.activationRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activationRecordWithIdOnly = await prisma.activationRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivationRecordFindManyArgs>(args?: SelectSubset<T, ActivationRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivationRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ActivationRecord.
     * @param {ActivationRecordCreateArgs} args - Arguments to create a ActivationRecord.
     * @example
     * // Create one ActivationRecord
     * const ActivationRecord = await prisma.activationRecord.create({
     *   data: {
     *     // ... data to create a ActivationRecord
     *   }
     * })
     * 
     */
    create<T extends ActivationRecordCreateArgs>(args: SelectSubset<T, ActivationRecordCreateArgs<ExtArgs>>): Prisma__ActivationRecordClient<$Result.GetResult<Prisma.$ActivationRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ActivationRecords.
     * @param {ActivationRecordCreateManyArgs} args - Arguments to create many ActivationRecords.
     * @example
     * // Create many ActivationRecords
     * const activationRecord = await prisma.activationRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivationRecordCreateManyArgs>(args?: SelectSubset<T, ActivationRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActivationRecords and returns the data saved in the database.
     * @param {ActivationRecordCreateManyAndReturnArgs} args - Arguments to create many ActivationRecords.
     * @example
     * // Create many ActivationRecords
     * const activationRecord = await prisma.activationRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActivationRecords and only return the `id`
     * const activationRecordWithIdOnly = await prisma.activationRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActivationRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, ActivationRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivationRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ActivationRecord.
     * @param {ActivationRecordDeleteArgs} args - Arguments to delete one ActivationRecord.
     * @example
     * // Delete one ActivationRecord
     * const ActivationRecord = await prisma.activationRecord.delete({
     *   where: {
     *     // ... filter to delete one ActivationRecord
     *   }
     * })
     * 
     */
    delete<T extends ActivationRecordDeleteArgs>(args: SelectSubset<T, ActivationRecordDeleteArgs<ExtArgs>>): Prisma__ActivationRecordClient<$Result.GetResult<Prisma.$ActivationRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ActivationRecord.
     * @param {ActivationRecordUpdateArgs} args - Arguments to update one ActivationRecord.
     * @example
     * // Update one ActivationRecord
     * const activationRecord = await prisma.activationRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivationRecordUpdateArgs>(args: SelectSubset<T, ActivationRecordUpdateArgs<ExtArgs>>): Prisma__ActivationRecordClient<$Result.GetResult<Prisma.$ActivationRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ActivationRecords.
     * @param {ActivationRecordDeleteManyArgs} args - Arguments to filter ActivationRecords to delete.
     * @example
     * // Delete a few ActivationRecords
     * const { count } = await prisma.activationRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivationRecordDeleteManyArgs>(args?: SelectSubset<T, ActivationRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivationRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivationRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActivationRecords
     * const activationRecord = await prisma.activationRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivationRecordUpdateManyArgs>(args: SelectSubset<T, ActivationRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivationRecords and returns the data updated in the database.
     * @param {ActivationRecordUpdateManyAndReturnArgs} args - Arguments to update many ActivationRecords.
     * @example
     * // Update many ActivationRecords
     * const activationRecord = await prisma.activationRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ActivationRecords and only return the `id`
     * const activationRecordWithIdOnly = await prisma.activationRecord.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActivationRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, ActivationRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivationRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ActivationRecord.
     * @param {ActivationRecordUpsertArgs} args - Arguments to update or create a ActivationRecord.
     * @example
     * // Update or create a ActivationRecord
     * const activationRecord = await prisma.activationRecord.upsert({
     *   create: {
     *     // ... data to create a ActivationRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActivationRecord we want to update
     *   }
     * })
     */
    upsert<T extends ActivationRecordUpsertArgs>(args: SelectSubset<T, ActivationRecordUpsertArgs<ExtArgs>>): Prisma__ActivationRecordClient<$Result.GetResult<Prisma.$ActivationRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ActivationRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivationRecordCountArgs} args - Arguments to filter ActivationRecords to count.
     * @example
     * // Count the number of ActivationRecords
     * const count = await prisma.activationRecord.count({
     *   where: {
     *     // ... the filter for the ActivationRecords we want to count
     *   }
     * })
    **/
    count<T extends ActivationRecordCountArgs>(
      args?: Subset<T, ActivationRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivationRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActivationRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivationRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActivationRecordAggregateArgs>(args: Subset<T, ActivationRecordAggregateArgs>): Prisma.PrismaPromise<GetActivationRecordAggregateType<T>>

    /**
     * Group by ActivationRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivationRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActivationRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivationRecordGroupByArgs['orderBy'] }
        : { orderBy?: ActivationRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActivationRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivationRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActivationRecord model
   */
  readonly fields: ActivationRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActivationRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivationRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ActivationRecord model
   */
  interface ActivationRecordFieldRefs {
    readonly id: FieldRef<"ActivationRecord", 'String'>
    readonly dppId: FieldRef<"ActivationRecord", 'String'>
    readonly productId: FieldRef<"ActivationRecord", 'String'>
    readonly status: FieldRef<"ActivationRecord", 'String'>
    readonly activatedAt: FieldRef<"ActivationRecord", 'DateTime'>
    readonly ipAddress: FieldRef<"ActivationRecord", 'String'>
    readonly deviceInfo: FieldRef<"ActivationRecord", 'String'>
    readonly activatedBy: FieldRef<"ActivationRecord", 'String'>
    readonly qrRecordId: FieldRef<"ActivationRecord", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ActivationRecord findUnique
   */
  export type ActivationRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivationRecord
     */
    select?: ActivationRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivationRecord
     */
    omit?: ActivationRecordOmit<ExtArgs> | null
    /**
     * Filter, which ActivationRecord to fetch.
     */
    where: ActivationRecordWhereUniqueInput
  }

  /**
   * ActivationRecord findUniqueOrThrow
   */
  export type ActivationRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivationRecord
     */
    select?: ActivationRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivationRecord
     */
    omit?: ActivationRecordOmit<ExtArgs> | null
    /**
     * Filter, which ActivationRecord to fetch.
     */
    where: ActivationRecordWhereUniqueInput
  }

  /**
   * ActivationRecord findFirst
   */
  export type ActivationRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivationRecord
     */
    select?: ActivationRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivationRecord
     */
    omit?: ActivationRecordOmit<ExtArgs> | null
    /**
     * Filter, which ActivationRecord to fetch.
     */
    where?: ActivationRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivationRecords to fetch.
     */
    orderBy?: ActivationRecordOrderByWithRelationInput | ActivationRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivationRecords.
     */
    cursor?: ActivationRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivationRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivationRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivationRecords.
     */
    distinct?: ActivationRecordScalarFieldEnum | ActivationRecordScalarFieldEnum[]
  }

  /**
   * ActivationRecord findFirstOrThrow
   */
  export type ActivationRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivationRecord
     */
    select?: ActivationRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivationRecord
     */
    omit?: ActivationRecordOmit<ExtArgs> | null
    /**
     * Filter, which ActivationRecord to fetch.
     */
    where?: ActivationRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivationRecords to fetch.
     */
    orderBy?: ActivationRecordOrderByWithRelationInput | ActivationRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivationRecords.
     */
    cursor?: ActivationRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivationRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivationRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivationRecords.
     */
    distinct?: ActivationRecordScalarFieldEnum | ActivationRecordScalarFieldEnum[]
  }

  /**
   * ActivationRecord findMany
   */
  export type ActivationRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivationRecord
     */
    select?: ActivationRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivationRecord
     */
    omit?: ActivationRecordOmit<ExtArgs> | null
    /**
     * Filter, which ActivationRecords to fetch.
     */
    where?: ActivationRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivationRecords to fetch.
     */
    orderBy?: ActivationRecordOrderByWithRelationInput | ActivationRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActivationRecords.
     */
    cursor?: ActivationRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivationRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivationRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivationRecords.
     */
    distinct?: ActivationRecordScalarFieldEnum | ActivationRecordScalarFieldEnum[]
  }

  /**
   * ActivationRecord create
   */
  export type ActivationRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivationRecord
     */
    select?: ActivationRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivationRecord
     */
    omit?: ActivationRecordOmit<ExtArgs> | null
    /**
     * The data needed to create a ActivationRecord.
     */
    data: XOR<ActivationRecordCreateInput, ActivationRecordUncheckedCreateInput>
  }

  /**
   * ActivationRecord createMany
   */
  export type ActivationRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActivationRecords.
     */
    data: ActivationRecordCreateManyInput | ActivationRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActivationRecord createManyAndReturn
   */
  export type ActivationRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivationRecord
     */
    select?: ActivationRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActivationRecord
     */
    omit?: ActivationRecordOmit<ExtArgs> | null
    /**
     * The data used to create many ActivationRecords.
     */
    data: ActivationRecordCreateManyInput | ActivationRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActivationRecord update
   */
  export type ActivationRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivationRecord
     */
    select?: ActivationRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivationRecord
     */
    omit?: ActivationRecordOmit<ExtArgs> | null
    /**
     * The data needed to update a ActivationRecord.
     */
    data: XOR<ActivationRecordUpdateInput, ActivationRecordUncheckedUpdateInput>
    /**
     * Choose, which ActivationRecord to update.
     */
    where: ActivationRecordWhereUniqueInput
  }

  /**
   * ActivationRecord updateMany
   */
  export type ActivationRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActivationRecords.
     */
    data: XOR<ActivationRecordUpdateManyMutationInput, ActivationRecordUncheckedUpdateManyInput>
    /**
     * Filter which ActivationRecords to update
     */
    where?: ActivationRecordWhereInput
    /**
     * Limit how many ActivationRecords to update.
     */
    limit?: number
  }

  /**
   * ActivationRecord updateManyAndReturn
   */
  export type ActivationRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivationRecord
     */
    select?: ActivationRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActivationRecord
     */
    omit?: ActivationRecordOmit<ExtArgs> | null
    /**
     * The data used to update ActivationRecords.
     */
    data: XOR<ActivationRecordUpdateManyMutationInput, ActivationRecordUncheckedUpdateManyInput>
    /**
     * Filter which ActivationRecords to update
     */
    where?: ActivationRecordWhereInput
    /**
     * Limit how many ActivationRecords to update.
     */
    limit?: number
  }

  /**
   * ActivationRecord upsert
   */
  export type ActivationRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivationRecord
     */
    select?: ActivationRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivationRecord
     */
    omit?: ActivationRecordOmit<ExtArgs> | null
    /**
     * The filter to search for the ActivationRecord to update in case it exists.
     */
    where: ActivationRecordWhereUniqueInput
    /**
     * In case the ActivationRecord found by the `where` argument doesn't exist, create a new ActivationRecord with this data.
     */
    create: XOR<ActivationRecordCreateInput, ActivationRecordUncheckedCreateInput>
    /**
     * In case the ActivationRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivationRecordUpdateInput, ActivationRecordUncheckedUpdateInput>
  }

  /**
   * ActivationRecord delete
   */
  export type ActivationRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivationRecord
     */
    select?: ActivationRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivationRecord
     */
    omit?: ActivationRecordOmit<ExtArgs> | null
    /**
     * Filter which ActivationRecord to delete.
     */
    where: ActivationRecordWhereUniqueInput
  }

  /**
   * ActivationRecord deleteMany
   */
  export type ActivationRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivationRecords to delete
     */
    where?: ActivationRecordWhereInput
    /**
     * Limit how many ActivationRecords to delete.
     */
    limit?: number
  }

  /**
   * ActivationRecord without action
   */
  export type ActivationRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivationRecord
     */
    select?: ActivationRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivationRecord
     */
    omit?: ActivationRecordOmit<ExtArgs> | null
  }


  /**
   * Model ProductSnapshot
   */

  export type AggregateProductSnapshot = {
    _count: ProductSnapshotCountAggregateOutputType | null
    _avg: ProductSnapshotAvgAggregateOutputType | null
    _sum: ProductSnapshotSumAggregateOutputType | null
    _min: ProductSnapshotMinAggregateOutputType | null
    _max: ProductSnapshotMaxAggregateOutputType | null
  }

  export type ProductSnapshotAvgAggregateOutputType = {
    conditionScore: number | null
    trustScore: number | null
  }

  export type ProductSnapshotSumAggregateOutputType = {
    conditionScore: number | null
    trustScore: number | null
  }

  export type ProductSnapshotMinAggregateOutputType = {
    id: string | null
    dppId: string | null
    productId: string | null
    productName: string | null
    category: string | null
    brand: string | null
    model: string | null
    serialNumber: string | null
    status: string | null
    createdAt: Date | null
    conditionScore: number | null
    owner: string | null
    trustScore: number | null
    updatedAt: Date | null
  }

  export type ProductSnapshotMaxAggregateOutputType = {
    id: string | null
    dppId: string | null
    productId: string | null
    productName: string | null
    category: string | null
    brand: string | null
    model: string | null
    serialNumber: string | null
    status: string | null
    createdAt: Date | null
    conditionScore: number | null
    owner: string | null
    trustScore: number | null
    updatedAt: Date | null
  }

  export type ProductSnapshotCountAggregateOutputType = {
    id: number
    dppId: number
    productId: number
    productName: number
    category: number
    brand: number
    model: number
    serialNumber: number
    status: number
    createdAt: number
    conditionScore: number
    owner: number
    trustScore: number
    updatedAt: number
    _all: number
  }


  export type ProductSnapshotAvgAggregateInputType = {
    conditionScore?: true
    trustScore?: true
  }

  export type ProductSnapshotSumAggregateInputType = {
    conditionScore?: true
    trustScore?: true
  }

  export type ProductSnapshotMinAggregateInputType = {
    id?: true
    dppId?: true
    productId?: true
    productName?: true
    category?: true
    brand?: true
    model?: true
    serialNumber?: true
    status?: true
    createdAt?: true
    conditionScore?: true
    owner?: true
    trustScore?: true
    updatedAt?: true
  }

  export type ProductSnapshotMaxAggregateInputType = {
    id?: true
    dppId?: true
    productId?: true
    productName?: true
    category?: true
    brand?: true
    model?: true
    serialNumber?: true
    status?: true
    createdAt?: true
    conditionScore?: true
    owner?: true
    trustScore?: true
    updatedAt?: true
  }

  export type ProductSnapshotCountAggregateInputType = {
    id?: true
    dppId?: true
    productId?: true
    productName?: true
    category?: true
    brand?: true
    model?: true
    serialNumber?: true
    status?: true
    createdAt?: true
    conditionScore?: true
    owner?: true
    trustScore?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductSnapshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductSnapshot to aggregate.
     */
    where?: ProductSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductSnapshots to fetch.
     */
    orderBy?: ProductSnapshotOrderByWithRelationInput | ProductSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductSnapshots
    **/
    _count?: true | ProductSnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductSnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductSnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductSnapshotMaxAggregateInputType
  }

  export type GetProductSnapshotAggregateType<T extends ProductSnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregateProductSnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductSnapshot[P]>
      : GetScalarType<T[P], AggregateProductSnapshot[P]>
  }




  export type ProductSnapshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductSnapshotWhereInput
    orderBy?: ProductSnapshotOrderByWithAggregationInput | ProductSnapshotOrderByWithAggregationInput[]
    by: ProductSnapshotScalarFieldEnum[] | ProductSnapshotScalarFieldEnum
    having?: ProductSnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductSnapshotCountAggregateInputType | true
    _avg?: ProductSnapshotAvgAggregateInputType
    _sum?: ProductSnapshotSumAggregateInputType
    _min?: ProductSnapshotMinAggregateInputType
    _max?: ProductSnapshotMaxAggregateInputType
  }

  export type ProductSnapshotGroupByOutputType = {
    id: string
    dppId: string
    productId: string
    productName: string
    category: string
    brand: string | null
    model: string | null
    serialNumber: string | null
    status: string
    createdAt: Date
    conditionScore: number | null
    owner: string | null
    trustScore: number | null
    updatedAt: Date
    _count: ProductSnapshotCountAggregateOutputType | null
    _avg: ProductSnapshotAvgAggregateOutputType | null
    _sum: ProductSnapshotSumAggregateOutputType | null
    _min: ProductSnapshotMinAggregateOutputType | null
    _max: ProductSnapshotMaxAggregateOutputType | null
  }

  type GetProductSnapshotGroupByPayload<T extends ProductSnapshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductSnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductSnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductSnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], ProductSnapshotGroupByOutputType[P]>
        }
      >
    >


  export type ProductSnapshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dppId?: boolean
    productId?: boolean
    productName?: boolean
    category?: boolean
    brand?: boolean
    model?: boolean
    serialNumber?: boolean
    status?: boolean
    createdAt?: boolean
    conditionScore?: boolean
    owner?: boolean
    trustScore?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["productSnapshot"]>

  export type ProductSnapshotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dppId?: boolean
    productId?: boolean
    productName?: boolean
    category?: boolean
    brand?: boolean
    model?: boolean
    serialNumber?: boolean
    status?: boolean
    createdAt?: boolean
    conditionScore?: boolean
    owner?: boolean
    trustScore?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["productSnapshot"]>

  export type ProductSnapshotSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dppId?: boolean
    productId?: boolean
    productName?: boolean
    category?: boolean
    brand?: boolean
    model?: boolean
    serialNumber?: boolean
    status?: boolean
    createdAt?: boolean
    conditionScore?: boolean
    owner?: boolean
    trustScore?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["productSnapshot"]>

  export type ProductSnapshotSelectScalar = {
    id?: boolean
    dppId?: boolean
    productId?: boolean
    productName?: boolean
    category?: boolean
    brand?: boolean
    model?: boolean
    serialNumber?: boolean
    status?: boolean
    createdAt?: boolean
    conditionScore?: boolean
    owner?: boolean
    trustScore?: boolean
    updatedAt?: boolean
  }

  export type ProductSnapshotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "dppId" | "productId" | "productName" | "category" | "brand" | "model" | "serialNumber" | "status" | "createdAt" | "conditionScore" | "owner" | "trustScore" | "updatedAt", ExtArgs["result"]["productSnapshot"]>

  export type $ProductSnapshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductSnapshot"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      dppId: string
      productId: string
      productName: string
      category: string
      brand: string | null
      model: string | null
      serialNumber: string | null
      status: string
      createdAt: Date
      conditionScore: number | null
      owner: string | null
      trustScore: number | null
      updatedAt: Date
    }, ExtArgs["result"]["productSnapshot"]>
    composites: {}
  }

  type ProductSnapshotGetPayload<S extends boolean | null | undefined | ProductSnapshotDefaultArgs> = $Result.GetResult<Prisma.$ProductSnapshotPayload, S>

  type ProductSnapshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductSnapshotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductSnapshotCountAggregateInputType | true
    }

  export interface ProductSnapshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductSnapshot'], meta: { name: 'ProductSnapshot' } }
    /**
     * Find zero or one ProductSnapshot that matches the filter.
     * @param {ProductSnapshotFindUniqueArgs} args - Arguments to find a ProductSnapshot
     * @example
     * // Get one ProductSnapshot
     * const productSnapshot = await prisma.productSnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductSnapshotFindUniqueArgs>(args: SelectSubset<T, ProductSnapshotFindUniqueArgs<ExtArgs>>): Prisma__ProductSnapshotClient<$Result.GetResult<Prisma.$ProductSnapshotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductSnapshot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductSnapshotFindUniqueOrThrowArgs} args - Arguments to find a ProductSnapshot
     * @example
     * // Get one ProductSnapshot
     * const productSnapshot = await prisma.productSnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductSnapshotFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductSnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductSnapshotClient<$Result.GetResult<Prisma.$ProductSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductSnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductSnapshotFindFirstArgs} args - Arguments to find a ProductSnapshot
     * @example
     * // Get one ProductSnapshot
     * const productSnapshot = await prisma.productSnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductSnapshotFindFirstArgs>(args?: SelectSubset<T, ProductSnapshotFindFirstArgs<ExtArgs>>): Prisma__ProductSnapshotClient<$Result.GetResult<Prisma.$ProductSnapshotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductSnapshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductSnapshotFindFirstOrThrowArgs} args - Arguments to find a ProductSnapshot
     * @example
     * // Get one ProductSnapshot
     * const productSnapshot = await prisma.productSnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductSnapshotFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductSnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductSnapshotClient<$Result.GetResult<Prisma.$ProductSnapshotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductSnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductSnapshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductSnapshots
     * const productSnapshots = await prisma.productSnapshot.findMany()
     * 
     * // Get first 10 ProductSnapshots
     * const productSnapshots = await prisma.productSnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productSnapshotWithIdOnly = await prisma.productSnapshot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductSnapshotFindManyArgs>(args?: SelectSubset<T, ProductSnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductSnapshot.
     * @param {ProductSnapshotCreateArgs} args - Arguments to create a ProductSnapshot.
     * @example
     * // Create one ProductSnapshot
     * const ProductSnapshot = await prisma.productSnapshot.create({
     *   data: {
     *     // ... data to create a ProductSnapshot
     *   }
     * })
     * 
     */
    create<T extends ProductSnapshotCreateArgs>(args: SelectSubset<T, ProductSnapshotCreateArgs<ExtArgs>>): Prisma__ProductSnapshotClient<$Result.GetResult<Prisma.$ProductSnapshotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductSnapshots.
     * @param {ProductSnapshotCreateManyArgs} args - Arguments to create many ProductSnapshots.
     * @example
     * // Create many ProductSnapshots
     * const productSnapshot = await prisma.productSnapshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductSnapshotCreateManyArgs>(args?: SelectSubset<T, ProductSnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductSnapshots and returns the data saved in the database.
     * @param {ProductSnapshotCreateManyAndReturnArgs} args - Arguments to create many ProductSnapshots.
     * @example
     * // Create many ProductSnapshots
     * const productSnapshot = await prisma.productSnapshot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductSnapshots and only return the `id`
     * const productSnapshotWithIdOnly = await prisma.productSnapshot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductSnapshotCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductSnapshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductSnapshotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProductSnapshot.
     * @param {ProductSnapshotDeleteArgs} args - Arguments to delete one ProductSnapshot.
     * @example
     * // Delete one ProductSnapshot
     * const ProductSnapshot = await prisma.productSnapshot.delete({
     *   where: {
     *     // ... filter to delete one ProductSnapshot
     *   }
     * })
     * 
     */
    delete<T extends ProductSnapshotDeleteArgs>(args: SelectSubset<T, ProductSnapshotDeleteArgs<ExtArgs>>): Prisma__ProductSnapshotClient<$Result.GetResult<Prisma.$ProductSnapshotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductSnapshot.
     * @param {ProductSnapshotUpdateArgs} args - Arguments to update one ProductSnapshot.
     * @example
     * // Update one ProductSnapshot
     * const productSnapshot = await prisma.productSnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductSnapshotUpdateArgs>(args: SelectSubset<T, ProductSnapshotUpdateArgs<ExtArgs>>): Prisma__ProductSnapshotClient<$Result.GetResult<Prisma.$ProductSnapshotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductSnapshots.
     * @param {ProductSnapshotDeleteManyArgs} args - Arguments to filter ProductSnapshots to delete.
     * @example
     * // Delete a few ProductSnapshots
     * const { count } = await prisma.productSnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductSnapshotDeleteManyArgs>(args?: SelectSubset<T, ProductSnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductSnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductSnapshots
     * const productSnapshot = await prisma.productSnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductSnapshotUpdateManyArgs>(args: SelectSubset<T, ProductSnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductSnapshots and returns the data updated in the database.
     * @param {ProductSnapshotUpdateManyAndReturnArgs} args - Arguments to update many ProductSnapshots.
     * @example
     * // Update many ProductSnapshots
     * const productSnapshot = await prisma.productSnapshot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProductSnapshots and only return the `id`
     * const productSnapshotWithIdOnly = await prisma.productSnapshot.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductSnapshotUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductSnapshotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductSnapshotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProductSnapshot.
     * @param {ProductSnapshotUpsertArgs} args - Arguments to update or create a ProductSnapshot.
     * @example
     * // Update or create a ProductSnapshot
     * const productSnapshot = await prisma.productSnapshot.upsert({
     *   create: {
     *     // ... data to create a ProductSnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductSnapshot we want to update
     *   }
     * })
     */
    upsert<T extends ProductSnapshotUpsertArgs>(args: SelectSubset<T, ProductSnapshotUpsertArgs<ExtArgs>>): Prisma__ProductSnapshotClient<$Result.GetResult<Prisma.$ProductSnapshotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductSnapshotCountArgs} args - Arguments to filter ProductSnapshots to count.
     * @example
     * // Count the number of ProductSnapshots
     * const count = await prisma.productSnapshot.count({
     *   where: {
     *     // ... the filter for the ProductSnapshots we want to count
     *   }
     * })
    **/
    count<T extends ProductSnapshotCountArgs>(
      args?: Subset<T, ProductSnapshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductSnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductSnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductSnapshotAggregateArgs>(args: Subset<T, ProductSnapshotAggregateArgs>): Prisma.PrismaPromise<GetProductSnapshotAggregateType<T>>

    /**
     * Group by ProductSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductSnapshotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductSnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductSnapshotGroupByArgs['orderBy'] }
        : { orderBy?: ProductSnapshotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductSnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductSnapshot model
   */
  readonly fields: ProductSnapshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductSnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductSnapshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductSnapshot model
   */
  interface ProductSnapshotFieldRefs {
    readonly id: FieldRef<"ProductSnapshot", 'String'>
    readonly dppId: FieldRef<"ProductSnapshot", 'String'>
    readonly productId: FieldRef<"ProductSnapshot", 'String'>
    readonly productName: FieldRef<"ProductSnapshot", 'String'>
    readonly category: FieldRef<"ProductSnapshot", 'String'>
    readonly brand: FieldRef<"ProductSnapshot", 'String'>
    readonly model: FieldRef<"ProductSnapshot", 'String'>
    readonly serialNumber: FieldRef<"ProductSnapshot", 'String'>
    readonly status: FieldRef<"ProductSnapshot", 'String'>
    readonly createdAt: FieldRef<"ProductSnapshot", 'DateTime'>
    readonly conditionScore: FieldRef<"ProductSnapshot", 'Int'>
    readonly owner: FieldRef<"ProductSnapshot", 'String'>
    readonly trustScore: FieldRef<"ProductSnapshot", 'Int'>
    readonly updatedAt: FieldRef<"ProductSnapshot", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProductSnapshot findUnique
   */
  export type ProductSnapshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSnapshot
     */
    select?: ProductSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSnapshot
     */
    omit?: ProductSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which ProductSnapshot to fetch.
     */
    where: ProductSnapshotWhereUniqueInput
  }

  /**
   * ProductSnapshot findUniqueOrThrow
   */
  export type ProductSnapshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSnapshot
     */
    select?: ProductSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSnapshot
     */
    omit?: ProductSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which ProductSnapshot to fetch.
     */
    where: ProductSnapshotWhereUniqueInput
  }

  /**
   * ProductSnapshot findFirst
   */
  export type ProductSnapshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSnapshot
     */
    select?: ProductSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSnapshot
     */
    omit?: ProductSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which ProductSnapshot to fetch.
     */
    where?: ProductSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductSnapshots to fetch.
     */
    orderBy?: ProductSnapshotOrderByWithRelationInput | ProductSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductSnapshots.
     */
    cursor?: ProductSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductSnapshots.
     */
    distinct?: ProductSnapshotScalarFieldEnum | ProductSnapshotScalarFieldEnum[]
  }

  /**
   * ProductSnapshot findFirstOrThrow
   */
  export type ProductSnapshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSnapshot
     */
    select?: ProductSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSnapshot
     */
    omit?: ProductSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which ProductSnapshot to fetch.
     */
    where?: ProductSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductSnapshots to fetch.
     */
    orderBy?: ProductSnapshotOrderByWithRelationInput | ProductSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductSnapshots.
     */
    cursor?: ProductSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductSnapshots.
     */
    distinct?: ProductSnapshotScalarFieldEnum | ProductSnapshotScalarFieldEnum[]
  }

  /**
   * ProductSnapshot findMany
   */
  export type ProductSnapshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSnapshot
     */
    select?: ProductSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSnapshot
     */
    omit?: ProductSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which ProductSnapshots to fetch.
     */
    where?: ProductSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductSnapshots to fetch.
     */
    orderBy?: ProductSnapshotOrderByWithRelationInput | ProductSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductSnapshots.
     */
    cursor?: ProductSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductSnapshots.
     */
    distinct?: ProductSnapshotScalarFieldEnum | ProductSnapshotScalarFieldEnum[]
  }

  /**
   * ProductSnapshot create
   */
  export type ProductSnapshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSnapshot
     */
    select?: ProductSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSnapshot
     */
    omit?: ProductSnapshotOmit<ExtArgs> | null
    /**
     * The data needed to create a ProductSnapshot.
     */
    data: XOR<ProductSnapshotCreateInput, ProductSnapshotUncheckedCreateInput>
  }

  /**
   * ProductSnapshot createMany
   */
  export type ProductSnapshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductSnapshots.
     */
    data: ProductSnapshotCreateManyInput | ProductSnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductSnapshot createManyAndReturn
   */
  export type ProductSnapshotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSnapshot
     */
    select?: ProductSnapshotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSnapshot
     */
    omit?: ProductSnapshotOmit<ExtArgs> | null
    /**
     * The data used to create many ProductSnapshots.
     */
    data: ProductSnapshotCreateManyInput | ProductSnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductSnapshot update
   */
  export type ProductSnapshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSnapshot
     */
    select?: ProductSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSnapshot
     */
    omit?: ProductSnapshotOmit<ExtArgs> | null
    /**
     * The data needed to update a ProductSnapshot.
     */
    data: XOR<ProductSnapshotUpdateInput, ProductSnapshotUncheckedUpdateInput>
    /**
     * Choose, which ProductSnapshot to update.
     */
    where: ProductSnapshotWhereUniqueInput
  }

  /**
   * ProductSnapshot updateMany
   */
  export type ProductSnapshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductSnapshots.
     */
    data: XOR<ProductSnapshotUpdateManyMutationInput, ProductSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which ProductSnapshots to update
     */
    where?: ProductSnapshotWhereInput
    /**
     * Limit how many ProductSnapshots to update.
     */
    limit?: number
  }

  /**
   * ProductSnapshot updateManyAndReturn
   */
  export type ProductSnapshotUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSnapshot
     */
    select?: ProductSnapshotSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSnapshot
     */
    omit?: ProductSnapshotOmit<ExtArgs> | null
    /**
     * The data used to update ProductSnapshots.
     */
    data: XOR<ProductSnapshotUpdateManyMutationInput, ProductSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which ProductSnapshots to update
     */
    where?: ProductSnapshotWhereInput
    /**
     * Limit how many ProductSnapshots to update.
     */
    limit?: number
  }

  /**
   * ProductSnapshot upsert
   */
  export type ProductSnapshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSnapshot
     */
    select?: ProductSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSnapshot
     */
    omit?: ProductSnapshotOmit<ExtArgs> | null
    /**
     * The filter to search for the ProductSnapshot to update in case it exists.
     */
    where: ProductSnapshotWhereUniqueInput
    /**
     * In case the ProductSnapshot found by the `where` argument doesn't exist, create a new ProductSnapshot with this data.
     */
    create: XOR<ProductSnapshotCreateInput, ProductSnapshotUncheckedCreateInput>
    /**
     * In case the ProductSnapshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductSnapshotUpdateInput, ProductSnapshotUncheckedUpdateInput>
  }

  /**
   * ProductSnapshot delete
   */
  export type ProductSnapshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSnapshot
     */
    select?: ProductSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSnapshot
     */
    omit?: ProductSnapshotOmit<ExtArgs> | null
    /**
     * Filter which ProductSnapshot to delete.
     */
    where: ProductSnapshotWhereUniqueInput
  }

  /**
   * ProductSnapshot deleteMany
   */
  export type ProductSnapshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductSnapshots to delete
     */
    where?: ProductSnapshotWhereInput
    /**
     * Limit how many ProductSnapshots to delete.
     */
    limit?: number
  }

  /**
   * ProductSnapshot without action
   */
  export type ProductSnapshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSnapshot
     */
    select?: ProductSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSnapshot
     */
    omit?: ProductSnapshotOmit<ExtArgs> | null
  }


  /**
   * Model QRRecord
   */

  export type AggregateQRRecord = {
    _count: QRRecordCountAggregateOutputType | null
    _avg: QRRecordAvgAggregateOutputType | null
    _sum: QRRecordSumAggregateOutputType | null
    _min: QRRecordMinAggregateOutputType | null
    _max: QRRecordMaxAggregateOutputType | null
  }

  export type QRRecordAvgAggregateOutputType = {
    scanCount: number | null
  }

  export type QRRecordSumAggregateOutputType = {
    scanCount: number | null
  }

  export type QRRecordMinAggregateOutputType = {
    id: string | null
    dppId: string | null
    productId: string | null
    activationUrl: string | null
    status: string | null
    scanCount: number | null
    generatedAt: Date | null
    lastScannedAt: Date | null
    qrHash: string | null
    generatedBy: string | null
  }

  export type QRRecordMaxAggregateOutputType = {
    id: string | null
    dppId: string | null
    productId: string | null
    activationUrl: string | null
    status: string | null
    scanCount: number | null
    generatedAt: Date | null
    lastScannedAt: Date | null
    qrHash: string | null
    generatedBy: string | null
  }

  export type QRRecordCountAggregateOutputType = {
    id: number
    dppId: number
    productId: number
    activationUrl: number
    status: number
    scanCount: number
    generatedAt: number
    lastScannedAt: number
    qrHash: number
    generatedBy: number
    _all: number
  }


  export type QRRecordAvgAggregateInputType = {
    scanCount?: true
  }

  export type QRRecordSumAggregateInputType = {
    scanCount?: true
  }

  export type QRRecordMinAggregateInputType = {
    id?: true
    dppId?: true
    productId?: true
    activationUrl?: true
    status?: true
    scanCount?: true
    generatedAt?: true
    lastScannedAt?: true
    qrHash?: true
    generatedBy?: true
  }

  export type QRRecordMaxAggregateInputType = {
    id?: true
    dppId?: true
    productId?: true
    activationUrl?: true
    status?: true
    scanCount?: true
    generatedAt?: true
    lastScannedAt?: true
    qrHash?: true
    generatedBy?: true
  }

  export type QRRecordCountAggregateInputType = {
    id?: true
    dppId?: true
    productId?: true
    activationUrl?: true
    status?: true
    scanCount?: true
    generatedAt?: true
    lastScannedAt?: true
    qrHash?: true
    generatedBy?: true
    _all?: true
  }

  export type QRRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QRRecord to aggregate.
     */
    where?: QRRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QRRecords to fetch.
     */
    orderBy?: QRRecordOrderByWithRelationInput | QRRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QRRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QRRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QRRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QRRecords
    **/
    _count?: true | QRRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QRRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QRRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QRRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QRRecordMaxAggregateInputType
  }

  export type GetQRRecordAggregateType<T extends QRRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateQRRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQRRecord[P]>
      : GetScalarType<T[P], AggregateQRRecord[P]>
  }




  export type QRRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QRRecordWhereInput
    orderBy?: QRRecordOrderByWithAggregationInput | QRRecordOrderByWithAggregationInput[]
    by: QRRecordScalarFieldEnum[] | QRRecordScalarFieldEnum
    having?: QRRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QRRecordCountAggregateInputType | true
    _avg?: QRRecordAvgAggregateInputType
    _sum?: QRRecordSumAggregateInputType
    _min?: QRRecordMinAggregateInputType
    _max?: QRRecordMaxAggregateInputType
  }

  export type QRRecordGroupByOutputType = {
    id: string
    dppId: string
    productId: string
    activationUrl: string
    status: string
    scanCount: number
    generatedAt: Date
    lastScannedAt: Date | null
    qrHash: string
    generatedBy: string | null
    _count: QRRecordCountAggregateOutputType | null
    _avg: QRRecordAvgAggregateOutputType | null
    _sum: QRRecordSumAggregateOutputType | null
    _min: QRRecordMinAggregateOutputType | null
    _max: QRRecordMaxAggregateOutputType | null
  }

  type GetQRRecordGroupByPayload<T extends QRRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QRRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QRRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QRRecordGroupByOutputType[P]>
            : GetScalarType<T[P], QRRecordGroupByOutputType[P]>
        }
      >
    >


  export type QRRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dppId?: boolean
    productId?: boolean
    activationUrl?: boolean
    status?: boolean
    scanCount?: boolean
    generatedAt?: boolean
    lastScannedAt?: boolean
    qrHash?: boolean
    generatedBy?: boolean
  }, ExtArgs["result"]["qRRecord"]>

  export type QRRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dppId?: boolean
    productId?: boolean
    activationUrl?: boolean
    status?: boolean
    scanCount?: boolean
    generatedAt?: boolean
    lastScannedAt?: boolean
    qrHash?: boolean
    generatedBy?: boolean
  }, ExtArgs["result"]["qRRecord"]>

  export type QRRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dppId?: boolean
    productId?: boolean
    activationUrl?: boolean
    status?: boolean
    scanCount?: boolean
    generatedAt?: boolean
    lastScannedAt?: boolean
    qrHash?: boolean
    generatedBy?: boolean
  }, ExtArgs["result"]["qRRecord"]>

  export type QRRecordSelectScalar = {
    id?: boolean
    dppId?: boolean
    productId?: boolean
    activationUrl?: boolean
    status?: boolean
    scanCount?: boolean
    generatedAt?: boolean
    lastScannedAt?: boolean
    qrHash?: boolean
    generatedBy?: boolean
  }

  export type QRRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "dppId" | "productId" | "activationUrl" | "status" | "scanCount" | "generatedAt" | "lastScannedAt" | "qrHash" | "generatedBy", ExtArgs["result"]["qRRecord"]>

  export type $QRRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QRRecord"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      dppId: string
      productId: string
      activationUrl: string
      status: string
      scanCount: number
      generatedAt: Date
      lastScannedAt: Date | null
      qrHash: string
      generatedBy: string | null
    }, ExtArgs["result"]["qRRecord"]>
    composites: {}
  }

  type QRRecordGetPayload<S extends boolean | null | undefined | QRRecordDefaultArgs> = $Result.GetResult<Prisma.$QRRecordPayload, S>

  type QRRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QRRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QRRecordCountAggregateInputType | true
    }

  export interface QRRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QRRecord'], meta: { name: 'QRRecord' } }
    /**
     * Find zero or one QRRecord that matches the filter.
     * @param {QRRecordFindUniqueArgs} args - Arguments to find a QRRecord
     * @example
     * // Get one QRRecord
     * const qRRecord = await prisma.qRRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QRRecordFindUniqueArgs>(args: SelectSubset<T, QRRecordFindUniqueArgs<ExtArgs>>): Prisma__QRRecordClient<$Result.GetResult<Prisma.$QRRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QRRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QRRecordFindUniqueOrThrowArgs} args - Arguments to find a QRRecord
     * @example
     * // Get one QRRecord
     * const qRRecord = await prisma.qRRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QRRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, QRRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QRRecordClient<$Result.GetResult<Prisma.$QRRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QRRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRRecordFindFirstArgs} args - Arguments to find a QRRecord
     * @example
     * // Get one QRRecord
     * const qRRecord = await prisma.qRRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QRRecordFindFirstArgs>(args?: SelectSubset<T, QRRecordFindFirstArgs<ExtArgs>>): Prisma__QRRecordClient<$Result.GetResult<Prisma.$QRRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QRRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRRecordFindFirstOrThrowArgs} args - Arguments to find a QRRecord
     * @example
     * // Get one QRRecord
     * const qRRecord = await prisma.qRRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QRRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, QRRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__QRRecordClient<$Result.GetResult<Prisma.$QRRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QRRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QRRecords
     * const qRRecords = await prisma.qRRecord.findMany()
     * 
     * // Get first 10 QRRecords
     * const qRRecords = await prisma.qRRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const qRRecordWithIdOnly = await prisma.qRRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QRRecordFindManyArgs>(args?: SelectSubset<T, QRRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QRRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QRRecord.
     * @param {QRRecordCreateArgs} args - Arguments to create a QRRecord.
     * @example
     * // Create one QRRecord
     * const QRRecord = await prisma.qRRecord.create({
     *   data: {
     *     // ... data to create a QRRecord
     *   }
     * })
     * 
     */
    create<T extends QRRecordCreateArgs>(args: SelectSubset<T, QRRecordCreateArgs<ExtArgs>>): Prisma__QRRecordClient<$Result.GetResult<Prisma.$QRRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QRRecords.
     * @param {QRRecordCreateManyArgs} args - Arguments to create many QRRecords.
     * @example
     * // Create many QRRecords
     * const qRRecord = await prisma.qRRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QRRecordCreateManyArgs>(args?: SelectSubset<T, QRRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QRRecords and returns the data saved in the database.
     * @param {QRRecordCreateManyAndReturnArgs} args - Arguments to create many QRRecords.
     * @example
     * // Create many QRRecords
     * const qRRecord = await prisma.qRRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QRRecords and only return the `id`
     * const qRRecordWithIdOnly = await prisma.qRRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QRRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, QRRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QRRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a QRRecord.
     * @param {QRRecordDeleteArgs} args - Arguments to delete one QRRecord.
     * @example
     * // Delete one QRRecord
     * const QRRecord = await prisma.qRRecord.delete({
     *   where: {
     *     // ... filter to delete one QRRecord
     *   }
     * })
     * 
     */
    delete<T extends QRRecordDeleteArgs>(args: SelectSubset<T, QRRecordDeleteArgs<ExtArgs>>): Prisma__QRRecordClient<$Result.GetResult<Prisma.$QRRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QRRecord.
     * @param {QRRecordUpdateArgs} args - Arguments to update one QRRecord.
     * @example
     * // Update one QRRecord
     * const qRRecord = await prisma.qRRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QRRecordUpdateArgs>(args: SelectSubset<T, QRRecordUpdateArgs<ExtArgs>>): Prisma__QRRecordClient<$Result.GetResult<Prisma.$QRRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QRRecords.
     * @param {QRRecordDeleteManyArgs} args - Arguments to filter QRRecords to delete.
     * @example
     * // Delete a few QRRecords
     * const { count } = await prisma.qRRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QRRecordDeleteManyArgs>(args?: SelectSubset<T, QRRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QRRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QRRecords
     * const qRRecord = await prisma.qRRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QRRecordUpdateManyArgs>(args: SelectSubset<T, QRRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QRRecords and returns the data updated in the database.
     * @param {QRRecordUpdateManyAndReturnArgs} args - Arguments to update many QRRecords.
     * @example
     * // Update many QRRecords
     * const qRRecord = await prisma.qRRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more QRRecords and only return the `id`
     * const qRRecordWithIdOnly = await prisma.qRRecord.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QRRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, QRRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QRRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one QRRecord.
     * @param {QRRecordUpsertArgs} args - Arguments to update or create a QRRecord.
     * @example
     * // Update or create a QRRecord
     * const qRRecord = await prisma.qRRecord.upsert({
     *   create: {
     *     // ... data to create a QRRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QRRecord we want to update
     *   }
     * })
     */
    upsert<T extends QRRecordUpsertArgs>(args: SelectSubset<T, QRRecordUpsertArgs<ExtArgs>>): Prisma__QRRecordClient<$Result.GetResult<Prisma.$QRRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QRRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRRecordCountArgs} args - Arguments to filter QRRecords to count.
     * @example
     * // Count the number of QRRecords
     * const count = await prisma.qRRecord.count({
     *   where: {
     *     // ... the filter for the QRRecords we want to count
     *   }
     * })
    **/
    count<T extends QRRecordCountArgs>(
      args?: Subset<T, QRRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QRRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QRRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QRRecordAggregateArgs>(args: Subset<T, QRRecordAggregateArgs>): Prisma.PrismaPromise<GetQRRecordAggregateType<T>>

    /**
     * Group by QRRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QRRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QRRecordGroupByArgs['orderBy'] }
        : { orderBy?: QRRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QRRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQRRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QRRecord model
   */
  readonly fields: QRRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QRRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QRRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QRRecord model
   */
  interface QRRecordFieldRefs {
    readonly id: FieldRef<"QRRecord", 'String'>
    readonly dppId: FieldRef<"QRRecord", 'String'>
    readonly productId: FieldRef<"QRRecord", 'String'>
    readonly activationUrl: FieldRef<"QRRecord", 'String'>
    readonly status: FieldRef<"QRRecord", 'String'>
    readonly scanCount: FieldRef<"QRRecord", 'Int'>
    readonly generatedAt: FieldRef<"QRRecord", 'DateTime'>
    readonly lastScannedAt: FieldRef<"QRRecord", 'DateTime'>
    readonly qrHash: FieldRef<"QRRecord", 'String'>
    readonly generatedBy: FieldRef<"QRRecord", 'String'>
  }
    

  // Custom InputTypes
  /**
   * QRRecord findUnique
   */
  export type QRRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRRecord
     */
    select?: QRRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRRecord
     */
    omit?: QRRecordOmit<ExtArgs> | null
    /**
     * Filter, which QRRecord to fetch.
     */
    where: QRRecordWhereUniqueInput
  }

  /**
   * QRRecord findUniqueOrThrow
   */
  export type QRRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRRecord
     */
    select?: QRRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRRecord
     */
    omit?: QRRecordOmit<ExtArgs> | null
    /**
     * Filter, which QRRecord to fetch.
     */
    where: QRRecordWhereUniqueInput
  }

  /**
   * QRRecord findFirst
   */
  export type QRRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRRecord
     */
    select?: QRRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRRecord
     */
    omit?: QRRecordOmit<ExtArgs> | null
    /**
     * Filter, which QRRecord to fetch.
     */
    where?: QRRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QRRecords to fetch.
     */
    orderBy?: QRRecordOrderByWithRelationInput | QRRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QRRecords.
     */
    cursor?: QRRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QRRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QRRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QRRecords.
     */
    distinct?: QRRecordScalarFieldEnum | QRRecordScalarFieldEnum[]
  }

  /**
   * QRRecord findFirstOrThrow
   */
  export type QRRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRRecord
     */
    select?: QRRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRRecord
     */
    omit?: QRRecordOmit<ExtArgs> | null
    /**
     * Filter, which QRRecord to fetch.
     */
    where?: QRRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QRRecords to fetch.
     */
    orderBy?: QRRecordOrderByWithRelationInput | QRRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QRRecords.
     */
    cursor?: QRRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QRRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QRRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QRRecords.
     */
    distinct?: QRRecordScalarFieldEnum | QRRecordScalarFieldEnum[]
  }

  /**
   * QRRecord findMany
   */
  export type QRRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRRecord
     */
    select?: QRRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRRecord
     */
    omit?: QRRecordOmit<ExtArgs> | null
    /**
     * Filter, which QRRecords to fetch.
     */
    where?: QRRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QRRecords to fetch.
     */
    orderBy?: QRRecordOrderByWithRelationInput | QRRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QRRecords.
     */
    cursor?: QRRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QRRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QRRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QRRecords.
     */
    distinct?: QRRecordScalarFieldEnum | QRRecordScalarFieldEnum[]
  }

  /**
   * QRRecord create
   */
  export type QRRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRRecord
     */
    select?: QRRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRRecord
     */
    omit?: QRRecordOmit<ExtArgs> | null
    /**
     * The data needed to create a QRRecord.
     */
    data: XOR<QRRecordCreateInput, QRRecordUncheckedCreateInput>
  }

  /**
   * QRRecord createMany
   */
  export type QRRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QRRecords.
     */
    data: QRRecordCreateManyInput | QRRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QRRecord createManyAndReturn
   */
  export type QRRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRRecord
     */
    select?: QRRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QRRecord
     */
    omit?: QRRecordOmit<ExtArgs> | null
    /**
     * The data used to create many QRRecords.
     */
    data: QRRecordCreateManyInput | QRRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QRRecord update
   */
  export type QRRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRRecord
     */
    select?: QRRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRRecord
     */
    omit?: QRRecordOmit<ExtArgs> | null
    /**
     * The data needed to update a QRRecord.
     */
    data: XOR<QRRecordUpdateInput, QRRecordUncheckedUpdateInput>
    /**
     * Choose, which QRRecord to update.
     */
    where: QRRecordWhereUniqueInput
  }

  /**
   * QRRecord updateMany
   */
  export type QRRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QRRecords.
     */
    data: XOR<QRRecordUpdateManyMutationInput, QRRecordUncheckedUpdateManyInput>
    /**
     * Filter which QRRecords to update
     */
    where?: QRRecordWhereInput
    /**
     * Limit how many QRRecords to update.
     */
    limit?: number
  }

  /**
   * QRRecord updateManyAndReturn
   */
  export type QRRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRRecord
     */
    select?: QRRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QRRecord
     */
    omit?: QRRecordOmit<ExtArgs> | null
    /**
     * The data used to update QRRecords.
     */
    data: XOR<QRRecordUpdateManyMutationInput, QRRecordUncheckedUpdateManyInput>
    /**
     * Filter which QRRecords to update
     */
    where?: QRRecordWhereInput
    /**
     * Limit how many QRRecords to update.
     */
    limit?: number
  }

  /**
   * QRRecord upsert
   */
  export type QRRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRRecord
     */
    select?: QRRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRRecord
     */
    omit?: QRRecordOmit<ExtArgs> | null
    /**
     * The filter to search for the QRRecord to update in case it exists.
     */
    where: QRRecordWhereUniqueInput
    /**
     * In case the QRRecord found by the `where` argument doesn't exist, create a new QRRecord with this data.
     */
    create: XOR<QRRecordCreateInput, QRRecordUncheckedCreateInput>
    /**
     * In case the QRRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QRRecordUpdateInput, QRRecordUncheckedUpdateInput>
  }

  /**
   * QRRecord delete
   */
  export type QRRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRRecord
     */
    select?: QRRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRRecord
     */
    omit?: QRRecordOmit<ExtArgs> | null
    /**
     * Filter which QRRecord to delete.
     */
    where: QRRecordWhereUniqueInput
  }

  /**
   * QRRecord deleteMany
   */
  export type QRRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QRRecords to delete
     */
    where?: QRRecordWhereInput
    /**
     * Limit how many QRRecords to delete.
     */
    limit?: number
  }

  /**
   * QRRecord without action
   */
  export type QRRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRRecord
     */
    select?: QRRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRRecord
     */
    omit?: QRRecordOmit<ExtArgs> | null
  }


  /**
   * Model QRInventory
   */

  export type AggregateQRInventory = {
    _count: QRInventoryCountAggregateOutputType | null
    _min: QRInventoryMinAggregateOutputType | null
    _max: QRInventoryMaxAggregateOutputType | null
  }

  export type QRInventoryMinAggregateOutputType = {
    id: string | null
    dppId: string | null
    status: string | null
    category: string | null
    name: string | null
    brand: string | null
    model: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type QRInventoryMaxAggregateOutputType = {
    id: string | null
    dppId: string | null
    status: string | null
    category: string | null
    name: string | null
    brand: string | null
    model: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type QRInventoryCountAggregateOutputType = {
    id: number
    dppId: number
    status: number
    category: number
    name: number
    brand: number
    model: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type QRInventoryMinAggregateInputType = {
    id?: true
    dppId?: true
    status?: true
    category?: true
    name?: true
    brand?: true
    model?: true
    createdAt?: true
    updatedAt?: true
  }

  export type QRInventoryMaxAggregateInputType = {
    id?: true
    dppId?: true
    status?: true
    category?: true
    name?: true
    brand?: true
    model?: true
    createdAt?: true
    updatedAt?: true
  }

  export type QRInventoryCountAggregateInputType = {
    id?: true
    dppId?: true
    status?: true
    category?: true
    name?: true
    brand?: true
    model?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type QRInventoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QRInventory to aggregate.
     */
    where?: QRInventoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QRInventories to fetch.
     */
    orderBy?: QRInventoryOrderByWithRelationInput | QRInventoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QRInventoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QRInventories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QRInventories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QRInventories
    **/
    _count?: true | QRInventoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QRInventoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QRInventoryMaxAggregateInputType
  }

  export type GetQRInventoryAggregateType<T extends QRInventoryAggregateArgs> = {
        [P in keyof T & keyof AggregateQRInventory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQRInventory[P]>
      : GetScalarType<T[P], AggregateQRInventory[P]>
  }




  export type QRInventoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QRInventoryWhereInput
    orderBy?: QRInventoryOrderByWithAggregationInput | QRInventoryOrderByWithAggregationInput[]
    by: QRInventoryScalarFieldEnum[] | QRInventoryScalarFieldEnum
    having?: QRInventoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QRInventoryCountAggregateInputType | true
    _min?: QRInventoryMinAggregateInputType
    _max?: QRInventoryMaxAggregateInputType
  }

  export type QRInventoryGroupByOutputType = {
    id: string
    dppId: string
    status: string
    category: string | null
    name: string | null
    brand: string | null
    model: string | null
    createdAt: Date
    updatedAt: Date
    _count: QRInventoryCountAggregateOutputType | null
    _min: QRInventoryMinAggregateOutputType | null
    _max: QRInventoryMaxAggregateOutputType | null
  }

  type GetQRInventoryGroupByPayload<T extends QRInventoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QRInventoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QRInventoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QRInventoryGroupByOutputType[P]>
            : GetScalarType<T[P], QRInventoryGroupByOutputType[P]>
        }
      >
    >


  export type QRInventorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dppId?: boolean
    status?: boolean
    category?: boolean
    name?: boolean
    brand?: boolean
    model?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["qRInventory"]>

  export type QRInventorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dppId?: boolean
    status?: boolean
    category?: boolean
    name?: boolean
    brand?: boolean
    model?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["qRInventory"]>

  export type QRInventorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dppId?: boolean
    status?: boolean
    category?: boolean
    name?: boolean
    brand?: boolean
    model?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["qRInventory"]>

  export type QRInventorySelectScalar = {
    id?: boolean
    dppId?: boolean
    status?: boolean
    category?: boolean
    name?: boolean
    brand?: boolean
    model?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type QRInventoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "dppId" | "status" | "category" | "name" | "brand" | "model" | "createdAt" | "updatedAt", ExtArgs["result"]["qRInventory"]>

  export type $QRInventoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QRInventory"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      dppId: string
      status: string
      category: string | null
      name: string | null
      brand: string | null
      model: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["qRInventory"]>
    composites: {}
  }

  type QRInventoryGetPayload<S extends boolean | null | undefined | QRInventoryDefaultArgs> = $Result.GetResult<Prisma.$QRInventoryPayload, S>

  type QRInventoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QRInventoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QRInventoryCountAggregateInputType | true
    }

  export interface QRInventoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QRInventory'], meta: { name: 'QRInventory' } }
    /**
     * Find zero or one QRInventory that matches the filter.
     * @param {QRInventoryFindUniqueArgs} args - Arguments to find a QRInventory
     * @example
     * // Get one QRInventory
     * const qRInventory = await prisma.qRInventory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QRInventoryFindUniqueArgs>(args: SelectSubset<T, QRInventoryFindUniqueArgs<ExtArgs>>): Prisma__QRInventoryClient<$Result.GetResult<Prisma.$QRInventoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QRInventory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QRInventoryFindUniqueOrThrowArgs} args - Arguments to find a QRInventory
     * @example
     * // Get one QRInventory
     * const qRInventory = await prisma.qRInventory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QRInventoryFindUniqueOrThrowArgs>(args: SelectSubset<T, QRInventoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QRInventoryClient<$Result.GetResult<Prisma.$QRInventoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QRInventory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRInventoryFindFirstArgs} args - Arguments to find a QRInventory
     * @example
     * // Get one QRInventory
     * const qRInventory = await prisma.qRInventory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QRInventoryFindFirstArgs>(args?: SelectSubset<T, QRInventoryFindFirstArgs<ExtArgs>>): Prisma__QRInventoryClient<$Result.GetResult<Prisma.$QRInventoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QRInventory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRInventoryFindFirstOrThrowArgs} args - Arguments to find a QRInventory
     * @example
     * // Get one QRInventory
     * const qRInventory = await prisma.qRInventory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QRInventoryFindFirstOrThrowArgs>(args?: SelectSubset<T, QRInventoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__QRInventoryClient<$Result.GetResult<Prisma.$QRInventoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QRInventories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRInventoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QRInventories
     * const qRInventories = await prisma.qRInventory.findMany()
     * 
     * // Get first 10 QRInventories
     * const qRInventories = await prisma.qRInventory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const qRInventoryWithIdOnly = await prisma.qRInventory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QRInventoryFindManyArgs>(args?: SelectSubset<T, QRInventoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QRInventoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QRInventory.
     * @param {QRInventoryCreateArgs} args - Arguments to create a QRInventory.
     * @example
     * // Create one QRInventory
     * const QRInventory = await prisma.qRInventory.create({
     *   data: {
     *     // ... data to create a QRInventory
     *   }
     * })
     * 
     */
    create<T extends QRInventoryCreateArgs>(args: SelectSubset<T, QRInventoryCreateArgs<ExtArgs>>): Prisma__QRInventoryClient<$Result.GetResult<Prisma.$QRInventoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QRInventories.
     * @param {QRInventoryCreateManyArgs} args - Arguments to create many QRInventories.
     * @example
     * // Create many QRInventories
     * const qRInventory = await prisma.qRInventory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QRInventoryCreateManyArgs>(args?: SelectSubset<T, QRInventoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QRInventories and returns the data saved in the database.
     * @param {QRInventoryCreateManyAndReturnArgs} args - Arguments to create many QRInventories.
     * @example
     * // Create many QRInventories
     * const qRInventory = await prisma.qRInventory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QRInventories and only return the `id`
     * const qRInventoryWithIdOnly = await prisma.qRInventory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QRInventoryCreateManyAndReturnArgs>(args?: SelectSubset<T, QRInventoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QRInventoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a QRInventory.
     * @param {QRInventoryDeleteArgs} args - Arguments to delete one QRInventory.
     * @example
     * // Delete one QRInventory
     * const QRInventory = await prisma.qRInventory.delete({
     *   where: {
     *     // ... filter to delete one QRInventory
     *   }
     * })
     * 
     */
    delete<T extends QRInventoryDeleteArgs>(args: SelectSubset<T, QRInventoryDeleteArgs<ExtArgs>>): Prisma__QRInventoryClient<$Result.GetResult<Prisma.$QRInventoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QRInventory.
     * @param {QRInventoryUpdateArgs} args - Arguments to update one QRInventory.
     * @example
     * // Update one QRInventory
     * const qRInventory = await prisma.qRInventory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QRInventoryUpdateArgs>(args: SelectSubset<T, QRInventoryUpdateArgs<ExtArgs>>): Prisma__QRInventoryClient<$Result.GetResult<Prisma.$QRInventoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QRInventories.
     * @param {QRInventoryDeleteManyArgs} args - Arguments to filter QRInventories to delete.
     * @example
     * // Delete a few QRInventories
     * const { count } = await prisma.qRInventory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QRInventoryDeleteManyArgs>(args?: SelectSubset<T, QRInventoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QRInventories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRInventoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QRInventories
     * const qRInventory = await prisma.qRInventory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QRInventoryUpdateManyArgs>(args: SelectSubset<T, QRInventoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QRInventories and returns the data updated in the database.
     * @param {QRInventoryUpdateManyAndReturnArgs} args - Arguments to update many QRInventories.
     * @example
     * // Update many QRInventories
     * const qRInventory = await prisma.qRInventory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more QRInventories and only return the `id`
     * const qRInventoryWithIdOnly = await prisma.qRInventory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QRInventoryUpdateManyAndReturnArgs>(args: SelectSubset<T, QRInventoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QRInventoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one QRInventory.
     * @param {QRInventoryUpsertArgs} args - Arguments to update or create a QRInventory.
     * @example
     * // Update or create a QRInventory
     * const qRInventory = await prisma.qRInventory.upsert({
     *   create: {
     *     // ... data to create a QRInventory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QRInventory we want to update
     *   }
     * })
     */
    upsert<T extends QRInventoryUpsertArgs>(args: SelectSubset<T, QRInventoryUpsertArgs<ExtArgs>>): Prisma__QRInventoryClient<$Result.GetResult<Prisma.$QRInventoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QRInventories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRInventoryCountArgs} args - Arguments to filter QRInventories to count.
     * @example
     * // Count the number of QRInventories
     * const count = await prisma.qRInventory.count({
     *   where: {
     *     // ... the filter for the QRInventories we want to count
     *   }
     * })
    **/
    count<T extends QRInventoryCountArgs>(
      args?: Subset<T, QRInventoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QRInventoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QRInventory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRInventoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QRInventoryAggregateArgs>(args: Subset<T, QRInventoryAggregateArgs>): Prisma.PrismaPromise<GetQRInventoryAggregateType<T>>

    /**
     * Group by QRInventory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRInventoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QRInventoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QRInventoryGroupByArgs['orderBy'] }
        : { orderBy?: QRInventoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QRInventoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQRInventoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QRInventory model
   */
  readonly fields: QRInventoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QRInventory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QRInventoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QRInventory model
   */
  interface QRInventoryFieldRefs {
    readonly id: FieldRef<"QRInventory", 'String'>
    readonly dppId: FieldRef<"QRInventory", 'String'>
    readonly status: FieldRef<"QRInventory", 'String'>
    readonly category: FieldRef<"QRInventory", 'String'>
    readonly name: FieldRef<"QRInventory", 'String'>
    readonly brand: FieldRef<"QRInventory", 'String'>
    readonly model: FieldRef<"QRInventory", 'String'>
    readonly createdAt: FieldRef<"QRInventory", 'DateTime'>
    readonly updatedAt: FieldRef<"QRInventory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * QRInventory findUnique
   */
  export type QRInventoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRInventory
     */
    select?: QRInventorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRInventory
     */
    omit?: QRInventoryOmit<ExtArgs> | null
    /**
     * Filter, which QRInventory to fetch.
     */
    where: QRInventoryWhereUniqueInput
  }

  /**
   * QRInventory findUniqueOrThrow
   */
  export type QRInventoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRInventory
     */
    select?: QRInventorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRInventory
     */
    omit?: QRInventoryOmit<ExtArgs> | null
    /**
     * Filter, which QRInventory to fetch.
     */
    where: QRInventoryWhereUniqueInput
  }

  /**
   * QRInventory findFirst
   */
  export type QRInventoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRInventory
     */
    select?: QRInventorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRInventory
     */
    omit?: QRInventoryOmit<ExtArgs> | null
    /**
     * Filter, which QRInventory to fetch.
     */
    where?: QRInventoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QRInventories to fetch.
     */
    orderBy?: QRInventoryOrderByWithRelationInput | QRInventoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QRInventories.
     */
    cursor?: QRInventoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QRInventories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QRInventories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QRInventories.
     */
    distinct?: QRInventoryScalarFieldEnum | QRInventoryScalarFieldEnum[]
  }

  /**
   * QRInventory findFirstOrThrow
   */
  export type QRInventoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRInventory
     */
    select?: QRInventorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRInventory
     */
    omit?: QRInventoryOmit<ExtArgs> | null
    /**
     * Filter, which QRInventory to fetch.
     */
    where?: QRInventoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QRInventories to fetch.
     */
    orderBy?: QRInventoryOrderByWithRelationInput | QRInventoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QRInventories.
     */
    cursor?: QRInventoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QRInventories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QRInventories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QRInventories.
     */
    distinct?: QRInventoryScalarFieldEnum | QRInventoryScalarFieldEnum[]
  }

  /**
   * QRInventory findMany
   */
  export type QRInventoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRInventory
     */
    select?: QRInventorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRInventory
     */
    omit?: QRInventoryOmit<ExtArgs> | null
    /**
     * Filter, which QRInventories to fetch.
     */
    where?: QRInventoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QRInventories to fetch.
     */
    orderBy?: QRInventoryOrderByWithRelationInput | QRInventoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QRInventories.
     */
    cursor?: QRInventoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QRInventories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QRInventories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QRInventories.
     */
    distinct?: QRInventoryScalarFieldEnum | QRInventoryScalarFieldEnum[]
  }

  /**
   * QRInventory create
   */
  export type QRInventoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRInventory
     */
    select?: QRInventorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRInventory
     */
    omit?: QRInventoryOmit<ExtArgs> | null
    /**
     * The data needed to create a QRInventory.
     */
    data: XOR<QRInventoryCreateInput, QRInventoryUncheckedCreateInput>
  }

  /**
   * QRInventory createMany
   */
  export type QRInventoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QRInventories.
     */
    data: QRInventoryCreateManyInput | QRInventoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QRInventory createManyAndReturn
   */
  export type QRInventoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRInventory
     */
    select?: QRInventorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QRInventory
     */
    omit?: QRInventoryOmit<ExtArgs> | null
    /**
     * The data used to create many QRInventories.
     */
    data: QRInventoryCreateManyInput | QRInventoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QRInventory update
   */
  export type QRInventoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRInventory
     */
    select?: QRInventorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRInventory
     */
    omit?: QRInventoryOmit<ExtArgs> | null
    /**
     * The data needed to update a QRInventory.
     */
    data: XOR<QRInventoryUpdateInput, QRInventoryUncheckedUpdateInput>
    /**
     * Choose, which QRInventory to update.
     */
    where: QRInventoryWhereUniqueInput
  }

  /**
   * QRInventory updateMany
   */
  export type QRInventoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QRInventories.
     */
    data: XOR<QRInventoryUpdateManyMutationInput, QRInventoryUncheckedUpdateManyInput>
    /**
     * Filter which QRInventories to update
     */
    where?: QRInventoryWhereInput
    /**
     * Limit how many QRInventories to update.
     */
    limit?: number
  }

  /**
   * QRInventory updateManyAndReturn
   */
  export type QRInventoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRInventory
     */
    select?: QRInventorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QRInventory
     */
    omit?: QRInventoryOmit<ExtArgs> | null
    /**
     * The data used to update QRInventories.
     */
    data: XOR<QRInventoryUpdateManyMutationInput, QRInventoryUncheckedUpdateManyInput>
    /**
     * Filter which QRInventories to update
     */
    where?: QRInventoryWhereInput
    /**
     * Limit how many QRInventories to update.
     */
    limit?: number
  }

  /**
   * QRInventory upsert
   */
  export type QRInventoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRInventory
     */
    select?: QRInventorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRInventory
     */
    omit?: QRInventoryOmit<ExtArgs> | null
    /**
     * The filter to search for the QRInventory to update in case it exists.
     */
    where: QRInventoryWhereUniqueInput
    /**
     * In case the QRInventory found by the `where` argument doesn't exist, create a new QRInventory with this data.
     */
    create: XOR<QRInventoryCreateInput, QRInventoryUncheckedCreateInput>
    /**
     * In case the QRInventory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QRInventoryUpdateInput, QRInventoryUncheckedUpdateInput>
  }

  /**
   * QRInventory delete
   */
  export type QRInventoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRInventory
     */
    select?: QRInventorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRInventory
     */
    omit?: QRInventoryOmit<ExtArgs> | null
    /**
     * Filter which QRInventory to delete.
     */
    where: QRInventoryWhereUniqueInput
  }

  /**
   * QRInventory deleteMany
   */
  export type QRInventoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QRInventories to delete
     */
    where?: QRInventoryWhereInput
    /**
     * Limit how many QRInventories to delete.
     */
    limit?: number
  }

  /**
   * QRInventory without action
   */
  export type QRInventoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRInventory
     */
    select?: QRInventorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRInventory
     */
    omit?: QRInventoryOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ActivationRecordScalarFieldEnum: {
    id: 'id',
    dppId: 'dppId',
    productId: 'productId',
    status: 'status',
    activatedAt: 'activatedAt',
    ipAddress: 'ipAddress',
    deviceInfo: 'deviceInfo',
    activatedBy: 'activatedBy',
    qrRecordId: 'qrRecordId'
  };

  export type ActivationRecordScalarFieldEnum = (typeof ActivationRecordScalarFieldEnum)[keyof typeof ActivationRecordScalarFieldEnum]


  export const ProductSnapshotScalarFieldEnum: {
    id: 'id',
    dppId: 'dppId',
    productId: 'productId',
    productName: 'productName',
    category: 'category',
    brand: 'brand',
    model: 'model',
    serialNumber: 'serialNumber',
    status: 'status',
    createdAt: 'createdAt',
    conditionScore: 'conditionScore',
    owner: 'owner',
    trustScore: 'trustScore',
    updatedAt: 'updatedAt'
  };

  export type ProductSnapshotScalarFieldEnum = (typeof ProductSnapshotScalarFieldEnum)[keyof typeof ProductSnapshotScalarFieldEnum]


  export const QRRecordScalarFieldEnum: {
    id: 'id',
    dppId: 'dppId',
    productId: 'productId',
    activationUrl: 'activationUrl',
    status: 'status',
    scanCount: 'scanCount',
    generatedAt: 'generatedAt',
    lastScannedAt: 'lastScannedAt',
    qrHash: 'qrHash',
    generatedBy: 'generatedBy'
  };

  export type QRRecordScalarFieldEnum = (typeof QRRecordScalarFieldEnum)[keyof typeof QRRecordScalarFieldEnum]


  export const QRInventoryScalarFieldEnum: {
    id: 'id',
    dppId: 'dppId',
    status: 'status',
    category: 'category',
    name: 'name',
    brand: 'brand',
    model: 'model',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type QRInventoryScalarFieldEnum = (typeof QRInventoryScalarFieldEnum)[keyof typeof QRInventoryScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ActivationRecordWhereInput = {
    AND?: ActivationRecordWhereInput | ActivationRecordWhereInput[]
    OR?: ActivationRecordWhereInput[]
    NOT?: ActivationRecordWhereInput | ActivationRecordWhereInput[]
    id?: StringFilter<"ActivationRecord"> | string
    dppId?: StringFilter<"ActivationRecord"> | string
    productId?: StringFilter<"ActivationRecord"> | string
    status?: StringFilter<"ActivationRecord"> | string
    activatedAt?: DateTimeFilter<"ActivationRecord"> | Date | string
    ipAddress?: StringNullableFilter<"ActivationRecord"> | string | null
    deviceInfo?: StringNullableFilter<"ActivationRecord"> | string | null
    activatedBy?: StringNullableFilter<"ActivationRecord"> | string | null
    qrRecordId?: StringNullableFilter<"ActivationRecord"> | string | null
  }

  export type ActivationRecordOrderByWithRelationInput = {
    id?: SortOrder
    dppId?: SortOrder
    productId?: SortOrder
    status?: SortOrder
    activatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    deviceInfo?: SortOrderInput | SortOrder
    activatedBy?: SortOrderInput | SortOrder
    qrRecordId?: SortOrderInput | SortOrder
  }

  export type ActivationRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ActivationRecordWhereInput | ActivationRecordWhereInput[]
    OR?: ActivationRecordWhereInput[]
    NOT?: ActivationRecordWhereInput | ActivationRecordWhereInput[]
    dppId?: StringFilter<"ActivationRecord"> | string
    productId?: StringFilter<"ActivationRecord"> | string
    status?: StringFilter<"ActivationRecord"> | string
    activatedAt?: DateTimeFilter<"ActivationRecord"> | Date | string
    ipAddress?: StringNullableFilter<"ActivationRecord"> | string | null
    deviceInfo?: StringNullableFilter<"ActivationRecord"> | string | null
    activatedBy?: StringNullableFilter<"ActivationRecord"> | string | null
    qrRecordId?: StringNullableFilter<"ActivationRecord"> | string | null
  }, "id">

  export type ActivationRecordOrderByWithAggregationInput = {
    id?: SortOrder
    dppId?: SortOrder
    productId?: SortOrder
    status?: SortOrder
    activatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    deviceInfo?: SortOrderInput | SortOrder
    activatedBy?: SortOrderInput | SortOrder
    qrRecordId?: SortOrderInput | SortOrder
    _count?: ActivationRecordCountOrderByAggregateInput
    _max?: ActivationRecordMaxOrderByAggregateInput
    _min?: ActivationRecordMinOrderByAggregateInput
  }

  export type ActivationRecordScalarWhereWithAggregatesInput = {
    AND?: ActivationRecordScalarWhereWithAggregatesInput | ActivationRecordScalarWhereWithAggregatesInput[]
    OR?: ActivationRecordScalarWhereWithAggregatesInput[]
    NOT?: ActivationRecordScalarWhereWithAggregatesInput | ActivationRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ActivationRecord"> | string
    dppId?: StringWithAggregatesFilter<"ActivationRecord"> | string
    productId?: StringWithAggregatesFilter<"ActivationRecord"> | string
    status?: StringWithAggregatesFilter<"ActivationRecord"> | string
    activatedAt?: DateTimeWithAggregatesFilter<"ActivationRecord"> | Date | string
    ipAddress?: StringNullableWithAggregatesFilter<"ActivationRecord"> | string | null
    deviceInfo?: StringNullableWithAggregatesFilter<"ActivationRecord"> | string | null
    activatedBy?: StringNullableWithAggregatesFilter<"ActivationRecord"> | string | null
    qrRecordId?: StringNullableWithAggregatesFilter<"ActivationRecord"> | string | null
  }

  export type ProductSnapshotWhereInput = {
    AND?: ProductSnapshotWhereInput | ProductSnapshotWhereInput[]
    OR?: ProductSnapshotWhereInput[]
    NOT?: ProductSnapshotWhereInput | ProductSnapshotWhereInput[]
    id?: StringFilter<"ProductSnapshot"> | string
    dppId?: StringFilter<"ProductSnapshot"> | string
    productId?: StringFilter<"ProductSnapshot"> | string
    productName?: StringFilter<"ProductSnapshot"> | string
    category?: StringFilter<"ProductSnapshot"> | string
    brand?: StringNullableFilter<"ProductSnapshot"> | string | null
    model?: StringNullableFilter<"ProductSnapshot"> | string | null
    serialNumber?: StringNullableFilter<"ProductSnapshot"> | string | null
    status?: StringFilter<"ProductSnapshot"> | string
    createdAt?: DateTimeFilter<"ProductSnapshot"> | Date | string
    conditionScore?: IntNullableFilter<"ProductSnapshot"> | number | null
    owner?: StringNullableFilter<"ProductSnapshot"> | string | null
    trustScore?: IntNullableFilter<"ProductSnapshot"> | number | null
    updatedAt?: DateTimeFilter<"ProductSnapshot"> | Date | string
  }

  export type ProductSnapshotOrderByWithRelationInput = {
    id?: SortOrder
    dppId?: SortOrder
    productId?: SortOrder
    productName?: SortOrder
    category?: SortOrder
    brand?: SortOrderInput | SortOrder
    model?: SortOrderInput | SortOrder
    serialNumber?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    conditionScore?: SortOrderInput | SortOrder
    owner?: SortOrderInput | SortOrder
    trustScore?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
  }

  export type ProductSnapshotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    dppId?: string
    AND?: ProductSnapshotWhereInput | ProductSnapshotWhereInput[]
    OR?: ProductSnapshotWhereInput[]
    NOT?: ProductSnapshotWhereInput | ProductSnapshotWhereInput[]
    productId?: StringFilter<"ProductSnapshot"> | string
    productName?: StringFilter<"ProductSnapshot"> | string
    category?: StringFilter<"ProductSnapshot"> | string
    brand?: StringNullableFilter<"ProductSnapshot"> | string | null
    model?: StringNullableFilter<"ProductSnapshot"> | string | null
    serialNumber?: StringNullableFilter<"ProductSnapshot"> | string | null
    status?: StringFilter<"ProductSnapshot"> | string
    createdAt?: DateTimeFilter<"ProductSnapshot"> | Date | string
    conditionScore?: IntNullableFilter<"ProductSnapshot"> | number | null
    owner?: StringNullableFilter<"ProductSnapshot"> | string | null
    trustScore?: IntNullableFilter<"ProductSnapshot"> | number | null
    updatedAt?: DateTimeFilter<"ProductSnapshot"> | Date | string
  }, "id" | "dppId">

  export type ProductSnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    dppId?: SortOrder
    productId?: SortOrder
    productName?: SortOrder
    category?: SortOrder
    brand?: SortOrderInput | SortOrder
    model?: SortOrderInput | SortOrder
    serialNumber?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    conditionScore?: SortOrderInput | SortOrder
    owner?: SortOrderInput | SortOrder
    trustScore?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: ProductSnapshotCountOrderByAggregateInput
    _avg?: ProductSnapshotAvgOrderByAggregateInput
    _max?: ProductSnapshotMaxOrderByAggregateInput
    _min?: ProductSnapshotMinOrderByAggregateInput
    _sum?: ProductSnapshotSumOrderByAggregateInput
  }

  export type ProductSnapshotScalarWhereWithAggregatesInput = {
    AND?: ProductSnapshotScalarWhereWithAggregatesInput | ProductSnapshotScalarWhereWithAggregatesInput[]
    OR?: ProductSnapshotScalarWhereWithAggregatesInput[]
    NOT?: ProductSnapshotScalarWhereWithAggregatesInput | ProductSnapshotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProductSnapshot"> | string
    dppId?: StringWithAggregatesFilter<"ProductSnapshot"> | string
    productId?: StringWithAggregatesFilter<"ProductSnapshot"> | string
    productName?: StringWithAggregatesFilter<"ProductSnapshot"> | string
    category?: StringWithAggregatesFilter<"ProductSnapshot"> | string
    brand?: StringNullableWithAggregatesFilter<"ProductSnapshot"> | string | null
    model?: StringNullableWithAggregatesFilter<"ProductSnapshot"> | string | null
    serialNumber?: StringNullableWithAggregatesFilter<"ProductSnapshot"> | string | null
    status?: StringWithAggregatesFilter<"ProductSnapshot"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ProductSnapshot"> | Date | string
    conditionScore?: IntNullableWithAggregatesFilter<"ProductSnapshot"> | number | null
    owner?: StringNullableWithAggregatesFilter<"ProductSnapshot"> | string | null
    trustScore?: IntNullableWithAggregatesFilter<"ProductSnapshot"> | number | null
    updatedAt?: DateTimeWithAggregatesFilter<"ProductSnapshot"> | Date | string
  }

  export type QRRecordWhereInput = {
    AND?: QRRecordWhereInput | QRRecordWhereInput[]
    OR?: QRRecordWhereInput[]
    NOT?: QRRecordWhereInput | QRRecordWhereInput[]
    id?: StringFilter<"QRRecord"> | string
    dppId?: StringFilter<"QRRecord"> | string
    productId?: StringFilter<"QRRecord"> | string
    activationUrl?: StringFilter<"QRRecord"> | string
    status?: StringFilter<"QRRecord"> | string
    scanCount?: IntFilter<"QRRecord"> | number
    generatedAt?: DateTimeFilter<"QRRecord"> | Date | string
    lastScannedAt?: DateTimeNullableFilter<"QRRecord"> | Date | string | null
    qrHash?: StringFilter<"QRRecord"> | string
    generatedBy?: StringNullableFilter<"QRRecord"> | string | null
  }

  export type QRRecordOrderByWithRelationInput = {
    id?: SortOrder
    dppId?: SortOrder
    productId?: SortOrder
    activationUrl?: SortOrder
    status?: SortOrder
    scanCount?: SortOrder
    generatedAt?: SortOrder
    lastScannedAt?: SortOrderInput | SortOrder
    qrHash?: SortOrder
    generatedBy?: SortOrderInput | SortOrder
  }

  export type QRRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    dppId?: string
    AND?: QRRecordWhereInput | QRRecordWhereInput[]
    OR?: QRRecordWhereInput[]
    NOT?: QRRecordWhereInput | QRRecordWhereInput[]
    productId?: StringFilter<"QRRecord"> | string
    activationUrl?: StringFilter<"QRRecord"> | string
    status?: StringFilter<"QRRecord"> | string
    scanCount?: IntFilter<"QRRecord"> | number
    generatedAt?: DateTimeFilter<"QRRecord"> | Date | string
    lastScannedAt?: DateTimeNullableFilter<"QRRecord"> | Date | string | null
    qrHash?: StringFilter<"QRRecord"> | string
    generatedBy?: StringNullableFilter<"QRRecord"> | string | null
  }, "id" | "dppId">

  export type QRRecordOrderByWithAggregationInput = {
    id?: SortOrder
    dppId?: SortOrder
    productId?: SortOrder
    activationUrl?: SortOrder
    status?: SortOrder
    scanCount?: SortOrder
    generatedAt?: SortOrder
    lastScannedAt?: SortOrderInput | SortOrder
    qrHash?: SortOrder
    generatedBy?: SortOrderInput | SortOrder
    _count?: QRRecordCountOrderByAggregateInput
    _avg?: QRRecordAvgOrderByAggregateInput
    _max?: QRRecordMaxOrderByAggregateInput
    _min?: QRRecordMinOrderByAggregateInput
    _sum?: QRRecordSumOrderByAggregateInput
  }

  export type QRRecordScalarWhereWithAggregatesInput = {
    AND?: QRRecordScalarWhereWithAggregatesInput | QRRecordScalarWhereWithAggregatesInput[]
    OR?: QRRecordScalarWhereWithAggregatesInput[]
    NOT?: QRRecordScalarWhereWithAggregatesInput | QRRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"QRRecord"> | string
    dppId?: StringWithAggregatesFilter<"QRRecord"> | string
    productId?: StringWithAggregatesFilter<"QRRecord"> | string
    activationUrl?: StringWithAggregatesFilter<"QRRecord"> | string
    status?: StringWithAggregatesFilter<"QRRecord"> | string
    scanCount?: IntWithAggregatesFilter<"QRRecord"> | number
    generatedAt?: DateTimeWithAggregatesFilter<"QRRecord"> | Date | string
    lastScannedAt?: DateTimeNullableWithAggregatesFilter<"QRRecord"> | Date | string | null
    qrHash?: StringWithAggregatesFilter<"QRRecord"> | string
    generatedBy?: StringNullableWithAggregatesFilter<"QRRecord"> | string | null
  }

  export type QRInventoryWhereInput = {
    AND?: QRInventoryWhereInput | QRInventoryWhereInput[]
    OR?: QRInventoryWhereInput[]
    NOT?: QRInventoryWhereInput | QRInventoryWhereInput[]
    id?: StringFilter<"QRInventory"> | string
    dppId?: StringFilter<"QRInventory"> | string
    status?: StringFilter<"QRInventory"> | string
    category?: StringNullableFilter<"QRInventory"> | string | null
    name?: StringNullableFilter<"QRInventory"> | string | null
    brand?: StringNullableFilter<"QRInventory"> | string | null
    model?: StringNullableFilter<"QRInventory"> | string | null
    createdAt?: DateTimeFilter<"QRInventory"> | Date | string
    updatedAt?: DateTimeFilter<"QRInventory"> | Date | string
  }

  export type QRInventoryOrderByWithRelationInput = {
    id?: SortOrder
    dppId?: SortOrder
    status?: SortOrder
    category?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    brand?: SortOrderInput | SortOrder
    model?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QRInventoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    dppId?: string
    AND?: QRInventoryWhereInput | QRInventoryWhereInput[]
    OR?: QRInventoryWhereInput[]
    NOT?: QRInventoryWhereInput | QRInventoryWhereInput[]
    status?: StringFilter<"QRInventory"> | string
    category?: StringNullableFilter<"QRInventory"> | string | null
    name?: StringNullableFilter<"QRInventory"> | string | null
    brand?: StringNullableFilter<"QRInventory"> | string | null
    model?: StringNullableFilter<"QRInventory"> | string | null
    createdAt?: DateTimeFilter<"QRInventory"> | Date | string
    updatedAt?: DateTimeFilter<"QRInventory"> | Date | string
  }, "id" | "dppId">

  export type QRInventoryOrderByWithAggregationInput = {
    id?: SortOrder
    dppId?: SortOrder
    status?: SortOrder
    category?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    brand?: SortOrderInput | SortOrder
    model?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: QRInventoryCountOrderByAggregateInput
    _max?: QRInventoryMaxOrderByAggregateInput
    _min?: QRInventoryMinOrderByAggregateInput
  }

  export type QRInventoryScalarWhereWithAggregatesInput = {
    AND?: QRInventoryScalarWhereWithAggregatesInput | QRInventoryScalarWhereWithAggregatesInput[]
    OR?: QRInventoryScalarWhereWithAggregatesInput[]
    NOT?: QRInventoryScalarWhereWithAggregatesInput | QRInventoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"QRInventory"> | string
    dppId?: StringWithAggregatesFilter<"QRInventory"> | string
    status?: StringWithAggregatesFilter<"QRInventory"> | string
    category?: StringNullableWithAggregatesFilter<"QRInventory"> | string | null
    name?: StringNullableWithAggregatesFilter<"QRInventory"> | string | null
    brand?: StringNullableWithAggregatesFilter<"QRInventory"> | string | null
    model?: StringNullableWithAggregatesFilter<"QRInventory"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"QRInventory"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"QRInventory"> | Date | string
  }

  export type ActivationRecordCreateInput = {
    id?: string
    dppId: string
    productId: string
    status: string
    activatedAt?: Date | string
    ipAddress?: string | null
    deviceInfo?: string | null
    activatedBy?: string | null
    qrRecordId?: string | null
  }

  export type ActivationRecordUncheckedCreateInput = {
    id?: string
    dppId: string
    productId: string
    status: string
    activatedAt?: Date | string
    ipAddress?: string | null
    deviceInfo?: string | null
    activatedBy?: string | null
    qrRecordId?: string | null
  }

  export type ActivationRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dppId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    activatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    deviceInfo?: NullableStringFieldUpdateOperationsInput | string | null
    activatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    qrRecordId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActivationRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dppId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    activatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    deviceInfo?: NullableStringFieldUpdateOperationsInput | string | null
    activatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    qrRecordId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActivationRecordCreateManyInput = {
    id?: string
    dppId: string
    productId: string
    status: string
    activatedAt?: Date | string
    ipAddress?: string | null
    deviceInfo?: string | null
    activatedBy?: string | null
    qrRecordId?: string | null
  }

  export type ActivationRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dppId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    activatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    deviceInfo?: NullableStringFieldUpdateOperationsInput | string | null
    activatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    qrRecordId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActivationRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    dppId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    activatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    deviceInfo?: NullableStringFieldUpdateOperationsInput | string | null
    activatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    qrRecordId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProductSnapshotCreateInput = {
    id?: string
    dppId: string
    productId: string
    productName: string
    category: string
    brand?: string | null
    model?: string | null
    serialNumber?: string | null
    status: string
    createdAt?: Date | string
    conditionScore?: number | null
    owner?: string | null
    trustScore?: number | null
    updatedAt?: Date | string
  }

  export type ProductSnapshotUncheckedCreateInput = {
    id?: string
    dppId: string
    productId: string
    productName: string
    category: string
    brand?: string | null
    model?: string | null
    serialNumber?: string | null
    status: string
    createdAt?: Date | string
    conditionScore?: number | null
    owner?: string | null
    trustScore?: number | null
    updatedAt?: Date | string
  }

  export type ProductSnapshotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dppId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conditionScore?: NullableIntFieldUpdateOperationsInput | number | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    trustScore?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductSnapshotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dppId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conditionScore?: NullableIntFieldUpdateOperationsInput | number | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    trustScore?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductSnapshotCreateManyInput = {
    id?: string
    dppId: string
    productId: string
    productName: string
    category: string
    brand?: string | null
    model?: string | null
    serialNumber?: string | null
    status: string
    createdAt?: Date | string
    conditionScore?: number | null
    owner?: string | null
    trustScore?: number | null
    updatedAt?: Date | string
  }

  export type ProductSnapshotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dppId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conditionScore?: NullableIntFieldUpdateOperationsInput | number | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    trustScore?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductSnapshotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    dppId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conditionScore?: NullableIntFieldUpdateOperationsInput | number | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    trustScore?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QRRecordCreateInput = {
    id?: string
    dppId: string
    productId: string
    activationUrl: string
    status: string
    scanCount?: number
    generatedAt?: Date | string
    lastScannedAt?: Date | string | null
    qrHash: string
    generatedBy?: string | null
  }

  export type QRRecordUncheckedCreateInput = {
    id?: string
    dppId: string
    productId: string
    activationUrl: string
    status: string
    scanCount?: number
    generatedAt?: Date | string
    lastScannedAt?: Date | string | null
    qrHash: string
    generatedBy?: string | null
  }

  export type QRRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dppId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    activationUrl?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    scanCount?: IntFieldUpdateOperationsInput | number
    generatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastScannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrHash?: StringFieldUpdateOperationsInput | string
    generatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type QRRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dppId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    activationUrl?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    scanCount?: IntFieldUpdateOperationsInput | number
    generatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastScannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrHash?: StringFieldUpdateOperationsInput | string
    generatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type QRRecordCreateManyInput = {
    id?: string
    dppId: string
    productId: string
    activationUrl: string
    status: string
    scanCount?: number
    generatedAt?: Date | string
    lastScannedAt?: Date | string | null
    qrHash: string
    generatedBy?: string | null
  }

  export type QRRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dppId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    activationUrl?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    scanCount?: IntFieldUpdateOperationsInput | number
    generatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastScannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrHash?: StringFieldUpdateOperationsInput | string
    generatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type QRRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    dppId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    activationUrl?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    scanCount?: IntFieldUpdateOperationsInput | number
    generatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastScannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrHash?: StringFieldUpdateOperationsInput | string
    generatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type QRInventoryCreateInput = {
    id?: string
    dppId: string
    status: string
    category?: string | null
    name?: string | null
    brand?: string | null
    model?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QRInventoryUncheckedCreateInput = {
    id?: string
    dppId: string
    status: string
    category?: string | null
    name?: string | null
    brand?: string | null
    model?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QRInventoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dppId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QRInventoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dppId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QRInventoryCreateManyInput = {
    id?: string
    dppId: string
    status: string
    category?: string | null
    name?: string | null
    brand?: string | null
    model?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QRInventoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dppId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QRInventoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    dppId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ActivationRecordCountOrderByAggregateInput = {
    id?: SortOrder
    dppId?: SortOrder
    productId?: SortOrder
    status?: SortOrder
    activatedAt?: SortOrder
    ipAddress?: SortOrder
    deviceInfo?: SortOrder
    activatedBy?: SortOrder
    qrRecordId?: SortOrder
  }

  export type ActivationRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    dppId?: SortOrder
    productId?: SortOrder
    status?: SortOrder
    activatedAt?: SortOrder
    ipAddress?: SortOrder
    deviceInfo?: SortOrder
    activatedBy?: SortOrder
    qrRecordId?: SortOrder
  }

  export type ActivationRecordMinOrderByAggregateInput = {
    id?: SortOrder
    dppId?: SortOrder
    productId?: SortOrder
    status?: SortOrder
    activatedAt?: SortOrder
    ipAddress?: SortOrder
    deviceInfo?: SortOrder
    activatedBy?: SortOrder
    qrRecordId?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ProductSnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    dppId?: SortOrder
    productId?: SortOrder
    productName?: SortOrder
    category?: SortOrder
    brand?: SortOrder
    model?: SortOrder
    serialNumber?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    conditionScore?: SortOrder
    owner?: SortOrder
    trustScore?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductSnapshotAvgOrderByAggregateInput = {
    conditionScore?: SortOrder
    trustScore?: SortOrder
  }

  export type ProductSnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    dppId?: SortOrder
    productId?: SortOrder
    productName?: SortOrder
    category?: SortOrder
    brand?: SortOrder
    model?: SortOrder
    serialNumber?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    conditionScore?: SortOrder
    owner?: SortOrder
    trustScore?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductSnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    dppId?: SortOrder
    productId?: SortOrder
    productName?: SortOrder
    category?: SortOrder
    brand?: SortOrder
    model?: SortOrder
    serialNumber?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    conditionScore?: SortOrder
    owner?: SortOrder
    trustScore?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductSnapshotSumOrderByAggregateInput = {
    conditionScore?: SortOrder
    trustScore?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type QRRecordCountOrderByAggregateInput = {
    id?: SortOrder
    dppId?: SortOrder
    productId?: SortOrder
    activationUrl?: SortOrder
    status?: SortOrder
    scanCount?: SortOrder
    generatedAt?: SortOrder
    lastScannedAt?: SortOrder
    qrHash?: SortOrder
    generatedBy?: SortOrder
  }

  export type QRRecordAvgOrderByAggregateInput = {
    scanCount?: SortOrder
  }

  export type QRRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    dppId?: SortOrder
    productId?: SortOrder
    activationUrl?: SortOrder
    status?: SortOrder
    scanCount?: SortOrder
    generatedAt?: SortOrder
    lastScannedAt?: SortOrder
    qrHash?: SortOrder
    generatedBy?: SortOrder
  }

  export type QRRecordMinOrderByAggregateInput = {
    id?: SortOrder
    dppId?: SortOrder
    productId?: SortOrder
    activationUrl?: SortOrder
    status?: SortOrder
    scanCount?: SortOrder
    generatedAt?: SortOrder
    lastScannedAt?: SortOrder
    qrHash?: SortOrder
    generatedBy?: SortOrder
  }

  export type QRRecordSumOrderByAggregateInput = {
    scanCount?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type QRInventoryCountOrderByAggregateInput = {
    id?: SortOrder
    dppId?: SortOrder
    status?: SortOrder
    category?: SortOrder
    name?: SortOrder
    brand?: SortOrder
    model?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QRInventoryMaxOrderByAggregateInput = {
    id?: SortOrder
    dppId?: SortOrder
    status?: SortOrder
    category?: SortOrder
    name?: SortOrder
    brand?: SortOrder
    model?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QRInventoryMinOrderByAggregateInput = {
    id?: SortOrder
    dppId?: SortOrder
    status?: SortOrder
    category?: SortOrder
    name?: SortOrder
    brand?: SortOrder
    model?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}