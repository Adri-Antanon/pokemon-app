type MyPick<TObj, TKey extends keyof TObj> = {
  [SpecificKey in TKey]: TObj[SpecificKey];
};

export function extractProperty<Type, Value extends keyof Type>(
  data: Type,
  field: Value,
): Type[Value] {
  return data[field];
}
