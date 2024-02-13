import "server-only";

export const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  es: () => import("./dictionaries/es.json").then((module) => module.default),
};

function deepMerge(target, source) {
  const isObject = (obj) => obj && typeof obj === "object";

  if (!isObject(target) || !isObject(source)) {
    return source;
  }

  [...Object.keys(source), ...Object.keys(target)].forEach((key) => {
    const targetValue = target.hasOwnProperty(key) ? target[key] : source[key]
    const sourceValue = source.hasOwnProperty(key) ? source[key] : target[key]


    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = targetValue.concat(sourceValue);
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = deepMerge(targetValue, sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });

  return target;
}

export const getDictionary = async (locale) => {
  const dictionary = await dictionaries[locale]();
  const response = await fetch(
    "http://127.0.0.1:3000/api/internationalization",
  );
  const dataBack = await response.json();
  const dataLng = dataBack["data"][locale];
  return deepMerge(dictionary, dataLng);
};
