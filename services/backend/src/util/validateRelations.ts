export type WithProperty<Entity extends {}, Property extends keyof Entity> =
  Omit<Entity, Property> & { [P in Property]: NonNullable<Entity[P]>};

export const validateRelation = <Entity extends {}, Property extends keyof Entity>(
  entity: Entity | null, keys: Property[]
): WithProperty<Entity, Property> | null => {
  if (entity === null) {
    return null;
  }

  const values = keys.map((k) => entity[k]);

  if (values.some((v) => v === null || v === undefined)) {
    return null;
  }

  return entity as WithProperty<Entity, Property>;
};

export const validateRelationArray = <Entity extends {}, Property extends keyof Entity>(
  entity: Entity[] | null,
  keys: Property[]
): WithProperty<Entity, Property>[] | null => {
  if (entity === null) {
    return null;
  }

  const values = entity.reduce((result, e) => {
    if (result === null) {
      return null;
    }

    const validatedResult = validateRelation(e, keys);

    if (validatedResult === null) {
      return null;
    }

    return [...result, validatedResult];
  }, [] as WithProperty<Entity, Property>[] | null);

  return values;
};

