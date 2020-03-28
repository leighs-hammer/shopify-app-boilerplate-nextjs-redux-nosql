import shouldFetchtranslation, {preloadedLocale} from '../../_utils/shouldFetchtranslation'

test('Should return false when passed the default value', () => {
  const shouldNotfetch = shouldFetchtranslation(preloadedLocale)
  expect(shouldNotfetch).toBe('fallback')
})

test('Should return false when passed an iso location matches', () => {
  const shouldNotfetch = shouldFetchtranslation(`${preloadedLocale}-GB`)
  expect(shouldNotfetch).toBe('fallback')
})

test('Should return a path to a locale when passed a two chr locale', () => {
  const shouldNotfetch = shouldFetchtranslation(`fr`)
  expect(shouldNotfetch).toBe('/locales/fr.json')
})

test('Should return a path to a locale when passed a two-TWO chr locale', () => {
  const shouldNotfetch = shouldFetchtranslation('fr-FR')
  expect(shouldNotfetch).toBe('/locales/fr.json')
})

test('Should return false when a translation is not enabled.', () => {
  const shouldFetch = shouldFetchtranslation('XC-XC')
  expect(shouldFetch).toBe('fallback')
})